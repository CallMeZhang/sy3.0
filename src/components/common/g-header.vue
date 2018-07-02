<template>
    <section class="container_top border-bottom-1px is-iphone10" :class="{'is-iphone10':iphone10}">
        <aside class="go-back" @click="syJsbCloseAppPage"></aside>
        <slot name="middle" v-if="$slots.middle"></slot>
        <div class="title-text" v-else>{{text || "一起善源"}}</div>
        <slot name="right"></slot>
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        props:["text"],
      data(){
        return {
          iphone10:false
        }
      },
      created(){
        this.iphone10=false
      },
    }
</script>

<style scoped>
    .go-back{
        width:0.88rem;
        height:100%;
        background:url(/static/images/search/goback.png) center center/0.21rem 0.37rem no-repeat;
        flex: 0 1 auto;
    }
    .container_top{
        min-height:0.88rem;
        height:0.88rem;
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        background-color:rgba(249,249,249,0.82);
        position:fixed;
        z-index: 97;
      width: 100%;
    }
    .title-text {
        height: 100%;
        width: 3.74rem;
        text-align: center;
        padding: 0 1rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font:0.36rem/0.88rem "";
        color:#2E2E2E;
    }
    /*.title-right{*/
        /*!*width:0.98rem;*!*/
        /*text-align:left;*/
        /*font:0.34rem/0.88rem "";*/
        /*color:#4B4B4B;*/
        /*flex:1 1 auto;*/
    /*}*/
</style>
