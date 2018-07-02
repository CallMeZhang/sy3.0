<template>
    <section v-title="title">
        <div class='main'>
            <p class="Hinformation">共 {{ this.helpNums }}位爱心人士为{{ this.countys }}脱贫贡献爱心</p>
            <div class='san'></div>
            <div class="goodlist" style='position: relative;'>
                <dl v-for="(item,index) in countrys.topUsers">
                    <dt :class="index === 1 ? 'portrait' : 'tow'">
                        <img v-lazy="(item.headImg ? item.headImg :imgs)+ossUrl('thumb_240')" alt="" class="second-img" style='height:100%;'>
                    </dt>
                    <dd>
                        <p class='name'><b>{{ item.name }}</b></p>
                        <p><span class='fund'>{{ item.points }}公益积分</span></p>
                        <p><span class='num'><img :class="item.topAdd ? 'arrow':'flat'"   :src="item.topAdd ? (item.topAdd > 0 ? down[0].arrows : down[1].arrows) : down[2].arrows"><span class='nums'>{{ item.topAdd }}</span></span></p>
                    </dd>
                </dl>
                <div class='oneMarkTow' style='width:0.88rem;height:0.8rem; position: absolute; top:.5rem; left:3rem;'><img :src="imgUrl+'/support/Shape.png'"></div>
                <div class='markTow' style='width:0.7rem;height:0.63rem; position: absolute; top:.78rem; left:.6rem;'><img :src="imgUrl+'/support/Group 4.png'"></div>
                <div class='markThree' style='width:0.7rem;height:0.63rem; position: absolute; top:.78rem; left:5.6rem;'><img :src="imgUrl+'/support/three.png'"></div>
            </div>
            <Ranking></Ranking>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
import Ranking from './ranking.vue'
    export default{
        data(){
            return {
                title:"",
                name:'杨三三',
                fund:'5,999公益积分',
                num:23,
                imgs:"../../../static/images/common/head-default.jpg",
                helpNums:0,
                countys:'',
                areaId:this.$route.query.areaId || '120110000000',
                down:[
                    {
                       "arrows":"../../../static/images/support/arrow.png"
                    },
                    {
                       "arrows":"../../../static/images/support/arrowdown.png"
                    },
                    {
                       "arrows":"../../../static/images/support/flat.png"
                    }
                ],
                countrys:{
                    topUsers:[]
                },
            }

        },
        components:{
            Ranking
        },
        methods:{
            county(){//县域详情相关接口
                var url = "/union-center/county/index";
                return this.get(url,{areaId:this.areaId,clientType:'H5'}).then((res)=>{
                if(res && res.code == 200){
                    this.countrys=res.content
                    this.helpNums=res.content.helpNums
                    this.countys=res.content.county
                    this.countrys.topUsers=res.content.topUsers.splice(0,3)
                    var a=this.countrys.topUsers[0]
                    var b=this.countrys.topUsers[1]
                    this.countrys.topUsers[1]=a
                    this.countrys.topUsers[0]=b
                    console.log('请求成功1',res.content.banner)
                    var tn=res.content.topUsers
                    console.log(tn)
                    this.countrys.topUsers=tn.slice(0,3)
                    console.log(this.countrys.topUsers)

                }else{
                    console.log('内容已失效')
                }
                })
            },
        },
        watch:{},
        computed:{},
        filters:{},
        created(){
            this.county();  //县域详情相关接口
        },
        mounted(){
            setTimeout(()=>{
                this.$header.setTitle("上月最佳帮扶人")
                // this.$header.show=false
                this.$loading.show=false
            },0)
            
        }
    }
</script>

<style scoped lang="scss">
    .main{
        width:100%;
        background-image: url(../../../static/images/support/page.png);
        background-size:7.5rem 100%;
        background-repeat:no-repeat;
        .Hinformation{
            width:100%;
            height:.33rem;
            color:#FF6533;
            font-size:0.24rem;
            text-align:center;
        }
        .goodlist{
            width:100%;
            display:flex;
            justify-content:space-around;
            align-items:center;
            dl{
                margin:0 auto;
                text-align:center;
                margin-top:1rem;
                position:relative;
                .portrait{
                    width:1.2rem;
                    height:1.2rem;
                    overflow:hidden;
                    border-radius:50%;
                    display:inline-block;
                    margin-top:-.2rem;
                    .second-img{
                        width:100%;
                        height:100%;
                    }
                    .markTow{
                        width:0.7rem;
                        height:0.63rem;
                        position:absolute;
                        top:-0.25rem;
                        left:0.2rem; 
                         
                    }
                    .oneMarkTow{
                        width:0.88rem;
                        height:0.8rem;
                        position:absolute;
                        top:-0.2rem;
                        left:0.1rem;
                    }
                }
                .tow{
                    width:1rem;
                    height:1rem;
                    overflow:hidden;
                    border-radius:50%;
                    display:inline-block;
                }
                dd{
                    .name{
                        font-size:.32rem
                    }
                    .fund{
                        height:0.58rem;
                        line-height:0.58rem;
                        font-size:.24rem;
                        color:#949494;
                    }
                    .num{
                        font-size:.28rem;
                        color:#FF1919;
                        .arrow{
                            width:.3rem;
                            height:.3rem;
                        }
                        .flat{
                            width:.66rem;
                        }
                        .nums{
                            margin-left:0.1rem; 
                        }
                    }
                }
            }
        }
    }
</style>
