<template>
	<div class="footer-nav-wrap">
		<ul class="footer-nav flex">
            <router-link class="flex-1" :class="{'active': $route.path=='/' || $route.path=='/detail'}" to="/" tag="li">
                <i class="iconfont icon-preview"></i>
                <p>浏览</p>
            </router-link>
            <li class="flex-1" @click="randomOrder">
                <i class="iconfont icon-random"></i>
                <p>随机下单</p>
            </li>
            <router-link class="flex-1"  :class="{'active': $route.path=='/order'}" to="/order" tag="li">
                <i class="iconfont icon-view"></i>
                <p>查看订单</p>
            </router-link>
            <router-link class="flex-1" to="/register" tag="li">
                <i class="iconfont icon-service"></i>
                <p>联系客服</p>
            </router-link>
            <!-- <li class="flex-1">
                <i class="iconfont icon-service"></i>
                <p>联系客服</p>
            </li> -->
		</ul>
	</div>
</template>
<script>
export default {
    name: 'app',
    data () {
        return {
            
        }
    },
    computed: {
    },
    methods: {
    	randomOrder () {
            this.$emit('placeOrder')
        }
    },
    created () {
    	
    }
}
</script>