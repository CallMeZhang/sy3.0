<template>
  <div class="top-address">
    <transition name="fade">
      <div v-show="!isLoading">
        <ul v-if='dataList.length!=0' class="ul-wraper">
          <li v-for="item in dataList" class="li-wrapper" @click="chooseAddress(item)">
            <div class="div-wrapper-first">
              <span class="name">{{item.receiveName}}</span>
              <span class="phone">{{item.telephone}}</span>
              <span class="default" v-if="item.isDefault==1">默认</span>
              <img :src="imgUrl + '/common/edit2.png'" alt="" class="edit"
                   @click.stop="goEdit(item.addressId)">
            </div>
            <div class="address">
              <span class="address-txt address-detail-con" style="-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{item.contactAddress + item.exactAddress}}</span>
            </div>
          </li>
          <li class="blank iphonex-padding-bottom" style="margin-top:0.21rem;"></li>
        </ul>
        <div v-if='dataList.length==0' class="no-address">
          <img :src="imgUrl + '/common/error1.png'" alt="">
          <p>暂无地址</p>
        </div>
        <div class="address-footer iphonex-padding-bottom-bg">
          <div class="address-btn" @click="newAddress">新增地址</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  import * as type from '../../../requests/bizAddress'
  export default {
    data() {
      return {
        isLoading: true,
        dataList: [],
        curpage: 1,
        storage: null,
        bizCallback:''
      }
    },
    created() {
//      this.syJsbSetLeftItem('0',1)
      if(!!this.$route.query.bizCallback){
        this.bizCallback=decodeURIComponent(this.$route.query.bizCallback)
        window.localStorage.setItem('bizCallback', this.bizCallback)
      }
      this.getData()
    },
    mounted() {
      let that = this;
      window.looktgRefreshFn=()=>{
//        console.log('looktgRefreshFn is ok')
        that.getData();
      }
      try{
        this.$header.setTitle('选择地址')
        this.$loading.show = false;
      }catch(e){
        setTimeout(()=>{
          this.$loading.show = false;
          this.$header.setTitle('选择地址')
          /*this.goBackHandle = ()=>{
            window.location.go(-1)
          }*/
        },0)
      }
    },
    methods: {
      goEdit(id) {
        this.$router.replace({path: '/bizEd', query: {addressId: id}});
//        this.$router.push({path: '/bizEd', query: {addressId: id}});
//        this.appOpen('/bizEd', {addressId: id})
      },
      newAddress() {
        this.$router.replace({path: '/bizEd'});
//        this.$router.push({path: '/bizEd'});
//        this.appOpen('/bizEd')
      },
      getData() {
        type.getAddressList().then((res) => {
          this.isLoading = false
          if (res.data.code == 200) {
            this.dataList = res.data.content
            /*console.log('biz chooseAddress')
            console.log(this.dataList)*/
          }
        })
      },
      chooseAddress(address) {
        try{
          if(this.isIos()){
//            this.appNotify({callback:'appNotifyCloseCurPage'})
          }else{
            this.appNotify({callback:'appNotifyClosePrePage'})
          }
        }catch (err){
          console.log(err)
        }
        if(!this.bizCallback){
          this.bizCallback = window.localStorage.getItem('bizCallback')
//          console.log(this.bizCallback)
          if(!this.bizCallback){
          return;
          }
          window.localStorage.setItem('bizCallback', '')
        }
        if(!window.location.search){
          window.location.replace(this.bizCallback+"?addressId="+address.addressId)
        }else{
          window.location.replace(this.bizCallback+"&addressId="+address.addressId)
        }
      }
    }
    ,
    components: {}
  }
</script>

<style lang="scss" scoped>
  .blank {
    height: 1rem;
  }

  .top-address {
    height: 100%;
    background: #f4f5f6;
    box-sizing: border-box;
    .ul-wraper {
      width: 100%;
      overflow: hidden;
      background: #f4f5f6;
      .li-wrapper {
        position: relative;
        overflow: hidden;
        text-align: left;
        padding-left: 0.8rem;
        height: 1.7rem;
        margin-top: 0.21rem;
        box-sizing: border-box;
        background:  #fff url('/static/images/common/local@1.5x.png') no-repeat 0.27rem 0.2rem;
        background-size: 0.38rem;
        .div-wrapper-first {
          padding: 0.24rem 0 0.1rem 0;
          overflow: hidden;
          .edit {
            position: absolute;
            width: 0.28rem;
            height: 0.27rem;
            top:0;
            right:0;
            padding:0.3rem 0.3rem 0.4rem 0.5rem;
          }
          .name, .phone,.default {
            font-size: .30rem;
            float: left;
            color: rgba(75, 75, 75, 1);
          }
          .name {
            margin-right: 0.3rem;
            width: 1.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .default{
            border-radius: 0.04rem ;
            font-size:0.24rem;
            color:rgba(255,25,25,1);
            margin-left: 0.3rem;
            border: 1px solid rgba(255,25,25,1);
            padding: 0 0.09rem;
          }
        }

        .address {
          .address-txt {
            font-size: .26rem;
            line-height: .40rem;
            width: 4.6rem;
            display: inline-block;
            font-weight: 300;
            color:rgba(75,75,75,1);
          }
          .address-detail-con{
            display:block;
            width: 4.6rem;
            height:0.8rem;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .li-wrapper:nth-of-type(1) {
        margin-top: 0;
      }
    }

    .li-wrapper:nth-last-child(2) {
      margin-bottom: 0;
    }
    .no-address {
      width: 100%;
      overflow: hidden;
      img {
        width: 2.12rem;
        height: 2.23rem;
        display: block;
        margin: 0 auto;
        margin-top: 3.81rem;
      }
      p {
        padding-top: 0.65rem;
        text-align: center;
        font-size: .32rem;
        color: #DADEE4;
      }
    }

    .address-footer {
      position: fixed;
      bottom: 0rem;
      width: 100%;
      .address-btn {
        text-align: center;
        height: 1rem;
        width: 100%;
        left: 0.3rem;
        line-height: 1rem;
        font-size: .32rem;
        color: #FFFFFF;
        background:linear-gradient(90deg,rgba(255,25,25,1),rgba(255,101,51,1));
      }
    }

  }
</style>
