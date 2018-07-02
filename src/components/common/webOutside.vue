<template>
    <div style="height:100%;width:7.5rem;">
      <div style="overflow: auto;-webkit-overflow-scrolling:touch;width:100%;height:100%;" v-if="!checkBrowser">
        <iframe :src="url" frameborder="0" height="100%" scrolling='no' style="height:100%;width: 1px; min-width: 100%; *width: 100%;overflow: scroll;-webkit-overflow-scrolling: touch;"></iframe>
      </div>
      <div style="overflow: auto;-webkit-overflow-scrolling:touch;width:100%;height:100%;" v-if="checkBrowser">
      <iframe :src="url" frameborder="0" style="width: 100%;height: 100%"></iframe>
      </div>
    </div>
</template>

<script>
  import browser from '../../modules/_ua/browserUa'
	export default {
		data() {
			return {
        checkBrowser:'',
        url:''
      }
		},
		created() {
		  this.url = decodeURIComponent(this.$route.query.url)
            var arrUrls = [
                /https:\/\/v3m.17shanyuan.com/ig,
                /https:\/\/pre-m.17shanyuan.com/ig,
                /https:\/\/m3.17shanyuan.com/ig,
                /https:\/\/pre-mgy.17shanyuan.com/ig,
                /https:\/\/mgyt3.17shanyuan.com/ig,
                /https:\/\/mgy3.17shanyuan.com/ig

            ];
            var bAllow = false;
            for(var i = 0; i < arrUrls.length; i++){
                var n = arrUrls[i];
                if(n.test(this.url)){
                    bAllow = true
                }
            }
          if(bAllow){
                window.location.href=this.url
          }else{
            this.checkBrowser=browser().isAndroid
            setTimeout(()=>{
              this.$loading.show=false
            },0)
          }

		},
		methods: {
    },
    mounted(){
    },
		components: {
    }
	}
</script>

<style lang="scss" scoped>

</style>
