/**
 * Kotlin 学习系统 - 课程数据定义
 */

// ============================================
// 类型定义
// ============================================

/**
 * Demo 示例结构
 */
export interface Demo {
  id: string
  title: string
  description: string
  code: string
  expectedOutput?: string
  readOnly?: boolean
}

/**
 * 练习题结构
 */
export interface Exercise {
  id: string
  title: string
  description: string
  template?: string
  hint?: string
  solution?: string
  validator?: string // 用于验证输出正则表达式
}

/**
 * 单日课程结构
 */
export interface DayCurriculum {
  day: number
  title: string
  description: string
  icon: string
  topics: string[]
  demos: Demo[]
  exercises: Exercise[]
  estimatedTime: number // 分钟
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

/**
 * 学习进度结构
 */
export interface DayProgress {
  day: number
  completed: boolean
  demosCompleted: string[]
  exercisesCompleted: string[]
  lastAccessed: string
  timeSpent: number // 分钟
}

/**
 * 总体学习进度
 */
export interface LearningProgress {
  currentDay: number
  days: Record<number, DayProgress>
  totalStudyTime: number
  startDate: string
  lastStudyDate: string
}

// ============================================
// 14天课程数据
// ============================================

export const curriculum: DayCurriculum[] = [
  // Day 1: Kotlin 基础
  {
    day: 1,
    title: 'Kotlin 基础',
    description: '了解 Kotlin 语言基础，掌握变量声明、数据类型和函数定义',
    icon: '📝',
    topics: ['变量声明 (val vs var)', '基本数据类型', '函数基础', '类型推断'],
    difficulty: 'beginner',
    estimatedTime: 240,
    demos: [
      {
        id: 'day1-demo1',
        title: '变量与类型',
        description: '学习 val 和 var 的区别，以及 Kotlin 的基本数据类型',
        code: `fun main() {
    // val vs var 演示
    val immutable: String = "不可变变量"
    var mutable: Int = 42

    // 类型推断
    val name = "Kotlin"  // 自动推断为String
    val year = 2024      // 自动推断为Int

    // 数值类型转换
    val a: Int = 10
    val b: Long = a.toLong()

    // 字符串模板
    println("Hello, $name! 学习第 $year 年")
    println("不可变变量: $immutable")
    println("可变变量: $mutable")

    // 尝试修改 val 会报错
    // immutable = "修改" // 编译错误

    // var 可以修改
    mutable = 100
    println("修改后的 mutable: $mutable")
}`,
        expectedOutput: 'Hello, Kotlin! 学习第 2024 年\n不可变变量: 不可变变量\n可变变量: 42\n修改后的 mutable: 100'
      },
      {
        id: 'day1-demo2',
        title: '函数基础',
        description: '学习如何定义函数，包括参数、返回值、默认参数和命名参数',
        code: `// 标准函数
fun greet(name: String): String {
    return "Hello, $name!"
}

// 单表达式函数
fun square(x: Int) = x * x

// 默认参数
fun createPerson(name: String, age: Int = 18, city: String = "Beijing") {
    println("Name: $name, Age: $age, City: $city")
}

// 带返回类型的函数
fun max(a: Int, b: Int): Int {
    return if (a > b) a else b
}

fun main() {
    // 调用函数
    println(greet("Kotlin"))
    println("5的平方: \${square(5)}")

    // 使用默认参数
    createPerson(name = "张三", age = 25)
    createPerson(name = "李四", city = "Shanghai")  // 使用默认age

    // 命名参数调用（顺序可以改变）
    createPerson(age = 30, name = "王五", city = "Shenzhen")

    // 最大值
    println("最大值: \${max(10, 20)}")
}`,
        expectedOutput: 'Hello, Kotlin!\n5的平方: 25\nName: 张三, Age: 25, City: Beijing\nName: 李四, Age: 18, City: Shanghai\nName: 王五, Age: 30, City: Shenzhen\n最大值: 20'
      },
      {
        id: 'day1-demo3',
        title: '类型转换与检查',
        description: '学习 Kotlin 的类型检查和智能转换',
        code: `fun getTypeInfo(value: Any): String {
    return when (value) {
        is Int -> "整数: $value, 平方是 \${value * value}"
        is String -> "字符串: $value, 长度: \${value.length}"
        is Double -> "双精度: $value"
        is Boolean -> "布尔值: $value"
        else -> "其他类型: \${value.javaClass.simpleName}"
    }
}

// 类型转换
fun safeCast(value: Any): Int? {
    return value as? Int // 安全转换，失败返回 null
}

fun main() {
    // 类型检查
    println(getTypeInfo(42))
    println(getTypeInfo("Hello Kotlin"))
    println(getTypeInfo(3.14))
    println(getTypeInfo(true))
    println(getTypeInfo(listOf(1, 2, 3)))

    // 安全转换
    println("\\n安全转换示例:")
    println("'123' 转换 Int: \${safeCast(123)}")
    println("'abc' 转换 Int: \${safeCast("abc")}")

    // 类型转换
    val str: Any = "Kotlin"
    if (str is String) {
        // 智能转换，无需再强转
        println("字符串长度: \${str.length}")
        println("大写: \${str.uppercase()}")
    }
}`,
        expectedOutput: '整数: 42, 平方是 1764\n字符串: Hello Kotlin, 长度: 12\n双精度: 3.14\n布尔值: true\n其他类型: ArrayList\n\n安全转换示例:\n\'123\' 转换 Int: 123\n\'abc\' 转换 Int: null\n字符串长度: 6\n大写: KOTLIN'
      },
      {
        id: 'day1-demo4',
        title: '字符串操作',
        description: '学习 Kotlin 的字符串模板和常用字符串操作',
        code: `fun main() {
    val name = "Kotlin"
    val version = 2.0

    // 字符串模板
    println("欢迎使用 $name!")
    println("当前版本: $version")
    println("计算结果: \${10 + 20}")

    // 原始字符串（保留格式）
    val rawString = """
        |这是一个多行字符串
        |可以保留格式
        |支持缩进
    """.trimIndent()
    println(rawString)

    // 字符串常用方法
    val text = "Hello Kotlin World"
    println("\\n原字符串: $text")
    println("长度: \${text.length}")
    println("大写: \${text.uppercase()}")
    println("小写: \${text.lowercase()}")
    println("反转: \${text.reversed()}")
    println("替换: \${text.replace("Kotlin", "Java")}")
    println("分割: \${text.split(" ")}")

    // 字符串遍历
    println("\\n遍历字符:")
    for (c in "ABC") {
        println(c)
    }
}`,
        expectedOutput: '欢迎使用 Kotlin!\n当前版本: 2.0\n计算结果: 30\n这是一个多行字符串\n可以保留格式\n支持缩进\n\n原字符串: Hello Kotlin World\n长度: 17\n大写: HELLO KOTLIN WORLD\n小写: hello kotlin world\n反转: dlroW niltoK olleH\n替换: Hello Java World\n分割: [Hello, Kotlin, World]\n\n遍历字符:\nA\nB\nC'
      }
    ],
    exercises: [
      {
        id: 'day1-ex1',
        title: '温度转换器',
        description: '编写一个函数，将摄氏度转换为华氏度。公式：F = C × 9/5 + 32',
        template: `fun celsiusToFahrenheit(celsius: Double): Double {
    // 在这里实现转换逻辑
    TODO("实现温度转换")
}

fun main() {
    println("0°C = \${celsiusToFahrenheit(0.0)}°F")
    println("25°C = \${celsiusToFahrenheit(25.0)}°F")
    println("100°C = \${celsiusToFahrenheit(100.0)}°F")
}`,
        hint: '使用公式 F = C × 9/5 + 32',
        solution: `fun celsiusToFahrenheit(celsius: Double): Double {
    return celsius * 9 / 5 + 32
}

fun main() {
    println("0°C = \${celsiusToFahrenheit(0.0)}°F")
    println("25°C = \${celsiusToFahrenheit(25.0)}°F")
    println("100°C = \${celsiusToFahrenheit(100.0)}°F")
}`,
        validator: '0°C = 32\\.0°F.*25°C = 77\\.0°F.*100°C = 212\\.0°F'
      },
      {
        id: 'day1-ex2',
        title: '计算圆的面积和周长',
        description: '编写函数计算圆的面积（πr²）和周长（2πr）',
        template: `import kotlin.math.PI

fun circleArea(radius: Double): Double {
    TODO("计算圆面积")
}

fun circleCircumference(radius: Double): Double {
    TODO("计算圆周长")
}

fun main() {
    val r = 5.0
    println("半径为 $r 的圆:")
    println("面积 = \${circleArea(r)}")
    println("周长 = \${circleCircumference(r)}")
}`,
        hint: '面积公式：π × r × r，周长公式：2 × π × r',
        solution: `import kotlin.math.PI

fun circleArea(radius: Double): Double {
    return PI * radius * radius
}

fun circleCircumference(radius: Double): Double {
    return 2 * PI * radius
}

fun main() {
    val r = 5.0
    println("半径为 $r 的圆:")
    println("面积 = \${circleArea(r)}")
    println("周长 = \${circleCircumference(r)}")
}`,
        validator: '面积 = 78\\.5398.*周长 = 31\\.4159'
      },
      {
        id: 'day1-ex3',
        title: '自我介绍生成器',
        description: '创建一个函数，接收姓名、年龄和城市，返回格式化的自我介绍',
        template: `fun introduce(name: String, age: Int, city: String = "北京"): String {
    TODO("返回格式化的自我介绍字符串")
}

fun main() {
    println(introduce("张三", 25, "上海"))
    println(introduce("李四", 30)) // 使用默认城市
}`,
        hint: '使用字符串模板，格式如："我是张三，今年25岁，居住在上海"',
        solution: `fun introduce(name: String, age: Int, city: String = "北京"): String {
    return "我是$name，今年$age 岁，居住在$city"
}

fun main() {
    println(introduce("张三", 25, "上海"))
    println(introduce("李四", 30))
}`,
        validator: '我是张三，今年25 岁，居住在上海.*我是李四，今年30 岁，居住在北京'
      }
    ]
  },

  // Day 2: 流程控制
  {
    day: 2,
    title: '流程控制',
    description: '掌握 Kotlin 的条件表达式、循环结构和范围操作',
    icon: '🔄',
    topics: ['if 表达式', 'when 表达式', 'for/while 循环', '范围与区间'],
    difficulty: 'beginner',
    estimatedTime: 240,
    demos: [
      {
        id: 'day2-demo1',
        title: 'if 表达式',
        description: 'if 在 Kotlin 中是表达式，可以返回值',
        code: `fun main() {
    val score = 85

    // if 作为表达式
    val grade = if (score >= 90) "A"
                else if (score >= 80) "B"
                else if (score >= 70) "C"
                else if (score >= 60) "D"
                else "F"

    println("分数: $score, 等级: $grade")

    // if 表达式的块形式
    val message = if (score >= 60) {
        "恭喜通过！分数: $score"
    } else {
        "需要补考。分数: $score"
    }
    println(message)

    // 三元运算符的替代写法
    val isPassing = if (score >= 60) true else false
    println("是否及格: $isPassing")

    // if 作为表达式赋值
    val max = if (10 > 5) 10 else 5
    println("最大值: $max")
}`,
        expectedOutput: '分数: 85, 等级: B\n恭喜通过！分数: 85\n是否及格: true\n最大值: 10'
      },
      {
        id: 'day2-demo2',
        title: 'when 表达式',
        description: 'when 是 Kotlin 中强大的条件表达式，类似 Java 的 switch',
        code: `fun getDayType(day: String): String {
    return when (day.lowercase()) {
        "saturday", "sunday" -> "周末"
        in listOf("monday", "tuesday", "wednesday", "thursday", "friday") -> "工作日"
        else -> "未知"
    }
}

fun getSeason(month: Int): String {
    return when (month) {
        in 3..5 -> "春季"
        in 6..8 -> "夏季"
        in 9..11 -> "秋季"
        12, 1, 2 -> "冬季"
        else -> "无效月份"
    }
}

fun describe(obj: Any): String = when (obj) {
    is Int -> "整数: \${obj * obj}"
    is String -> "字符串长度: \${obj.length}"
    is List<*> -> "列表大小: \${obj.size}"
    else -> "其他类型"
}

fun main() {
    println(getDayType("Sunday"))  // 周末
    println(getDayType("Monday"))  // 工作日
    println(getSeason(7))          // 夏季
    println(describe("Hello"))     // 字符串
    println(describe(42))          // 整数
    println(describe(listOf(1,2,3))) // 列表
}`,
        expectedOutput: '周末\n工作日\n夏季\n字符串长度: 5\n整数: 1764\n列表大小: 3'
      },
      {
        id: 'day2-demo3',
        title: '循环与范围',
        description: '学习 for 循环、while 循环和各种范围操作',
        code: `fun main() {
    println("=== 基本 for 循环 ===")
    // 基本 for 循环
    for (i in 1..5) {
        print("$i ")
    }
    println()

    println("\\n=== 递减范围 ===")
    // 递减范围
    for (i in 5 downTo 1) {
        print("$i ")
    }
    println()

    println("\\n=== 步长 ===")
    // 步长
    for (i in 1..10 step 2) {
        print("$i ")
    }
    println()

    println("\\n=== until (不包含结束值) ===")
    // until (不包含结束值)
    for (i in 1 until 5) {
        print("$i ")
    }
    println()

    println("\\n=== 遍历集合 ===")
    // 遍历列表
    val fruits = listOf("Apple", "Banana", "Cherry")
    for ((index, fruit) in fruits.withIndex()) {
        println("$index: $fruit")
    }

    println("\\n=== 迭代 Map ===")
    // 迭代 Map
    val map = mapOf("name" to "Kotlin", "year" to 2024)
    for ((key, value) in map) {
        println("$key = $value")
    }

    println("\\n=== while 循环 ===")
    // while 循环
    var x = 0
    while (x < 3) {
        println("x = $x")
        x++
    }

    println("\\n=== do-while 循环 ===")
    // do-while 循环
    var y = 0
    do {
        println("y = $y")
        y++
    } while (y < 3)
}`,
        expectedOutput: '=== 基本 for 循环 ===\n1 2 3 4 5 \n\n=== 递减范围 ===\n5 4 3 2 1 \n\n=== 步长 ===\n1 3 5 7 9 \n\n=== until (不包含结束值) ===\n1 2 3 4 \n\n=== 遍历集合 ===\n0: Apple\n1: Banana\n2: Cherry\n\n=== 迭代 Map ===\nname = Kotlin\nyear = 2024\n\n=== while 循环 ===\nx = 0\nx = 1\nx = 2\n\n=== do-while 循环 ===\ny = 0\ny = 1\ny = 2'
      },
      {
        id: 'day2-demo4',
        title: 'break 和 continue 标签',
        description: '学习如何使用标签控制嵌套循环的跳转',
        code: `fun main() {
    println("=== 带标签的 break ===")
    // 带标签的 break
    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (i == 2 && j == 2) {
                break@outer  // 跳出外层循环
            }
            println("i=$i, j=$j")
        }
    }

    println("\\n=== 带标签的 continue ===")
    // 带标签的 continue
    loop@ for (i in 1..3) {
        for (j in 1..3) {
            if (j == 2) continue@loop
            println("i=$i, j=$j")
        }
    }

    println("\\n=== break 示例 ===")
    // break 示例
    for (i in 1..10) {
        if (i > 5) break
        print("$i ")
    }

    println("\\n\\n=== continue 示例 ===")
    // continue 示例
    for (i in 1..5) {
        if (i == 3) continue
        print("$i ")
    }
    println()
}`,
        expectedOutput: '=== 带标签的 break ===\ni=1, j=1\ni=1, j=2\ni=1, j=3\ni=2, j=1\n\n=== 带标签的 continue ===\ni=1, j=1\ni=2, j=1\ni=3, j=1\n\n=== break 示例 ===\n1 2 3 4 5 \n\n=== continue 示例 ===\n1 2 4 5'
      }
    ],
    exercises: [
      {
        id: 'day2-ex1',
        title: '成绩等级判断',
        description: '编写一个函数，根据分数返回等级：90+ A, 80-89 B, 70-79 C, 60-69 D, <60 F',
        template: `fun getGrade(score: Int): String {
    // 使用 when 表达式实现
    TODO("实现等级判断")
}

fun main() {
    println("95分: \${getGrade(95)}")
    println("85分: \${getGrade(85)}")
    println("75分: \${getGrade(75)}")
    println("65分: \${getGrade(65)}")
    println("55分: \${getGrade(55)}")
}`,
        hint: '使用 when 表达式配合范围判断',
        solution: `fun getGrade(score: Int): String {
    return when {
        score >= 90 -> "A"
        score >= 80 -> "B"
        score >= 70 -> "C"
        score >= 60 -> "D"
        else -> "F"
    }
}

fun main() {
    println("95分: \${getGrade(95)}")
    println("85分: \${getGrade(85)}")
    println("75分: \${getGrade(75)}")
    println("65分: \${getGrade(65)}")
    println("55分: \${getGrade(55)}")
}`,
        validator: '95分: A.*85分: B.*75分: C.*65分: D.*55分: F'
      },
      {
        id: 'day2-ex2',
        title: '打印九九乘法表',
        description: '使用嵌套循环打印九九乘法表',
        template: `fun main() {
    // 打印九九乘法表
    // 输出格式: 1x1=1  1x2=2  1x3=3 ...
    TODO("实现九九乘法表")
}`,
        hint: '使用两层嵌套循环，外层控制行，内层控制列',
        solution: `fun main() {
    for (i in 1..9) {
        for (j in 1..i) {
            print("$j×$i=\${i*j}\\t")
        }
        println()
    }
}`,
        validator: '1×1=1.*1×2=2.*2×2=4'
      },
      {
        id: 'day2-ex3',
        title: '判断闰年',
        description: '编写函数判断是否为闰年：能被4整除但不能被100整除，或能被400整除',
        template: `fun isLeapYear(year: Int): Boolean {
    // 实现闰年判断
    TODO("实现闰年判断逻辑")
}

fun main() {
    val years = listOf(2000, 2004, 1900, 2023, 2024)
    for (year in years) {
        println("$year 年是闰年吗? \${isLeapYear(year)}")
    }
}`,
        hint: '使用 (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)',
        solution: `fun isLeapYear(year: Int): Boolean {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}

fun main() {
    val years = listOf(2000, 2004, 1900, 2023, 2024)
    for (year in years) {
        println("$year 年是闰年吗? \${isLeapYear(year)}")
    }
}`,
        validator: '2000 年是闰年吗? true.*2004 年是闰年吗? true.*1900 年是闰年吗? false.*2023 年是闰年吗? false.*2024 年是闰年吗? true'
      }
    ]
  },

  // Day 3: 面向对象编程
  {
    day: 3,
    title: '面向对象编程',
    description: '学习 Kotlin 的类定义、构造函数、属性和初始化',
    icon: '🏗️',
    topics: ['类声明', '主构造函数', '属性', '初始化块', '嵌套类'],
    difficulty: 'beginner',
    estimatedTime: 240,
    demos: [
      {
        id: 'day3-demo1',
        title: '基本类与构造函数',
        description: '学习如何定义类和使用主构造函数、次构造函数',
        code: `// 使用主构造函数定义类
class Person(val name: String, var age: Int) {
    // 次构造函数
    constructor(name: String) : this(name, 0) {
        println("创建婴儿: $name")
    }

    // 成员函数
    fun introduce(): String {
        return "我是$name，今年 $age 岁"
    }

    fun haveBirthday() {
        age++
        println("🎂 生日快乐！现在 $age 岁了")
    }
}

fun main() {
    // 使用主构造函数创建实例
    val person1 = Person("张三", 25)
    println(person1.introduce())

    // 使用次构造函数
    val person2 = Person("宝宝")
    println(person2.introduce())

    // 修改属性
    person1.age = 26
    println("一年后: \${person1.introduce()}")

    // 调用方法
    person2.haveBirthday()
    person2.haveBirthday()
}`,
        expectedOutput: '我是张三，今年 25 岁\n创建婴儿: 宝宝\n我是宝宝，今年 0 岁\n一年后: 我是张三，今年 26 岁\n🎂 生日快乐！现在 1 岁了\n🎂 生日快乐！现在 2 岁了'
      },
      {
        id: 'day3-demo2',
        title: '属性与初始化块',
        description: '学习计算属性、自定义 getter/setter 和 init 初始化块',
        code: `class Rectangle(val width: Double, val height: Double) {
    // 计算属性（只有 getter）
    val area: Double
        get() = width * height

    val perimeter: Double
        get() = 2 * (width + height)

    // 自定义 setter
    var scale: Double = 1.0
        set(value) {
            if (value > 0) {
                field = value
                println("缩放比例设置为: $value")
            } else {
                println("缩放比例必须大于0")
            }
        }

    fun printInfo() {
        println("矩形: " + width + "×" + height)
        println("面积: " + area)
        println("周长: " + perimeter)
    }
}

class User(val name: String) {
    val userId: String

    // init 初始化块（可以多个，按顺序执行）
    init {
        println("初始化用户: $name")
        userId = "USER-\${name.hashCode()}"
    }

    init {
        println("用户ID: $userId")
    }

    val greeting: String
        get() = "你好，我是$name"
}

fun main() {
    // 矩形示例
    val rect = Rectangle(5.0, 3.0)
    rect.printInfo()

    println()
    rect.scale = 2.0
    rect.scale = -1.0

    println()
    // User 示例
    val user = User("Alice")
    println(user.greeting)
}`,
        expectedOutput: '矩形: 5.0×3.0\n面积: 15.0\n周长: 16.0\n\n缩放比例设置为: 2.0\n缩放比例必须大于0\n\n初始化用户: Alice\n用户ID: USER-63209826\n你好，我是 Alice'
      },
      {
        id: 'day3-demo3',
        title: '嵌套类与内部类',
        description: '了解嵌套类（静态）和内部类的区别',
        code: `class OuterClass {
    private val outerProperty = "外部属性"

    // 嵌套类（相当于Java静态内部类）
    class NestedClass {
        fun nestedMethod() = "嵌套类方法"
        // 无法访问外部类成员
    }

    // 内部类（可以访问外部类成员）
    inner class InnerClass {
        fun innerMethod() = "访问 $outerProperty"
    }
}

// 数据类中使用嵌套类
data class Email(val local: String, val domain: String) {
    // 嵌套验证器类
    class Validator {
        fun isValid(email: Email): Boolean {
            return email.local.isNotEmpty() &&
                   email.domain.contains(".") &&
                   email.domain.length > 2
        }

        fun normalize(email: Email): Email {
            return email.copy(
                local = email.local.lowercase(),
                domain = email.domain.lowercase()
            )
        }
    }
}

fun main() {
    // 使用嵌套类
    val nested = OuterClass.NestedClass()
    println(nested.nestedMethod())

    // 使用内部类（需要外部类实例）
    val outer = OuterClass()
    val inner = outer.InnerClass()
    println(inner.innerMethod())

    // Email 验证示例
    val validator = Email.Validator()
    val validEmail = Email("user", "example.com")
    val invalidEmail = Email("", "com")

    println("\\nEmail 验证:")
    println("$validEmail 有效? \${validator.isValid(validEmail)}")
    println("$invalidEmail 有效? \${validator.isValid(invalidEmail)}")

    // 标准化
    val normalized = validator.normalize(Email("USER", "EXAMPLE.COM"))
    println("标准化后: $normalized")
}`,
        expectedOutput: '嵌套类方法\n访问 外部属性\n\nEmail 验证:\nEmail(local=user, domain=example.com) 有效? true\nEmail(local=, domain=com) 有效? false\n标准化后: Email(local=user, domain=example.com)'
      },
      {
        id: 'day3-demo4',
        title: '可见性修饰符与单例',
        description: '学习 Kotlin 的可见性修饰符和 object 单例声明',
        code: `class VisibilityDemo {
    public val publicVar = "所有人可见"
    private val privateVar = "只有本类可见"
    protected val protectedVar = "子类可见"
    internal val internalVar = "同模块可见"

    fun demonstrate() {
        println(publicVar)
        println(privateVar)
        println(protectedVar)
        println(internalVar)
    }

    // 公开方法
    fun getPublic() = publicVar
    fun getInternal() = internalVar
}

// 单例模式（object 声明）
object DatabaseConfig {
    const val DEFAULT_PORT = 3306
    var host: String = "localhost"
    var port: Int = DEFAULT_PORT

    fun getConnectionUrl(): String {
        return "jdbc:mysql://$host:$port/mydb"
    }

    fun configure(h: String, p: Int = DEFAULT_PORT) {
        host = h
        port = p
        println("配置已更新: $host:$port")
    }
}

// companion object（类级别静态成员）
class MyClass {
    companion object {
        const val CLASS_NAME = "MyClass"
        var instanceCount = 0

        fun create(): MyClass {
            instanceCount++
            return MyClass()
        }
    }

    init {
        println("$CLASS_NAME 实例 #\${instanceCount} 被创建")
    }
}

fun main() {
    // 可见性演示
    val demo = VisibilityDemo()
    println("=== 可见性演示 ===")
    println("Public: \${demo.getPublic()}")
    println("Internal: \${demo.getInternal()}")

    // 单例使用
    println("\\n=== 单例演示 ===")
    println("默认配置: \${DatabaseConfig.getConnectionUrl()}")
    DatabaseConfig.configure("192.168.1.100", 3307)
    println("更新后: \${DatabaseConfig.getConnectionUrl()}")

    // companion object 演示
    println("\\n=== Companion Object 演示 ===")
    val obj1 = MyClass.create()
    val obj2 = MyClass.create()
    val obj3 = MyClass.create()
}`,
        expectedOutput: '=== 可见性演示 ===\nPublic: 所有人可见\nInternal: 同模块可见\n\n=== 单例演示 ===\n默认配置: jdbc:mysql://localhost:3306/mydb\n配置已更新: 192.168.1.100:3307\n更新后: jdbc:mysql://192.168.1.100:3307/mydb\n\n=== Companion Object 演示 ===\nMyClass 实例 #1 被创建\nMyClass 实例 #2 被创建\nMyClass 实例 #3 被创建'
      }
    ],
    exercises: [
      {
        id: 'day3-ex1',
        title: '银行账户类',
        description: '创建 BankAccount 类，支持存款、取款、查询余额操作',
        template: `class BankAccount(
    private var balance: Double = 0.0
) {
    // TODO: 实现存款方法
    fun deposit(amount: Double) {
        TODO()
    }

    // TODO: 实现取款方法（余额不足时返回 false）
    fun withdraw(amount: Double): Boolean {
        TODO()
    }

    // TODO: 实现查询余额方法
    fun getBalance(): Double {
        TODO()
    }
}

fun main() {
    val account = BankAccount(100.0)
    println("初始余额: \${account.getBalance()}")

    account.deposit(50.0)
    println("存款50后: \${account.getBalance()}")

    val success = account.withdraw(30.0)
    println("取款30成功? $success, 余额: \${account.getBalance()}")

    val fail = account.withdraw(200.0)
    println("取款200成功? $fail, 余额: \${account.getBalance()}")
}`,
        hint: '存款直接增加余额，取款需检查余额是否足够',
        solution: `class BankAccount(
    private var balance: Double = 0.0
) {
    fun deposit(amount: Double) {
        if (amount > 0) {
            balance += amount
            println("存入 $amount")
        }
    }

    fun withdraw(amount: Double): Boolean {
        if (amount > 0 && balance >= amount) {
            balance -= amount
            println("取出 $amount")
            return true
        }
        println("取款失败: 余额不足")
        return false
    }

    fun getBalance(): Double = balance
}

fun main() {
    val account = BankAccount(100.0)
    println("初始余额: \${account.getBalance()}")

    account.deposit(50.0)
    println("存款50后: \${account.getBalance()}")

    val success = account.withdraw(30.0)
    println("取款30成功? $success, 余额: \${account.getBalance()}")

    val fail = account.withdraw(200.0)
    println("取款200成功? $fail, 余额: \${account.getBalance()}")
}`,
        validator: '初始余额: 100\\.0.*存入 50\\.0.*存款50后: 150\\.0.*取出 30\\.0.*取款30成功? true.*余额: 120\\.0.*取款失败.*取款200成功? false.*余额: 120\\.0'
      },
      {
        id: 'day3-ex2',
        title: '二维坐标点类',
        description: '创建 Point 类表示二维坐标点，实现计算距离的方法',
        template: `import kotlin.math.sqrt
import kotlin.math.pow

class Point(
    val x: Double,
    val y: Double
) {
    // TODO: 计算到原点的距离
    fun distanceToOrigin(): Double {
        TODO()
    }

    // TODO: 计算到另一个点的距离
    fun distanceTo(other: Point): Double {
        TODO()
    }

    override fun toString(): String {
        return "($x, $y)"
    }
}

fun main() {
    val p1 = Point(3.0, 4.0)
    val p2 = Point(0.0, 0.0)
    val p3 = Point(6.0, 8.0)

    println("$p1 到原点的距离: \${p1.distanceToOrigin()}")
    println("$p1 到 $p3 的距离: \${p1.distanceTo(p3)}")
}`,
        hint: '使用勾股定理：距离 = √(x² + y²)',
        solution: `import kotlin.math.sqrt
import kotlin.math.pow

class Point(
    val x: Double,
    val y: Double
) {
    fun distanceToOrigin(): Double {
        return sqrt(x.pow(2) + y.pow(2))
    }

    fun distanceTo(other: Point): Double {
        val dx = x - other.x
        val dy = y - other.y
        return sqrt(dx.pow(2) + dy.pow(2))
    }

    override fun toString(): String {
        return "($x, $y)"
    }
}

fun main() {
    val p1 = Point(3.0, 4.0)
    val p2 = Point(0.0, 0.0)
    val p3 = Point(6.0, 8.0)

    println("$p1 到原点的距离: \${p1.distanceToOrigin()}")
    println("$p1 到 $p3 的距离: \${p1.distanceTo(p3)}")
}`,
        validator: '\\(3\\.0, 4\\.0\\) 到原点的距离: 5\\.0.*\\(3\\.0, 4\\.0\\) 到 \\(6\\.0, 8\\.0\\) 的距离: 5\\.0'
      },
      {
        id: 'day3-ex3',
        title: '汽车类',
        description: '创建 Car 类，包含品牌、型号、速度属性，实现加速和刹车方法',
        template: `class Car(
    val brand: String,
    val model: String,
    initialSpeed: Int = 0
) {
    // TODO: 添加速度属性（可读写）

    // TODO: 实现加速方法（不能超过最大速度）
    fun accelerate(amount: Int, maxSpeed: Int = 200) {
        TODO()
    }

    // TODO: 实现刹车方法（速度不能低于0）
    fun brake(amount: Int) {
        TODO()
    }

    // TODO: 返回汽车状态描述
    fun getStatus(): String {
        TODO()
    }
}

fun main() {
    val car = Car("Tesla", "Model 3")
    println(car.getStatus())

    car.accelerate(50)
    println(car.getStatus())

    car.accelerate(30)
    println(car.getStatus())

    car.brake(20)
    println(car.getStatus())
}`,
        hint: '速度是 var 类型，需要在构造函数后初始化',
        solution: `class Car(
    val brand: String,
    val model: String,
    initialSpeed: Int = 0
) {
    var speed: Int = initialSpeed
        private set

    fun accelerate(amount: Int, maxSpeed: Int = 200) {
        speed = (speed + amount).coerceAtMost(maxSpeed)
    }

    fun brake(amount: Int) {
        speed = (speed - amount).coerceAtLeast(0)
    }

    fun getStatus(): String {
        return brand + " " + model + " 当前速度: " + speed + "km/h"
    }
}

fun main() {
    val car = Car("Tesla", "Model 3")
    println(car.getStatus())

    car.accelerate(50)
    println(car.getStatus())

    car.accelerate(30)
    println(car.getStatus())

    car.brake(20)
    println(car.getStatus())
}`,
        validator: 'Tesla Model 3 当前速度: 0km/h.*Tesla Model 3 当前速度: 50km/h.*Tesla Model 3 当前速度: 80km/h.*Tesla Model 3 当前速度: 60km/h'
      }
    ]
  },

  // Day 4: 继承与接口
  {
    day: 4,
    title: '继承与接口',
    description: '掌握 Kotlin 的类继承、抽象类和接口机制',
    icon: '🔗',
    topics: ['类继承', '方法重写', '抽象类', '接口定义', '多态'],
    difficulty: 'beginner',
    estimatedTime: 240,
    demos: [
      {
        id: 'day4-demo1',
        title: '基本继承与重写',
        description: '学习如何使用 open 关键字实现类继承和方法重写',
        code: `// open 类可以被继承
open class Animal(val name: String) {
    open fun makeSound() = "动物发出声音"

    open fun sleep() {
        println("$name 正在睡觉")
    }
}

class Dog(name: String, val breed: String) : Animal(name) {
    // 重写方法
    override fun makeSound() = "汪汪！"

    fun fetch() {
        println("$name 去捡球了")
    }
}

class Cat(name: String, val color: String) : Animal(name) {
    override fun makeSound() = "喵喵~"

    fun scratch() {
        println("$name 在挠沙发")
    }
}

fun main() {
    val animals: List<Animal> = listOf(
        Dog("旺财", "金毛"),
        Cat("咪咪", "橘色"),
        Dog("大黄", "中华田园犬")
    )

    for (animal in animals) {
        println(" " + animal.name + ": " + animal.makeSound())
        // 智能转换
        if (animal is Dog) {
            animal.fetch()
        }
    }
}`,
        expectedOutput: '旺财: 汪汪！'
      },
      {
        id: 'day4-demo2',
        title: '抽象类',
        description: '使用 abstract 关键字定义抽象类和抽象方法',
        code: `// 抽象类不能直接实例化
abstract class Shape(val name: String) {
    // 抽象属性
    abstract val area: Double

    // 抽象方法
    abstract fun calculatePerimeter(): Double

    // 普通方法
    fun describe(): String {
        return name + " - 面积: " + area + ", 周长: " + calculatePerimeter()
    }
}

class Circle(val radius: Double) : Shape("圆形") {
    override val area: Double
        get() = Math.PI * radius * radius

    override fun calculatePerimeter() = 2 * Math.PI * radius
}

class Rectangle(val width: Double, val height: Double) : Shape("矩形") {
    override val area: Double
        get() = width * height

    override fun calculatePerimeter() = 2 * (width + height)
}

class Triangle(val base: Double, val height: Double, val sideA: Double, val sideB: Double) : Shape("三角形") {
    override val area: Double
        get() = 0.5 * base * height

    override fun calculatePerimeter() = base + sideA + sideB
}

fun main() {
    val shapes: List<Shape> = listOf(
        Circle(5.0),
        Rectangle(4.0, 6.0),
        Triangle(3.0, 4.0, 3.0, 4.0)
    )

    shapes.forEach { println(it.describe()) }
}`,
        expectedOutput: '圆形 - 面积:'
      },
      {
        id: 'day4-demo3',
        title: '接口定义与实现',
        description: '学习如何定义接口和实现多个接口',
        code: `// 接口定义
interface Drawable {
    fun draw()
    fun getDescription(): String = "可绘制的对象"
}

interface Movable {
    fun move(dx: Int, dy: Int)
}

// ���点击接口
interface Clickable {
    fun click()
    fun doubleClick() = println("双击!")
}

class Point(var x: Int, var y: Int) : Drawable, Movable, Clickable {
    override fun draw() {
        println("在 (" + x + ", " + y + ") 画点")
    }

    override fun move(dx: Int, dy: Int) {
        x += dx
        y += dy
        println("移动到 (" + x + ", " + y + ")")
    }

    override fun click() {
        println("点击点 (" + x + ", " + y + ")")
    }

    // 不覆盖 doubleClick，使用接口默认实现
}

class CircleDrawable(val radius: Int) : Drawable {
    override fun draw() {
        println("画半径为 " + radius + " 的圆")
    }
}

fun main() {
    val point = Point(10, 20)
    point.draw()
    point.move(5, -3)
    point.click()
    point.doubleClick()  // 使用接口默认实现

    println()

    val circle = CircleDrawable(15)
    circle.draw()
    println(circle.getDescription())
}`,
        expectedOutput: '在 (10, 20) 画点'
      },
      {
        id: 'day4-demo4',
        title: '多接口实现与冲突解决',
        description: '处理多个接口中方法名冲突的情况',
        code: `// 有冲突方法的接口
interface InterfaceA {
    fun commonMethod() = "InterfaceA 的实现"
    fun methodA() = "来自 InterfaceA"
}

interface InterfaceB {
    fun commonMethod() = "InterfaceB 的实现"
    fun methodB() = "来自 InterfaceB"
}

// 实现多个接口，必须解决冲突
class MultiImplementation : InterfaceA, InterfaceB {
    // 必须重写冲突的方法
    override fun commonMethod(): String {
        // 可以选择调用其中一个接口的实现
        return super<InterfaceA>.commonMethod() + " + " + super<InterfaceB>.commonMethod()
    }
}

open class BaseClass {
    open fun baseMethod() = "BaseClass 的实现"
}

class DerivedClass : BaseClass(), InterfaceA {
    // 重写基类方法
    override fun baseMethod() = "DerivedClass 重写的实现"

    // 实现接口方法
    override fun methodA() = "DerivedClass 重新实现: " + super.methodA()
}

fun main() {
    val multi = MultiImplementation()
    println(multi.commonMethod())
    println(multi.methodA())
    println(multi.methodB())

    println()

    val derived = DerivedClass()
    println(derived.baseMethod())
    println(derived.methodA())
}`,
        expectedOutput: 'InterfaceA 的实现 + InterfaceB 的实现'
      }
    ],
    exercises: [
      {
        id: 'day4-ex1',
        title: '图形类层次结构',
        description: '创建一个图形类层次结构，包含 Shape 基类和 Circle、Rectangle、Triangle 子类',
        template: `// 抽象基类
abstract class Shape(val name: String) {
    abstract val area: Double
    abstract fun calculatePerimeter(): Double

    fun printInfo() {
        println(name + " - 面积: " + area)
    }
}

// TODO: 实现 Circle 类
class Circle(val radius: Double) : Shape("圆形") {
    // TODO: 实现 area 属性
    // TODO: 实现 calculatePerimeter 方法
}

// TODO: 实现 Rectangle 类
class Rectangle(val width: Double, val height: Double) : Shape("矩形") {
    // TODO: 实现 area 属性
    // TODO: 实现 calculatePerimeter 方法
}

fun main() {
    val circle = Circle(5.0)
    circle.printInfo()

    val rect = Rectangle(4.0, 6.0)
    rect.printInfo()
}`,
        hint: 'Circle 面积 = πr²，周长 = 2πr；Rectangle 面积 = width × height，周长 = 2(width + height)',
        solution: `import kotlin.math.PI

// 抽象基类
abstract class Shape(val name: String) {
    abstract val area: Double
    abstract fun calculatePerimeter(): Double

    fun printInfo() {
        println(name + " - 面积: " + area)
    }
}

class Circle(val radius: Double) : Shape("圆形") {
    override val area: Double
        get() = PI * radius * radius

    override fun calculatePerimeter() = 2 * PI * radius
}

class Rectangle(val width: Double, val height: Double) : Shape("矩形") {
    override val area: Double
        get() = width * height

    override fun calculatePerimeter() = 2 * (width + height)
}

fun main() {
    val circle = Circle(5.0)
    circle.printInfo()

    val rect = Rectangle(4.0, 6.0)
    rect.printInfo()
}`,
        validator: '圆形 - 面积:.*矩形 - 面积:'
      },
      {
        id: 'day4-ex2',
        title: 'Playable 接口',
        description: '创建 Playable 接口，让 Video、Audio 类实现它',
        template: `// TODO: 定义 Playable 接口
interface Playable {
    fun play()
    fun pause()
    fun stop()

    // 默认实现
    fun getInfo() = "媒体文件"
}

// TODO: 实现 Video 类
class Video(val title: String, val duration: Int) : Playable {
    // TODO: 实现接口方法
    var currentTime = 0

    override fun getInfo() = "视频: " + title + " (" + duration + "秒)"
}

// TODO: 实现 Audio 类
class Audio(val title: String, val artist: String) : Playable {
    // TODO: 实现接口方法
    var isPlaying = false

    override fun getInfo() = "音频: " + title + " - " + artist
}

fun main() {
    val media: List<Playable> = listOf(
        Video("Kotlin 教程", 600),
        Audio("Coding Music", "Artist Name")
    )

    for (m in media) {
        println(m.getInfo())
        m.play()
        m.pause()
        m.stop()
        println()
    }
}`,
        hint: '在 Video 中播放增加 currentTime，暂停显示当前时间，Audio 播放设置 isPlaying = true',
        solution: `interface Playable {
    fun play()
    fun pause()
    fun stop()

    fun getInfo() = "媒体文件"
}

class Video(val title: String, val duration: Int) : Playable {
    var currentTime = 0

    override fun play() {
        println("播放视频: " + title)
    }

    override fun pause() {
        println("暂停视频 at " + currentTime + "s")
    }

    override fun stop() {
        println("停止视频")
        currentTime = 0
    }

    override fun getInfo() = "视频: " + title + " (" + duration + "秒)"
}

class Audio(val title: String, val artist: String) : Playable {
    var isPlaying = false

    override fun play() {
        isPlaying = true
        println("播放音频: " + title + " by " + artist)
    }

    override fun pause() {
        isPlaying = false
        println("暂停音频")
    }

    override fun stop() {
        isPlaying = false
        println("停止音频")
    }

    override fun getInfo() = "音频: " + title + " - " + artist
}

fun main() {
    val media: List<Playable> = listOf(
        Video("Kotlin 教程", 600),
        Audio("Coding Music", "Artist Name")
    )

    for (m in media) {
        println(m.getInfo())
        m.play()
        m.pause()
        m.stop()
        println()
    }
}`,
        validator: '视频: Kotlin 教程.*播放视频.*暂停视频.*停止视频.*音频: Coding Music.*播放音频.*暂停音频.*停止音频'
      },
      {
        id: 'day4-ex3',
        title: '员工系统',
        description: '创建 Employee 抽象类，Manager、Developer、Designer 子类',
        template: `import kotlin.math.roundToInt

// TODO: 定义 Employee 抽象类
abstract class Employee(
    val name: String,
    val baseSalary: Double
) {
    abstract fun calculateBonus(): Double

    fun getMonthlySalary(): Double {
        return baseSalary + calculateBonus()
    }

    fun printInfo() {
        println(name + ": 月薪 " + getMonthlySalary().roundToInt() + " 元")
    }
}

// TODO: 实现 Manager 类
// 奖金 = baseSalary * 0.2
class Manager(
    name: String,
    baseSalary: Double,
    val teamSize: Int
) : Employee(name, baseSalary) {
    // TODO: 实现 calculateBonus
}

// TODO: 实现 Developer 类
// 奖金 = baseSalary * 0.15 + 项目数 * 1000
class Developer(
    name: String,
    baseSalary: Double,
    val projectsCompleted: Int
) : Employee(name, baseSalary) {
    // TODO: 实现 calculateBonus
}

// TODO: 实现 Designer 类
// 奖金 = baseSalary * 0.1 + 作品数 * 500
class Designer(
    name: String,
    baseSalary: Double,
    val portfolioSize: Int
) : Employee(name, baseSalary) {
    // TODO: 实现 calculateBonus
}

fun main() {
    val employees = listOf(
        Manager("张经理", 15000.0, 5),
        Developer("李开发", 12000.0, 3),
        Designer("王设计", 10000.0, 10)
    )

    employees.forEach { it.printInfo() }

    // 计算总薪资
    val totalSalary = employees.sumOf { it.getMonthlySalary() }
    println("\\n总薪资: " + totalSalary.roundToInt() + " 元")
}`,
        hint: 'Manager 奖金 = baseSalary * 0.2，Developer 奖金 = baseSalary * 0.15 + projectsCompleted * 1000',
        solution: `import kotlin.math.roundToInt

abstract class Employee(
    val name: String,
    val baseSalary: Double
) {
    abstract fun calculateBonus(): Double

    fun getMonthlySalary(): Double {
        return baseSalary + calculateBonus()
    }

    fun printInfo() {
        println(name + ": 月薪 " + getMonthlySalary().roundToInt() + " 元")
    }
}

class Manager(
    name: String,
    baseSalary: Double,
    val teamSize: Int
) : Employee(name, baseSalary) {
    override fun calculateBonus(): Double {
        return baseSalary * 0.2
    }
}

class Developer(
    name: String,
    baseSalary: Double,
    val projectsCompleted: Int
) : Employee(name, baseSalary) {
    override fun calculateBonus(): Double {
        return baseSalary * 0.15 + projectsCompleted * 1000
    }
}

class Designer(
    name: String,
    baseSalary: Double,
    val portfolioSize: Int
) : Employee(name, baseSalary) {
    override fun calculateBonus(): Double {
        return baseSalary * 0.1 + portfolioSize * 500
    }
}

fun main() {
    val employees = listOf(
        Manager("张经理", 15000.0, 5),
        Developer("李开发", 12000.0, 3),
        Designer("王设计", 10000.0, 10)
    )

    employees.forEach { it.printInfo() }

    val totalSalary = employees.sumOf { it.getMonthlySalary() }
    println("\\n总薪资: " + totalSalary.roundToInt() + " 元")
}`,
        validator: '张经理: 月薪 18000 元.*李开发: 月薪 16500 元.*王设计: 月薪 11000 元.*总薪资: 45500 元'
      }
    ]
  },

  {
    day: 5,
    title: '集合与泛型',
    description: '学习 Kotlin 的集合操作和泛型编程',
    icon: '📦',
    topics: ['List/Set/Map', '集合操作', '泛型类与函数', '类型约束'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [],
    exercises: []
  },

  {
    day: 6,
    title: '函数式编程',
    description: '掌握 Lambda 表达式和高阶函数的使用',
    icon: 'λ',
    topics: ['Lambda 表达式', '高阶函数', '作用域函数', '函数引用'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [],
    exercises: []
  },

  {
    day: 7,
    title: '空安全与异常处理',
    description: '学习 Kotlin 的空安全系统和异常处理机制',
    icon: '🛡️',
    topics: ['可空类型', '安全调用', 'Elvis 操作符', '异常处理'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [],
    exercises: []
  },

  {
    day: 8,
    title: '扩展函数与属性',
    description: '学习如何为现有类添加新功能',
    icon: '➕',
    topics: ['扩展函数', '扩展属性', '扩展作用域', 'DSL 入门'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [],
    exercises: []
  },

  {
    day: 9,
    title: '协程基础',
    description: '入门 Kotlin 协程，学习异步编程',
    icon: '⚡',
    topics: ['协程概念', 'launch/async', '结构化并发', '调度器'],
    difficulty: 'advanced',
    estimatedTime: 300,
    demos: [],
    exercises: []
  },

  {
    day: 10,
    title: '数据类与密封类',
    description: '掌握数据类和密封类的使用场景',
    icon: '📊',
    topics: ['data class', 'sealed class', 'enum class', '解构'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [],
    exercises: []
  },

  {
    day: 11,
    title: '标准库与常用函数',
    description: '学习 Kotlin 标准库中的常用函数和工具',
    icon: '🧰',
    topics: ['作用域函数', '集合操作', '字符串操作', '数学函数'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [],
    exercises: []
  },

  {
    day: 12,
    title: 'DSL 与高阶技巧',
    description: '学习如何构建类型安全的 DSL',
    icon: '🎨',
    topics: ['DSL 构建', '中缀函数', '操作符重载', '属性委托'],
    difficulty: 'advanced',
    estimatedTime: 300,
    demos: [],
    exercises: []
  },

  {
    day: 13,
    title: '实战项目',
    description: '综合运用所学知识完成一个完整项目',
    icon: '🚀',
    topics: ['项目设计', '数据建模', '服务层', '综合实践'],
    difficulty: 'advanced',
    estimatedTime: 360,
    demos: [],
    exercises: []
  },

  {
    day: 14,
    title: '最佳实践',
    description: '学习 Kotlin 的编码规范和最佳实践',
    icon: '✨',
    topics: ['命名规范', '代码组织', '性能优化', '测试入门'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [],
    exercises: []
  }
]

// ============================================
// 工具函数
// ============================================

/**
 * 获取指定天数的数据
 */
export function getDayData(day: number): DayCurriculum | undefined {
  return curriculum.find(d => d.day === day)
}

/**
 * 获取下一课
 */
export function getNextDay(currentDay: number): DayCurriculum | undefined {
  return curriculum.find(d => d.day === currentDay + 1)
}

/**
 * 检查是否有上一课
 */
export function hasPreviousDay(currentDay: number): boolean {
  return currentDay > 1
}

/**
 * 获取总课程数
 */
export function getTotalDays(): number {
  return curriculum.length
}

/**
 * 根据难度分类课程
 */
export function getByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): DayCurriculum[] {
  return curriculum.filter(d => d.difficulty === difficulty)
}

// 默认导出
export default curriculum
