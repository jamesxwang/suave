<template>
	<div class="page-register">
		<div class="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,i) in sliders" :key="i"><img :src="item"></mt-swipe-item>
            </mt-swipe>
        </div>
        <h2>注册店员</h2>
        <form class="form-blk" @submit="submitAction">
            <div class="form-line">
                <label class="label">昵 &nbsp; &nbsp; &nbsp; 称：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.nickname">
                </div>
            </div>
            <div class="form-line">
                <label class="label">城 &nbsp; &nbsp; &nbsp; 市：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.city">
                </div>
            </div>
            <div class="form-line">
                <label class="label">性 &nbsp; &nbsp; &nbsp; 别：</label>
                <div class="flex-1">
                	<div class="select">
                		<select v-model="regData.gender" >
                            <option value=""></option>
	                        <option v-for="(gender,i) in allGender" :key="i" :value="gender.id">{{ gender.gender }}</option>
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
                <label class="label">微 &nbsp; &nbsp; &nbsp; 信：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.wechat_id">
                </div>
            </div>
            <div class="form-line">
                <label class="label">职 &nbsp; &nbsp; &nbsp; 业：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.occupation">
                </div>
            </div>
            <div class="form-line">
                <label class="label">特 &nbsp; &nbsp; &nbsp; 长：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.skill">
                </div>
            </div>
            <div class="form-line">
                <label class="label">在线时间：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.online">
                </div>
            </div>
            <div class="form-line">
                <label class="label">陪聊经验：</label>
                <div class="flex-1">
                	<div class="select">
                		<select v-model="regData.experience" >
                            <option value=""></option>
                            <option :value="true">有</option>
                            <option :value="false">无</option>
	                    </select>
                	</div>
                </div>
            </div>
            <div class="form-line">
                <label class="label">个性标签：</label>
                <div class="flex-1">
                    <label class="checkbox" v-for="tag in allTags" :key="tag"><input type="checkbox" :value="tag" v-model="regData.tags"><span class="tag">{{ tag }}</span></label>
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
                    	<img v-if="regData.avatar.length>0" :src="getImage(regData.avatar)">
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
                    	<img v-if="item.length>0" :src="getImage(item)">
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
                    	<input type="file" @change="uploadVoice($event)">
                    	<div class="inner">
                    		<i class="iconfont icon-upload"></i> 上传文件
                    	</div>
                    </label>
                </div>
            </div>
            <div class="form-line" v-show="audioPreview">
                <label class="label">语音预览：</label>
                <div class="flex-1">
                    <audio id="audioPreview" :src="getAudio(regData.audio)" v-show="false"></audio>
                    <button id="playAudioBtn" class="btn small round" @click.stop.prevent="playAudio()">
                        <i class="iconfont icon-horn"></i>
                    </button>
                </div>
            </div>
            <div class="mt-20 text-center">
            	<button type="submit" class="btn round audio">确认申请</button>
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
		  	@confirm="handleConfirmDate"
            @visible-change="handleValueChange">
		</mt-datetime-picker>
	</div>
</template>

<script>
import { Promise, reject, resolve } from 'q';
import { getImageURL, getAudioURL, putAudio, putImage } from '@/assets/js/ali-oss'
let OSS = require('ali-oss')
let wx = require('weixin-js-sdk')
let codeTimer = null
export default {
	name: 'Appoint',
    components: {
        
    },
    data () {
    	return {
    		sliders: ["images/temp-banner.png","images/temp-banner.png","images/temp-banner.png","images/temp-banner.png","images/temp-banner.png"],
            regData: {
                nickname: '',
                city: '',
                birthday: '1990-01-01',
                gender: '-1',
                wechat_id: '',
                audio: '',
                avatar: '',
                image: ['','',''],
                slogan: '',
                tags: [],
                experience: null,
                occupation: '',
                skill: '',
                online: ''
            },
            allGender: [],
            allTags: [],
            audioPreview: false,
    	}
    },
    methods: {
    	showDatePicker () {
    		this.$refs.datePicker.open()
        },
        getAudio(name) {
            return getAudioURL(name)
        },
        getImage(name) {
            return getImageURL(name)
        },
    	handleConfirmDate (val) {
    		this.regData.birthday = this.siteUtils.formatDate(val)
        },
        handleValueChange (val) {
            if (val) {
                document.body.addEventListener('touchmove', (e) => {e.preventDefault()},{passive: false})
            } else {
                document.body.removeEventListener('touchmove', (e) => {e.preventDefault()},{passive: false})
            }
        },
        validateImages() {
            let imageNotEmpty = false
            this.regData.image.forEach(img => {
                if (img)
                    imageNotEmpty = true
            })
            return imageNotEmpty
        },
        validateForm () {
            if (!this.regData.nickname) {
                this.$toast('请输入昵称')
                return false
            }
            else if (!this.regData.city) {
                this.$toast('请选择所在城市')
                return false
            }
            else if (this.regData.gender == '-1') {
                this.$toast('请选择性别')
                return false
            }
            else if (!this.regData.wechat_id) {
                this.$toast('请输入微信号')
                return false
            }
            else if (!this.regData.occupation) {
                this.$toast('请输入职业')
                return false
            }
            else if (!this.regData.skill) {
                this.$toast('请输入特长')
                return false
            }
            else if (!this.regData.online) {
                this.$toast('请输入在线时间')
                return false
            }
            else if (this.regData.experience == null) {
                this.$toast('请选择是否有陪聊经验')
                return false
            }
            else if (!this.regData.avatar) {
                this.$toast('请上传头像')
                return false
            }
            else if (!this.validateImages()) {
                this.$toast('请上传至少一张照片')
                return false
            }
            else if (!this.regData.audio) {
                this.$toast('请上传语音')
                return false
            }
            return true
        },
        submitAction (e) {
            e.preventDefault();
            if(!this.validateForm()) {
                return
            }
            console.log('注册店员：',this.regData)
            // http post: api/v1/anchor/apply/ 
            this.$http({
                method: 'POST', 
                url: 'api/v1/anchor/apply/', 
                data: this.regData,
                showLoading: true
            }).then(res => {
                this.$toast('您的申请已提交，请等待客服联系审核，即将返回微信...')
                setTimeout(() => {
                    window.opener = null
                    window.close()
                    wx.closeWindow();
                }, 3 * 1000);
            }, error => {
                this.$toast('程序异常，请联系管理员:' + error.message)
                console.log(error)
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
            let imgFile = eve.target.files[0]
            console.log(imgFile)
            putImage(imgFile, fileType).then(res => {
                console.log(res)
                if (type=='avatar') {
                    this.regData.avatar = res
                } else {
                    this.$set(this.regData.image, index, res)
                }
            })
        },
        playAudio () {
            document.getElementById('audioPreview').play()
            // TODO: 测试苹果系统播放
        },
    	uploadVoice (e) {
            let dotPos = e.target.files[0].name.lastIndexOf(".")
            let fileNameLen = e.target.files[0].name.length
            let fileType = e.target.files[0].name.substring(dotPos, fileNameLen).toLowerCase()
            let imgReg = /(\.ogg|\.m4a|\.wav|\.mp3)/
            if(!imgReg.test(fileType)){
            	this.$toast('请上传音频格式')
            	return
            }
            let audioFile = e.target.files[0]
            putAudio(audioFile, fileType).then(res => {
                this.regData.audio = res
                this.audioPreview = true
            })
        },
        fixScroll () {
            setTimeout(()=>{
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight - 1, 0))
            },100)
        },
        getAllGender () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/gender/', 
            }).then(res => {
                this.allGender = res.data
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
        getBannerImages () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/platform/?tag=register-banner',
                showLoading: true
            }).then(res => {
                this.sliders = res.data
            }, error => {
                console.log(error)
            })
        }
    },
    created () {
        this.setTitle('注册店员')
    },
	mounted(){
        this.getAllGender()
        this.getAllTags()
        this.getBannerImages()
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
