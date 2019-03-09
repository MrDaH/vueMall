<template>
<div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item', item.id == 1? 'mui-active' : '']" v-for="item in titleList" :key="item.id">
                    {{ item.title }}
                </a>
            </div>
        </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <!-- <router-link v-for="item in photoImg" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li"> -->
      <router-link v-for="item in photoImg" :key="item.id" to="/home/photoInfo/" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.summary }}</div>
        </div>
      </router-link>
    </ul>
</div>
</template>

<script>
// 1. 导入 mui 的js文件
// 这里会因为使用的严格模式问题而导致报错，需要安装cnpm i babel-plugin-transform-remove-strict-mode -D包来解决
// 安装完上面的包后，需要在.babelrc中的plugins:"transform-remove-strict-mode"
import mui from "../../lib/mui/js/mui.min.js";
export default {
    data() {
        return {
            titleList: [
                { "title": "推荐", "id": 1},
                { "title": "热点", "id": 2},
                { "title": "社会", "id": 3},
                { "title": "军事", "id": 4},
                { "title": "娱乐", "id": 5},
                { "title": "科技", "id": 6}
            ],
            photoImg: []       
        }
    },
    created() {
        this.getPhotoImg();
    },
    mounted () {
        // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
        // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
        // 2. 初始化滑动控件
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getPhotoImg() {
            this.$http.get('../../jsons/photoImg.json').then(result => {
                console.log(result)
                if(result.status === 200) {
                    this.photoImg = result.body.photoImg
                }else {
                    Toast('数据获取失败')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      width: 100%;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
