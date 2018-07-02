<template>
    <div class="num-jump">
      <div class="fl" v-for="(item,i) in number">
        <div class="num-item" :style="{marginTop:-(parseInt(item) )* 0.4 +'rem',transition:i>number.length - 4? 'margin-top ' + (1+i/5)+'s':'0s'}" v-if="item !== ','">
          <div v-for="n in numArr" >{{n}}</div>
        </div>
        <div v-if="item === ','">,</div>
      </div>
      <div class="fl">{{text}}</div>

    </div>
</template>

<script>
  //import loading from '@/components/'

  export default {
    props:{
      num:{
        default:'000000000'
      },
      text:{
        default:''
      }
    },
//    props:['num','text'],
    components: {},
    data(){
      return {
        numArr:['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'],
        number: (this.num+'').split(''),
        show:false,
      }
    },
    created(){
      if((this.num+'').toString().indexOf(',') !== -1){
        this.number = this.formatComma(this.num)
      }
    },
    mounted(){

    },
    methods: {

    },
    watch:{
      num(){
        this.number = (this.num+'').toString()
        if((this.num+'').toString().indexOf(',') === -1){
          this.number = this.formatComma(this.num)
        }
        this.show = true;
      }
    }

  }
</script>

<style lang="scss" scoped>
  .num-jump{
    height:.4rem;
    line-height: .4rem;
    overflow: hidden;
    &>div{
      height:.4rem;
      line-height: .4rem;
    }
    .num-item{
      /*transition: margin-top 2s;*/
      height:.4rem;
      line-height: .4rem;
      &>div{
        height:.4rem;
        line-height: .4rem;
      }
    }

  }
</style>
