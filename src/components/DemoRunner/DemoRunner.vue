<template>
  <div class="demo-runner">
    <!-- Demo 导航 -->
    <div class="demo-nav">
      <div class="nav-header">
        <h2 class="nav-title">
          <span v-if="isExerciseMode">📝 练习题模式</span>
          <span v-else>🎯 Demo {{ currentDemoIndex + 1 }}/{{ demos.length }}</span>
        </h2>
        <h3 class="demo-title">
          <span v-if="isExerciseMode">{{ currentExerciseTitle || '练习题' }}</span>
          <span v-else>{{ currentDemo?.title }}</span>
        </h3>
        <p class="demo-description">
          <span v-if="isExerciseMode">完成练习后点击「运行代码」验证答案</span>
          <span v-else>{{ currentDemo?.description }}</span>
        </p>
      </div>
      <div class="nav-controls">
        <button
          @click="previousDemo"
          :disabled="currentDemoIndex === 0"
          class="nav-btn"
          title="上一个 Demo"
        >
          ◀
        </button>
        <div class="demo-indicators">
          <span
            v-for="(demo, index) in demos"
            :key="demo.id"
            class="indicator"
            :class="{
              active: index === currentDemoIndex,
              completed: completedDemos.includes(demo.id)
            }"
            @click="goToDemo(index)"
          >
            {{ index + 1 }}
          </span>
        </div>
        <button
          @click="nextDemo"
          :disabled="currentDemoIndex === demos.length - 1"
          class="nav-btn"
          title="下一个 Demo"
        >
          ▶
        </button>
      </div>
    </div>

    <!-- 编辑器区域 -->
    <div class="editor-container">
      <div class="editor-panel">
        <div class="panel-header">
          <span class="panel-title">Kotlin 代码</span>
          <div class="panel-actions">
            <button v-if="isExerciseMode" @click="exitExerciseMode" class="action-btn exit-btn" title="退出练习题模式">
              ← 返回 Demo
            </button>
            <button @click="resetCode" class="action-btn" title="重置代码">
              🔁 重置
            </button>
            <button @click="copyCode" class="action-btn" title="复制代码">
              📋 复制
            </button>
          </div>
        </div>
        <div class="editor-wrapper">
          <MonacoEditor
            v-model="currentCode"
            :language="'kotlin'"
            :theme="isDark ? 'vs-dark' : 'vs'"
            :height="'100%'"
          />
        </div>
        <div class="editor-footer">
          <button
            @click="runCode"
            :disabled="isCompiling"
            class="run-btn"
          >
            <span v-if="isCompiling" class="spinner">⟳</span>
            <span v-else>▶</span>
            {{ isCompiling ? '运行中...' : '运行代码' }}
          </button>
        </div>
      </div>

      <!-- 输出区域 -->
      <div ref="outputPanelRef" class="output-panel" tabindex="-1">
        <div class="panel-header">
          <div class="output-header">
            <span class="panel-title">输出结果</span>
            <span v-if="validationBadge" class="validation-badge" :class="validationBadge.type">
              {{ validationBadge.text }}
            </span>
          </div>
          <button @click="clearOutput" class="action-btn" title="清空输出">
            🗑 清空
          </button>
        </div>
        <div class="output-wrapper" :class="{ 'has-error': hasError }">
          <pre class="output-text">{{ output }}</pre>
        </div>
        <!-- 完成标记 -->
        <div v-if="!isExerciseMode" class="output-footer">
          <button
            v-if="!completedDemos.includes(currentDemo?.id)"
            @click="markCompleted"
            class="complete-btn"
          >
            ✓ 标记为已完成
          </button>
          <span v-else class="completed-badge">✓ 已完成</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import MonacoEditor from '@/components/CodeEditor/MonacoEditor.vue'
import { useCompiler } from '@/composables/useCompiler'
import { useTheme } from '@/composables/useTheme'
import type { Demo } from '@/data/curriculum'

interface Props {
  day: number
  demos: Demo[]
  completedDemos: string[]
  exerciseCode?: string  // 练习题模板代码
  exerciseTitle?: string // 练习题标题
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'demo-completed': [demoId: string]
}>()

type RunCodeResult =
  | { success: true; output: string }
  | { success: false; output: string; error: string }

type ValidationBadge =
  | { type: 'pass'; text: string }
  | { type: 'fail'; text: string }
  | null

// 练习题模式
const isExerciseMode = ref(false)

// 暂存原始 Demo 代码（用于退出练习题模式恢复）
const originalDemoCode = ref<string | null>(null)
const currentExerciseTitle = ref<string>('')
const currentExerciseId = ref<string>('')

const { isDark } = useTheme()
const { compile, isCompiling } = useCompiler() as any

// 当前 Demo 索引
const currentDemoIndex = ref(0)

// 当前代码
const currentCode = ref('')

// 输出
const output = ref('点击「运行代码」查看结果...')
const hasError = ref(false)
const validationBadge = ref<ValidationBadge>(null)
const outputPanelRef = ref<HTMLElement | null>(null)

// 获取当前 Demo
const currentDemo = computed(() => props.demos[currentDemoIndex.value])

// 监听 Demo 变化，更新代码
watch(currentDemo, (demo) => {
  if (demo) {
    currentCode.value = demo.code
    output.value = '点击「运行代码」查看结果...'
    hasError.value = false
    validationBadge.value = null
  }
}, { immediate: true })

function formatCompileErrors(errors: Array<{ line?: number; column?: number; message?: string }>): string {
  if (!errors || errors.length === 0) return '编译失败（无详细错误信息）'
  return `编译错误:\n${errors.map(e => `Line ${e.line ?? 0}:${e.column ?? 0} - ${e.message ?? ''}`.trim()).join('\n')}`
}

function normalizeOutput(text: string): string {
  return text.replace(/\r\n/g, '\n')
}

function parseValidator(validator: string): RegExp | null {
  const trimmed = validator.trim()
  if (!trimmed) return null

  try {
    if (trimmed.startsWith('/')) {
      const lastSlash = trimmed.lastIndexOf('/')
      if (lastSlash > 0) {
        const pattern = trimmed.slice(1, lastSlash)
        const flags = trimmed.slice(lastSlash + 1)
        return new RegExp(pattern, flags)
      }
    }
    return new RegExp(trimmed, 'm')
  } catch {
    return null
  }
}

function setOutputMessage(message: string, options?: { isError?: boolean; badge?: ValidationBadge }) {
  output.value = message
  hasError.value = options?.isError ?? false
  validationBadge.value = options?.badge ?? null
}

async function focusOutputPanel() {
  await nextTick()
  outputPanelRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  outputPanelRef.value?.focus({ preventScroll: true })
}

// 执行当前代码并返回结果（供外部判题/验证使用）
const runCurrentCode = async (): Promise<RunCodeResult> => {
  if (!currentCode.value.trim()) {
    setOutputMessage('代码为空，无法运行。', { isError: true, badge: null })
    return { success: false, output: output.value, error: 'empty-code' }
  }

  hasError.value = false
  validationBadge.value = null
  const result = await compile(currentCode.value)

  if (result.success) {
    output.value = result.jsCode || '执行成功 (无输出)'
    const normalizedOutput = normalizeOutput(output.value).trim()

    if (!isExerciseMode.value && currentDemo.value?.expectedOutput) {
      const expected = normalizeOutput(currentDemo.value.expectedOutput).trim()
      if (normalizedOutput === expected) {
        markCompleted()
      }
    }

    return { success: true, output: normalizedOutput }
  } else {
    hasError.value = true
    output.value = formatCompileErrors(result.errors || [])
    return { success: false, output: output.value, error: 'compile-error' }
  }
}

// 验证练习题：运行 + 基于 validator 判题，并将结果展示在输出面板
const validateExercise = async (validator: string): Promise<{ passed: boolean }> => {
  if (!validator.trim()) {
    setOutputMessage('该练习未配置 validator（输出正则），无法自动判题。', {
      isError: false,
      badge: { type: 'fail', text: '未配置判题规则' }
    })
    return { passed: false }
  }

  const regex = parseValidator(validator)
  if (!regex) {
    setOutputMessage(`validator 不是合法的正则表达式：\n${validator}`, {
      isError: true,
      badge: { type: 'fail', text: '判题配置错误' }
    })
    return { passed: false }
  }

  const result = await runCurrentCode()
  if (!result.success) {
    setOutputMessage(result.output, { isError: true, badge: { type: 'fail', text: '编译失败' } })
    return { passed: false }
  }

  const normalizedOutput = normalizeOutput(result.output).trim()
  const passed = regex.test(normalizedOutput)

  if (!passed) {
    setOutputMessage(
      `❌ 未通过：输出不匹配\n\n期望匹配正则：${validator}\n\n实际输出：\n${normalizedOutput || '(无输出)'}`,
      { isError: true, badge: { type: 'fail', text: '未通过' } }
    )
    return { passed: false }
  }

  setOutputMessage(normalizedOutput || '执行成功 (无输出)', { isError: false, badge: { type: 'pass', text: '通过' } })
  return { passed: true }
}

// 运行代码（UI 按钮入口）
const runCode = async () => {
  await runCurrentCode()
}

// 重置代码
const resetCode = () => {
  if (currentDemo.value) {
    currentCode.value = currentDemo.value.code
  }
}

// 复制代码
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(currentCode.value)
    output.value = '已复制到剪贴板！'
    setTimeout(() => {
      if (output.value === '已复制到剪贴板！') {
        output.value = '点击「运行代码」查看结果...'
      }
    }, 1500)
  } catch (err) {
    output.value = '复制失败: ' + (err as Error).message
  }
}

// 清空输出
const clearOutput = () => {
  setOutputMessage('输出已清空', { isError: false, badge: null })
}

// 上一个 Demo
const previousDemo = () => {
  if (currentDemoIndex.value > 0) {
    currentDemoIndex.value--
    exitExerciseMode()
  }
}

// 下一个 Demo
const nextDemo = () => {
  if (currentDemoIndex.value < props.demos.length - 1) {
    currentDemoIndex.value++
    exitExerciseMode()
  }
}

// 跳转到指定 Demo
const goToDemo = (index: number) => {
  currentDemoIndex.value = index
  exitExerciseMode()
}

// 标记完成
const markCompleted = () => {
  if (currentDemo.value && !props.completedDemos.includes(currentDemo.value.id)) {
    emit('demo-completed', currentDemo.value.id)
  }
}

// 加载练习题代码
const loadExerciseCode = (code: string, title: string, exerciseId: string) => {
  // 保存当前 Demo 代码
  originalDemoCode.value = currentCode.value
  // 加载练习题代码
  currentCode.value = code
  isExerciseMode.value = true
  currentExerciseTitle.value = title
  currentExerciseId.value = exerciseId
  setOutputMessage('练习题已加载，请完成后点击「运行代码」验证...', { isError: false, badge: null })
}

// 退出练习题模式
const exitExerciseMode = () => {
  if (originalDemoCode.value) {
    currentCode.value = originalDemoCode.value
    originalDemoCode.value = null
  }
  isExerciseMode.value = false
  currentExerciseTitle.value = ''
  currentExerciseId.value = ''
  setOutputMessage('点击「运行代码」查看结果...', { isError: false, badge: null })
}

function getExerciseContext(): { isExerciseMode: boolean; exerciseId: string } {
  return {
    isExerciseMode: isExerciseMode.value,
    exerciseId: currentExerciseId.value
  }
}

// 暴露方法给父组件
defineExpose({
  loadExerciseCode,
  exitExerciseMode,
  runCurrentCode,
  getExerciseContext,
  validateExercise,
  setOutputMessage,
  focusOutputPanel
})
</script>

<style scoped lang="scss">
.demo-runner {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
}

// Demo 导航
.demo-nav {
  padding: 1rem 1.5rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.nav-header {
  margin-bottom: 1rem;
}

.nav-title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.demo-title {
  margin: 0 0 0.375rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.demo-description {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.nav-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.nav-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--bg-primary);
    border-color: var(--accent-color);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.demo-indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;

  &:hover {
    background: var(--bg-primary);
  }

  &.active {
    background: var(--accent-color);
    color: white;
    border-color: var(--accent-color);
  }

  &.completed {
    background: var(--success-color);
    color: white;
    border-color: var(--success-color);
  }
}

// 编辑器容器
.editor-container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
}

.editor-panel,
.output-panel {
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1rem;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
}

.panel-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.output-header {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.validation-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--border-color);

  &.pass {
    background: rgba(16, 185, 129, 0.12);
    color: var(--success-color);
    border-color: rgba(16, 185, 129, 0.35);
  }

  &.fail {
    background: rgba(239, 68, 68, 0.12);
    color: var(--error-color);
    border-color: rgba(239, 68, 68, 0.35);
  }
}

.panel-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem 0.625rem;
  border-radius: 6px;
  font-size: 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;

  &.exit-btn {
    background: var(--accent-color);
    color: white;
    border-color: var(--accent-color);
  }

  &:hover {
    background: var(--bg-primary);
    border-color: var(--accent-color);
  }

  &.exit-btn:hover {
    opacity: 0.9;
  }
}

.editor-wrapper {
  flex: 1;
  min-height: 0;
}

.editor-footer {
  padding: 0.75rem 1rem;
  background: var(--bg-tertiary);
  border-top: 1px solid var(--border-color);
}

.run-btn {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  background: var(--accent-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// 输出面板
.output-wrapper {
  flex: 1;
  padding: 1rem;
  background: var(--code-bg);
  color: var(--code-text);
  overflow: auto;

  &.has-error {
    background: rgba(239, 68, 68, 0.1);
    color: #fca5a5;
  }
}

.output-text {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
}

.output-footer {
  padding: 0.75rem 1rem;
  background: var(--bg-tertiary);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
}

.complete-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--success-color);
  background: transparent;
  color: var(--success-color);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--success-color);
    color: white;
  }
}

.completed-badge {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  background: var(--success-color);
  color: white;
}

// 响应式
@media (max-width: 1024px) {
  .editor-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}
</style>
