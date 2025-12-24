<template>
  <div class="app-root">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 根组件 - 仅包含路由视图
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  min-height: 100vh;
}

.app-root {
  min-height: 100vh;
}
</style>
