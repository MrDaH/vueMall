//导入路由
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewList from './components/news/newList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import PhotoList from './components/photos/photoList.vue'
import PhotoInfo from './components/photos/photoInfo.vue'
import GoodsList from './components/goods/goodsList.vue'
import GoodsInfo from './components/goods/goodsInfo.vue'
import GoodsDesc from './components/goods/goodsDesc.vue'
import GoodsComment from './components/goods/goodsComment.vue'

//创建路由对象
var router = new VueRouter({
    routes: [ //配置路由的规则,name：路由命名，path：路由地址，component：路由组件，redirect：重定向
        { path: '/', redirect: './home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newList', component: NewList },
        { path: '/home/newsInfo', component: NewsInfo },
        { path: '/home/photoList', component: PhotoList },
        { path: '/home/photoInfo', component: PhotoInfo },
        { path: '/home/goodsList', component: GoodsList },
        { path: '/home/goodsInfo', component: GoodsInfo, name: 'goodsInfo' },
        { path: '/home/goodsDesc', component: GoodsDesc },
        { path: '/home/goodsComment', component: GoodsComment }
    ],
    linkActiveClass: 'mui-active' //覆盖默认路由高亮的类：router-link-active
})

//把路由对象暴露出去
export default router