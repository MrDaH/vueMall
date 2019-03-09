<template>
    <div class="photoinfo-conteaniner">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ photoinfo.add_time }}</span>
            <span>楼主:{{ photoinfo.name }}</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="photoImg" @close="handleClose"></vue-preview>
        </div>
        <div class="content">
            {{ photoinfo.summary }}
        </div>
        <hr>
        <comment-box></comment-box>
    </div>
</template>

<script>
// 1. 导入 评论子组件
import comment from "../subcomponents/comment.vue"
import { Toast } from "mint-ui"
export default {
    data() {
        return {
            photoImg: [],
            photoinfo: []
        }        
    },
    created() {
        this.getThumbs()
    },
    methods: {
        getThumbs() {
            this.$http.get('../../jsons/photoInfo.json').then( result=> {
                if(result.status === 200) {
                    // 循环每个图片数据，补全图片的宽和高
                    result.body.photoImg.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                    });
                    this.photoImg = result.body.photoImg
                    this.photoinfo = result.body.photoInfo[0]
                    console.log(this.photoinfo)
                }else {
                    Toast('数据获取失败')
                }
            })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components: {
        // 用来注册子组件的节点
        "comment-box": comment
    }
}
</script>

<style lang="scss">
.photoinfo-conteaniner {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs{
    display: flex;
    div{
        width: 100%;
        .my-gallery{
            display: flex;
            flex-wrap: wrap;
            figure{
                margin: 10px;
                box-shadow: 0 0 8px #999;
                img{
                    width: 100px;
                    vertical-align: middle;
                }
            }   
        }
    }  
  }
}
</style>


