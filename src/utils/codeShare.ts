/**
 * 代码分享工具
 * 使用 Base64 编码将代码存储在 URL 中
 */

/**
 * 将字符串编码为 URL 安全的 Base64
 * 处理 Unicode 字符
 */
export function encodeCode(code: string): string {
  try {
    // 先将字符串转为 UTF-8 字节数组
    const utf8Bytes = encodeURIComponent(code).replace(
      /%([0-9A-F]{2})/g,
      (_match, p1) => String.fromCharCode(parseInt(p1, 16))
    )
    // 转为 Base64
    const base64 = btoa(utf8Bytes)
    // 替换 URL 不安全的字符
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  } catch (error) {
    console.error('Failed to encode code:', error)
    return ''
  }
}

/**
 * 从 URL 安全的 Base64 解码字符串
 */
export function decodeCode(encoded: string): string {
  try {
    // 恢复 Base64 标准格式
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    // 补齐 padding
    while (base64.length % 4) {
      base64 += '='
    }
    // 解码 Base64
    const utf8Bytes = atob(base64)
    // 转回 Unicode 字符串
    return decodeURIComponent(
      utf8Bytes.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    )
  } catch (error) {
    console.error('Failed to decode code:', error)
    return ''
  }
}

/**
 * 生成分享链接
 */
export function generateShareUrl(code: string, baseUrl: string = window.location.origin): string {
  const encoded = encodeCode(code)
  if (!encoded) return baseUrl
  return `${baseUrl}/?code=${encoded}`
}

/**
 * 从 URL 获取分享的代码
 */
export function getSharedCode(): string | null {
  const params = new URLSearchParams(window.location.search)
  const codeParam = params.get('code')
  if (!codeParam) return null
  return decodeCode(codeParam)
}

/**
 * 清除 URL 中的代码参数（不刷新页面）
 */
export function clearCodeFromUrl(): void {
  const url = new URL(window.location.href)
  url.searchParams.delete('code')
  window.history.replaceState({}, '', url.toString())
}
