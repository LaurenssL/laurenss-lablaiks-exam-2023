import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { usePlayerStore } from './stores/player';

const app = createApp(App)
const pinia = createPinia();

app.use(createPinia())
pinia.use(usePlayerStore);
app.use(router)

app.mount('#app')
