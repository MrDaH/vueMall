<template>
  <div class="goods-list">
    
    <!-- <router-link to="/home/goodsInfo" class="goods-item" tag="div">
      <img src="http://ofv795nmp.bkt.clouddn.com//upload/201504/20/thumb_201504200119256512.jpg" alt="">
      <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥899</span>
          <span class="old">￥999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </router-link>  -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

  </div>
</template>

<script>
import { Toast } from "mint-ui"
export default {
  data() {
    // data 是往自己组件内部，挂载一些私有数据的
    return {
      pageindex: 1, // 分页的页数
      goodslist: [] // 存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 获取商品列表
      this.$http.get("../../jsons/goodsInfo.json")
        .then(result => {
          if (result.status === 200) {
            // this.goodslist = result.body.message;
            this.goodslist = this.goodslist.concat(result.body.goodsInfo);
          }
        });
    },
    goDetail(id){
      //使用js的形式进行路由导航：编程式导航
      //注意：一定要区分this.$route和this.$router这两个对象
      //this.$route是路由对数对象，所有路由中的参数:params,query都属于它
      //this.$router是一个路由导航对象，用它可以方便的使用js代码实现路由的前进、后退、跳转到新的URL地址
      //1.最简单的方法
      // this.$router.push('/home/goodsInfo')
      //2.传递对象的方法
      // this.$router.push({ path: '/home/goodsInfo' })
      //3.命名的路由this.$router.push({ name: 'goodsInfo', params:{id: id} })
      this.$router.push({ name: "goodsInfo", params: { id } });
      //4.带查询参数，变成/home/goodsInfo?id=id
      // this.$router.push({ path: '/home/goodsInfo', query: { id: id }})
    },
    getMore() {
      Toast('暂无更多数据')
    }
  },
}
</script>

<style lang="scss" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    position: relative;
    img{
      width: 100%;
    }
    .title{
      font-size: 14px;
      max-height: 28px;
      overflow: hidden;
      position: absolute;
      top: 185px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      word-break: break-all;
    }

    .info{
      background-color: #eee;
      p{
        margin: 0;
        padding: 5px;
      }
      .price{
        .now{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old{
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
