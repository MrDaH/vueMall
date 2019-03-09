<template>
    <div class="newsinfo-conteaniner">
        <!-- <h3 class="title">新闻标题</h3>
        <p class="subtitle">
            <span>发表时间:2019.03.06 09:00:00</span>
            <span>点击:0次</span>
        </p>
        <hr>
        <div class="content">
            这里面的都是这条新闻的数据
            这里面的都是这条新闻的数据
            这里面的都是这条新闻的数据
        </div>
        <hr>
        <comment-box></comment-box> -->
        <!-- 正常开发中使用以下方法 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ newsinfo.add_time | dateFormat }}</span>
            <span>楼主:{{ newsinfo.name }}</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        评论子组件区域
        <comment-box :id="this.id"></comment-box>
    </div> 
</template>
<script>
// 1. 导入 评论子组件
import comment from "../subcomponents/comment.vue"

export default {
  data() {
    return {
      //id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      newsinfo: {} // 新闻对象
    };
  },
  created() {
    // 页面加载时就调用以获取数据
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
    // 获取新闻详情
      this.$http.get("../../jsons/newList.json").then(result => {
        if (result.status === 200) {
          this.newsinfo = result.body.newList[0];
        } else {
          Toast("获取新闻失败！");
        }
      });
    }
  },
  components: {
    // 用来注册子组件的节点
    "comment-box": comment
  }
};
</script>
<style lang="scss">
.newsinfo-conteaniner{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        font-size: 13px;
        img{
            width: 100%;
        }
    }
}
</style>

