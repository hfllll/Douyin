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
import './css/tailwind.css'
const app = createApp(App)

// 当你从 node modules 导入 Swiper 自定义元素时，我们需要手动注册它。它应该只执行一次，并且它会全局注册 Swiper 自定义元素。
import { register } from 'swiper/element/bundle';
register();

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