<template>
  <div ref="editorContainer" class="monaco-editor-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

interface Props {
  modelValue: string
  language?: string
  theme?: string
  readOnly?: boolean
  height?: string
  fontSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  language: 'kotlin',
  theme: 'vs-dark',
  readOnly: false,
  height: '100%',
  fontSize: 14
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const editorContainer = ref<HTMLElement>()
let editorInstance: any = null

// 从 CDN 加载 Monaco Editor
function loadMonacoFromCDN(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 检查是否已加载
    if ((window as any).monaco) {
      resolve()
      return
    }

    // 配置 Monaco 的 worker 路径
    const baseUrl = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min'
    ;(window as any).MonacoEnvironment = {
      getWorkerUrl: function (workerId: string, label: string) {
        return `${baseUrl}/vs/base/worker/workerMain.js`
      }
    }

    // 动态加载脚本
    const script = document.createElement('script')
    script.src = `${baseUrl}/vs/loader.js`
    script.async = true
    script.onload = () => {
      ;(window as any).require.config({ paths: { vs: `${baseUrl}/vs` } })
      ;(window as any).require(['vs/editor/editor.main'], () => {
        resolve()
      })
    }
    script.onerror = () => reject(new Error('Failed to load Monaco Editor'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  if (!editorContainer.value) return

  try {
    await loadMonacoFromCDN()

    const monaco = (window as any).monaco

    editorInstance = monaco.editor.create(editorContainer.value, {
      value: props.modelValue,
      language: props.language,
      theme: props.theme,
      readOnly: props.readOnly,
      automaticLayout: true,
      fontSize: props.fontSize,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', monospace",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      padding: { top: 16, bottom: 16 },
      suggest: {
        showKeywords: true,
        showSnippets: true
      },
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false
      },
      tabSize: 4,
      wordWrap: 'off',
      autoIndent: 'full',
      bracketPairColorization: { enabled: true },
      smoothScrolling: true,
      renderLineHighlight: 'all'
    })

    // 监听内容变化
    editorInstance.onDidChangeModelContent(() => {
      const value = editorInstance?.getValue() || ''
      emit('update:modelValue', value)
      emit('change', value)
    })
  } catch (error) {
    console.error('Failed to load Monaco Editor:', error)
  }
})

onBeforeUnmount(() => {
  editorInstance?.dispose()
})

watch(() => props.modelValue, (newValue) => {
  if (editorInstance && newValue !== editorInstance.getValue()) {
    const position = editorInstance.getPosition()
    editorInstance.setValue(newValue)
    if (position) {
      editorInstance.setPosition(position)
    }
  }
})

watch(() => props.theme, (newTheme) => {
  const monaco = (window as any).monaco
  monaco?.editor.setTheme(newTheme)
})

watch(() => props.language, (newLanguage) => {
  const monaco = (window as any).monaco
  const model = editorInstance?.getModel()
  if (model && monaco) {
    monaco.editor.setModelLanguage(model, newLanguage)
  }
})

watch(() => props.readOnly, (readOnly) => {
  editorInstance?.updateOptions({ readOnly })
})

watch(() => props.fontSize, (fontSize) => {
  editorInstance?.updateOptions({ fontSize })
})

defineExpose({
  editor: editorInstance,
  getEditor: () => editorInstance
})
</script>

<style scoped>
.monaco-editor-container {
  width: 100%;
  height: v-bind(height);
  border-radius: 8px;
  overflow: hidden;
}
</style>
