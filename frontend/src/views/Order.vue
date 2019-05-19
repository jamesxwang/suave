<style lang="less" scoped="scoped">
@import '../assets/css/common.less';
</style>
<template>
	<div class="page-order">
		<div class="order-tab-wrap">
			<div class="order-tab flex v-c">
				<div class="item flex-1" :class="[{'active': activeTab==0}]" @click="switchTab(0)">我的订单</div>
				<div v-if="type==1" class="item flex-1" :class="{'active': activeTab==1}" @click="switchTab(1)">我的接单</div>
			</div>
		</div>
		<ul v-if="activeTab ==0" class="order-list">
			<li class="order-item flex" v-for="(item,i) in dataList" :key="i" @click="showDetail(item,i)">
				<img class="avatar" :src="item.avatar" :alt="item.name">
				<div class="details flex-1">
					<div class="flex v-c mb-10">
						<p class="name flex-1">接单店员：{{item.anchor}}</p>
						<p class="color-red">￥{{item.amount}}</p>
					</div>
					<p>产品：{{item.product}}</p>
					<p>数量：{{item.number}}</p>
					<div class="flex">
						<p class="flex-1">时间：{{ toLocalTime(item.time) }}</p>
						<p class="color-primary">{{item.status}}</p>
					</div>
				</div>
			</li>
		</ul>
        <ul v-if="activeTab ==1" class="order-list">
			<li class="order-item flex" v-for="(item,i) in myOrderList" :key="i" @click="showDetail(item,i)">
				<div class="details flex-1">
					<div class="flex v-c mb-10">
						<p class="name flex-1">类型：{{item.renew}} - {{item.type}}</p>
						<p class="color-red">￥{{item.amount}}</p>
					</div>
					<p>产品：{{item.product}}</p>
					<p>数量：{{item.number}}</p>
					<div class="flex">
						<p class="flex-1">时间：{{ toLocalTime(item.time) }}</p>
						<p class="color-primary">{{item.status}}</p>
					</div>
				</div>
			</li>
		</ul>
		<!-- 订单弹窗 start -->
        <modal title="订单" @close="modalVisible=false" v-show="modalVisible">
            <form class="form-blk">
                <div class="form-line">
                    <label class="label">订 &nbsp;单 &nbsp;号:</label>
                    <div class="flex-1">
                        {{ orderDetail.id }}
                    </div>
                </div>   
                <div class="form-line">
                    <label class="label">订单状态：</label>
                    <div class="flex-1 color-red">
                    	{{ orderDetail.status }}
                    </div>
                </div>   
                <div class="form-line">
                    <label class="label">昵 &nbsp; &nbsp; &nbsp; 称：</label>
                    <div class="flex-1">
                        {{ orderDetail.anchor }}
                    </div>
                </div>
                <div class="form-line">
                    <label class="label">产品类型：</label>
                    <div class="flex-1">
                        {{ orderDetail.product_type }}
                    </div>
                </div>     
                <div class="form-line">
                    <label class="label">时 &nbsp; &nbsp; &nbsp; 长：</label>
                    <div class="flex-1">
                        {{ orderDetail.product }}
                    </div>
                </div>
                <div class="form-line">
                    <label class="label">单 &nbsp; &nbsp; &nbsp; 价：</label>
                    <div class="flex-1">
                        ￥{{ orderDetail.price }}
                    </div>
                </div>
                <div class="form-line">
                    <label class="label">数 &nbsp; &nbsp; &nbsp; 量：</label>
                    <div class="flex-1" >
                        {{ orderDetail.number }}
                    </div>
                </div>      
                <div class="form-line">
                    <label class="label">联系微信：</label>
                    <div class="flex-1">
                        {{ orderDetail.wechat_id }}
                    </div>
                </div>      
                <div class="form-line">
                    <label class="label">备 &nbsp; &nbsp; &nbsp; 注：</label>
                    <div class="flex-1">
                        {{ orderDetail.comment || '无' }}
                    </div>
                </div>
                <div class="price-infos">
                    <div class="item flex">
                        <p class="flex-1">原 &nbsp; &nbsp; &nbsp; 价：</p>
                        <p>${{ orderDetail.amount }}</p>
                    </div>
                    <div class="item flex" v-if="false">
                        <p class="flex-1">折扣金额：</p>
                        <p>-90.00</p>
                    </div>
                    <div class="item flex" v-if="false">
                        <p class="flex-1">实时汇率：</p>
                        <p>4.88</p>
                    </div>
                    <div class="total flex">
                        <p class="flex-1">总价：</p>
                        <p class="color-red">￥{{ orderDetail.rmb_amount }}</p>
                    </div>
                </div>
                <hr class="splitter">
                <div class="form-tip">
                    <h4>用户须知</h4>
                    <p v-for="(line,i) in instructions" :key="i">{{ line }};</p>
                </div>
                <div class="form-btn text-right" v-if="orderDetail.modify">
                    <button type="button" class="btn btn-default small round mr-10" @click="cancelAction(orderDetail.id)">取消订单</button>
                    <button type="button" class="btn btn-red small round" @click="payAction">去付款</button>
                </div>
                
            </form>
        </modal>
        <!-- 下单弹窗 end -->
	</div>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
	name: 'Order',
    components: {
    	Modal
    },
    data () {
    	return {
    		activeTab: 0,
            modalVisible: false,
            dataList: [],
            myOrderList: [],
            allProductType: [],
            orderDetail: {},
            timeList: [],
    		orderForm: {
    			type: '',
    			time: '',
    			number: '',
    			wchat: '',
    			remark: ''
            },
            instructions: [],
            type: -1,
    	}
    },
    methods: {
    	switchTab (index) {
    		this.activeTab = index
    	},
    	showDetail (item, index){            
            if (!item.detail || !item.id)
                return
            this.getDetail(item.id).then(res => {
                this.orderDetail = res.data
    		    this.modalVisible = true
            })
        },
        getDetail (id) {
            console.log(id);
            return new Promise((resolve, reject) => {
                this.$http({
                    method: 'GET', 
                    url: `api/v1/order/detail/?id=${id}`, 
                    showLoading: true
                }).then(res => {
                    resolve(res)
                }, error => {
                    reject()
                })
            })
        },
        cancelAction (id) {
            this.$http({
                method: 'POST',
                data: {id},
                url: `api/v1/order/cancel/`, 
                showLoading: true
            }).then(res => {
                this.getOrder()
                this.$toast('取消成功')
                this.modalVisible = false
            })
        },
    	payAction (e){
            e.preventDefault()
            this.modalVisible = false
        },
        toLocalTime(timestamp) {
            return this.siteUtils.timestamp2datetime(timestamp)
        },
        getOrder () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/order/list/', 
                showLoading: true
            }).then(res => {
                // 0 => 店员
                // 1 => 用户
                this.type = res.type
                this.dataList = res.data
                this.myOrderList = res.data1
                for (let i = 0; i < this.dataList.length ; ++i) {
                    if (!this.dataList[i].avatar) {
                        this.dataList[i].avatar = 'images/suave_logo.jpeg'
                    } else {
                        this.siteUtils.getImgOSS(this.dataList[i].avatar).then(res => {
                            this.dataList[i].avatar = res
                        })
                    }
                }
            }, error => {
                console.log(error)
            })
        },
        getInstructions () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/platform/?tag=order-user-ack',
                showLoading: true
            }).then(result => {
                this.instructions = result.data
            }, error => {
                console.log(error)
            })
        },
        fixScroll () {
            setTimeout(()=>{
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            },100)
        }
    },
    created () {
    	this.setTitle('查看订单')
	},
	mounted(){
        this.getOrder()
        this.getInstructions()
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
