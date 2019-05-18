<template>
	<div class="modal-mask">
        <div class="modal" :class="{'black': theme=='black'}">
            <div class="modal-hd">
                {{title}}
            </div>
            <div class="modal-con">
                <slot></slot>
            </div>
            <a class="close" href="javascript:;" @click="closeAction"><i class="iconfont icon-close"></i></a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app',
    data () {
        return {
        	
        }
    },
    props: {
        title: String,
        theme: {
            type: String,
            default: 'white'
        },
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
    computed: {
    },
    methods: {
        closeAction(){
            this.$emit('close')
        },
    },
    created () {
    	
    }
}
</script>