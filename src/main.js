//入口文件
//导入Vue
import Vue from 'vue'

import app from './app.vue'
//导入router
import Vuerouter from 'vue-router'
Vue.use(Vuerouter)

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

//导入vue-resource可用于请求数据
import Vueresource from 'vue-resource'
Vue.use(Vueresource)

//设置请求的根路径
Vue.http.options.root = './jsons'

//按需导入 mint-ui 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe) //轮播图组件1
// Vue.component(SwipeItem.name, SwipeItem) //轮播图组件2
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)


// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'
// 因为按需导入的方法，懒加载的功能会有问题（加载中的图标出不来），只能改成全部导入了
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入缩略图组件
import Vuepreview from 'vue-preview'
Vue.use(Vuepreview)

//导入router.js路由模块
import router from './router.js'

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {
        //this.$store.state.***。元素中调用则去掉this
        car: car //将购物车中的商品数据，用一个数组存储起来
    },
    mutations: {
        //this.$store.commit('方法的名称','按需传递的唯一参数，可以是对象，数组')
        addToCar(state, goodsinfo) {
            //定义一个标识符，用来确定商品是否真的存在
            var flag = false

            //点击加入购物车时，把商品信息保存到store中的car上，但是需要先判断当前商品是否已存在
            state.car.some(item => {
                console.log(1111122)
                if (item.id == goodsinfo.id) {
                    //如果当前商品已存在，则单纯的增加数量
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            //执行完上面的代码后，如果flag还是false则说明商品不存在，可以把整个商品push到car中
            if (!flag) {
                state.car.push(goodsinfo)
            }

            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析： 
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })

            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })

            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })

            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

//创建vue实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})