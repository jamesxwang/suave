<template>
	<div class="page-app">
		<keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

        <Footer @placeOrder="placeOrder"></Footer>
        <!-- 随机下单弹窗 start -->
        <modal class="random-modal" title="随机下单" @close="randomModalVisible=false" v-show="randomModalVisible">
            <form class="random-form" @submit="submitOrder">
                <label class="label">等级</label>
                <div class="select">
                    <select v-model="randomForm.level">
                        <option value="A">A级</option>
                        <option value="B">B级</option>
                        <option value="C">C级</option>
                    </select>
                </div>
                <label class="label">类型</label>
                <div class="select">
                    <select v-model="randomForm.type">
                        <option value="1">类型1</option>
                        <option value="2">类型2</option>
                        <option value="3">类型3</option>
                    </select>
                </div>
                
                <label class="label">时长</label>
                <div class="select">
                    <select v-model="randomForm.time">
                        <option value="1">半小时</option>
                        <option value="2">一个小时</option>
                        <option value="3">一个半小时</option>
                    </select>
                </div>
                <label class="label">城市</label>
                <div class="select">
                    <select v-model="randomForm.city">
                        <option value="1">北京</option>
                        <option value="2">上海</option>
                        <option value="3">重庆</option>
                    </select>
                </div>
                <label class="label mt-10">标签</label>
                <div class="pb-10">
                    <label class="checkbox" v-for="i in 10" :key="i"><input type="checkbox" :value="i" v-model="randomForm.tags"><span class="tag">#标签</span></label>
                </div>
                <div class="text-center mt-20">
                   <button type="submit" class="btn round">确认下单</button> 
                </div>
            </form>
        </modal>
	</div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Modal from '@/components/Modal.vue'
export default {
	name: 'home',
    components: {
        Footer,
        Modal
    },
    data(){
    	return {
    		randomModalVisible: false,
            randomForm: {
                level: 'A',
                type: '1',
                time: '1',
                city: '1',
                tags: []
            }
    	}
    },
    methods: {
    	placeOrder () {
            this.randomModalVisible = true
        },
        submitOrder (e) {
            e.preventDefault()
            this.$toast('下单成功')
            this.randomModalVisible = false
        },
        fixScroll () {
            setTimeout(()=>{
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            },100)
        }
    },
    created(){
    	
    },
	mounted(){
        let u = navigator.userAgent
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isIOS){
            let input = document.getElementsByTagName('input'); 
            let select = document.getElementsByTagName('select'); 
            let textarea = document.getElementsByTagName('textarea'); 
            let elems = [...input,...select,...textarea]
            for (let i = 0; i < elems.length; i++) {    
                elems[i].addEventListener('blur', this.fixScroll); 
            }
        }
	},
	destroyed () {
		
	}
}
</script>
