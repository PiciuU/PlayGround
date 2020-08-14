import Vue from 'vue';
import VueRouter from 'vue-router';
import RockPaperScrissors from '@/views/RockPaperScrissors.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/games/mg',
        name: 'Memory Game',
        component: RockPaperScrissors,
        props: true,
    },

    {
        path: '/games/rps',
        name: 'Rock Paper Scrissors',
        component: RockPaperScrissors,
        props: true,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
