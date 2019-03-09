<template>
    <mt-swipe :auto="4000">
        <!-- 这里因为没有服务器，所以写死模拟 -->
        <!-- <mt-swipe-item><img src="../../image/lun1.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../image/lun2.jpg" alt=""></mt-swipe-item> -->
        <!-- 正常开发中使用以下方法，在组件中，使用v-for循环的话，一定要使用 key -->
        <!-- 因为是通用组件，所以这里的lunbotuList对应的是调用者传递过来的 -->
        <!-- 此时就是父组件向子组件进行传值的操作，需要通过props来接收 -->
        <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="" :class="{'full': isFull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    props: ["lunbotuList", "isFull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
height: 200px;
    .mint-swipe-item {
        text-align: center;
        img {
            height: 100%;
        }
    }
}
.full{
    width: 100%;
}
</style>

