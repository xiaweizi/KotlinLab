import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import en from './locales/en'

export type SupportedLocale = 'zh-CN' | 'en'

export const LOCALE_STORAGE_KEY = 'kotlinlab-locale'

export const defaultLocale: SupportedLocale = ((): SupportedLocale => {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'zh-CN' || stored === 'en') return stored

  // 浏览器语言检测
  const browserLang = navigator.language
  if (browserLang.startsWith('zh')) return 'zh-CN'
  if (browserLang.startsWith('en')) return 'en'

  return 'zh-CN'
})()

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    en
  },
  // 用于在模板中可以使用 $t('key')
  globalInjection: true
})

export const supportedLocales: SupportedLocale[] = ['zh-CN', 'en']

export const localeNames: Record<SupportedLocale, string> = {
  'zh-CN': '简体中文',
  en: 'English'
}

export function setLocale(locale: SupportedLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.documentElement.lang = locale
}
