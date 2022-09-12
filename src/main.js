import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {router} from './router'
import store from './store'

import 'virtual:windi.css' 

const app = createApp(App)
import "./permission"
import "nprogress/nprogress.css"

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
