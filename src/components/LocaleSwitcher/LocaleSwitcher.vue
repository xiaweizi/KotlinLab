<template>
  <button @click="toggleLocale" class="locale-switcher" :title="currentLocaleLabel">
    <span class="locale-icon">🌐</span>
    <span class="locale-text">{{ currentLocaleLabel }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'

const { locale } = useI18n()

const { toggleLocale, localeOptions } = useLocale()

const currentLocaleLabel = computed(() => {
  return localeOptions.value.find(l => l.value === locale.value)?.label || 'Language'
})
</script>

<style scoped lang="scss">
.locale-switcher {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8125rem;
  font-weight: 500;

  &:hover {
    background: var(--bg-tertiary);
    border-color: var(--accent-color);
  }

  &:active {
    transform: scale(0.98);
  }
}

.locale-icon {
  font-size: 1rem;
  line-height: 1;
}

.locale-text {
  display: none;
}

@media (min-width: 640px) {
  .locale-text {
    display: inline;
  }
}
</style>
