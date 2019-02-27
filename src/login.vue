<template>
  <div>
    <h1>这是登录组件，使用 .vue 文件定义出来的 --- {{msg}}</h1>
    <mt-button type="default" @click="show">点击</mt-button>
  </div>
</template>

<script>
//按需导入mint-ui组件中的Toast
import { Toast } from 'mint-ui'
export default {
  data() {
    // 注意：组件中的 data 必须是 function
    return {
      msg: "123"
    };
  },
  methods: {
    show() {
      Toast({
        message: '提示',
        position: 'middle',
        duration: '2000',
        iconClass: 'glyphicon glyphicon-ok', //设置图标及样式，可以直接去bootstrap中去找
        className: 'ToastClass' //自定义Toast的样式
      })
    }
  }
};
</script>
 
<style>
  div{
    color: blue;
  }
</style>