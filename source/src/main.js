import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/style.css';
import VueAxios from 'vue-axios';
import axios from 'axios';
// SweetAlert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const vueApp = createApp(App).use(router);
vueApp.use(VueAxios, { $request: axios });
vueApp.use(VueSweetalert2);
vueApp.mount('#app');
