<template>
	<div class="page-detail">
		<div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,i) in banner" :key="i"><img :src="item"></mt-swipe-item>
            </mt-swipe>
            <a class="close" href="javascript:;" @click="goBack"><i class="iconfont icon-close"></i></a>
        </div>
        <div class="info-blk">
            <p>
                <span class="name">{{data.nickname}}</span>
                <i class="iconfont icon-boy" v-if="data.sex==1"></i>
                <i class="iconfont icon-girl" v-else></i>
                <span class="props">{{data.age}}岁 {{data.constellation}}</span>
                <i class="iconfont icon-horn"  @click="playAudio()" ></i>
                <audio id="audioPreview" :src="audioURL" v-show="false"></audio>
            </p>
            <p class="slogan">{{data.slogan}}</p>
            <p class="tags">
                <span class="tag active" v-for="(item,i) in data.tags" :key="i">{{item}}</span>
            </p>
        </div>
        <div class="btn-wrap flex v-c h-c">
            <button class="btn round" type="button" @click="modalVisible=true">立即下单</button>
        </div>
        <table class="prop-tb">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th v-for="(type,i) in data.product_type" :key="i">{{ type }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product,i) in data.product" :key="i">
                    <template v-for="(col,j) in product">
                        <th v-if="j==0" :key="j" >{{ col || '-' }}</th>
                        <td v-else :key="j">{{ col || '-' }}</td>
                    </template>
                </tr>
            </tbody>
        </table>
        <!-- 下单弹窗 start -->
        <modal title="下单" @close="modalVisible=false" v-show="modalVisible">
            <form class="form-blk" @submit="submitOrder">
                <div class="form-line">
                    <label class="label">昵 &nbsp; &nbsp; &nbsp; 称：</label>
                    <div class="flex-1">
                        若谷
                    </div>
                </div>      
                <div class="form-line">
                    <label class="label">产品类型：</label>
                    <div class="flex-1">
                        <div class="select">
                            <select v-model="orderForm.type">
                                <option value="1">产品类型1</option>
                                <option value="2">产品类型2</option>
                                <option value="3">产品类型3</option>
                                <option value="4">产品类型4</option>
                            </select>
                        </div>  
                    </div>
                </div>     
                <div class="form-line">
                    <label class="label">时 &nbsp; &nbsp; &nbsp; 长：</label>
                    <div class="flex-1">
                        <div class="select">
                            <select v-model="orderForm.time">
                                <option value="1">时长1</option>
                                <option value="2">时长2</option>
                                <option value="3">时长3</option>
                                <option value="4">时长4</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-line">
                    <label class="label">单 &nbsp; &nbsp; &nbsp; 价：</label>
                    <div class="flex-1">
                        ￥288
                    </div>
                </div>      
                <div class="form-line">
                    <label class="label">数 &nbsp; &nbsp; &nbsp; 量：</label>
                    <div class="flex-1">
                        <input class="ipt" type="tel" size="3" v-model.trim="orderForm.number">
                    </div>
                </div>      
                <div class="form-line">
                    <label class="label">联系微信：</label>
                    <div class="flex-1">
                        <input class="ipt full" type="text" v-model.trim="orderForm.wchat">
                    </div>
                </div>      
                <div class="form-line">
                    <label class="label">备 &nbsp; &nbsp; &nbsp; 注：</label>
                    <div class="flex-1">
                        <textarea v-model.trim="orderForm.remark"></textarea>
                    </div>
                </div>
                <div class="price-infos">
                    <div class="item flex">
                        <p class="flex-1">原 &nbsp; &nbsp; &nbsp; 价：</p>
                        <p>286.00</p>
                    </div>
                    <div class="item flex">
                        <p class="flex-1">折扣金额：</p>
                        <p>-90.00</p>
                    </div>
                    <div class="item flex">
                        <p class="flex-1">实时汇率：</p>
                        <p>9.00</p>
                    </div>
                    <div class="total flex">
                        <p class="flex-1">总价：</p>
                        <p class="color-red">￥457.00</p>
                    </div>
                </div>
                <hr class="splitter">
                <div class="form-tip">
                    <h4>用户须知</h4>
                    <p>1、温莎石斛的发号施令，回家吃点哈看看得见哈咯；</p>
                    <p>2、和绿化回家，喝咖啡哈刘欢发放v 房间打开 v 好；</p>
                </div>
                <div class="form-btn text-right">
                    <button type="submit" class="btn btn-red small round">确认下单</button>
                </div>
                
            </form>
        </modal>
        <!-- 下单弹窗 end -->
	</div>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
	name: 'Detail',
    components: {
        Modal
    },
    data () {
    	return {
    		bannerVisible: true,
            modalVisible: false,
            data: {
                id: 1,
                imgs: ["images/temp-banner.png","images/temp-banner.png","images/temp-banner.png","images/temp-banner.png","images/temp-banner.png"],
                level: "A级",
                status: 1,
                nickname: "白冰",
                sex: 1,
                constellation: "处女座",
                age: 28,
                price: 10.0,
                slogan: "不如就陷在这里吧，天亮再回去个回去湖区回去",
                tags:['#标签',"人见人爱"]
            },
            banner: [],
            currentId: '',
            allProductType: [],
            audioURL: '',
            priceList: [],
            orderForm: {
                type: "",
                time: "",
                number: "",
                wchat: "",
                remark: ""
            }
    	}
    },
    methods: {
        playAudio () {
            document.getElementById('audioPreview').play()
            // TODO: 测试苹果系统播放
        },
    	submitOrder (e){
            e.preventDefault()
            if(this.orderForm.type.length==0){
                this.$toast('请选择产品类型')
                return false
            }
            if(this.orderForm.time.length==0){
                this.$toast('请选择时长')
                return false
            }
            if(this.orderForm.number.length==0){
                this.$toast('请填写数量')
                return false
            }
            if(this.orderForm.wchat.length==0){
                this.$toast('请填写微信')
                return false
            }
            this.$toast('下单成功')
            this.modalVisible = false
        },
        fixScroll () {
            setTimeout(()=>{
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            },100)
        },
        getDetail (id) {
            this.$http({
                method: 'GET', 
                url: `api/v1/anchor/detail/?id=${id}`,
                showLoading: true
            }).then(result => {
                this.data = result.data
                this.siteUtils.getImgOSS(this.data.avatar).then(res => {
                    this.banner.push(res)
                })
                for (let i = 0; i < this.data.image.length; ++i) {
                    this.siteUtils.getImgOSS(this.data.image[i]).then(res => {
                        this.banner.push(res)
                    })
                }
            }, error => {
                this.$router.push('/')
                console.log(error)
            })
        },
        getProductType (id) {
            this.$http({
                method: 'GET', 
                url: `api/v1/info/product-type/?id=${id}`,
                showLoading: true
            }).then(result => {
                this.allProductType = result.data
            }, error => {
                this.$router.push('/')
                console.log(error)
            })
        },
        // getPriceTable (id) {
        //     this.$http({
        //         method: 'GET', 
        //         url: `api/v1/info/product/?id=${id}&type=${type.id}`,
        //         showLoading: true
        //     }).then(result => {
        //         console.log('result',result)
        //         this.priceList = result.data
        //     }, error => {
        //         this.$router.push('/')
        //         console.log(error)
        //     })
        // }
    },
    created () {
    	this.setTitle('详情')
    },
	mounted(){
        if (!this.currentId)
            this.currentId = this.$route.query.id;
        if (!this.audioURL)
            this.audioURL = this.$route.query.audioURL
        this.getDetail(this.currentId)
        this.getProductType(this.currentId)
        // this.getPriceTable(this.currentId)

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
	}
}
</script>
