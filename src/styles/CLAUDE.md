[根目录](../../../CLAUDE.md) > [src](../../) > **styles**

---

# styles 目录

> 全局样式与主题定义

## 模块职责

定义应用的全局样式、CSS 变量和主题切换机制。

---

## 文件清单

| 文件 | 说明 |
|------|------|
| `theme.scss` | 全局主题样式和 CSS 变量 |

---

## CSS 变量系统

### 亮色主题 (默认)

```scss
--bg-primary: #ffffff       // 主背景
--bg-secondary: #f5f5f5     // 次要背景
--bg-tertiary: #e5e7eb      // 第三背景
--text-primary: #1f2937     // 主文本
--text-secondary: #4b5563   // 次要文本
--text-muted: #9ca3af       // 弱化文本
--border-color: #e5e7eb     // 边框颜色
--accent-color: #7f52ff     // 强调色（Kotlin 紫）
--accent-hover: #6a42e0     // 强调色悬停
--error-color: #ef4444      // 错误色
--error-bg: rgba(239, 68, 68, 0.1)  // 错误背景
--success-color: #00a86b    // 成功色
--warning-color: #f59e0b    // 警告色
--code-bg: #1e1e1e          // 代码背景
--code-text: #d4d4d4        // 代码文本
```

### 深色主题 (`[data-theme="dark"]`)

```scss
--bg-primary: #1e1e1e
--bg-secondary: #2d2d2d
--bg-tertiary: #3a3a3a
--text-primary: #e5e7eb
--text-secondary: #a1a1aa
--text-muted: #71717a
--border-color: #404040
--code-bg: #0d0d0d
--code-text: #e5e7eb
```

---

## 全局样式

### 基础重置

```scss
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
}
```

### 自定义滚动条

```scss
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
```

---

## 使用方式

### 在组件中引用

```vue
<style scoped>
.example {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
</style>
```

### 主题切换

由 `useTheme()` composable 管理，通过修改 `<html>` 的 `data-theme` 属性实现。

---

## 颜色参考

- **Kotlin 品牌色**: `#7f52ff` (渐变: `#7f52ff` → `#a06bf8`)
- **JS 品牌色**: `#f7df1e` (渐变: `#f7df1e` → `#f0db4f`)
- **成功色**: `#00a86b`
- **错误色**: `#ef4444`

---

## 依赖项

- Sass 1.83.4
- 在 `main.ts` 中全局导入
