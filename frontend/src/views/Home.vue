<template>
	<div class="page-app">
		<keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :allGender="allGender" :allLevel="allLevel" :allCities="allCities"></router-view>

        <Footer @placeOrder="placeOrder"></Footer>
        <!-- 随机下单弹窗 start -->
        <modal class="random-modal" title="随机下单" @close="randomModalVisible=false" v-show="randomModalVisible"
            :allCities="allCities"
            :allGender="allGender"
            :allLevel="allLevel"
            :allTags="allTags">
            <form class="random-form" @submit="submitOrder">
                <label class="label">等级</label>
                <div class="select">
                    <select v-model="randomForm.level" @change="getProductType($event.target.value)">
                        <option value=""></option>
                        <option v-for="level in allLevel" :key="level.id" :value="level.id">{{ level.name }}</option>
                    </select>
                </div>
                <label class="label">类型</label>
                <div class="select">
                    <select v-model="randomForm.type" @change="getTimeList($event.target.value)">
                        <option value=""></option>
                        <option v-for="type in allProductType" :key="type.id" :value="type.id">{{ type.name }}</option>
                    </select>
                </div>
                
                <label class="label">时长</label>
                <div class="select">
                    <select v-model="randomForm.time">
                        <option value=""></option>
                        <option v-for="time in timeList" :key="time.id" :value="time.id">{{ time.name }}</option>
                    </select>
                </div>
                <label class="label mt-10">标签</label>
                <div class="pb-10">
                    <label class="checkbox" v-for="(tag,i) in allTags" :key="i"><input type="checkbox" :value="tag" v-model="randomForm.tags"><span class="tag">{{ tag }}</span></label>
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
                type: '',
                time: '',
                tags: []
            },
            allTags: [],
            allGender: [],
            allLevel: [],
            allCities: [],
            allProductType: [],
            currentLevel: 0,
            timeList:[],
    	}
    },
    methods: {
    	placeOrder () {
            this.randomModalVisible = true
        },
        submitOrder (e) {
            e.preventDefault()
            this.$http({
                method: 'POST',
                url: 'api/v1/order/random/',
                showLoading: true
            }).then(res => {
                console.log(res);
                this.$toast('下单成功')
                // this.randomModalVisible = false
            })
        },
        fixScroll () {
            setTimeout(()=>{
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            },100)
        },
        getAllGender () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/gender/', 
                showLoading: true
            }).then(res => {
                this.allGender = res.data
            }, error => {
                console.log(error)
            })
        },
        getAllLevel () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/level/', 
                showLoading: true
            }).then(res => {
                this.allLevel = res.data
            }, error => {
                console.log(error)
            })
        },
        getAllCities () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/city/', 
                showLoading: true
            }).then(res => {
                this.allCities = res.data
            }, error => {
                console.log(error)
            })
        },
        getProductType (level_id) {
            this.currentLevel = level_id
            if (!this.currentLevel)
                return
            this.$http({
                method: 'GET', 
                url: `api/v1/info/product-type/?level=${level_id}`,
                showLoading: true
            }).then(res => {
                this.allProductType = res.data
                if (!this.allProductType.length)
                    this.timeList = []
            }, error => {
                console.log(error)
            })
        },
        getTimeList(product_type_id) {
            if (!product_type_id)
                return
            this.$http({
                method: 'GET', 
                url: `api/v1/info/product/?level=${this.currentLevel}&type=${product_type_id}`,
                showLoading: true
            }).then(result => {
                this.timeList = result.data
            }, error => {
                console.log(error)
            })
        },
        getAllTags () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/tag/', 
            }).then(res => {
                this.allTags = res.data
            }, error => {
                console.log(error)
            })
        },
        checkRoute () {
            if (this.$route.path=='/random') {
                this.placeOrder()
            }
        }
    },
    created(){
    	
    },
	mounted(){
        this.getAllGender()
        this.getAllLevel()
        this.getAllCities()
        this.getAllTags()
        this.checkRoute()

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
