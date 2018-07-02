<template>
  <div>
    <div>
      wx test page
    </div>
    <div @click="notifyFn">notify</div>
  </div>
</template>

<script>

  import wxAuthorize from '../modules/webPay/wxAuthorize'
  import share from '../modules/_share/share'
	export default {
		data() {
			return {}
		},
		created() {
		  window.appNotifyFn=(res)=>{
      console.log(res)

      console.log('appNotifyFn is ok')

    }
		  console.log('appNotifyFn')
      try{
		    this.appNotify({callback:'appNotifyFn',type:''})
		  }catch (err){
		    console.log(err)
      }
		  this.$loading.show=false
      share({
        url:'https://v3m.17shanyuan.com/index',
        title:'一起善緣',
        text:'测试页面',
        logo:'https://mt.17shanyuan.com/static/images/login/icon-logo-no-china.png'
      })
//      wxAuthorize().then((res)=>{
//        console.log('wxAuthorize.js')
//        console.log(res)
//      })
    },
    mounted(){

    },
		methods: {
      notifyFn(){
        this.appNotify({callback:'appNotifyFn'})
      }
    },
		components: {}
	}
</script>

<style lang="scss" scoped>

</style>
