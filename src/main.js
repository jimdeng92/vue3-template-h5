import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vantPlugin from './plugins/vant'

import App from './App.vue'
import router from './router'

import 'lib-flexible/flexible';
import '@/styles/index.scss';
import 'minireset.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vantPlugin)

app.mount('#app')
