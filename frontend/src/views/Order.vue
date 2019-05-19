<style lang="less" scoped="scoped">
@import '../assets/css/common.less';
</style>
<template>
	<div class="page-order">
		<div class="order-tab-wrap">
			<div class="order-tab flex v-c">
				<div v-if="type==0" class="item flex-1" :class="{'active':type==0}">我的订单</div>
				<div v-if="type==1" class="item flex-1" :class="{'active':type==1}">我的接单</div>
			</div>
		</div>
		<ul class="order-list">
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
		<!-- 下单弹窗 start -->
        <modal title="下单" @close="modalVisible=false" v-show="modalVisible">
            <form class="form-blk">
                <div class="form-line">
                    <label class="label">订&nbsp; 单 &nbsp;号：</label>
                    <div class="flex-1">
                        138490595742935677
                    </div>
                </div>   
                <div class="form-line">
                    <label class="label">订单状态：</label>
                    <div class="flex-1 color-red">
                    	待付款
                    </div>
                </div>   
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
                    <button type="button" class="btn btn-default small round mr-10" @click="editAction">确认修改</button>
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
            allOrders: [],
    		dataList: [{
    			name: "若谷",
    			avatar: 'images/temp-avatar.png',
    			product: "连麦-半小时",
    			number: 10,
    			amount: 10.0,
    			time: "2019-03-30 12:45",
    			status: "待付款"
    		},{
    			name: "若谷",
    			avatar: 'images/temp-avatar.png',
    			product: "连麦-半小时",
    			number: 10,
    			amount: 10.0,
    			time: "2019-03-30 12:45",
    			status: "待接单"
    		},{
    			name: "若谷",
    			avatar: 'images/temp-avatar.png',
    			product: "连麦-半小时",
    			number: 10,
    			amount: 10.0,
    			time: "2019-03-30 12:45",
    			status: "已关闭"
    		},{
    			name: "若谷",
    			avatar: 'images/temp-avatar.png',
    			product: "连麦-半小时",
    			number: 10,
    			amount: 10.0,
    			time: "2019-03-30 12:45",
    			status: "已完成"
    		},{
    			name: "若谷",
    			avatar: 'images/temp-avatar.png',
    			product: "连麦-半小时",
    			number: 10,
    			amount: 10.0,
    			time: "2019-03-30 12:45",
    			status: "已完成"
    		}],
    		orderForm: {
    			type: 1,
    			time: 1,
    			number: 20,
    			wchat: "15099999999",
    			remark: "备注一下"
            },
            allOrders: [],
            type: -1,
    	}
    },
    methods: {
    	switchTab (index) {
    		this.activeTab = index
    	},
    	showDetail (item, index){
            console.log(item, index);
            this.$http({
                method: 'GET', 
                url: `api/v1/order/?id=${item.id}`, 
                showLoading: true
            }).then(res => {
                console.log(res);
    		    this.modalVisible = true
                
            }, error => {
                console.log(error)
            })
    		this.modalVisible = true
    	},
    	editAction (e){
    		this.$toast('修改成功')
    		this.modalVisible = false
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
                this.dataList.forEach(data => {
                    this.siteUtils.getImgOSS(data.avatar).then(res => {
                        data.avatar = res
                    })
                });
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
