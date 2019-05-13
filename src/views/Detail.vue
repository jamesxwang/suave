<template>
	<div class="page-detail">
		<div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,i) in data.imgs" :key="i"><img :src="item"></mt-swipe-item>
            </mt-swipe>
            <a class="close" href="javascript:;" @click="goBack"><i class="iconfont icon-close"></i></a>
        </div>
        <div class="info-blk">
            <p>
                <span class="name">{{data.name}}</span>
                <i class="iconfont icon-boy" v-if="data.sex==1"></i>
                <i class="iconfont icon-girl" v-else></i>
                <span class="props">{{data.age}}岁 {{data.xz}}</span>
                <i class="iconfont icon-horn"></i>
            </p>
            <p class="slogan">{{data.desc}}</p>
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
                    <th>产品类型</th>
                    <th>产品类型</th>
                    <th>产品类型</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 8" :key="i">
                    <th>时长</th>
                    <td>100</td>
                    <td>123</td>
                    <td>64</td>
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
                name: "白冰",
                sex: 1,
                xz: "处女座",
                age: 28,
                price: 10.0,
                desc: "不如就陷在这里吧，天亮再回去个回去湖区回去",
                tags:['#标签',"人见人爱"]
            },
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
        }
    },
    created () {
    	this.setTitle('详情')
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
	}
}
</script>
