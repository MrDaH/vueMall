<template>
    <div>
        <!-- 轮播图区域 -->
        <!-- 调用轮播图组件 -->
        <swiper :lunbotuList="lunbotuList" :isFull="true"></swiper>

        <!-- 6宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/newList">
                <img src="../../image/menu1.png" alt="">
                <div class="mui-media-body">商城论坛</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/photoList">
                <img src="../../image/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/goodsList">
                <img src="../../image/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <a href="#" @click.prevent='jump'>
                <img src="../../image/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
              </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <a href="#" @click.prevent='jump'>
                <img src="../../image/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
              </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <a href="#" @click.prevent='jump'>
                <img src="../../image/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
              </a>
            </li>
        </ul> 
    </div>
</template>

<script>
import { Toast } from "mint-ui"
import swiper from '../subcomponents/swipe.vue'


export default {
  data() {
    return {
      lunbotuList: [
        { "url": "1", "img": "../../image/lun1.jpg" },
        { "url": "2", "img": "../../image/lun2.jpg" }
      ] // 保存轮播图的数组
    };
  },
  created() {
    //页面加载时就要调用轮播图的方法，以达到页面打开后即有轮播图
    // this.getLunbotu();
  },
  methods: {
    // getLunbotu() {//年久失修的get地址，暂时使用静态图
    //   // 获取轮播图数据的方法
    //   this.$http.get("http://vue.studyit.io/api/getlunbo").then(result => {
    //     // console.log(result.body);
    //     if (result.body.status === 0) {
    //       // 成功了
    //       this.lunbotuList = result.body.message;
    //     } else {
    //       // 失败的
    //       Toast("加载轮播图失败。。。");
    //     }
    //   });
    // }
    jump() {
      Toast("该模块暂未开放")
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body{
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>