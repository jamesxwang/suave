<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {}
    },
    watch: {
        $router (to, from){}
    },
    methods: {},
    created () {},
    mounted () {
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
    }
}
</script>

<style lang="less">
@import './assets/css/fonts.less';
@import './assets/css/common.less';
</style>
