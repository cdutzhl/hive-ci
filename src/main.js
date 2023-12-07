import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

// 导入我们创建的用于请求的request对象
import request from './api/index.js'

// 将请求对象，绑定到vue的原型上
// $request 这个是我们自定义的变量名称
Vue.prototype.$request = request


Vue.config.productionTip = false

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 判断是否存在token,如果存在将每个页面header添加token和userName
    config.headers.common['Authorization'] = sessionStorage.getItem("token");

    return config
}, function (error) {
    router.push('/login')
    return Promise.reject(error)
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')