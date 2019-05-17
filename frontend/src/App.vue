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
    mounted () {}
}
</script>

<style lang="less">
@import './assets/css/fonts.less';
@import './assets/css/common.less';
</style>
