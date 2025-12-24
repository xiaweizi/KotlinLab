import { ref, computed } from 'vue'
import type { CompileResult, ExecutionResult, CompilationError } from '@/services/compiler/types'
import { PlaygroundCompilerStrategy } from '@/services/compiler/strategies/PlaygroundCompilerStrategy'

/**
 * Kotlin 编译器 Composable
 *
 * 提供编译和执行 Kotlin 代码的功能
 */
export function useCompiler() {
  const compilerStrategy = new PlaygroundCompilerStrategy()

  // 状态
  const isCompiling = ref(false)
  const isExecuting = ref(false)
  const compileResult = ref<CompileResult | null>(null)
  const executionResult = ref<ExecutionResult | null>(null)

  /**
   * 是否有错误
   */
  const hasErrors = computed(() =>
    (compileResult.value?.errors.length ?? 0) > 0
  )

  /**
   * 是否有警告
   */
  const hasWarnings = computed(() =>
    (compileResult.value?.warnings.length ?? 0) > 0
  )

  /**
   * 编译 Kotlin 代码
   */
  async function compile(code: string, target: 'js' | 'junit' = 'js') {
    isCompiling.value = true
    compileResult.value = null

    try {
      compileResult.value = await compilerStrategy.compile(code, target)
      return compileResult.value
    } finally {
      isCompiling.value = false
    }
  }

  /**
   * 执行 JavaScript 代码
   */
  async function execute(jsCode: string) {
    isExecuting.value = true
    executionResult.value = null

    const startTime = performance.now()

    try {
      const output = await executeInSandbox(jsCode)

      executionResult.value = {
        success: true,
        output,
        executionTime: performance.now() - startTime
      }
    } catch (error) {
      executionResult.value = {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : String(error),
        executionTime: performance.now() - startTime
      }
    } finally {
      isExecuting.value = false
    }

    return executionResult.value
  }

  /**
   * 在沙箱环境中执行代码
   */
  async function executeInSandbox(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // 使用 srcdoc 创建同源 iframe
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'

      // 创建完整的 HTML 文档，包含要执行的代码
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <script>
            (function() {
              // 捕获 console 输出
              const logs = []
              const originalLog = console.log
              const originalError = console.error

              console.log = (...args) => {
                const message = args.map(arg => {
                  if (typeof arg === 'object') {
                    try { return JSON.stringify(arg, null, 2) }
                    catch { return String(arg) }
                  }
                  return String(arg)
                }).join(' ')
                logs.push(message)
              }

              console.error = (...args) => {
                logs.push('[ERROR] ' + args.map(String).join(' '))
              }

              // Kotlin println
              println = (...args) => {
                logs.push(args.map(String).join(' '))
              }

              try {
                ${code}
                // 执行完成，发送结果
                window.parent.postMessage({
                  type: 'execution-complete',
                  success: true,
                  output: logs.length > 0 ? logs.join('\\n') : '执行成功 (无输出)'
                }, '*')
              } catch (e) {
                window.parent.postMessage({
                  type: 'execution-complete',
                  success: false,
                  error: e.message || String(e),
                  output: logs.length > 0 ? logs.join('\\n') : ''
                }, '*')
              }
            })()
          <\/script>
        </body>
        </html>
      `

      iframe.srcdoc = htmlContent
      document.body.appendChild(iframe)

      // 监听来自 iframe 的消息
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'execution-complete') {
          window.removeEventListener('message', messageHandler)
          document.body.removeChild(iframe)

          if (event.data.success) {
            resolve(event.data.output)
          } else {
            reject(new Error(event.data.error || '执行错误'))
          }
        }
      }

      window.addEventListener('message', messageHandler)

      // 超时处理
      setTimeout(() => {
        window.removeEventListener('message', messageHandler)
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe)
        }
        reject(new Error('执行超时'))
      }, 10000)
    })
  }

  /**
   * 获取格式化的错误信息
   */
  function getFormattedErrors(): string[] {
    const errors = compileResult.value?.errors || []
    return errors.map(err => `Line ${err.line}:${err.column} - ${err.message}`)
  }

  /**
   * 清除结果
   */
  function clearResults() {
    compileResult.value = null
    executionResult.value = null
  }

  /**
   * 获取 Monaco Editor 错误标记
   */
  function getEditorMarkers(errors: CompilationError[]): Array<{
    severity: number
    message: string
    startLineNumber: number
    startColumn: number
    endLineNumber: number
    endColumn: number
  }> {
    return errors
      .filter(e => e.severity === 'error')
      .map(e => ({
        severity: e.severity === 'error' ? 8 : 4, // MarkerSeverity.Error = 8, Warning = 4
        message: e.message,
        startLineNumber: e.line || 1,
        startColumn: e.column || 1,
        endLineNumber: e.line || 1,
        endColumn: (e.column || 1) + 1
      }))
  }

  return {
    // 状态
    isCompiling,
    isExecuting,
    compileResult,
    executionResult,
    hasErrors,
    hasWarnings,

    // 方法
    compile,
    execute,
    clearResults,
    getFormattedErrors,
    getEditorMarkers
  }
}
