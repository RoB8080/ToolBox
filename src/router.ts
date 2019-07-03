import Vue from 'vue'
import Router from 'vue-router'
import Desktop from './views/Desktop/Desktop.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            name: 'Desktop',
            component: Desktop
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import(/* webpackChunkName: "setting" */ './views/Setting.vue'),
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/salary-calculator',
            name: 'salary-calculator',
            component: () => import(/* webpackChunkName: "salary-calculator" */ './views/SalaryCalculator.vue')
        },
        {
            path: '/color-converter',
            name: 'color-converter',
            component: () => import(/* webpackChunkName: "color-converter" */ './views/ColorConverter.vue')
        },
        {
            path: '/map',
            name: 'map',
            component: () => import(/* webpackChunkName: "map" */ './views/Map.vue')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import(/* webpackChunkName: "test" */ './views/Test.vue')
        }
    ]
})
