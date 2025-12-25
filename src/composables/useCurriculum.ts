/**
 * 课程数据管理 Composable
 * 支持国际化，当语言切换时自动重新加载课程数据
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getCurriculum, getDayDataLocalized, type DayCurriculum } from '@/data/curriculum'

export function useCurriculum() {
  const { locale } = useI18n()

  // 获取当前语言的课程数据
  const allDays = computed(() => getCurriculum(locale.value))

  // 获取指定天数的数据
  const getDay = (day: number): DayCurriculum | undefined => {
    return getDayDataLocalized(day, locale.value)
  }

  // 获取下一课
  const getNext = (currentDay: number): DayCurriculum | undefined => {
    const days = allDays.value
    return days.find(d => d.day === currentDay + 1)
  }

  // 是否有上一课
  const hasPrevious = (currentDay: number): boolean => {
    return currentDay > 1
  }

  // 获取总课程数
  const totalDays = computed(() => allDays.value.length)

  // 根据难度获取课程
  const getByDifficultyLevel = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return allDays.value.filter(d => d.difficulty === difficulty)
  }

  // 获取初级课程数量
  const beginnerCount = computed(() => getByDifficultyLevel('beginner').length)

  // 获取中级课程数量
  const intermediateCount = computed(() => getByDifficultyLevel('intermediate').length)

  // 获取高级课程数量
  const advancedCount = computed(() => getByDifficultyLevel('advanced').length)

  // 获取第一课
  const firstLesson = computed(() => allDays.value[0])

  // 获取最后一课
  const lastLesson = computed(() => allDays.value[allDays.value.length - 1])

  return {
    allDays,
    getDay,
    getNext,
    hasPrevious,
    totalDays,
    getByDifficultyLevel,
    beginnerCount,
    intermediateCount,
    advancedCount,
    firstLesson,
    lastLesson
  }
}
