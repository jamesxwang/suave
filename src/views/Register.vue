<template>
	<div class="page-register">
		<div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,i) in sliders" :key="i"><img :src="item"></mt-swipe-item>
            </mt-swipe>
        </div>
        <h2>注册陪聊</h2>
        <form class="form-blk" @submit="submitAction">
            <div class="form-line">
                <label class="label">真实姓名：</label>
                <div class="flex-1">
                	<input class="ipt full" type="text" v-model.trim="regData.name">
                </div>
            </div>   
            <div class="form-line">
                <label class="label">昵 &nbsp; &nbsp; &nbsp; 称：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.nickname">
                </div>
            </div>
            <div class="form-line">
                <label class="label">身份证号：</label>
                 <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.identity">
                </div>
            </div>
            <div class="form-line">
                <label class="label">性 &nbsp; &nbsp; &nbsp; 别：</label>
                <div class="flex-1">
                	<div class="select">
                		<select v-model="regData.gender">
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
                    	<input class="flex-1 mr-10" disabled="disabled" v-model="regData.birthday">
                    	<i class="iconfont icon-calendar"></i>
                    </div>
                </div>
            </div>
            <div class="form-line">
                <label class="label">手机号码：</label>
                <div class="flex-1">
                    <input class="ipt full" type="tel" v-model.trim="regData.mobile">
                </div>
            </div>
            <div class="form-line">
                <label class="label">个性标签：</label>
                <div class="flex-1">
                    <label class="checkbox" v-for="i in 5" :key="i"><input type="checkbox" :value="i" v-model="regData.tags"><span class="tag">#标签</span></label>
                </div>
            </div>
            <div class="form-line">
                <label class="label">标 &nbsp; &nbsp; &nbsp; 语：</label>
                <div class="flex-1">
                    <textarea v-model.trim="regData.slogan"></textarea>
                </div>
            </div>
            <div class="form-line">
                <label class="label">头像上传：</label>
                <div class="flex-1">
                    <label class="upload-img">
                    	<input type="file" @change="uploadImg($event,'avatar',0)">
                    	<img v-if="regData.avatar.length>0" :src="regData.avatar">
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
                    <label class="upload-img" v-for="(item,i) in regData.image" :key="i">
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
		  	:value="regData.birthday"
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
import { Promise, reject, resolve } from 'q';
let OSS = require('ali-oss')
let codeTimer = null
export default {
	name: 'Appoint',
    components: {
        
    },
    data () {
    	return {
    		sliders: ["images/temp-banner.png","images/temp-banner.png","images/temp-banner.png","images/temp-banner.png","images/temp-banner.png"],
            regData: {
                name: '',
                nickname: '',
                city_id: '',
                identity_type: '',
                identity: '',
                birthday: '1990-01-01',
                gender: '',
                mobile: '',
                wechat_id: '',
                audio: '',
                avatar: '',
                image: ['','',''],
                slogan: '',
                tags: []
            },
            postData: {}
    	}
    },
    methods: {
    	showDatePicker () {
    		this.$refs.datePicker.open()
    	},
    	handleConfirmDate (val) {
    		this.regData.birthday = this.siteUtils.formatDate(val)
        },
        pushAvatarOSS () {
            this.putToOSS(this.postData.avatar).then((url) => {
                this.postData.avatar = url
            }).catch((err) => {
                console.log(err);
            });
        },
        pushImageOSS () {
            let tmp = []
            this.postData.image.forEach(img => {
                if (img) {
                    this.putToOSS(img)
                    .then((url) => {
                        tmp.push(url)
                    }).then(()=>{
                        this.postData.image = tmp
                    }).catch(err => {
                        this.$toast('程序异常，请联系管理员')
                    });
                }
            })
        },
    	submitAction (e) {
    		e.preventDefault();
	    	// if(this.regData.school.length==0){
	    	// 	this.$toast('请选择校区')
	    	// 	return false
            // }
            this.postData = this.siteUtils.cloneObj(this.regData)
            return new Promise((resolve, reject) => {
                this.pushAvatarOSS()
                this.pushImageOSS()
                resolve()
            }).then(() => {
                console.log(this.postData);
                // http post: /api/v1/anchor/apply/ 
                this.$ajax({
                    method: 'POST', 
                    url: '/api/v1/anchor/apply/', 
                    data: this.postData,
                    showLoading: true
                }).then(res => {
                   console.log(res)
	    	        this.$toast('注册成功')
			        this.$router.push('/')
                }, error => {
                    this.$toast('程序异常，请联系管理员:' + error.message)
                })
            })
        },
        putToOSS (urlData) {
            return new Promise((resolve, reject) => {
                const base64 = urlData.split(',').pop();
                const fileType = urlData.split(';').shift().split(':').pop();
                // base64转blob
                const blob = this.siteUtils.toBlob(base64, fileType);
                // blob转arrayBuffer
                const reader = new FileReader();
                reader.readAsArrayBuffer(blob);
                reader.onload = (event) => {
                    // 配置
                    const client = new OSS({
                        endpoint: 'image.suavechat.com',
                        region: 'oss-ap-southeast-2',
                        //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
                        accessKeyId: 'LTAIcJ2c4DfxlC90',
                        accessKeySecret: 'e4AnZMeLZlKvuKuJOSs2Rrk2JzofFw',
                        bucket: 'suave-image',
                        cname: true
                    });
                    // 文件名
                    const objectKey = `${new Date().getTime()}.${fileType.split('/').pop()}`;
                    // arrayBuffer转Buffer
                    const buffer = new OSS.Buffer(event.target.result);
                    // 上传
                    client.put(objectKey, buffer).then((result) => {
                        resolve(result.url)
                        /* e.g. result = {
                            name: "1511601396119.png",
                            res: {status: 200, statusCode: 200, headers: {…}, size: 0, aborted: false, …},
                            url: "http://image.suavechat.com/1511601396119.png"
                        } */
                    }).catch((err) => {
                        reject()
                        this.$toast('程序异常，请联系管理员')
                    });
                }
            })
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
            		this.regData.avatar = res
            	}else{
            		this.$set(this.regData.image,index,res)
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
