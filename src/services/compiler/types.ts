/**
 * 编译错误信息
 */
export interface CompilationError {
  /** 错误所在行号 */
  line: number
  /** 错误所在列号 */
  column: number
  /** 错误消息 */
  message: string
  /** 严重程度 */
  severity: 'error' | 'warning' | 'info'
  /** 错误代码 */
  code?: string
}

/**
 * 编译警告信息
 */
export interface CompilationWarning {
  /** 警告所在行号 */
  line: number
  /** 警告所在列号 */
  column: number
  /** 警告消息 */
  message: string
}

/**
 * 编译结果
 */
export interface CompileResult {
  /** 编译是否成功 */
  success: boolean
  /** 生成的 JavaScript 代码 */
  jsCode?: string
  /** 错误列表 */
  errors: CompilationError[]
  /** 警告列表 */
  warnings: CompilationWarning[]
  /** 编译耗时 (ms) */
  executionTime: number
  /** 原始响应数据 */
  rawResponse?: unknown
}

/**
 * 执行结果
 */
export interface ExecutionResult {
  /** 执行是否成功 */
  success: boolean
  /** 控制台输出 */
  output: string
  /** 错误信息 */
  error?: string
  /** 执行耗时 (ms) */
  executionTime: number
}

/**
 * 编译器策略接口
 */
export interface ICompilerStrategy {
  /** 策略名称 */
  name: string
  /**
   * 编译 Kotlin 代码
   * @param code - Kotlin 源代码
   * @param target - 编译目标
   */
  compile(code: string, target?: 'js' | 'junit'): Promise<CompileResult>
  /**
   * 检查编译器是否可用
   */
  isAvailable(): boolean
}

/**
 * Kotlin Playground API 请求格式
 */
export interface KotlinPlaygroundRequest {
  files: Array<{
    name: string
    text: string
    publicId: string
  }>
  args: string
  conf: Record<string, unknown>
  projectType: 'JS' | 'JAVA' | 'JUNIT'
}

/**
 * Kotlin Playground API 响应格式
 */
export interface KotlinPlaygroundResponse {
  errors?: Array<{
    line: number
    column: number
    message: string
  }>
  jsCode?: string
  output?: string
  text?: string
}
