<style lang="scss" scoped>
  .biz-assistant{
    width: 100%;
    .biz-assistant-con{
      padding: 0 0.3rem 0.9rem;
    }
    .jc-item{
      position:relative;
      margin-top:0.3rem;
      width: 6.9rem;
      height: 3.2rem;
      background:url("/static/images/biz/biz_assistant1.jpg")no-repeat center;
      background-size: cover;
      .jc-assistant-title{
        position:absolute;
        top:1.28rem;
        width:6.9rem;
        text-align:center;
        font-size:0.4rem;
        color:rgba(51,51,51,1);
        line-height:0.56rem;
      }
    }
  }
</style>
<template>
  <div class="biz-assistant">
      <div class="biz-assistant-con">
        <div v-for="(item, index) in itemData">
          <div v-if="item.type == 1" class="jc-item" :style="'background:url('+item.imgSrc+')no-repeat center;background-size: cover;'" @click="appOpen(item.goUrl)" :key="index">
            <h2 class="jc-assistant-title">{{item.goText}}</h2>
          </div>
          <div v-if="item.type == 0" class="jc-item" :style="'background:url('+item.imgSrc+')no-repeat center;background-size: cover;'" @click="$toast(item.toastTxt);" :key="index">
            <h2 class="jc-assistant-title">{{item.goText}}</h2>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        itemData:[{
          imgSrc:this.imgUrl + '/biz/biz_assistant_01.jpg',
          goUrl:'/bizPurchaseRecord?entrance=zs',
          goText:'采购记录',
          toastTxt:'',
          type:1,
        },{
          imgSrc:this.imgUrl +'/biz/biz_assistant_02.jpg',
          goUrl:'/bizPurchaseRecord?entrance=zs',
          goText:'集采清单',
          toastTxt:'即将开通',
          type:0,
        },{
          imgSrc:this.imgUrl +'/biz/biz_assistant_03.jpg',
          goUrl:'/bizAddrCd',
          goText:'地址管理',
          toastTxt:'',
          type:1,
        },{
          imgSrc:this.imgUrl +'/biz/biz_assistant_04.jpg',
          goUrl:'/bizInvoiceManage',
          goText:'发票管理',
          toastTxt:'',
          type:1,
        }]
      }
    },
    created(){
      window.localStorage.setItem('bizCallback', '')
    },
    mounted(){
      this.$nextTick(()=>{
        this.$header.setTitle("集采助手");
        this.$loading.show = false;
      })
    },
    methods:{

    }
  }
</script>
