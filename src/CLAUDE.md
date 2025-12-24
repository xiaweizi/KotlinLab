[根目录](../CLAUDE.md) > **src**

---

# src 目录

> Kotlin Web Compiler 的源代码根目录

## 模块职责

包含所有前端源代码，采用标准的 Vue 3 + TypeScript 项目结构。

---

## 目录结构

```
src/
├── components/          # Vue 组件
│   └── CodeEditor/     # Monaco 编辑器组件
├── composables/        # 组合式 API
│   ├── useCompiler.ts  # 编译器逻辑
│   └── useTheme.ts     # 主题切换
├── services/           # 服务层
│   └── compiler/       # 编译器服务
├── styles/             # 全局样式
│   └── theme.scss      # 主题定义
├── App.vue             # 根组件
├── main.ts             # 应用入口
├── vite-env.d.ts       # Vite 类型声明
└── shims.scss.d.ts     # SCSS 类型声明
```

---

## 关键文件

| 文件 | 说明 |
|------|------|
| `main.ts` | 应用入口，创建 Vue 实例并挂载到 `#app` |
| `App.vue` | 主应用组件，包含完整的 UI 布局和交互逻辑 |
| `vite-env.d.ts` | Vite 环境类型声明 |
| `shims.scss.d.ts` | SCSS 模块类型声明，包含 Window 接口扩展 |

---

## 相关链接

- [components/CodeEditor](./components/CodeEditor/CLAUDE.md) - Monaco 编辑器组件
- [composables](./composables/CLAUDE.md) - 组合式 API
- [services/compiler](./services/compiler/CLAUDE.md) - 编译器服务
