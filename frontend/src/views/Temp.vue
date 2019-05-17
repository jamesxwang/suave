<style lang="less" scoped="scoped">
@import '../assets/css/common.less';
</style>
<template>
	<div class="page-index">
		
	</div>
</template>

<script>
export default {
	name: 'home',
    components: {},
    data () {
    	return {}
    },
    methods: {
    	getData(){
    		this.$ajax({
				method: 'GET', 
				url: 'userInfo.json', 
				data: {},
				showLoading: true
			}).then(res => {
				this.navList = res.nav
				this.userInfo = res.userInfo
				let len = 2
				this.navList.forEach(item => {
					if(item.text.length>2){
						item.text = item.text.substr(0,len)+'<br>'+item.text.substr(len)
					}
				})
			}, error => {
				this.$toast(error.message);
	        })
    	}
    },
    created () {},
	mounted(){
		// this.$toast({
		// 	message: '提示',
		//   	position: 'bottom',
		//   	duration: 5000
		// })
	}
}
</script>
