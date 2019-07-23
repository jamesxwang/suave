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
                <label @click="changeSort($event,0)">智能排序</label>
                <!-- <select @change="changeSort($event,0)">
                    <option value="0">智能排序</option>
                    <option value="2">综合排序</option>
                    <option value="2">按销量</option>
                </select>
                <i class="tri"></i> -->
            </div>
            <div class="item flex-1" :class="{'active': activeSort==1}">
                <select @change="changeSort($event,1)">
                    <option value="">等级</option>
                    <option v-for="(level,i) in allLevel" :key="i" :value="level.id">{{ level.name }}</option>
                </select>
                <i class="tri"></i>
            </div>
            <div class="item flex-1" :class="{'active': activeSort==2}">
                <select @change="changeSort($event,2)">
                    <option value="">性别</option>
                    <option v-for="(gender,i) in allGender" :key="i" :value="gender.id">{{ gender.gender }}</option>
                </select>
                <i class="tri"></i>
            </div>
            <div class="item flex-1" :class="{'active': activeSort==3}">
                <select @change="changeSort($event,3)">
                    <option value="">城市</option>
                    <option v-for="(city,i) in allCities" :key="i" :value="city">{{ city }}</option>
                </select>
                <i class="tri"></i>
            </div>
        </div>
        <ul class="suave-list">
            <li v-for="(item,i) in dataList" :key="i">
                <router-link :to="'/detail?id='+item.id+'&audio='+item.audio">
                    <div class="img">
                        <img :src="getAvatar(item.avatar)" :alt="item.name">
                        <i class="iconfont icon-horn" @click.stop.prevent="playAudio(item.id)"></i>
                        <audio :id="'audio_'+item.id" :src="getAudio(item.audio)" v-show="false"></audio>
                        <p class="level" v-if="true"><span>{{item.level}}</span></p>
                        <p class="level off" v-else><span>离线</span></p>
                    </div>
                    <div class="details">
                        <div class="flex v-c">
                            <p class="name flex-1">{{item.nickname}}
                                <i class="iconfont icon-boy" v-if="item.gender==1"></i>
                                <i class="iconfont icon-girl" v-else></i>
                            </p>
                            <p class="price">${{item.price}}/起</p>
                        </div>
                        <div class="props">{{item.constellation}} {{item.age}}</div>
                        <div class="desc twice-line">{{item.slogan}}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <div v-if="noMore" class="loadMore">没有更多啦~</div>
        <div v-else id="loadMore" class="loadMore">加载中...</div>
	</div>
</template>

<script>
import { type } from 'os';
let OSS = require('ali-oss')
import { getImageURL, getAudioURL } from '@/assets/js/ali-oss'

export default {
	name: 'Index',
    components: {},
    data () {
    	return {
            activeSort:0,
            dataList: [],
            params: {
                i: 0,
                level: null,
                gender: null,
                city: null
            },
            noMore: false
    	}
    },
    props: {
        allGender: {
            type: Array,
            default: []
        },
        allLevel: {
            type: Array,
            default: []
        },
        allCities: {
            type: Array,
            default: []
        },
    },
    methods: {
        playAudio (id) {
            const $audio = document.getElementById('audio_' + id)
            $audio.play();
        },
        getAnchorList (param) {
            this.siteUtils.convertParams2Str(this.params).then(res => {
                this.$http({
                    method: 'GET', 
                    url: `api/v1/anchor/list/${res}`,
                    showLoading: true
                }).then(result => {
                    if (!result.data.length)
                        this.noMore = true
                    const tmp = result.data
                    tmp.forEach(obj => {
                        this.dataList.push(obj)
                    })
                })
            })
        },
        getAvatar (name) {
            return getImageURL(name)
        },
        getAudio (name) {
            return getAudioURL(name)
        },
    	search (e) {
            e.preventDefault()
            console.log(123)
        },
        changeSort (e,type) {
            let value = e.target.value
            this.activeSort=type
            switch (this.activeSort) {
                // 等级
                case 1:
                    this.params.level = value
                    break;
                // 性别
                case 2:
                    this.params.gender = value
                    break;
                // 城市
                case 3:
                    this.params.city = value
                    break;
                // 智能排序
                default:
                    this.params = {
                        i: 0,
                        level: null,
                        gender: null,
                        city: null
                    }
                    break;
            }
            this.dataList = []
            this.params.i = 0
            this.getAnchorList(this.params)
        },
        loadMore () {
            this.params.i++
            this.getAnchorList(this.params)
        }
    },
    created () {
    	this.setTitle('Suave')
    },
	mounted(){
        this.getAnchorList()
    }
}
</script>
