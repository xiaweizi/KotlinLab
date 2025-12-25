import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, supportedLocales, localeNames, type SupportedLocale } from '@/i18n'

export function useLocale() {
  const { locale } = useI18n()

  const currentLocale = computed(() => locale.value as SupportedLocale)

  const localeOptions = computed(() =>
    supportedLocales.map(loc => ({
      value: loc,
      label: localeNames[loc]
    }))
  )

  const changeLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale)
  }

  const toggleLocale = () => {
    const newLocale: SupportedLocale = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
    changeLocale(newLocale)
  }

  return {
    locale: currentLocale,
    localeOptions,
    changeLocale,
    toggleLocale
  }
}
