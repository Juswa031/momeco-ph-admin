import './assets/main.css';
import 'boxicons';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store'
import products from './views/product';
import dashboards from './views/dashboard';
import orders from './views/order';
import { registerModules } from "./register-modules"


registerModules({
    product: products,
    dashboard: dashboards,
    order: orders
 })
const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
app.use(router)
app.use(store)
app.mount('#app')
