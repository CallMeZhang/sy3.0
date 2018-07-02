<style lang="scss" scoped>
  .test-page{
    width: 100%;
  }
  .test-page-con{
  }
  .left-slide-item{
    /*padding:0 0.3rem;*/
  }
</style>
<template>
  <div class="test-page">
    <div class="test-page-con">
      <section>
        <div v-for="(item, index) in list" class="left-slide-item" :key="index">
          <slide-left :index="index" @msg-from-child="delItem(index)"><span>{{item.str}}</span></slide-left>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import slideLeft from '@/components/common/left-sliding-delete.vue'
  export default{
    props:{
      item: Object,
      index: Number
    },
    data(){
      return{
        list:[
          {str:'haha111'},
          {str: 'hehe222'},
          {str: 'lele333'},
          {str: 'meimei444'},
          {str: 'yaya555'},
          {str: 'cun666'},
          {str: '乎乎777'},
          {str: '剁手888'},
        ]
      }
    },
    created(){},
    mounted(){
      this.$nextTick(()=>{
        this.$loading.show = false;
        this.$header.setTitle('测试页')
      })
    },
    methods:{
      delItem(val){
        this.list.splice(val,1)
      },
    },
    components:{
      'slide-left':slideLeft,
    },
  }
</script>
