import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

// 创造Pinia实例
const pinia = createPinia();

// 导入搜索图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// ventify
const vuetify = createVuetify({
    components,
    directives,
})

app.use(router)
app.use(ElementPlus)
app.use(vuetify)

// 将pinia挂载到应用实例
app.use(pinia)
app.mount('#app')