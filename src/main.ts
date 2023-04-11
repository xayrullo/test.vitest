import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from "@vueuse/head"

import App from './App.vue'
import router from './router'

import { i18n } from './plugins/i18n'

import "./assets/style/tailwind.css"

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(head)
app.mount('#app')
