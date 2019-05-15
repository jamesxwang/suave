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
                <label class="label">城 &nbsp; &nbsp; &nbsp; 市：</label>
                <div class="flex-1">
                	<div class="select">
                		<select v-model="regData.city_id" >
	                        <option v-for="(city,i) in allCities" :key="i" :value="city.id">{{ city.name }}</option>
	                    </select>
                	</div>
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
                		<select v-model="regData.gender" >
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
                <label class="label">手机号码：</label>
                <div class="flex-1">
                    <input class="ipt full" type="tel" v-model.trim="regData.mobile">
                </div>
            </div>
            <div class="form-line">
                <label class="label">微 &nbsp; &nbsp; &nbsp; 信：</label>
                <div class="flex-1">
                    <input class="ipt full" type="text" v-model.trim="regData.wechat_id">
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
                    <audio id="audioPreview" src="" v-show="false"></audio>
                    <button id="playAudioBtn" type="submit" class="btn small round" @click="playAudio()">
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
                identity: '',
                birthday: '1990-01-01',
                gender: '-1',
                mobile: '',
                wechat_id: '',
                audio: '',
                avatar: '',
                image: ['','',''],
                slogan: '',
                tags: []
            },
            postData: {},
            allCities: [],
            allGender: [],
            allTags: [],
            audioPreview: false,
            audioType: ''
    	}
    },
    methods: {
    	showDatePicker () {
    		this.$refs.datePicker.open()
    	},
    	handleConfirmDate (val) {
    		this.regData.birthday = this.siteUtils.formatDate(val)
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
            const idReg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
            if (!this.regData) {
                this.$toast('请输入真实姓名')
                return false
            }
            else if (!this.regData.nickname) {
                this.$toast('请输入昵称')
                return false
            }
            else if (!this.regData.city_id) {
                this.$toast('请选择所在城市')
                return false
            }
            else if (!this.regData.identity || !idReg.test(this.regData.identity)) {
                this.$toast('请输入正确的身份证号码')
                return false
            }
            else if (this.regData.gender == '-1') {
                this.$toast('请选择性别')
                return false
            }
            else if (!this.regData.mobile) {
                this.$toast('请输入手机号')
                return false
            }
            else if (!this.regData.wechat_id) {
                this.$toast('请输入微信号')
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
        async submitAction (e) {
            e.preventDefault();
            if(!this.validateForm()) {
                return
            }
            try {
                let avatarUrl = await this.putImgOSS(this.regData.avatar)
                let imgsUrlList = []
                for (let i = 0; i < this.regData.image.length; ++i) {
                    if (this.regData.image[i]) {
                        let imgUrl = await this.putImgOSS(this.regData.image[i])
                        imgsUrlList.push(imgUrl)
                    }
                }
                let audioUrl = await this.putAudioOSS(this.regData.audio)
                this.postData = this.siteUtils.cloneObj(this.regData)
                this.postData.avatar = avatarUrl
                this.postData.image = imgsUrlList
                this.postData.audio = audioUrl
                console.log('申请陪聊：',this.postData)
                // http post: api/v1/anchor/apply/ 
                this.$http({
                    method: 'POST', 
                    url: 'api/v1/anchor/apply/', 
                    data: this.postData,
                    showLoading: true
                }).then(res => {
                    this.$toast('申请成功，请耐心等待审核，即将返回微信...')
                    setTimeout(() => {
                        window.opener = null
                        window.close()
                        WeixinJSBridge.call('closeWindow')
                        wx.closeWindow();
                    }, 3 * 1000);
			        // this.$router.push('/')
                }, error => {
                    this.$toast('程序异常，请联系管理员3:' + error.message)
                })
            } catch (e) {
                console.log(e)
            }
        },
        async putAudioOSS (urlData) {
            return new Promise((resolve, reject) => {
                const base64 = urlData.split(',').pop();
                const fileType = this.audioType.split('.').pop()
                // base64转blob
                const blob = this.siteUtils.toBlob(base64, fileType);
                // blob转arrayBuffer
                const reader = new FileReader();
                reader.readAsArrayBuffer(blob);
                reader.onload = (event) => {
                    // 配置
                    const client = new OSS({
                        endpoint: 'audio.suavechat.com',
                        region: 'oss-ap-southeast-2',
                        //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
                        accessKeyId: 'LTAIcJ2c4DfxlC90',
                        accessKeySecret: 'e4AnZMeLZlKvuKuJOSs2Rrk2JzofFw',
                        bucket: 'suave-audio',
                        cname: true
                    });
                    // 文件名
                    const objectKey = `${new Date().getTime()}.${fileType.split('/').pop()}`;
                    // arrayBuffer转Buffer
                    const buffer = new OSS.Buffer(event.target.result);
                    // 上传
                    client.put(objectKey, buffer).then((result) => {
                        console.log('上传音频成功',result)
                        resolve(result.url)
                    }).catch((err) => {
                        reject()
                    })
                }
            })
        },
        async putImgOSS (urlData) {
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
                        console.log('上传图片成功',result)
                        resolve(result.url)
                    }).catch((err) => {
                        reject()
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
        getObjectURL (file) {  
            let url = null;  
            if (window.createObjectURL != undefined) { // basic  
                url = window.createObjectURL(file);  
            } else if (window.URL != undefined) { // mozilla(firefox)  
                url = window.URL.createObjectURL(file);  
            } else if (window.webkitURL != undefined) { // webkit or chrome  
                url = window.webkitURL.createObjectURL(file);  
            }
            return url;  
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
            this.siteUtils.audioFileCompress(e.target.files[0]).then(res=>{
                this.regData.audio = res
                let objUrl = this.getObjectURL(e.target.files[0])
                document.getElementById('audioPreview').setAttribute('src', objUrl)
                this.audioType = fileType
                let audioTime = this.getTime()
                if (audioTime > 20) {
                    this.$toast('请上传20秒以内的音频')
                    return
                }
                this.audioPreview = true
            })
        },
        getTime () {
            setTimeout(() => {
                let duration = document.getElementById('audioPreview').duration;  
                if(isNaN(duration)){  
                    this.getTime()
                }  
                else{
                    console.info("该音频的总时间为："+duration+"秒")  
                    return duration
                }  
            }, 10);
        },
        fixScroll () {
            setTimeout(()=>{
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            },100)
        },
        getAllCities () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/info/city/', 
            }).then(res => {
                this.allCities = res.data
            }, error => {
                console.log(error)
            })
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
        }
    },
    created () {
        this.setTitle('注册陪聊')
    },
	mounted(){
        this.getAllCities()
        this.getAllGender()
        this.getAllTags()
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
