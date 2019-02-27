//入口文件
//导入Vue
import Vue from 'vue'

import app from './app.vue'
//导入router
import Vuerouter from 'vue-router'
Vue.use(Vuerouter)

//导入vue-resource可用于请求数据
import Vueresource from 'vue-resource'
Vue.use(Vueresource)

//按需导入 mint-ui 中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe) //轮播图组件1
Vue.component(SwipeItem.name, SwipeItem) //轮播图组件2

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入router.js路由模块
import router from './router.js'

//创建vue实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})