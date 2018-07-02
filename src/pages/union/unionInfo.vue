<template>
    <div class="union-info">
      <div class="title">
        欢迎来到{{content.name}}
      </div>
      <div v-for="item in unionDesc">

        <div v-for="ite in item.value"  v-if="item.type=='img'">
          <img :src="ite" alt="" style="width: 100%">
        </div>
        <div v-for="ite in item.value"  v-if="item.type=='text'" v-html="ite" style="word-wrap: break-word;text-align: justify;" class="text"></div>

      </div>
    </div>
</template>

<script>
  import * as type from '../../requests/union'
	export default {
		data() {
			return {
        content:{},
        unionDesc:null
      }
		},
		created() {
		  setTimeout(()=>{
        if(this.$route.query.p!='web'){
          this.$header.show=false
        }
        this.$header.setTitle('')
        this.$header.headerStyle='background:#fff'
      },0)
		  this.getUnionInfo()
		},
		methods: {
      getUnionInfo(){
        type['getUnionInfo'](this.$route.query.unionCode).then((res)=>{
          this.$loading.show=false
          if(res.data.code==200){
            this.content=res.data.content
            if(this.$route.query.p=='web'){
              this.$header.setTitle(this.content.name)
            }
            try{
              this.unionDesc=JSON.parse(this.content.unionDesc)
            }catch(err){
              this.unionDesc=[]
            }
          }

        })
      }
    },
		components: {}
	}
</script>

<style lang="scss" scoped>
  .title{
    height:0.48rem;
    font-size:0.48rem;
    color:rgba(46,46,46,1);
    line-height:0.48rem;
    margin: 0.34rem 0 1.1rem;
  }
.union-info{
  width: 7.5rem;
  box-sizing: border-box;
  overflow: hidden;
  padding:0.34rem 0.3rem 0;
}
  .text{
    font-size:0.28rem;
    color:#000;
    line-height:0.42rem;
  }
</style>
