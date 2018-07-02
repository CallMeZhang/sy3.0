<template>
    <section class="upload-box">
        <ul class="upload_lists">
            <li class="upload_lists_item" v-for="(item,index) in imgList" v-if="index < 9">
                <aside class="upload_item_pic" @click="preview(index)">
                    <!--<img :src="item">-->
                    <img :src="item" v-img-cover="item">
                </aside>
                <aside class="upload_dele" @click.stop="dele(index)"></aside>
            </li>
            <li>
                <div class="upload_btn" @click="add" v-if="imgList.length < maxNum"><span class="text">添加照片</span></div>
                <!--<input type="file" id="a1">-->
            </li>
        </ul>
    </section>
</template>

<script type="text/ecmascript-6">
    import Bus from "@/modules/bus/bus.js"
    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
    }
    export default{
        props:['maxLength','sign','imgList'],    //maxLength 最大上传数量 ,sign 标识。用于一个页面调用多个该组件(一般为index)
        data(){
            return {
                token:getCookie('token'),
                title:"我是一个上传图片展示器",            //由于受到jsb的限制，方法都写在父级页面，组件内部仅仅做通知
                maxNum:this.maxLength || 9,
            }
        },
        methods:{
            add(){  //上传方法
                Bus.$emit("addImg",this.sign);
            },
            dele(index){
                this.imgList.splice(index,1);
            },
            preview(index){
                Bus.$emit("preview",this.sign,index);
            },
        },
        created(){

        },
    }
</script>

<style scoped lang="scss">
    $fa:PingFang SC, SF-UI Display, Source Han Sans, Roboto;
    .upload-box{
        width:100%;
    }
    input[type=file]{
        display:none;
    }
    .upload_lists{
        width:100%;
        display:flex;
        padding:0.15rem 0 0;
        flex-wrap:wrap;
    }
    .upload_lists_item{
        width:1.5rem;
        height:1.5rem;
        position:relative;
        margin:0 0.5rem 0.3rem 0;
    }
    .upload_item_pic{
        width:100%;
        height:100%;
        border-radius:0.08rem;
        overflow:hidden;
        position:relative;
    }
    .upload_item_pic img{
        width:100%;
        height:100%;
    }
    .upload_dele{
        width:0.44rem;
        height:0.44rem;
        position:absolute;
        right:0;
        top:0;
        background:url(/static/images/applyRefund/dele.png) center center/cover no-repeat;
        transform:translate(40%,-40%);
        z-index:2;
    }
    .upload_item_pic:after{
        /*content:'点击预览';*/
        color:#fff;
        background-image:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.5));
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        box-sizing:border-box;
        text-align:center;
        font:0.24rem/0.33rem $fa;
        padding-top:1.08rem;
    }
    .upload_btn{
        width:1.5rem;
        height:1.5rem;
        display:inline-block;
        position:relative;
        border:1px dashed #D0D0D0;
        border-radius:0.08rem;
        text-align: center;
        font: 0.24rem/0.33rem $fa;
        box-sizing:border-box;
        padding-top:1.08rem;
        color:#D0D0D0;
        margin:0 0.5rem 0.3rem 0;

    }
    .upload_btn:after{
        content:"";
        width:0.6rem;
        height:0;
        border-top:1px solid #D0D0D0;
        position:absolute;
        left:0.45rem;
        top:0.57rem;
    }
    .upload_btn:before{
        content:"";
        width:0;
        height:0.6rem;
        border-right:1px solid #D0D0D0;
        position:absolute;
        left:0.74rem;
        top:0.28rem;
    }
    .text{
        position:absolute;
        bottom:0.08rem;
        left:0;
        width:100%;
    }

</style>