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
                        <img :src="item.img" :alt="item.name">
                        <i class="iconfont icon-horn"></i>
                        <p class="level" v-if="item.status==1"><span>{{item.level}}</span></p>
                        <p class="level off" v-else><span>离线</span></p>
                    </div>
                    <div class="details">
                        <div class="flex v-c">
                            <p class="name flex-1">{{item.name}}
                                <i class="iconfont icon-boy" v-if="item.sex==1"></i>
                                <i class="iconfont icon-girl" v-else></i>
                            </p>
                            <p class="price">￥{{item.price}}/起</p>
                        </div>
                        <div class="props">{{item.xz}} {{item.age}}</div>
                        <div class="desc twice-line">{{item.desc}}</div>
                    </div>
                </router-link>
            </li>
        </ul>
	</div>
</template>

<script>
export default {
	name: 'Index',
    components: {},
    data () {
    	return {
            activeSort:0,
    		dataList:[{
                id: 1,
                img: "images/temp-poster.png",
                level: "A级",
                status: 1,
                name: "白冰",
                sex: 1,
                xz: "处女座",
                age: 28,
                price: 10.0,
                desc: "不如就陷在这里吧，天亮再回去个回去湖区回去"
            },{
                id: 2,
                img: "images/temp-poster.png",
                level: "A级",
                status: 0,
                name: "白冰",
                sex: 2,
                xz: "处女座",
                age: 28,
                price: 10.0,
                desc: "不如就陷在这里吧，天亮再回去个回去湖区回去"
            },{
                id: 3,
                img: "images/temp-poster.png",
                level: "B级",
                status: 1,
                name: "白冰",
                sex: 1,
                xz: "处女座",
                age: 28,
                price: 10.0,
                desc: "不如就陷在这里吧，天亮再回去个回去湖区回去"
            },{
                id: 1,
                img: "images/temp-poster.png",
                level: "A级",
                status: 1,
                name: "白冰",
                sex: 1,
                xz: "处女座",
                age: 28,
                price: 10.0,
                desc: "不如就陷在这里吧，天亮再回去个回去湖区回去"
            },{
                id: 2,
                img: "images/temp-poster.png",
                level: "A级",
                status: 0,
                name: "白冰",
                sex: 2,
                xz: "处女座",
                age: 28,
                price: 10.0,
                desc: "不如就陷在这里吧，天亮再回去个回去湖区回去"
            },{
                id: 3,
                img: "images/temp-poster.png",
                level: "B级",
                status: 1,
                name: "白冰",
                sex: 1,
                xz: "处女座",
                age: 28,
                price: 10.0,
                desc: "不如就陷在这里吧，天亮再回去个回去湖区回去"
            }]
    	}
    },
    methods: {
        getAnchorList () {
            this.$http({
                method: 'GET', 
                url: 'api/v1/anchor/list/', 
            }).then(res => {
                // this.allCities = res.data
                console.log(res)
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
