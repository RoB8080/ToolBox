import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ColorConverter from './views/ColorConverter.vue'
import SalaryCalculator from './views/SalaryCalculator.vue'
import TodoList from './views/TodoList.vue'
import Setting from './views/Setting.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            name: 'home',
            component: Home
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
            component: SalaryCalculator
        },
        {
            path: '/color-converter',
            name: 'color-converter',
            component: ColorConverter
        },
        {
            path: '/todo-list',
            name: 'todo-list',
            component: TodoList
        },
        {
            path: '/setting',
            name: 'setting',
            component: Setting
        },
    ]
})
