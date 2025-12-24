declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  console: Console
  eval: (code: string) => any
}
