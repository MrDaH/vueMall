<template>
    <div class="cmt-container">
         <!-- <h3>发表评论</h3>
         <hr>
         <textarea placeholder="请输入评论内容（最多评论120字）" maxlength="120"></textarea>
         <mt-button type='primary' size='large' @click='release'>发表评论</mt-button>       
         <div class="cmt-list">
             <div class="cmt-item">
                 <div class="cmt-title">
                     第一楼&nbsp;&nbsp;用户:匿名用户&nbsp;&nbsp;发表时间：2019.03.06 09:30
                 </div>
                 <div class="cmt-body">
                     花落花开花无悔，缘起缘灭缘如水
                 </div>
             </div>
         </div>
         <mt-button type='danger' size='large' plain>加载更多</mt-button> -->

         <!-- 正常开发中使用以下方法 -->
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model='content'></textarea>

        <mt-button type="primary" size="large" @click="release">发表评论</mt-button>

        <div class="cmt-list">
        <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
            <div class="cmt-title">
            第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
            </div>
            <div class="cmt-body">
            {{ item.content === '' ? '此用户很懒，嘛都没说就发布了': item.content }}
            </div>
        </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      add_time: '',
      user_name: '',
      content: '',
      comments: [
          { "add_time" : "2019.03.06 09:07:21", "user_name" : "张三", "content" : "花落花开花无悔" },
          { "add_time" : "2019.03.06 09:09:30", "user_name" : "李四", "content" : "缘起缘灭缘如水" }
      ] // 所有的评论数据
    };
  },
  created() {
    // this.getComments();
  },
  methods: {
    // getComments() {
    //   // 获取评论
    //   this.$http
    //     .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
    //     .then(result => {
    //       if (result.body.status === 0) {
    //         // this.comments = result.body.message;
    //         // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
    //         this.comments = this.comments.concat(result.body.message);
    //       } else {
    //         Toast("获取评论失败！");
    //       }
    //     });
    // },
    getMore() {
    // 加载更多
    //   this.pageIndex++;
    //   this.getComments();
        Toast('暂无更多数据')
    },
    release() {
        if(this.content.trim().length === 0) {
            return Toast('评论内容不能为空')
        }else{
            var car = { user_name: "匿名用户", add_time: new Date(), content: this.content}
            this.comments.unshift(car)
            this.content = ''
            // 正常开发下使用以下的方法
            // 参数1.请求的服务，后面接上了从上个页面传过来的id
            // 参数2.发送给后台的数据
            // 参数3.定义提交的时候，表单中数据的格式
            // .then回调函数，定义发送后执行的方法
            // this.$http.post('/url'+ $route.params.id, {content: this.content},{emulateJSON: true}).then(result => {
            //     if(result.body.status === 0){
            //         var car = { user_name: "匿名用户", add_time: new Date(), content: this.content}
            //         this.comments.unshift(car)
            //         this.content = ''
            //     }else{
            //         Toast('评论发表失败')
            //     }
            // })
        }      
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{font-size: 18px;}
    textarea{
        font-size: 14px;
        margin: 0;
        height: 85px;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>

