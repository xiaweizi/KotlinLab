<template>
  <div
    class="lesson-card"
    :class="{
      'completed': completed,
      'locked': locked,
      'current': !locked && !completed
    }"
    @click="handleClick"
  >
    <div class="card-header">
      <span class="day-badge">Day {{ day.day }}</span>
      <span class="status-icon">
        <span v-if="completed" class="icon-completed">✅</span>
        <span v-else-if="locked" class="icon-locked">🔒</span>
        <span v-else class="icon-current">▶️</span>
      </span>
    </div>

    <div class="card-body">
      <div class="card-icon">{{ day.icon }}</div>
      <h3 class="card-title">{{ day.title }}</h3>
      <p class="card-description">{{ day.description }}</p>

      <div class="card-meta">
        <span class="meta-item" :class="'difficulty-' + day.difficulty">
          {{ difficultyText }}
        </span>
        <span class="meta-item">
          ⏱️ {{ day.estimatedTime }} 分钟
        </span>
      </div>

      <div v-if="!locked && day.topics.length > 0" class="card-topics">
        <span v-for="(topic, index) in day.topics.slice(0, 3)" :key="index" class="topic-tag">
          {{ topic }}
        </span>
        <span v-if="day.topics.length > 3" class="topic-more">
          +{{ day.topics.length - 3 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DayCurriculum } from '@/data/curriculum'

interface Props {
  day: DayCurriculum
  completed?: boolean
  locked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  completed: false,
  locked: false
})

const emit = defineEmits<{
  click: []
}>()

const difficultyText = computed(() => {
  switch (props.day.difficulty) {
    case 'beginner':
      return '入门'
    case 'intermediate':
      return '中级'
    case 'advanced':
      return '进阶'
    default:
      return ''
  }
})

const handleClick = () => {
  if (!props.locked) {
    emit('click')
  }
}
</script>

<style scoped lang="scss">
.lesson-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    &:not(.locked) {
      border-color: var(--accent-color);
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(127, 82, 255, 0.15);
    }
  }

  &.completed {
    border-color: var(--success-color);
    background: rgba(0, 168, 107, 0.05);
  }

  &.locked {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      transform: none;
    }
  }

}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
}

.day-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-icon {
  font-size: 1rem;
}

.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-icon {
  font-size: 2rem;
  line-height: 1;
}

.card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-description {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 12px;
  font-size: 0.6875rem;
  font-weight: 500;
  background: var(--bg-tertiary);
  color: var(--text-secondary);

  &.difficulty-beginner {
    background: rgba(0, 168, 107, 0.15);
    color: var(--success-color);
  }

  &.difficulty-intermediate {
    background: rgba(251, 146, 60, 0.15);
    color: #f97316;
  }

  &.difficulty-advanced {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
  }
}

.card-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.25rem;
}

.topic-tag {
  padding: 0.25rem 0.5rem;
  background: var(--bg-tertiary);
  border-radius: 4px;
  font-size: 0.6875rem;
  color: var(--text-secondary);
}

.topic-more {
  padding: 0.25rem 0.5rem;
  color: var(--accent-color);
  font-size: 0.6875rem;
  font-weight: 500;
}

// 响应式
@media (max-width: 480px) {
  .card-body {
    padding: 1rem;
  }

  .card-icon {
    font-size: 1.5rem;
  }

  .card-title {
    font-size: 1rem;
  }
}
</style>
