<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-left">
        <h1 class="app-title">
          <span class="kotlin-badge">Kotlin</span>
          <span class="title-text">Web Compiler</span>
        </h1>
        <p class="app-subtitle">在浏览器中编译并运行 Kotlin 代码</p>
      </div>
      <div class="header-actions">
        <router-link to="/learn" class="icon-btn" title="学习中心">
          <span>📚</span>
        </router-link>
        <button @click="toggleTheme" class="icon-btn" :title="isDark ? '切换到亮色主题' : '切换到深色主题'">
          <span v-if="isDark" class="icon-sun">☀️</span>
          <span v-else class="icon-moon">🌙</span>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 左侧：编辑器区域 -->
      <section class="editor-section">
        <div class="section-header">
          <div class="section-title">
            <span class="language-badge kotlin">Kotlin</span>
            <h2>源代码</h2>
          </div>
          <div class="toolbar">
            <button
              @click="handleCompile"
              :disabled="!kotlinCode.trim() || isCompiling"
              class="btn btn-primary"
            >
              <span v-if="isCompiling" class="btn-icon spinner">⟳</span>
              <span v-else class="btn-icon">▶</span>
              {{ isCompiling ? '编译中...' : '编译' }}
            </button>
            <button
              @click="handleRun"
              :disabled="!compileResult?.jsCode || isExecuting"
              class="btn btn-success"
            >
              <span v-if="isExecuting" class="btn-icon spinner">⟳</span>
              <span v-else class="btn-icon">⚡</span>
              {{ isExecuting ? '运行中...' : '运行' }}
            </button>
            <button @click="clearAll" class="btn btn-secondary" :disabled="!kotlinCode && !compileResult">
              <span class="btn-icon">🗑</span>
              清空
            </button>
            <button @click="shareCode" class="btn btn-share" :disabled="!kotlinCode.trim()" :class="{ copied: shareLinkCopied }">
              <span class="btn-icon">{{ shareLinkCopied ? '✓' : '🔗' }}</span>
              {{ shareLinkCopied ? '已复制' : '分享' }}
            </button>
          </div>
        </div>

        <div class="editor-wrapper">
          <MonacoEditor
            v-model="kotlinCode"
            :language="'kotlin'"
            :theme="isDark ? 'vs-dark' : 'vs'"
            :height="'100%'"
          />
        </div>

        <!-- 编译状态信息 -->
        <div v-if="compileResult" class="compile-status" :class="{ success: compileResult.success, error: hasErrors }">
          <span v-if="compileResult.success" class="status-text success">
            ✓ 编译成功 ({{ compileResult.executionTime.toFixed(0) }}ms)
          </span>
          <span v-else class="status-text error">
            ✗ 编译失败 ({{ compileResult.executionTime.toFixed(0) }}ms)
          </span>
        </div>

        <!-- 编译错误面板 -->
        <div v-if="hasErrors" class="error-panel">
          <div class="error-panel-header">
            <span class="error-icon">⚠️</span>
            <span>编译错误</span>
          </div>
          <div class="error-list">
            <div v-for="(error, index) in compileResult?.errors" :key="index" class="error-item">
              <span class="error-location">Line {{ error.line }}:{{ error.column }}</span>
              <span class="error-message">{{ error.message }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 右侧：输出区域 -->
      <section class="output-section">
        <!-- JavaScript 输出 -->
        <div class="output-panel js-output">
          <div class="section-header compact">
            <div class="section-title">
              <span class="language-badge javascript">JS</span>
              <h3>JavaScript 输出</h3>
            </div>
            <button
              v-if="jsOutput"
              @click="copyToClipboard(jsOutput)"
              class="icon-btn"
              title="复制代码"
            >
              📋
            </button>
          </div>
          <div class="output-wrapper">
            <MonacoEditor
              v-model="jsOutput"
              :language="'javascript'"
              :theme="isDark ? 'vs-dark' : 'vs'"
              :read-only="true"
              :height="'100%'"
            />
          </div>
        </div>

        <!-- 控制台输出 -->
        <div class="output-panel console-output">
          <div class="section-header compact">
            <div class="section-title">
              <span class="language-badge console">⚡</span>
              <h3>控���台</h3>
            </div>
            <button
              v-if="executionResult?.output"
              @click="clearConsole"
              class="icon-btn"
              title="清空控制台"
            >
              🗑
            </button>
          </div>
          <div class="console-wrapper" :class="{ 'has-error': executionResult?.error }">
            <pre class="console-text">{{ consoleOutput }}</pre>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import MonacoEditor from '@/components/CodeEditor/MonacoEditor.vue'
import { useCompiler } from '@/composables/useCompiler'
import { useTheme } from '@/composables/useTheme'
import { generateShareUrl, getSharedCode, clearCodeFromUrl } from '@/utils/codeShare'

// 默认 Kotlin 示例代码
const defaultKotlinCode = `fun main() {
    println("Hello, Kotlin Web Compiler!")

    val numbers = listOf(1, 2, 3, 4, 5)
    val doubled = numbers.map { it * 2 }

    println("Original: $numbers")
    println("Doubled: $doubled")

    // 更多 Kotlin 特性演示
    val person = Person("Alice", 30)
    person.introduce()
}

data class Person(val name: String, val age: Int) {
    fun introduce() {
        println("Hi, I'm $name and I'm $age years old.")
    }
}
`

// 状态
const kotlinCode = ref(defaultKotlinCode)
const consoleOutput = ref('点击「编译」按钮运行 Kotlin 代码...')

// 分享相关状态
const shareLinkCopied = ref(false)

// 使用 composables
const { isDark, toggleTheme } = useTheme()
const { isCompiling, isExecuting, compileResult, executionResult, hasErrors, compile, clearResults } = useCompiler() as any

// 页面加载时检查是否有分享的代码
onMounted(() => {
  const sharedCode = getSharedCode()
  if (sharedCode) {
    kotlinCode.value = sharedCode
    consoleOutput.value = '已加载分享的代码，点击「编译」运行...'
    // 清除 URL 中的 code 参数
    clearCodeFromUrl()
  }
})

// 计算属性
const jsOutput = computed({
  get: () => compileResult.value?.jsCode || '',
  set: () => {}
})

// 监听编译结果变化
watch(compileResult, (result) => {
  if (result) {
    if (result.success) {
      // API 直接返回执行后的输出
      consoleOutput.value = result.jsCode || '执行成功 (无输出)'
    } else if (result.errors.length > 0) {
      consoleOutput.value = `编译错误:\n${result.errors.map((e: any) => `Line ${e.line}:${e.column} - ${e.message}`).join('\n')}`
    }
  }
})

/**
 * 编译代码
 */
async function handleCompile() {
  if (!kotlinCode.value.trim()) return

  const result = await compile(kotlinCode.value)

  if (result.success) {
    // API 直接返回执行后的输出
    consoleOutput.value = result.jsCode || '执行成功 (无输出)'
  } else {
    consoleOutput.value = `编译错误:\n${result.errors.map((e: any) => `Line ${e.line}:${e.column} - ${e.message}`).join('\n')}`
  }
}

/**
 * 运行代码（重新编译）
 */
async function handleRun() {
  // 对于 JS 目标，API 会直接执行代码，所以运行 = 重新编译
  await handleCompile()
}

/**
 * 清空所有内容
 */
function clearAll() {
  kotlinCode.value = ''
  clearResults()
  consoleOutput.value = '点击「编译」按钮运行 Kotlin 代码...'
}

/**
 * 清空控制台
 */
function clearConsole() {
  consoleOutput.value = '控制台已清空'
}

/**
 * 复制到剪贴板
 */
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    consoleOutput.value = '已复制到剪贴板！'
    setTimeout(() => {
      if (consoleOutput.value === '已复制到剪贴板！') {
        consoleOutput.value = '点击「编译」按钮运行 Kotlin 代码...'
      }
    }, 2000)
  } catch (err) {
    consoleOutput.value = '复制失败: ' + (err as Error).message
  }
}

/**
 * 生成并复制分享链接
 */
async function shareCode() {
  if (!kotlinCode.value.trim()) {
    consoleOutput.value = '没有可分享的代码'
    return
  }

  try {
    const shareUrl = generateShareUrl(kotlinCode.value)
    await navigator.clipboard.writeText(shareUrl)
    shareLinkCopied.value = true
    consoleOutput.value = '✓ 分享链接已复制到剪贴板！'
    setTimeout(() => {
      shareLinkCopied.value = false
      if (consoleOutput.value === '✓ 分享链接已复制到剪贴板！') {
        consoleOutput.value = '点击「编译」按钮运行 Kotlin 代码...'
      }
    }, 3000)
  } catch (err) {
    consoleOutput.value = '分享失败: ' + (err as Error).message
  }
}
</script>

<style scoped lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

// 顶部导航栏
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

[data-theme="dark"] .app-header {
  background: rgba(30, 30, 30, 0.8);
}

.header-left {
  display: flex;
  flex-direction: column;
}

.app-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.kotlin-badge {
  background: linear-gradient(135deg, #7f52ff 0%, #a06bf8 100%);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.title-text {
  color: var(--text-primary);
}

.app-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background: var(--bg-tertiary);
    border-color: var(--accent-color);
  }
}

// 主内容区
.main-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
}

.editor-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
}

.output-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
}

// 区域头部
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;

  &.compact {
    padding: 0.375rem 0.5rem;
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h2, h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
  }
}

.language-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.kotlin {
    background: linear-gradient(135deg, #7f52ff 0%, #a06bf8 100%);
    color: white;
  }

  &.javascript {
    background: linear-gradient(135deg, #f7df1e 0%, #f0db4f 100%);
    color: #000;
  }

  &.console {
    background: linear-gradient(135deg, #00a86b 0%, #00d48d 100%);
    color: white;
  }
}

// 工具栏
.toolbar {
  display: flex;
  gap: 0.5rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}

.btn-icon {
  font-size: 1rem;
}

.btn-primary {
  background: var(--accent-color);
  color: white;

  &:not(:disabled):hover {
    background: var(--accent-hover);
  }
}

.btn-success {
  background: var(--success-color);
  color: white;

  &:not(:disabled):hover {
    background: #00965e;
  }
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);

  &:not(:disabled):hover {
    background: var(--border-color);
  }
}

.btn-share {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;

  &.copied {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// 编辑器包装
.editor-wrapper,
.output-wrapper {
  flex: 1;
  min-height: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

// 编译状态
.compile-status {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8125rem;

  &.success {
    background: rgba(0, 168, 107, 0.1);
    color: var(--success-color);
  }

  &.error {
    background: var(--error-bg);
    color: var(--error-color);
  }
}

// 错误面板
.error-panel {
  padding: 0.75rem;
  background: var(--error-bg);
  border: 1px solid var(--error-color);
  border-radius: 6px;
}

.error-panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--error-color);
  margin-bottom: 0.5rem;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.error-item {
  display: flex;
  gap: 0.75rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
}

.error-location {
  color: var(--error-color);
  font-weight: 600;
  white-space: nowrap;
}

.error-message {
  color: var(--error-color);
}

// 输出面板
.output-panel {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.js-output {
  flex: 1;
  min-height: 0;
}

.console-output {
  flex: 1;
  min-height: 0;
}

.console-wrapper {
  flex: 1;
  padding: 1rem;
  background: var(--code-bg);
  color: var(--code-text);
  overflow: auto;
  min-height: 120px;

  &.has-error {
    background: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }
}

.console-text {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
}

// 响应式
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .editor-section {
    height: 50vh;
  }

  .output-section {
    height: 40vh;
  }
}
</style>
