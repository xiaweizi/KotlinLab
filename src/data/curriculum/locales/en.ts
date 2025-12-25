/**
 * Kotlin Learning System - English Metadata
 * Contains all translatable text content (title, description, topics, hint)
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
    title: 'Kotlin Basics',
    description: 'Learn Kotlin fundamentals: variable declaration, data types, and function definitions',
    topics: ['Variable Declaration (val vs var)', 'Basic Data Types', 'Function Basics', 'Type Inference'],
    demos: [
      { title: 'Variables and Types', description: 'Learn the difference between val and var, and Kotlin\'s basic data types' },
      { title: 'Function Basics', description: 'Learn how to define functions with parameters, return values, default parameters, and named arguments' },
      { title: 'Type Casting and Checking', description: 'Learn Kotlin\'s type checking and smart casts' },
      { title: 'String Operations', description: 'Learn Kotlin string templates and common string operations' }
    ],
    exercises: [
      {
        title: 'Temperature Converter',
        description: 'Write a function to convert Celsius to Fahrenheit. Formula: F = C × 9/5 + 32',
        hint: 'Use the formula F = C × 9/5 + 32'
      },
      {
        title: 'Circle Area and Circumference',
        description: 'Write functions to calculate the area (πr²) and circumference (2πr) of a circle',
        hint: 'Area formula: π × r × r, Circumference formula: 2 × π × r'
      },
      {
        title: 'Self-Introduction Generator',
        description: 'Create a function that accepts name, age, and city, returning a formatted self-introduction',
        hint: 'Use string templates, format like: "I am Zhang San, 25 years old, living in Shanghai"'
      }
    ]
  },
  2: {
    title: 'Control Flow',
    description: 'Master Kotlin\'s conditional expressions, loops, and range operations',
    topics: ['if Expression', 'when Expression', 'for/while Loops', 'Ranges and Progressions'],
    demos: [
      { title: 'if and when Expressions', description: 'Learn Kotlin\'s conditional expressions' },
      { title: 'for Loops and Ranges', description: 'Master for loops and various range operations' },
      { title: 'while Loops and Loop Control', description: 'Learn while loops and break/continue' },
      { title: 'Practice: Number Guessing Game', description: 'Build a number guessing game with control flow' }
    ],
    exercises: [
      {
        title: 'Grade Rating',
        description: 'Output grade based on score: 90+ Excellent, 80+ Good, 60+ Pass, otherwise Fail',
        hint: 'Use when expression, pay attention to order'
      },
      {
        title: 'Print Multiplication Table',
        description: 'Print the 9x9 multiplication table',
        hint: 'Use nested loops, pay attention to alignment'
      },
      {
        title: 'Sum of Even Numbers',
        description: 'Calculate the sum of all even numbers from 1 to 100',
        hint: 'Use for loop with range, step can specify step size'
      }
    ]
  },
  3: {
    title: 'Object-Oriented Programming',
    description: 'Learn Kotlin classes, objects, and properties',
    topics: ['Classes and Objects', 'Properties and Getters/Setters', 'Constructors', 'Data Classes'],
    demos: [
      { title: 'Class and Object Basics', description: 'Create classes and instantiate objects' },
      { title: 'Properties and Accessors', description: 'Learn properties, getters, and setters' },
      { title: 'Constructors', description: 'Primary and secondary constructors' },
      { title: 'Data Classes', description: 'Use data class to simplify data models' }
    ],
    exercises: [
      {
        title: 'Book Class',
        description: 'Create a Book class with title, author, price properties, supporting discount calculation',
        hint: 'Use custom getter to calculate discounted price'
      },
      {
        title: 'Student Management System',
        description: 'Create a Student class to record grades and calculate average',
        hint: 'Use List to store multiple course grades'
      },
      {
        title: 'Bank Account',
        description: 'Implement a BankAccount class supporting deposit, withdrawal, and balance inquiry',
        hint: 'Check sufficient balance before withdrawal'
      }
    ]
  },
  4: {
    title: 'Inheritance and Interfaces',
    description: 'Understand Kotlin\'s inheritance mechanism and interface definitions',
    topics: ['Inheritance', 'Method Overriding', 'Abstract Classes', 'Interfaces'],
    demos: [
      { title: 'Inheritance Basics', description: 'Extend class functionality using inheritance' },
      { title: 'Method Overriding', description: 'Using the override keyword' },
      { title: 'Abstract Classes', description: 'Define abstract classes and abstract methods' },
      { title: 'Interfaces', description: 'Define and implement interfaces' }
    ],
    exercises: [
      {
        title: 'Animal Class Hierarchy',
        description: 'Create an Animal base class and Dog, Cat subclasses with speak method',
        hint: 'Use abstract class to define abstract method'
      },
      {
        title: 'Shape Interface',
        description: 'Define a Shape interface to calculate areas of different shapes',
        hint: 'Define abstract method area() in interface'
      },
      {
        title: 'Vehicle Interface',
        description: 'Implement a Vehicle interface supporting speed calculation for different vehicles',
        hint: 'Interfaces can define both properties and methods'
      }
    ]
  },
  5: {
    title: 'Collections and Generics',
    description: 'Master Kotlin\'s collection framework and generics',
    topics: ['List', 'Set', 'Map', 'Generics Basics'],
    demos: [
      { title: 'List Operations', description: 'Common List operations' },
      { title: 'Set and Map', description: 'Store data using Set and Map' },
      { title: 'Functional Collection APIs', description: 'Higher-order functions: filter, map, reduce' },
      { title: 'Generics', description: 'Define generic classes and functions' }
    ],
    exercises: [
      {
        title: 'Student Grade Statistics',
        description: 'Use List to store student grades, calculate average, highest, and lowest scores',
        hint: 'Use map and reduce functions'
      },
      {
        title: 'Word Frequency Count',
        description: 'Count occurrences of each word in a text',
        hint: 'Use groupBy and count, or MutableMap'
      },
      {
        title: 'Generic Container Class',
        description: 'Implement a generic Box class that can store any type of data',
        hint: 'Use <T> to define generic type parameter'
      }
    ]
  },
  6: {
    title: 'Functional Programming',
    description: 'Learn Kotlin\'s higher-order functions and lambda expressions',
    topics: ['Lambda Expressions', 'Higher-Order Functions', 'Collection Operations', 'Closures'],
    demos: [
      { title: 'Lambda Basics', description: 'Lambda expression syntax' },
      { title: 'Higher-Order Functions', description: 'Functions that accept functions as parameters' },
      { title: 'Advanced Collection Operations', description: 'flatMap, fold, scan, etc.' },
      { title: 'Function References', description: ':: operator and method references' }
    ],
    exercises: [
      {
        title: 'Custom Filter Function',
        description: 'Implement a function similar to filter',
        hint: 'Function parameter type is (T) -> Boolean'
      },
      {
        title: 'Chained Calls',
        description: 'Filter, transform, and sum a list of numbers',
        hint: 'Chain filter, map, reduce calls'
      },
      {
        title: 'Currying',
        description: 'Implement a currying function that converts multi-argument functions to single-argument function chains',
        hint: 'Return a function that returns the next function'
      }
    ]
  },
  7: {
    title: 'Null Safety and Exception Handling',
    description: 'Master Kotlin\'s null safety features and exception handling',
    topics: ['Nullable Types', 'Safe Calls', 'Elvis Operator', 'try-catch'],
    demos: [
      { title: 'Nullable Types', description: 'Understand the difference between ? and !!' },
      { title: 'Safe Calls and Chaining', description: '?., let, run operators' },
      { title: 'Elvis Operator', description: 'Provide default values with ?:' },
      { title: 'Exception Handling', description: 'try-catch-finally and throw' }
    ],
    exercises: [
      {
        title: 'Safe Division',
        description: 'Implement safe division avoiding division by zero',
        hint: 'Use try-catch or nullable types'
      },
      {
        title: 'String Length Retrieval',
        description: 'Safely get string length, handle null cases',
        hint: 'Use ?. safe call or let block'
      },
      {
        title: 'Configuration Reading',
        description: 'Simulate reading values from config with defaults',
        hint: 'Use Elvis operator ?:'
      }
    ]
  },
  8: {
    title: 'Extension Functions and Properties',
    description: 'Learn how to add new functionality to existing classes',
    topics: ['Extension Functions', 'Extension Properties', 'Scope Functions', 'Scope'],
    demos: [
      { title: 'Extension Function Basics', description: 'Add custom methods to String' },
      { title: 'Extension Properties', description: 'Add properties to classes' },
      { title: 'Scope Functions', description: 'let, run, with, apply, also' },
      { title: 'Extension Functions in Practice', description: 'Add extension functions for View' }
    ],
    exercises: [
      {
        title: 'Date Extension',
        description: 'Add formatting extension function to Date',
        hint: 'Define fun Date.format()'
      },
      {
        title: 'List Extension',
        description: 'Add extension function to swap element positions in List',
        hint: 'Return new List instead of modifying original'
      },
      {
        title: 'Int Extension',
        description: 'Add isPrime extension property to Int for prime number checking',
        hint: 'Use val Int.isPrime to define extension property'
      }
    ]
  },
  9: {
    title: 'Coroutines Basics',
    description: 'Introduction to Kotlin coroutines and asynchronous programming',
    topics: ['Coroutine Concepts', 'CoroutineScope', 'suspend Functions', 'Dispatchers'],
    demos: [
      { title: 'Coroutines Introduction', description: 'Use launch to create coroutines' },
      { title: 'async and await', description: 'Asynchronously get return values' },
      { title: 'Coroutine Scopes', description: 'coroutineScope and supervisorScope' },
      { title: 'Exception Handling', description: 'Using try-catch in coroutines' }
    ],
    exercises: [
      {
        title: 'Concurrent Downloads',
        description: 'Use async to download multiple resources concurrently',
        hint: 'Use List<Deferred> and awaitAll'
      },
      {
        title: 'Timeout Handling',
        description: 'Add timeout handling for network requests',
        hint: 'Use withTimeout or withTimeoutOrNull'
      },
      {
        title: 'Retry Mechanism',
        description: 'Implement network request function with retries',
        hint: 'Use loop and try-catch'
      }
    ]
  },
  10: {
    title: 'Data Classes and Sealed Classes',
    description: 'Deep understanding of data classes and sealed classes',
    topics: ['data Class Deep Dive', 'copy Method', 'Sealed Classes', 'Enum Classes'],
    demos: [
      { title: 'data Class Details', description: 'Auto-generated methods' },
      { title: 'copy and Destructuring', description: 'Object copying and destructuring declarations' },
      { title: 'Sealed Classes', description: 'When expression exhaustive checks' },
      { title: 'Enum Classes', description: 'Using enum class' }
    ],
    exercises: [
      {
        title: 'Configuration Data Class',
        description: 'Create a configuration data class supporting copy to modify partial properties',
        hint: 'Use named parameters and copy function'
      },
      {
        title: 'Network Result Wrapper',
        description: 'Use sealed class to wrap network request results',
        hint: 'Define sealed class Result with Success/Error subclasses'
      },
      {
        title: 'State Machine',
        description: 'Implement simple state machine using sealed class',
        hint: 'States can be Idle, Loading, Success, Error'
      }
    ]
  },
  11: {
    title: 'Standard Library and Common Functions',
    description: 'Master Kotlin standard library utilities',
    topics: ['Scope Functions Deep Dive', 'Standard Functions', 'Range Operations', 'Array Operations'],
    demos: [
      { title: 'Scope Functions Comparison', description: 'Differences between let/run/with/apply/also' },
      { title: 'require and check', description: 'Parameter validation and state checking' },
      { title: 'Ranges and Intervals', description: 'Progression and ClosedRange' },
      { title: 'Array Operations', description: 'Native array operations and collection conversion' }
    ],
    exercises: [
      {
        title: 'Parameter Validation',
        description: 'Use require and check to validate function parameters',
        hint: 'require for parameters, check for state'
      },
      {
        title: 'Chained Call Optimization',
        description: 'Use appropriate scope functions to optimize code',
        hint: 'Use apply for object configuration, let for nullable handling'
      },
      {
        title: 'Custom repeat',
        description: 'Implement a standard function similar to repeat',
        hint: 'Use inline and function type parameters'
      }
    ]
  },
  12: {
    title: 'DSL and Advanced Techniques',
    description: 'Learn DSL construction and Kotlin advanced features',
    topics: ['DSL Basics', 'Lambda with Receiver', 'Infix Calls', 'Operator Overloading'],
    demos: [
      { title: 'DSL Introduction', description: 'Build HTML DSL' },
      { title: 'Lambda with Receiver', description: 'Function types with receiver' },
      { title: 'Infix Functions', description: 'infix keyword' },
      { title: 'Operator Overloading', description: 'operator fun' }
    ],
    exercises: [
      {
        title: 'Build DSL',
        description: 'Create a simple DSL for building configuration',
        hint: 'Use lambda with receiver'
      },
      {
        title: 'Operator Overloading',
        description: 'Overload + - * / operators for Money class',
        hint: 'Use operator fun plus, etc.'
      },
      {
        title: 'Infix Expression',
        description: 'Implement fluent API like 5 days ago',
        hint: 'Use infix and extension functions'
      }
    ]
  },
  13: {
    title: 'Project: Todo Management System',
    description: 'Build a complete application using learned knowledge',
    topics: ['Project Architecture', 'Data Models', 'Business Logic', 'Interaction Design'],
    demos: [
      { title: 'Project Design', description: 'Todo data model and architecture' },
      { title: 'Core Features', description: 'Add, delete, mark complete' },
      { title: 'Data Persistence', description: 'JSON serialization storage' },
      { title: 'UI Interaction', description: 'Menu and command handling' }
    ],
    exercises: [
      {
        title: 'Task Priority',
        description: 'Add priority property to todo items',
        hint: 'Use enum class to define priorities'
      },
      {
        title: 'Task Categories',
        description: 'Support categorizing tasks by tags',
        hint: 'Use List<String> to store tags'
      },
      {
        title: 'Task Search',
        description: 'Implement keyword search for tasks',
        hint: 'Use filter and contains'
      }
    ]
  },
  14: {
    title: 'Best Practices',
    description: 'Kotlin coding standards and best practices',
    topics: ['Coding Standards', 'Naming Conventions', 'Performance Optimization', 'Interoperability'],
    demos: [
      { title: 'Coding Standards', description: 'Kotlin official coding conventions' },
      { title: 'Naming Conventions', description: 'Package, class, function naming standards' },
      { title: 'Performance Optimization', description: 'Avoid performance pitfalls' },
      { title: 'Java Interop', description: 'Interacting with Java code' }
    ],
    exercises: [
      {
        title: 'Code Refactoring',
        description: 'Refactor code to follow Kotlin conventions',
        hint: 'Use data classes, extension functions, default parameters'
      },
      {
        title: 'Performance Analysis',
        description: 'Identify and optimize performance issues',
        hint: 'Avoid unnecessary object creation'
      },
      {
        title: 'Java Migration',
        description: 'Convert Java code to Kotlin',
        hint: 'Use nullable types and property syntax'
      }
    ]
  }
}
