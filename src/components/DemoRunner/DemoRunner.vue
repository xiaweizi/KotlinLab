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
          <span v-if="isExerciseMode">{{ exerciseTitle || '练习题' }}</span>
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
      <div class="output-panel">
        <div class="panel-header">
          <span class="panel-title">输出结果</span>
          <button @click="clearOutput" class="action-btn" title="清空输出">
            🗑 清空
          </button>
        </div>
        <div class="output-wrapper" :class="{ 'has-error': hasError }">
          <pre class="output-text">{{ output }}</pre>
        </div>
        <!-- 完成标记 -->
        <div class="output-footer">
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
import { ref, computed, watch } from 'vue'
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

// 练习题模式
const isExerciseMode = ref(false)

// 暂存原始 Demo 代码（用于退出练习题模式恢复）
const originalDemoCode = ref<string | null>(null)

const { isDark } = useTheme()
const { compile, isCompiling } = useCompiler() as any

// 当前 Demo 索引
const currentDemoIndex = ref(0)

// 当前代码
const currentCode = ref('')

// 输出
const output = ref('点击「运行代码」查看结果...')
const hasError = ref(false)

// 获取当前 Demo
const currentDemo = computed(() => props.demos[currentDemoIndex.value])

// 监听 Demo 变化，更新代码
watch(currentDemo, (demo) => {
  if (demo) {
    currentCode.value = demo.code
    output.value = '点击「运行代码」查看结果...'
    hasError.value = false
  }
}, { immediate: true })

// 运行代码
const runCode = async () => {
  if (!currentCode.value.trim()) return

  hasError.value = false
  const result = await compile(currentCode.value)

  if (result.success) {
    output.value = result.jsCode || '执行成功 (无输出)'
    // 如果有预期输出，检查是否匹配
    if (currentDemo.value?.expectedOutput) {
      // 简单的字符串匹配
      if (output.value.includes(currentDemo.value.expectedOutput.slice(0, 20))) {
        // 自动标记完成
        markCompleted()
      }
    }
  } else {
    hasError.value = true
    output.value = `编译错误:\n${result.errors.map((e: any) => `Line ${e.line}:${e.column} - ${e.message}`).join('\n')}`
  }
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
  output.value = '输出已清空'
  hasError.value = false
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
const loadExerciseCode = (code: string, _title: string) => {
  // 保存当前 Demo 代码
  originalDemoCode.value = currentCode.value
  // 加载练习题代码
  currentCode.value = code
  isExerciseMode.value = true
  output.value = '练习题已加载，请完成后点击「运行代码」验证...'
  hasError.value = false
}

// 退出练习题模式
const exitExerciseMode = () => {
  if (originalDemoCode.value) {
    currentCode.value = originalDemoCode.value
    originalDemoCode.value = null
  }
  isExerciseMode.value = false
  output.value = '点击「运行代码」查看结果...'
  hasError.value = false
}

// 暴露方法给父组件
defineExpose({
  loadExerciseCode,
  exitExerciseMode
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
