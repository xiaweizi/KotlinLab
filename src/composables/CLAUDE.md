[根目录](../../../CLAUDE.md) > [src](../../) > **composables**

---

# composables 目录

> Vue 3 组合式 API（Composables）

## 模块职责

提供可复用的逻辑功能，遵循 Vue 3 Composition API 最佳实践。

---

## 模块索引

| 模块 | 职责 |
|------|------|
| [`useCompiler.ts`](#usecompiler) | Kotlin 编译与执行逻辑 |
| [`useTheme.ts`](#usetheme) | 主题切换管理 |

---

## useCompiler

### 功能说明
提供 Kotlin 代码编译和执行的完整逻辑。

### 返回值

```typescript
{
  // 状态
  isCompiling: Ref<boolean>
  isExecuting: Ref<boolean>
  compileResult: Ref<CompileResult | null>
  executionResult: Ref<ExecutionResult | null>
  hasErrors: ComputedRef<boolean>
  hasWarnings: ComputedRef<boolean>

  // 方法
  compile: (code: string, target?: 'js' | 'junit') => Promise<CompileResult>
  execute: (jsCode: string) => Promise<ExecutionResult>
  clearResults: () => void
  getFormattedErrors: () => string[]
  getEditorMarkers: (errors: CompilationError[]) => Marker[]
}
```

### 沙箱执行

使用 iframe + `srcdoc` 创建隔离的执行环境：

```typescript
// 创建 iframe，捕获 console.log 输出
// 通过 postMessage 通信
// 10 秒超时保护
```

---

## useTheme

### 功能说明
管理应用主题（深色/浅色模式），使用 localStorage 持久化。

### 返回值

```typescript
{
  isDark: Ref<boolean>
  toggleTheme: () => void
  setTheme: (dark: boolean) => void
}
```

### 存储键
- `kotlin-compiler-theme` (localStorage)

### DOM 属性
- `data-theme="dark"` 设置在 `<html>` 元素上

---

## 使用示例

```typescript
import { useCompiler, useTheme } from '@/composables'

// 在组件中使用
const { isCompiling, compile } = useCompiler()
const { isDark, toggleTheme } = useTheme()

async function handleCompile() {
  const result = await compile(code.value)
}
```

---

## 依赖项

- `@vueuse/core` - useStorage 工具
- `../services/compiler/types` - 类型定义
- `../services/compiler/strategies/PlaygroundCompilerStrategy` - 编译器实现
