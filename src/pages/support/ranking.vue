<template>
    <section v-title="title">
        <ul class='content'>
            <li v-for='(item,index) in countrys.topUsers' :class="index < 3 ? 'list_user users' : 'list_user'">
                <img class='serial':src="datas[index].img">
                <div class='user_information'>
                    <img v-lazy="(item.headImg ? item.headImg :imgs)+ossUrl('thumb_240')">
                    <div class='information' :class="index < 3 ? 'www' : 'information'">
                        <p class='username'><b>{{ item.name }}</b></p>
                        <span class='funds'>{{ item.points }}公益积分</span>
                    </div>
                </div>
                <div class='right'>
                    <!-- <img class='arrows' :src="item.topAdd > 0 ? down[0].arrows : down[1].arrows"> -->
                    <img :class="item.topAdd ? 'arrows':'flat'"   :src="item.topAdd ? (item.topAdd > 0 ? down[0].arrows : down[1].arrows) : down[2].arrows">                
                    <span class='nums' :class="index == 2 ? 'num' : 'nums'">{{ item.topAdd }}</span>
                </div>
            </li>
            <img class='sign' src="../../../static/images/support/sign.png">
            <div class='bottom'></div>
        </ul>
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                title:"",
                username:'杨三三',
                funds:'5,999公益积分',
                nums:23,
                imgs:"../../../static/images/common/head-default.jpg",
                areaId:this.$route.query.areaId || '120110000000',
                countrys:{
                    topUsers:[]
                },
                datas:[
                    {
                       "img":"../../../static/images/support/4.png"
                    },
                    {
                       "img":"../../../static/images/support/5.png"
                    },
                    {
                       "img":"../../../static/images/support/6.png"
                    },
                    {
                       "img":"../../../static/images/support/7.png"
                    },
                    {
                       "img":"../../../static/images/support/8.png"
                    },
                    {
                        "img":"../../../static/images/support/9.png"
                    },
                    {
                       "img":"../../../static/images/support/10.png"
                    }
                ],
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
                topUsers: [
                    {
                        "name": "张菲",
                        "headImg": "http://k2.jsqq.net/uploads/allimg/1707/7_170715153825_2.jpg",
                        "points": "2395",
                        "nums":"23",
                        "img":"../../../static/images/support/4.png",
                        "arrows":"../../../static/images/support/arrow.png"
                    },
                    {
                        "name": "刘云",
                        "headImg": "http://k2.jsqq.net/uploads/allimg/1707/7_170715153825_12.jpg",
                        "points": "2753",
                        "nums":"13",
                        "img":"../../../static/images/support/5.png",
                        "arrows":"../../../static/images/support/arrow.png"
                        
                    },
                    {
                        "name": "吴余新",
                        "headImg": "http://k2.jsqq.net/uploads/allimg/1707/7_170715153825_9.jpg",
                        "points": "1431",
                        "nums":"25",
                        "img":"../../../static/images/support/6.png",
                        "arrows":"../../../static/images/support/arrowdown.png"
                    },
                    {
                        "name": "刘志云",
                        "headImg": "http://k2.jsqq.net/uploads/allimg/1707/7_170715153825_1.jpg",
                        "points": "1395",
                        "nums":"13",
                        "img":"../../../static/images/support/7.png",
                        "arrows":"../../../static/images/support/arrow.png"
                    },
                    {
                        "name": "王霏",
                        "headImg": "http://diy.qqjay.com/u2/2014/0623/4a18e6af21687246d731e591f6465c71.jpg",
                        "points": "1155",
                        "nums":"20",
                        "img":"../../../static/images/support/8.png",
                        "arrows":"../../../static/images/support/arrow.png"
                    },
                    {
                        "name": "谢欣",
                        "headImg": "http://diy.qqjay.com/u2/2014/0623/a51403c787fe643c71ac04eed41e8466.jpg",
                        "points": "1685",
                        "nums":"11",
                        "img":"../../../static/images/support/9.png",
                        "arrows":"../../../static/images/support/arrow.png"
                    },
                    {
                        "name": "江冉",
                        "headImg": "http://diy.qqjay.com/u2/2014/0623/4f996b5ef2f4a85e980668fc0aaa5c02.jpg",
                        "points": "1494",
                        "nums":"12",
                        "img":"../../../static/images/support/10.png",
                        "arrows":"../../../static/images/support/arrow.png"
                    }
                ]
            }
        },
        methods:{
            county(){//县域详情相关接口
                var url = "/union-center/county/index";
                return this.get(url,{areaId:this.areaId,clientType:'H5'}).then((res)=>{
                if(res && res.code == 200){
                    this.countrys=res.content
                    this.helpNums=res.content.helpNums
                    console.log('请求成功1',res.content.banner)
                    var tn=res.content.topUsers
                    console.log(tn)
                    this.countrys.topUsers=tn.slice(3,10)
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

        }
    }
</script>

<style scoped lang="scss">
    .content{
        position:relative;
        margin-top:.77rem;
        width:100%;
        .list_user{
            width:6.22rem;
            height:.8rem;
            margin-top:.6rem;
            margin-left:.72rem;
            .serial{
                displa:inline-block;
                height:0.52rem;
                margin-top:.14rem;
                float:left;
            }
            .user_information{
                height:.8rem;
                float:left;
                img{
                    width:.8rem;
                    height:.8rem;
                    overflow:hidden;
                    border-radius:50%;
                    float:left;
                    margin-left:.36rem;
                }
                .information{
                    height:.8rem;
                    margin-left:1.3rem;
                    .username{
                        width:2.3rem; 
                        height:.38rem;
                        line-height:.38rem;
                        font-size:.28rem;
                    }
                    .funds{
                        height:.26rem;
                        line-height:.38rem;
                        font-size:.24rem;   
                        color:#949494;
                    }
                }
                .lefts{
                    width:2.43rem;
                }
            }
            .right{
                height:.8rem;
                line-height:.8rem;
                float:left;
                .arrows{
                    width:.3rem;
                    height:.3rem;
                    display:inline-block;
                    margin-top:.25rem;  
                }
                .flat{
                    width:.66rem;
                    display:inline-block;
                    margin-top:.53rem;
                }
                .nums{
                    display:inline-block;
                    height:.3rem;
                    line-height:.3rem;
                    font-size:.28rem;
                    padding:.1rem;
                    color:red;
                }
                    .num{
                        color:#70A460;
                    }
                .seccess{
                    color:#70A460;
                }
            }
        }
        .bottom{
                width:100%;
                height:1.29rem;
        }
        .sign{
            width:0.65rem;
            height:0.68rem; 
            position:absolute;
            top:-0.34rem;
            left:0.17rem;
        }
    }
    .users{
        padding-left:.5rem;
    }
    .www{
        width:3.21rem;
    }

</style>