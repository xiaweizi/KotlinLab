<template>
  <div class="search-container">
    <button
      @click="openSearch"
      class="search-trigger"
      :title="shortcutHint"
    >
      <span class="search-icon">🔍</span>
      <span class="search-text">{{ t('common.search') }}</span>
      <span class="shortcut-hint">{{ shortcutText }}</span>
    </button>

    <!-- 搜索弹窗 - 使用 Teleport 传送到 body，确保蒙层完全覆盖 -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="search-modal" @click.self="closeSearch">
          <div class="search-dialog">
            <!-- 搜索输入框 -->
            <div class="search-input-wrapper">
              <span class="search-icon">🔍</span>
              <input
                ref="searchInputRef"
                v-model="searchQuery"
                type="text"
                class="search-input"
                :placeholder="t('search.placeholder')"
                @keydown.esc="closeSearch"
                @keydown.down="navigateResults(1)"
                @keydown.up="navigateResults(-1)"
                @keydown.enter="selectResult"
                @focus="onInputFocus"
              >
              <button v-if="searchQuery" @click="clearSearch" class="clear-btn">×</button>
            </div>

            <!-- 搜索结果 -->
            <div class="search-results">
              <div v-if="isSearching" class="search-loading">{{ t('search.searching') }}</div>
              <div v-else-if="searchQuery && filteredResults.length === 0" class="search-empty">
                {{ t('search.noResults', { query: searchQuery }) }}
              </div>
              <!-- 搜索历史 -->
              <div v-else-if="!searchQuery && hasHistory" class="search-history">
                <div class="history-header">
                  <span class="history-title">🔥 {{ t('search.historyTitle') }}</span>
                  <button @click="clearAllHistory" class="clear-all-btn">{{ t('search.clearAll') }}</button>
                </div>
                <ul class="history-list">
                  <li v-for="(item, index) in searchHistory" :key="item.keyword" class="history-item">
                    <span class="history-keyword" @click="searchHistoryClick(item.keyword)">{{ item.keyword }}</span>
                    <button @click="removeHistory(index)" class="history-delete" :title="t('search.delete')">×</button>
                  </li>
                </ul>
              </div>
              <div v-else-if="!searchQuery && !hasHistory" class="search-hints">
                <p class="hints-title">💡 {{ t('search.hintsTitle') }}</p>
                <ul class="hints-list">
                  <li v-for="(hint, index) in searchHints" :key="index">{{ hint }}</li>
                </ul>
              </div>
              <div v-else class="results-list">
                <div
                  v-for="(result, index) in filteredResults"
                  :key="result.id"
                  class="result-item"
                  :class="{ selected: selectedIndex === index }"
                  @click="goToResult(result)"
                  @mouseenter="selectedIndex = index"
                >
                  <span class="result-type">{{ getLocalizedType(result.type) }}</span>
                  <span class="result-day">Day {{ result.day }}</span>
                  <span class="result-title">{{ result.title }}</span>
                  <span v-if="result.matchText" class="result-match">"{{ result.matchText }}"</span>
                </div>
              </div>
            </div>

            <!-- 底部提示 -->
            <div class="search-footer">
              <span class="footer-hint">
                <kbd>↑↓</kbd> {{ t('search.navigate') }}
                <kbd>Enter</kbd> {{ t('search.jump') }}
                <kbd>Esc</kbd> {{ t('search.closeKey') }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCurriculum } from '@/composables/useCurriculum'

type ResultType = '知识点' | 'Demo' | '练习'

interface SearchResult {
  id: string
  type: ResultType
  day: number
  title: string
  matchText?: string
  route: string
  demoId?: string
  exerciseId?: string
}

interface SearchHistoryItem {
  keyword: string
  timestamp: number
}

const { t } = useI18n()
const router = useRouter()
const { allDays } = useCurriculum()

// 搜索历史相关
const STORAGE_KEY = 'kotlin-lab-search-history'
const MAX_HISTORY = 5

const searchHistory = ref<SearchHistoryItem[]>([])

// 获取搜索提示数���
const searchHints = computed(() => {
  const hints = t('search.hints')
  if (typeof hints === 'string') return []
  return hints
})

// 是否有搜索历史
const hasHistory = computed(() => searchHistory.value.length > 0)

// 加载搜索历史
function loadHistory(): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      searchHistory.value = JSON.parse(saved)
    }
  } catch {
    searchHistory.value = []
  }
}

// 保存搜索历史
function saveHistory(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value))
}

// 添加搜索历史
function addHistory(keyword: string): void {
  if (!keyword.trim()) return

  // 移除相同关键词的历史记录
  searchHistory.value = searchHistory.value.filter(item => item.keyword !== keyword)

  // 添加到历史
  searchHistory.value.unshift({
    keyword: keyword.trim(),
    timestamp: Date.now()
  })

  // 保持最多 MAX_HISTORY 条
  searchHistory.value = searchHistory.value.slice(0, MAX_HISTORY)

  saveHistory()
}

// 删除单条历史
function removeHistory(index: number): void {
  searchHistory.value.splice(index, 1)
  saveHistory()
}

// 清空所有历史
function clearAllHistory(): void {
  searchHistory.value = []
  saveHistory()
}

// 点击历史记录进行搜索
function searchHistoryClick(keyword: string): void {
  searchQuery.value = keyword
  // 自动执行搜索
  nextTick(() => {
    performSearch()
  })
}

// 清空搜索框
function clearSearch(): void {
  searchQuery.value = ''
}

// 输入框获得焦点时加载历史
function onInputFocus(): void {
  loadHistory()
}

// 搜索状态
const isOpen = ref(false)
const searchQuery = ref('')
const selectedIndex = ref(0)
const searchInputRef = ref<HTMLInputElement>()

// 搜索计算状态
const isSearching = ref(false)
const filteredResults = ref<SearchResult[]>([])

// 快捷键提示
const shortcutText = computed(() => {
  return navigator.userAgent.includes('Mac') ? '⌘K' : 'Ctrl+K'
})
const shortcutHint = computed(() => {
  return `${t('common.search')} (${shortcutText.value})`
})

// 获取本地化的类型名称
const getLocalizedType = (type: ResultType): string => {
  const typeMap: Record<ResultType, string> = {
    '知识点': t('lessonPage.knowledge'),
    'Demo': 'Demo',
    '练习': t('lessonPage.exercises')
  }
  return typeMap[type] || type
}

// 打开搜索
const openSearch = () => {
  isOpen.value = true
  searchQuery.value = ''
  selectedIndex.value = 0
  loadHistory()
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

// 关闭搜索
const closeSearch = () => {
  isOpen.value = false
  searchQuery.value = ''
}

const focusSearchInput = () => {
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const handleGlobalKeyDown = (event: KeyboardEvent) => {
  const isCtrlOrMeta = event.ctrlKey || event.metaKey
  if (!isCtrlOrMeta) return
  if (event.key.toLowerCase() !== 'k') return

  event.preventDefault()
  if (isOpen.value) {
    focusSearchInput()
    return
  }
  openSearch()
}

onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeyDown)
  loadHistory()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeyDown)
})

// 执行搜索
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    filteredResults.value = []
    return
  }

  isSearching.value = true
  const query = searchQuery.value.toLowerCase().trim()

  const results: SearchResult[] = []

  // 搜索所有天数的内容
  for (const day of allDays.value) {
    // 搜索知识点
    for (const topic of day.topics) {
      if (topic.toLowerCase().includes(query)) {
        results.push({
          id: `${day.day}-topic-${topic}`,
          type: '知识点',
          day: day.day,
          title: topic,
          matchText: topic,
          route: `/learn/day/${day.day}`
        })
      }
    }

    // 搜索 Demo
    for (const demo of day.demos) {
      if (demo.title.toLowerCase().includes(query) ||
          demo.description.toLowerCase().includes(query) ||
          demo.code.toLowerCase().includes(query)) {
        results.push({
          id: `${day.day}-demo-${demo.id}`,
          type: 'Demo',
          day: day.day,
          title: demo.title,
          matchText: demo.title,
          route: `/learn/day/${day.day}?demo=${encodeURIComponent(demo.id)}`,
          demoId: demo.id
        })
      }
    }

    // 搜索练习题
    for (const exercise of day.exercises) {
      if (exercise.title.toLowerCase().includes(query) ||
          exercise.description.toLowerCase().includes(query)) {
        results.push({
          id: `${day.day}-exercise-${exercise.id}`,
          type: '练习',
          day: day.day,
          title: exercise.title,
          matchText: exercise.title,
          route: `/learn/day/${day.day}?exercise=${encodeURIComponent(exercise.id)}`,
          exerciseId: exercise.id
        })
      }
    }
  }

  // 按类型和天数排序，去重
  const uniqueResults = Array.from(
    new Map(results.map(r => [r.id, r])).values()
  ).sort((a, b) => {
    // 优先显示匹配度高的（标题完全匹配）
    const aExact = a.title.toLowerCase() === query
    const bExact = b.title.toLowerCase() === query
    if (aExact && !bExact) return -1
    if (!aExact && bExact) return 1
    return a.day - b.day
  })

  filteredResults.value = uniqueResults.slice(0, 10) // 最多显示10条结果
  isSearching.value = false

  // 添加到搜索历史
  if (results.length > 0) {
    addHistory(searchQuery.value)
  }
}

// 防抖搜索
let searchTimer: number | null = null
watch(searchQuery, () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => {
    performSearch()
  }, 150)
})

// 导航搜索结果
const navigateResults = (direction: number) => {
  if (filteredResults.value.length === 0) return
  selectedIndex.value = Math.max(0, Math.min(filteredResults.value.length - 1, selectedIndex.value + direction))
}

// 选择结果
const selectResult = () => {
  if (filteredResults.value.length > 0 && selectedIndex.value < filteredResults.value.length) {
    goToResult(filteredResults.value[selectedIndex.value])
  }
}

// 跳转到结果
const goToResult = (result: SearchResult) => {
  closeSearch()
  router.push(result.route)
}

// 暴露方法供外部调用
defineExpose({
  openSearch,
  closeSearch
})
</script>

<style scoped lang="scss">
.search-container {
  display: inline-block;
}

.search-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.625rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  justify-content: center;

  &:hover {
    background: var(--bg-tertiary);
    border-color: var(--accent-color);
  }
}

.search-text,
.shortcut-hint {
  display: none;
}

.search-icon {
  font-size: 1.125rem;
  line-height: 1;
}

// 搜索弹窗
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.search-dialog {
  width: 90%;
  max-width: 600px;
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  gap: 0.75rem;
}

.search-icon {
  font-size: 1.125rem;
  opacity: 0.6;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--text-primary);
  outline: none;

  &::placeholder {
    color: var(--text-secondary);
  }
}

.clear-btn {
  padding: 0.25rem 0.5rem;
  background: var(--bg-tertiary);
  border: none;
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;

  &:hover {
    background: var(--border-color);
  }
}

// 搜索结果区域
.search-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.search-loading,
.search-empty,
.search-hints {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}

// 搜索历史
.search-history {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.history-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.clear-all-btn {
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;

  &:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: background 0.15s;

  &:hover {
    background: var(--bg-tertiary);
  }
}

.history-keyword {
  flex: 1;
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-delete {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: none;
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: all 0.15s;

  &:hover {
    background: var(--error-color);
    color: white;
  }
}

.hints-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.hints-list {
  list-style: none;
  padding: 0;
  display: inline-block;
  text-align: left;

  li {
    padding: 0.25rem 0;
  }
}

.results-list {
  padding: 0.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover,
  &.selected {
    background: var(--bg-tertiary);
  }

  &.selected {
    background: var(--accent-color);
    color: white;

    .result-type,
    .result-day,
    .result-match {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.result-type {
  padding: 0.125rem 0.5rem;
  background: var(--bg-tertiary);
  border-radius: 4px;
  font-size: 0.6875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.result-day {
  padding: 0.125rem 0.5rem;
  background: rgba(127, 82, 255, 0.15);
  border-radius: 4px;
  font-size: 0.6875rem;
  color: var(--accent-color);
  font-weight: 500;
}

.result-title {
  flex: 1;
  font-size: 0.875rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-match {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-style: italic;
}

// 底部提示
.search-footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
}

.footer-hint {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);

  kbd {
    padding: 0.125rem 0.375rem;
    background: var(--bg-tertiary);
    border-radius: 3px;
    font-family: inherit;
    margin-right: 0.25rem;
  }
}

// 动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;

  .search-dialog {
    transition: transform 0.15s ease, opacity 0.15s ease;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;

  .search-dialog {
    transform: translateY(-10px) scale(0.98);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .search-modal {
    padding-top: 10vh;
    align-items: flex-end;
  }

  .search-dialog {
    width: 100%;
    max-height: 80vh;
    border-radius: 12px 12px 0 0;
  }

  .search-results {
    max-height: 50vh;
  }
}
</style>
