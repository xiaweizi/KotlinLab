/**
 * 课程元数据语言入口
 * 根据当前语言环境动态��载对应的元数据
 */

import { curriculumMetadata as zhCNMetadata } from './zh-CN'
import { curriculumMetadata as enMetadata } from './en'
import type { DayMetadata } from './zh-CN'

export type { DayMetadata }

const metadataMap: Record<string, Record<number, DayMetadata>> = {
  'zh-CN': zhCNMetadata,
  en: enMetadata
}

/**
 * 获取当前语言的课程元数据
 */
export function getCurrentMetadata(): Record<number, DayMetadata> {
  // 在服务端渲染或非 Vue 环境中，默认使用中文
  if (typeof window === 'undefined') {
    return zhCNMetadata
  }

  // 从 localStorage 读取语言设置
  const savedLocale = localStorage.getItem('kotlin-lab-locale')
  if (savedLocale && metadataMap[savedLocale]) {
    return metadataMap[savedLocale]
  }

  // 根据浏览器语言自动选择
  const browserLang = navigator.language
  if (browserLang.startsWith('zh')) {
    return zhCNMetadata
  }
  return enMetadata
}

/**
 * 根据语言代码获取元数据
 */
export function getMetadata(locale: string): Record<number, DayMetadata> {
  return metadataMap[locale] ?? zhCNMetadata
}

/**
 * 获取单日课程的元数据
 */
export function getDayMetadata(day: number, locale?: string): DayMetadata | undefined {
  const metadata = locale ? getMetadata(locale) : getCurrentMetadata()
  return metadata[day]
}
