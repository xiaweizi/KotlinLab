import { watch } from 'vue'
import { useStorage } from '@vueuse/core'

/**
 * 主题管理 Composable
 */
export function useTheme() {
  // 从 localStorage 读取主题设置，默认为 dark
  const isDark = useStorage<boolean>('kotlin-compiler-theme', true)

  /**
   * 切换主题
   */
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  /**
   * 设置主题
   */
  function setTheme(dark: boolean) {
    isDark.value = dark
  }

  // 监听主题变化，更新 DOM
  watch(isDark, (dark) => {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, { immediate: true })

  return {
    isDark,
    toggleTheme,
    setTheme
  }
}
