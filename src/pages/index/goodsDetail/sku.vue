<template>
    <div>
      <!--<div v-title="'sku'"></div>-->
      <div class="box">
        <div class="item" v-for="(item,index) in skuType">
          <div class="title">{{item.propertyName}}</div>
          <div class="con flex " v-for="(ite,x) in item.propertyType">
            <div class="sku-item" @click="chooseSku(item.propertyName,ite,index,x)" :class="ite.flag==0?'unActivity':ite.flag==1?'isActivity':''">
              {{ite.item}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  //import loading from '@/components/'
  Array.prototype.unique = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
      if(!json[this[i]]){
        res.push(this[i]);
        json[this[i]] = 1;
      }
    }
    return res;
  }
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  export default {
    props:['dataSource','type'],
    data(){
      return {
        isLoading: true,
        con:'',
        skuData:null,
        skuType:[],
        allSkuId:[],
        storeSku:[],
        index:0
      }
    },
    created(){
      this.skuData=this.dataSource
//      console.log(this.dataSource)
//      console.log(this.type)
      this.handleData(this.skuData)
    },
    mounted(){
      if(this.skuData.length==1&&this.skuType.length==1){
        this.skuType[0].propertyType[0].flag=1
        this.$emit('setSkuId',this.allSkuId[0].id,'buy');
        this.$emit('setSkuId',this.allSkuId[0].id,'wishList');
      }

    },
    methods: {
      handleData(d){
        for(var k=0;k<this.skuData.length;k++){
          this.allSkuId.push({
            id:this.skuData[k].skuId,
            cop:this.skuData[k].skuValueList.map(function (res) {
              return res.propertyValueName||res.skuValue
            }),
            stocks:this.skuData[k].stocks
          })
        }
        d=d[0].skuValueList
        var arr=[]
        for(var i=0;i<d.length;i++){
          var propertyType=[]
          for(var j=0;j<this.skuData.length;j++){
            if(propertyType.length==0){
              propertyType.push({
                flag:-1,
                item:this.skuData[j].skuValueList[i].propertyValueName||this.skuData[j].skuValueList[i].skuValue,
                stocks:this.skuData[j].stocks
              })
            }else{
              var a=propertyType.length
              for(var m=0;m<propertyType.length;m++){
                if(propertyType[m].item==this.skuData[j].skuValueList[i].propertyValueName||propertyType[m].item==this.skuData[j].skuValueList[i].skuValue){
                  a=m
                }
              }
              if(a==propertyType.length){
                propertyType.push({
                  flag:-1,
                  item:this.skuData[j].skuValueList[i].propertyValueName||this.skuData[j].skuValueList[i].skuValue,
                  stocks:this.skuData[j].stocks
                })
              }
            }
          }
          arr.push({
            propertyName:d[i].propertyName,
            propertyType:propertyType
          })
        }
        this.skuType=arr
      },
      chooseSku(a,b,index,x){
        if(this.skuType.length==1){
          for(var n=0;n<this.skuType[0].propertyType.length;n++){
            if(this.skuType[0].propertyType[n].stocks==0){
              this.skuType[0].propertyType[n].flag=0
            }
          }
        }
        if(b.flag==0) return;
        if(this.skuType[index].propertyType[x].flag==1){
          this.skuType[index].propertyType[x].flag=-1
        }else if(this.skuType[index].propertyType[x].flag==-1){
          for(var n=0;n<this.skuType[index].propertyType.length;n++){
            if(this.skuType[index].propertyType[n].flag!=0){
              this.skuType[index].propertyType[n].flag=-1
            }
          }
          this.skuType[index].propertyType[x].flag=1
        }
//        console.log(this.skuType)
        var arr=[]
        for(var m=0;m<this.skuType.length;m++){
          for(var n=0;n<this.skuType[m].propertyType.length;n++){
            if(this.skuType[m].propertyType[n].flag==1){
              arr.push(this.skuType[m].propertyType[n].item)
            }
          }
        }
        this.storeSku=[]
        for(var j=0;j<arr.length;j++){
          for(var i=0;i<this.allSkuId.length;i++){
            if(this.allSkuId[i].cop.indexOf(arr[j])!=-1&&this.allSkuId[i].stocks==0){
              this.storeSku.push(this.allSkuId[i].cop)
            }
          }
        }
        var skuUnChoose=[]
        var storeSkuLength=0
        if(this.storeSku.length!=0){
          storeSkuLength=this.storeSku[0].length
        }else{
          storeSkuLength=0
        }
        if(arr.length<storeSkuLength-1) {
          return;
        }else if(arr.length>=storeSkuLength-1){
          var flagData=[]
          if(this.storeSku.length==0){
            for(var x=0;x<this.skuType.length;x++){
              var o=0
              for(var y=0;y<this.skuType[x].propertyType.length;y++){
                if(this.skuType[x].propertyType[y].flag!=0){
                  o++
                }
              }
              if(o==0){
                for(var y=0;y<this.skuType[x].propertyType.length;y++){
                  this.skuType[x].propertyType[y].flag=-1
                }
              }
            }
          }
          for(var i=0;i<this.storeSku.length;i++){
            var index=0
            for(var n=0;n<this.storeSku[i].length;n++){
              if(arr.indexOf(this.storeSku[i][n])==-1){
                index++
              }
            }
            if(index==1){
              for(var n=0;n<this.storeSku[i].length;n++){
                if(arr.indexOf(this.storeSku[i][n])==-1){
                  skuUnChoose.push(this.storeSku[i][n])
                  skuUnChoose=skuUnChoose.unique()
                }
              }
              for(var m=0;m<this.skuType.length;m++){
                for(var n=0;n<this.skuType[m].propertyType.length;n++){
                  if(skuUnChoose.indexOf(this.skuType[m].propertyType[n].item)!=-1){
                    this.skuType[m].propertyType[n].flag=0
                    flagData.push(this.skuType[m].propertyType[n].item)
                  }
                }
              }
            }else{
              for(var m=0;m<this.skuType.length;m++){
                for(var n=0;n<this.skuType[m].propertyType.length;n++){
                  if(this.skuType[m].propertyType[n].flag==0&&flagData.indexOf(this.skuType[m].propertyType[n].item)==-1){
                    this.skuType[m].propertyType[n].flag=-1
                  }
                }
              }
            }
          }
        }
        for(var m=0;m<this.allSkuId.length;m++){
          if(this.allSkuId[m].stocks!=0){
            var num=0
            for(var n=0;n<this.allSkuId[m].cop.length;n++){
              if(arr.indexOf(this.allSkuId[m].cop[n])!=-1){
                num++
              }
            }

            if(this.allSkuId[0].cop.length==num){
              this.$emit('setSkuId',this.allSkuId[m].id,this.type);
              return ;
            }else{
              if(arr.length==0){
                for(var a=0;a<this.skuType.length;a++){
                  for(var b=0;b<this.skuType[a].propertyType.length;b++){
                    if(this.skuType[a].propertyType[b].flag==0){
                      this.skuType[a].propertyType[b].flag=-1
                    }
                  }
                }
              }
              this.$emit('setSkuId','error',this.type);
            }
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.box{
    color:#2e2e2e;
    padding-bottom:0.2rem;
    padding-top:.2rem;
  .title{
    /*height:.88rem;*/
    /*line-height: .88rem;*/
    /*padding-left:.3rem;*/
    /*font-size: .3rem;*/
      font:300 0.3rem/0.42rem PingFang SC, SF-UI Display, Source Han Sans, Roboto;
      padding:0.13rem 0 0.23rem 0;
  }
  .con{
    /*padding-top:.2rem;*/
    /*padding-bottom:.2rem;*/
    /*align-items: center;*/

      /*display:flex;*/
      /*align-items:center;*/
      flex-wrap:wrap;
      display:inline-block;
    /*justify-content: space-around;*/
  }
  .sku-item{
    /*padding:.1rem .2rem;*/
    /*border:1px solid #ccc;*/
    /*border-radius: .1rem;*/
    /*flex-wrap:wrap;*/
      font:0.28rem/0.56rem PingFang SC, SF-UI Display, Source Han Sans, Roboto;
      border:1px solid #E3E3E3;
      padding:0 0.3rem;
      box-sizing:border-box;
      min-width:1.56rem;
      border-radius:0.08rem;
      margin:0 0.2rem 0.2rem 0;
      text-align:center;
  }
}
.box .isActivity{
    border: 1px solid #FF1919;
    color:#FF1919;
  }
.box .unActivity{
  /*opacity: 0.3;*/
    background-color:#FAFAFA;
    color:#D0D0D0;
}
    .item{
        padding:0 0.14rem 0 0.34rem;
    }
</style>
