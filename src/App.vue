<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {}
    },
    watch: {
        $router (to, from){}
    },
    methods: {},
    created () {},
    mounted () {
        // let OSS = require('ali-oss')
        // let client = new OSS({
        //     region: 'oss-ap-southeast-2-internal.aliyuncs.com',
        //     //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
        //     accessKeyId: 'LTAIcJ2c4DfxlC90',
        //     accessKeySecret: 'e4AnZMeLZlKvuKuJOSs2Rrk2JzofFw',
        //     bucket: 'suave-image.oss-ap-southeast-2-internal.aliyuncs.com'
        // })
        // async function put () {
        //     try {
        //         let result = await client.put('object-name', 'local-file')
        //         console.log(result)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
        // put()

        
        // object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
        // client.put('object', 'localfile')
        // .then((r1) => {
        //     console.log('put success: %j', r1)
        //     return client.get('object');
        // }).then((r2) => {
        //     console.log('get success: %j', r2)
        // }).catch((err) => {
        //     console.error('error: %j', err)
        // })
    }
}
</script>

<style lang="less">
@import './assets/css/fonts.less';
@import './assets/css/common.less';
</style>
