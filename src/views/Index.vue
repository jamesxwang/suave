<template>
	<div class="page-index">
        <div class="search-wrap">
            <form class="search-box flex" type="search" @submit="search">
                <input type="search" class="flex-1" placeholder="搜索">
                <button type="submit"><i class="iconfont icon-search"></i></button>
            </form>
        </div>
		
        <div class="sort-blk flex">
            <div class="item flex-1" :class="{'active': activeSort==0}">
                <select @change="changeSort($event,0)">
                    <option value="0">智能排序</option>
                    <option value="2">综合排序</option>
                    <option value="2">按销量</option>
                </select>
                <i class="tri"></i>
            </div>
            <div class="item flex-1" :class="{'active': activeSort==1}">
                <select @change="changeSort($event,1)">
                    <option value="0">等级</option>
                    <option value="2">A级</option>
                    <option value="2">B级</option>
                </select>
                <i class="tri"></i>
            </div>
            <div class="item flex-1" :class="{'active': activeSort==2}">
                <select @change="changeSort($event,2)">
                    <option value="0">性别</option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                </select>
                <i class="tri"></i>
            </div>
            <div class="item flex-1" :class="{'active': activeSort==3}">
                <select @change="changeSort($event,3)">
                    <option value="0">城市</option>
                    <option value="1">北京</option>
                    <option value="2">上海</option>
                </select>
                <i class="tri"></i>
            </div>
        </div>
        <ul class="suave-list">
            <li v-for="(item,i) in dataList" :key="i">
                <router-link :to="'/detail?id='+item.id">
                    <div class="img">
                        <img :src="item.avatar" :alt="item.name">
                        <i class="iconfont icon-horn" @click="playAudio(item.id)"></i>
                        <audio :id="'audio_'+item.id" :src="item.audio" v-show="false"></audio>
                        <p class="level" v-if="true"><span>{{item.level}}级</span></p>
                        <p class="level off" v-else><span>离线</span></p>
                    </div>
                    <div class="details">
                        <div class="flex v-c">
                            <p class="name flex-1">{{item.nickname}}
                                <i class="iconfont icon-boy" v-if="item.gender==1"></i>
                                <i class="iconfont icon-girl" v-else></i>
                            </p>
                            <p class="price">￥{{item.price}}/起</p>
                        </div>
                        <div class="props">{{item.constellation}} {{item.age}}</div>
                        <div class="desc twice-line">{{item.slogan}}</div>
                    </div>
                </router-link>
            </li>
        </ul>
	</div>
</template>

<script>
let OSS = require('ali-oss')
export default {
	name: 'Index',
    components: {},
    data () {
    	return {
            activeSort:0,
    		dataList:[{
                id: 1,
                avatar: "images/temp-poster.png",
                level: "A",
                status: 1,
                nickname: "白冰",
                gender: 1,
                constellation: "处女座",
                age: 28,
                price: 10.0,
                slogan: "不如就陷在这里吧，天亮再回去个回去湖区回去"
            }]
    	}
    },
    methods: {
        getImgOSS (imgKey) {
            return new Promise((resolve, reject) => {
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
                client.get(imgKey).then((result) => {
                    let blobURL = this.siteUtils.getImageURL(result.content)
                    resolve(blobURL)
                }).catch((err) => {
                    reject()
                });
            })
        },
        getAudioOSS (audioKey) {
            return new Promise((resolve, reject) => {
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
                client.get(audioKey).then((result) => {
                    let blobURL = this.siteUtils.getAudioURL(result.content)
                    resolve(blobURL)
                }).catch((err) => {
                    reject()
                });
            })
        },
        playAudio (id) {
            const $audio = document.getElementById('audio_' + result.data[i].id)
            audio = new Audio($audio.src);
            audio.play();
        },
        getAnchorList (i) {
            if (!i) {
                i = 0
            }
            this.$http({
                method: 'GET', 
                url: `api/v1/anchor/list/?index=${i}`, 
            }).then(result => {
                for (let i = 0; i < result.data.length; ++i) {
                    this.getImgOSS(result.data[i].avatar).then(res => {
                        result.data[i].avatar = res
                    })
                }
                this.getAudioOSS(result.data[i].audio).then(res => {
                    // res 是 base64 文件
                    // TODO: base64 转成可播放的blob文件

                    // 这里返回一个blob对象
                    let blob = this.siteUtils.toBlob(res, 'audio/x-m4a')
                    // 返回 blob: http://xxxxxx
                    let url = URL.createObjectURL(blob)
                    console.log(url)
                    const $audio = document.getElementById('audio_' + result.data[i].id)
                    $audio.src = url
                })
                this.dataList = result.data
                console.log('getAnchorList',result)
            }, error => {
                console.log(error)
            })
        },
    	search (e) {
            e.preventDefault()
            console.log(123)
        },
        changeSort (e,type) {
            console.log(e.target.value)
            this.activeSort=type
        },
    },
    created () {
    	this.setTitle('Suave')
    },
	mounted(){
        this.getAnchorList()
	}
}
</script>
