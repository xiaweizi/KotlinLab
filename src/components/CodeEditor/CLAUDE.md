[根目录](../../../CLAUDE.md) > [src](../../) > [components](../) > **CodeEditor**

---

# CodeEditor 组件

> Monaco Editor 封装组件

## 变更记录 (Changelog)

### 2025-12-24 18:07:09
- 初始化模块文档

---

## 模块职责

封装 [Monaco Editor](https://microsoft.github.io/monaco-editor/)（VS Code 的编辑器核心），提供 Kotlin/JavaScript 代码编辑功能。

---

## 文件清单

| 文件 | 说明 |
|------|------|
| `MonacoEditor.vue` | 主编辑器组件 |

---

## 组件接口

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string` | - | 编辑器内容（v-model） |
| `language` | `string` | `'kotlin'` | 编辑器语言模式 |
| `theme` | `string` | `'vs-dark'` | 编辑器主题 |
| `readOnly` | `boolean` | `false` | 是否只读 |
| `height` | `string` | `'100%'` | 编辑器高度 |
| `fontSize` | `number` | `14` | 字体大小 |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `value: string` | 内容变化时触发 |
| `change` | `value: string` | 内容变化时触发 |

### Expose

| 方法 | 返回类型 | 说明 |
|------|----------|------|
| `editor` | `any` | Monaco Editor 实例 |
| `getEditor` | `() => any` | 获取编辑器实例 |

---

## 实现细节

### CDN 动态加载

Monaco Editor 从 jsDelivr CDN 动态加载：

```typescript
const baseUrl = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min'
```

### 编辑器配置

- 字体：JetBrains Mono / Fira Code / SF Mono
- 无 minimap
- 自动缩进
- 括号对颜色化
- 平滑滚动

---

## 使用示例

```vue
<template>
  <MonacoEditor
    v-model="code"
    language="kotlin"
    :theme="isDark ? 'vs-dark' : 'vs'"
    :height="'100%'"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '@/components/CodeEditor/MonacoEditor.vue'

const code = ref('fun main() { println("Hello!") }')
</script>
```

---

## 依赖项

- 外部 CDN：Monaco Editor 0.52.0
- Vue 3 Composition API

---

## 已知问题

- 首次加载需要从 CDN 下载资源，可能较慢
- Worker 路径通过 CDN 配置，离线环境不可用
