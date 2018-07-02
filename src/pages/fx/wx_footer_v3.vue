<template>
  <div class="footer-content">
    <div class="line"></div>
    <div class="footer">

      <div class="tuijian tb"  @click="appOpen('fx_index')"><img :src="tuijian_icon">
        <div :class="$route.path=='/wx_index_v3' ? 'tb-zi tb-zi-sel' : 'tb-zi'">首页</div>
      </div>

      <!--<a>-->
        <!--<div class="allproduct tb"><img :src="guang_icon">-->
          <!--<div :class="$route.path=='/wx_guang_v3' ? 'tb-zi tb-zi-sel' : 'tb-zi'">逛商城</div>-->
        <!--</div>-->
      <!--</a>-->

      <div class="myorder tb" @click="appOpen('wx_myorder_v3')">
        <img :src="mylist_icon" >
        <div :class="$route.path=='/wx_myorder_v3' ? 'tb-zi tb-zi-sel' : 'tb-zi'">我的订单</div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {

    data () {
      return {
        tuijian_icon: '',
        guang_icon: '',
        mylist_icon: '',
        wfrom: '',
        index_tpl: ''
      }
    },
    created() {
      this.updateUrl();
      this.updateToolBar();
    },
    methods: {
      updateUrl () {
        this.wfrom = this.getQueryString('wfrom');
//                if (this.wfrom === 'wx_boctw'){
//                    this.index_tpl = 'wx_index'
//                }else {
//                    this.index_tpl = 'wx_index_v2'
//                }
//                this.index_tpl = 'wx_index_v3';
      },
      updateToolBar(){
        this.tuijian_icon = this.imgUrl + '/fx/tuijian.png';
        this.guang_icon = this.imgUrl + '/fx/guang.png';
        this.mylist_icon = this.imgUrl + '/fx/mylist.png';
        if (this.$route.path == '/wx_index_v3') {
          this.tuijian_icon = this.imgUrl + '/fx/tuijian-sel.png';
        } else if (this.$route.path == '/wx_myorder_v3') {
          this.mylist_icon = this.imgUrl + '/fx/mylist-sel.png';
        } else if (this.$route.path == '/wx_guang_v3') {
          this.guang_icon = this.imgUrl + '/fx/guang-sel.png'
        }
      },
      getQueryString(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return '';
      }
    }
  }
</script>
<style scoped>
  .footer-content {
    width: 7.5rem;
    position: fixed;
    bottom: 0;
    background: #fff;
    z-index: 99999;
  }

  .footer {
    width: 100%;
    height: 0.96rem;
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
  }

  .tb {
    width: 1rem;
    height: 0.8rem;
    text-align: center;
    margin-top: 0.08rem;
  }

  .tb img {
    width: 0.48rem;
    height: 0.48rem;
    margin: 0 auto;
  }

  .tb-zi {
    width: 1rem;
    height: 0.28rem;
    line-height: 0.28rem;
    font-family: PingFangSC-Regular;
    font-size: 0.2rem;
    color: #666666;
    text-align: center;
  }

  .tb-zi-sel {
    color: #F31e37
  }

  @media (max-height: 400px) {
    .footer-content {
      display: none;
    }
  }
</style>

