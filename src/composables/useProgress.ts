/**
 * 学习进度管理 Composable
 * 使用 localStorage 持久���进度
 */
import { ref, computed, watch } from 'vue'
import type { DayProgress, LearningProgress } from '@/data/curriculum'

const PROGRESS_STORAGE_KEY = 'kotlin-learning-progress'

// 默认进度结构
const createDefaultProgress = (): LearningProgress => ({
  currentDay: 1,
  days: {},
  totalStudyTime: 0,
  startDate: new Date().toISOString(),
  lastStudyDate: new Date().toISOString()
})

// 创建单日进度
const createDayProgress = (day: number): DayProgress => ({
  day,
  completed: false,
  demosCompleted: [],
  exercisesCompleted: [],
  lastAccessed: new Date().toISOString(),
  timeSpent: 0
})

// 全局进度状态
const progress = ref<LearningProgress>(loadProgress())

// 从 localStorage 加载进度
function loadProgress(): LearningProgress {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as LearningProgress
    }
  } catch (e) {
    console.error('Failed to load progress:', e)
  }
  return createDefaultProgress()
}

// 保存进度到 localStorage
function saveProgress() {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress.value))
  } catch (e) {
    console.error('Failed to save progress:', e)
  }
}

// 监听进度变化自动保存
watch(
  progress,
  () => {
    saveProgress()
  },
  { deep: true }
)

export function useProgress() {
  // 获取指定天数的进度
  const getDayProgress = (day: number): DayProgress => {
    if (!progress.value.days[day]) {
      progress.value.days[day] = createDayProgress(day)
    }
    return progress.value.days[day]!
  }

  // 更新当前学习天数
  const setCurrentDay = (day: number) => {
    progress.value.currentDay = day
  }

  // 标记 Demo 已完成
  const markDemoCompleted = (day: number, demoId: string) => {
    const dayProgress = getDayProgress(day)
    if (!dayProgress.demosCompleted.includes(demoId)) {
      dayProgress.demosCompleted.push(demoId)
    }
  }

  // 取消 Demo 完成标记
  const unmarkDemoCompleted = (day: number, demoId: string) => {
    const dayProgress = getDayProgress(day)
    dayProgress.demosCompleted = dayProgress.demosCompleted.filter(id => id !== demoId)
  }

  // 检查 Demo 是否已完成
  const isDemoCompleted = (day: number, demoId: string): boolean => {
    const dayProgress = getDayProgress(day)
    return dayProgress.demosCompleted.includes(demoId)
  }

  // 标记练习题已完成
  const markExerciseCompleted = (day: number, exerciseId: string) => {
    const dayProgress = getDayProgress(day)
    if (!dayProgress.exercisesCompleted.includes(exerciseId)) {
      dayProgress.exercisesCompleted.push(exerciseId)
    }
  }

  // 检查练习题是否已完成
  const isExerciseCompleted = (day: number, exerciseId: string): boolean => {
    const dayProgress = getDayProgress(day)
    return dayProgress.exercisesCompleted.includes(exerciseId)
  }

  // 计算完成百分比
  const completionPercentage = computed(() => {
    const totalDays = Object.keys(progress.value.days).length
    if (totalDays === 0) return 0
    const completedDays = Object.values(progress.value.days).filter(d => d.completed).length
    return Math.round((completedDays / 14) * 100)
  })

  // 完成的天数
  const completedDaysCount = computed(() => {
    return Object.values(progress.value.days).filter(d => d.completed).length
  })

  // 标记当天已完成
  const markDayCompleted = (day: number) => {
    const dayProgress = getDayProgress(day)
    dayProgress.completed = true
  }

  // 取消当天完成标记
  const unmarkDayCompleted = (day: number) => {
    const dayProgress = getDayProgress(day)
    dayProgress.completed = false
  }

  // 检查当天是否已完成
  const isDayCompleted = (day: number): boolean => {
    const dayProgress = getDayProgress(day)
    return dayProgress.completed
  }

  // 更新学习时间
  const addStudyTime = (minutes: number) => {
    progress.value.totalStudyTime += minutes
    progress.value.lastStudyDate = new Date().toISOString()
  }

  // 更新单日学习时间
  const addDayStudyTime = (day: number, minutes: number) => {
    if (minutes <= 0) return
    const dayProgress = getDayProgress(day)
    dayProgress.timeSpent += minutes
    dayProgress.lastAccessed = new Date().toISOString()
    addStudyTime(minutes)
  }

  // 更新最后访问时间
  const updateLastAccessed = (day: number) => {
    const dayProgress = getDayProgress(day)
    dayProgress.lastAccessed = new Date().toISOString()
  }

  // 重置所有进度
  const resetProgress = () => {
    if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
      progress.value = createDefaultProgress()
    }
  }

  // 导出进度
  const exportProgress = (): string => {
    return JSON.stringify(progress.value, null, 2)
  }

  // 导入进度
  const importProgress = (json: string): boolean => {
    try {
      const imported = JSON.parse(json) as LearningProgress
      progress.value = imported
      return true
    } catch (e) {
      console.error('Failed to import progress:', e)
      return false
    }
  }

  // 获取学习统计
  const stats = computed(() => {
    const days = Object.values(progress.value.days)
    const totalDemos = days.reduce((sum, d) => sum + d.demosCompleted.length, 0)
    const totalExercises = days.reduce((sum, d) => sum + d.exercisesCompleted.length, 0)

    // 计算学习天数
    const startDate = new Date(progress.value.startDate)
    const now = new Date()
    const studyDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

    return {
      totalStudyTime: progress.value.totalStudyTime,
      completedDays: completedDaysCount.value,
      totalDemos,
      totalExercises,
      studyDays,
      currentDay: progress.value.currentDay,
      completionRate: completionPercentage.value
    }
  })

  return {
    // 状态
    progress,
    stats,
    completionPercentage,
    completedDaysCount,

    // 方法
    getDayProgress,
    setCurrentDay,
    markDemoCompleted,
    unmarkDemoCompleted,
    isDemoCompleted,
    markExerciseCompleted,
    isExerciseCompleted,
    markDayCompleted,
    unmarkDayCompleted,
    isDayCompleted,
    addStudyTime,
    addDayStudyTime,
    updateLastAccessed,
    resetProgress,
    exportProgress,
    importProgress
  }
}
