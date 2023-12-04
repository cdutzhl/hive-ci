import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/login/Login.vue"
import Home from "../components/Home.vue"
import Interface from "../components/Interface.vue"
import Cases from "../components/Cases.vue"
import Projects from "../components/Project.vue"


Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: Login
},{
    path: '/home',
    name: 'home',
    component: Home,
    children:[
        {
            path: '/cases',
            name:'cases',
            component: Cases
        },{
            path: '/interface',
            name: 'interface',
            component: Interface
        },{
            path: '/projects',
            name:'/projects',
            component: Projects
        }

    ]},
]

const router = new VueRouter({
    routes
})




export default router