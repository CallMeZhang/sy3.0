<template>
  <div class="top-wrapper">
    <transition name="fade">
      <div v-show="true">
        <div class="white">
          <div class="normal">
            <label for="name" class="normal-label">
              <span>收货人</span>
              <input class="biz-info-txt" type="text" v-model="userAddress.receiveName" id="name" placeholder="请输入收货人姓名"
                     oninput="if(value.length>15)value=value.slice(0,15)">
            </label>
          </div>
        </div>
        <div class="white">
          <div class="normal" >
            <label for="phone" class="normal-label">
              <span>手机号</span>
              <input class="biz-info-txt" type="tel" v-model="userAddress.telephone" id="phone" placeholder="请输入收货人手机号"
                     oninput="if(value.length>11)value=value.slice(0,11)">
            </label>
          </div>
        </div>
        <div class="white">
          <div class="normal" @click="setProvince('picker1')">
            <span>省市区</span>
            <span class="info-txt unmargin ">
              {{dataOne}}&nbsp;{{dataTwo}}&nbsp;{{dataThree}}
            </span>
            <img :src="imgUrl+'/common/arrow.png'" alt=""
                 class="address-arrow">
          </div>
        </div>
        <div class="white">
          <div class="normal big">
            <textarea v-model="userAddress.exactAddress" placeholder="请填写详细地址，不少于5个字"></textarea>
          </div>
        </div>
        <div style="background:rgba(255,255,255,1);">
          <div class="set-address">
            <span class="default_text">设为默认</span>
            <sy-switch ref="switch" v-model="switchCheck" @change="switchFn"></sy-switch>
          </div>
        </div>
        <div class="footer-btns">
          <button class="save-msg" @click="saveMsg">保存</button>
          <button class="del-msg" @click="delMsg" v-if="delIsShow">删除</button>
        </div>
        <transition name="fade">
          <p v-if="show" class="mask" @click="show=false"></p>
        </transition>
        <transition name="fade-up">
          <div v-show="show" class="address-list">
            <div class="header-top">
              <div :class="{'is-activity':isActivity=='province'}"
                   @click="addressData.provinceName==='省';isActivity='province';dx=0"> {{addressData.provinceName}}</div>
              <div :class="{'is-activity':isActivity=='city'}"
                   @click="setCity"> {{addressData.cityName}} </div>
              <div :class="{'is-activity':isActivity=='county'}"
                   @click="setCounty"> {{addressData.countyName}} </div>
              <div class="confirm" :class="{'isOk':isOk}" @click="isDone">确定</div>
            </div>
            <div class="content-address">
              <div class="container-wrap" :style="'transform: translateX('+dx+'rem);'">
                <div class="container-item">
                  <div v-for="item in provinceData" class="item-list" @click="setBlue" :areaId="item.areaId" :key="item.areaId">
                    {{item.areaName}}
                  </div>
                </div>
                <div class="container-item">
                  <div class="content-province">
                    <div v-for="item in cityData" class="item-list cityClass" @click="setBlue" :areaId="item.areaId" :key="item.areaId">
                      {{item.areaName}}
                    </div>
                  </div>
                </div>
                <div class="container-item">
                  <div class="content-province">
                    <div v-for="item in countyData" class="item-list" @click="setBlue" :areaId="item.areaId" :key="item.areaId">
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
  let trim = function (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
  };
  let utils = {}
  utils['checkPhone'] = (phone) => {
    var phone = phone || ''
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false;
    } else {
      return true
    }
  }
  import sySwitch from '../common/switch'
  import * as type from '../../requests/address'

  export default {
    data() {
      return {
        dataOne:'省',
        dataTwo:'市',
        dataThree:'区',
        isDefault:false,
        switchCheck: false,
        show: false,
        userAddress: {},
        addressData: {
          provinceName: '省',
          cityName: '市',
          countyName: '区'
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
        flag:true
      }
    },
    created() {

      if (this.$route.query.addressId) {
        this.addressId = this.$route.query.addressId
        document.title = '编辑地址'
        this.$header.setTitle('编辑地址')
        this.getAddress()
        this.delIsShow = true
      } else {
        this.addressId = ''
        document.title = '新增地址'
        this.$header.setTitle('新增地址')
        this.delIsShow = false
      }
      this.getProvince(0)
    },
    components: {sySwitch},
    methods: {
      switchFn(v) {
        this.isDefault=v
      },
      getAddress() {
        type.getAddressInfo(this.addressId).then((res)=> {
          this.$loading.show=false
          if(res.data.code==200){
            this.userAddress=res.data.content
            this.addressData.provinceName=res.data.content.provinceName
            this.addressData.cityName=res.data.content.cityName
            this.addressData.countyName=res.data.content.countyName
            this.dataOne=this.addressData.provinceName;
            this.dataTwo=this.addressData.cityName;
            this.dataThree=this.addressData.countyName;
            if(res.data.content.isDefault==0){
              this.$refs.switch.switchCheck=false
            }else{
              this.$refs.switch.switchCheck=true
            }
          }
        })
      },
      getProvince(pid) {
          type['getProvinceInfo'](pid).then((res)=>{
            this.$loading.show=false
            this.provinceData=res.data.content
          })
      },
      saveMsg() {
        if (trim(this.userAddress.receiveName) === '') {
          this.$toast('请输入收货人姓名')
          return
        }
        if (trim(this.userAddress.telephone) === '') {
          this.$toast('请输入手机号码')
          return
        }
        if (!utils.checkPhone(this.userAddress.telephone)) {
          this.$toast('手机号码格式有误')
          return
        }
        if (trim(this.addressData.provinceName) === '省') {
          this.$toast('请选择省')
          return
        }
        if (trim(this.addressData.cityName) === '市') {
          this.$toast('请选择市')
          return
        }
        if (trim(this.addressData.countyName) === '区') {
          this.$toast('请选择区')
          return
        }
        if (trim(this.userAddress.exactAddress) === '') {
          this.$toast('请填写详细地址')
          return
        }
        if (trim(this.userAddress.exactAddress).length < 5) {
          this.$toast('详细地址不少于五个字')
          return
        }
        if(!this.delIsShow){
          type.addAddressInfo({
            receiveName: this.userAddress.receiveName,
            telephone: this.userAddress.telephone,
            provinceId:this.id['province']||this.userAddress.provinceId,
            cityId:this.id['city']||this.userAddress.cityId,
            countyId: this.id['county']||this.userAddress.countyId,
            exactAddress: this.userAddress.exactAddress,
            isDefault: this.isDefault?1:0,
          }).then((res)=>{
            if (res.data.code == 200) {
              this.$toast('编辑成功')
              var fromWhere=this.$route.query.from||''
              if(fromWhere=='goodsDetail'||fromWhere=='orderWishList'){
                this.$router.replace({path: '/orderConfirm'});
              }else{
                this.$router.replace({path: '/cd'});
              }
            } else {
              this.$toast('保存失败')
            }
          })
        }else{
          type.editAddressInfo({
            addressId: this.userAddress.addressId,
            receiveName: this.userAddress.receiveName,
            telephone: this.userAddress.telephone,
            provinceId:this.id['province']||this.userAddress.provinceId,
            cityId:this.id['city']||this.userAddress.cityId,
            countyId: this.id['county']||this.userAddress.countyId,
            exactAddress: this.userAddress.exactAddress,
            isDefault: this.isDefault?1:0,
          }).then((res) => {
            if (res.data.code == 200) {
              this.$toast('编辑成功')
              this.$router.replace({path: '/cd'});
            } else {
              this.$toast('保存失败')
            }
          })
        }


      },
      delMsg() {
        type.delAddressInfo({
          addressId: this.userAddress.addressId,
        }).then((res) => {
          if (res.data.code == 200) {
            this.$toast('删除成功')
            this.$router.replace({path: '/cd'});
          }
        })
      },
      setProvince() {
        this.show = true
        this.isActivity = 'province'
        this.dx = 0
      },
      setCity(){

        if(this.addressData.provinceName==="省"){
          this.$toast('请选择省！')
          return ;
        }
        this.isActivity='city';
        this.dx=-7.5
      },
      setCounty(){
        var flag=false
        var el =document.getElementsByClassName('cityClass')
        for(var i=0;i<el.length;i++){
          if(el[i].style.color == "rgb(255, 25, 25)"){
            flag=true
            break;
          }
        }
        if(this.addressData.cityName==="市"||!flag){
          this.$toast('请选择市！')
          return ;
        }
        this.isActivity='county';
        this.dx=-7.5*2
      },
      setBlue(e) {
        if(!this.flag)return;
        this.flag=false
        setTimeout(()=>{
          this.flag=true
        },600)
        var elParent = e.target.parentNode
        for (var i = 0; i < elParent.childNodes.length; i++) {
          elParent.childNodes[i].style.color = "rgba(46,46,46,1)"
        }
        e.target.style.color = 'rgba(255,25,25,1)'
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
      isDone() {
        if (!this.isOk) return;
        this.dataOne=this.addressData.provinceName;
        this.dataTwo=this.addressData.cityName;
        this.dataThree=this.addressData.countyName;
        this.show = false
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
    .normal {
      height: $height;
      background: #fff;
      border-bottom: 1px solid rgba(218, 222, 228, 0.60);
      line-height: $height;
      text-align: left;
      padding: 0 $paddingLeft 0 0;
      margin-left: 0.3rem;
      font-size: $fontSize;
      overflow: hidden;
      color: $textColor;
      box-sizing: border-box;
      .normal-label{
        width: 6.9rem;
        display:flex;
      }
      span, input {
        float: left;
        font-size: $fontSize;
        font-weight: normal;
      }
      .info-txt {
        font-size: $fontSize;
        color: rgba(148, 148, 148, 1);
        width: 4rem;
        margin-top: 0.24rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .biz-info-txt{
        display:flex;
        flex:1;
        font-size: $fontSize;
        color: rgba(148, 148, 148, 1);
      }
      .unmargin {
        margin: 0;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: rgba(208, 208, 208, 1);
      }
      input:-moz-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: rgba(208, 208, 208, 1);
      }
      input::-moz-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: rgba(208, 208, 208, 1);
      }
      input:-ms-input-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: rgba(208, 208, 208, 1);
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
        margin: 0.32rem 0rem 0 0;
      }
    }
    .big {
      height: $bigHeight;
      line-height: $bigHeight;
      position: relative;
      border: 0;
      span {
        line-height: 0.7rem;
        position: absolute;
      }
      textarea {
        width: 100%;
        height: 83%;
        border: 0;
        resize: none;
        color: rgba(208, 208, 208, 1);
        line-height: 0.5rem;
        font-size: $fontSize;
        font-weight: normal;
      }
    }
    div.set-address {
      margin-left: 0.3rem;
      margin-top: 0.2rem;
      height: 0.88rem;
      background: rgba(255, 255, 255, 1);
      .default_text {
        float: left;
        height: 0.88rem;
        font-size: 0.3rem;
        font-weight: 300;
        color: rgba(75, 75, 75, 1);
        line-height: 0.88rem;
      }
    }
    .footer-btns {
      width: 100%;
      margin-top: 1.6rem;
      .del-msg, .save-msg {
        width: 6.9rem;
        text-align: center;
        height: 0.88rem;
        line-height: 0.88rem;
        border: 0;
        border-radius: 0.08rem;
        padding: 0;
        margin-left: 0.3rem;
        font-size: .32rem;
      }
      .save-msg {
        background: linear-gradient(90deg, rgba(255, 25, 25, 1), rgba(255, 101, 51, 1));
        color: #FFFFFF;
      }
      .del-msg {
        background: #fafafa;;
        color: #4B4F63;
        border: 1px solid #DADEE4;
        margin-top: 0.4rem;
      }
    }
  }

  .pop-wrapper {
    width: 100%;
    background: #fff;
    height: 8rem;
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
