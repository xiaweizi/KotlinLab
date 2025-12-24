<template>
  <div class="lesson-page">
    <!-- 顶部导航栏 -->
    <header class="lesson-header">
      <div class="header-left">
        <router-link to="/learn" class="back-btn">
          <span>← 返回</span>
        </router-link>
        <div class="lesson-info">
          <span class="day-badge">Day {{ day }}</span>
          <h1 class="lesson-title">{{ lessonData?.title }}</h1>
        </div>
      </div>
      <div class="header-actions">
        <SearchBox />
        <router-link to="/" class="icon-btn" title="打开完整编辑器">
          <span>💻</span>
        </router-link>
        <button @click="toggleTheme" class="icon-btn" :title="isDark ? '切换到亮色主题' : '切换到深色主题'">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main v-if="lessonData" class="lesson-main">
      <!-- 左侧：知识点和练习 -->
      <aside class="lesson-sidebar">
        <!-- 知识点 -->
        <section class="sidebar-section">
          <h2 class="section-title">📚 知识点</h2>
          <KnowledgeList :topics="lessonData.topics" />
        </section>

        <!-- 练习题 -->
        <section v-if="lessonData.exercises.length > 0" class="sidebar-section">
          <h2 class="section-title">📝 练习</h2>
          <div class="exercises-list">
            <div
              v-for="exercise in lessonData.exercises"
              :key="exercise.id"
              class="exercise-item"
              :class="{ completed: isExerciseCompleted(day, exercise.id) }"
            >
              <div class="exercise-header" @click="toggleExercise(exercise)">
                <span class="exercise-number">
                  <span v-if="isExerciseCompleted(day, exercise.id)" class="check-icon">✓</span>
                  {{ exercise.title }}
                </span>
                <span class="expand-icon">{{ expandedExercise === exercise.id ? '▼' : '▶' }}</span>
              </div>
              <div v-show="expandedExercise === exercise.id" class="exercise-content">
                <p class="exercise-description">{{ exercise.description }}</p>
                <div class="exercise-actions">
                  <button @click="loadExercise(exercise)" class="btn-small btn-primary">
                    在编辑器中打开
                  </button>
                  <button v-if="exercise.hint" @click="showHint(exercise)" class="btn-small btn-secondary">
                    💡 提示
                  </button>
                  <button @click="checkExercise(exercise)" class="btn-small btn-success">
                    ✓ 验证答案
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 完成按钮 -->
        <section class="sidebar-section">
          <button
            @click="() => markDayCompleted(day)"
            class="complete-btn"
            :class="{ completed: isDayCompleted(day) }"
          >
            <span v-if="isDayCompleted(day)">✓ 已完成</span>
            <span v-else>标记为完成</span>
          </button>
        </section>
      </aside>

      <!-- 右侧：Demo 运行器 -->
      <section class="lesson-content">
        <DemoRunner
          ref="demoRunnerRef"
          :day="day"
          :demos="lessonData.demos"
          :completed-demos="getDayProgress(day)?.demosCompleted || []"
          @demo-completed="handleDemoCompleted"
        />
      </section>
    </main>

    <!-- 加载状态 -->
    <div v-else class="loading-state">
      <p>加载中...</p>
    </div>

    <!-- 提示弹窗 -->
    <div v-if="showHintModal" class="modal-overlay" @click="showHintModal = false">
      <div class="modal-content" @click.stop>
        <h3>💡 提示</h3>
        <p>{{ currentHint }}</p>
        <button @click="showHintModal = false" class="btn-small">关闭</button>
      </div>
    </div>

    <!-- 判题结果弹窗 -->
    <div v-if="showValidationModal" class="modal-overlay" @click="showValidationModal = false">
      <div class="modal-content" @click.stop>
        <h3>{{ validationTitle }}</h3>
        <pre class="validation-text">{{ validationMessage }}</pre>
        <button @click="showValidationModal = false" class="btn-small">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useProgress } from '@/composables/useProgress'
import { useCurriculum } from '@/composables/useCurriculum'
import KnowledgeList from '@/components/KnowledgeList/KnowledgeList.vue'
import DemoRunner from '@/components/DemoRunner/DemoRunner.vue'
import SearchBox from '@/components/SearchBox/SearchBox.vue'
import type { Exercise } from '@/data/curriculum'

const route = useRoute()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const { getDayProgress, markDemoCompleted, markExerciseCompleted, isExerciseCompleted, isDayCompleted, markDayCompleted } = useProgress()
const { getDay } = useCurriculum()

// 获取当前天数
const day = computed(() => parseInt(route.params.day as string))

// 获取课程数据
const lessonData = computed(() => getDay(day.value))

// 当前展开的练习题
const expandedExercise = ref<string | null>(null)

// 提示弹窗
const showHintModal = ref(false)
const currentHint = ref('')

// 判题结果弹窗
const showValidationModal = ref(false)
const validationTitle = ref('')
const validationMessage = ref('')

// DemoRunner 组件引用
const demoRunnerRef = ref<InstanceType<typeof DemoRunner> | null>(null)

// 切换练习题展开状态
const toggleExercise = (exercise: Exercise) => {
  if (expandedExercise.value === exercise.id) {
    expandedExercise.value = null
  } else {
    expandedExercise.value = exercise.id
  }
}

// 将练习题加载到编辑器
const loadExercise = (exercise: Exercise) => {
  expandedExercise.value = exercise.id
  if (demoRunnerRef.value && exercise.template) {
    demoRunnerRef.value.loadExerciseCode(exercise.template, exercise.title, exercise.id)
  }
}

// 显示提示
const showHint = (exercise: Exercise) => {
  currentHint.value = exercise.hint || '暂无提示'
  showHintModal.value = true
}

function openValidationModal(title: string, message: string) {
  validationTitle.value = title
  validationMessage.value = message
  showValidationModal.value = true
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

// 验证练习题答案
const checkExercise = async (exercise: Exercise) => {
  if (!demoRunnerRef.value) {
    openValidationModal('⚠️ 无法验证', '未找到运行器组件，请刷新页面后重试。')
    return
  }

  const context = demoRunnerRef.value.getExerciseContext()
  const shouldLoadExerciseTemplate = !context.isExerciseMode || context.exerciseId !== exercise.id
  if (shouldLoadExerciseTemplate && exercise.template) {
    demoRunnerRef.value.loadExerciseCode(exercise.template, exercise.title, exercise.id)
  }

  if (!exercise.validator) {
    openValidationModal('ℹ️ 暂不支持自动判题', '该练习未配置 validator（输出正则），请参考提示/答案自行核对。')
    return
  }

  const validator = parseValidator(exercise.validator)
  if (!validator) {
    openValidationModal('⚠️ 判题配置错误', `validator 不是合法的正则表达式：\n${exercise.validator}`)
    return
  }

  const result = await demoRunnerRef.value.runCurrentCode()
  if (!result.success) {
    openValidationModal('❌ 未通过（编译失败）', result.output)
    return
  }

  const output = normalizeOutput(result.output).trim()
  const passed = validator.test(output)
  if (!passed) {
    openValidationModal(
      '❌ 未通过（输出不匹配）',
      `期望匹配正则：${exercise.validator}\n\n实际输出：\n${output || '(无输出)'}`
    )
    return
  }

  markExerciseCompleted(day.value, exercise.id)
  openValidationModal('✅ 通过', '输出符合预期，已标记该练习为完成。')
}

// 处理 Demo 完成事件
const handleDemoCompleted = (demoId: string) => {
  markDemoCompleted(day.value, demoId)
}

onMounted(() => {
  if (!lessonData.value) {
    router.push('/learn')
  }
})
</script>

<style scoped lang="scss">
.lesson-page {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
}

.validation-text {
  margin: 0.75rem 0 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem;
  max-height: 50vh;
  overflow: auto;
}

// 顶部导航栏
.lesson-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

[data-theme="dark"] .lesson-header {
  background: rgba(30, 30, 30, 0.8);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.day-badge {
  background: linear-gradient(135deg, #7f52ff 0%, #a06bf8 100%);
  color: white;
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.lesson-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  font-size: 1.125rem;

  &:hover {
    background: var(--bg-tertiary);
    border-color: var(--accent-color);
  }
}

// 主内容区
.lesson-main {
  flex: 1;
  display: grid;
  grid-template-columns: 320px 1fr;
  overflow: hidden;
}

// 侧边栏
.lesson-sidebar {
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

// 知识点列表
.exercises-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.exercise-item {
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: all 0.2s;

  &.completed {
    border-color: var(--success-color);
    background: rgba(0, 168, 107, 0.05);
  }
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--bg-primary);
  }
}

.exercise-number {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.check-icon {
  color: var(--success-color);
  font-weight: 700;
}

.expand-icon {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.exercise-content {
  padding: 0 1rem 1rem;
  border-top: 1px solid var(--border-color);
}

.exercise-description {
  margin: 1rem 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.exercise-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-small {
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &.btn-primary {
    background: var(--accent-color);
    color: white;
  }

  &.btn-secondary {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }

  &.btn-success {
    background: var(--success-color);
    color: white;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}

.complete-btn {
  width: 100%;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  border: 2px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--accent-color);
    background: var(--bg-primary);
  }

  &.completed {
    background: var(--success-color);
    border-color: var(--success-color);
    color: white;
  }
}

// Demo 运行器区域
.lesson-content {
  overflow: hidden;
}

// 加载状态
.loading-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

// 提示弹窗
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  h3 {
    margin: 0 0 1rem;
    color: var(--text-primary);
  }

  p {
    margin: 0 0 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }
}

// 响应式
@media (max-width: 1024px) {
  .lesson-main {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .lesson-sidebar {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    max-height: 40vh;
  }
}
</style>
