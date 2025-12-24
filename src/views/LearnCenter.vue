<template>
  <div class="learn-center">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-left">
        <h1 class="app-title">
          <span class="kotlin-badge">Kotlin</span>
          <span class="title-text">学习中心</span>
        </h1>
        <p class="app-subtitle">14天系统化学习 Kotlin 编程语言</p>
      </div>
      <div class="header-actions">
        <router-link to="/editor" class="icon-btn" title="打开编辑器">
          <span>💻</span>
        </router-link>
        <button @click="toggleTheme" class="icon-btn" :title="isDark ? '切换到亮色主题' : '切换到深色主题'">
          <span v-if="isDark" class="icon-sun">☀️</span>
          <span v-else class="icon-moon">🌙</span>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 学习进度概览 -->
      <section class="progress-overview">
        <h2 class="section-heading">📊 学习进度</h2>
        <div class="progress-card">
          <div class="progress-info">
            <div class="progress-text">
              <span class="progress-percentage">{{ completionPercentage }}%</span>
              <span class="progress-label">已完成 {{ completedDaysCount }} / {{ totalDays }} 天</span>
            </div>
            <div class="progress-stats">
              <div class="stat-item">
                <span class="stat-value">{{ stats.totalDemos }}</span>
                <span class="stat-label">已完成 Demo</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ stats.totalExercises }}</span>
                <span class="stat-label">已完成练习</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ formatTime(stats.totalStudyTime) }}</span>
                <span class="stat-label">学习时长</span>
              </div>
            </div>
          </div>
          <div class="progress-bar-wrapper">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: completionPercentage + '%' }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 课程列表 -->
      <section class="curriculum-section">
        <!-- Week 1 -->
        <div class="week-block">
          <h3 class="week-title">Week 1: 基础入门</h3>
          <div class="days-grid">
            <LessonCard
              v-for="day in week1Days"
              :key="day.day"
              :day="day"
              :completed="isDayCompleted(day.day)"
              :locked="isDayLocked(day.day)"
              @click="goToLesson(day.day)"
            />
          </div>
        </div>

        <!-- Week 2 -->
        <div class="week-block">
          <h3 class="week-title">Week 2: 进阶提升</h3>
          <div class="days-grid">
            <LessonCard
              v-for="day in week2Days"
              :key="day.day"
              :day="day"
              :completed="isDayCompleted(day.day)"
              :locked="isDayLocked(day.day)"
              @click="goToLesson(day.day)"
            />
          </div>
        </div>
      </section>

      <!-- 学习统计 -->
      <section class="stats-section">
        <h2 class="section-heading">📈 学习统计</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-icon">📅</span>
            <div class="stat-content">
              <span class="stat-value-small">{{ stats.studyDays }}</span>
              <span class="stat-label-small">学习天数</span>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon">⏱️</span>
            <div class="stat-content">
              <span class="stat-value-small">{{ formatTime(stats.totalStudyTime) }}</span>
              <span class="stat-label-small">总学习时长</span>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🎯</span>
            <div class="stat-content">
              <span class="stat-value-small">{{ stats.currentDay }}</span>
              <span class="stat-label-small">当前进度</span>
            </div>
          </div>
          <div class="stat-card clickable" @click="resetProgress">
            <span class="stat-icon">🔄</span>
            <div class="stat-content">
              <span class="stat-value-small">重置</span>
              <span class="stat-label-small">学习进度</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useProgress } from '@/composables/useProgress'
import { useCurriculum } from '@/composables/useCurriculum'
import LessonCard from '@/components/LessonCard/LessonCard.vue'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const {
  completionPercentage,
  completedDaysCount,
  isDayCompleted,
  resetProgress
} = useProgress()
const { allDays, totalDays, getDay } = useCurriculum()
const { stats } = useProgress()

// Week 1 课程 (Day 1-7)
const week1Days = computed(() => allDays.value.filter(d => d.day <= 7))

// Week 2 课程 (Day 8-14)
const week2Days = computed(() => allDays.value.filter(d => d.day > 7))

// 判断课程是否锁定（只有没有内容的课程才锁定）
const isDayLocked = (day: number): boolean => {
  const dayData = getDay(day)
  // 如果没有 demos 或者 demos 为空，则锁定
  return !dayData || !dayData.demos || dayData.demos.length === 0
}

// 跳转到课程页面
const goToLesson = (day: number) => {
  if (!isDayLocked(day)) {
    router.push(`/learn/day/${day}`)
  }
}

// 格式化时间
const formatTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}
</script>

<style scoped lang="scss">
.learn-center {
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
  padding: 1rem 2rem;
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
  font-size: 1.5rem;
  font-weight: 700;
}

.kotlin-badge {
  background: linear-gradient(135deg, #7f52ff 0%, #a06bf8 100%);
  color: white;
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.title-text {
  color: var(--text-primary);
}

.app-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
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
    transform: translateY(-2px);
  }
}

// 主内容区
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

// 进度概览
.progress-overview {
  margin-bottom: 2rem;
}

.progress-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.progress-percentage {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
}

.progress-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.progress-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-item .stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-item .stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.progress-bar-wrapper {
  margin-top: 1rem;
}

.progress-bar {
  height: 12px;
  background: var(--bg-tertiary);
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7f52ff 0%, #a06bf8 100%);
  border-radius: 6px;
  transition: width 0.5s ease;
}

// 课程区块
.curriculum-section {
  margin-bottom: 2rem;
}

.week-block {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.week-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

// 统计区块
.stats-section {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--border-color);
  transition: all 0.2s;

  &.clickable {
    cursor: pointer;

    &:hover {
      border-color: var(--accent-color);
      transform: translateY(-2px);
    }
  }
}

.stat-icon {
  font-size: 2rem;
  opacity: 0.8;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.stat-value-small {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-label-small {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

// 响应式
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .app-header {
    padding: 1rem;
  }

  .app-title {
    font-size: 1.125rem;
  }

  .days-grid {
    grid-template-columns: 1fr;
  }

  .progress-stats {
    gap: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
