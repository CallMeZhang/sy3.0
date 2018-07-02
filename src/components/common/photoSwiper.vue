<template>
    <section>
        <div>
            <img src="https://cdnt.17shanyuan.com/seller_backend/lic/op/24/12560011f5956d595230979d04944b548b320af0.png?x-oss-process=style/webp_480" preview="0" preview-text="描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1描述文字1">
            <img src="https://cdnt.17shanyuan.com/seller_backend/lic/op/24/12560011f5956d595230979d04944b548b320af0.png?x-oss-process=style/webp_480" preview="0" preview-text="描述文字2">
            <img src="https://cdnt.17shanyuan.com/seller_backend/lic/op/24/12560011f5956d595230979d04944b548b320af0.png?x-oss-process=style/webp_480" preview="1" preview-text="描述文字3">
            <img src="" preview="2" preview-text="描述文字4">
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import preview from 'vue-photo-preview'
    import 'vue-photo-preview/dist/skin.css'


    var options={
        fullscreenEl:false,//关闭全屏按钮
        preload:[2,2],
        isClickableElement: function(el) {
//            return el.tagName === 'A';
//            alert(21111)
//            el.close()
            console.log( el)
//            var a  = document.querySelector('.pswp__button').onclick;
//            console.log(a)
        }
    }
    Vue.use(preview,options);

    export default{
        data(){
            return {
                title:"图片预览"
            }
        },
        methods:{},
        watch:{},
        computed:{},
        filters:{},
        created(){
//            setTimeout(()=>{
//                console.log(123)
//                options.escKey = false;
//            },4000)
            console.log(this)
        },
        mounted(){
            this.$loading.show = false;
            this.$previewRefresh()
        }
    }
</script>

<style scoped lang="scss">

</style>