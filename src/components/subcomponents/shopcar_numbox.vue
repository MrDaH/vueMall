<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    mounted() {
        // 初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged() {
            //数量改变了
            this.$store.commit("updateGoodsInfo", {
                id: this.goodsid,
                count: this.$refs.numbox.value
            });
        }
    },
    props: ["goodsid", "initcount"]
    // 在实际开发中由于max的值应该是由商品库存来决定的，而我们不知道什么时候能够拿到 max 值，但是总归有一刻，会得到一个真正的 max 值
    // 可以使用 watch 属性监听，来监听父组件传递过来的 max 值，不管 watch 会被触发几次，但是最后一次，肯定是一个合法的 max 数值
    // watch: {
    //     // 属性监听
    //     max: function(newVal, oldVal) {
    //     // 使用 JS API 设置 numbox 的最大值
    //     mui(".mui-numbox")
    //         .numbox()
    //         .setOption("max", newVal);
    //     }
    // }
}
</script>



