<template>
	<div class="page-app" @scroll="onScroll">
		<keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :allGender="allGender" :allLevel="allLevel" :allCities="allCities" :pageIndex="pageIndex"></router-view>

        <Footer @placeOrder="placeOrder"></Footer>
        <!-- 随机下单弹窗 start -->
        <modal class="random-modal" title="随机下单" @close="randomModalVisible=false" v-show="randomModalVisible"
            :allCities="allCities"
            :allGender="allGender"
            :allLevel="allLevel"
            :allTags="allTags">
            <form class="random-form" @submit="submitOrder">
                <label class="label">性别</label>
                <div class="select">
                    <select v-model="randomForm.gender">
                        <option value=""></option>
                        <option v-for="gender in allGender" :key="gender.id" :value="gender.id">{{ gender.gender }}</option>
                    </select>
                </div>
                <label class="label">等级</label>
                <div class="select">
                    <select v-model="randomForm.level" @change="getProductType($event.target.value)">
                        <option value=""></option>
                        <option v-for="level in allLevel" :key="level.id" :value="level.id">{{ level.name }}</option>
                    </select>
                </div>
                <label class="label">类型</label>
                <div class="select">
                    <select @change="getTimeList($event.target.value)">
                        <option value=""></option>
                        <option v-for="type in allProductType" :key="type.id" :value="type.id">{{ type.name }}</option>
                    </select>
                </div>
                
                <label class="label">时长</label>
                <div class="select">
                    <select v-model="randomForm.product_id" @change="getUnitPrice($event)">
                        <option value=""></option>
                        <option v-for="time in timeList" :key="time.id" :value="time.id">{{ time.name }}</option>
                    </select>
                </div>
                <label class="label">联系微信</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="randomForm.wechat_id">
                </div>
                <label class="label mt-10">标签</label>
                <div class="pb-10">
                    <label class="checkbox" v-for="(tag,i) in allTags" :key="i"><input type="checkbox" :value="tag" v-model="randomForm.tags"><span class="tag">{{ tag }}</span></label>
                </div>
                <label class="label">备注</label>
                <div class="flex-1">
                    <textarea class="full" rows="3" v-model.trim="randomForm.comment"></textarea>
                </div>
                <div class="price-infos">
                    <div class="item flex">
                        <p class="flex-1">原 &nbsp; &nbsp; &nbsp; 价：</p>
                        <p>${{ this.unitPrice }}</p>
                    </div>
                    <div class="item flex" v-if="false">
                        <p class="flex-1">折扣金额：</p>
                        <p>-90.00</p>
                    </div>
                    <div class="item flex">
                        <p class="flex-1">澳元汇率：</p>
                        <p>{{ rate }}</p>
                    </div>
                    <div class="total flex">
                        <p class="flex-1">总价：</p>
                        <p class="color-red">￥{{ getTotalPrice() }}</p>
                    </div>
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
                gender: '',
                level: 'A',
                product_id: '',
                wechat_id: '',
                tags: [],
                comment: ''
            },
            allTags: [],
            allGender: [],
            allLevel: [],
            allCities: [],
            allProductType: [],
            currentLevel: 0,
            timeList:[],
            unitPrice: 0,
            rate: 0,
            pageIndex: 0,
    	}
    },
    methods: {
    	placeOrder () {
            this.randomModalVisible = true
        },
        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
            if (scrollTop + clientHeight >= scrollHeight) {
                try {
                    this.$children[0].loadMore()
                    this.$children[1].loadMore()
                    this.$children[2].loadMore()
                } catch (error) {
                    // ignore
                }
            }
        },
        submitOrder (e) {
            e.preventDefault()
            this.$http({
                method: 'POST',
                url: 'api/v1/order/random/',
                data: this.randomForm,
                showLoading: true
            }).then(res => {
                console.log(res);
                this.$toast('下单成功')
                this.randomModalVisible = false
            })
        },
        fixScroll () {
            setTimeout(()=>{
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            },100)
        },
        overscroll(el) {
            el.addEventListener('touchstart', function() {
                let top = el.scrollTop
                ,totalScroll = el.scrollHeight
                ,currentScroll = top + el.offsetHeight;
                if(top === 0) {
                    el.scrollTop = 1;
                }else if(currentScroll === totalScroll) {
                    el.scrollTop = top - 1;
                }
            });

            el.addEventListener('touchmove', function(evt) {
            if(el.offsetHeight < el.scrollHeight)
                evt._isScroller = true;
            });
        },
        getUnitPrice (e) {
            e.preventDefault()
            let id = e.target.value
            this.timeList.forEach(product => {
                if (product.id == id) {
                    this.unitPrice = product.price
                }
            });
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
        getCurrency () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/aud-rate/',
                showLoading: true
            }).then(result => {
                if (result.data && result.data.rate)
                    this.rate = result.data.rate
            }, error => {
                this.$router.push('/')
                console.log(error)
            })
        },
        getTotalPrice () {
            return (this.rate * this.unitPrice).toFixed(2)
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
        this.getCurrency()
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
        // 整个body禁止滚动
        document.body.addEventListener('touchmove', function(evt) {
            if(!evt._isScroller) {
                evt.preventDefault();
            }
        },{passive: false});
        // 可以滚动的元素
        this.overscroll(document.getElementsByClassName('page-app')[0])
    },
	destroyed () {
		
	}
}
</script>
