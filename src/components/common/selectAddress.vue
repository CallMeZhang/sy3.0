<template>
  <div>
    <transition name="fade">
      <div v-show="true">
        <div class="white">
          <div class="normal clearfix" @click="setProvince('picker1')">
            <span>{{name}}</span>
            <p class="info-txt unmargin fr">
              {{showName()}}
            </p>
          </div>
        </div>
        <transition name="fade">
          <p v-if="show" class="mask" @click="done"></p>
        </transition>
        <transition name="fade-up">
          <div v-show="show" class="address-list">
            <div class="header-top">
              <div :class="{'is-activity':isActivity=='province'}"
                   @click="clickP();addressData.provinceName==='省';isActivity='province';dx=0"> {{addressData.provinceName}}</div>
              <div :class="{'is-activity':isActivity=='city'}"
                   @click="setCity"> {{addressData.cityName}} </div>
              <div :class="{'is-activity':isActivity=='county'}"
                   @click="setCounty"> {{addressData.countyName}} </div>
              <div class="confirm" :class="{'isOk':isOk}" @click="isDone">确定</div>
            </div>
            <div class="content-address">
              <div class="container-wrap" :style="'transform: translateX('+dx+'rem);'">
                <div class="container-item">
                  <div v-for="item in provinceData" class="item-list asd" :class="{'no-col':modifyCity}" @click="setBlue" :areaId="item.areaId" :key="item.areaId">
                    {{item.areaName}}
                  </div>
                </div>
                <div class="container-item">
                  <div class="content-province">
                    <div v-for="item in cityData" class="item-list asd" @click="setBlue" :areaId="item.areaId" :key="item.areaId">
                      {{item.areaName}}
                    </div>
                  </div>
                </div>
                <div class="container-item">
                  <div class="content-province">
                    <div v-for="item in countyData" class="item-list asd" @click="setBlue" :areaId="item.areaId" :key="item.areaId">
                      {{item.areaName}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  import * as type from '@/requests/address'

  export default {
    props:['name','addressName'],
    data() {
      return {
        click1:false,
        show: false,
        userAddress: {},
        addressData: {
          provinceName: '',
          cityName: '',
          countyName: ''
        },
        dx: 0,
        delIsShow: false,
        isActivity: 'province',
        isOk: false,
        provinceData: [],
        cityData: [],
        countyData: [],
        addressId: '',
        areaId: null,
        id:{},
        userInfo:'',
        modifyCity:false,
        addressName2:'',
        curCityColor:'',
        isClick:true //數據回來是否可點擊

      }
    },
    created() {
      this.addressId = ''
      this.delIsShow = false
      this.getProvince(0)
      this.addressName2 = this.addressName

    },
    mounted(){
    },
    components: {},
    methods: {
      a(){
        var el= document.getElementsByClassName('asd')
        for(var i=0;i<el.length;i++){
          el[i].style.color = "rgba(46,46,46,1)"
        }
      },
      showName(){
        if(this.addressName2){
          return this.addressName2;
        }else{
          if(!this.modifyCity){
           return this.addressName
          }else{
            // return this.addressName2;
            return this.addressData.provinceName+' '+this.addressData.cityName+' '+this.addressData.countyName;
          }
        }
      },
      //获取数据
      getData(v){
        this.getWithToken("/user-center/usr/memberByToken").then(res => {
          if(res.code == 200){
            this.addressName2 = res.content.v;
          }else {
            // this.$toast(res.message)
          }
        })
      },
      getAddress() {
        type.getAddressInfo(this.addressId).then((res)=> {
          if(res.data.code==200){
            this.userAddress=res.data.content
            this.addressData.provinceName=res.data.content.provinceName
            this.addressData.cityName=res.data.content.cityName
            this.addressData.countyName=res.data.content.countyName
          }
        })
      },
      getProvince(pid) {
        type['getProvinceInfo'](pid).then((res)=>{
          this.provinceData=res.data.content
        })


      },
      clickP(){
        this.addressData.cityName = '市'
        this.addressData.countyName = '区'
        this.isOk = false;
      },
      setProvince() {
        this.a()
        if(this.modifyCity){
          this.isOk = false
        }
        this.modifyCity = false
        this.addressData = {
          provinceName: '省',
          cityName: '市',
          countyName: '区'
        };
        this.show = true
        // this.isActivity = 'province'
        this.dx = 0
        this.addressName2 = ''
      },
      setCity(){
        this.isOk = false;
        if(this.addressData.provinceName==="省"){
          this.$toast('请选择省！')
          return ;
        }
        this.addressData.countyName = '区'
        this.isActivity='city';
        this.dx=-7.5
      },
      setCounty(){
        this.isOk = false;
        if(this.addressData.cityName==="市"){
          this.$toast('请选择市！')
          return ;
        }
        this.isActivity='county';
        this.dx=-7.5*2
      },
      setBlue(e) {
        if(!this.isClick) return;
        this.isClick = false
        setTimeout(()=>{
          this.isClick = true
        },600)
        var elParent = e.target.parentNode
        for (var i = 0; i < elParent.childNodes.length; i++) {
          elParent.childNodes[i].style.color = "rgba(46,46,46,1)"
        }
        e.target.style.color = 'rgba(255,25,25,1)';
        this.isOk = false
        var text= e.target.innerText
        this.areaId = e.target.attributes['areaId'].value
        if(this.isActivity === 'province'){
          this.addressData.provinceName=text
          this.id['province']=this.areaId
          this.cityFn(this.areaId)
        }else if(this.isActivity === 'city'){
          this.addressData.cityName=text
          this.id['city']=this.areaId
          this.countryFn(this.areaId)
        }else{
          this.id['county']=this.areaId
          this.addressData.countyName=text
          this.isOk = true
        }
      },
      cityFn(areaId) {
        type['getProvinceInfo'](areaId).then((res)=>{
          this.isActivity = 'city'
          this.cityData=res.data.content
          this.dx = -7.5
        })

      },
      countryFn(areaId) {
        type['getProvinceInfo'](areaId).then((res)=>{
          this.isActivity = 'county'
          this.countyData=res.data.content
          this.dx = -7.5 * 2
        })
      },
      done(){
        this.show = false;
        this.isOk = false;
        this.isActivity='province'
      },
      isDone() {
        if (!this.isOk) return;
        this.show = false;
        if(this.name == '故乡'){
          this.postWithToken('/user-center/usr/hometown',{provinceId:this.id['province'],cityId:this.id['city'],countyId:this.id['county']}).then(res => {
            if(res.code == 200){
              if(res.content == true){
                this.modifyCity = true
                this.addressName2 = this.showName();
                this.addressName = this.addressName2;
                this.isActivity='province'
                this.$toast(res.message)
              }else{
                this.$toast(res.message)
              }
            }else{
              this.$toast(res.message)
            }
          })
        }else if(this.name == '所在地'){
          this.postWithToken('/user-center/usr/locus',{provinceId:this.id['province'],cityId:this.id['city'],countyId:this.id['county']}).then(res => {
            if(res.code == 200){
              if(res.content == true){
                this.modifyCity = true
                this.addressName2 = this.showName();
                this.addressName = this.addressName2
                this.isActivity='province'
                this.$toast(res.message)
              }else{
                this.$toast(res.message)
              }
            }else{
              this.$toast(res.message)
            }
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 0.88rem;
  $bigHeight: 1.75rem;
  $width_height: 0.32rem;
  $paddingLeft: 0.3rem;
  $fontSize: 0.3rem;
  $textColor: #4B4F63;
  .top-wrapper {
    height: 100%;
    position: relative;
    background: #fafafa;
    div.white {
      background: #fff;
    }
    .no-col {
      color:rgba(46,46,46,1) !important;
    }
    .normal {
      height: $height;
      background: #fff;
      /*border-bottom: 1px solid rgba(218, 222, 228, 0.60);*/
      line-height: $height;
      text-align: left;
      padding: 0 $paddingLeft 0 0;
      /*margin-left: 0.3rem;*/
      font-size: $fontSize;
      overflow: hidden;
      color: $textColor;
      box-sizing: border-box;
      background: url("/static/images/common/arrow.png") no-repeat 96% 50%;
      background-size:.13rem .22rem ;
      span{
        float: left;
        font-size: $fontSize;
        font-weight: normal;
      }
      .info-txt {
        font-size: $fontSize;
        color:rgba(75,75,75,1);
        /*width: 4rem;*/
        line-height: .88rem;
        text-align: right;
        padding-right: .32rem;
      }
      .unmargin {
        margin: 0;
      }
      span {
        display: inline-block;
        margin-right: 1.1rem;
        color: rgba(75, 75, 75, 1);
        line-height: 0.88rem;
      }
      .address-arrow {
        width: 0.12rem;
        height: 0.24rem;
        float: right;
      }
    }
  }
  .header-top {
    border-bottom: 1px solid #DADEE4;
    width: 100%;
    height: 1.04rem;
    box-sizing: border-box;
    > div {
      font-weight: normal;
      float: left;
      margin-right: 0.5rem;
      font-size: .30rem;
      height: 1rem;
      line-height: 1rem;
      max-width: 1.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(46, 46, 46, 1);
    }
    .is-activity {
      border-bottom: 0.04rem solid rgba(255, 25, 25, 1);
    }
    div:nth-of-type(1) {
      margin-left: 0.5rem;
    }
    .confirm {
      float: right;
      margin-right: 0.5rem;
      font-size: .30rem;
      border: 0;
      color: rgba(208, 208, 208, 1);
      font-weight: 300;
    }
    .isOk {
      color: rgba(255, 25, 25, 1);
    }
  }
  .content-address {
    overflow: hidden;
    width: 100%;
    .container-wrap {
      width: 7.5*3rem;
      overflow-x: hidden;
      transform: translateX(0rem);
      transition-duration: 0.3s;
      position: relative;
      .container-item {
        -webkit-overflow-scrolling: touch;
        width: 7.5rem;
        height: 6.83rem;
        overflow-y: scroll;
        float: left;
        .item-list {
          height: 0.88rem;
          padding-left: 0.5rem;
          background: rgba(255, 255, 255, 1);
          font-size: 0.3rem;
          font-weight: 300;
          line-height: 0.88rem;
          color: rgba(46, 46, 46, 1);
        }
        .item-list-activity {
          color: rgba(255, 25, 25, 1);
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }
  .address-list {
    width: 7.5rem;
    height: 7.86rem;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    left:0;
    z-index: 100;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
  .fade-up-enter-active, .fade-up-leave-active {
    transition: all .3s;
  }
  .fade-up-enter, .fade-up-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    bottom: -7.89rem;

    opacity: 0;
  }
</style>
