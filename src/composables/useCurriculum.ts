/**
 * 课程数据管理 Composable
 */
import { computed } from 'vue'
import curriculum, { type DayCurriculum, getDayData, getNextDay, hasPreviousDay, getTotalDays, getByDifficulty } from '@/data/curriculum'

export function useCurriculum() {
  // 获取所有课程
  const allDays = computed(() => curriculum)

  // 获取指定天数的数据
  const getDay = (day: number): DayCurriculum | undefined => {
    return getDayData(day)
  }

  // 获取下一课
  const getNext = (currentDay: number): DayCurriculum | undefined => {
    return getNextDay(currentDay)
  }

  // 是否有上一课
  const hasPrevious = (currentDay: number): boolean => {
    return hasPreviousDay(currentDay)
  }

  // 获取总课程数
  const totalDays = computed(() => getTotalDays())

  // 根据难度获取课程
  const getByDifficultyLevel = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return getByDifficulty(difficulty)
  }

  // 获取初级课程数量
  const beginnerCount = computed(() => getByDifficulty('beginner').length)

  // 获取中级课程数量
  const intermediateCount = computed(() => getByDifficulty('intermediate').length)

  // 获取高级课程数量
  const advancedCount = computed(() => getByDifficulty('advanced').length)

  // 获取第一课
  const firstLesson = computed(() => curriculum[0])

  // 获取最后一课
  const lastLesson = computed(() => curriculum[curriculum.length - 1])

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
