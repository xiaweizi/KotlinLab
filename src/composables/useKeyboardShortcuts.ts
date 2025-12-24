/**
 * 键盘快捷键 Composable
 *
 * 支持的快捷键：
 * - Ctrl+Enter / Cmd+Enter: 运行代码
 * - Ctrl+S / Cmd+S: 复制代码到剪贴板
 * - Ctrl+K / Cmd+K: 聚焦搜索框
 * - Esc: 清空输出/关闭弹窗
 */

import { onMounted, onUnmounted } from 'vue'

export interface Shortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean // Windows 键 / Cmd
  description: string
  action: () => void
}

/**
 * 键盘快捷键 Hook
 */
export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  // 检查是否按下了修饰键
  const hasModifiers = (event: KeyboardEvent, shortcut: Shortcut): boolean => {
    const ctrl = shortcut.ctrl ?? false
    const shift = shortcut.shift ?? false
    const alt = shortcut.alt ?? false
    const meta = shortcut.meta ?? false

    // Mac 上 Cmd 对应 metaKey，Windows 上 Ctrl 对应 ctrlKey
    // 为了跨平台兼容，Ctrl 和 Cmd 互换处理
    const isCtrlOrMeta = (event.ctrlKey || event.metaKey)
    const shortcutNeedsCtrlOrMeta = ctrl || meta

    if (shortcutNeedsCtrlOrMeta && !isCtrlOrMeta) return false
    if (!shortcutNeedsCtrlOrMeta && isCtrlOrMeta) return false

    if (shift && !event.shiftKey) return false
    if (!shift && event.shiftKey) return false

    if (alt && !event.altKey) return false
    if (!alt && event.altKey) return false

    return true
  }

  // 检查按键是否匹配
  const matchesKey = (event: KeyboardEvent, shortcut: Shortcut): boolean => {
    return event.key.toLowerCase() === shortcut.key.toLowerCase()
  }

  // 键盘事件处理
  const handleKeyDown = (event: KeyboardEvent) => {
    // 忽略在输入框中的按键（除了 Esc）
    const target = event.target as HTMLElement
    const isInput = target.tagName === 'INPUT' ||
                   target.tagName === 'TEXTAREA' ||
                   target.contentEditable === 'true'

    if (isInput && event.key !== 'Escape') {
      return
    }

    // 查找匹配的快捷键
    for (const shortcut of shortcuts) {
      if (matchesKey(event, shortcut) && hasModifiers(event, shortcut)) {
        event.preventDefault()
        shortcut.action()
        return
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
}

/**
 * 预定义的快捷键描述列表
 */
export const SHORTCUTS_LIST = [
  { key: 'Enter', ctrl: true, description: '运行代码' },
  { key: 's', ctrl: true, description: '复制代码' },
  { key: 'k', ctrl: true, description: '搜索' },
  { key: 'Escape', description: '清空输出/关闭' }
]

/**
 * 格式化快捷键显示文本
 */
export function formatShortcut(shortcut: { key: string; ctrl?: boolean; shift?: boolean; alt?: boolean }): string {
  const parts: string[] = []

  if (shortcut.ctrl) parts.push(navigator.userAgent.includes('Mac') ? '⌘' : 'Ctrl')
  if (shortcut.shift) parts.push('Shift')
  if (shortcut.alt) parts.push(navigator.userAgent.includes('Mac') ? '⌥' : 'Alt')

  parts.push(shortcut.key.charAt(0).toUpperCase() + shortcut.key.slice(1))

  return parts.join(navigator.userAgent.includes('Mac') ? '' : '+')
}
