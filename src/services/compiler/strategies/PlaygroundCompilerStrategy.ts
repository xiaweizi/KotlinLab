import type {
  ICompilerStrategy,
  CompileResult,
  CompilationError
} from '../types'

/**
 * Kotlin Playground 编译器策略
 *
 * 使用 JetBrains 官方的 Kotlin Playground API 进行编译
 * API: https://api.kotlinlang.org/api/{version}/compiler/run
 *
 * 注意：对于 JS 目标，API 直接执行代码并返回输出（包装在 <outStream> 中）
 * 而不是返回可执行的 JavaScript 代码
 */
export class PlaygroundCompilerStrategy implements ICompilerStrategy {
  readonly name = 'Playground Compiler'
  private readonly baseUrl = 'https://api.kotlinlang.org/api'
  private readonly version = '2.3.0'

  /**
   * 编译并运行 Kotlin 代码
   * 注意：对于 JS 目标，API 会直接执行代码并返回输出
   */
  async compile(code: string, target: 'js' | 'junit' = 'js'): Promise<CompileResult> {
    const startTime = performance.now()

    try {
      const endpoint = `${this.baseUrl}/${this.version}/compiler/run`

      const requestBody = {
        files: [
          {
            name: 'File.kt',
            text: code,
            publicId: 'File.kt'
          }
        ],
        args: '',
        conf: {},
        projectType: target === 'js' ? 'JS' : 'JUNIT'
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`编译服务不可用: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      return this.parseResponse(data, startTime)
    } catch (error) {
      return {
        success: false,
        errors: [
          {
            line: 0,
            column: 0,
            message: error instanceof Error ? error.message : '未知编译错误',
            severity: 'error'
          }
        ],
        warnings: [],
        executionTime: performance.now() - startTime
      }
    }
  }

  /**
   * 解析 Playground API 响应
   *
   * API 返回格式:
   * {
   *   "errors": { "File.kt": [] },  // 成功时为空数组
   *   "exception": null,
   *   "text": "<outStream>输出内容</outStream>"
   * }
   */
  private parseResponse(data: any, startTime: number): CompileResult {
    const errors: CompilationError[] = []

    // 处理错误 - errors 是一个对象，键是文件名
    if (data.errors) {
      const errorKeys = Object.keys(data.errors)
      for (const fileName of errorKeys) {
        const errorList = data.errors[fileName] as any[]
        if (Array.isArray(errorList)) {
          for (const err of errorList) {
            errors.push({
              line: err.line || err.lineNumber || 0,
              column: err.column || err.chColumn || 0,
              message: err.message || err.severity || '编译错误',
              severity: 'error'
            })
          }
        }
      }
    }

    // 处理异常
    if (data.exception) {
      errors.push({
        line: 0,
        column: 0,
        message: data.exception.message || String(data.exception),
        severity: 'error'
      })
    }

    // 如果有错误，返回失败结果
    if (errors.length > 0) {
      return {
        success: false,
        errors,
        warnings: [],
        executionTime: performance.now() - startTime,
        rawResponse: data
      }
    }

    // 成功编译，解析输出
    // 输出格式: <outStream>内容</outStream>
    let output = ''
    if (data.text) {
      // 提取 <outStream> 标签中的内容
      const match = data.text.match(/<outStream>([\s\S]*?)<\/outStream>/)
      if (match) {
        output = match[1].trim()
      } else {
        output = data.text
      }
    }

    return {
      success: true,
      jsCode: output,  // 对于 JS 目标，这实际上是运行后的输出文本
      errors: [],
      warnings: [],
      executionTime: performance.now() - startTime,
      rawResponse: data
    }
  }

  /**
   * 检查编译器是否可用
   */
  isAvailable(): boolean {
    return typeof fetch !== 'undefined'
  }
}
