<template>
    <section v-title="title" class="container">
        <div class="top">
            <div class="tip">已经连续签到{{continuousCount}}天，累计{{totalCount}}天</div>
            <div class="title" @click="cc">每日签到</div>
            <div class="p" @click="dd">连续签到越多，扶贫码越丰厚～</div>
            <div class="gift-box">
                <ul class="gift-list">
                    <li :class="{item:true,enough:continuousCount >= pointTime[i]}" v-for="i in totalAward">
                        <div class="gift" :style="'background-size:' +(0.42 + 0.03*i) + 'rem'"></div>
                        <div class="progress">
                            <div class="circle"></div>
                            <div class="line"
                                 :style="(continuousCount > pointTime[i-1] && continuousCount < pointTime[i]) ?
                                 'background-image:linear-gradient(to right,#D95532 ' + parseInt((continuousCount % 3)/3*100) + '%,#fff ' + parseInt((continuousCount % 3)/3*100) + '%)'
                                  :''"></div>
                            <!--<div :class="{line:true,}"-->
                                 <!--v-if="continuousCount > pointTime[i-1] && continuousCount < pointTime[i]"-->
                                 <!--v-for="(item,index) in parseInt(continuousCount % 3)"></div>-->

                        </div>
                        <div class="time">{{pointTime[i]}}天</div>
                        <div class="award">{{award[i]}}元</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="calendar">
            <ul class="tr first border-bottom-1px flex-able">
                <li class="th item">日</li>
                <li class="th item">一</li>
                <li class="th item">二</li>
                <li class="th item">三</li>
                <li class="th item">四</li>
                <li class="th item">五</li>
                <li class="th item">六</li>
            </ul>
            <div class="calendar_inner">
                <ul class="tr trtd" v-for="(item,index) in calendarArr">
                <!-- :class="{
                    td:true,
                    disabled:ite.canSignIn == 1,
                    gift:ite.hasReceivePrize == 1,
                    'gift-disabled':ite.canReceivePrize == 1,
                    active:ite.continueType         == 'active',
                    'active-alone':ite.continueType == 'active-alone',
                    activeBegin:ite.continueType    == 'activeBegin',
                    activeEnd:ite.continueType      == 'activeEnd',
                    }"  -->
                    <li v-for="(ite,ind) in item"
                        :class="{
                            td:true,
                            disabled:ite.canSignIn == 0 && ite.hasSignIn == 0,
                            gift:ite.hasReceivePrize == 1,
                            'gift-disabled':ite.canReceivePrize == 1,

                            active:ite.continueType         == 'active',
                            'active-alone':ite.continueType == 'active-alone',
                            activeBegin:ite.continueType    == 'activeBegin',
                            activeEnd:ite.continueType      == 'activeEnd',
                        }"
                        @click="toast(ite.canReceivePrize,ite.date,ite.couponPrice,ite.today)"
                    >
                        <span class="today" v-if="ite.today == 1">今天</span>
                        <span v-else>{{ ite.date | onlyKeepDay}}</span>
                        <span v-show="ite.today == 1 ? today = ite.date : ''"></span><!--赋值用的，没啥用-->
                    </li>
                </ul>
            </div>


        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
// 3天（3元）、6天（3元）、9天（3元）、12天（6元），15天（6元），18天（6元）,21天（9元），24天（9元），27天（9元），30天（9元）
            return {
                title:"签到",
                pointTime:  [0,3,6,9,12,15,18,21,24,27,30],   //累计的时间点
                award:      [0,3,3,3,6 ,6 ,6 , 9, 9, 9, 9],   //累计的奖励
//                totalDay:30,                                    //这个月一共有30天 或者28天？

                totalCount:0,                               //累计签到天数
                continuousCount:0,                            //连续签到了多少天

                totalAward:10,                               //共有几次奖励(二月只有9次)

                calendarArr:[[]],                             //整理后的数组
                today:"",
                a:23
            }
        },
        methods:{
            cc(){
//                this.continuousCount++
//                console.log(this.today)
//                console.log(this.imgUrl +'/common/download.png')
            },
            dd(){
//                this.continuousCount--
            },
            toast(canReceivePrize,date,couponPrice,isToday){    //是否可以领取（将来时），
                if (isToday == 1) {
                    this.signIn();
                }else{
                    if (canReceivePrize == 1) {
                        var today   = this.$options.filters['onlyKeepDay'](this.today);
                        var willDay = this.$options.filters['onlyKeepDay'](date);
                        this.$toast("我是" + couponPrice + "元扶贫码，还有" + (willDay-today) +"天就可以获得我啦！");
                    }
                }
            },
            getData(){
                var url = "/user-center/signIn/list"
                this.getWithToken(url,{}).then(res=>{
                    if (res && res.code == 200) {
                        this.$loading.show=false;
//                        console.log(res.content.calendar);
                        this.continuousCount = res.content.continuousCount;
                        this.totalCount      = res.content.totalCount;
                        res.content.calendar.length < 30 ? this.totalAward = 9 : "";
                        var calendarArr = this.initDate(res.content.calendar);

                        this.calendarArr = calendarArr;

                    }else{
                        this.$toast(res.message)
                    }
                })
            },
            initDate(arr){  //思路 加入空对象——分组——判断连续，赋值给vue
                var res = [];
                //加入空对象
                var firstWeek = arr[0].week;    //0 1 2 3 4 5 6 前面需要空对象的个数
                for(var i = 0; i < firstWeek; i++){
                    arr.unshift({});
                }
                //分组
                var times = Math.ceil(arr.length/7);    //循环次数
                for(var j = 0; j < times; j++){
                    var a = arr.splice(0,7);
                    res.push(a);
                }
                //判断连续 continueType:"active","active-alone","activeBegin","activeEnd" （class对应）
                for(var x = 0; x < res.length; x++){
                    for(var y = 0; y < res[x].length; y++){
                        let o       = res[x][y];
                        let oPrev   = res[x][y-1] || {};
                        let oNext   = res[x][y+1] || {};
                        if (o.hasSignIn == 1) {         //签过到的筛选
                            //index=0 且下一个没选 || index = 6 且上一个没选 || 上一个没选 且 下一个没选
                            if((y == 0 && oNext.hasSignIn == 0) || (y == 6 && oPrev.hasSignIn == 0) || (oPrev.hasSignIn == 0 && oNext.hasSignIn == 0)){
                                o.continueType = "active-alone";

                            // index= 0 || 上一个没选
                            }else if (y == 0 || oPrev.hasSignIn != 1) {
                                o.continueType = "activeBegin";

                            // index = 6  || 下一个没选
                            }else if(y == 6 || oNext.hasSignIn != 1){
                                o.continueType = "activeEnd";

                            //上一个也签了，下一个也签了
                            }else if(oPrev && oPrev.hasSignIn == 1 && oNext && oNext.hasSignIn == 1 ){
                                o.continueType = "active";
                            }else{
                                console.error('还有值!!!!!',o.date)
                            }
                        }
                    }
                }
//                console.log("res",res)
                return res;
            },
//            signIn(){
//                return this.postWithToken('/user-center/signIn/viewSignIn').then(res=>{
//                    if (res && res.code == 200) {
//                        this.syJsbSignin(res.content);//唤起原生方法——弹窗
//                    }
//                })
//            },
            signIn(){
                let shareUrl = 'https://www.17shanyuan.com'
                return this.postWithToken('/user-center/signIn/viewSignIn').then(res=>{
                    if(res && res.code == 200){
                        res.content.codeUrl= this.imgUrl +'/common/download.png'
                        res.content.useUrl= window.location.origin + '/povertyCode'
                        res.content.goToUse= '去使用 >'
                        res.content.sms= '[一起善源]爱・源于善，要和我一起将扶贫进行到底码？我已坚持了 ' + this.totalCount + ' 天：' + shareUrl
                        console.log(this.totalCount)
                        this.syJsbSignin(res.content)  // 没有签到 原生弹框
                    }else{
                        this.$toast('获取数据失败')
                    }
                })
            },
            signTest(){ //模拟测试签到接口
//                var url = "/user-center/signIn/testSignIn?date=201805" + this.a;
//                this.postWithToken(url,{}).then(res=>{
//                    if (res && res.code == 200) {
//                        this.getData();
//                        this.a++
//                    }else{
//                        this.$toast(res.message)
//                    }
//                })
            }
        },
        watch:{},
        computed:{},
        filters:{
            onlyKeepDay(val){
                if (val) {
                    var r = String(val).substring(6);
                    return parseInt(r);
                }else{
                    return ""
                }
            }
        },
        created(){
            this.getData();
        },
        mounted(){
            this.$header.setTitle(this.title);

        }
    }
</script>

<style scoped lang="scss">
    @import "main.scss";
</style>
