export default {
  // 通用
  common: {
    search: '搜索',
    run: '运行代码',
    running: '运行中...',
    reset: '重置',
    copy: '复制',
    copied: '已复制到剪贴板！',
    close: '关闭',
    back: '返回',
    loading: '加载中...',
    confirm: '确认',
    cancel: '取消'
  },

  // 主题
  theme: {
    light: '切换到深色主题',
    dark: '切换到亮色主题'
  },

  // 导航
  nav: {
    home: '首页',
    learn: '学习中心',
    editor: '编辑器'
  },

  // 学习中心
  learnCenter: {
    title: '学习中心',
    subtitle: '14天系统化学习 Kotlin 编程语言',
    progress: '学习进度',
    completedDays: '已完成',
    totalDays: '天',
    completedDemos: '已完成 Demo',
    completedExercises: '已完成练习',
    studyTime: '学习时长',
    stats: '学习统计',
    studyDays: '学习天数',
    totalStudyTime: '总学习时长',
    currentProgress: '当前进度',
    resetProgress: '重置学习进度',
    week1: 'Week 1: 基础入门',
    week2: 'Week 2: 进阶提升'
  },

  // 课程卡片
  lessonCard: {
    locked: '锁定',
    current: '进行中',
    completed: '已完成',
    minutes: '分钟',
    beginner: '入门',
    intermediate: '中级',
    advanced: '进阶'
  },

  // 课程页面
  lessonPage: {
    knowledge: '知识点',
    exercises: '练习',
    markCompleted: '标记为完成',
    completed: '已完成',
    inEditor: '在编辑器中打开',
    hint: '提示',
    verifyAnswer: '验证答案',
    showHint: '提示',
    hideHint: '隐藏提示'
  },

  // Demo 运行器
  demoRunner: {
    demoMode: 'Demo',
    exerciseMode: '练习题模式',
    exerciseTitle: '练习题',
    exercisePrompt: '完成练习后点击「运行代码」验证答案',
    kotlinCode: 'Kotlin 代码',
    output: '输出结果',
    outputPlaceholder: '点击「运行代码」查看结果...',
    clearOutput: '清空输出',
    markCompleted: '✓ 标记为已完成',
    completedBadge: '✓ 已完成',
    exitExercise: '← 返回 Demo',
    showSolution: '👁️ 参考答案',
    hideSolution: '🙈 隐藏答案',
    solutionTitle: '参考答案',
    copySolution: '📋 复制答案',
    solutionConfirm: '确定要查看参考答案吗？建议先自己尝试再查看。',
    exerciseLoaded: '练习题已加载，请完成后点击「运行代码」验证...'
  },

  // 搜索
  search: {
    placeholder: '搜索知识点、Demo、练习题...',
    searching: '搜索中...',
    noResults: '未找到相关内容',
    hintsTitle: '搜索提示',
    hints: [
      '输入关键词搜索知识点',
      '支持搜索 Day、Demo、练习题',
      '使用 ↑↓ 方向键导航，Enter 跳转'
    ],
    navigate: '导航',
    jump: '跳转',
    closeKey: '关闭'
  },

  // 编辑器
  editor: {
    title: 'Kotlin 在线编译器',
    settings: '设置',
    theme: '主题',
    fontSize: '字体大小',
    tabSize: 'Tab 大小',
    wordWrap: '自动换行',
    showMinimap: '显示缩略图',
    fontSizeSmall: '小',
    fontSizeMedium: '中',
    fontSizeLarge: '大',
    tabSize2: '2 空格',
    tabSize4: '4 空格',
    wrapOn: '开启',
    wrapOff: '关闭',
    outputPlaceholder: '点击「运行代码」查看结果...',
    compiling: '编译中...',
    compileSuccess: '编译成功',
    compileError: '编译错误',
    runCode: '运行代码',
    resetCode: '重置代码',
    copyCode: '复制代码',
    openSettings: '打开设置',
    closeSettings: '关闭设置',
    share: '分享',
    shareSuccess: '分享链接已复制到剪贴板！',
    shareError: '分享失败：'
  },

  // 判题相关
  validation: {
    pass: '通过',
    fail: '未通过',
    notConfigured: '未配置判题规则',
    configError: '判题配置错误',
    compileFailed: '编译失败',
    validationFailed: '未通过：输出不匹配',
    expectedRegex: '期��匹配正则',
    actualOutput: '实际输出',
    noOutput: '（无输出）'
  },

  // 快捷键
  shortcuts: {
    title: '键盘快捷键',
    run: '运行代码',
    settings: '打开设置',
    search: '搜索',
    clearOutput: '清空输出',
    theme: '切换主题'
  },

  // 语言
  language: {
    title: '语言',
    zhCN: '简体中文',
    en: 'English'
  },

  // 难度
  difficulty: {
    beginner: '入门',
    intermediate: '中级',
    advanced: '进阶'
  },

  // 状态
  status: {
    all: '全部',
    completed: '已完成',
    inProgress: '进行中',
    locked: '锁定'
  }
} as const

export type ZhCNMessages = typeof zhCN
const zhCN = typeof {}
