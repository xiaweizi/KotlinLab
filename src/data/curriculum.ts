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
    println("Int转Long: $a -> $b")

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

// 可点击接口
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
    demos: [
      {
        id: 'day5-demo1',
        title: '基本集合操作',
        description: '学习 List、Set、Map 的创建和基本操作',
        code: `fun main() {
    // List - 有序可重复集合
    val immutableList = listOf("Apple", "Banana", "Cherry")
    println("不可变 List: " + immutableList)

    val mutableList = mutableListOf(1, 2, 3)
    mutableList.add(4)
    mutableList += 5
    println("可变 List: " + mutableList)

    // Set - 无序不重复集合
    val set = setOf(1, 2, 2, 3, 3, 3)
    println("Set (自动去重): " + set)

    val mutableSet = mutableSetOf("A", "B", "C")
    mutableSet.add("D")
    println("可变 Set: " + mutableSet)

    // Map - 键值对集合
    val map = mapOf("name" to "Kotlin", "year" to 2024)
    println("Map: " + map)
    println("name: " + map["name"])

    val mutableMap = mutableMapOf("x" to 1, "y" to 2)
    mutableMap["z"] = 3
    println("可变 Map: " + mutableMap)

    // 创建集合的各种方式
    println("\\n创建方式:")
    val emptyList = emptyList<String>()
    println("空列表: " + emptyList)
    val listOrNull = listOfNotNull(1, 2, null, 3, null, 4)
    println("过滤 null: " + listOrNull)

    // 使用 buildList 创建
    val builtList = buildList {
        add("First")
        addAll(listOf("Second", "Third"))
    }
    println("构建 List: " + builtList)
}`,
        expectedOutput: '不可变 List: [Apple, Banana, Cherry]'
      },
      {
        id: 'day5-demo2',
        title: '集合函数式操作',
        description: '学习 filter、map、flatMap 等常用操作',
        code: `data class Person(val name: String, val age: Int, val city: String)

fun main() {
    val people = listOf(
        Person("Alice", 25, "Beijing"),
        Person("Bob", 30, "Shanghai"),
        Person("Charlie", 25, "Beijing"),
        Person("David", 35, "Shenzhen"),
        Person("Eve", 28, "Beijing")
    )

    // filter - 过滤
    val youngPeople = people.filter { it.age < 30 }
    println("年轻人: " + youngPeople.map { it.name })

    // map - 转换
    val names = people.map { it.name }
    println("姓名: " + names)

    // flatMap - 扁平化
    val sentences = listOf("Hello World", "Kotlin is Great")
    val words = sentences.flatMap { it.split(" ") }
    println("单词: " + words)

    // groupBy - 分组
    val byCity = people.groupBy { it.city }
    println("按城市分组: " + byCity)

    // sortedBy - 排序
    val sortedByAge = people.sortedBy { it.age }
    println("按年龄排序: " + sortedByAge.map { it.name + "(" + it.age + ")" })

    // distinctBy - 去重
    val distinctAge = people.distinctBy { it.age }
    println("不同年龄: " + distinctAge.map { it.age })

    // associate - 转换为 Map
    val nameToAge = people.associate { it.name to it.age }
    println("姓名到年龄: " + nameToAge)

    // count - 统计
    val count = people.count { it.age > 25 }
    println("年龄大于25的人数: " + count)
}`,
        expectedOutput: '年轻人: [Alice, Charlie, Eve]'
      },
      {
        id: 'day5-demo3',
        title: 'fold/reduce 操作',
        description: '学习 fold、reduce 等累积操作',
        code: `fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)

    // fold - 从初始值开始累积
    val sum = numbers.fold(0) { acc, num -> acc + num }
    println("求和: " + sum)

    val product = numbers.fold(1) { acc, num -> acc * num }
    println("求积: " + product)

    // 使用字符串连接
    val result = numbers.fold("前缀:") { acc, num -> acc + " [" + num + "]" }
    println("fold 连接: " + result)

    // reduce - 没有初始值，第一个元素作为初始值
    val max = numbers.reduce { acc, num -> if (acc > num) acc else num }
    println("最大值: " + max)

    // sumBy - 对属性求和
    val squares = listOf(1, 2, 3, 4, 5)
    println("平方和: " + squares.sumOf { it * it })

    // take, drop
    println("前3个: " + numbers.take(3))
    println("后2个: " + numbers.takeLast(2))
    println("去掉前1个: " + numbers.drop(1))

    // chunked - 分块
    println("分块(2个一组): " + numbers.chunked(2))

    // windowed - 滑动窗口
    println("滑动窗口(3): " + numbers.windowed(3).toList())

    // zip - 组合
    val names = listOf("Alice", "Bob", "Charlie")
    val ages = listOf(25, 30, 35)
    println("组合: " + names.zip(ages))
}`,
        expectedOutput: '求和: 15'
      },
      {
        id: 'day5-demo4',
        title: '泛型类与函数',
        description: '学习如何定义和使用泛型',
        code: `// 泛型类
class Box<T>(var value: T) {
    fun getValue(): T = value
    fun setValue(value: T) {
        this.value = value
    }

    override fun toString(): String {
        return "Box($value)"
    }
}

// 泛型函数
fun <T> firstOf(list: List<T>): T? {
    return list.firstOrNull()
}

// 多个类型参数
class Pair<K, V>(val first: K, val second: V) {
    override fun toString(): String {
        return "Pair(" + first + ", " + second + ")"
    }
}

// 类型约束
fun <T : Number> sum(list: List<T>): Double {
    return list.sumOf { it.toDouble() }
}

// 泛型约束
fun <T : Comparable<T>> maxOf(a: T, b: T): T {
    return if (a > b) a else b
}

fun main() {
    // 使用泛型类
    val intBox = Box(42)
    val stringBox = Box("Hello")
    println(intBox)
    println(stringBox)

    // 使用泛型函数
    val numbers = listOf(1, 2, 3, 4, 5)
    println("第一个: " + firstOf(numbers))

    // 使用 Pair
    val pair = Pair("Answer", 42)
    println(pair)

    // 类型约束
    val ints = listOf(1, 2, 3)
    println("整数和: " + sum(ints))

    val doubles = listOf(1.5, 2.5, 3.5)
    println("浮点数和: " + sum(doubles))

    // 字符串无法调用 sum，因为 String 不是 Number
    // val strings = listOf("a", "b", "c")
    // println(sum(strings))  // 编译错误

    // 使用 maxOf
    println("最大值: " + maxOf(10, 20))
    println("字母比较: " + maxOf("Apple", "Banana"))
}`,
        expectedOutput: 'Box(42)'
      }
    ],
    exercises: [
      {
        id: 'day5-ex1',
        title: '学生成绩管理',
        description: '使用集合操作管理学生成绩，实现筛选、排序、分组功能',
        template: `data class Student(val name: String, val score: Int, val subject: String)

fun main() {
    val students = listOf(
        Student("张三", 85, "数学"),
        Student("李四", 92, "数学"),
        Student("王五", 78, "数学"),
        Student("张三", 88, "语文"),
        Student("李四", 95, "语文"),
        Student("王五", 82, "语文")
    )

    // TODO: 筛选出成绩大于等于 85 的学生
    val excellentStudents = students.filter { TODO() }

    println("优秀学生 (" + excellentStudents.size + "人):")
    excellentStudents.forEach { println("  - " + it.name + ": " + it.score + "分") }

    // TODO: 按科目分组
    val bySubject = students.groupBy { TODO() }

    println("\\n按科目分组:")
    bySubject.forEach { (subject, stuList) ->
        println("  " + subject + ": " + stuList.map { it.name })
    }

    // TODO: 计算每个科目的平均分
    val avgScores = bySubject.mapValues { stuList ->
        stuList.sumOf { TODO() }.toDouble() / stuList.size
    }

    println("\\n科目平均分:")
    avgScores.forEach { (subject, avg) ->
        println("  " + subject + ": " + (Math.round(avg * 10) / 10.0)
    }
}`,
        hint: 'filter 用 it.score >= 85；groupBy 用 it.subject；sumOf 用 it.score',
        solution: `data class Student(val name: String, val score: Int, val subject: String)

fun main() {
    val students = listOf(
        Student("张三", 85, "数学"),
        Student("李四", 92, "数学"),
        Student("王五", 78, "数学"),
        Student("张三", 88, "语文"),
        Student("李四", 95, "语文"),
        Student("王五", 82, "语文")
    )

    val excellentStudents = students.filter { it.score >= 85 }

    println("优秀学生 (" + excellentStudents.size + "人):")
    excellentStudents.forEach { println("  - " + it.name + ": " + it.score + "分") }

    val bySubject = students.groupBy { it.subject }

    println("\\n按科目分组:")
    bySubject.forEach { (subject, stuList) ->
        println("  " + subject + ": " + stuList.map { it.name })
    }

    val avgScores = bySubject.mapValues { stuList ->
        stuList.sumOf { it.score }.toDouble() / stuList.size
    }

    println("\\n科目平均分:")
    avgScores.forEach { (subject, avg) ->
        println("  " + subject + ": " + (Math.round(avg * 10) / 10.0)
    }
}`,
        validator: '优秀学生.*数学: 85.*语文: 95.*科目平均分.*数学: 85'
      },
      {
        id: 'day5-ex2',
        title: '泛型栈类',
        description: '创建一个泛型 Stack 类，支持 push、pop、peek、isEmpty 操作',
        template: `// TODO: 实现泛型 Stack 类
class Stack<T> {
    private val items = mutableListOf<T>()

    // TODO: 压入元素
    fun push(item: T) {
        TODO()
    }

    // TODO: 弹出元素
    fun pop(): T? {
        TODO()
    }

    // TODO: 查看栈顶元素
    fun peek(): T? {
        TODO()
    }

    // TODO: 检查是否为空
    fun isEmpty(): Boolean {
        TODO()
    }

    // TODO: 获取栈大小
    fun size(): Int {
        TODO()
    }
}

fun main() {
    val stack = Stack<Int>()

    println("栈是否为空: " + stack.isEmpty())

    // 压入元素
    stack.push(1)
    stack.push(2)
    stack.push(3)

    println("栈大小: " + stack.size())
    println("栈顶元素: " + stack.peek())

    // 弹出元素
    println("弹出: " + stack.pop())
    println("弹出: " + stack.pop())
    println("栈大小: " + stack.size())

    println("栈是否为空: " + stack.isEmpty())
}`,
        hint: 'push 添加到列表末尾，pop 移除并返回最后一个元素，peek 返回最后一个元素但不删除',
        solution: `class Stack<T> {
    private val items = mutableListOf<T>()

    fun push(item: T) {
        items.add(item)
    }

    fun pop(): T? {
        if (items.isEmpty()) return null
        return items.removeAt(items.size - 1)
    }

    fun peek(): T? {
        return items.lastOrNull()
    }

    fun isEmpty(): Boolean {
        return items.isEmpty()
    }

    fun size(): Int {
        return items.size
    }
}

fun main() {
    val stack = Stack<Int>()

    println("栈是否为空: " + stack.isEmpty())

    stack.push(1)
    stack.push(2)
    stack.push(3)

    println("栈大小: " + stack.size())
    println("栈顶元素: " + stack.peek())

    println("弹出: " + stack.pop())
    println("弹出: " + stack.pop())
    println("栈大小: " + stack.size())

    println("栈是否为空: " + stack.isEmpty())
}`,
        validator: '栈是否为空: true.*栈大小: 3.*栈顶元素: 3.*弹出: 3.*弹出: 2.*栈大小: 1.*栈是否为空: false'
      },
      {
        id: 'day5-ex3',
        title: '单词统计器',
        description: '使用集合操作统计文本中每个单词出现的频率',
        template: `fun main() {
    val text = "Kotlin is great Kotlin is fun Kotlin is powerful"

    // TODO: 实现单词统计
    // 提示: 先用 split 分割，再用 groupBy 统计，最后按频率排序
    val words = text.split(" ")
    println("所有单词: " + words.toList())

    // TODO: 统计每个单词出现的次数
    val wordCount = TODO()

    println("\\n单词统计:")
    wordCount.forEach { (word, count) ->
        println("  " + word + ": " + count + " 次")
    }

    // TODO: 找出出现最多的单词
    val mostFrequent = wordCount.maxByOrNull { it.value }
    println("\\n出现最多: " + mostFrequent?.key + " (" + mostFrequent?.value + "次)")
}`,
        hint: '使用 groupBy { it } 统计，使用 entries.toList() 转换为列表后排序',
        solution: `fun main() {
    val text = "Kotlin is great Kotlin is fun Kotlin is powerful"

    val words = text.split(" ")
    println("所有单词: " + words.toList())

    val wordCount = words.groupBy { it }.mapValues { it.size }

    println("\\n单词统计:")
    wordCount.forEach { (word, count) ->
        println("  " + word + ": " + count + " 次")
    }

    val mostFrequent = wordCount.maxByOrNull { it.value }
    println("\\n出现最多: " + mostFrequent?.key + " (" + mostFrequent?.value + "次)")
}`,
        validator: '单词统计.*Kotlin: 5 次.*出现最多: Kotlin \\(5次\\)'
      }
    ]
  },

  {
    day: 6,
    title: '函数式编程',
    description: '掌握 Lambda 表达式和高阶函数的使用',
    icon: 'λ',
    topics: ['Lambda 表达式', '高阶函数', '作用域函数', '函数引用'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [
      {
        id: 'lambda-basics',
        title: 'Lambda 表达式基础',
        description: '学习 Lambda 表达式的语法和使用，理解 it 参数和隐式返回',
        code: `fun main() {
    // Lambda 表达式基础语法
    // { 参数 -> 函数体 }

    // 1. 无参数的 Lambda
    val greet = { println("Hello, Kotlin!") }
    println("调用无参数 Lambda:")
    greet()

    println()

    // 2. 单参数 Lambda - 使用 it 作为隐式参数名
    val square = { it: Int -> it * it }
    println("square(5) = " + square(5))

    // 类型推断可以省略参数类型
    val double = { it: Int -> it * 2 }
    println("double(3) = " + double(3))

    println()

    // 3. 多参数 Lambda
    val add = { a: Int, b: Int -> a + b }
    println("add(10, 20) = " + add(10, 20))

    val greetPerson = { name: String, age: Int ->
        "我是 " + name + ", 今年 " + age + " 岁"
    }
    println("greetPerson: " + greetPerson("小明", 18))

    println()

    // 4. Lambda 作为函数参数
    val numbers = listOf(1, 2, 3, 4, 5)
    val doubled = numbers.map { it * 2 }
    println("原列表: " + numbers)
    println("翻倍后: " + doubled)

    // 使用 filter
    val evens = numbers.filter { it % 2 == 0 }
    println("偶数: " + evens)

    println()

    // 5. 链式调用
    val sumOfSquares = numbers
        .filter { it > 2 }
        .map { it * it }
        .reduce { acc, n -> acc + n }
    println("大于2的数的平方和: " + sumOfSquares)
}`,
        expectedOutput: '调用无参数 Lambda:\nHello, Kotlin!\n\nsquare(5) = 25\ndouble(3) = 6\n\nadd(10, 20) = 30\ngreetPerson: 我是小明, 今年 18 岁\n\n原列表: [1, 2, 3, 4, 5]\n翻倍后: [2, 4, 6, 8, 10]\n偶数: [2, 4]\n\n大于2的数的平方和: 50'
      },
      {
        id: 'higher-order-functions',
        title: '高阶函数',
        description: '定义接受函数作为参数或返回函数的函数',
        code: `fun main() {
    // 1. 接受函数作为参数的高阶函数
    fun calculate(x: Int, y: Int, operation: (Int, Int) -> Int): Int {
        return operation(x, y)
    }

    val sum = calculate(10, 5) { a, b -> a + b }
    val diff = calculate(10, 5) { a, b -> a - b }
    val product = calculate(10, 5) { a, b -> a * b }

    println("10 + 5 = " + sum)
    println("10 - 5 = " + diff)
    println("10 * 5 = " + product)

    println()

    // 2. 返回函数的高阶函数
    fun createMultiplier(factor: Int): (Int) -> Int {
        return { number -> number * factor }
    }

    val triple = createMultiplier(3)
    val quadruple = createMultiplier(4)

    println("triple(7) = " + triple(7))
    println("quadruple(7) = " + quadruple(7))

    println()

    // 3. 函数类型作为变量
    var predicate: (Int) -> Boolean = { it > 10 }
    println("predicate(15) = " + predicate(15))

    // 可以重新赋值
    predicate = { it % 2 == 0 }
    println("predicate(15) = " + predicate(15))

    println()

    // 4. 实用的高阶函数示例
    fun <T> List<T>.filterAndMap(
        predicate: (T) -> Boolean,
        mapper: (T) -> String
    ): List<String> {
        val result = mutableListOf<String>()
        for (item in this) {
            if (predicate(item)) {
                result.add(mapper(item))
            }
        }
        return result
    }

    val people = listOf("Alice", "Bob", "Charlie", "David")
    val shortNames = people.filterAndMap(
        predicate = { it.length <= 4 },
        mapper = { it.uppercase() }
    )
    println("短名字(大写): " + shortNames)

    println()

    // 5. 柯里化 (Currying) 示例
    fun add(a: Int): (Int) -> (Int) -> Int {
        return fun(b: Int): (Int) -> Int {
            return fun(c: Int): Int {
                return a + b + c
            }
        }
    }

    val add5 = add(5)
    val add5And3 = add5(3)
    val result = add5And3(2)
    println("柯里化: 5 + 3 + 2 = " + result)

    // 更简洁的写法
    fun addCurried(a: Int) = { b: Int -> { c: Int -> a + b + c } }
    println("简洁柯里化: " + addCurried(10)(20)(30))
}`,
        expectedOutput: '10 + 5 = 15\n10 - 5 = 5\n10 * 5 = 50\n\ntriple(7) = 21\nquadruple(7) = 28\n\npredicate(15) = true\npredicate(15) = false\n\n短名字(大写): [BOB]\n\n柯里化: 5 + 3 + 2 = 10\n简洁柯里化: 60'
      },
      {
        id: 'scope-functions',
        title: '作用域函数',
        description: '掌握 let、run、with、apply 和 also 的使用场景',
        code: `fun main() {
    // === Kotlin 作用域函数对比 ===

    // 1. let - 非空执行 + 返回值
    println("=== let ===")
    val name: String? = "Kotlin"
    name?.let {
        println("名字长度: " + it.length)
        println("转大写: " + it.uppercase())
    }

    // let 返回 lambda 的结果
    val result = "hello".let {
        it.uppercase()
    }
    println("let 返回: " + result)

    println()

    // 2. run - this 上下文 + 返回值
    println("=== run ===")
    val person = Person("张三", 25)
    val description = person.run {
        "姓名: " + name + ", 年龄: " + age + ", 可以投票: " + (age >= 18)
    }
    println(description)

    println()

    // 3. with - 与 run 类似，但不是扩展函数
    println("=== with ===")
    val config = DatabaseConfig()
    with(config) {
        host = "localhost"
        port = 5432
        timeout = 30
    }
    println("配置: " + config.host + ":" + config.port)

    // with 也返回结果
    val summary = with(person) {
        name + " is " + age + " years old"
    }
    println("with 摘要: " + summary)

    println()

    // 4. apply - this 上下文 + 返回对象本身
    println("=== apply ===")
    val user = User().apply {
        name = "李四"
        email = "lisi@example.com"
        age = 28
    }
    println("用户: " + user.name + " <" + user.email + ">")

    println()

    // 5. also - it 上下文 + 返回对象本身
    println("=== also ===")
    val numbers = mutableListOf(1, 2, 3)
    numbers.also {
        println("添加前: " + it)
    }.add(4)
    println("添加后: " + numbers)

    println()
    println("=== 使用场景对比 ===")

    // let: 可空类型处理
    val nullable: String? = "data"
    val processed = nullable?.let { transform(it) }
    println("let 结果: " + processed)

    // run: 对象配置并返回结果
    val status = person.run {
        if (age >= 18) "成年" else "未成年"
    }
    println("run 结果: " + status)

    // apply: 对象配置
    val file = FileConfig().apply {
        name = "config.txt"
        path = "/etc/app"
        readonly = true
    }
    println("apply 配置: " + file.name)

    // also: 副作用操作（日志、验证）
    val data = "important data".also {
        println("正在处理: " + it)
    }
    println("also 数据: " + data)
}

// 辅助类和函数
class Person(var name: String, var age: Int)

class User {
    var name: String = ""
    var email: String = ""
    var age: Int = 0
}

class DatabaseConfig {
    var host: String = ""
    var port: Int = 0
    var timeout: Int = 0
}

class FileConfig {
    var name: String = ""
    var path: String = ""
    var readonly: Boolean = false
}

fun transform(s: String): String = s.uppercase()`,
        expectedOutput: '=== let ===\n名字长度: 6\n转大写: KOTLIN\nlet 返回: HELLO\n\n=== run ===\n姓名: 张三, 年龄: 25, 可以投票: true\n\n=== with ===\n配置: localhost:5432\nwith 摘要: 张三 is 25 years old\n\n=== apply ===\n用户: 李四 <lisi@example.com>\n\n=== also ===\n添加前: [1, 2, 3]\n添加后: [1, 2, 3, 4]\n\n=== 使用场景对比 ===\n正在处理: data\nlet 结果: DATA\nrun 结果: 成年\napply 配置: config.txt\nalso 数据: important data'
      },
      {
        id: 'function-references',
        title: '函数引用与组合',
        description: '学习函数引用、函数组合和部分应用',
        code: `fun main() {
    // === 函数引用 ===

    // 1. 将函数作为值传递
    val numbers = listOf(1, 2, 3, 4, 5, 6)

    // 使用 :: 操作符引用函数
    val evenNumbers = numbers.filter(::isEven)
    println("偶数: " + evenNumbers)

    val oddNumbers = numbers.filter(::isOdd)
    println("奇数: " + oddNumbers)

    println()

    // 2. 引用成员函数
    val strings = listOf("kotlin", "java", "python", "rust")
    val uppercased = strings.map(String::uppercase)
    println("大写: " + uppercased)

    val lengths = strings.map(String::length)
    println("长度: " + lengths)

    println()

    // 3. 绑定成员函数引用
    val message = "Hello Kotlin"
    val lengthFunc = message::length
    println("长度: " + lengthFunc())

    println()

    // === 函数组合 ===

    // 4. 简单的函数组合
    fun <A, B, C> compose(f: (B) -> C, g: (A) -> B): (A) -> C {
        return { x -> f(g(x)) }
    }

    fun addThree(x: Int) = x + 3
    fun double(x: Int) = x * 2
    fun toString(x: Int) = "Number: " + x

    // 组合: 先加3，再翻倍，最后转字符串
    val combined = compose(toString, compose(double, addThree))
    println("组合函数(5): " + combined(5))  // (5 + 3) * 2 = 16 -> "Number: 16"

    println()

    // === 部分应用（固定部分参数） ===

    // 5. 使用高阶函数实现部分应用
    fun <A, B, C> partial(
        f: (A, B) -> C,
        a: A
    ): (B) -> C {
        return { b -> f(a, b) }
    }

    fun multiply(x: Int, y: Int) = x * y

    val triple = partial(multiply, 3)
    val quadruple = partial(multiply, 4)

    println("triple(5) = " + triple(5))
    println("quadruple(5) = " + quadruple(5))

    println()

    // === 实用示例 ===

    // 6. 验证器链
    data class Validator<T>(
        val predicate: (T) -> Boolean,
        val message: String
    )

    fun <T> createValidator(
        predicate: (T) -> Boolean,
        message: String
    ): Validator<T> = Validator(predicate, message)

    fun <T> validate(value: T, vararg validators: Validator<T>): Boolean {
        for (validator in validators) {
            if (!validator.predicate(value)) {
                println("验证失败: " + validator.message)
                return false
            }
        }
        println("验证通过!")
        return true
    }

    val emailValidator = createValidator<String>(
        predicate = { it.contains("@") },
        message = "邮箱必须包含 @"
    )

    val lengthValidator = createValidator<String>(
        predicate = { it.length >= 5 },
        message = "长度至少5个字符"
    )

    validate("test@test.com", emailValidator, lengthValidator)
    validate("bad", emailValidator, lengthValidator)
}

// 辅助函数
fun isEven(n: Int) = n % 2 == 0
fun isOdd(n: Int) = n % 2 != 0`,
        expectedOutput: '偶数: [2, 4, 6]\n奇数: [1, 3, 5]\n\n大写: [KOTLIN, JAVA, PYTHON, RUST]\n长度: [6, 4, 6, 4]\n\n长度: 12\n\n组合函数(5): Number: 16\n\ntriple(5) = 15\nquadruple(5) = 20\n\n验证通过!\n验证失败: 邮箱必须包含 @'
      }
    ],
    exercises: [
      {
        id: 'exercise-6-1',
        title: '自定义高阶函数',
        description: '编写一个高阶函数 repeat(n, action)，它重复执行 action 函数 n 次',
        template: `fun main() {
    // TODO: 实现 repeat 函数
    // repeat(3) { println("Hello!") }
    // 应该输出:
    // Hello!
    // Hello!
    // Hello!

    repeat(3) {
        println("Kotlin!")
    }

    repeat(2) {
        println("第 " + it + " 次")
    }
}

// 在这里实现 repeat 函数`,
        hint: '使用 for 循环或 (1..n).forEach { ... } 来实现',
        solution: `fun main() {
    repeat(3) {
        println("Kotlin!")
    }

    repeat(2) {
        println("第 " + it + " 次迭代")
    }
}

fun repeat(n: Int, action: (Int) -> Unit) {
    for (i in 1..n) {
        action(i)
    }
}`,
        validator: 'Kotlin!.*Kotlin!.*Kotlin!.*第 1 次.*第 2 次'
      },
      {
        id: 'exercise-6-2',
        title: '使用作用域函数',
        description: '使用 apply 函数创建并配置一个 Person 对象，然后使用 let 函数处理它',
        template: `fun main() {
    data class Person(var name: String, var age: Int, var city: String)

    // TODO: 使用 apply 创建并配置 Person
    // 然后使用 let 输出描述信息

    val person: Person? = null

    val result = person?.let {
        // 返回描述字符串
        ""
    }

    println(result)
}

// 将 person 设置为使用 apply 创建的对象`,
        hint: 'apply 返回对象本身，let 可以访问 it（非空的对象）',
        solution: `fun main() {
    data class Person(var name: String, var age: Int, var city: String)

    val person: Person? = Person("张三", 25, "北京").apply {
        age = 26
        city = "上海"
    }

    val result = person?.let {
        it.name + ", " + it.age + "岁, 来自" + it.city
    }

    println(result)
}`,
        validator: '张三, 26岁, 来自上海'
      },
      {
        id: 'exercise-6-3',
        title: '函数组合实现',
        description: '实现一个 andThen 函数，将两个函数串联起来：先执行第一个，再执行第二个',
        template: `fun main() {
    // TODO: 实现 andThen 组合函数
    // f.andThen(g) 应该返回一个新函数，先执行 f，再用 f 的结果调用 g

    fun addOne(x: Int) = x + 1
    fun doubleIt(x: Int) = x * 2
    fun toStr(x: Int) = "Result: " + x

    val addThenDouble = addOne.andThen(doubleIt)
    println("addThenDouble(5) = " + addThenDouble(5))  // 应该是 12 (5+1)*2

    val addThenStr = addOne.andThen(toStr)
    println("addThenStr(10) = " + addThenStr(10))  // 应该是 "Result: 11"
}

// 为函数类型添加扩展函数实现 andThen`,
        hint: '使用扩展函数为 (A) -> B 类型添加 andThen 方法',
        solution: `fun main() {
    fun addOne(x: Int) = x + 1
    fun doubleIt(x: Int) = x * 2
    fun toStr(x: Int) = "Result: " + x

    val addThenDouble = addOne.andThen(doubleIt)
    println("addThenDouble(5) = " + addThenDouble(5))

    val addThenStr = addOne.andThen(toStr)
    println("addThenStr(10) = " + addThenStr(10))
}

fun <A, B, C> ((A) -> B).andThen(g: (B) -> C): (A) -> C {
    return { x -> g(this(x)) }
}`,
        validator: 'addThenDouble\\(5\\) = 12.*addThenStr\\(10\\) = Result: 11'
      }
    ]
  },

  {
    day: 7,
    title: '空安全与异常处理',
    description: '学习 Kotlin 的空安全系统和异常处理机制',
    icon: '🛡️',
    topics: ['可空类型', '安全调用', 'Elvis 操作符', '异常处理'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [
      {
        id: 'null-safety-basics',
        title: '空安全基础',
        description: '理解 Kotlin 的可空类型系统和空安全机制',
        code: `fun main() {
    // === Kotlin 空安全系统 ===

    // 1. 非空类型（默认）
    val nonNull: String = "Hello"
    // nonNull = null  // 编译错误！不能将 null 赋值给非空类型

    println("非空变量: " + nonNull)

    println()

    // 2. 可空类型（使用 ? 声明）
    val nullable: String? = "World"
    println("可空变量: " + nullable)

    nullable = null  // 可以赋值 null
    println("设为 null 后: " + nullable)

    println()

    // 3. 安全调用操作符 ?.
    val name: String? = "Kotlin"
    val length = name?.length
    println("名字长度: " + length)

    val empty: String? = null
    val emptyLength = empty?.length
    println("null 的长度: " + emptyLength)

    println()

    // 4. 链式安全调用
    class User(val name: String, val address: Address?)
    class Address(val city: String, val street: Street?)
    class Street(val name: String)

    val user = User("张三", Address("北京", Street("长安街")))
    val streetName = user.address?.street?.name
    println("街道名: " + streetName)

    val userNoAddress = User("李四", null)
    val noStreet = userNoAddress.address?.street?.name
    println("无地址的街道: " + noStreet)

    println()

    // 5. let 与可空类型
    val message: String? = "Hello, Kotlin!"
    message?.let {
        println("消息不为空: " + it)
        println("消息长度: " + it.length)
    }

    val noMessage: String? = null
    noMessage?.let {
        println("这不会执行")
    } ?: println("消息为空")

    println()

    // 6. 非空断言 !! (谨慎使用)
    val definitelyNotNull: String? = "绝对不为空"
    val result = definitelyNotNull!!.uppercase()
    println("断言结果: " + result)

    // 危险操作示例
    val risky: String? = null
    try {
        val riskyResult = risky!!.length  // 抛出 NullPointerException
    } catch (e: Exception) {
        println("捕获异常: " + e.javaClass.simpleName)
    }

    println()

    // 7. 安全转换
    val obj: Any = "Kotlin"
    val str = obj as? String
    println("安全转换: " + str)

    val num: Any = 123
    val notStr = num as? String
    println("转换失败: " + notStr)  // null，不是异常

    println()

    // 8. 可空类型的集合操作
    val listWithNulls: List<Int?> = listOf(1, 2, null, 4, null, 5)
    val sum = listWithNulls.filterNotNull().sum()
    println("过滤 null 后求和: " + sum)

    val mapped = listWithNulls.map { it?.toString() ?: "空" }
    println("替换 null 后: " + mapped)
}`,
        expectedOutput: '非空变量: Hello\n\n可空变量: World\n设为 null 后: null\n\n名字长度: 6\nnull 的长度: null\n\n街道名: 长安街\n无地址的街道: null\n\n消息不为空: Hello, Kotlin!\n消息长度: 15\n消息为空\n\n断言结果: HELLO, KOTLIN!\n捕获异常: NullPointerException\n\n安全转换: Kotlin\n转换失败: null\n\n过滤 null 后求和: 12\n替换 null 后: [1, 2, 空, 4, 空, 5]'
      },
      {
        id: 'elvis-operator',
        title: 'Elvis 操作符',
        description: '使用 ?: 运算符提供默认值',
        code: `fun main() {
    // === Elvis 操作符 ?:

    // 1. 基本用法
    val name: String? = null
    val displayName = name ?: "匿名用户"
    println("显示名称: " + displayName)

    val realName: String? = "张三"
    val realDisplayName = realName ?: "匿名用户"
    println("真实名称: " + realDisplayName)

    println()

    // 2. 与函数返回值结合
    fun getUserName(id: Int): String? {
        val users = mapOf(1 to "Alice", 2 to "Bob")
        return users[id]
    }

    val user1 = getUserName(1) ?: "未知用户"
    val user2 = getUserName(3) ?: "未知用户"
    println("用户1: " + user1)
    println("用户2: " + user2)

    println()

    // 3. Elvis 操作符的右侧只在左侧为 null 时执行
    var counter = 0
    fun provideDefault(): String {
        counter++
        return "默认值 " + counter
    }

    val a: String? = "有值"
    val result1 = a ?: provideDefault()
    println("结果1: " + result1 + ", 计数器: " + counter)

    val b: String? = null
    val result2 = b ?: provideDefault()
    println("结果2: " + result2 + ", 计数器: " + counter)

    println()

    // 4. throw 也可以作为 Elvis 的右侧
    fun getLengthOrDefault(str: String?): Int {
        return str?.length ?: throw IllegalArgumentException("字符串不能为空")
    }

    try {
        println("长度: " + getLengthOrDefault("Hello"))
        println("长度: " + getLengthOrDefault(null))
    } catch (e: IllegalArgumentException) {
        println("捕获异常: " + e.message)
    }

    println()

    // 5. return 作为 Elvis 的右侧
    fun processName(name: String?): String {
        val n = name ?: return "未提供名称"
        return "处理: " + n
    }

    println(processName("Kotlin"))
    println(processName(null))

    println()

    // 6. 实际应用示例
    data class Config(val timeout: Int?, val retries: Int?)

    fun createConfig(userTimeout: Int?): Config {
        val timeout = userTimeout ?: 30
        val retries = null
        return Config(timeout, retries)
    }

    val config = createConfig(null)
    println("超时: " + config.timeout)

    val customConfig = createConfig(60)
    println("自定义超时: " + customConfig.timeout)

    println()

    // 7. 链式 Elvis
    val first: String? = null
    val second: String? = null
    val third: String? = "最终值"

    val value = first ?: second ?: third ?: "都没有"
    println("链式结果: " + value)

    // 复杂示例
    fun getUser(): String? = null
    fun getDefaultUser(): String? = null
    fun getSystemUser() = "system"

    val userName = getUser() ?: getDefaultUser() ?: getSystemUser()
    println("用户名: " + userName)
}`,
        expectedOutput: '显示名称: 匿名用户\n真实名称: 张三\n\n用户1: Alice\n用户2: 未知用户\n\n结果1: 有值, 计数器: 0\n结果2: 默认值 1, 计数器: 1\n\n长度: 5\n捕获异常: 字符串不能为空\n\n处理: Kotlin\n未提供名称\n\n超时: 30\n自定义超时: 60\n\n链式结果: 最终值\n用户名: system'
      },
      {
        id: 'lateinit-and-lazy',
        title: '延迟初始化',
        description: '学习 lateinit 和 lazy 委托的使用',
        code: `fun main() {
    // === 延迟初始化 ===

    // 1. lateinit - 必须在访问前初始化
    println("=== lateinit ===")
    val user = UserRepository()
    println("用户名(未初始化前无法访问)")
    user.init("admin@example.com", "password123")
    println("用户邮箱: " + user.email)

    println()

    // 2. lazy - 第一次访问时初始化
    println("=== lazy ===")
    val expensiveObject = HeavyObject()
    println("对象创建（但 lazy 属性未初始化）")

    println("第一次访问计算值: " + expensiveObject.computedValue)
    println("第二次访问计算值: " + expensiveObject.computedValue)

    println()

    // 3. lazy 是线程安全的（默认）
    println("=== lazy 线程安全 ===")
    val lazyValue by lazy {
        println("初始化懒加载值!")
        "初始化完成"
    }
    println("创建完成（未初始化）")
    println(lazyValue)
    println(lazyValue)

    println()

    // 4. lateinit 与可空类型的对比
    println("=== 使用场景对比 ===")

    // lateinit: 适用于依赖注入、单元测试设置
    class Service {
        lateinit var repository: DatabaseRepository
            fun initialize() {
            repository = DatabaseRepository()
        }
        fun getData() = repository.query()
    }

    val service = Service()
    // println(service.repository)  // 错误：未初始化
    service.initialize()
    println("服务数据: " + service.getData())

    // lazy: 适用于计算开销大的值
    class CachedCalculator {
        val pi: Double by lazy {
            println("计算 PI...")
            355.0 / 113.0  // 祖率
        }

        fun computeArea(radius: Double): Double {
            return pi * radius * radius
        }
    }

    val calc = CachedCalculator()
    println("计算器创建")
    println("面积: " + calc.computeArea(10.0))
    println("再次计算: " + calc.computeArea(5.0))

    println()

    // 5. 检查 lateinit 是否初始化
    lateinit var checkedVar: String
    // println(checkedVar)  // 会抛出异常

    // 使用 ::xxx.isInitialized 检查
    println("检查变量是否初始化: " + this::checkedVar.isInitialized)

    checkedVar = "现在已初始化"
    println("再次检查: " + this::checkedVar.isInitialized)
    println("值: " + checkedVar)
}

// 辅助类
class UserRepository {
    lateinit var email: String
    private lateinit var password: String

    fun init(email: String, password: String) {
        this.email = email
        this.password = password
    }
}

class HeavyObject {
    val computedValue by lazy {
        println("  执行复杂计算...")
        Thread.sleep(100)  // 模拟耗时操作
        "计算结果: 42"
    }
}

class DatabaseRepository {
    fun query() = "查询结果数据"
}

// 顶层属性使用 lazy 的示例（在顶层）
val config by lazy {
    println("加载配置文件...")
    mapOf("host" to "localhost", "port" to "8080")
}`,
        expectedOutput: '=== lateinit ===\n用户名(未初始化前无法访问)\n用户邮箱: admin@example.com\n\n=== lazy ===\n对象创建（但 lazy 属性未初始化）\n  执行复杂计算...\n第一次访问计算值: 计算结果: 42\n第二次访问计算值: 计算结果: 42\n\n=== lazy 线程安全 ===\n创建完成（未初始化）\n初始化懒加载值!\n初始化完成\n初始化完成\n\n=== 使用场景对比 ===\n服务数据: 查询结果数据\n计算器创建\n计算 PI...\n面积: 314.0\n再次计算: 78.5\n\n检查变量是否初始化: false\n再次检查: true\n值: 现在已初始化'
      },
      {
        id: 'exception-handling',
        title: '异常处理',
        description: '学习 Kotlin 的 try-catch、throw 和自定义异常',
        code: `fun main() {
    // === 异常处理 ===

    // 1. 基本 try-catch
    println("=== 基本 try-catch ===")
    try {
        val result = divide(10, 2)
        println("10 / 2 = " + result)
    } catch (e: Exception) {
        println("捕获异常: " + e.message)
    }

    try {
        val result = divide(10, 0)
        println("10 / 0 = " + result)
    } catch (e: ArithmeticException) {
        println("捕获算术异常: " + e.message)
    }

    println()

    // 2. try-catch-finally
    println("=== try-catch-finally ===")
    val resource = Resource()
    try {
        resource.use()
        throw Exception("操作失败")
    } catch (e: Exception) {
        println("捕获: " + e.message)
    } finally {
        resource.cleanup()
    }

    println()

    // 3. try 作为表达式
    println("=== try 作为表达式 ===")
    val result = try {
        divide(10, 5)
    } catch (e: ArithmeticException) {
        0
    }
    println("结果: " + result)

    val result2 = try {
        divide(10, 0)
    } catch (e: ArithmeticException) {
        println("  除零错误，返回默认值")
        0
    }
    println("结果2: " + result2)

    println()

    // 4. 多个 catch 块
    println("=== 多个 catch ===")
    handleExceptions()

    println()

    // 5. 抛出异常
    println("=== 抛出异常 ===")
    try {
        validateAge(25)
        validateAge(-5)
    } catch (e: IllegalArgumentException) {
        println("捕获非法参数: " + e.message)
    }

    println()

    // 6. 自定义异常
    println("=== 自定义异常 ===")
    try {
        withdraw(1000, 1500)
    } catch (e: InsufficientFundsException) {
        println("捕获余额不足: " + e.message)
        println("当前余额: " + e.currentBalance)
        println("尝试取出: " + e.attemptedAmount)
    }

    println()

    // 7. Nothing 类型
    println("=== Nothing 类型 ===")
    println("正常执行")
    failFast("出错了！")
    println("这行不会执行")

    println("程序继续")
}

// 辅助函数和类
fun divide(a: Int, b: Int): Int {
    if (b == 0) {
        throw ArithmeticException("除数不能为零")
    }
    return a / b
}

class Resource {
    fun use() {
        println("使用资源")
    }

    fun cleanup() {
        println("清理资源")
    }
}

fun handleExceptions() {
    val operations = listOf(
        { divide(10, 2) },
        { divide(10, 0) },
        { throw NumberFormatException("格式错误") }
    )

    for ((index, op) in operations.withIndex()) {
        try {
            val result = op()
            println("操作 " + (index + 1) + " 结果: " + result)
        } catch (e: ArithmeticException) {
            println("操作 " + (index + 1) + " 算术异常: " + e.message)
        } catch (e: Exception) {
            println("操作 " + (index + 1) + " 通用异常: " + e.message)
        }
    }
}

fun validateAge(age: Int) {
    require(age >= 0) { "年龄不能为负数: " + age }
    require(age <= 150) { "年龄不合理的: " + age }
    println("年龄 " + age + " 有效")
}

// 自定义异常
class InsufficientFundsException(
    val currentBalance: Double,
    val attemptedAmount: Double
) : Exception("余额不足！当前: " + currentBalance + ", 尝试: " + attemptedAmount)

fun withdraw(balance: Double, amount: Double) {
    if (amount > balance) {
        throw InsufficientFundsException(balance, amount)
    }
    println("取款成功: " + amount)
}

fun failFast(message: String): Nothing {
    throw RuntimeException(message)
}`,
        expectedOutput: '=== 基本 try-catch ===\n10 / 2 = 5\n捕获算术异常: 除数不能为零\n\n=== try-catch-finally ===\n使用资源\n捕获: 操作失败\n清理资源\n\n=== try 作为表达式 ===\n结果: 2\n  除零错误，返回默认值\n结果2: 0\n\n=== 多个 catch ===\n操作 1 结果: 5\n操作 2 算术异常: 除数不能为零\n操作 3 通用异常: 格式错误\n\n=== 抛出异常 ===\n年龄 25 有效\n捕获非法参数: 年龄不能为负数: -5\n\n=== 自定义异常 ===\n捕获余额不足: 余额不足！当前: 1000.0, 尝试: 1500.0\n当前余额: 1000.0\n尝试取出: 1500.0\n\n=== Nothing 类型 ===\n正常执行\n程序继续'
      }
    ],
    exercises: [
      {
        id: 'exercise-7-1',
        title: '空安全链式调用',
        description: '使用安全调用操作符获取嵌套对象的属性值',
        template: `fun main() {
    class Company(val name: String, val ceo: Employee?)
    class Employee(val name: String, val manager: Employee?)

    val company = Company("TechCorp", Employee("张三", null))

    // TODO: 使用安全调用获取 CEO 的经理的名字
    // 如果 CEO 没有经理，返回 "无上级"

    val managerName: String = ""  // 实现这里

    println(managerName)
}`,
        hint: '使用 ?. 进行安全调用，使用 ?: 提供默认值',
        solution: `fun main() {
    class Company(val name: String, val ceo: Employee?)
    class Employee(val name: String, val manager: Employee?)

    val company = Company("TechCorp", Employee("张三", null))

    val managerName: String = company.ceo?.manager?.name ?: "无上级"

    println(managerName)
}`,
        validator: '无上级'
      },
      {
        id: 'exercise-7-2',
        title: '自定义异常',
        description: '创建一个自定义异常 InvalidEmailException，并在验证函数中使用',
        template: `fun main() {
    // TODO: 创建 InvalidEmailException 类
    // 它应该是一个继承自 Exception 的类

    fun validateEmail(email: String) {
        // 如果 email 不包含 @，抛出 InvalidEmailException
        // 否则打印 "邮箱有效: $email"
    }

    try {
        validateEmail("invalid-email")
    } catch (e: InvalidEmailException) {
        println("错误: " + e.message)
    }

    validateEmail("test@example.com")
}

// 在这里定义 InvalidEmailException 类`,
        hint: 'class InvalidEmailException(message: String) : Exception(message)',
        solution: `fun main() {
    class InvalidEmailException(message: String) : Exception(message)

    fun validateEmail(email: String) {
        if (!email.contains("@")) {
            throw InvalidEmailException("邮箱格式无效: " + email)
        }
        println("邮箱有效: " + email)
    }

    try {
        validateEmail("invalid-email")
    } catch (e: InvalidEmailException) {
        println("错误: " + e.message)
    }

    validateEmail("test@example.com")
}`,
        validator: '错误: 邮箱格式无效: invalid-email.*邮箱有效: test@example.com'
      },
      {
        id: 'exercise-7-3',
        title: '安全的除法函数',
        description: '实现一个安全的除法函数，当除数为零时返回 null',
        template: `fun main() {
    // TODO: 实现 safeDivide 函数
    // 当除数为零时返回 null，否则返回除法结果

    println(safeDivide(10, 2))  // 5
    println(safeDivide(10, 0))  // null
    println(safeDivide(0, 5))   // 0

    // 使用 Elvis 操作符提供默认值
    val result = safeDivide(15, 3) ?: 0
    println("结果: " + result)
}

// 在这里实现 safeDivide 函数`,
        hint: '使用 try-catch 或者检查除数是否为零',
        solution: `fun main() {
    println(safeDivide(10, 2))
    println(safeDivide(10, 0))
    println(safeDivide(0, 5))

    val result = safeDivide(15, 3) ?: 0
    println("结果: " + result)
}

fun safeDivide(a: Int, b: Int): Double? {
    if (b == 0) return null
    return a.toDouble() / b
}`,
        validator: '5.0.*null.*0.0.*结果: 5.0'
      }
    ]
  },

  {
    day: 8,
    title: '扩展函数与属性',
    description: '学习如何为现有类添加新功能',
    icon: '➕',
    topics: ['扩展函数', '扩展属性', '扩展作用域', 'DSL 入门'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [
      {
        id: 'extension-functions',
        title: '扩展函数基础',
        description: '学习如何为现有类添加扩展函数',
        code: `fun main() {
    // === 扩展函数 ===

    // 1. 基本扩展函数
    fun String.removeSpaces(): String {
        return this.replace(" ", "")
    }

    val text = "Hello World Kotlin"
    println("原文: " + text)
    println("去空格: " + text.removeSpaces())

    println()

    // 2. 扩展函数的 this 引用
    fun Int.isEven(): Boolean = this % 2 == 0
    fun Int.isOdd(): Boolean = !this.isEven()

    println("4 是偶数: " + 4.isEven())
    println("7 是奇数: " + 7.isOdd())

    println()

    // 3. 泛型扩展函数
    fun <T> List<T>.myJoin(separator: String = ", "): String {
        val result = StringBuilder()
        for ((index, item) in this.withIndex()) {
            if (index > 0) result.append(separator)
            result.append(item.toString())
        }
        return result.toString()
    }

    val numbers = listOf(1, 2, 3, 4, 5)
    println("数字: " + numbers.myJoin(" | "))

    val words = listOf("Kotlin", "Java", "Python")
    println("语言: " + words.myJoin())

    println()

    // 4. 链式调用
    fun String.capitalizeWords(): String {
        return this.split(" ")
            .map { it.lowercase().capitalize() }
            .joinToString(" ")
    }

    fun String.exclaim(): String = this + "!"

    val sentence = "hello kotlin world"
    val result = sentence.capitalizeWords().exclaim()
    println("结果: " + result)

    println()

    // 5. 扩展函数 vs 成员函数
    // 如果成员函数和扩展函数签名相同，成员函数优先
    class MyClass {
        fun printInfo() = println("成员函数")
    }

    fun MyClass.printInfo() = println("扩展函数")

    val obj = MyClass()
    obj.printInfo()  // 输出 "成员函数"

    println()

    // 6. 可空类型的扩展
    fun String?.isValid(): Boolean {
        return this != null && this.isNotEmpty()
    }

    val valid: String? = "hello"
    val empty: String? = ""
    val nullStr: String? = null

    println("'hello' 有效: " + valid.isValid())
    println("'' 有效: " + empty.isValid())
    println("null 有效: " + nullStr.isValid())

    println()

    // 7. 扩展函数的实际应用
    fun String.isEmail(): Boolean {
        return this.contains("@") && this.contains(".")
    }

    fun String.maskEmail(): String {
        if (!this.isEmail()) return this
        val at = this.indexOf("@")
        val name = this.substring(0, at)
        val domain = this.substring(at)
        val maskedName = if (name.length > 2) {
            name[0] + "*".repeat(name.length - 2) + name[name.length - 1]
        } else {
            "***"
        }
        return maskedName + domain
    }

    val email = "user@example.com"
    println("邮箱: " + email)
    println("脱敏: " + email.maskEmail())

    println()

    // 8. 对不可变类的"修改"
    // String 是不可变的，但通过扩展可以创建"修改"后的版本
    fun String.reverse(): String {
        return this.reversed()
    }

    fun String.repeatString(times: Int): String {
        return this.repeat(times)
    }

    println("abc 反转: " + "abc".reverse())
    println("ha 重复: " + "ha ".repeatString(3))
}`,
        expectedOutput: '原文: Hello World Kotlin\n去空格: HelloWorldKotlin\n\n4 是偶数: true\n7 是奇数: true\n\n数字: 1 | 2 | 3 | 4 | 5\n语言: Kotlin, Java, Python\n\n结果: Hello Kotlin World!\n\n成员函数\n\n\'hello\' 有效: true\n\'\' 有效: false\nnull 有效: false\n\n邮箱: user@example.com\n脱敏: u***r@example.com\n\nabc 反转: cba\nha 重复: ha ha ha '
      },
      {
        id: 'extension-properties',
        title: '扩展属性',
        description: '学习如何为现有类添加扩展属性',
        code: `fun main() {
    // === 扩展属性 ===

    // 1. 基本扩展属性（不能存储状态，只能通过计算）
    val String.asInteger: Int
        get() = this.toIntOrNull() ?: 0

    println("123 -> " + "123".asInteger)
    println("abc -> " + "abc".asInteger)

    println()

    // 2. 扩展属性用于便捷访问
    val String.isNumeric: Boolean
        get() = this.matches(Regex("\\d+"))

    val String.isEmptyOrBlank: Boolean
        get() = this.isEmpty() || this.isBlank()

    println("12345 是数字: " + "12345".isNumeric)
    println("abc123 是数字: " + "abc123".isNumeric)
    println("空串为空或空格: " + "".isEmptyOrBlank)
    println("   空格为空或空格: " + "   ".isEmptyOrBlank)

    println()

    // 3. 对 Pair 和 Map 的扩展
    val <K, V> Map<K, V>.pairsString: String
        get() = this.entries.joinToString(", ") { "[" + it.key + "=" + it.value + "]" }

    val config = mapOf("host" to "localhost", "port" to 8080, "debug" to true)
    println("配置: " + config.pairsString)

    println()

    // 4. 集合的扩展属性
    val <T> List<T>.firstHalf: List<T>
        get() = this.take(this.size / 2)

    val <T> List<T>.secondHalf: List<T>
        get() = this.drop(this.size / 2)

    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8)
    println("完整: " + numbers)
    println("前半: " + numbers.firstHalf)
    println("后半: " + numbers.secondHalf)

    println()

    // 5. var 扩展属性（需要有 setter）
    var StringBuilder.content: String
        get() = this.toString()
        set(value) {
            this.setLength(0)
            this.append(value)
        }

    val sb = StringBuilder()
    sb.content = "Hello"
    println("内容: " + sb.content)
    sb.content = "World"
    println("新内容: " + sb.content)

    println()

    // 6. 类型的扩展属性
    val <T : Number> T.isPositive: Boolean
        get() = this.toDouble() > 0

    val <T : Number> T.isNegative: Boolean
        get() = this.toDouble() < 0

    println("10 正数: " + 10.isPositive)
    println("-5 负数: " + (-5).isNegative)
    println("3.14 正数: " + 3.14.isPositive)

    println()

    // 7. 实用扩展属性示例
    val String.initials: String
        get() = this.split(" ")
            .filter { it.isNotEmpty() }
            .map { it[0].uppercase() }
            .joinToString("")

    val String.wordCount: Int
        get() = this.split(Regex("\\s+")).filter { it.isNotEmpty() }.size

    val name = "John Fitzgerald Kennedy"
    println("姓名: " + name)
    println("首字母: " + name.initials)

    val paragraph = "This is a sample paragraph with several words."
    println("单词数: " + paragraph.wordCount)

    println()

    // 8. 日期相关的扩展属性
    // 模拟日期处理
    data class DateTime(val timestamp: Long) {
        fun format(): String = "T+" + timestamp
    }

    val DateTime.isToday: Boolean
        get() = this.timestamp < 86400000

    val DateTime.inSeconds: Int
        get() = (this.timestamp / 1000).toInt()

    val now = DateTime(3600000)  // 1 hour
    println("是今天: " + now.isToday)
    println("秒数: " + now.inSeconds)
}`,
        expectedOutput: '123 -> 123\nabc -> 0\n\n12345 是数字: true\nabc123 是数字: false\n空串为空或空格: true\n   空格为空或空格: true\n\n配置: [host=localhost], [port=8080], [debug=true]\n\n完整: [1, 2, 3, 4, 5, 6, 7, 8]\n前半: [1, 2, 3, 4]\n后半: [5, 6, 7, 8]\n\n内容: Hello\n新内容: World\n\n10 正数: true\n-5 负数: true\n3.14 正数: true\n\n姓名: John Fitzgerald Kennedy\n首字母: JFK\n单词数: 8\n\n是今天: true\n秒数: 3600'
      },
      {
        id: 'infix-and-dsl',
        title: '中缀函数与 DSL 入门',
        description: '学习中缀函数和如何构建简单的 DSL',
        code: `fun main() {
    // === 中缀函数 ===

    // 1. 基本中缀函数
    infix fun Int.times(str: String): String {
        return str.repeat(this)
    }

    val result = 3 times "Hello "
    println("3 times 'Hello ': " + result)

    println()

    // 2. 中缀函数用于区间
    val range = 1 until 10
    println("1 until 10: " + range.toList())

    println()

    // 3. 自定义中缀函数实现 DSL
    class Book {
        private var pages = mutableListOf<String>()

        fun addPage(content: String) {
            pages.add(content)
        }

        infix fun with(content: String) {
            pages.add(content)
        }

        fun show() {
            for ((i, page) in pages.withIndex()) {
                println("第 " + (i + 1) + " 页: " + page)
            }
        }
    }

    val book = Book()
    book with "第一章：Kotlin 入门"
    book with "第二章：函数式编程"
    book with "第三章：协程基础"
    book.show()

    println()

    // 4. 构建简单的 HTML DSL
    class Tag(val name: String) {
        private val children = mutableListOf<Any>()
        private val attributes = mutableMapOf<String, String>()

        operator fun String.unaryPlus() {
            children.add(this)
        }

        operator fun Tag.invoke(block: Tag.() -> Unit) {
            children.add(this.apply(block))
        }

        fun setAttr(key: String, value: String) {
            attributes[key] = value
        }

        override fun toString(): String {
            val attrs = if (attributes.isNotEmpty()) {
                " " + attributes.map { "" + it.key + "=\"" + it.value + "\"" }.joinToString(" ")
            } else ""
            val content = children.joinToString("")
            return "<" + name + attrs + ">" + content + "</" + name + ">"
        }
    }

    fun html(block: Tag.() -> Unit): Tag {
        return Tag("html").apply(block)
    }

    fun Tag.head(block: Tag.() -> Unit) = Tag("head").apply(block).also { children.add(it) }
    fun Tag.body(block: Tag.() -> Unit) = Tag("body").apply(block).also { children.add(it) }
    fun Tag.title(text: String) = Tag("title").also { +text; children.add(it) }
    fun Tag.h1(text: String) = Tag("h1").also { +text; children.add(it) }
    fun Tag.p(text: String) = Tag("p").also { +text; children.add(it) }

    val page = html {
        head {
            title { +"我的网站" }
        }
        body {
            h1 { +"欢迎来到 Kotlin" }
            p { +"这是一个简单的 HTML DSL 示例" }
        }
    }

    println("HTML:")
    println(page)

    println()

    // 5. 构建配置 DSL
    class ConfigBuilder {
        var host: String = "localhost"
        var port: Int = 8080
        var debug: Boolean = false

        fun database(block: DatabaseConfig.() -> Unit) {
            val db = DatabaseConfig()
            db.apply(block)
            println("数据库配置: " + db)
        }

        override fun toString(): String {
            return "Config(host=" + host + ", port=" + port + ", debug=" + debug + ")"
        }
    }

    class DatabaseConfig {
        var url: String = ""
        var username: String = ""
        var password: String = ""

        override fun toString(): String {
            return "DB(url=" + url + ", user=" + username + ")"
        }
    }

    fun config(block: ConfigBuilder.() -> Unit): ConfigBuilder {
        return ConfigBuilder().apply(block)
    }

    val appConfig = config {
        host = "example.com"
        port = 443
        debug = true

        database {
            url = "jdbc:mysql://localhost:3306/mydb"
            username = "admin"
            password = "secret"
        }
    }

    println("应用配置: " + appConfig)

    println()

    // 6. 中缀函数创建区间
    infix fun Int.rangeTo(end: Int): IntRange = this..end

    val r = 1 rangeTo 5
    println("区间: " + r.toList())

    println()

    // 7. Pair 中缀创建
    infix fun <A, B> A.with(that: B): Pair<A, B> = Pair(this, that)

    val name = "Kotlin" with "Language"
    println("Pair: " + name)

    val map = mapOf(
        "key1" with "value1",
        "key2" with "value2"
    )
    println("Map: " + map)
}`,
        expectedOutput: '3 times \'Hello \': Hello Hello Hello \n\n1 until 10: [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n第 1 页: 第一章：Kotlin 入门\n第 2 页: 第二章：函数式编程\n第 3 页: 第三章：协程基础\n\nHTML:\n<html><head><title>我的网站</title></head><body><h1>欢迎来到 Kotlin</h1><p>这是一个简单的 HTML DSL 示例</p></body></html>\n\n数据库配置: DB(url=jdbc:mysql://localhost:3306/mydb, user=admin)\n应用配置: Config(host=example.com, port=443, debug=true)\n\n区间: [1, 2, 3, 4, 5]\n\nPair: (Kotlin, Language)\nMap: {key1=value1, key2=value2}'
      },
      {
        id: 'practical-extensions',
        title: '实用扩展函数集合',
        description: '一组常用的扩展函数示例',
        code: `fun main() {
    // === 实用扩展函数集合 ===

    // 1. 字符串扩展
    fun String.truncate(maxLength: Int): String {
        return if (this.length <= maxLength) this
        else this.substring(0, maxLength) + "..."
    }

    val longText = "这是一段非常非常非常长的文本"
    println("原文: " + longText)
    println("截断(10): " + longText.truncate(10))

    println()

    // 2. 集合扩展 - 分组
    fun <T, K> List<T>.groupByDistinct(keySelector: (T) -> K): Map<K, List<T>> {
        val result = mutableMapOf<K, MutableList<T>>()
        for (item in this) {
            val key = keySelector(item)
            result.getOrPut(key) { mutableListOf() }.add(item)
        }
        return result
    }

    data class Person(val name: String, val age: Int)

    val people = listOf(
        Person("Alice", 25),
        Person("Bob", 30),
        Person("Charlie", 25),
        Person("David", 30)
    )

    val grouped = people.groupByDistinct { it.age }
    println("按年龄分组:")
    for ((age, persons) in grouped) {
        println("  " + age + "岁: " + persons.map { it.name })
    }

    println()

    // 3. 可空类型扩展
    fun <T> T?.ifNull(default: T): T = this ?: default
    fun <T> T?.ifNull(block: () -> T): T = this ?: block()

    val nullable: String? = null
    println("默认值: " + nullable.ifNull("默认值"))

    val lazyDefault: String? = null
    println("懒加载默认: " + lazyDefault.ifNull { println("  计算中..."); "懒加载" })

    println()

    // 4. 时间扩展（模拟）
    fun Int.secondsToMillis(): Long = this * 1000L
    fun Int.minutesToMillis(): Long = this * 60 * 1000L
    fun Int.hoursToMillis(): Long = this * 60 * 60 * 1000L

    println("30秒 = " + 30.secondsToMillis() + " 毫秒")
    println("5分钟 = " + 5.minutesToMillis() + " 毫秒")
    println("2小时 = " + 2.hoursToMillis() + " 毫秒")

    println()

    // 5. 数值扩展
    fun Int.isBetween(a: Int, b: Int): Boolean {
        val min = minOf(a, b)
        val max = maxOf(a, b)
        return this in min..max
    }

    println("5 在 1-10 之间: " + 5.isBetween(1, 10))
    println("15 在 1-10 之间: " + 15.isBetween(1, 10))

    println()

    // 6. 集合扩展 - 随机元素
    fun <T> List<T>.randomOrNull(): T? = if (this.isEmpty()) null else this[(Math.random() * this.size).toInt()]

    val numbers = listOf(1, 2, 3, 4, 5)
    println("随机数: " + numbers.randomOrNull())
    println("空列表: " + emptyList<Int>().randomOrNull())

    println()

    // 7. 范围扩展
    fun IntProgression.containsAny(numbers: List<Int>): Boolean {
        return numbers.any { it in this }
    }

    val range = 1..10
    println("1..10 包含 5: " + (5 in range))
    println("1..10 包含 15: " + (15 in range))
    println("1..10 包含列表中的任意: " + range.containsAny(listOf(15, 20, 5)))

    println()

    // 8. 可执行操作扩展
    fun <T> T.alsoIf(condition: Boolean, block: T.() -> Unit): T {
        return if (condition) {
            this.apply(block)
        } else {
            this
        }
    }

    val config = mapOf("debug" to true)
    val value = "测试"
        .alsoIf(config["debug"] as Boolean? == true) {
            println("  调试模式: " + this)
        }

    println()

    // 9. 重试扩展
    fun <T> retry(times: Int, delay: Long = 0, block: () -> T): T? {
        var lastException: Exception? = null
        repeat(times) { i ->
            try {
                return block()
            } catch (e: Exception) {
                lastException = e
                println("  尝试 " + (i + 1) + " 失败: " + e.message)
            }
        }
        return null
    }

    var attempt = 0
    val result = retry(3) {
        attempt++
        if (attempt < 3) throw Exception("还没准备好")
        "成功!"
    }
    println("重试结果: " + result)

    println()

    // 10. 缓存扩展（简化版）
    fun <T, R> ((T) -> R).memoize(): (T) -> R {
        val cache = mutableMapOf<T, R>()
        return { input ->
            cache.getOrPut(input) { this(input) }
        }
    }

    var fibCallCount = 0
    fun fibonacci(n: Int): Int {
        fibCallCount++
        return if (n <= 1) n else fibonacci(n - 1) + fibonacci(n - 2)
    }

    // 测试不使用缓存
    fibCallCount = 0
    fibonacci(10)
    println("Fibonacci(10) 调用次数: " + fibCallCount)
}`,
        expectedOutput: '原文: 这是一段非常非常非常长的文本\n截断(10): 这是一段非常非...\n\n按年龄分组:\n  25岁: [Alice, Charlie]\n  30岁: [Bob, David]\n\n默认值: 默认值\n  计算中...\n懒加载默认: 懒加载\n\n30秒 = 30000 毫秒\n5分钟 = 300000 毫秒\n2小时 = 7200000 毫秒\n\n5 在 1-10 之间: true\n15 在 1-10 之间: false\n\n随机数: [1-5之间的随机数]\n空列表: null\n\n1..10 包含 5: true\n1..10 包含 15: false\n1..10 包含列表中的任意: true\n\n  调试模式: 测试\n\n  尝试 1 失败: 还没准备好\n  尝试 2 失败: 还没准备好\n重试结果: 成功!\n\nFibonacci(10) 调用次数: 177'
      }
    ],
    exercises: [
      {
        id: 'exercise-8-1',
        title: '字符串扩展函数',
        description: '为 String 类添加一个扩展函数 isPalindrome()，判断字符串是否为回文',
        template: `fun main() {
    // TODO: 实现 isPalindrome 扩展函数
    // 忽略大小写和非字母字符

    println("racecar 是否回文: " + "racecar".isPalindrome())
    println("A man, a plan, a canal: Panama 是否回文: " + "A man, a plan, a canal: Panama".isPalindrome())
    println("hello 是否回文: " + "hello".isPalindrome())
}

// 在这里实现 isPalindrome 扩展函数`,
        hint: '先清理字符串（移除非字母，转小写），然后比较正反',
        solution: `fun main() {
    println("racecar 是否回文: " + "racecar".isPalindrome())
    println("A man, a plan, a canal: Panama 是否回文: " + "A man, a plan, a canal: Panama".isPalindrome())
    println("hello 是否回文: " + "hello".isPalindrome())
}

fun String.isPalindrome(): Boolean {
    val cleaned = this.lowercase().filter { it.isLetter() }
    return cleaned == cleaned.reversed()
}`,
        validator: 'racecar 是否回文: true.*Panama 是否回文: true.*hello 是否回文: false'
      },
      {
        id: 'exercise-8-2',
        title: '扩展属性',
        description: '为 Int 类型添加一个扩展属性 isPrime，判断是否为质数',
        template: `fun main() {
    // TODO: 为 Int 添加 isPrime 扩展属性

    println("2 是质数: " + 2.isPrime)
    println("7 是质数: " + 7.isPrime)
    println("12 是质数: " + 12.isPrime)
    println("17 是质数: " + 17.isPrime)
}

// 在这里实现 isPrime 扩展属性`,
        hint: '质数是大于1且只能被1和自身整除的数',
        solution: `fun main() {
    println("2 是质数: " + 2.isPrime)
    println("7 是质数: " + 7.isPrime)
    println("12 是质数: " + 12.isPrime)
    println("17 是质数: " + 17.isPrime)
}

val Int.isPrime: Boolean
    get() {
        if (this <= 1) return false
        if (this <= 3) return true
        if (this % 2 == 0 || this % 3 == 0) return false
        var i = 5
        while (i * i <= this) {
            if (this % i == 0 || this % (i + 2) == 0) return false
            i += 6
        }
        return true
    }`,
        validator: '2 是质数: true.*7 是质数: true.*12 是质数: false.*17 是质数: true'
      },
      {
        id: 'exercise-8-3',
        title: '中缀函数',
        description: '创建一个中缀函数 shuffle，用于打乱列表中的元素',
        template: `fun main() {
    // TODO: 实现 shuffle 中缀函数
    // 用法: list shuffle (seed) 使用随机种子打乱

    val list = listOf(1, 2, 3, 4, 5)

    // 使用固定的种子进行伪随机打乱
    val result = list shuffle (42)

    println("原列表: " + list)
    println("打乱后: " + result)
}

// 在这里实现 shuffle 中缀函数和辅助代码`,
        hint: '中缀函数语法：infix fun List.shuffle(seed: Int): List',
        solution: `fun main() {
    val list = listOf(1, 2, 3, 4, 5)

    val result = list shuffle (42)

    println("原列表: " + list)
    println("打乱后: " + result)
}

infix fun <T> List<T>.shuffle(seed: Int): List<T> {
    val random = java.util.Random(seed.toLong())
    return this.shuffled(random)
}`,
        validator: '原列表: \\[1, 2, 3, 4, 5\\].*打乱后:'
      }
    ]
  },

  {
    day: 9,
    title: '协程基础',
    description: '入门 Kotlin 协程，学习异步编程',
    icon: '⚡',
    topics: ['协程概念', 'launch/async', '结构化并发', '调度器'],
    difficulty: 'advanced',
    estimatedTime: 300,
    demos: [
      {
        id: 'coroutine-basics',
        title: '协程基础概念',
        description: '理解协程是什么，以及如何使用 runBlocking 启动协程',
        code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // === 协程基础 ===

    // 1. 第一个协程
    println("主线程: " + Thread.currentThread().name)

    launch {
        // 在新协程中执行
        println("协程 1: " + Thread.currentThread().name)
        delay(100)
        println("协程 1 完成")
    }

    println("主线程继续执行")

    delay(200)

    println()

    // 2. 启动多个协程
    launch {
        println("任务 A 开始")
        delay(100)
        println("任务 A 完成")
    }

    launch {
        println("任务 B 开始")
        delay(50)
        println("任务 B 完成")
    }

    launch {
        println("任务 C 开始")
        delay(75)
        println("任务 C 完成")
    }

    delay(300)

    println()

    // 3. 协程是轻量级的
    println("启动大量协程...")
    repeat(10) { i ->
        launch {
            delay(100)
            println("协程 " + i)
        }
    }

    delay(300)

    println()

    // 4. 使用 async 获取返回值
    val deferred1 = async {
        println("计算 1 开始")
        delay(100)
        42
    }

    val deferred2 = async {
        println("计算 2 开始")
        delay(50)
        100
    }

    val result1 = deferred1.await()
    val result2 = deferred2.await()
    println("结果: " + (result1 + result2))

    println()

    // 5. 协程作用域
    val job = launch {
        println("子协程开始")
        delay(1000)
        println("子协程结束")
    }

    println("等待子协程...")
    job.join()
    println("子协程已结束")

    println()

    // 6. 取消协程
    val cancellableJob = launch {
        repeat(5) { i ->
            if (!isActive) return@launch
            println("循环 " + i)
            delay(100)
        }
    }

    delay(250)
    println("取消协程")
    cancellableJob.cancel()
    cancellableJob.join()

    println()

    // 7. 超时处理
    try {
        withTimeout(150) {
            repeat(5) { i ->
                println("超时测试: " + i)
                delay(50)
            }
        }
    } catch (e: TimeoutCancellationException) {
        println("捕获超时!")
    }

    println("协程基础示例完成")
}`,
        expectedOutput: '主线程: main\n协程 1: main\n主线程继续执行\n协程 1 完成\n\n任务 A 开始\n任务 B 开始\n任务 B 完成\n任务 C 完成\n任务 A 完成\n\n启动大量协程...\n协程 [0-9] (顺序可能变化)\n\n计算 1 开始\n计算 2 开始\n结果: 142\n\n等待子协程...\n子协程开始\n子协程结束\n子协程已结束\n\n循环 0\n循环 1\n循环 2\n取消协程\n\n超时测试: 0\n超时测试: 1\n超时测试: 2\n捕获超时!\n协程基础示例完成'
      },
      {
        id: 'launch-vs-async',
        title: 'launch 与 async',
        description: '比较 launch 和 async 的区别和使用场景',
        code: `import kotlinx.coroutines.*

suspend fun doTaskOne(): Int {
    delay(100)
    return 10
}

suspend fun doTaskTwo(): Int {
    delay(100)
    return 20
}

fun main() = runBlocking {
    // === launch vs async ===

    // 1. launch - 启动不返回结果的协程
    println("=== launch 示例 ===")
    val job = launch {
        val result = doTaskOne()
        println("launch 中执行任务: " + result)
    }

    job.join()
    println()

    // 2. async - 启动返回结果的协程
    println("=== async 示例 ===")
    val deferred = async {
        doTaskTwo()
    }
    val result = deferred.await()
    println("async 结果: " + result)

    println()

    // 3. 并行执行
    println("=== 顺序执行 ===")
    val time1 = measureTimeMillis {
        val r1 = doTaskOne()
        val r2 = doTaskTwo()
        println("顺序结果: " + (r1 + r2))
    }
    println("顺序耗时: " + time1 + "ms")

    println()

    println("=== 并行执行 ===")
    val time2 = measureTimeMillis {
        val deferred1 = async { doTaskOne() }
        val deferred2 = async { doTaskTwo() }
        val sum = deferred1.await() + deferred2.await()
        println("并行结果: " + sum)
    }
    println("并行耗时: " + time2 + "ms")

    println()

    // 4. async 结构化并发
    println("=== 结构化 async ===")
    val result3 = async {
        val r1 = async { doTaskOne() }
        val r2 = async { doTaskTwo() }
        r1.await() + r2.await()
    }.await()

    println("嵌套 async 结果: " + result3)

    println()

    // 5. 懒启动 async
    println("=== 懒启动 async ===")
    val lazyDeferred = async(start = CoroutineStart.LAZY) {
        println("懒启动协程开始执行")
        doTaskOne()
    }

    println("懒协程尚未执行")
    delay(200)
    lazyDeferred.await()
    println("懒协程完成")

    println()

    // 6. CoroutineScope 辅助函数
    println("=== 协程作用域 ===")
    val scope = CoroutineScope(Dispatchers.Default)

    val job1 = scope.launch {
        delay(100)
        println("作用域任务 1")
    }

    val job2 = scope.launch {
        delay(100)
        println("作用域任务 2")
    }

    job1.join()
    job2.join()
    println("作用域任务完成")
}

// 辅助函数
suspend fun <T> measureTimeMillis(block: suspend () -> T): Long {
    val start = System.currentTimeMillis()
    block()
    return System.currentTimeMillis() - start
}`,
        expectedOutput: '=== launch 示例 ===\nlaunch 中执行任务: 10\n\n=== async 示例 ===\nasync 结果: 20\n\n=== 顺序执行 ===\n顺序结果: 30\n顺序耗时: 200-250ms\n\n=== 并行执行 ===\n并行结果: 30\n并行耗时: 100-150ms\n\n=== 结构化 async ===\n嵌套 async 结果: 30\n\n=== 懒启动 async ===\n懒协程尚未执行\n懒启动协程开始执行\n懒协程完成\n\n=== 协程作用域 ===\n作用域任务 1\n作用域任务 2\n作用域任务完成'
      },
      {
        id: 'structured-concurrency',
        title: '结构化并发',
        description: '学习如何正确管理协程的生命周期',
        code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // === 结构化并发 ===

    // 1. 协程作用域继承
    println("=== 作用域继承 ===")
    launch {
        // 子协程继承父作用域
        launch {
            delay(100)
            println("孙协程完成")
        }
        delay(50)
        println("子协程完成")
    }

    delay(200)
    println("父协程完成")

    println()

    // 2. coroutineScope vs supervisorScope
    println("=== coroutineScope ===")
    try {
        coroutineScope {
            launch {
                delay(100)
                println("任务 1 完成")
            }
            launch {
                delay(50)
                throw RuntimeException("任务 2 失败")
            }
        }
    } catch (e: Exception) {
        println("coroutineScope 捕获异常: " + e.message)
    }

    println()

    println("=== supervisorScope ===")
    try {
        supervisorScope {
            launch {
                delay(100)
                println("supervisor 任务 1 完成")
            }
            launch {
                delay(50)
                throw RuntimeException("supervisor 任务 2 失败")
            }
        }
    } catch (e: Exception) {
        println("supervisorScope 捕获异常: " + e.message)
    }

    delay(100)

    println()

    // 3. Job 层级
    println("=== Job 层级 ===")
    val parentJob = launch {
        val childJob1 = launch {
            delay(50)
            println("子任务 1")
        }

        val childJob2 = launch {
            delay(75)
            println("子任务 2")
        }

        println("父任务中的子任务数: " + this.coroutineContext[Job]?.children?.count())
    }

    parentJob.join()

    println()

    // 4. SupervisorJob
    println("=== SupervisorJob ===")
    val supervisorJob = SupervisorJob()
    val scope = CoroutineScope(supervisorJob)

    scope.launch {
        delay(100)
        println("Supervisor 任务 1")
    }

    scope.launch {
        delay(50)
        throw RuntimeException("失败")
    }

    delay(150)
    println("SupervisorJob 状态: " + supervisorJob.isActive)

    supervisorJob.cancel()

    println()

    // 5. 使用 withContext 切换上下文
    println("=== withContext ===")
    withContext(Dispatchers.IO) {
        println("IO 上下文: " + Thread.currentThread().name)
    }

    withContext(Dispatchers.Default) {
        println("Default 上下文: " + Thread.currentThread().name)
    }

    println()

    // 6. 自定义作用域
    println("=== 自定义作用域 ===")

    class MyController {
        val scope = CoroutineScope(Dispatchers.Default)

        fun doWork() {
            scope.launch {
                delay(100)
                println("Controller 工作: " + Thread.currentThread().name)
            }
        }

        fun cleanup() {
            scope.cancel()
        }
    }

    val controller = MyController()
    controller.doWork()

    delay(150)
    controller.cleanup()
    println("Controller 已清理")
}`,
        expectedOutput: '=== 作用域继承 ===\n子协程完成\n孙协程完成\n父协程完成\n\n=== coroutineScope ===\ncoroutineScope 捕获异常: 任务 2 失败\n\n=== supervisorScope ===\nsupervisor 任务 1 完成\nsupervisorScope 捕获异常: supervisor 任务 2 失败\n\n=== Job 层级 ===\n父任务中的子任务数: 2\n子任务 1\n子任务 2\n\n=== SupervisorJob ===\nSupervisor 任务 1\nSupervisorJob 状态: true\n\n=== withContext ===\nIO 上下文: [IO 线程]\nDefault 上下文: [Default 线程]\n\n=== 自定义作用域 ===\nController 工作: [Default 线程]\nController 已清理'
      },
      {
        id: 'dispatchers',
        title: '调度器',
        description: '学习不同的协程调度器和线程池',
        code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // === 协程调度器 ===

    // 1. Dispatchers.Main (在 JS 中等同于 Default)
    println("=== Dispatchers ===")

    // 在 JVM 环境中的说明
    println("Main: UI 线程 (在 JS 中等同于 Default)")
    println("IO: IO 密集型任务")
    println("Default: CPU 密集型任务")
    println("Unconfined: 无限制调度器")

    println()

    // 2. Dispatchers.Default
    println("=== Default 调度器 ===")
    launch(Dispatchers.Default) {
        println("Default: " + Thread.currentThread().name)
        // CPU 密集型计算
        var result = 0
        for (i in 1..1000) {
            result += i
        }
        println("计算结果: " + result)
    }.join()

    println()

    // 3. Dispatchers.IO
    println("=== IO 调度器 ===")
    launch(Dispatchers.IO) {
        println("IO: " + Thread.currentThread().name)
        // 模拟 IO 操作
        delay(100)
        println("IO 操作完成")
    }.join()

    println()

    // 4. Dispatchers.Unconfined
    println("=== Unconfined 调度器 ===")
    launch(Dispatchers.Unconfined) {
        println("Unconfined 开始: " + Thread.currentThread().name)
        delay(100)
        println("Unconfined 恢复: " + Thread.currentThread().name)
    }.join()

    println()

    // 5. 切换调度器
    println("=== 切换调度器 ===")
    launch(Dispatchers.IO) {
        println("IO 开始: " + Thread.currentThread().name)

        withContext(Dispatchers.Default) {
            println("切换到 Default: " + Thread.currentThread().name)
            delay(50)
        }

        println("回到 IO: " + Thread.currentThread().name)
    }.join()

    println()

    // 6. 自定义调度器
    println("=== 自定义调度器 ===")
    val customDispatcher = newSingleThreadContext("自定义线程")

    launch(customDispatcher) {
        println("自定义线程: " + Thread.currentThread().name)
        delay(50)
        println("自定义线程完成")
    }.join()

    customDispatcher.close()

    println()

    // 7. 调度器选择指南
    println("=== 调度器选择 ===")
    println("- Main/Default: UI 更新, 计算")
    println("- IO: 网络请求, 文件操作")
    println("- Unconfined: 特殊场景")

    println()

    // 8. 实际应用示例
    println("=== 实际应用 ===")

    suspend fun fetchUserData(): String {
        return withContext(Dispatchers.IO) {
            delay(100)
            "用户数据"
        }
    }

    suspend fun processData(data: String): String {
        return withContext(Dispatchers.Default) {
            delay(50)
            data.uppercase()
        }
    }

    launch {
        val data = fetchUserData()
        val processed = processData(data)
        println("处理结果: " + processed)
    }.join()

    println("调度器示例完成")
}`,
        expectedOutput: '=== Dispatchers ===\nMain: UI 线程 (在 JS 中等同于 Default)\nIO: IO 密集型任务\nDefault: CPU 密集型任务\nUnconfined: 无限制调度器\n\n=== Default 调度器 ===\nDefault: [Default 线程]\n计算结果: 500500\n\n=== IO 调度器 ===\nIO: [IO 线程]\nIO 操作完成\n\n=== Unconfined 调度器 ===\nUnconfined 开始: main\nUnconfined 恢复: [其他线程]\n\n=== 切换调度器 ===\nIO 开始: [IO 线程]\n切换到 Default: [Default 线程]\n回到 IO: [IO 线程]\n\n=== 自定义调度器 ===\n自定义线程: 自定义线程\n自定义线程完成\n\n=== 调度器选择 ===\n- Main/Default: UI 更新, 计算\n- IO: 网络请求, 文件操作\n- Unconfined: 特殊场景\n\n=== 实际应用 ===\n处理结果: 用户数据\n调度器示例完成'
      }
    ],
    exercises: [
      {
        id: 'exercise-9-1',
        title: '使用 async 并行执行',
        description: '使用 async 并行执行两个模拟的 API 调用',
        template: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // TODO: 使用 async 并行执行这两个函数
    // 并获取它们的结果之和

    val result = fetchUser() + fetchPosts()
    println("结果: " + result)
}

suspend fun fetchUser(): Int {
    delay(100)
    return 10
}

suspend fun fetchPosts(): Int {
    delay(100)
    return 20
}`,
        hint: '使用 async { ... } 启动每个函数，然后用 await() 获取结果',
        solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val result = async { fetchUser() }.await() + async { fetchPosts() }.await()
    println("结果: " + result)
}

suspend fun fetchUser(): Int {
    delay(100)
    return 10
}

suspend fun fetchPosts(): Int {
    delay(100)
    return 20
}`,
        validator: '结果: 30'
      },
      {
        id: 'exercise-9-2',
        title: '协程超时处理',
        description: '使用 withTimeout 为长时间运行的操作添加超时',
        template: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // TODO: 为这个操作添加 100ms 超时
    // 如果超时，捕获异常并打印 "操作超时"

    val result = longRunningTask()
    println("结果: " + result)
}

suspend fun longRunningTask(): String {
    delay(200)
    return "完成"
}`,
        hint: '使用 try-catch 和 withTimeout(100) { ... }',
        solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    try {
        val result = withTimeout(100) {
            longRunningTask()
        }
        println("结果: " + result)
    } catch (e: TimeoutCancellationException) {
        println("操作超时")
    }
}

suspend fun longRunningTask(): String {
    delay(200)
    return "完成"
}`,
        validator: '操作超时'
      },
      {
        id: 'exercise-9-3',
        title: '结构化并发',
        description: '使用 coroutineScope 启动多个子协程并等待它们全部完成',
        template: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // TODO: 使用 coroutineScope 并行执行多个任务
    // 每个任务打印自己的编号

    println("所有任务完成")
}`,
        hint: '使用 coroutineScope { repeat(5) { launch { ... } } }',
        solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    coroutineScope {
        repeat(5) { i ->
            launch {
                delay(100)
                println("任务 " + i)
            }
        }
    }
    println("所有任务完成")
}`,
        validator: '任务 [0-4].*所有任务完成'
      }
    ]
  },

  {
    day: 10,
    title: '数据类与密封类',
    description: '掌握数据类和密封类的使用场景',
    icon: '📊',
    topics: ['data class', 'sealed class', 'enum class', '解构'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [
      {
        id: 'data-class',
        title: '数据类 (data class)',
        description: '学习如何使用数据类来存储数据',
        code: `fun main() {
    // === 数据类 data class ===

    // 1. 基本数据类
    data class User(val name: String, val age: Int)

    val user1 = User("Alice", 25)
    val user2 = User("Alice", 25)
    val user3 = User("Bob", 30)

    println("user1: " + user1)
    println("user1 == user2: " + (user1 == user2))  // 内容比较
    println("user1 === user2: " + (user1 === user2))  // 引用比较
    println("user1 == user3: " + (user1 == user3))

    println()

    // 2. 自动生成的方法
    println("=== 自动生成的方法 ===")
    println("toString: " + user1.toString())
    println("hashCode: " + user1.hashCode())
    println("copy: " + user1.copy(age = 26))

    println()

    // 3. copy 函数
    val original = User("Charlie", 35)
    val modified = original.copy(age = 36)
    val renamed = original.copy(name = "Charles")

    println("原始: " + original)
    println("修改年龄: " + modified)
    println("修改名字: " + renamed)
    println("原始对象不变: " + original)

    println()

    // 4. 解构声明
    val (name, age) = user1
    println("解构: name=" + name + ", age=" + age)

    println()

    // 5. 数据类与可变性
    data class Counter(var count: Int)

    val counter1 = Counter(0)
    val counter2 = counter1

    counter1.count++
    println("counter1.count: " + counter1.count)
    println("counter2.count: " + counter2.count)

    println()

    // 6. 组件函数
    data class Point(val x: Int, val y: Int)

    val point = Point(10, 20)
    println("component1: " + point.component1())
    println("component2: " + point.component2())

    println()

    // 7. 嵌套数据类
    data class Address(val city: String, val street: String)
    data class Person(val name: String, val address: Address)

    val person = Person("David", Address("北京", "长安街"))
    println("Person: " + person)

    val updatedPerson = person.copy(
        address = person.address.copy(street = "王府井")
    )
    println("更新后: " + updatedPerson)

    println()

    // 8. 数据类限制
    // 数据类必须有至少一个主构造函数参数
    // 所有参数必须标记为 val 或 var
    // 数据类不能是 abstract、open、sealed 或 inner

    // 正确的数据类示例
    data class Book(
        val title: String,
        val author: String,
        val price: Double,
        val isbn: String
    )

    val book = Book("Kotlin 入门", "张三", 59.9, "978-7-111")
    println("Book: " + book)
    println("书名: " + book.component1())
    println("作者: " + book.component2())

    println()

    // 9. 数据类与集合
    val users = listOf(
        User("Alice", 25),
        User("Bob", 30),
        User("Alice", 25)  // 重复
    )

    val uniqueUsers = users.toSet()
    println("唯一用户: " + uniqueUsers)

    val sortedUsers = users.sortedBy { it.age }
    println("按年龄排序: " + sortedUsers)
}`,
        expectedOutput: 'user1: User(name=Alice, age=25)\nuser1 == user2: true\nuser1 === user2: false\nuser1 == user3: false\n\n=== 自动生成的方法 ===\ntoString: User(name=Alice, age=25)\nhashCode: [hash值]\ncopy: User(name=Alice, age=26)\n\n原始: User(name=Charlie, age=35)\n修改年龄: User(name=Charlie, age=36)\n修改名字: User(name=Charles, age=35)\n原始对象不变: User(name=Charlie, age=35)\n\n解构: name=Alice, age=25\n\ncounter1.count: 1\ncounter2.count: 1\n\ncomponent1: 10\ncomponent2: 20\n\nPerson: Person(name=David, address=Address(city=北京, street=长安街))\n更新后: Person(name=David, address=Address(city=北京, street=王府井))\n\nBook: Book(title=Kotlin 入门, author=张三, price=59.9, isbn=978-7-111)\n书名: Kotlin 入门\n作者: 张三\n\n唯一用户: [User(name=Alice, age=25), User(name=Bob, age=30)]\n按年龄排序: [User(name=Alice, age=25), User(name=Alice, age=25), User(name=Bob, age=30)]'
      },
      {
        id: 'sealed-class',
        title: '密封类 (sealed class)',
        description: '学习密封类的使用和 when 表达式',
        code: `fun main() {
    // === 密封类 sealed class ===

    // 1. 基本密封类
    sealed class Result {
        data class Success(val data: String) : Result()
        data class Error(val message: String) : Result()
        object Loading : Result()
    }

    fun handleResult(result: Result): String {
        return when (result) {
            is Result.Success -> "成功: " + result.data
            is Result.Error -> "错误: " + result.message
            is Result.Loading -> "加载中..."
        }
    }

    println("=== 密封类基本用法 ===")
    println(handleResult(Result.Success("数据获取成功")))
    println(handleResult(Result.Error("网络错误")))
    println(handleResult(Result.Loading))

    println()

    // 2. 密封类用于状态管理
    sealed class UiState {
        object Idle : UiState()
        object Loading : UiState()
        data class Success(val items: List<String>) : UiState()
        data class Error(val error: String) : UiState()
    }

    fun render(state: UiState): String {
        return when (state) {
            is UiState.Idle -> "空闲状态"
            is UiState.Loading -> "加载中..."
            is UiState.Success -> "显示 " + state.items.size + " 项"
            is UiState.Error -> "错误: " + state.error
        }
    }

    val states = listOf(
        UiState.Idle,
        UiState.Loading,
        UiState.Success(listOf("A", "B", "C")),
        UiState.Error("连接失败")
    )

    for (state in states) {
        println("状态: " + render(state))
    }

    println()

    // 3. 嵌套密封类
    sealed class NetworkResponse {
        sealed class Success : NetworkResponse() {
            data classWithData(val data: String) : Success()
            object NoContent : Success()
        }

        sealed class Error : NetworkResponse() {
            data class BadRequest(val message: String) : Error()
            data class Unauthorized(val message: String) : Error()
            data class ServerError(val code: Int) : Error()
        }
    }

    fun processResponse(response: NetworkResponse): String {
        return when (response) {
            is NetworkResponse.Success.WithData -> "数据: " + response.data
            is NetworkResponse.Success.NoContent -> "无内容"
            is NetworkResponse.Error.BadRequest -> "请求错误: " + response.message
            is NetworkResponse.Error.Unauthorized -> "未授权: " + response.message
            is NetworkResponse.Error.ServerError -> "服务器错误: " + response.code
        }
    }

    println("=== 嵌套密封类 ===")
    println(processResponse(NetworkResponse.Success.WithData("用户数据")))
    println(processResponse(NetworkResponse.Success.NoContent))
    println(processResponse(NetworkResponse.Error.BadRequest("参数无效")))
    println(processResponse(NetworkResponse.Error.ServerError(500)))

    println()

    // 4. 密封类与表达式
    sealed class Operation {
        data class Add(val a: Int, val b: Int) : Operation()
        data class Subtract(val a: Int, val b: Int) : Operation()
        data class Multiply(val a: Int, val b: Int) : Operation()
        data class Divide(val a: Int, val b: Int) : Operation()
    }

    fun calculate(operation: Operation): Int {
        return when (operation) {
            is Operation.Add -> operation.a + operation.b
            is Operation.Subtract -> operation.a - operation.b
            is Operation.Multiply -> operation.a * operation.b
            is Operation.Divide -> operation.a / operation.b
        }
    }

    println("=== 密封类作为表达式 ===")
    println("5 + 3 = " + calculate(Operation.Add(5, 3)))
    println("10 - 4 = " + calculate(Operation.Subtract(10, 4)))
    println("6 * 7 = " + calculate(Operation.Multiply(6, 7)))
    println("20 / 4 = " + calculate(Operation.Divide(20, 4)))

    println()

    // 5. 密封接口
    sealed interface Shape {
        val area: Double
    }

    data class Circle(val radius: Double) : Shape {
        override val area: Double = Math.PI * radius * radius
    }

    data class Rectangle(val width: Double, val height: Double) : Shape {
        override val area: Double = width * height
    }

    fun describe(shape: Shape): String {
        return when (shape) {
            is Circle -> "圆形, 面积: " + "%.2f".format(shape.area)
            is Rectangle -> "矩形, 面积: " + "%.2f".format(shape.area)
        }
    }

    println("=== 密封接口 ===")
    println(describe(Circle(5.0)))
    println(describe(Rectangle(4.0, 6.0)))
}`,
        expectedOutput: '=== 密封类基本用法 ===\n成功: 数据获取成功\n错误: 网络错误\n加载中...\n\n状态: 空闲状态\n状态: 加载中...\n状态: 显示 3 项\n状态: 错误: 连接失败\n\n=== 嵌套密封类 ===\n数据: 用户数据\n无内容\n请求错误: 参数无效\n服务器错误: 500\n\n=== 密封类作为表达式 ===\n5 + 3 = 8\n10 - 4 = 6\n6 * 7 = 42\n20 / 4 = 5\n\n=== 密封接口 ===\n圆形, 面积: 78.54\n矩形, 面积: 24.00'
      },
      {
        id: 'enum-class',
        title: '枚举类 (enum class)',
        description: '学习 Kotlin 枚举类的使用',
        code: `fun main() {
    // === 枚举类 enum class ===

    // 1. 基本枚举
    enum class Direction {
        NORTH, SOUTH, EAST, WEST
    }

    println("=== 基本枚举 ===")
    println("向北: " + Direction.NORTH)
    println("所有方向: " + Direction.entries.joinToString(", "))

    println()

    // 2. 带属性的枚举
    enum class Priority(val value: Int, val color: String) {
        LOW(1, "绿色") { override fun toString() = "低" },
        MEDIUM(2, "黄色") { override fun toString() = "中" },
        HIGH(3, "红色") { override fun toString() = "高" },

        abstract override fun toString(): String
    }

    println("=== 带属性的枚举 ===")
    println("高优先级值: " + Priority.HIGH.value)
    println("高优先级颜色: " + Priority.HIGH.color)
    println("字符串: " + Priority.MEDIUM.toString())

    println()

    // 3. 枚举与 when
    fun getPriorityLevel(priority: Priority): String {
        return when (priority) {
            Priority.LOW -> "这是低优先级"
            Priority.MEDIUM -> "这是中优先级"
            Priority.HIGH -> "这是高优先级"
        }
    }

    println("=== 枚举与 when ===")
    for (priority in Priority.entries) {
        println("" + priority + ": " + getPriorityLevel(priority))
    }

    println()

    // 4. 枚举声明方法
    enum class HttpStatus(val code: Int) {
        OK(200) {
            override fun isSuccess() = true
        },
        NOT_FOUND(404) {
            override fun isSuccess() = false
        },
        SERVER_ERROR(500) {
            override fun isSuccess() = false
        };

        abstract fun isSuccess(): Boolean
    }

    println("=== 枚举声明方法 ===")
    println("200 成功: " + HttpStatus.OK.isSuccess())
    println("404 成功: " + HttpStatus.NOT_FOUND.isSuccess())

    println()

    // 5. 枚举实现接口
    interface Describable {
        fun describe(): String
    }

    enum class Planet(val mass: Double) : Describable {
        EARTH(5.97) {
            override fun describe() = "地球, 生命的家园"
        },
        MARS(0.64) {
            override fun describe() = "火星, 红色星球"
        },
        JUPITER(1898) {
            override fun describe() = "木星, 气态巨行星"
        };

        override fun describe(): String {
            return "未知星球"
        }
    }

    println("=== 枚举实现接口 ===")
    for (planet in Planet.entries) {
        println(planet.name + ": " + planet.describe())
    }

    println()

    // 6. 枚举属性访问
    enum class Color(val rgb: Int) {
        RED(0xFF0000),
        GREEN(0x00FF00),
        BLUE(0x0000FF);

        fun hex() = "#" + rgb.toString(16).uppercase()
    }

    println("=== 枚举属性 ===")
    println("红色 RGB: " + Color.RED.rgb)
    println("红色十六进制: " + Color.RED.hex())

    // 通过名称获取枚举
    val color = Color.valueOf("BLUE")
    println("颜色: " + color)

    println()

    // 7. 枚举用于状态机
    enum class State {
        IDLE {
            override fun next() = RUNNING
        },
        RUNNING {
            override fun next() = PAUSED
        },
        PAUSED {
            override fun next() = RUNNING
        },
        STOPPED {
            override fun next() = this
        };

        abstract fun next(): State
    }

    println("=== 枚举状态机 ===")
    var state = State.IDLE
    println("初始: " + state)
    state = state.next()
    println("下一步: " + state)
    state = state.next()
    println("下一步: " + state)

    println()

    // 8. 密封类 vs 枚举
    println("=== 密封类 vs 枚举 ===")
    println("枚举: 单实例, 固定类型")
    println("密封类: 可携带数据, 灵活类型")

    // 枚举适合: 固定选项, 不携带额外数据
    // 密封类适合: 需要携带数据, 复杂状态
}`,
        expectedOutput: '=== 基本枚举 ===\n向北: NORTH\n所有方向: NORTH, SOUTH, EAST, WEST\n\n=== 带属性的枚举 ===\n高优先级值: 3\n高优先级颜色: 红色\n字符串: 中\n\n=== 枚举与 when ===\n低: 这是低优先级\n中: 这是中优先级\n高: 这是高优先级\n\n=== 枚举声明方法 ===\n200 成功: true\n404 成功: false\n\n=== 枚举实现接口 ===\nEARTH: 地球, 生命的家园\nMARS: 火星, 红色星球\nJUPITER: 木星, 气态巨行星\n\n=== 枚举属性 ===\n红色 RGB: 16711680\n红色十六进制: #FF0000\n颜色: BLUE\n\n=== 枚举状态机 ===\n初始: IDLE\n下一步: RUNNING\n下一步: PAUSED\n\n=== 密封类 vs 枚举 ===\n枚举: 单实例, 固定类型\n密封类: 可携带数据, 灵活类型'
      },
      {
        id: 'destructuring',
        title: '解构声明',
        description: '学习如何使用解构声明和多返回值',
        code: `fun main() {
    // === 解构声明 ===

    // 1. 基本解构
    data class Point(val x: Int, val y: Int)

    val point = Point(10, 20)
    val (x, y) = point

    println("坐标: x=" + x + ", y=" + y)

    println()

    // 2. 数据类自动生成 componentN
    data class User(val name: String, val age: Int, val city: String)

    val user = User("Alice", 25, "北京")
    val (name, age, city) = user

    println("name: " + name)
    println("age: " + age)
    println("city: " + city)

    println()

    // 3. 函数返回多个值
    fun getUserInfo(): Triple<String, Int, String> {
        return Triple("Bob", 30, "上海")
    }

    val (userName, userAge, userCity) = getUserInfo()
    println("用户: " + userName + ", " + userAge + "岁, " + userCity)

    println()

    // 4. 使用 Pair 返回两个值
    fun divideAndRemainder(a: Int, b: Int): Pair<Int, Int> {
        return Pair(a / b, a % b)
    }

    val (quotient, remainder) = divideAndRemainder(17, 5)
    println("17 / 5: 商=" + quotient + ", 余=" + remainder)

    println()

    // 5. 使用数据类返回多个值
    data class ValidationResult(
        val isValid: Boolean,
        val errors: List<String>
    )

    fun validate(input: String): ValidationResult {
        val errors = mutableListOf<String>()

        if (input.length < 3) {
            errors.add("长度至少3个字符")
        }

        if (!input.all { it.isLetter() }) {
            errors.add("只能包含字母")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    val (isValid, errors) = validate("ab")

    println("验证: " + isValid)
    if (!isValid) {
        println("错误: " + errors.joinToString(", "))
    }

    println()

    // 6. 解构在 Map 中
    val map = mapOf(
        "key1" to "value1",
        "key2" to "value2"
    )

    println("=== Map 解构 ===")
    for ((key, value) in map) {
        println("" + key + " -> " + value)
    }

    println()

    // 7. 解构在列表中
    val pairs = listOf(
        1 to "one",
        2 to "two",
        3 to "three"
    )

    println("=== 列表解构 ===")
    for ((number, word) in pairs) {
        println("" + number + ": " + word)
    }

    println()

    // 8. 忽略某些值
    data class FullName(val first: String, val middle: String, val last: String)

    val fullName = FullName("John", "Fitzgerald", "Kennedy")
    val (firstName, _, lastName) = fullName

    println("忽略中间名: " + firstName + " " + lastName)

    println()

    // 9. 解构与 Lambda
    val users = listOf(
        User("Alice", 25, "北京"),
        User("Bob", 30, "上海"),
        User("Charlie", 28, "深圳")
    )

    println("=== Lambda 解构 ===")
    users.forEach { (n, a, c) ->
        println("" + n + ": " + a + "岁, " + c)
    }

    println()

    // 10. 自定义 componentN 函数
    class Dimension(val width: Int, val height: Int) {
        operator fun component1() = width
        operator fun component2() = height
    }

    val (w, h) = Dimension(1920, 1080)
    println("分辨率: " + w + "x" + h)
}`,
        expectedOutput: '坐标: x=10, y=20\n\nname: Alice\nage: 25\ncity: 北京\n\n用户: Bob, 30岁, 上海\n\n17 / 5: 商=3, 余=2\n\n验证: false\n错误: 长度至少3个字符\n\n=== Map 解构 ===\nkey1 -> value1\nkey2 -> value2\n\n=== 列表解构 ===\n1: one\n2: two\n3: three\n\n忽略中间名: John Kennedy\n\n=== Lambda 解构 ===\nAlice: 25岁, 北京\nBob: 30岁, 上海\nCharlie: 28岁, 深圳\n\n分辨率: 1920x1080'
      }
    ],
    exercises: [
      {
        id: 'exercise-10-1',
        title: '数据类 copy 函数',
        description: '使用 copy 函数创建修改后的数据类实例',
        template: `fun main() {
    data class Book(val title: String, val author: String, val price: Double)

    val book = Book("Kotlin 入门", "张三", 59.9)

    // TODO: 使用 copy 函数创建两个新实例
    // 1. 修改价格为 49.9
    // 2. 修改作者为 "李四" 且价格为 39.9

    val discounted = // 实现
    val updated = // 实现

    println("打折: " + discounted)
    println("更新: " + updated)
}`,
        hint: '使用 copy(price = 49.9) 和 copy(author = "李四", price = 39.9)',
        solution: `fun main() {
    data class Book(val title: String, val author: String, val price: Double)

    val book = Book("Kotlin 入门", "张三", 59.9)

    val discounted = book.copy(price = 49.9)
    val updated = book.copy(author = "李四", price = 39.9)

    println("打折: " + discounted)
    println("更新: " + updated)
}`,
        validator: '打折: Book\\(title=Kotlin 入门, author=张三, price=49.9\\).*更新: Book\\(title=Kotlin 入门, author=李四, price=39.9\\)'
      },
      {
        id: 'exercise-10-2',
        title: '密封类表达式',
        description: '实现一个密封类处理不同的计算结果',
        template: `fun main() {
    // TODO: 定义 Calculation 密封类
    // 包含 Success 和 Error 子类
    // 然后实现 getResult 函数

    println(getResult(10))
    println(getResult(-1))
}

fun getResult(value: Int): String {
    // TODO: 返回 "结果: $value" 如果 value >= 0
    // 否则返回 "错误: 负数"
    return ""
}`,
        hint: 'sealed class Calculation { data class Success(val value: Int) : Calculation() ... }',
        solution: `fun main() {
    sealed class Calculation {
        data class Success(val value: Int) : Calculation()
        data class Error(val message: String) : Calculation()
    }

    fun getResult(value: Int): Calculation {
        return if (value >= 0) {
            Calculation.Success(value)
        } else {
            Calculation.Error("负数")
        }
    }

    fun printResult(calc: Calculation): String {
        return when (calc) {
            is Calculation.Success -> "结果: " + calc.value
            is Calculation.Error -> "错误: " + calc.message
        }
    }

    println(printResult(getResult(10)))
    println(printResult(getResult(-1)))
}`,
        validator: '结果: 10.*错误: 负数'
      },
      {
        id: 'exercise-10-3',
        title: '解构声明',
        description: '使用解构声明从 Pair 中获取值',
        template: `fun main() {
    fun getMinMax(numbers: List<Int>): Pair<Int, Int> {
        return Pair(numbers.minOrNull() ?: 0, numbers.maxOrNull() ?: 0)
    }

    val numbers = listOf(5, 2, 8, 1, 9, 3)

    // TODO: 使用解构声明获取最小值和最大值

    println("最小值: ")
    println("最大值: ")
}`,
        hint: 'val (min, max) = getMinMax(numbers)',
        solution: `fun main() {
    fun getMinMax(numbers: List<Int>): Pair<Int, Int> {
        return Pair(numbers.minOrNull() ?: 0, numbers.maxOrNull() ?: 0)
    }

    val numbers = listOf(5, 2, 8, 1, 9, 3)

    val (min, max) = getMinMax(numbers)

    println("最小值: " + min)
    println("最大值: " + max)
}`,
        validator: '最小值: 1.*最大值: 9'
      }
    ]
  },

  {
    day: 11,
    title: '标准库与常用函数',
    description: '学习 Kotlin 标准库中的常用函数和工具',
    icon: '🧰',
    topics: ['作用域函数', '集合操作', '字符串操作', '数学函数'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [
      {
        id: 'scope-functions-review',
        title: '作用域函数深入',
        description: '深入理解 let、run、with、apply、also 和 takeIf/takeUnless',
        code: `fun main() {
    // === 作用域函数深入 ===

    // 1. takeIf 和 takeUnless
    val number = 42

    val takenIf = number.takeIf { it > 40 }
    println("takeIf (>40): " + takenIf)  // 42

    val takenUnless = number.takeUnless { it > 40 }
    println("takeUnless (>40): " + takenUnless)  // null

    val notTaken = number.takeIf { it > 100 }
    println("takeIf (>100): " + notTaken)  // null

    println()

    // 2. 链式作用域函数
    val result = "hello"
        .takeIf { it.startsWith("h") }
        ?.also { println("以 h 开头") }
        ?.run { "处理后: " + this.uppercase() }

    println("结果: " + result)

    println()

    // 3. 使用 takeIf 进行条件处理
    fun processUser(id: Int?): String? {
        return id.takeIf { it != null && it > 0 }?.let {
            "用户 ID: " + it
        }
    }

    println(processUser(123))
    println(processUser(-1))
    println(processUser(null))

    println()

    // 4. repeat 函数
    println("=== repeat ===")
    repeat(3) { index ->
        println("迭代 " + index)
    }

    println()

    // 5. require 和 check
    println("=== require 和 check ===")

    fun validateAge(age: Int) {
        require(age >= 0) { "年龄不能为负: " + age }
        require(age <= 150) { "年龄不合理: " + age }
        println("年龄 " + age + " 有效")
    }

    validateAge(25)

    fun divide(a: Int, b: Int): Int {
        check(b != 0) { "除数不能为零" }
        return a / b
    }

    println("10 / 2 = " + divide(10, 2))

    println()

    // 6. 错误处理函数
    println("=== 错误处理 ===")

    val result1 = runCatching {
        Integer.parseInt("123")
    }
    println("解析成功: " + result1.getOrNull())

    val result2 = runCatching {
        Integer.parseInt("abc")
    }
    println("解析失败: " + result2.exceptionOrNull())

    // 恢复
    val recovered = result2.getOrElse { 0 }
    println("恢复值: " + recovered)

    println()

    // 7. 使用 use 进行资源管理
    println("=== use 资源管理 ===")

    class Resource(val name: String) : AutoCloseable {
        fun use() = println("使用资源: " + name)
        override fun close() = println("关闭资源: " + name)
    }

    Resource("文件.txt").use { resource ->
        resource.use()
    }
    // 资源自动关闭

    println()

    // 8. 比较、范围、进度
    println("=== 范围和进度 ===")

    // rangeTo
    val range = 1..5
    println("范围: " + range.toList())

    // progression
    val progression = 1..10 step 2
    println("步进: " + progression.toList())

    // downTo
    val countdown = 10 downTo 1
    println("倒数: " + countdown.toList())

    println()

    // 9. lazy 委托的更多用法
    println("=== lazy 委托 ===")

    val expensive by lazy {
        println("计算中...")
        42
    }

    println("创建完成")
    println("值: " + expensive)
    println("再次访问: " + expensive)

    println()

    // 10. Observable 委托
    import kotlin.properties.Delegates

    println("=== Observable 委托 ===")
    var observed: String by Delegates.observable("<初始值>") { property, oldValue, newValue ->
        println("变更: " + oldValue + " -> " + newValue)
    }

    println("当前: " + observed)
    observed = "新值"
    println("当前: " + observed)
}`,
        expectedOutput: 'takeIf (>40): 42\ntakeUnless (>40): null\ntakeIf (>100): null\n\n以 h 开头\n结果: 处理后: HELLO\n\n用户 ID: 123\nnull\nnull\n\n=== repeat ===\n迭代 0\n迭代 1\n迭代 2\n\n=== require 和 check ===\n年龄 25 有效\n10 / 2 = 5\n\n=== 错误处理 ===\n解析成功: 123\n解析失败: java.lang.NumberFormatException: abc\n恢复值: 0\n\n=== use 资源管理 ===\n使用资源: 文件.txt\n关闭资源: 文件.txt\n\n=== 范围和进度 ===\n范围: [1, 2, 3, 4, 5]\n步进: [1, 3, 5, 7, 9]\n倒数: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]\n\n=== lazy 委托 ===\n创建完成\n计算中...\n值: 42\n再次访问: 42\n\n=== Observable 委托 ===\n当前: <初始值>\n变更: <初始值> -> 新值\n当前: 新值'
      },
      {
        id: 'collection-operations',
        title: '集合操作',
        description: '掌握 Kotlin 中强大的集合操作函数',
        code: `fun main() {
    // === 集合操作 ===

    // 1. 基本过滤和映射
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    val evens = numbers.filter { it % 2 == 0 }
    println("偶数: " + evens)

    val squares = numbers.map { it * it }
    println("平方: " + squares)

    val evensSquared = numbers.filter { it % 2 == 0 }.map { it * it }
    println("偶数的平方: " + evensSquared)

    println()

    // 2. flatMap 和 flatten
    val nested = listOf(listOf(1, 2), listOf(3, 4), listOf(5, 6))
    println("嵌套: " + nested)
    println("展平: " + nested.flatten())

    val words = listOf("hello world", "kotlin language")
    val chars = words.flatMap { it.split(" ") }
    println("分割后展平: " + chars)

    println()

    // 3. 分组操作
    data class Person(val name: String, val age: Int, val city: String)

    val people = listOf(
        Person("Alice", 25, "北京"),
        Person("Bob", 30, "上海"),
        Person("Charlie", 25, "北京"),
        Person("David", 30, "上海")
    )

    val groupedByAge = people.groupBy { it.age }
    println("按年龄分组:")
    for ((age, persons) in groupedByAge) {
        println("  " + age + "岁: " + persons.map { it.name })
    }

    val groupedByCity = people.groupBy { it.city }
    println("按城市分组: " + groupedByCity.mapKeys { "" + it.key + ": " + it.value.map { p -> p.name } })

    println()

    // 4. 聚合操作
    println("=== 聚合操作 ===")

    val sum = numbers.reduce { acc, n -> acc + n }
    println("求和: " + sum)

    val product = numbers.reduce { acc, n -> acc * n }
    println("乘积: " + product)

    val max = numbers.maxOrNull()
    val min = numbers.minOrNull()
    println("最大: " + max + ", 最小: " + min)

    val avg = numbers.average()
    println("平均: " + avg)

    println()

    // 5. fold 操作
    val numbersDesc = numbers.fold("数字: ") { acc, n -> acc + n + " " }
    println("fold 字符串: " + numbersDesc)

    val sumByFold = numbers.fold(0) { acc, n -> acc + n }
    println("fold 求和: " + sumByFold)

    println()

    // 6. 查找操作
    println("=== 查找操作 ===")

    val found = numbers.find { it > 5 }
    println("find > 5: " + found)

    val foundAll = numbers.filter { it > 5 }
    println("filter > 5: " + foundAll)

    val indexOf = numbers.indexOfFirst { it % 3 == 0 }
    println("第一个3的倍数位置: " + indexOf)

    val anyMatch = numbers.any { it > 8 }
    println("是否有大于8的: " + anyMatch)

    val allMatch = numbers.all { it > 0 }
    println("是否都大于0: " + allMatch)

    val noneMatch = numbers.none { it < 0 }
    println("是否没有负数: " + noneMatch)

    println()

    // 7. 排序操作
    val unsorted = listOf(3, 1, 4, 1, 5, 9, 2, 6)
    println("原始: " + unsorted)
    println("升序: " + unsorted.sorted())
    println("降序: " + unsorted.sortedDescending())
    println("按条件: " + unsorted.sortedBy { it % 3 })

    println()

    // 8. 集合转换
    val mutable = numbers.toMutableList()
    mutable.add(11)
    println("可变列表: " + mutable)

    val set = numbers.toSet()
    println("转为集合: " + set)

    val map = numbers.associateBy { "num" + it to it }
    println("转为Map: " + map)

    println()

    // 9. partition 分割
    val (pass, fail) = numbers.partition { it % 2 == 0 }
    println("偶数: " + pass)
    println("奇数: " + fail)

    println()

    // 10. zip 和 unzip
    val names = listOf("Alice", "Bob", "Charlie")
    val ages = listOf(25, 30, 35)

    val zipped = names.zip(ages)
    println("zip: " + zipped)

    val pairs = listOf(Pair(1, "one"), Pair(2, "two"), Pair(3, "three"))
    val (numbers2, words) = pairs.unzip()
    println("unzip numbers: " + numbers2)
    println("unzip words: " + words)

    println()

    // 11. chunked 分块
    val largeList = (1..20).toList()
    val chunks = largeList.chunked(5)
    println("分块:")
    for ((i, chunk) in chunks.withIndex()) {
        println("  块 " + (i + 1) + ": " + chunk)
    }

    println()

    // 12. windowed 滑动窗口
    val series = listOf(1, 2, 3, 4, 5)
    val windows = series.windowed(3)
    println("滑动窗口:")
    for (window in windows) {
        println("  " + window)
    }
}`,
        expectedOutput: '偶数: [2, 4, 6, 8, 10]\n平方: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n偶数的平方: [4, 16, 36, 64, 100]\n\n嵌套: [[1, 2], [3, 4], [5, 6]]\n展平: [1, 2, 3, 4, 5, 6]\n分割后展平: [hello, world, kotlin, language]\n\n按年龄分组:\n  25岁: [Alice, Charlie]\n  30岁: [Bob, David]\n\n=== 聚合操作 ===\n求和: 55\n乘积: 3628800\n最大: 10, 最小: 1\n平均: 5.5\n\nfold 字符串: 数字: 1 2 3 4 5 6 7 8 9 10 \nfold 求和: 55\n\n=== 查找操作 ===\nfind > 5: 6\nfilter > 5: [6, 7, 8, 9, 10]\n第一个3的倍数位置: 2\n是否有大于8的: true\n是否都大于0: true\n是否没有负数: true\n\n=== 排序操作 ===\n原始: [3, 1, 4, 1, 5, 9, 2, 6]\n升序: [1, 1, 2, 3, 4, 5, 6, 9]\n降序: [9, 6, 5, 4, 3, 2, 1, 1]\n\nzip: [(Alice, 25), (Bob, 30), (Charlie, 35)]\nunzip numbers: [1, 2, 3]\nunzip words: [one, two, three]\n\n分块:\n  块 1: [1, 2, 3, 4, 5]\n  块 2: [6, 7, 8, 9, 10]\n  块 3: [11, 12, 13, 14, 15]\n  块 4: [16, 17, 18, 19, 20]\n\n滑动窗口:\n  [1, 2, 3]\n  [2, 3, 4]\n  [3, 4, 5]'
      },
      {
        id: 'string-operations',
        title: '字符串操作',
        description: '学习 Kotlin 中的字符串处理函数',
        code: `fun main() {
    // === 字符串操作 ===

    // 1. 基本属性
    val text = "Hello Kotlin"
    println("长度: " + text.length)
    println("空: " + text.isEmpty())
    println("空白: " + text.isBlank())

    val empty = ""
    println("空字符串 isEmpty: " + empty.isEmpty())
    println("空字符串 isBlank: " + "   ".isBlank())

    println()

    // 2. 字符串访问
    println("第一个字符: " + text[0])
    println("最后一个字符: " + text[text.length - 1])
    println("获取子串: " + text.substring(0, 5))

    println()

    // 3. 查找操作
    println("=== 查找操作 ===")
    println("包含 Kotlin: " + text.contains("Kotlin"))
    println("Kotlin 位置: " + text.indexOf("Kotlin"))
    println("首次出现 l: " + text.indexOf("l"))
    println("最后出现 l: " + text.lastIndexOf("l"))

    println("以 Hello 开头: " + text.startsWith("Hello"))
    println("以 Kotlin 结尾: " + text.endsWith("Kotlin"))

    println()

    // 4. 大小写转换
    println("=== 大小写 ===")
    println("大写: " + text.uppercase())
    println("小写: " + text.lowercase())
    println("首字母大写: " + "hello".replaceFirstChar { it.uppercase() })
    println("首字母小写: " + "Hello".replaceFirstChar { it.lowercase() })

    println()

    // 5. 替换操作
    val template = "Hello %NAME%, welcome to %PLACE%"

    // 简单替换
    println("替换 %NAME%: " + template.replace("%NAME%", "Alice"))

    // 正则替换
    val regexReplaced = template.replace(Regex("%[A-Z]+%")) {
        when (it.value) {
            "%NAME%" -> "Bob"
            "%PLACE%" -> "Kotlin World"
            else -> it.value
        }
    }
    println("正则替换: " + regexReplaced)

    println()

    // 6. 分割和连接
    println("=== 分割和连接 ===")

    val sentence = "Kotlin,is,awesome,language"
    val parts = sentence.split(",")
    println("分割: " + parts)

    val joined = parts.joinToString(" ")
    println("连接: " + joined)

    val lines = "Line1\\nLine2\\nLine3".split("\\n")
    println("按行分割: " + lines)

    println()

    // 7. 去除空白
    println("=== 去除空白 ===")

    val padded = "   Hello World   "
    println("原始: '" + padded + "'")
    println("trim: '" + padded.trim() + "'")
    println("trimStart: '" + padded.trimStart() + "'")
    println("trimEnd: '" + padded.trimEnd() + "'")

    println()

    // 8. 填充和对齐
    println("=== 填充对齐 ===")

    val name = "Kotlin"
    println("左填充: '" + name.padStart(10, '*') + "'")
    println("右填充: '" + name.padEnd(10, '*') + "'")

    // 格式化对齐
    val items = listOf("Apple", "Banana", "Cherry")
    for (item in items) {
        println(item.padEnd(10) + "- delicious")
    }

    println()

    // 9. 比较字符串
    println("=== 比较 ===")

    println("abc < def: " + "abc".compareTo("def"))
    println("忽略大小写比较: " + "HELLO".equals("hello", ignoreCase = true))

    println()

    // 10. 字符串匹配
    println("=== 匹配 ===")

    val email = "user@example.com"
    println("是邮箱格式: " + email.matches(Regex("[^@]+@[^@]+\\\\.[^@]+")))

    val number = "12345"
    println("全数字: " + number.all { it.isDigit() })
    println("全字母: " + "Kotlin".all { it.isLetter() })

    println()

    // 11. 字符串反转
    println("=== 反转 ===")
    println("Kotlin 反转: " + "Kotlin".reversed())

    println()

    // 12. 统计字符
    println("=== 统计 ===")

    val text2 = "hello world"
    val charCount = text2.count()
    val charCountFiltered = text2.count { it == 'l' }

    println("字符总数: " + charCount)
    println("l 出现次数: " + charCountFiltered)

    println()

    // 13. 重复字符串
    println("=== 重复 ===")
    println("ha! 重复3次: " + "ha!".repeat(3))

    println()

    // 14. 字符串构建
    println("=== StringBuilder ===")

    val sb = StringBuilder()
    sb.append("Hello")
    sb.appendLine()
    sb.append("Kotlin")
    sb.insert(5, " Beautiful")

    println("StringBuilder: " + sb.toString())

    println()

    // 15. 多行字符串
    println("=== 多行字符串 ===")

    val multiline = """
        |第一行
        |第二行
        |第三行
    """.trimMargin()

    println("多行:")
    println(multiline)
}`,
        expectedOutput: '长度: 12\n空: false\n空白: false\n空字符串 isEmpty: true\n空字符串 isBlank: true\n\n第一个字符: H\n最后一个字符: n\n获取子串: Hello\n\n=== 查找操作 ===\n包含 Kotlin: true\nKotlin 位置: 6\n首次出现 l: 2\n最后出现 l: 9\n以 Hello 开头: true\n以 Kotlin 结尾: true\n\n=== 大小写 ===\n大写: HELLO KOTLIN\n小写: hello kotlin\n首字母大写: Hello\n首字母小写: hello\n\n替换 %NAME%: Hello Alice, welcome to %PLACE%\n正则替换: Hello Bob, welcome to Kotlin World\n\n=== 分割和连接 ===\n分割: [Kotlin, is, awesome, language]\n连接: Kotlin is awesome language\n按行分割: [Line1, Line2, Line3]\n\n=== 去除空白 ===\n原始: \'   Hello World   \' \ntrim: \'Hello World\' \ntrimStart: \'Hello World   \' \ntrimEnd: \'   Hello World\' \n\n=== 填充对齐 ===\n左填充: \'****Kotlin\' \n右填充: \'Kotlin****\' \nApple     - delicious\nBanana    - delicious\nCherry    - delicious\n\n=== 比较 ===\nabc < def: true\n忽略大小写比较: true\n\n=== 匹配 ===\n是邮箱格式: true\n全数字: true\n全字母: true\n\n=== 反转 ===\nKotlin 反转: niltoK\n\n=== 统计 ===\n字符总数: 11\nl 出现次数: 3\n\n=== 重复 ===\nha! 重复3次: ha!ha!ha!\n\n=== StringBuilder ===\nStringBuilder: Hello Beautiful\nKotlin\n\n=== 多行字符串 ===\n多行:\n第一行\n第二行\n第三行'
      },
      {
        id: 'math-and-misc',
        title: '数学函数和其他工具',
        description: '学习 Kotlin 中的数学函数和实用工具',
        code: `import kotlin.math.*

fun main() {
    // === 数学函数 ===

    // 1. 基本数学运算
    println("=== 基本运算 ===")
    println("绝对值 -5: " + abs(-5))
    println("绝对值 5.5: " + abs(-5.5))

    println("2的3次方: " + 2.0.pow(3))
    println("平方根 16: " + sqrt(16.0))
    println("立方根 27: " + cbrt(27.0))

    println("e的10次方: " + exp(10.0))
    println("ln(10): " + ln(10.0))
    println("log10(100): " + log10(100.0))

    println()

    // 2. 取整和舍入
    println("=== 取整舍入 ===")

    val pi = 3.1415926
    println("PI: " + pi)
    println("向上取整: " + ceil(pi))
    println("向下取整: " + floor(pi))
    println("四舍五入: " + round(pi))
    println("截断: " + truncate(pi))

    println()

    // 3. 三角函数
    println("=== 三角函数 ===")

    val angle = 45.0
    val radians = Math.toRadians(angle)

    println("45度正弦: " + sin(radians))
    println("45度余弦: " + cos(radians))
    println("45度正切: " + tan(radians))

    println()

    // 4. 最大最小值
    println("=== 最大最小 ===")
    println("max(10, 20): " + max(10, 20))
    println("min(10, 20): " + min(10, 20))
    println("max(1.5, 2.5, 3.5): " + max(1.5, 2.5, 3.5))

    println()

    // 5. 随机数
    println("=== 随机数 ===")

    println("随机 Double: " + Math.random())
    println("随机 Int(1-100): " + (1..100).random())

    // 使用 Random 类
    val random = java.util.Random()
    println("Random Int: " + random.nextInt(100))
    println("Random Boolean: " + random.nextBoolean())

    println()

    // 6. 限制范围
    println("=== 限制范围 ===")

    fun ensureRange(value: Int, min: Int, max: Int): Int {
        return value.coerceIn(min, max)
    }

    println("coerceIn(150, 0, 100): " + ensureRange(150, 0, 100))
    println("coerceIn(-10, 0, 100): " + ensureRange(-10, 0, 100))
    println("coerceIn(50, 0, 100): " + ensureRange(50, 0, 100))

    println()

    // 7. 位运算
    println("=== 位运算 ===")

    val a = 5  // 101
    val b = 3  // 011

    println("5 AND 3: " + (a and b))     // 001 = 1
    println("5 OR 3: " + (a or b))      // 111 = 7
    println("5 XOR 3: " + (a xor b))     // 110 = 6
    println("5 左移 1: " + (a shl 1))    // 1010 = 10
    println("5 右移 1: " + (a shr 1))    // 010 = 2
    println("5 取反: " + a.inv())

    println()

    // 8. 时间相关工具
    println("=== 时间工具 ===")

    val startTime = System.currentTimeMillis()
    Thread.sleep(100)
    val elapsed = System.currentTimeMillis() - startTime
    println("经过时间: " + elapsed + "ms")

    println()

    // 9. measureTime 测量时间
    println("=== 测量执行时间 ===")

    val result = measureTimeMillis {
        var sum = 0
        for (i in 1..1000) {
            sum += i
        }
        sum
    }

    println("结果: " + result.second)
    println("耗时: " + result.first + "ms")

    println()

    // 10. 其他实用函数
    println("=== 其他实用函数 ===")

    // 交换值
    var x = 1
    var y = 2
    println("交换前: x=$x, y=$y")
    x = y.also { y = x }
    println("交换后: x=$x, y=$y")

    println()

    // 数组工具
    println("=== 数组工具 ===")

    val array = arrayOf(1, 2, 3, 4, 5)
    println("数组内容: " + array.contentToString())
    println("数组深度: " + array.deepToString())

    val matrix = arrayOf(
        intArrayOf(1, 2),
        intArrayOf(3, 4)
    )
    println("矩阵: " + matrix.deepToString())

    println()

    // 11. UUID 生成
    println("=== UUID ===")
    val uuid = java.util.UUID.randomUUID()
    println("随机 UUID: " + uuid)

    println()

    // 12. Base64 编码
    println("=== Base64 ===")

    val original = "Hello Kotlin"
    val encoded = java.util.Base64.getEncoder().encodeToString(original.toByteArray())
    println("编码: " + encoded)

    val decoded = String(java.util.Base64.getDecoder().decode(encoded))
    println("解码: " + decoded)
}

// 辅助函数
fun <T> measureTimeMillis(block: () -> T): Pair<Long, T> {
    val start = System.currentTimeMillis()
    val result = block()
    val elapsed = System.currentTimeMillis() - start
    return Pair(elapsed, result)
}`,
        expectedOutput: '=== 基本运算 ===\n绝对值 -5: 5\n绝对值 5.5: 5.5\n2的3次方: 8.0\n平方根 16: 4.0\n立方根 27: 3.0\ne的10次方: 22026.46...\nln(10): 2.30...\nlog10(100): 2.0\n\n=== 取整舍入 ===\nPI: 3.1415926\n向上取整: 4.0\n向下取整: 3.0\n四舍五入: 3\n截断: 3.0\n\n=== 三角函数 ===\n45度正弦: 0.70...\n45度余弦: 0.70...\n45度正切: 1.0\n\n=== 最大最小 ===\nmax(10, 20): 20\nmin(10, 20): 10\nmax(1.5, 2.5, 3.5): 3.5\n\n=== 随机数 ===\n随机 Double: [0-1之间的数]\n随机 Int(1-100): [1-100之间的数]\nRandom Int: [0-99之间的数]\nRandom Boolean: true 或 false\n\n=== 限制范围 ===\ncoerceIn(150, 0, 100): 100\ncoerceIn(-10, 0, 100): 0\ncoerceIn(50, 0, 100): 50\n\n=== 位运算 ===\n5 AND 3: 1\n5 OR 3: 7\n5 XOR 3: 6\n5 左移 1: 10\n5 右移 1: 2\n5 取反: -6\n\n=== 时间工具 ===\n经过时间: 100ms 左右\n\n=== 测量执行时间 ===\n结果: 500500\n耗时: [几毫秒]\n\n=== 其他实用函数 ===\n交换前: x=1, y=2\n交换后: x=2, y=1\n\n=== 数组工具 ===\n数组内容: [1, 2, 3, 4, 5]\n数组深度: [1, 2, 3, 4, 5]\n矩阵: [[1, 2], [3, 4]]\n\n=== UUID ===\n随机 UUID: [随机UUID格式]\n\n=== Base64 ===\n编码: SGVsbG8gS290bGlu\n解码: Hello Kotlin'
      }
    ],
    exercises: [
      {
        id: 'exercise-11-1',
        title: '使用集合操作',
        description: '使用 filter 和 map 处理数字列表',
        template: `fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    // TODO: 找出所有偶数，然后将每个偶数乘以 3
    // 结果应该是 [6, 12, 18, 24, 30]

    val result = numbers /* 补充代码 */

    println(result)
}`,
        hint: '使用 filter { it % 2 == 0 }.map { it * 3 }',
        solution: `fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    val result = numbers.filter { it % 2 == 0 }.map { it * 3 }

    println(result)
}`,
        validator: '\\[6, 12, 18, 24, 30\\]'
      },
      {
        id: 'exercise-11-2',
        title: '字符串操作',
        description: '将句子中的每个单词首字母大写',
        template: `fun main() {
    val sentence = "kotlin is awesome"

    // TODO: 将每个单词首字母大写
    // 结果应该是 "Kotlin Is Awesome"

    val result = sentence /* 补充代码 */

    println(result)
}`,
        hint: '使用 split、map 和 replaceFirstChar { it.uppercase() }',
        solution: `fun main() {
    val sentence = "kotlin is awesome"

    val result = sentence.split(" ")
        .map { it.replaceFirstChar { ch -> if (ch.isLowerCase()) ch.titlecase() else ch.toString() } }
        .joinToString(" ")

    println(result)
}`,
        validator: 'Kotlin Is Awesome'
      },
      {
        id: 'exercise-11-3',
        title: '使用 fold 聚合',
        description: '使用 fold 计算列表中所有偶数的和',
        template: `fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    // TODO: 使用 fold 计算所有偶数的和
    // 结果应该是 30 (2+4+6+8+10)

    val sum = /* 补充代码 */

    println("偶数和: " + sum)
}`,
        hint: '使用 fold(0) { acc, n -> if (n % 2 == 0) acc + n else acc }',
        solution: `fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    val sum = numbers.fold(0) { acc, n ->
        if (n % 2 == 0) acc + n else acc
    }

    println("偶数和: " + sum)
}`,
        validator: '偶数和: 30'
      }
    ]
  },

  {
    day: 12,
    title: 'DSL 与高阶技巧',
    description: '学习如何构建类型安全的 DSL',
    icon: '🎨',
    topics: ['DSL 构建', '中缀函数', '操作符重载', '属性委托'],
    difficulty: 'advanced',
    estimatedTime: 300,
    demos: [
      {
        id: 'dsl-basics',
        title: 'DSL 基础构建',
        description: '学习如何构建类型安全的领域特定语言',
        code: `fun main() {
    // === DSL 构建基础 ===

    // 1. 带接收者的 Lambda (Lambda with Receiver)
    class HTML {
        private val elements = mutableListOf<String>()

        fun body(content: HTML.() -> Unit) {
            elements.add("<body>")
            content()
            elements.add("</body>")
        }

        fun p(text: String) {
            elements.add("<p>" + text + "</p>")
        }

        fun h1(text: String) {
            elements.add("<h1>" + text + "</h1>")
        }

        fun render(): String = elements.joinToString("\\n")
    }

    fun html(build: HTML.() -> Unit): HTML {
        val html = HTML()
        html.build()
        return html
    }

    val page = html {
        h1("欢迎页面")
        p("这是一个 DSL 构建的页面")
        body {
            p("主体内容")
        }
    }

    println("=== HTML DSL ===")
    println(page.render())

    println()

    // 2. 构建器模式 DSL
    class CarBuilder {
        var brand: String = ""
        var model: String = ""
        var year: Int = 0
        var color: String = ""

        fun brand(brand: String) = apply { this.brand = brand }
        fun model(model: String) = apply { this.model = model }
        fun year(year: Int) = apply { this.year = year }
        fun color(color: String) = apply { this.color = color }

        fun build() = Car(brand, model, year, color)
    }

    data class Car(
        val brand: String,
        val model: String,
        val year: Int,
        val color: String
    )

    fun car(block: CarBuilder.() -> Unit): Car {
        val builder = CarBuilder()
        builder.block()
        return builder.build()
    }

    val myCar = car {
        brand("Tesla")
        model("Model 3")
        year(2024)
        color("红色")
    }

    println("=== Car Builder DSL ===")
    println(myCar)

    println()

    // 3. 配置 DSL
    class ConfigBuilder {
        val database = DatabaseConfig()
        val server = ServerConfig()

        fun database(block: DatabaseConfig.() -> Unit) = database.apply(block)
        fun server(block: ServerConfig.() -> Unit) = server.apply(block)

        fun build() = AppConfig(database, server)
    }

    class DatabaseConfig {
        var url: String = ""
        var username: String = ""
        var password: String = ""
        var poolSize: Int = 10

        override fun toString() = "DB(url=$url, user=$username, pool=$poolSize)"
    }

    class ServerConfig {
        var host: String = "localhost"
        var port: Int = 8080
        var threads: Int = 4

        override fun toString() = "Server(host=$host:$port, threads=$threads)"
    }

    data class AppConfig(val database: DatabaseConfig, val server: ServerConfig)

    fun config(block: ConfigBuilder.() -> Unit): AppConfig {
        val builder = ConfigBuilder()
        builder.block()
        return builder.build()
    }

    val appConfig = config {
        database {
            url = "jdbc:mysql://localhost:3306/mydb"
            username = "admin"
            password = "secret"
            poolSize = 20
        }
        server {
            host = "example.com"
            port = 443
            threads = 8
        }
    }

    println("=== Config DSL ===")
    println(appConfig.database)
    println(appConfig.server)

    println()

    // 4. 表格 DSL
    class Table {
        private val rows = mutableListOf<List<String>>()

        fun headers(vararg headers: String) {
            rows.add(headers.toList())
        }

        fun row(vararg cells: String) {
            rows.add(cells.toList())
        }

        fun render(): String {
            val sb = StringBuilder()
            for ((rowIndex, row) in rows.withIndex()) {
                sb.append("| " + row.joinToString(" | ") + " |\\n")
                if (rowIndex == 0) {
                    sb.append("|" + "-".repeat(row.joinToString(" | ").length + 2) + "|\\n")
                }
            }
            return sb.toString()
        }
    }

    fun table(block: Table.() -> Unit): Table {
        val table = Table()
        table.block()
        return table
    }

    val markdownTable = table {
        headers("姓名", "年龄", "城市")
        row("Alice", "25", "北京")
        row("Bob", "30", "上海")
        row("Charlie", "28", "深圳")
    }

    println("=== Table DSL ===")
    println(markdownTable.render())

    println()

    // 5. 路由 DSL
    class Router {
        private val routes = mutableListOf<Route>()

        fun route(path: String, block: Route.() -> Unit): Route {
            val route = Route(path)
            route.block()
            routes.add(route)
            return route
        }

        fun build() = routes.toList()
    }

    class Route(val path: String) {
        var handler: () -> String = { "Default" }
        var method: String = "GET"

        fun get(block: () -> String) { handler = block; method = "GET" }
        fun post(block: () -> String) { handler = block; method = "POST" }

        override fun toString() = "$method $path"
    }

    fun router(block: Router.() -> Unit): List<Route> {
        val router = Router()
        router.block()
        return router.build()
    }

    val routes = router {
        route("/users") {
            get { "获取用户列表" }
        }
        route("/users/{id}") {
            get { "获取用户详情" }
            post { "创建用户" }
        }
    }

    println("=== Router DSL ===")
    for (route in routes) {
        println(route)
    }
}`,
        expectedOutput: '=== HTML DSL ===\n<h1>欢迎页面</h1>\n<p>这是一个 DSL 构建的页面</p>\n<body>\n<p>主体内容</p>\n</body>\n\n=== Car Builder DSL ===\nCar(brand=Tesla, model=Model 3, year=2024, color=红色)\n\n=== Config DSL ===\nDB(url=jdbc:mysql://localhost:3306/mydb, user=admin, pool=20)\nServer(host=example.com:443, threads=8)\n\n=== Table DSL ===\n| 姓名 | 年龄 | 城市 |\n|------|------|------|\n| Alice | 25 | 北京 |\n| Bob | 30 | 上海 |\n| Charlie | 28 | 深圳 |\n\n=== Router DSL ===\nGET /users\nGET /users/{id}\nPOST /users/{id}'
      },
      {
        id: 'operator-overloading',
        title: '操作符重载',
        description: '学习如何重载 Kotlin 操作符',
        code: `fun main() {
    // === 操作符重载 ===

    // 1. 算术操作符
    data class Point(val x: Int, val y: Int) {
        operator fun plus(other: Point) = Point(x + other.x, y + other.y)
        operator fun minus(other: Point) = Point(x - other.x, y - other.y)
        operator fun times(scale: Int) = Point(x * scale, y * scale)
        operator fun unaryMinus() = Point(-x, -y)

        override fun toString() = "($x, $y)"
    }

    val p1 = Point(3, 4)
    val p2 = Point(1, 2)

    println("=== 算术操作符 ===")
    println("p1: " + p1)
    println("p2: " + p2)
    println("p1 + p2: " + (p1 + p2))
    println("p1 - p2: " + (p1 - p2))
    println("p1 * 2: " + (p1 * 2))
    println("-p1: " + (-p1))

    println()

    // 2. 比较操作符
    data class Version(val major: Int, val minor: Int, val patch: Int)
        : Comparable<Version> {

        override fun compareTo(other: Version): Int {
            if (major != other.major) return major - other.major
            if (minor != other.minor) return minor - other.minor
            return patch - other.patch
        }

        operator fun rangeTo(other: Version): VersionRange =
            VersionRange(this, other)

        override fun toString() = "$major.$minor.$patch"
    }

    class VersionRange(val start: Version, val end: Version) {
        override fun toString() = "[$start - $end]"
    }

    val v1 = Version(1, 0, 0)
    val v2 = Version(2, 1, 5)

    println("=== 比较操作符 ===")
    println("v1: " + v1)
    println("v2: " + v2)
    println("v1 < v2: " + (v1 < v2))
    println("v1 >= v1: " + (v1 >= v1))
    println("v1..v2: " + (v1..v2))

    println()

    // 3. 容器操作符
    data class Box<T>(var value: T) {
        operator fun get(index: Int): T {
            require(index == 0) { "Index must be 0" }
            return value
        }

        operator fun set(index: Int, newValue: T) {
            require(index == 0) { "Index must be 0" }
            value = newValue
        }

        operator fun contains(value: T) = this.value == value

        override fun toString() = "[$value]"
    }

    val box = Box(42)

    println("=== 容器操作符 ===")
    println("box[0]: " + box[0])
    box[0] = 100
    println("修改后: " + box)
    println("42 in box: " + (42 in box))
    println("100 in box: " + (100 in box))

    println()

    // 4. 调用操作符
    class Callable {
        var lastAction: String = ""

        operator fun invoke(): String {
            lastAction = "无参数调用"
            return "默认返回"
        }

        operator fun invoke(name: String): String {
            lastAction = "调用: " + name
            return "你好, " + name
        }

        operator fun invoke(name: String, age: Int): String {
            lastAction = "调用: $name, 年龄: $age"
            return "$name 今年 $age 岁"
        }
    }

    val callable = Callable()

    println("=== 调用操作符 ===")
    println(callable())
    println(callable("Kotlin"))
    println(callable("张三", 25))
    println("最后操作: " + callable.lastAction)

    println()

    // 5. 解构操作符
    data class Contact(val name: String, val phone: String, val email: String) {
        operator fun component1() = name
        operator fun component2() = phone
        operator fun component3() = email
    }

    val contact = Contact("张三", "13800138000", "zhang@example.com")

    println("=== 解构操作符 ===")
    val (n, p, e) = contact
    println("姓名: " + n)
    println("电话: " + p)
    println("邮箱: " + e)

    println()

    // 6. 迭代器操作符
    class DateRange(private val start: Int, private val end: Int) {
        operator fun iterator(): Iterator<Int> = (start..end).iterator()
    }

    val dateRange = DateRange(1, 5)

    println("=== 迭代器操作符 ===")
    println("日期范围: ")
    for (day in dateRange) {
        print("" + day + " ")
    }
    println()

    println()

    // 7. 逻辑操作符 (not)
    data class Condition(val value: Boolean) {
        operator fun not() = Condition(!value)

        override fun toString() = value.toString()
    }

    val condition = Condition(true)

    println("=== 逻辑操作符 ===")
    println("condition: " + condition)
    println("!condition: " + (!condition))

    println()

    // 8. 范围操作符 progressions
    infix fun Int.downTo(to: Int): IntProgression {
        return IntProgression.fromClosedRange(this, to, -1)
    }

    infix fun Int.step(step: Int): IntProgression {
        return IntProgression.fromClosedRange(this.first, this.last, this.step)
    }

    println("=== 范围操作符 ===")
    val countDown = 10 downTo 1
    println("10 downTo 1: " + countDown.toList())

    val evenNumbers = 0 step 2 step 2
    println("0..10 step 2: " + evenNumbers.toList())
}`,
        expectedOutput: '=== 算术操作符 ===\np1: (3, 4)\np2: (1, 2)\np1 + p2: (4, 6)\np1 - p2: (2, 2)\np1 * 2: (6, 8)\n-p1: (-3, -4)\n\n=== 比较操作符 ===\nv1: 1.0.0\nv2: 2.1.5\nv1 < v2: true\nv1 >= v1: true\nv1..v2: [1.0.0 - 2.1.5]\n\n=== 容器操作符 ===\nbox[0]: 42\n修改后: [100]\n42 in box: true\n100 in box: true\n\n=== 调用操作符 ===\n默认返回\n你好, Kotlin\n张三 今年 25 岁\n最后操作: 调用: 张三, 年龄: 25\n\n=== 解构操作符 ===\n姓名: 张三\n电话: 13800138000\n邮箱: zhang@example.com\n\n=== 迭代器操作符 ===\n日期范围: \n1 2 3 4 5 \n\n=== 逻辑操作符 ===\ncondition: true\n!condition: false\n\n=== 范围操作符 ===\n10 downTo 1: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]\n0..10 step 2: [0, 2, 4, 6, 8, 10]'
      },
      {
        id: 'property-delegation',
        title: '属性委托',
        description: '深入理解 Kotlin 的属性委托机制',
        code: `import kotlin.properties.Delegates
import kotlin.reflect.KProperty

fun main() {
    // === 属性委托 ===

    // 1. lazy 延迟初始化
    println("=== lazy 委托 ===")

    val expensive by lazy {
        println("  计算中...")
        "计算结果"
    }

    println("访问前")
    println("第一次: " + expensive)
    println("第二次: " + expensive)

    println()

    // 2. observable 监听属性变化
    println("=== observable 委托 ===")

    var observed by Delegates.observable("初始值") { property, oldValue, newValue ->
        println("  属性变化: $oldValue -> $newValue")
    }

    println("当前值: " + observed)
    observed = "新值1"
    observed = "新值2"

    println()

    // 3. vetoable 可否决变化
    println("=== vetoable 委托 ===")

    var age by Delegates.vetoable(0) { property, oldValue, newValue ->
        val allowed = newValue >= 0
        if (!allowed) {
            println("  拒绝: 年龄不能为负 ($newValue)")
        }
        allowed
    }

    println("年龄: " + age)
    age = 25
    println("年龄: " + age)
    age = -5
    println("年龄: " + age)  // 保持 25

    println()

    // 4. map 委托
    println("=== map 委托 ===")

    val map = mutableMapOf("name" to "Kotlin", "version" to "2.0")

    val name: String by map
    val version: String by map

    println("从 Map 读取: name=$name, version=$version")

    map["name"] = "Java"
    println("修改后: name=$name")

    println()

    // 5. 自定义委托
    println("=== 自定义委托 ===")

    class UpperCaseDelegate {
        operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
            return ""
        }

        operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
            // 将值转换为大写存储
            println("  存储大写: " + value.uppercase())
        }
    }

    class Example {
        var text: String by UpperCaseDelegate()
    }

    val example = Example()
    example.text = "hello"
    println("text: " + example.text)

    println()

    // 6. 自定义读写委托
    class ReadOnlyDelegate(private val value: String) {
        operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
            return value
        }
    }

    class ConstantExample {
        val constant: String by ReadOnlyDelegate("固定值")
    }

    val constExample = ConstantExample()
    println("常量: " + constExample.constant)

    println()

    // 7. 委托给另一个属性
    class User(val firstName: String, val lastName: String) {
        var fullName: String by Delegates.observable(firstName + " " + lastName) { _, old, _ ->
            println("  全名变化: $old -> " + firstName + " " + lastName)
        }
    }

    val user = User("John", "Doe")
    println("用户: " + user.fullName)
    user.lastName = "Smith"
    println("用户: " + user.fullName)

    println()

    // 8. 嵌套委托
    class Outer {
        var inner: String = "Outer"
        val nested by Delegates.observable(Outer::inner.get()) { _, _, _ -> }
    }

    val outer = Outer()
    println("嵌套: " + outer.nested)
    outer.inner = "Modified"
    println("嵌套: " + outer.nested)

    println()

    // 9. 自定义缓存委托
    class CachedDelegate<T>(private val initializer: () -> T) {
        private var cached: T? = null
        private var cacheTime: Long = 0

        operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
            val now = System.currentTimeMillis()
            if (cached == null || (now - cacheTime) > 1000) {
                cached = initializer()
                cacheTime = now
                println("  重新计算并缓存")
            } else {
                println("  使用缓存")
            }
            return cached!!
        }
    }

    class ExpensiveClass {
        val expensiveValue by CachedDelegate {
            println("  执行耗时计算...")
            System.currentTimeMillis()
        }
    }

    val expensive = ExpensiveClass()
    println("第一次: " + expensive.expensiveValue)
    Thread.sleep(100)
    println("第二次: " + expensive.expensiveValue)
    Thread.sleep(1100)
    println("第三次 (缓存过期): " + expensive.expensiveValue)
}`,
        expectedOutput: '=== lazy 委托 ===\n访问前\n  计算中...\n第一次: 计算结果\n第二次: 计算结果\n\n=== observable 委托 ===\n当前值: 初始值\n  属性变化: 初始值 -> 新值1\n  属性变化: 新值1 -> 新值2\n\n=== vetoable 委托 ===\n年龄: 0\n年龄: 25\n  拒绝: 年龄不能为负 (-5)\n年龄: 25\n\n=== map 委托 ===\n从 Map 读取: name=Kotlin, version=2.0\n修改后: name=Java\n\n=== 自定义委托 ===\n  存储大写: HELLO\ntext: \n\n=== 自定义读写委托 ===\n常量: 固定值\n\n用户: John Doe\n  全名变化: John Doe -> John Smith\n用户: John Smith\n\n=== 嵌套委托 ===\n嵌套: Outer\n嵌套: Modified\n\n=== 缓存委托示例 ===\n  执行耗时计算...\n第一次: [时间戳]\n  使用缓存\n第三次 (缓存过期):\n  执行耗时计算...\n'
      },
      {
        id: 'inline-functions',
        title: '内联函数与 reified',
        description: '学习 inline 和 reified 类型参数',
        code: `fun main() {
    // === 内联函数 ===

    // 1. 普通 Lambda 的类型擦除问题
    fun processNormal(list: List<*>, filter: (Any) -> Boolean): List<Any> {
        return list.filter { filter(it) }
    }

    // 2. 内联函数解决类型擦除
    inline fun processInline(list: List<*>, filter: (Any) -> Boolean): List<Any> {
        return list.filter { filter(it) }
    }

    val numbers = listOf(1, 2, 3, 4, 5)

    val result1 = processNormal(numbers) { it is Int && it > 2 }
    val result2 = processInline(numbers) { it is Int && it > 2 }

    println("=== 内联函数 ===")
    println("普通: " + result1)
    println("内联: " + result2)

    println()

    // 3. reified 类型参数
    println("=== reified 类型参数 ===")

    // 没有 reified - 需要传递 Class 对象
    fun <T> getTypeNormal(item: Any): Class<*>? {
        if (item is T) return item.javaClass
        return null
    }

    // 使用 reified - 直接访问类型
    inline fun <reified T> getTypeReified(item: Any): Class<*>? {
        return item.javaClass?.takeIf { item is T }
    }

    val str: Any = "Hello"
    println("正常方式: " + getTypeNormal<String>(str))
    println("reified 方式: " + getTypeReified<String>(str))

    println()

    // 4. reified 实际应用 - JSON 解析
    // 模拟 JSON 解析
    inline fun <reified T> parseJson(json: String): T {
        // 实际项目中会使用 Gson 或 kotlinx.serialization
        println("解析 JSON 为 " + T::class.simpleName)
        @Suppress("UNCHECKED_CAST")
        return json as T
    }

    val userJson = "{\\"name\\": \\"Kotlin\\"}"
    val user = parseJson<Map<String, String>>(userJson)
    println("解析结果: " + user)

    println()

    // 5. inline 函数中的 return
    println("=== 非局部返回 ===")

    fun processAndReturn(items: List<Int>): List<Int> {
        val result = mutableListOf<Int>()
        for (item in items) {
            result.add(item * 2)
            if (item > 5) return result  // 直接从 processAndReturn 返回
        }
        return result
    }

    fun processNormal(items: List<Int>): List<Int> {
        val processor = Processor()
        return items.map { it * 2 }.take(3)
    }

    class Processor {
        fun process(items: List<Int>, predicate: (Int) -> Boolean): List<Int> {
            return items.filter(predicate).map { it * 2 }
        }
    }

    println("处理结果: " + processAndReturn(listOf(1, 2, 3, 6)))

    println()

    // 6. noinline 和 crossinline
    inline fun process(
        items: List<Int>,
        noinline normalFunc: (Int) -> Int,
        crossinline crossFunc: (Int) -> Boolean
    ): List<Int> {
        // normalFunc 不能内联
        // crossFunc 可以内联但不能非局部返回
        return items.filter { crossFunc(it) }.map { normalFunc(it) }
    }

    val items = listOf(1, 2, 3, 4)
    val processed = process(items,
        normalFunc = { it * 2 },
        crossFunc = { it > 2 }
    )
    println("处理: " + processed)

    println()

    // 7. 内联属性
    println("=== 内联属性 ===")

    val startTime = System.currentTimeMillis()

    // 内联属性在编译时替换
    inline val elapsed: Long
        get() = System.currentTimeMillis() - startTime

    Thread.sleep(50)
    println("经过: " + elapsed + "ms")

    println()

    // 8. reified 与泛型约束结合
    inline fun <reified T : Number> convertAndCheck(value: Any): Double? {
        return when (T::class) {
            Int::class -> (value as? Int)?.toDouble()
            Double::class -> value as? Double
            Float::class -> (value as? Float)?.toDouble()
            else -> null
        }
    }

    println("=== reified 类型检查 ===")
    println("Int 转换: " + convertAndCheck<Int>(42))
    println("Double 转换: " + convertAndCheck<Double>(3.14))
    println("String 转换: " + convertAndCheck<String>("无效"))
}`,
        expectedOutput: '=== 内联函数 ==='
      }
    ],
    exercises: [
      {
        id: 'exercise-12-1',
        title: '操作符重载',
        description: '为 Money 类重载 + 和 - 操作符',
        template: `fun main() {
    data class Money(val amount: Int, val currency: String) {
        // TODO: 实现 plus 操作符
        // 两个 Money 相加，货币必须相同
        // TODO: 实现 minus 操作符

        override fun toString(): String = "\$amount $currency"
    }

    val m1 = Money(100, "USD")
    val m2 = Money(50, "USD")
    val m3 = Money(30, "EUR")

    println(m1 + m2)  // \$150 USD
    println(m1 - m2)  // \$50 USD
    // println(m1 + m3) // 应该抛出异常或返回 null
}`,
        hint: 'operator fun plus(other: Money): Money { require(currency == other.currency)... }',
        solution: `fun main() {
    data class Money(val amount: Int, val currency: String) {
        operator fun plus(other: Money): Money {
            require(currency == other.currency) { "货币必须相同" }
            return Money(amount + other.amount, currency)
        }

        operator fun minus(other: Money): Money {
            require(currency == other.currency) { "货币必须相同" }
            return Money(amount - other.amount, currency)
        }

        override fun toString(): String = "\$amount $currency"
    }

    val m1 = Money(100, "USD")
    val m2 = Money(50, "USD")

    println(m1 + m2)
    println(m1 - m2)
}`,
        validator: '\\$150 USD.*\\$50 USD'
      },
      {
        id: 'exercise-12-2',
        title: '中缀函数 DSL',
        description: '使用中缀函数构建一个简单的时间 DSL',
        template: `fun main() {
    // TODO: 实现 Date 类和 to 中缀函数
    // 让可以这样使用:
    // val date = 2023 to 12 to 25
    // println(date) // 2023-12-25

    val date = // 实现 DSL
    println(date)
}

// 辅助类和函数`,
        hint: 'class Date(val year: Int, val month: Int, val day: Int) ... infix fun Int.to(month: Int) ...',
        solution: `fun main() {
    class Date(val year: Int, val month: Int, val day: Int) {
        override fun toString() = "\$year-\$month-\$day"
    }

    infix fun Int.to(month: Int) = MonthPart(this, month)

    class MonthPart(val year: Int, val month: Int) {
        infix fun to(day: Int) = Date(year, month, day)
    }

    val date = 2023 to 12 to 25
    println(date)
}`,
        validator: '2023-12-25'
      },
      {
        id: 'exercise-12-3',
        title: '属性委托',
        description: '使用 observable 委托监听属性变化',
        template: `fun main() {
    import kotlin.properties.Delegates

    class User {
        // TODO: 为 age 添加 observable 委托
        // 当年龄变化时打印 "年龄从 $oldValue 变为 $newValue"
        // 如果新年龄小于 0，抛出 IllegalArgumentException

        var age: Int = 0
    }

    val user = User()
    user.age = 25
    println("当前年龄: " + user.age)

    user.age = 30
    println("当前年龄: " + user.age)
}`,
        hint: 'var age: Int by Delegates.observable(0) { ..., newValue -> require(newValue >= 0) }',
        solution: `fun main() {
    import kotlin.properties.Delegates

    class User {
        var age: Int by Delegates.observable(0) { _, oldValue, newValue ->
            require(newValue >= 0) { "年龄不能为负" }
            println("年龄从 $oldValue 变为 $newValue")
        }
    }

    val user = User()
    user.age = 25
    println("当前年龄: " + user.age)

    user.age = 30
    println("当前年龄: " + user.age)
}`,
        validator: '年龄从 0 变为 25.*年龄从 25 变为 30.*当前年龄: 30'
      }
    ]
  },

  {
    day: 13,
    title: '实战项目',
    description: '综合运用所学知识完成一个完整项目',
    icon: '🚀',
    topics: ['项目设计', '数据建模', '服务层', '综合实践'],
    difficulty: 'advanced',
    estimatedTime: 360,
    demos: [
      {
        id: 'todo-data-model',
        title: '数据模型设计',
        description: '使用数据类、密封类和枚举设计待办事项的数据模型',
        code: `fun main() {
    // === 实战项目：待办事项管理系统 ===

    // 1. 优先级枚举
    enum class Priority(val value: Int, val displayName: String) {
        LOW(1, "低"),
        MEDIUM(2, "中"),
        HIGH(3, "高"),
        URGENT(4, "紧急");

        companion object {
            fun fromValue(value: Int): Priority? =
                entries.find { it.value == value }
        }
    }

    // 2. 待办事项状态
    sealed class TodoStatus {
        data object Pending : TodoStatus()
        data object InProgress : TodoStatus()
        data object Completed : TodoStatus()
        data object Cancelled : TodoStatus()

        val displayName: String
            get() = when (this) {
                is Pending -> "待处理"
                is InProgress -> "进行中"
                is Completed -> "已完成"
                is Cancelled -> "已取消"
            }
    }

    // 3. 待办事项数据类
    data class Todo(
        val id: String,
        val title: String,
        val description: String = "",
        val priority: Priority = Priority.MEDIUM,
        val status: TodoStatus = TodoStatus.Pending,
        val createdAt: Long = System.currentTimeMillis(),
        val dueDate: Long? = null,
        val tags: Set<String> = emptySet()
    ) {
        val isOverdue: Boolean
            get() = dueDate != null &&
                     dueDate < System.currentTimeMillis() &&
                     status !is TodoStatus.Completed

        fun copyWithStatus(newStatus: TodoStatus): Todo =
            copy(status = newStatus)

        fun copyWithPriority(newPriority: Priority): Todo =
            copy(priority = newPriority)
    }

    // 4. 创建示例数据
    val todo1 = Todo(
        id = "1",
        title = "学习 Kotlin 协程",
        description = "深入理解协程的工作原理",
        priority = Priority.HIGH,
        status = TodoStatus.InProgress,
        tags = setOf("kotlin", "异步")
    )

    val todo2 = Todo(
        id = "2",
        title = "完成项目文档",
        priority = Priority.MEDIUM,
        dueDate = System.currentTimeMillis() - 1000000, // 过期
        tags = setOf("文档")
    )

    // 5. 使用数据类
    println("=== 待办事项 ===")
    println(todo1)
    println()
    println("标题: " + todo1.title)
    println("优先级: " + todo1.priority.displayName)
    println("状态: " + todo1.status.displayName)
    println("标签: " + todo1.tags.joinToString(", "))
    println("是否过期: " + todo1.isOverdue)
    println()

    // 6. 使用密封类 when 表达式
    fun getStatusIcon(status: TodoStatus): String =
        when (status) {
            is TodoStatus.Pending -> "⏳"
            is TodoStatus.InProgress -> "🔄"
            is TodoStatus.Completed -> "✅"
            is TodoStatus.Cancelled -> "❌"
        }

    println("=== 状态图标 ===")
    println(getStatusIcon(todo1.status) + " " + todo1.title)
    println(getStatusIcon(todo2.status) + " " + todo2.title + " (过期: " + todo2.isOverdue + ")")

    println()

    // 7. 数据类解构
    val (id, title, _, priority, status) = todo1
    println("=== 解构赋值 ===")
    println("ID: $id, 标题: $title, 优先级: \${priority.displayName}")
}`,
        expectedOutput: '=== 待办事项 ===\nTodo(id=1, title=学习 Kotlin 协程, description=深入理解协程的工作原理, priority=HIGH, status=InProgress, createdAt='
      },
      {
        id: 'todo-service-layer',
        title: '服务层实现',
        description: '实现待办事项的管理服务，包含 CRUD 操作和查询功能',
        code: `fun main() {
    // === 服务层：TodoManager ===

    // 数据模型
    enum class Priority(val value: Int) {
        LOW(1), MEDIUM(2), HIGH(3), URGENT(4)
    }

    sealed class TodoStatus {
        data object Pending : TodoStatus()
        data object InProgress : TodoStatus()
        data object Completed : TodoStatus()
    }

    data class Todo(
        val id: String,
        val title: String,
        val priority: Priority = Priority.MEDIUM,
        val status: TodoStatus = TodoStatus.Pending
    )

    // 管理器类
    class TodoManager {
        private val todos: MutableMap<String, Todo> = mutableMapOf()
        private var nextId: Int = 1

        // 创建
        fun create(title: String, priority: Priority = Priority.MEDIUM): Todo {
            val todo = Todo(
                id = nextId++.toString(),
                title = title,
                priority = priority
            )
            todos[todo.id] = todo
            return todo
        }

        // 查询单个
        fun getById(id: String): Todo? = todos[id]

        // 查询全部
        fun getAll(): List<Todo> = todos.values.toList()

        // 按状态查询
        fun getByStatus(status: TodoStatus): List<Todo> =
            todos.values.filter { it.status == status }

        // 按优先级排序
        fun getByPriority(): List<Todo> =
            todos.values.sortedByDescending { it.priority.value }

        // 更新
        fun update(id: String, newTitle: String): Boolean {
            val todo = todos[id] ?: return false
            todos[id] = todo.copy(title = newTitle)
            return true
        }

        fun updateStatus(id: String, newStatus: TodoStatus): Boolean {
            val todo = todos[id] ?: return false
            todos[id] = todo.copy(status = newStatus)
            return true
        }

        // 删除
        fun delete(id: String): Boolean = todos.remove(id) != null

        // 统计
        fun getStats(): Map<String, Int> = mapOf(
            "total" to todos.size,
            "pending" to getByStatus(TodoStatus.Pending).size,
            "inProgress" to getByStatus(TodoStatus.InProgress).size,
            "completed" to getByStatus(TodoStatus.Completed).size
        )
    }

    // === 使用服务 ===
    val manager = TodoManager()

    // 创建待办事项
    val todo1 = manager.create("学习 Kotlin 基础", Priority.HIGH)
    val todo2 = manager.create("完成练习题", Priority.MEDIUM)
    val todo3 = manager.create("阅读官方文档", Priority.LOW)

    println("=== 创建完成 ===")
    manager.getAll().forEach { todo ->
        println("[id=\${todo.id}] \${todo.title} - \${todo.priority}")
    }

    println()

    // 更新状态
    manager.updateStatus(todo1.id, TodoStatus.InProgress)
    manager.updateStatus(todo2.id, TodoStatus.Completed)

    println("=== 按优先级排序 ===")
    manager.getByPriority().forEach { todo ->
        val status = when (todo.status) {
            is TodoStatus.Pending -> "待处理"
            is TodoStatus.InProgress -> "进行中"
            is TodoStatus.Completed -> "已完成"
        }
        println("[\${todo.priority}] \${todo.title} - $status")
    }

    println()

    // 统计信息
    println("=== 统计信息 ===")
    val stats = manager.getStats()
    println("总数: \${stats["total"]}")
    println("待处理: \${stats["pending"]}")
    println("进行中: \${stats["inProgress"]}")
    println("已完成: \${stats["completed"]}")

    println()

    // 删除
    val deleted = manager.delete(todo3.id)
    println("删除成功: $deleted")
    println("剩余数量: \${manager.getAll().size}")
}`,
        expectedOutput: '=== 创建完成 ==='
      },
      {
        id: 'todo-terminal-ui',
        title: '终端 UI 实现',
        description: '构建简单的命令行界面，支持用户交互操作',
        code: `fun main() {
    // === 终端 UI：TodoApp ===

    // 数据模型
    enum class Priority { LOW, MEDIUM, HIGH, URGENT }

    sealed class TodoStatus {
        data object Pending : TodoStatus()
        data object InProgress : TodoStatus()
        data object Completed : TodoStatus()
    }

    data class Todo(
        val id: Int,
        val title: String,
        val priority: Priority,
        val status: TodoStatus
    )

    // UI 渲染器
    class TodoRenderer {
        private val separator = "─".repeat(50)

        fun renderHeader(title: String) {
            println()
            println(separator)
            println("  $title")
            println(separator)
        }

        fun renderMenu(options: List<String>) {
            println()
            options.forEach { option ->
                println("  $option")
            }
            println(separator)
        }

        fun renderTodoList(todos: List<Todo>) {
            if (todos.isEmpty()) {
                println("  暂无待办事项")
            } else {
                todos.forEach { todo ->
                    val statusIcon = when (todo.status) {
                        is TodoStatus.Pending -> "[ ]"
                        is TodoStatus.InProgress -> "[~]"
                        is TodoStatus.Completed -> "[x]"
                    }
                    val priorityBadge = when (todo.priority) {
                        Priority.LOW -> "🔵"
                        Priority.MEDIUM -> "🟡"
                        Priority.HIGH -> "🟠"
                        Priority.URGENT -> "🔴"
                    }
                    println("  $statusIcon \${todo.id}. $priorityBadge \${todo.title}")
                }
            }
            println(separator)
        }

        fun renderStats(stats: Map<String, Int>) {
            println("  📊 统计: 总计 \${stats["total"]} | " +
                    "待办 \${stats["pending"]} | " +
                    "进行 \${stats["inProgress"]} | " +
                    "完成 \${stats["completed"]}")
            println(separator)
        }
    }

    // 应用控制器
    class TodoApp {
        private val renderer = TodoRenderer()
        private val todos = mutableListOf<Todo>()
        private var nextId = 1

        fun start() {
            renderer.renderHeader("📝 待办事项管理")

            // 添加示例数据
            addTodo("完成 Kotlin 学习", Priority.HIGH)
            addTodo("编写项目代码", Priority.URGENT)
            addTodo("阅读技术文档", Priority.LOW)

            // 显示主菜单
            showMainMenu()
        }

        private fun showMainMenu() {
            renderer.renderMenu(listOf(
                "1. 查看所有待办",
                "2. 添加新待办",
                "3. 标记完成",
                "4. 退出"
            ))

            // 模拟选择查看所有
            showAllTodos()
        }

        private fun showAllTodos() {
            renderer.renderHeader("📋 我的待办列表")
            renderer.renderTodoList(todos)

            val stats = mapOf(
                "total" to todos.size,
                "pending" to todos.count { it.status is TodoStatus.Pending },
                "inProgress" to todos.count { it.status is TodoStatus.InProgress },
                "completed" to todos.count { it.status is TodoStatus.Completed }
            )
            renderer.renderStats(stats)
        }

        private fun addTodo(title: String, priority: Priority) {
            todos.add(Todo(nextId++, title, priority, TodoStatus.Pending))
        }
    }

    // === 运行应用 ===
    val app = TodoApp()
    app.start()
}`,
        expectedOutput: '📝 待办事项管理'
      },
      {
        id: 'todo-advanced-features',
        title: '高级功能实现',
        description: '添加搜索、过滤、标签等高级功能',
        code: `fun main() {
    // === 高级功能：搜索与过滤 ===

    // 数据模型
    enum class Priority { LOW, MEDIUM, HIGH }
    sealed class TodoStatus { data object Pending : TodoStatus(); data object Completed : TodoStatus() }

    data class Todo(
        val id: Int,
        val title: String,
        val description: String,
        val priority: Priority,
        val status: TodoStatus,
        val tags: List<String> = emptyList()
    )

    // 存储库
    class TodoRepository {
        private val todos = mutableListOf(
            Todo(1, "学习 Kotlin", "学习 Kotlin 基础语法", Priority.HIGH, TodoStatus.Pending, listOf("学习", "Kotlin")),
            Todo(2, "完成项目", "完成本周项目开发", Priority.MEDIUM, TodoStatus.InProgress, listOf("工作", "项目")),
            Todo(3, "健身", "每周三次健身", Priority.LOW, TodoStatus.Pending, listOf("健康", "运动")),
            Todo(4, "阅读", "阅读技术书籍", Priority.MEDIUM, TodoStatus.Completed, listOf("学习", "阅读")),
            Todo(5, "学习 Kotlin 进阶", "深入学习 Kotlin 高级特性", Priority.HIGH, TodoStatus.Pending, listOf("学习", "Kotlin"))
        )

        // 1. 关键词搜索
        fun search(keyword: String): List<Todo> =
            todos.filter { todo ->
                todo.title.contains(keyword, ignoreCase = true) ||
                todo.description.contains(keyword, ignoreCase = true)
            }

        // 2. 按标签过滤
        fun filterByTag(tag: String): List<Todo> =
            todos.filter { it.tags.any { t -> t.equals(tag, ignoreCase = true) } }

        // 3. 按优先级过滤
        fun filterByPriority(priority: Priority): List<Todo> =
            todos.filter { it.priority == priority }

        // 4. 按状态过滤
        fun filterByStatus(status: TodoStatus): List<Todo> =
            todos.filter { it.status == status }

        // 5. 组合过滤（使用高阶函数）
        fun filter(
            predicate: (Todo) -> Boolean = { true }
        ): List<Todo> = todos.filter(predicate)

        // 6. 获取所有标签
        fun getAllTags(): Set<String> =
            todos.flatMap { it.tags }.toSet()

        // 7. 获取待办统计
        fun getStats(): TodoStats {
            return TodoStats(
                total = todos.size,
                byPriority = Priority.entries.associateWith { p ->
                    todos.count { it.priority == p }
                },
                byStatus = mapOf(
                    "pending" to todos.count { it.status is TodoStatus.Pending },
                    "completed" to todos.count { it.status is TodoStatus.Completed }
                )
            )
        }
    }

    // 统计数据类
    data class TodoStats(
        val total: Int,
        val byPriority: Map<Priority, Int>,
        val byStatus: Map<String, Int>
    )

    // === 使用示例 ===
    val repo = TodoRepository()

    println("=== 1. 关键词搜索 'Kotlin' ===")
    repo.search("Kotlin").forEach { println("  - \${it.title}") }

    println()
    println("=== 2. 按标签过滤 '学习' ===")
    repo.filterByTag("学习").forEach { println("  - \${it.title}") }

    println()
    println("=== 3. 按优先级过滤 HIGH ===")
    repo.filterByPriority(Priority.HIGH).forEach { println("  - \${it.title}") }

    println()
    println("=== 4. 组合过滤：高优先级 + 待处理 ===")
    repo.filter { it.priority == Priority.HIGH && it.status is TodoStatus.Pending }
        .forEach { println("  - \${it.title}") }

    println()
    println("=== 5. 所有标签 ===")
    println(repo.getAllTags().sorted().joinToString(", "))

    println()
    println("=== 6. 统计信息 ===")
    val stats = repo.getStats()
    println("总计: \${stats.total}")
    println("按优先级: \${stats.byPriority}")
    println("按状态: \${stats.byStatus}")
}`,
        expectedOutput: '=== 1. 关键词搜索 \'Kotlin\' ===\n  - 学习 Kotlin\n  - 学习 Kotlin 进阶'
      }
    ],
    exercises: [
      {
        id: 'ex-13-1',
        title: '添加标签管理功能',
        description: '在 TodoManager 中添加按标签查询待办事项的功能，支持添加和移除标签。',
        template: `fun main() {
    // 为 TodoManager 添加标签管理功能

    data class Todo(
        val id: String,
        val title: String,
        val tags: Set<String> = emptySet()
    )

    class TodoManager {
        private val todos: MutableMap<String, Todo> = mutableMapOf()

        fun create(title: String, vararg tags: String): Todo {
            val todo = Todo(
                id = java.util.UUID.randomUUID().toString(),
                title = title,
                tags = tags.toSet()
            )
            todos[todo.id] = todo
            return todo
        }

        // TODO: 实现以下方法

        // 1. 按标签查询
        fun findByTag(tag: String): List<Todo> {
            // 实现按标签查询逻辑
        }

        // 2. 添加标签
        fun addTag(todoId: String, tag: String): Boolean {
            // 实现添加标签逻辑
        }

        // 3. 移除标签
        fun removeTag(todoId: String, tag: String): Boolean {
            // 实现移除标签逻辑
        }
    }

    // 测试代码
    val manager = TodoManager()
    val todo1 = manager.create("学习 Kotlin", "编程", "学习")
    val todo2 = manager.create("健身", "健康")

    println("按标签 '学习' 查询:")
    manager.findByTag("学习").forEach { println(it.title) }

    manager.addTag(todo2.id, "运动")
    println("添加标签后:")
    manager.findByTag("运动").forEach { println(it.title) }
}`,
        hint: '使用 MutableSet 的 add 和 remove 方法操作标签集合。',
        solution: `fun main() {
    data class Todo(
        val id: String,
        val title: String,
        val tags: Set<String> = emptySet()
    )

    class TodoManager {
        private val todos: MutableMap<String, Todo> = mutableMapOf()

        fun create(title: String, vararg tags: String): Todo {
            val todo = Todo(
                id = java.util.UUID.randomUUID().toString(),
                title = title,
                tags = tags.toSet()
            )
            todos[todo.id] = todo
            return todo
        }

        // 1. 按标签查询
        fun findByTag(tag: String): List<Todo> {
            return todos.values.filter { it.tags.contains(tag) }
        }

        // 2. 添加标签
        fun addTag(todoId: String, tag: String): Boolean {
            val todo = todos[todoId] ?: return false
            todos[todoId] = todo.copy(tags = todo.tags + tag)
            return true
        }

        // 3. 移除标签
        fun removeTag(todoId: String, tag: String): Boolean {
            val todo = todos[todoId] ?: return false
            todos[todoId] = todo.copy(tags = todo.tags - tag)
            return true
        }
    }

    val manager = TodoManager()
    val todo1 = manager.create("学习 Kotlin", "编程", "学习")
    val todo2 = manager.create("健身", "健康")

    println("按标签 '学习' 查询:")
    manager.findByTag("学习").forEach { println(it.title) }

    manager.addTag(todo2.id, "运动")
    println("添加标签后:")
    manager.findByTag("运动").forEach { println(it.title) }
}`,
        validator: '学习 Kotlin.*运动'
      },
      {
        id: 'ex-13-2',
        title: '实现待办事项持久化',
        description: '使用 Map 和序列化实现简单的待办事项持久化存储。',
        template: `fun main() {
    // 实现 TodoRepository 的持久化功能

    data class Todo(
        val id: Int,
        val title: String,
        val completed: Boolean = false
    )

    class TodoRepository {
        private val todos = mutableListOf<Todo>()
        private var nextId = 1

        // 创建待办
        fun create(title: String): Todo {
            val todo = Todo(nextId++, title)
            todos.add(todo)
            return todo
        }

        // 标记完成
        fun complete(id: Int): Boolean {
            val index = todos.indexOfFirst { it.id == id }
            if (index >= 0) {
                todos[index] = todos[index].copy(completed = true)
                return true
            }
            return false
        }

        // TODO: 实现导出功能
        // 将待办列表转换为可存储的字符串格式
        fun exportToString(): String {
            // 格式示例: "1,Task1,true;2,Task2,false"
        }

        // TODO: 实现导入功能
        // 从字符串恢复待办列表
        fun importFromString(data: String): Int {
            // 返回成功导入的数量
        }

        fun getAll(): List<Todo> = todos.toList()
    }

    // 测试代码
    val repo = TodoRepository()
    repo.create("学习 Kotlin")
    repo.create("完成项目")
    repo.complete(1)

    val data = repo.exportToString()
    println("导出数据: $data")

    val newRepo = TodoRepository()
    val count = newRepo.importFromString(data)
    println("导入 $count 条数据")
    newRepo.getAll().forEach { println(it) }
}`,
        hint: '使用 joinToString 和 split/ map 函数进行序列化和反序列化。',
        solution: `fun main() {
    data class Todo(
        val id: Int,
        val title: String,
        val completed: Boolean = false
    )

    class TodoRepository {
        private val todos = mutableListOf<Todo>()
        private var nextId = 1

        fun create(title: String): Todo {
            val todo = Todo(nextId++, title)
            todos.add(todo)
            return todo
        }

        fun complete(id: Int): Boolean {
            val index = todos.indexOfFirst { it.id == id }
            if (index >= 0) {
                todos[index] = todos[index].copy(completed = true)
                return true
            }
            return false
        }

        fun exportToString(): String {
            return todos.joinToString(";") { todo ->
                "\${todo.id},\${todo.title},\${todo.completed}"
            }
        }

        fun importFromString(data: String): Int {
            if (data.isBlank()) return 0
            var count = 0
            data.split(";").forEach { part ->
                val fields = part.split(",")
                if (fields.size == 3) {
                    val todo = Todo(
                        id = fields[0].toInt(),
                        title = fields[1],
                        completed = fields[2].toBoolean()
                    )
                    todos.add(todo)
                    nextId = maxOf(nextId, todo.id + 1)
                    count++
                }
            }
            return count
        }

        fun getAll(): List<Todo> = todos.toList()
    }

    val repo = TodoRepository()
    repo.create("学习 Kotlin")
    repo.create("完成项目")
    repo.complete(1)

    val data = repo.exportToString()
    println("导出数据: $data")

    val newRepo = TodoRepository()
    val count = newRepo.importFromString(data)
    println("导入 $count 条数据")
    newRepo.getAll().forEach { println(it) }
}`,
        validator: '导入 2 条数据.*Todo\\(id=1.*completed=true\\)'
      },
      {
        id: 'ex-13-3',
        title: '实现命令解析器',
        description: '创建一个命令解析器，支持用户输入命令来操作待办事项。',
        template: `fun main() {
    // 实现简单的命令解析器

    data class Command(
        val action: String,
        val args: List<String>
    )

    class CommandParser {
        // TODO: 实现命令解析
        // 支持的命令格式:
        // add <title>           - 添加待办
        // done <id>             - 标记完成
        // list                  - 列出所有
        // delete <id>           - 删除
        // help                  - 显示帮助

        fun parse(input: String): Command? {
            // 解析输入字符串为 Command
        }
    }

    // 测试代码
    val parser = CommandParser()

    val commands = listOf(
        "add 学习 Kotlin",
        "done 1",
        "list",
        "delete 2",
        "help",
        "invalid command"
    )

    commands.forEach { input ->
        val cmd = parser.parse(input)
        if (cmd != null) {
            println("命令: \${cmd.action}, 参数: \${cmd.args.joinToString()}")
        } else {
            println("无法解析: $input")
        }
    }
}`,
        hint: '使用 split 和 trim 分割输入，第一个单词是 action，其余是 args。',
        solution: `fun main() {
    data class Command(
        val action: String,
        val args: List<String>
    )

    class CommandParser {
        fun parse(input: String): Command? {
            val trimmed = input.trim()
            if (trimmed.isEmpty()) return null

            val parts = trimmed.split("\\s+".toRegex())
            val action = parts[0].lowercase()
            val args = parts.drop(1)

            return Command(action, args)
        }
    }

    val parser = CommandParser()

    val commands = listOf(
        "add 学习 Kotlin",
        "done 1",
        "list",
        "delete 2",
        "help",
        "invalid command"
    )

    commands.forEach { input ->
        val cmd = parser.parse(input)
        if (cmd != null) {
            println("命令: \${cmd.action}, 参数: \${cmd.args.joinToString()}")
        } else {
            println("无法解析: $input")
        }
    }
}`,
        validator: '命令: add.*命令: done.*命令: list.*命令: delete.*命令: help'
      }
    ]
  },

  {
    day: 14,
    title: '最佳实践',
    description: '学习 Kotlin 的编码规范和最佳实践',
    icon: '✨',
    topics: ['命名规范', '代码组织', '性能优化', '测试入门'],
    difficulty: 'intermediate',
    estimatedTime: 240,
    demos: [
      {
        id: 'naming-conventions',
        title: '命名规范',
        description: '学习 Kotlin 官方推荐的命名约定',
        code: `fun main() {
    // === Kotlin 命名规范 ===

    println("=== 1. 包名 ===")
    // 全小写，不使用下划线
    // 推荐: com.example.project
    // 避免: com.example.myProject

    println("包名应该: 全小写，使用点分隔")
    println("示例: com.example.app.core")

    println()
    println("=== 2. 类名和接口名 ===")
    // 大驼峰命名法 (PascalCase)
    class UserController { }
    interface UserRepository { }
    abstract class BaseService { }

    println("类/接口应该: 大驼峰，名词")
    println("示例: UserController, UserRepository")

    println()
    println("=== 3. 函数名 ===")
    // 小驼峰命名法 (camelCase)，动词开头
    fun getUserById(id: Int): String? = null
    fun calculateSum(a: Int, b: Int): Int = a + b
    fun processData(): Unit = println("处理数据")

    println("函数应该: 小驼峰，动词开头")
    println("示例: getUserById, calculateSum")

    println()
    println("=== 4. 变量名 ===")
    // 小驼峰命名法 (camelCase)
    val userName = "张三"
    var isActive = true
    val maxCount = 100

    println("变量应该: 小驼峰，描述性强")
    println("示例: userName, isActive, maxCount")

    println()
    println("=== 5. 常量名 ===")
    // 全大写，下划线分隔
    const val MAX_RETRY_COUNT = 3
    const val DEFAULT_TIMEOUT = 5000

    println("常量应该: 全大写，下划线分隔")
    println("示例: MAX_RETRY_COUNT, DEFAULT_TIMEOUT")

    println()
    println("=== 6. 枚举类 ===")
    // 大驼峰命名法
    enum class Status { Active, Inactive, Pending }

    println("枚举值应该: 大驼峰")
    println("示例: Status.Active, Status.Inactive")

    println()
    println("=== 7. 扩展函数 ===")
    // 接收者类型名 + 功能描述
    fun String.isValidEmail(): Boolean = this.contains("@")

    println("扩展函数应该: 描述作用")
    println("示例: String.isValidEmail, List.filterValid")

    println()
    println("=== 8. 密封类子类 ===")
    sealed class NetworkResult
    data class Success(val data: String) : NetworkResult()
    data class Error(val message: String) : NetworkResult()
    data object Loading : NetworkResult()

    println("密封类子类应该: 大驼峰")
    println("示例: Success, Error, Loading")

    println()
    println("=== 9. 后备属性 ===")
    // 使用下划线前缀表示后备属性
    class Person {
        private val _items = mutableListOf<String>()
        val items: List<String> get() = _items
    }

    println("后备属性应该: 下划线前缀")
    println("示例: private val _items")

    println()
    println("=== 10. 好的命名 vs 不好的命名 ===")
    println("不好: d, tmp, data, info")
    println("好: user, userData, userRepository")
    println()
    println("不好: flag, status, check")
    println("好: isValid, hasPermission, canExecute")
}`,
        expectedOutput: '=== Kotlin 命名规范 ===\n=== 1. 包名 ==='
      },
      {
        id: 'code-organization',
        title: '代码组织',
        description: '学习如何组织 Kotlin 代码结构',
        code: `fun main() {
    // === 代码组织最佳实践 ===

    println("=== 1. 单一职责原则 ===")
    // 每个类/函数应该只做一件事

    // ❌ 不好的设计
    class BadUserService {
        fun saveUser() { }
        fun sendEmail() { }
        fun logActivity() { }
    }

    // ✅ 好的设计
    class UserService {
        fun save(user: User) = println("保存用户: " + user.name)
    }
    class EmailService {
        fun send(email: String) = println("发送邮件: $email")
    }
    class Logger {
        fun log(message: String) = println("日志: $message")
    }

    data class User(val name: String, val email: String)

    println("每个类只负责一件事")

    println()
    println("=== 2. 数据类与业务逻辑分离 ===")

    // ✅ 数据类只包含数据
    data class Article(
        val id: String,
        val title: String,
        val content: String
    )

    // ✅ 业务逻辑放在扩展函数或单独的类中
    class ArticleValidator {
        fun isValid(article: Article): Boolean {
            return article.title.isNotBlank() &&
                   article.content.length >= 10
        }
    }

    println("数据类和业务逻辑分离")

    println()
    println("=== 3. 使用扩展函数组织代码 ===")

    // 为不同类型的功能定义不同的扩展文件
    fun String.toInitialCase(): String =
        this.lowercase().replaceFirstChar { it.uppercase() }

    fun List<String>.formatList(): String =
        this.joinToString(", ") { it.toInitialCase() }

    val words = listOf("APPLE", "BANANA", "CHERRY")
    println(words.formatList())

    println()
    println("=== 4. 工厂函数 vs 构造函数 ===")

    // ✅ 使用工厂函数提供语义化的创建方式
    class Config private constructor(
        val host: String,
        val port: Int
    ) {
        companion object {
            fun forDevelopment() = Config("localhost", 8080)
            fun forProduction() = Config("api.example.com", 443)
            fun custom(host: String, port: Int) = Config(host, port)
        }

        override fun toString(): String = "Config($host:$port)"
    }

    println("开发配置: " + Config.forDevelopment())
    println("生产配置: " + Config.forProduction())

    println()
    println("=== 5. 使用密封类管理状态 ===")

    sealed class UiState<out T> {
        data object Idle : UiState<Nothing>()
        data object Loading : UiState<Nothing>()
        data class Success<T>(val data: T) : UiState<T>()
        data class Error(val message: String) : UiState<Nothing>()
    }

    fun <T> render(state: UiState<T>): String =
        when (state) {
            is UiState.Idle -> "空闲状态"
            is UiState.Loading -> "加载中..."
            is UiState.Success -> "成功: \${state.data}"
            is UiState.Error -> "错误: \${state.message}"
        }

    println(render(UiState.Idle))
    println(render(UiState.Success("数据已加载")))
    println(render(UiState.Error("网络错误")))

    println()
    println("=== 6. 参数对象模式 ===")

    // ❌ 参数太多
    fun badCreateUser(
        name: String,
        email: String,
        age: Int,
        city: String,
        country: String
    ) = println("创建用户...")

    // ✅ 使用数据类封装参数
    data class CreateUserRequest(
        val name: String,
        val email: String,
        val age: Int,
        val address: Address
    )

    data class Address(
        val city: String,
        val country: String
    )

    fun createUser(request: CreateUserRequest) =
        println("创建用户: " + request.name)

    println("使用参数对象减少函数参数数量")
}`,
        expectedOutput: '=== 代码组织最佳实践 ==='
      },
      {
        id: 'performance-tips',
        title: '性能优化技巧',
        description: '学习 Kotlin 性能优化的实用技巧',
        code: `fun main() {
    // === Kotlin 性能优化 ===

    println("=== 1. 避免不必要的对象创建 ===")

    // ❌ 每次循环都创建新对象
    fun badProcess() {
        for (i in 1..100) {
            val regex = Regex("\\d+")  // 每次都创建
            regex.matches("123")
        }
    }

    // ✅ 重用对象
    fun goodProcess() {
        val regex = Regex("\\d+")  // 只创建一次
        for (i in 1..100) {
            regex.matches("123")
        }
    }

    println("在循环外重用对象")

    println()
    println("=== 2. 使用 Sequence 处理大数据集 ===")

    val largeList = (1..100000).toList()

    // List: 每次操作都创建新集合
    val listResult = largeList
        .filter { it % 2 == 0 }
        .map { it * 2 }
        .take(10)

    println("List 结果: " + listResult)

    // Sequence: 惰性求值，链式操作
    val seqResult = largeList
        .asSequence()
        .filter { it % 2 == 0 }
        .map { it * 2 }
        .take(10)
        .toList()

    println("Sequence 结果: " + seqResult)
    println("大数据集使用 Sequence 更高效")

    println()
    println("=== 3. 使用基本类型数组 ===")

    // ❌ 装箱类型列表
    val boxedInts = listOf(1, 2, 3, 4, 5)
    println("装箱: " + boxedInts.javaClass)

    // ✅ 基本类型数组
    val primitiveInts = intArrayOf(1, 2, 3, 4, 5)
    println("基本类型: " + primitiveInts.javaClass)

    println("使用基本类型数组减少内存开销")

    println()
    println("=== 4. 延迟初始化 ===")

    class MyClass {
        // ✅ 延迟初始化非空属性
        private val heavyResource by lazy {
            println("初始化重资源...")
            "重资源数据"
        }

        // ✅ 延迟初始化可空属性
        private var cache: String? = null

        fun getData(): String {
            if (cache == null) {
                cache = "计算后的数据"
            }
            return cache!!
        }

        fun getResource(): String = heavyResource
    }

    val obj = MyClass()
    println("创建对象完成")
    println("第一次访问: " + obj.getResource())
    println("第二次访问: " + obj.getResource())

    println()
    println("=== 5. 使用 inline 函数 ===")

    // inline 函数避免 lambda 分配
    inline fun measureTime(operation: () -> Unit): Long {
        val start = System.nanoTime()
        operation()
        return System.nanoTime() - start
    }

    val time = measureTime {
        var sum = 0
        for (i in 1..1000) sum += i
    }
    println("执行时间: \${time / 1_000_000}ms")

    println()
    println("=== 6. 选择正确的集合类型 ===")

    // List - 有序，可重复
    val list = listOf(1, 2, 2, 3)
    println("List: " + list)

    // Set - 无序，不重复
    val set = setOf(1, 2, 2, 3)
    println("Set: " + set)

    // Map - 键值对
    val map = mapOf("key1" to 1, "key2" to 2)
    println("Map: " + map)

    println("根据需求选择合适的集合类型")

    println()
    println("=== 7. 使用 StringBuilder ===")

    // ❌ 字符串拼接在循环中效率低
    fun badBuild(n: Int): String {
        var result = ""
        for (i in 1..n) {
            result += i
        }
        return result
    }

    // ✅ 使用 StringBuilder
    fun goodBuild(n: Int): String {
        val sb = StringBuilder()
        for (i in 1..n) {
            sb.append(i)
        }
        return sb.toString()
    }

    println("大量字符串拼接使用 StringBuilder")
}`,
        expectedOutput: '=== Kotlin 性能优化 ==='
      },
      {
        id: 'java-interop',
        title: 'Java 互操作与测试',
        description: '学习与 Java 代码互操作和基础测试技巧',
        code: `fun main() {
    // === Java 互操作与最佳实践 ===

    println("=== 1. 使用 @JvmName 避免签名冲突 ===")

    @JvmName("filterValidStrings")
    fun List<String>.filterValid(): List<String> =
        this.filter { it.isNotEmpty() }

    val strings = listOf("a", "", "b", "", "c")
    println("有效字符串: " + strings.filterValid())

    println()
    println("=== 2. @JvmOverloads 生成重载 ===")

    // 自动生成多个重载方法供 Java 调用
    @JvmOverloads
    fun createUser(
        name: String,
        age: Int = 0,
        email: String = ""
    ) = println("User: $name, $age, $email")

    createUser("张三")
    createUser("李四", 25)
    createUser("王五", 30, "wang@example.com")

    println()
    println("=== 3. @JvmStatic 静态方法 ===")

    class KotlinUtils {
        companion object {
            @JvmStatic
            fun greet(name: String) = println("Hello, $name!")

            fun farewell(name: String) = println("Goodbye, $name!")
        }
    }

    // 从 Java 调用: KotlinUtils.greet("World")
    KotlinUtils.greet("World")

    println()
    println("=== 4. 使用 @JvmField 暴露字段 ===")

    class Config {
        @JvmField
        val DEBUG_MODE = true

        val version = "1.0.0"  // 自动生成 getter
    }

    println("Debug: " + Config().DEBUG_MODE)

    println()
    println("=== 5. 空安全与 Java 互操作 ===")

    // 处理 Java 可空类型
    fun processJavaString(javaStr: String?): String {
        // 使用 ?: 提供默认值
        val safeStr = javaStr ?: "default"
        return safeStr
    }

    println("处理 null: " + processJavaString(null))
    println("处理有效值: " + processJavaString("Hello"))

    println()
    println("=== 6. 使用类型别名简化代码 ===")

    // 类型别名
    typealias UserId = String
    typealias UserName = String
    typealias ErrorHandler = (Exception) -> Unit

    data class User(
        val id: UserId,
        val name: UserName
    )

    val user = User("123", "张三")
    println("用户: \${user.id} - \${user.name}")

    println()
    println("=== 7. 简单的测试示例 ===")

    // 使用 assert 进行简单验证
    fun add(a: Int, b: Int) = a + b

    // 简单测试
    assert(add(2, 3) == 5) { "加法测试失败" }
    assert(add(-1, 1) == 0) { "负数测试失败" }

    println("基本测试通过")

    println()
    println("=== 8. DDD (域驱动设计) 分层 ===")

    // 领域层 - 纯业务逻辑
    data class Product(val name: String, val price: Double) {
        fun applyDiscount(percent: Double): Product =
            copy(price = price * (1 - percent / 100))
    }

    // 应用层 - 用例
    class ProductService {
        fun applyDiscountToProduct(
            product: Product,
            discountPercent: Double
        ): Product {
            require(discountPercent in 0.0..100.0) {
                "折扣必须在 0-100 之间"
            }
            return product.applyDiscount(discountPercent)
        }
    }

    val product = Product("笔记本电脑", 8000.0)
    val service = ProductService()

    val discounted = service.applyDiscountToProduct(product, 15.0)
    println("原价: ¥\${product.price}")
    println("折扣后: ¥\${discounted.price}")

    println()
    println("=== 总结 ===")
    println("1. 使用 @JvmName/@JvmOverloads 改善 Java 互操作")
    println("2. 正确处理可空类型")
    println("3. 使用类型别名提高可读性")
    println("4. 遵循 DDD 分层架构")
}`,
        expectedOutput: '=== Java 互操作与最佳实践 ==='
      }
    ],
    exercises: [
      {
        id: 'ex-14-1',
        title: '重构代码遵循命名规范',
        description: '将以下不符合规范的代码重构为符合 Kotlin 命名规范的代码。',
        template: `fun main() {
    // 以下代码命名不规范，请重构

    class user_manager { }
    interface I_database { }
    fun Get_Data() { }
    val USER_COUNT = 10
    var isvalid = false
    const val max_items = 100

    // TODO: 重命名以上标识符使其符合 Kotlin 规范

    // 你的重构代码:
    class UserManager { }
    interface IDatabase { }
    // ...
}`,
        hint: '类名大驼峰，函数名小驼峰，非常量小驼峰，常量全大写。',
        solution: `fun main() {
    // 重构后的代码

    // 类名：大驼峰
    class UserManager { }

    // 接口名：大驼峰，不需要 I 前缀
    interface Database { }

    // 函数名：小驼峰
    fun getData() { }

    // 变量名：小驼峰
    val userCount = 10
    var isValid = false

    // 常量：全大写，下划线分隔
    const val MAX_ITEMS = 100

    println("命名规范重构完成")
}`,
        validator: '命名规范重构完成'
      },
      {
        id: 'ex-14-2',
        title: '优化性能问题代码',
        description: '找出并修复以下代码中的性能问题。',
        template: `fun main() {
    // 以下代码存在性能问题，请优化

    // 问题 1: 字符串拼接
    fun buildString(n: Int): String {
        var result = ""
        for (i in 1..n) {
            result = result + i + ","
        }
        return result
    }

    // 问题 2: 重复创建对象
    fun processItems(items: List<Int>): List<Int> {
        return items
            .filter { it > 0 }
            .map { it * 2 }
            .filter { it < 100 }
            .map { it.toString() }
            .map { it.toInt() }
    }

    // TODO: 优化以上函数

    // 测试
    println(buildString(10))
    println(processItems(listOf(1, 2, 3, 50, 100, 200)))
}`,
        hint: '使用 StringBuilder 优化字符串拼接，合并重复的转换操作。',
        solution: `fun main() {
    // 优化后的代码

    // 优化 1: 使用 StringBuilder
    fun buildString(n: Int): String {
        val sb = StringBuilder()
        for (i in 1..n) {
            sb.append(i).append(",")
        }
        return sb.toString().dropLastWhile { it == ',' }
    }

    // 优化 2: 减少中间操作
    fun processItems(items: List<Int>): List<Int> {
        return items
            .filter { it > 0 && it < 50 }
            .map { it * 2 }
    }

    // 或者使用 Sequence 处理大数据
    fun processItemsLarge(items: List<Int>): List<Int> {
        return items.asSequence()
            .filter { it > 0 }
            .map { it * 2 }
            .filter { it < 100 }
            .toList()
    }

    println(buildString(10))
    println(processItems(listOf(1, 2, 3, 50, 100, 200)))
}`,
        validator: '1,2,3,4,5,6,7,8,9,10.*\\[2, 4, 6\\]'
      },
      {
        id: 'ex-14-3',
        title: '实现简单的数据验证',
        description: '创建一个可复用的数据验证框架，遵循 Kotlin 最佳实践。',
        template: `fun main() {
    // 实现一个简单但可扩展的数据验证框架

    // 验证结果
    sealed class ValidationResult {
        data object Valid : ValidationResult()
        data class Invalid(val errors: List<String>) : ValidationResult()
    }

    // 验证规则
    interface ValidationRule<T> {
        fun validate(value: T): String?
    }

    // TODO: 实现以下内容

    // 1. 实现几个常用的验证规则:
    //    - NotEmptyRule: 非空验证
    //    - MinLengthRule: 最小长度验证
    //    - EmailRule: 邮箱格式验证

    // 2. 实现 Validator 类，支持添加多条规则并执行验证

    // 测试代码
    class EmailRule : ValidationRule<String> {
        override fun validate(value: String): String? {
            // 实现邮箱验证
        }
    }

    class MinLengthRule(private val min: Int) : ValidationRule<String> {
        override fun validate(value: String): String? {
            // 实现最小长度验证
        }
    }

    // 测试
    val email = "user@example.com"
    val result = // 执行验证
    println("验证结果: $result")
}`,
        hint: '使用 sealed class 表示验证结果，使用高阶函数构建验证器。',
        solution: `fun main() {
    // 验证结果
    sealed class ValidationResult {
        data object Valid : ValidationResult()
        data class Invalid(val errors: List<String>) : ValidationResult()
    }

    // 验证规则
    interface ValidationRule<T> {
        fun validate(value: T): String?
    }

    // 常用验证规则
    class NotEmptyRule : ValidationRule<String> {
        override fun validate(value: String): String? =
            if (value.isBlank()) "不能为空" else null
    }

    class MinLengthRule(private val min: Int) : ValidationRule<String> {
        override fun validate(value: String): String? =
            if (value.length < min) "长度不能少于 $min" else null
    }

    class EmailRule : ValidationRule<String> {
        override fun validate(value: String): String? =
            if (!value.contains("@") || !value.contains(".")) {
                "邮箱格式不正确"
            } else null
    }

    // 验证器
    class Validator<T> {
        private val rules = mutableListOf<ValidationRule<T>>()

        fun addRule(rule: ValidationRule<T>): Validator<T> {
            rules.add(rule)
            return this
        }

        fun validate(value: T): ValidationResult {
            val errors = rules.mapNotNull { it.validate(value) }
            return if (errors.isEmpty()) {
                ValidationResult.Valid
            } else {
                ValidationResult.Invalid(errors)
            }
        }
    }

    // 测试
    val validator = Validator<String>()
        .addRule(NotEmptyRule())
        .addRule(MinLengthRule(5))
        .addRule(EmailRule())

    val testEmails = listOf(
        "user@example.com",
        "ab@c.com",
        "",
        "invalid-email"
    )

    testEmails.forEach { email ->
        val result = validator.validate(email)
        when (result) {
            is ValidationResult.Valid -> println("✓ $email 有效")
            is ValidationResult.Invalid -> println("✗ $email: \${result.errors.joinToString()}")
        }
    }
}`,
        validator: '✓ user@example.com 有效.*✗ ab@c.com.*✗ .*空.*✗ invalid-email.*格式'
      }
    ]
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
