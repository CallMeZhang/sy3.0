<template>
  <div>
    <label for="code">
      <div class="flex code-bor">
        <div v-for="(item, index) in number">
          <div class="input font36" :class="{'input-color':value[index-1],'value-color':value[index],'value-size':value[index]}"
               :key="index">{{value[index]}}
          </div>
        </div>
      </div>
    </label>
    <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value"
           id="code" name="code" type="tel" :maxlength="number"
           autocorrect="off" autocomplete="off" autocapitalize="off">
  </div>
</template>

<script>
  //import loading from '@/components/'
  export default {
    props: {
      number: {
        type: Number,
        default: 6
      },
      placeholder: {
        type: String,
        default: '',
      },
      clear: {
        type:Boolean,
        default:false
      }
    },
    components:{},
    data(){
      return {
        redColor:false,
        value: '',
      }
    },

    created(){

    },
    mounted(){
      if(this.value.length == 0){
        document.querySelector(".input").className += " input-color";
      }

    },
    methods:{
      hideKeyboard() {
        // 输入完成隐藏键盘
        document.activeElement.blur() // ios隐藏键盘
        this.$refs.input.blur() // android隐藏键盘
      },
      handleSubmit() {
        this.$emit('input', this.value)
      },
      handleInput(e) {
        this.$refs.input.value = this.value
        if (this.value.length >= this.number) {
          this.hideKeyboard()
        }
        this.handleSubmit()
      }

    },
    watch:{
      clear:{
        handler(nv,ov){
          if(nv){
            this.value = ''
          }
        }
      },deep:true
    }
  }
</script>

<style lang="scss" scoped>
  /*::-webkit-input-placeholder {!*Chrome/Safari*!*/
    /*width:1px;*/
    /*height:0.7rem;*/
    /*color:#FF1919;*/
    /*z-index: 1000;*/
  /*}*/
  /*::-moz-placeholder {!*Firefox*!*/
    /*width:1px;*/
    /*height:0.7rem;*/
    /*color:#FF1919;*/
    /*z-index: 1000;*/
  /*}*/
  /*:-ms-input-placeholder {!*IE*!*/
    /*width:1px;*/
    /*height:0.7rem;*/
    /*color:#FF1919;*/
    /*z-index: 1000;*/
  /*}*/
  .code-bor {
    height:.9rem;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding:0 .5rem 0 .34rem;
  }
  .input {
    width:0.8rem;
    height:1.2rem;
    border-radius: 0.08rem ;
    border:1px solid #D0D0D0;
    margin-left:.31rem;
    color:rgba(46,46,46,1);
    line-height:1.2rem;
    text-align: center;
    box-sizing: border-box;
    font-size:.7rem;
  }
  .input-color {
    border-color: #FF1919;
    color:#FF1919;
  }
  .value-color{
    border-color: #D0D0D0;
    color:rgba(46,46,46,1);
  }
  .value-size {
    font-size:.36rem;
  }
  .input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
</style>
