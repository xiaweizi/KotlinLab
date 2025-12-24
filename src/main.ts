import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/theme.scss'

const app = createApp(App)

app.use(router)
app.mount('#app')
