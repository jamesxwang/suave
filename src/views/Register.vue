<template>
	<div class="page-register">
		<div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item,i in sliders" :key="i"><img :src="item"></mt-swipe-item>
            </mt-swipe>
        </div>
        <h2>注册陪聊</h2>
        <form class="form-blk" @submit="submitAction">
            <div class="form-line">
                <label class="label">真实姓名：</label>
                <div class="flex-1">
                	<input class="ipt full" type="text" v-model.trim="regForm.realName">
                </div>
            </div>   
            <div class="form-line">
                <label class="label">昵 &nbsp; &nbsp; &nbsp; 称：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regForm.nickName">
                </div>
            </div>
            <div class="form-line">
                <label class="label">证件类型：</label>
                <div class="flex-1">
                	<div class="select">
	                    <select v-model="regForm.type">
	                        <option value="1">身份证</option>
	                        <option value="2">护照</option>
	                        <option value="3">驾驶证</option>
	                    </select>
	                </div>
                </div>
            </div>
            <div class="form-line">
                <label class="label">性 &nbsp; &nbsp; &nbsp; 别：</label>
                <div class="flex-1">
                	<div class="select">
                		<select v-model="regForm.sex">
	                        <option value="1">男</option>
	                        <option value="2">女</option>
	                    </select>
                	</div>
                </div>
            </div>
            <div class="form-line">
                <label class="label">生 &nbsp; &nbsp; &nbsp; 日：</label>
                <div class="flex-1" @click="showDatePicker">
                    <div class="ipt birth flex v-c">
                    	<input class="flex-1 mr-10" disabled="disabled" v-model="regForm.birth">
                    	<i class="iconfont icon-calendar"></i>
                    </div>
                </div>
            </div>
            <div class="form-line">
                <label class="label">手机号码：</label>
                <div class="flex-1">
                    <input class="ipt full" type="tel" v-model.trim="regForm.mobile">
                </div>
            </div>
            <div class="form-line">
                <label class="label">个性标签：</label>
                <div class="flex-1">
                    <label class="checkbox" v-for="i in 5" :key="i"><input type="checkbox" :value="i" v-model="regForm.tags"><span class="tag">#标签</span></label>
                </div>
            </div>
            <div class="form-line">
                <label class="label">标 &nbsp; &nbsp; &nbsp; 语：</label>
                <div class="flex-1">
                    <textarea v-model.trim="regForm.slogan"></textarea>
                </div>
            </div>
            <div class="form-line">
                <label class="label">头像上传：</label>
                <div class="flex-1">
                    <label class="upload-img">
                    	<input type="file" @change="uploadImg($event,'avatar',0)">
                    	<img v-if="regForm.avatar.length>0" :src="regForm.avatar">
                    	<div class="inner" v-else>
                    		<i class="iconfont icon-plus"></i>
							<p>上传头像</p>
                    	</div>
                    </label>
                </div>
            </div>
            <div class="form-line">
                <label class="label">图片上传：</label>
                <div class="flex-1 flex">
                    <label class="upload-img" v-for="item,i in regForm.imgs">
                    	<input type="file" @change="uploadImg($event,'img',i)">
                    	<img v-if="item.length>0" :src="item">
                    	<div class="inner" v-else>
                    		<i class="iconfont icon-plus"></i>
							<p>上传照片</p>
                    	</div>
                    </label>
                </div>
            </div>
            <div class="form-line">
                <label class="label">上传语音：</label>
                <div class="flex-1">
                    <label class="upload-img upload-voice">
                    	<input type="file" @change="uploadVoice()">
                    	<div class="inner">
                    		<i class="iconfont icon-upload"></i> 上传文件
                    	</div>
                    </label>
                </div>
            </div>
            <div class="mt-20 text-center">
            	<button type="submit" class="btn round">确认申请</button>
            </div>
        </form>
		<!-- 日期选择 -->
		<mt-datetime-picker
			ref="datePicker"
		  	:value="regForm.birth"
		  	type="date"
		  	year-format="{value} 年"
		  	month-format="{value} 月"
		  	date-format="{value} 日"
		  	:start-date="new Date('1960-01-01')"
		  	:end-date="new Date()"
		  	@confirm="handleConfirmDate">
		</mt-datetime-picker>
	</div>
</template>

<script>
let codeTimer = null
export default {
	name: 'Appoint',
    components: {
        
    },
    data () {
    	return {
    		sliders: ["images/temp-banner.png","images/temp-banner.png","images/temp-banner.png","images/temp-banner.png","images/temp-banner.png"],
    		regForm: {
    			realName: '',
    			nickName: '',
    			type: '1',
    			idno: '',
    			sex: '',
    			birth: '1990-01-01',
    			mobile: '',
    			tags: [],
    			slogan: '',
    			avatar: '',
    			imgs: ['','',''],
    			voice: '',
    			isAgree: false
    		}
    	}
    },
    methods: {
    	showDatePicker () {
    		this.$refs.datePicker.open()
    	},
    	handleConfirmDate (val) {
    		this.regForm.birth = this.siteUtils.formatDate(val)
    	},
    	submitAction (e) {
    		e.preventDefault();
	    	// if(this.regForm.school.length==0){
	    	// 	this.$toast('请选择校区')
	    	// 	return false
	    	// }
	    	this.$toast('注册成功')
			this.$router.push('/')
    	},
    	uploadImg (eve,type,index) {
    		let dotPos = eve.target.files[0].name.lastIndexOf(".")
            let fileNameLen = eve.target.files[0].name.length
            let fileType = eve.target.files[0].name.substring(dotPos, fileNameLen).toLowerCase()
            let imgReg = /(\.jpg|\.jpeg|\.png|\.bmp)/
            if(!imgReg.test(fileType)){
            	this.$toast('请上传图片格式')
            	return
            }
            this.siteUtils.imageFileCompress(eve.target.files[0]).then(res=>{
            	if(type=='avatar'){
            		this.regForm.avatar = res
            	}else{
            		this.$set(this.regForm.imgs,index,res)
            	}
            })
    	},
    	uploadVoice (e) {},
        fixScroll () {
            setTimeout(()=>{
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            },100)
        }
    },
    created () {
    	this.setTitle('注册陪聊')
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
