import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSmoothScroll from 'vue3-smooth-scroll'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'



const app = createApp(App).use(store).use(router).use(plugin, defaultConfig);
app.use(router);
app.use(VueSmoothScroll);
app.mount('#app');

