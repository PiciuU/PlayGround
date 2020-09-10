import Vue from 'vue';

import Background from '@/components/Background.vue';
import Hamburger from '@/components/Hamburger.vue';

import { gsap } from 'gsap';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.prototype.$gsap = gsap;
Vue.prototype.$vue = Vue;

Vue.component('Background', Background);
Vue.component('Hamburger', Hamburger);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
