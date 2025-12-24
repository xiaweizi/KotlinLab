# KotlinLab

<div align="center">

**Kotlin 在线学习实验室**

[编译器] + [14天渐进式学习系统]

![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

</div>

---

## 项目简介

KotlinLab 是一个基于 Web 的 Kotlin 学习平台，提供在线编译器和 14 天系统化课程。无需安装任何开发环境，打开浏览器即可开始学习 Kotlin 编程。

### 核心特性

- 📝 **在线编译器** - 基于 Monaco Editor 的代码编辑体验
- ▶️ **实时运行** - Kotlin 代码编译与 JavaScript 执行
- 📚 **14天课程** - 从基础到实战的渐进式学习路径
- 💾 **进度追踪** - 学习进度本地持久化存储
- 🌙 **主题切换** - 深色/浅色主题自由切换
- ❌ **错误可视化** - 编译错误友好提示

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm / pnpm / yarn

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/yourusername/KotlinLab.git
cd KotlinLab

# 安装依赖
npm install

# 启动开发服务器（端口 5175）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

打开浏览器访问 `http://localhost:5175` 即可开始使用。

---

## 项目结构

```
KotlinLab/
├── src/
│   ├── views/              # 页面视图
│   │   ├── CompilerPage.vue    # 编译器页面
│   │   ├── LearnCenter.vue     # 学习中心
│   │   └── LessonPage.vue      # 课程详情页
│   ├── components/         # 可复用组件
│   │   ├── CodeEditor/         # Monaco 编辑器封装
│   │   ├── LessonCard/         # 课程卡片
│   │   ├── KnowledgeList/      # 知识点列表
│   │   └── DemoRunner/         # Demo 运行器
│   ├── composables/        # 组合式函数
│   │   ├── useCompiler.ts      # 编译逻辑
│   │   ├── useTheme.ts         # 主题管理
│   │   ├── useProgress.ts      # 进度追踪
│   │   └── useCurriculum.ts    # 课程数据
│   ├── data/               # 数据层
│   │   └── curriculum.ts       # 14天课程数据
│   ├── router/             # 路由配置
│   ├── styles/             # 全局样式
│   └── main.ts             # 入口文件
├── public/                 # 静态资源
├── index.html              # HTML 模板
├── vite.config.ts          # Vite 配置
└── tsconfig.json           # TypeScript 配置
```

---

## 课程大纲

| 天数 | 主题 | 难度 | Demo 数 | 练习数 | 预计时间 |
|:----:|------|:----:|:-------:|:------:|:--------:|
| Day 1 | Kotlin 基础 | 入门 | 4 | 3 | 45 min |
| Day 2 | 流程控制 | 入门 | 4 | 3 | 50 min |
| Day 3 | 面向对象编程 | 入门 | 4 | 3 | 60 min |
| Day 4 | 继承与接口 | 入门 | 4 | 3 | 60 min |
| Day 5 | 集合与泛型 | 中级 | 4 | 3 | 70 min |
| Day 6 | 函数式编程 | 中级 | 4 | 3 | 65 min |
| Day 7 | 空安全与异常处理 | 中级 | 4 | 3 | 55 min |
| Day 8 | 扩展函数与属性 | 中级 | 4 | 3 | 50 min |
| Day 9 | 协程基础 | 中级 | 4 | 3 | 60 min |
| Day 10 | 数据类与密封类 | 中级 | 4 | 3 | 50 min |
| Day 11 | 标准库与常用函数 | 中级 | 4 | 3 | 55 min |
| Day 12 | DSL 与高阶技巧 | 中级 | 4 | 3 | 70 min |
| Day 13 | 实战项目 | 高级 | 4 | 3 | 90 min |
| Day 14 | 最佳实践 | 中级 | 4 | 3 | 45 min |

**总计**: 56 个 Demo + 42 道练习题

---

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | Vue 3.5 | 渐进式 JavaScript 框架 |
| 开发语言 | TypeScript 5.7 | 类型安全的 JavaScript 超集 |
| 路由管理 | Vue Router 4.4 | 官方路由解决方案 |
| 构建工具 | Vite 6.0 | 新一代前端构建工具 |
| 代码编辑器 | Monaco Editor 0.52 | VS Code 同款编辑器 |
| 工具库 | @vueuse/core 11 | Vue Composition API 工具集 |
| 样式预处理器 | Sass 1.83 | CSS 扩展语言 |
| 编译服务 | Kotlin Playground API | JetBrains 官方 API |

---

## 路由结构

```
/                    # 编译器页面 (默认)
/learn               # 学习中心 - 14天课程概览
/learn/day/:day      # 单日课程详情页
```

---

## 架构设计

- **SPA 单页应用** - 纯前端应用，无后端依赖
- **组合式 API** - 使用 Vue 3 Composition API
- **策略模式** - 编译器服务接口设计，便于扩展
- **数据驱动** - 课程内容与代码分离，便于维护

---

## 开发指南

### 代码风格

- 使用 Composition API `<script setup>` 语法
- 组件命名：PascalCase（如 `MonacoEditor.vue`）
- Composable 命名：`use` 前缀（如 `useCompiler.ts`）
- 接口命名：`I` 前缀（如 `ICompilerStrategy`）

### 添加新课程

在 `src/data/curriculum.ts` 中按照 `DayCurriculum` 接口添加新课程内容：

```typescript
interface DayCurriculum {
  day: number              // 天数 1-14
  title: string            // 课程标题
  description: string      // 课程描述
  icon: string             // 图标 emoji
  topics: string[]         // 知识点列表
  demos: Demo[]            // Demo 示例
  exercises: Exercise[]    // 练习题
  estimatedTime: number    // 预计学习时间（分钟）
  difficulty: string       // 难度级别
}
```

---

## 已知限制

- 代码执行限制为 10 秒超时
- 依赖 JetBrains 官方 API 服务可用性
- 学习进度仅存储在浏览器 localStorage
- 暂不支持多文件项目编译

---

## 许可证

[MIT](LICENSE)

---

## 贡献

欢迎提交 Issue 和 Pull Request！

---

<div align="center">

Made with ❤️ by KotlinLab Team

</div>
