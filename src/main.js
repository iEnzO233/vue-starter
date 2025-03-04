import './assets/style/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import ApiService from '@/services/ApiService';
import JwtService from '@/services/jwtService';
import { Icon } from '@iconify/vue';


const app = createApp(App);
const pinia = createPinia();


// Initialize ApiService
ApiService.init(app);

// Set the header if token exists
if (JwtService.getToken()) {
    ApiService.setHeader();
}
app.use(Vue3PersianDatetimePicker, {
    name: 'DatePicker',
    props: {
        format: 'YYYY-MM-DD HH:mm',
        displayFormat: 'jYYYY-jMM-jDD',
        editable: false,
        inputClass: 'form-control custom-date-picker',
        placeholder: 'لطفا تاریخ را انتخاب کنید',
        altFormat: 'YYYY-MM-DD HH:mm',
        color: '#006ae6',
        autoSubmit: true,
    }
})

app.component('Icon', Icon);
app.use(pinia);
app.use(router);
app.mount('#app');
