<template>
    <div class="box greatAssistant">
        <div class="title font-h1">{{data.name}}</div>
        <ul class="group border-bottom-1px">
            <li class="li" v-for="(item,index) in data.agentList" @click="go(item.storeId)">
                <div class="people-info">
                    <div class="header-pic">
                        <img :src="(item.avatar || (imgUrl + '/common/head-default.jpg')) + ossUrl('thumb_120')"
                             :alt="item.name"
                             onerror="this.src='https://cdnpre-m.17shanyuan.com/static/images/common/head-default.jpg?x-oss-process=style/thumb_120'">
                    </div>
                    <div class="text">
                        <h3 class="h3">
                            <span class="name no-enter">助理人：{{item.name}}</span>
                            <span class="score" v-if="parseInt(item.score)">{{parseFloat(item.score).toFixed(2)}}分</span>
                        </h3>
                        <p class="p no-enter">{{item.entName}}</p>
                    </div>
                    <div class="more"></div>
                </div>
                <div class="storeInfo">
                    <div class="box">
                        <span class="a1">{{item.goodsNum | wan}}件</span>
                        <span class="a2">产品数量</span>
                    </div>
                    <div class="box">
                        <span class="a1">{{item.saleAmount/100 | wan}}元</span>
                        <span class="a2">助销</span>
                    </div>
                    <div class="box">
                        <span class="a1">{{item.promotePoorNum}}户</span>
                        <span class="a2" @click="ccc">带动贫困户</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        props:['data'],
        data(){
            return {
                title:""
            }
        },
        methods:{
            ccc(){
//                this.data.agentList[0].saleAmount = 16550000
            },
            go(id){
                if (id) {
                    this.appOpen('assistant',{storeId:id})
                }else{
                    this.$toast('没有ID，无法跳转')
                }
            }
        },
    }
</script>
<style scoped lang="scss">
    @import "main.scss";
</style>