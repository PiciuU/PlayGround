import Vue from 'vue';

import Background from '@/components/Background.vue';
import Hamburger from '@/components/Hamburger.vue';

import VueKinesis from 'vue-kinesis';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueKinesis);
gsap.registerPlugin(TextPlugin);

Vue.prototype.$gsap = gsap;

Vue.component('Background', Background);
Vue.component('Hamburger', Hamburger);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
