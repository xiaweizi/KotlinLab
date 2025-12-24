<template>
  <ul class="knowledge-list">
    <li v-for="(topic, index) in topics" :key="index" class="knowledge-item">
      <span class="knowledge-icon">☑️</span>
      <span class="knowledge-text">{{ topic }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  topics: string[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.knowledge-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.knowledge-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.875rem;
  background: var(--bg-tertiary);
  border-radius: 6px;
  font-size: 0.8125rem;
}

.knowledge-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.knowledge-text {
  color: var(--text-secondary);
}
</style>
