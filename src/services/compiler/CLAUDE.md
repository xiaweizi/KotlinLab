[根目录](../../../../CLAUDE.md) > [src](../../../) > [services](../../) > **compiler**

---

# compiler 服务

> Kotlin 编译器服务层

## 模块职责

提供编译器抽象接口和具体实现，解耦编译逻辑与 UI 层。

---

## 目录结构

```
compiler/
├── types.ts                                    # 类型定义
└── strategies/
    └── PlaygroundCompilerStrategy.ts          # JetBrains API 实现
```

---

## 类型定义 (types.ts)

### 核心接口

#### ICompilerStrategy
编译器策略接口，所有编译器实现必须遵循：

```typescript
interface ICompilerStrategy {
  name: string
  compile(code: string, target?: 'js' | 'junit'): Promise<CompileResult>
  isAvailable(): boolean
}
```

#### CompileResult
编译结果数据结构：

```typescript
interface CompileResult {
  success: boolean
  jsCode?: string           // 生成的 JS 代码（对于 Playground，这是执行输出）
  errors: CompilationError[]
  warnings: CompilationWarning[]
  executionTime: number
  rawResponse?: unknown
}
```

#### ExecutionResult
执行结果数据结构：

```typescript
interface ExecutionResult {
  success: boolean
  output: string
  error?: string
  executionTime: number
}
```

---

## 策略实现

### PlaygroundCompilerStrategy

**API 端点**: `https://api.kotlinlang.org/api/2.3.0/compiler/run`

**请求格式**:
```json
{
  "files": [{ "name": "File.kt", "text": "...", "publicId": "File.kt" }],
  "args": "",
  "conf": {},
  "projectType": "JS"
}
```

**响应格式**:
```json
{
  "errors": { "File.kt": [] },
  "exception": null,
  "text": "<outStream>输出内容</outStream>"
}
```

**关键逻辑**:
- JS 目标：API 直接执行代码并返回输出（包装在 `<outStream>` 中）
- 错误解析：支持 `errors` 对象和 `exception` 字段
- 超时/网络错误：返回包含错误信息的 `CompileResult`

---

## 扩展指南

### 添加新的编译器后端

1. 创建新策略类：

```typescript
// strategies/CustomCompilerStrategy.ts
export class CustomCompilerStrategy implements ICompilerStrategy {
  readonly name = 'Custom Compiler'

  async compile(code: string, target: 'js' | 'junit' = 'js'): Promise<CompileResult> {
    // 实现编译逻辑
  }

  isAvailable(): boolean {
    return true
  }
}
```

2. 在 `useCompiler.ts` 中切换策略：

```typescript
const compilerStrategy = new CustomCompilerStrategy()
```

---

## 已知限制

- Playground API 对 JS 目标返回执行输出，而非可执行 JS 代码
- 依赖外部 API，网络不可用时失败
- API 版本硬编码为 2.3.0

---

## 依赖项

- `fetch` API（浏览器原生）
- `performance.now()`（计时）
