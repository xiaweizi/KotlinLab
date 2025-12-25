/**
 * Kotlin 学习系统 - 中文元数据
 * 包含所有需要翻译的文本内容（title, description, topics, hint）
 */

export interface DayMetadata {
  title: string
  description: string
  topics: string[]
  demos: {
    title: string
    description: string
  }[]
  exercises: {
    title: string
    description: string
    hint?: string
  }[]
}

export const curriculumMetadata: Record<number, DayMetadata> = {
  1: {
    title: 'Kotlin 基础',
    description: '了解 Kotlin 语言基础，掌握变量声明、数据类型和函数定义',
    topics: ['变量声明 (val vs var)', '基本数据类型', '函数基础', '类型推断'],
    demos: [
      { title: '变量与类型', description: '学习 val 和 var 的区别，以及 Kotlin 的基本数据类型' },
      { title: '函数基础', description: '学习如何定义函数，包括参数、返回值、默认参数和命名参数' },
      { title: '类型转换与检查', description: '学习 Kotlin 的类型检查和智能转换' },
      { title: '字符串操作', description: '学习 Kotlin 的字符串模板和常用字符串操作' }
    ],
    exercises: [
      {
        title: '温度转换器',
        description: '编写一个函数，将摄氏度转换为华氏度。公式：F = C × 9/5 + 32',
        hint: '使用公式 F = C × 9/5 + 32'
      },
      {
        title: '计算圆的面积和周长',
        description: '编写函数计算圆的面积（πr²）和周长（2πr）',
        hint: '面积公式：π × r × r，周长公式：2 × π × r'
      },
      {
        title: '自我介绍生成器',
        description: '创建一个函数，接收姓名、年龄和城市，返回格式化的自我介绍',
        hint: '使用字符串模板，格式如："我是张三，今年25岁，居住在上海"'
      }
    ]
  },
  2: {
    title: '流程控制',
    description: '掌握 Kotlin 的条件表达式、循环结构和范围操作',
    topics: ['if 表达式', 'when 表达式', 'for/while 循环', '范围与区间'],
    demos: [
      { title: 'if 和 when 表达式', description: '学习 Kotlin 的条件表达式' },
      { title: 'for 循环与范围', description: '掌握 for 循环和各种范围操作' },
      { title: 'while 循环与循环控制', description: '学习 while 循环和 break/continue' },
      { title: '综合应用：猜数字游戏', description: '使用流程控制实现猜数字游戏' }
    ],
    exercises: [
      {
        title: '成绩评级',
        description: '根据分数输出等级：90+优秀，80+良好，60+及格，否则不及格',
        hint: '使用 when 表达式，注意判断顺序'
      },
      {
        title: '打印乘法表',
        description: '打印 9x9 乘法表',
        hint: '使用嵌套循环，注意格式对齐'
      },
      {
        title: '数字求和',
        description: '计算 1 到 100 之间所有偶数的和',
        hint: '使用 for 循环和 range，step 可以指定步长'
      }
    ]
  },
  3: {
    title: '面向对象编程',
    description: '学习 Kotlin 的类、对象和属性',
    topics: ['类与对象', '属性与 getter/setter', '构造函数', '数据类'],
    demos: [
      { title: '类与对象基础', description: '创建类和实例化对象' },
      { title: '属性与访问器', description: '学习属性、getter 和 setter' },
      { title: '构造函数', description: '主构造函数和次构造函数' },
      { title: '数据类', description: '使用 data class 简化数据模型' }
    ],
    exercises: [
      {
        title: '图书类',
        description: '创建 Book 类，包含标题、作者、价格属性，支持折扣计算',
        hint: '使用自定义 getter 计算折扣后的价格'
      },
      {
        title: '学生管理系统',
        description: '创建 Student 类，记录成绩并计算平均分',
        hint: '使用 List 存储多门课程成绩'
      },
      {
        title: '银行账户',
        description: '实现 BankAccount 类，支持存款、取款和查询余额',
        hint: '取款时需要检查余额是否充足'
      }
    ]
  },
  4: {
    title: '继承与接口',
    description: '理解 Kotlin 的继承机制和接口定义',
    topics: ['继承', '方法重写', '抽象类', '接口'],
    demos: [
      { title: '继承基础', description: '使用继承扩展类功能' },
      { title: '方法重写', description: 'override 关键字的使用' },
      { title: '抽象类', description: '定义抽象类和抽象方法' },
      { title: '接口', description: '定义和实现接口' }
    ],
    exercises: [
      {
        title: '动物类层次',
        description: '创建 Animal 基类和 Dog、Cat 子类，实现 speak 方法',
        hint: '使用抽象类定义抽象方法'
      },
      {
        title: '图形接口',
        description: '定义 Shape 接口，计算不同图形的面积',
        hint: '接口中定义抽象方法 area()'
      },
      {
        title: '交通工具',
        description: '实现 Vehicle 接口，支持不同交通工具的速度计算',
        hint: '接口可以定义属性和方法'
      }
    ]
  },
  5: {
    title: '集合与泛型',
    description: '掌握 Kotlin 的集合框架和泛型',
    topics: ['List', 'Set', 'Map', '泛型基础'],
    demos: [
      { title: 'List 操作', description: '学习 List 的常用操作' },
      { title: 'Set 和 Map', description: '使用 Set 和 Map 存储数据' },
      { title: '集合函数式 API', description: 'filter、map、reduce 等高阶函数' },
      { title: '泛型', description: '定义泛型类和泛型函数' }
    ],
    exercises: [
      {
        title: '学生成绩统计',
        description: '使用 List 存储学生成绩，计算平均分、最高分、最低分',
        hint: '使用 map 和 reduce 函数'
      },
      {
        title: '单词频率统计',
        description: '统计一段文字中每个单词出现的次数',
        hint: '使用 groupBy 和 count，或使用 MutableMap'
      },
      {
        title: '泛型容器类',
        description: '实现一个泛型的 Box 类，可以存储任意类型数据',
        hint: '使用 <T> 定义泛型类型参数'
      }
    ]
  },
  6: {
    title: '函数式编程',
    description: '学习 Kotlin 的高阶函数和 Lambda 表达式',
    topics: ['Lambda 表达式', '高阶函数', '集合操作', '闭包'],
    demos: [
      { title: 'Lambda 基础', description: 'Lambda 表达式的语法' },
      { title: '高阶函数', description: '接收函数作为参数的函数' },
      { title: '集合操作进阶', description: 'flatMap、fold、scan 等操作' },
      { title: '函数引用', description: ':: 操作符和方法引用' }
    ],
    exercises: [
      {
        title: '自定义 filter 函数',
        description: '实现一个类似 filter 的函数',
        hint: '函数参数类型为 (T) -> Boolean'
      },
      {
        title: '链式调用',
        description: '对数字列表进行过滤、转换、求和',
        hint: '使用 filter、map、reduce 链式调用'
      },
      {
        title: '柯里化',
        description: '实现一个柯里化函数，将多参数函数转为单参数函数链',
        hint: '返回一个函数，该函数再返回下一个函数'
      }
    ]
  },
  7: {
    title: '空安全与异常处理',
    description: '掌握 Kotlin 的空安全特性和异常处理',
    topics: ['可空类型', '安全调用', 'Elvis 操作符', 'try-catch'],
    demos: [
      { title: '可空类型', description: '理解 ? 和 !! 的区别' },
      { title: '安全调用与链式调用', description: '?.、let、run 等操作符' },
      { title: 'Elvis 操作符', description: '?: 提供默认值' },
      { title: '异常处理', description: 'try-catch-finally 和 throw' }
    ],
    exercises: [
      {
        title: '安全除法',
        description: '实现安全除法，避免除零错误',
        hint: '使用 try-catch 或可空类型'
      },
      {
        title: '字符串长度获取',
        description: '安全获取字符串长度，处理 null 情况',
        hint: '使用 ?. 安全调用或 let 块'
      },
      {
        title: '配置读取',
        description: '模拟从配置文件读取值，提供默认值',
        hint: '使用 Elvis 操作符 ?:'
      }
    ]
  },
  8: {
    title: '扩展函数与属性',
    description: '学习如何为现有类添加新功能',
    topics: ['扩展函数', '扩展属性', '作用域函数', '作用'],
    demos: [
      { title: '扩展函数基础', description: '为 String 添加自定义方法' },
      { title: '扩展属性', description: '为类添加属性' },
      { title: '作用域函数', description: 'let、run、with、apply、also' },
      { title: '扩展函数实战', description: '为 View 添加扩展函数' }
    ],
    exercises: [
      {
        title: '日期扩展',
        description: '为 Date 添加格式化扩展函数',
        hint: '定义 fun Date.format()'
      },
      {
        title: 'List 扩展',
        description: '为 List 添加交换元素位置的扩展函数',
        hint: '注意返回新 List 而不是修改原 List'
      },
      {
        title: 'Int 扩展',
        description: '为 Int 添加 isPrime 扩展属性判断是否为质数',
        hint: '使用 val Int.isPrime 定义扩展属性'
      }
    ]
  },
  9: {
    title: '协程基础',
    description: '入门 Kotlin 协程，学习异步编程',
    topics: ['协程概念', 'CoroutineScope', 'suspend 函数', 'Dispatchers'],
    demos: [
      { title: '协程入门', description: '使用 launch 创建协程' },
      { title: 'async 与 await', description: '异步获取返回值' },
      { title: '协程作用域', description: 'coroutineScope 和 supervisorScope' },
      { title: '异常处理', description: 'try-catch 在协程中的使用' }
    ],
    exercises: [
      {
        title: '并发下载',
        description: '使用 async 并发下载多个资源',
        hint: '使用 List<Deferred> 和 awaitAll'
      },
      {
        title: '超时处理',
        description: '为网络请求添加超时处理',
        hint: '使用 withTimeout 或 withTimeoutOrNull'
      },
      {
        title: '重试机制',
        description: '实现带重试的网络请求函数',
        hint: '使用循环和 try-catch'
      }
    ]
  },
  10: {
    title: '数据类与密封类',
    description: '深入理解数据类和密封类',
    topics: ['data class 详解', 'copy 方法', '密封类', '枚举类'],
    demos: [
      { title: 'data class 详解', description: '自动生成的方法' },
      { title: 'copy 与解构', description: '对象复制和解构声明' },
      { title: '密封类', description: 'when 表达式穷举' },
      { title: '枚举类', description: 'enum class 的使用' }
    ],
    exercises: [
      {
        title: '配置数据类',
        description: '创建配置 data class，支持 copy 修改部分属性',
        hint: '使用命名参数和 copy 函数'
      },
      {
        title: '网络结果封装',
        description: '使用密封类封装网络请求结果',
        hint: '定义 sealed class Result 和 Success/Error 子类'
      },
      {
        title: '状态机',
        description: '使用密封类实现简单状态机',
        hint: '状态可以是 Idle、Loading、Success、Error'
      }
    ]
  },
  11: {
    title: '标准库与常用函数',
    description: '掌握 Kotlin 标准库的实用功能',
    topics: ['作用域函数详解', '标准函数', '范围操作', '数组操作'],
    demos: [
      { title: '作用域函数对比', description: 'let/run/with/apply/also 的区别' },
      { title: 'require 和 check', description: '参数校验和状态检查' },
      { title: '范围与区间', description: 'Progression 和 ClosedRange' },
      { title: '数组操作', description: '数组原生操作和集合转换' }
    ],
    exercises: [
      {
        title: '参数校验',
        description: '使用 require 和 check 校验函数参数',
        hint: 'require 用于参数，check 用于状态'
      },
      {
        title: '链式调用优化',
        description: '使用合适的作用域函数优化代码',
        hint: 'apply 用于配置对象，let 用于处理可空值'
      },
      {
        title: '自定义 repeat',
        description: '实现类似 repeat 的标准函数',
        hint: '使用内联和函数类型参数'
      }
    ]
  },
  12: {
    title: 'DSL 与高阶技巧',
    description: '学习 DSL 构建和 Kotlin 高级特性',
    topics: ['DSL 基础', '带接收者的 Lambda', '中缀调用', '运算符重载'],
    demos: [
      { title: 'DSL 入门', description: '构建 HTML DSL' },
      { title: '带接收者的 Lambda', description: '扩展函数类型' },
      { title: '中缀函数', description: 'infix 关键字' },
      { title: '运算符重载', description: 'operator fun' }
    ],
    exercises: [
      {
        title: '构建 DSL',
        description: '创建一个简单的 DSL 用于构建配置',
        hint: '使用带接收者的 Lambda'
      },
      {
        title: '运算符重载',
        description: '为 Money 类重载 + - * / 运算符',
        hint: '使用 operator fun plus 等'
      },
      {
        title: '中缀表达式',
        description: '实现一个流畅的 API 如 5 days ago',
        hint: '使用 infix 和扩展函数'
      }
    ]
  },
  13: {
    title: '实战项目：待办事项管理系统',
    description: '综合运用所学知识构建完整应用',
    topics: ['项目架构', '数据模型', '业务逻辑', '交互设计'],
    demos: [
      { title: '项目设计', description: '待办事项的数据模型和架构' },
      { title: '核心功能', description: '添加、删除、标记完成' },
      { title: '数据持久化', description: 'JSON 序列化存储' },
      { title: 'UI 交互', description: '菜单和命令处理' }
    ],
    exercises: [
      {
        title: '任务优先级',
        description: '为待办事项添加优先级属性',
        hint: '使用枚举类定义优先级'
      },
      {
        title: '任务分类',
        description: '支持按标签分类任务',
        hint: '使用 List<String> 存储标签'
      },
      {
        title: '任务搜索',
        description: '实现按关键词搜索任务',
        hint: '使用 filter 和 contains'
      }
    ]
  },
  14: {
    title: '最佳实践',
    description: 'Kotlin 编码规范和最佳实践',
    topics: ['编码规范', '命名约定', '性能优化', '互操作性'],
    demos: [
      { title: '编码规范', description: 'Kotlin 官方编码规范' },
      { title: '命名约定', description: '包名、类名、函数名规范' },
      { title: '性能优化', description: '避免性能陷阱' },
      { title: 'Java 互操作', description: '与 Java 代码交互' }
    ],
    exercises: [
      {
        title: '代码重构',
        description: '重构一段代码使其符合 Kotlin 规范',
        hint: '使用数据类、扩展函数、默认参数'
      },
      {
        title: '性能分析',
        description: '识别并优化代码中的性能问题',
        hint: '注意避免不必要的对象创建'
      },
      {
        title: 'Java 迁移',
        description: '将一段 Java 代码转为 Kotlin',
        hint: '使用可空类型和属性语法'
      }
    ]
  }
}
