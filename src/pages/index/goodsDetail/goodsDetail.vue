<template>
    <section v-title="title" class="container">
    <section class="download" id="download">
        <downLoad></downLoad>
    </section>
    <div v-if="goods.goodsStatus == 3 || goods.goodsStatus == 5">
        <aside v-if="isShare != 'yes'" :class="{__header:true,'__header-b':headerB,'iphone10-paddingTop':true,'border-bottom-1px':headerNavOpacity == 1}"
               :style=" 'background-color: rgba(249, 249, 249,' + headerNavOpacity + ');' +
               'background-image: linear-gradient(to bottom,rgba(0, 0, 0, ' + linearGradient + ') 0%, transparent 100%)' " id="__header">
            <div class="back" :style=" 'opacity:'+ headerBtnOpacity " @click="syJsbCloseAppPage()"></div>
            <ul class="first_menu_group" :style=" 'opacity:'+ headerNavOpacity ">
                <li :class="{menu:true,active:HeaderBtnActive == 0}" @click="changeHeaderActive(0)">商品</li>
                <li :class="{menu:true,active:HeaderBtnActive == 1}" @click="changeHeaderActive(1)">详情</li>
                <li :class="{menu:true,active:HeaderBtnActive == 2}" @click="changeHeaderActive(2)">推荐</li>
            </ul>
            <div style="height: 0.88rem;width: 0.88rem;">
                <div class="share" :style=" 'opacity:'+ headerBtnOpacity " @click="share"></div>
            </div>
        </aside>

        <div id="goods">
            <swiper :class="{swiper:true,youpin:goods.isQuality == 1}" id="swiper" :options="swiperOption">
                <swiper-slide class="item" v-if="goods.goodsMainMedia.status == 1"><!--1启用0禁用-->
                    <img :src="goods.goodsMainMedia.imgUrl + ossUrl('webp_480')" v-if="goods.goodsMainMedia.type == 1 "> <!--1图片2视频-->
                    <video :src="goods.goodsMainMedia.videoUrl" preload="auto" controls v-else></video>
                </swiper-slide>
                <swiper-slide class="item" v-for="(item,index) in goodsMediaListSort" v-if="item.status == 1" :key="item.goodsMediaId">
                    <img :src="item.imgUrl + ossUrl('webp_480')" v-if="item.type == 1 && goods.goodsMediaList">
                    <video :src="goods.goodsMainMedia.videoUrl + ossUrl('webp_480')" preload="auto" controls v-else></video>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" v-show="goods.goodsMediaList && goods.goodsMediaList.length"></div>
            </swiper>

            <section class="box-a border-bottom-1px">
                <div class="top">

                    <div :class="{h1:true,fupinma:goods.isCanUseCode}" v-if="!parseFloat(skuInfo.points)">
                        <span class="red">￥</span>
                        <span class="large red">{{skuInfo.price | onlyKeepInt}}</span>
                        <span class="red">{{skuInfo.price | onlyKeepFloat}}</span>
                        <span class="cancel" v-if="parseFloat(skuInfo.originPrice) && skuInfo.originPrice != skuInfo.price">￥{{skuInfo.originPrice | onlyKeepInt}}{{skuInfo.originPrice | onlyKeepFloat}}</span>
                    </div>
                    <div :class="{h1:true,fupinma:goods.isCanUseCode}" v-else><!--纯积分商品-->
                        <span class="large red">{{skuInfo.points}}</span>
                        <span>积分&nbsp;</span>
                        <span v-if="parseFloat(skuInfo.price)">
                            <span>+&nbsp;</span>
                            <span class="large red">{{skuInfo.price | onlyKeepInt}}</span>
                            <span class="red">{{skuInfo.price | onlyKeepFloat}}</span>
                            <span>元</span>
                            <span class="cancel" v-if="parseFloat(skuInfo.originPrice) && skuInfo.originPrice != skuInfo.price">￥{{skuInfo.originPrice | onlyKeepInt}}{{skuInfo.originPrice | onlyKeepFloat}}</span>
                        </span>

                    </div>
                    <div v-if="isShare != 'yes'">
                        <div class="tip_btn" v-if="goods.goodsType == 3"><!--1.助理人，2:自营困户,3:集采,4:善企-->
                            <div class="no-enter">本扶贫产品支持单位集中采购</div>
                            <div class="button" @click="$toast('即将开通')">加入集采清单</div>
                        </div>
                    </div>
                    <h3 :class="{h3:true,'no-enter2':true,yushou:goods.mode == 1}" v-html="goods.goodsName" @click="ccc"></h3>
                </div>

                <div class="bot border-top-1px" v-if="goods.goodsType != 4 && goods.areaMap" @click="goCounty">
                    <span>产自</span>
                    <span class="local"></span>
                    <div class="text no-enter">
                        <span v-for="(i,ind) in goods.areaMap" class="local-area-text">{{i.areaName}}</span>
                        <span class="spacer" v-if="goods.isPoorCounty == 1">贫困县</span>
                        <span class="spacer" v-if="goods.isPoorCounty == 2">国家级贫困县</span>
                    </div>
                    <div class="to-right" v-if="goods.isPoorCounty"></div>
                </div>
                <section class="box-d border-top-1px" v-if="goods.goodsType == 4">        <!--复制下面的-->
                    <div class="d-row border-bottom-1px"
                         v-if="coupon.canGetList.length || coupon.haveGetList.length" @click="slideCouponShow"
                         v-show="goods.goodsType != 4">
                        <div class="d-title">优惠券</div>
                        <div class="d-mid no-enter">
                            <div class="d-coupon" v-for="(item,index) in couponShowList" v-if="index<couponShowNum">
                                <div class="price">￥{{item.reducePrice}}</div>
                                <div class="introduce">满{{item.toPrice}}减{{item.reducePrice}}</div>
                            </div>
                        </div>
                        <div class="more"></div>
                    </div>
                    <div class="d-row more-line border-bottom-1px" v-if="goods.buyLimitCount || skuInfo.isWholesale == 1">
                        <div class="d-title">促销</div>
                        <div class="d-mid no-enter">
                            <div v-if="goods.buyLimitCount">每个ID限购{{goods.buyLimitCount}}件</div>
                            <div v-if="skuInfo.isWholesale == 1">购买数量超{{skuInfo.wholesaleList[0].startCount}}件，可享受批发价</div>
                        </div>
                    </div>
                    <div class="d-row border-bottom-1px" v-if="goods.goodsStatus == 3" @click="skuShow = true;shadowShow = true;type = 'buy';onlyChoose=true">
                        <div class="d-title">规格</div>

                        <div class="d-mid no-enter" v-if="!skuDefault&&skuId!='error'">
                            已选：<!--
                        --><span v-for="item in skuInfo.skuValueList">{{item.propertyValueName || item.skuValue}}&nbsp;</span>
                        </div>
                        <div class="d-mid no-enter" v-else>请选择</div>

                        <div class="more"></div>
                    </div>

                    <div class="d-row more-line border-bottom-1px" @click="peisongShow">
                        <div class="d-title">配送</div>
                        <div class="d-mid no-enter">
                            <div>
                                {{parseInt(freightInfo.transFeeInfo.defaultFee) ? "￥" + freightInfo.transFeeInfo.defaultFee : "免运费" }}
                                {{bLimitBuy ? ' (部分区域暂不支持购买)':''}}
                            </div>
                            <div v-if="goods.mode == 1">预计{{goods.promiseDeliveryAt*1000 | formatTime("YMDHMS","-")}}开始发货</div>
                        </div>
                        <div class="more" v-show="bLimitBuy"></div>
                    </div>

                    <div class="d-row border-bottom-1px" v-if="!isEmpty(goods.identificationMap)" @click='baozhangShow'>
                        <div class="d-title">产品保障</div>
                        <div class="d-mid no-enter">
                            <div class="tip-text" v-for="(value, key, index) in goods.identificationMap" v-if="index < 3">
                                {{key == "youJi" ? "有机认证" : ""}}
                                {{key == "ouMeng" ? "欧盟认证" : ""}}
                                {{key == "wuGongHai" ? "无公害认证" : ""}}
                                {{key == "lvSe" ? "绿色认证" : ""}}
                            </div>
                        </div>
                        <div class="more needsclick"></div>
                    </div>
                </section>

            </section>
            <section class="box-b border-bottom-1px border-top-1px" v-if="evalueTotalCount">
                <ul class="pic_group" v-if="headerImgArr.length" @click="appOpen('evaluationList',{goodsId:goodsId})">
                    <li class="item" v-for="(item,index) in headerImgArr" :style="'z-index:' + (15 - index)">
                        <img class="img" :src="item || (imgUrl + '/common/head-default.jpg')">
                    </li>
                    <li class="item"></li>
                </ul>
                <div class="pic_group_h3" v-if="goods.goodsType == 4">已被公益人士兑换{{goods.helpCount}}次</div>
                <div class="pic_group_h3" v-else>{{goods.helpCount}}位爱心人士已帮扶</div>
                <div class="pic_group_p" v-if="goods.goodsType != 4">
                    <div class="pic-box">
                        <div class="pic-box-a">助力销售</div>
                        <div>{{goods.sumSaleNum}}{{goods.specName}}</div>
                    </div>
                    <div class="pic-box">
                        <div class="pic-box-a">{{goods.goodsType == 2 ? '贫困户增收' : '当地增收'}}</div>
                        <div>{{goods.localIncreaseIncome}}元</div>
                    </div>
                    <div class="pic-box">
                        <div class="pic-box-a">扶贫捐赠</div>
                        <div>{{goods.poorIncreaseIncome}}元</div>
                    </div>
                </div>
                <section class="slide" v-if="evaluationInfo.goodsRecommendEval.length">
                    <ul class="item_group">
                        <li class="item" v-for="(item,index) in evaluationInfo.goodsRecommendEval"
                            :key="item.geId"
                            @click="appOpen('evaluationList',{geId:item.geId,goodsId:goodsId})">
                            <div class="left">
                                <div class="top">
                                    <aside class="head_pic">
                                        <img :src="item.mHeadImg">
                                    </aside>
                                    <div class="name no-enter">{{item.mName}}</div>
                                </div>
                                <p class="text no-enter4">{{item.evalDesc}}</p>
                            </div>
                            <div class="right" v-if="item.evalImgs.length">
                                <img v-lazy="item.evalImgs[0] + ossUrl('webp_240')" v-img-cover="item.evalImgs[0] + ossUrl('webp_240')">
                            </div>
                        </li><!--
                     --><li class="item last-item" @click="appOpen('evaluationList',{goodsId:goodsId})">
                            <div class="h4">更多评论</div>
                            <div class="line border-bottom-1px"></div>
                            <div class="h5">See more</div>
                        </li>
                    </ul>
                </section>
            </section>
            <section class="box-b-else border-bottom-1px border-top-1px" v-else>
                <div class="box-b-else-inner" v-if="goods.goodsType == 2">
                    <h1>一次购买，三重帮扶</h1>
                    <p> • 每成交一笔订单，平台同步进行扶贫捐赠</p>
                    <p> • 直接帮助贫困户增收，多劳者多得</p>
                    <p> • 帮助拓展农产品销路，长效持续脱贫</p>
                </div>
                <div class="box-b-else-inner" v-else-if="goods.goodsType == 4">
                    <h1>积分兑换 回馈爱心人士</h1>
                    <p> • 独家设计，别具匠心</p>
                    <p> • 公益好物，精挑细选</p>
                    <p> • 公益积分兑换，公益行为再增值</p>
                </div>
                <div class="box-b-else-inner" v-else>
                    <h1>一次购买，三重帮扶</h1>
                    <p> • 每成交一笔订单，平台同步进行扶贫捐赠</p>
                    <p> • 帮助当地拓展农产品销路，长效脱贫</p>
                    <p> • 促进农村电商发展，提升产业造血能力</p>
                </div>

            </section>
            <section class="box-c border-top-1px border-bottom-1px" v-if="goods.goodsType == 1 || goods.goodsType == 2">
                <section class="people" @click="goStore(goods.goodsType)">
                    <aside class="people_head">
                        <!--<img :src="storeInfo.brandLogo + ossUrl('webp_240')">-->
                        <img :src="(storeInfo.storeLogo || storeInfo.brandLogo || (imgUrl + '/common/head-default.jpg')) + ossUrl('thumb_240')"
                            onerror="this.src = 'https://cdnpre-m.17shanyuan.com/static/images/common/head-default.jpg?x-oss-process=style/thumb_120'">
                        <!--<img :src="storeInfo.storeLogo + ossUrl('webp_240')">-->
                    </aside>
                    <article class="people_info no-enter">
                        <h4 class="people_name no-enter">
                            {{goods.goodsType == 1? "助理人：" + storeInfo.ownerName : ""}}
                            {{goods.goodsType == 2? "贫困户：" + storeInfo.ownerName : ""}}
                            {{goods.goodsType == 4? "善企：" + storeInfo.storeName : ""}}
                            <!--{{storeInfo.ownerName}}-->
                        </h4>
                        <p class="people_company no-enter">
                            {{goods.goodsType == 1? "所属企业 丨 " + storeInfo.entName : "" }}
                            {{goods.goodsType == 2? "来自" + storeInfo.province + storeInfo.county : "" }}
                            {{goods.goodsType == 4? "所属企业 丨 " + storeInfo.entName : "" }}
                        </p>
                    </article>
                    <aside class="to-right"></aside>
                </section>
                <section class="shuoming" v-if="goods.goodsType == 1"><!--1.助理人，2:困户,3:集采,4:善企-->
                    <p>产品数量 <span class="red">{{storeInfo.goodsNum || 0}}</span></p>
                    <p>带动贫困户 <span class="red">{{storeInfo.promotePoorNum || 0}}</span></p>
                    <p>雇佣贫困户 <span class="red">{{storeInfo.employPoorNum || 0}}</span></p>
                </section>
                <section class="shuoming" v-if="goods.goodsType == 2">
                    <p>产品数量 <span class="red">{{storeInfo.goodsNum || 0}}</span></p>
                    <p>自营增收额 <span class="red">{{storeInfo.orderAmount/100  || 0}}</span></p>
                    <p>受帮扶数 <span class="red">{{storeInfo.orderNum || 0}}</span></p>
                </section>
                <section class="shuoming" v-if="goods.goodsType == 4">
                    <p>产品数量 <span class="red">{{storeInfo.goodsNum || 0}}</span></p>
                    <p>回馈爱心次数 <span class="red">{{storeInfo.暂时不做 || 0}}</span></p>
                    <p>爱心积分 <span class="red">{{storeInfo.暂时不做 || 0}}</span></p>
                </section>
            </section>
            <section class="box-f border-top-1px border-bottom-1px" v-if="goods.goodsType == 3" @click="goPovertyCode">
                <div class="title">
                    <span class="no-enter">善源甄选专区推荐使用扶贫码</span>
                    <div class="to-right"></div>
                </div>
                <ul class="list">
                    <li class="item">
                        <aside class="pic img1"></aside>
                        <p class="p">面值自定义</p>
                    </li>
                    <li class="item">
                        <aside class="pic img2"></aside>
                        <p class="p">支付更灵活</p>
                    </li>
                    <li class="item">
                        <aside class="pic img3"></aside>
                        <p class="p">退码更便捷</p>
                    </li>
                </ul>
            </section>

            <section class="box-d border-top-1px border-bottom-1px" v-if="goods.goodsType != 4">        <!--主要操作项,上边那个是复制的-->
                <div class="d-row border-bottom-1px"
                     v-if="coupon.canGetList.length || coupon.haveGetList.length" @click="slideCouponShow"
                     v-show="goods.goodsType != 4">
                    <div class="d-title">优惠券</div>
                    <div class="d-mid no-enter">
                        <div class="d-coupon" v-for="(item,index) in couponShowList" v-if="index<couponShowNum">
                            <div class="price">￥{{item.reducePrice}}</div>
                            <div class="introduce">满{{item.toPrice}}减{{item.reducePrice}}</div>
                        </div>
                    </div>
                    <div class="more"></div>
                </div>
                <div class="d-row more-line border-bottom-1px" v-if="goods.buyLimitCount || skuInfo.isWholesale == 1">
                    <div class="d-title">促销</div>
                    <div class="d-mid no-enter">
                        <div v-if="goods.buyLimitCount">每个ID限购{{goods.buyLimitCount}}件</div>
                        <div v-if="skuInfo.isWholesale == 1">购买数量超{{skuInfo.wholesaleList[0].startCount}}件，可享受批发价</div>
                    </div>
                </div>
                <div class="d-row border-bottom-1px" v-if="goods.goodsStatus == 3" @click="skuShow = true;shadowShow = true;type = 'buy';onlyChoose=true">
                    <div class="d-title">规格</div>

                    <div class="d-mid no-enter" v-if="!skuDefault&&skuId!='error'">
                        已选：<!--
                        --><span v-for="item in skuInfo.skuValueList">{{item.propertyValueName || item.skuValue}}&nbsp;</span>
                    </div>
                    <div class="d-mid no-enter" v-else>请选择</div>

                    <div class="more"></div>
                </div>

                <div class="d-row more-line border-bottom-1px" @click="peisongShow">
                    <div class="d-title">配送</div>
                    <div class="d-mid no-enter">
                        <div>
                            {{parseInt(freightInfo.transFeeInfo.defaultFee) ? "￥" + freightInfo.transFeeInfo.defaultFee : "免运费" }}
                            {{bLimitBuy ? ' (部分区域暂不支持购买)':''}}
                        </div>
                        <div v-if="goods.mode == 1">预计{{goods.promiseDeliveryAt*1000 | formatTime("YMDHMS","-")}}开始发货</div>
                    </div>
                    <div class="more" v-show="bLimitBuy"></div>
                </div>

                <div class="d-row border-bottom-1px" v-if="!isEmpty(goods.identificationMap)" @click='baozhangShow'>
                    <div class="d-title">产品保障</div>
                    <div class="d-mid no-enter">
                        <div class="tip-text" v-for="(value, key, index) in goods.identificationMap" v-if="index < 3">
                            {{key == "youJi" ? "有机认证" : ""}}
                            {{key == "ouMeng" ? "欧盟认证" : ""}}
                            {{key == "wuGongHai" ? "无公害认证" : ""}}
                            {{key == "lvSe" ? "绿色认证" : ""}}
                        </div>
                    </div>
                    <div class="more needsclick"></div>
                </div>
            </section>

        </div>
        <section class="box-e border-bottom-1px border-top-1px" id="navigationBox">
            <div style="height:0.9rem" id="navigation">
                <nav id="n" :class="{nav:true,'nav-fixed':navFixed,navAbsolute:navAbsolute,'iphone10-paddingTop':navFixed}">
                    <ul class="nav-inner">
                        <li :class="{item:true,active:NavBtnActive == 0}" @click="changeNavActive(0)">图文详情</li>
                        <li :class="{item:true,active:NavBtnActive == 1}" @click="changeNavActive(1)">
                            {{goods.goodsType == 4 ? "兑换小贴士" : "帮扶小贴士" }}
                        </li>
                    </ul>
                </nav>
            </div>

            <div id="goodsDetail">
                <div v-for="item in goodsDesc">
                    <div v-if="item.type == 'text'" style="padding:0.22rem 0">
                        <div v-for="ite in item.value" v-html="ite"></div>
                    </div>
                    <div v-if="item.type == 'img'">
                        <aside v-for="ite in item.value" style="font:0px/0px arial">
                            <img :src="ite + ossUrl('webp_960')" class="img-indent">
                        </aside>
                    </div>
                </div>
            </div>

            <div id="prompt">
                <div v-if="goods.goodsType == 4">
                    <h3>您的爱心，带动了文化的传承</h3>

                    <p>为了回馈您长期以来对贫困地区的帮助，同时发扬和传承中国的文化，国内优秀的专业设计师们为您设计了新颖实用、寓意美好的文创产品，是收藏和赠礼之佳品。（本商城的文创产品均由设计师手工制造，质量精良，产量有限）</p>

                    <h3>积分兑换的产品可以退换么？</h3>

                    <p>积分兑换的产品原则上不接受退换，若您收到的商品有质量问题，可申请售后，经客服人员确认后会为您补发。</p>
                </div>
                <div v-else>
                    <h3>爱心产品的质量有保障么？</h3>

                    <p>一起善源平台在贫困地区建立了专门的运营中心，对每批产品进行抽检审核，并且提供仓储、包装、物流等服务，以确保这些产品可以顺利送达您的手中。

                        我们的助理人或贫困户虽然不是专业的电商卖家，但他们一直在努力去提升服务质量，您的每一次帮扶都是他们前进的信心。</p>

                    <h3>您的爱心购买是如何帮扶到贫困地区的？</h3>

                    <p>购买产品可以直接提高贫困户的收入，更重要的是会带动当地基础环境、设施、人才、理念的提高，为贫困地区的经济发展打下基础，为他们长效脱贫打下基础。

                        平台运行以来已经协助多个贫困县建立了运营中心，当地电商的基础环境，物流环境都得到了极大的改善。</p>

                    <h3>贫困户的产品质量有保证吗？</h3>

                    <p>贫困户自营的产品在服务上会有一些欠缺，可能表现在包装、发货、价格、售后及沟通等方面。贫困户生产批量小、交通不便，包装、物流费用难以降低。

                        这正是贫困的主要原因，也是我们扶贫工作中需要改进的问题，因此希望您能多一分理解，您的包容和支持将是他们前进的动力。</p>

                </div>
            </div>

        </section>
        <section class="border-top-1px border-bottom-1px"  id="recommend">
            <recommend-goods type="detail" :speciesId="goods.speciesId"></recommend-goods>
        </section>
        <section class="bot-tip">
            <!--最后更新于：{{goods.createAt | formatTime('YMDHMS')}}--> © 17shuanyuan.com
        </section>
        <footer :class="{footer:true,hei170:goods.goodsStatus == 5,'iphone10-footer-padding':true}">
            <div class="footer-inner border-top-1px iphone10-footer-padding">
                <div class="left">
                    <div class="message" @click="callPhone" v-if="appInfo"></div>
                    <a :href="'tel:' + storeInfo.servicePhone" class="message" v-else></a>
                    <div :class="{gift:true,news:goodsCartStatus == 1}" @click="appGoWishList" v-if="!(isShare == 'yes' || goods.goodsType == 4)"></div>
                </div>
                <div class="middle">
                    <div class="mid" @click="joinWishList" v-if="!(isShare == 'yes' || goods.goodsType == 4)">加入心愿单</div>
                    <div  :class="{right:true,'button-linear':true,disabled:bangfuBtnDisabled}"
                          @click="bangfu">{{goods.goodsType == 4 ? '立即兑换' : '立即帮扶'}}</div>
                </div>
                <div class="empty-tip" v-if="goods.goodsStatus == 5">您手速太慢，产品已经被抢光啦！</div>
            </div>
        </footer>

        <transition name="fade2" >
            <aside class="shadow" v-show="shadowShow" @click="slideHide" @touchmove.prevent></aside>
        </transition>
        <transition name="slideTop">
            <section class="sku  iphone10-footer-padding" v-show="skuShow">
                <div class="top border-bottom-1px">
                    <aside class="sToTop-box-close" @click="slideHide"></aside>
                    <aside class="pic" v-if="type == 'buy'"> <!--区分两种弹窗 @touchmove.prevent-->
                        <img :src="skuInfo.skuImgUrl || goods.goodsMainMedia.imgUrl + ossUrl('webp_240')">
                    </aside>
                    <aside class="pic" v-else>
                        <img :src="wishSkuIdInfo.skuImgUrl || goods.goodsMainMedia.imgUrl + ossUrl('webp_240')">
                    </aside>
                    <article class="info" v-if="type=='buy'"> <!--区分两种弹窗-->
                        <h3 class="h3" v-if="parseFloat(skuInfo.points)">
                            <span class="red">{{skuInfo.points}}</span>
                            <span class="thin">积分</span><!--
                         --><span v-if="parseFloat(skuInfo.price)">
                                <span class="thin">&nbsp;+&nbsp;</span><!--
                             --><span class="red">{{skuInfo.price | float2}}</span><!--
                             --><span class="thin">元</span>
                            </span>
                        </h3>
                        <h3 class="h3" v-else>
                            <span class="red">¥</span><!--
                         --><span class="red" v-if="type == 'buy' && wholesale">{{wholesaleInfo.price || skuInfo.price | float2}}</span><!--批发价-->
                            <span class="red" v-else>{{skuInfo.price | float2}}</span>
                        </h3>

                        <div :class="{p:true,'no-enter':true,transparent:type != 'buy'}">库存：<span class="normal">{{skuInfo.stocks}}</span>件</div>
                        <div class="p no-enter" v-if="!skuDefault && skuId!='error'">
                            已选：<!--
                            --><span v-for="item in skuInfo.skuValueList">{{item.propertyValueName || item.skuValue}}&nbsp;</span>
                        </div>
                        <div class="p no-enter" v-else>请选择规格属性</div>
                    </article>

                    <article class="info" v-else>
                        <h3 class="h3" v-if="parseFloat(wishSkuIdInfo.points)">
                            <span class="red">{{wishSkuIdInfo.points}}</span>
                            <span class="thin">积分</span><!--
                         --><span v-if="parseFloat(wishSkuIdInfo.price)">
                                <span class="thin">&nbsp;+&nbsp;</span><!--
                             --><span class="red">{{wishSkuIdInfo.price | float2 }}</span><!--
                             --><span class="thin">元</span>
                            </span>
                        </h3>
                        <h3 class="h3" v-else>
                            <span class="red">¥</span><!--
                         --><span class="red" v-if="type == 'buy' && wholesale">{{wishSkuIdInfo.price | float2}}</span><!--不显示批发价-->
                            <span class="red" v-else>{{wishSkuIdInfo.price | float2}}</span>
                        </h3>

                        <div :class="{p:true,'no-enter':true,transparent:type != 'buy'}">库存：<span class="normal">{{wishSkuIdInfo.stocks}}</span>件</div>
                        <div class="p no-enter" v-if="!wishSkuDefault && wishSkuId!='error'">
                            已选：<!--
                            --><span v-for="item in wishSkuIdInfo.skuValueList">{{item.propertyValueName || item.skuValue}}&nbsp;</span>
                        </div>
                        <div class="p no-enter" v-else>请选择规格属性</div>
                    </article>
                </div>
                <div class="mid" @scroll.stop @touchmove.stop>
                    <div v-show="type == 'wishList'">
                        <sku :dataSource="wishListSkuList" :type="'wishList'" v-if="wishListSkuList.length!=0" @setSkuId="getSkuId"></sku>
                        <!--<div style="background-color:red">111</div>-->
                        <!--<sku :dataSource="this[this['whichSkuList']]" v-if="skuList.length!=0" @setSkuId="getSkuId"></sku>-->
                    </div>
                    <div v-show="type == 'buy'">
                        <sku :dataSource="skuList" :type="'buy'" v-if="skuList.length!=0" @setSkuId="getSkuId"></sku>
                        <!--<sku :dataSource="this[this['whichSkuList']]" v-if="skuList.length!=0" @setSkuId="getSkuId"></sku>-->
                    </div>
                    <div class="amountF border-bottom-1px border-top-1px" v-show="type=='buy'">
                        <div>购买数量</div>
                        <div class="operate">
                            <div class="reduce" @click="changeNum('-')"></div>
                            <div class="amount">{{amount}}</div>
                            <div class="add" @click="changeNum('+')"></div>
                        </div>
                    </div>
                </div>
                <div class="button-linear bottom34" @click="confirm()">确定</div>
            </section>
        </transition>       <!--sku @touchmove.prevent-->
        <transition name="slideTop">
            <section class="sToTop-box" v-show="explainShow">
                <div class="sToTop-box-close" @click="slideHide"></div>
                <div class="sToTop-box-title border-bottom-1px">配送说明</div>
                <div class="sToTop-box-list" @scroll.stop>
                    <ul>
                        <li class="li" v-if="freightInfo.supportCity.length < freightInfo.unSupportCity.length">
                            <h3 class="h3 no-enter">可购买区域：</h3>
                            <p class="p">
                                <span class="z1" v-for="item in freightInfo.supportCity">{{item}}</span>
                            </p>
                        </li>
                        <li class="li" v-else>
                            <h3 class="h3 no-enter">暂不支持购买区域：</h3>
                            <p class="p">
                                <span class="z1" v-for="item in freightInfo.unSupportCity">{{item}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </transition>       <!--配送说明 @touchmove.prevent-->
        <transition name="slideTop">
            <section class="sToTop-box" v-show="ensureShow">
                <div class="sToTop-box-close" @click="slideHide"></div>
                <div class="sToTop-box-title border-bottom-1px">产品保障</div>
                <div class="sToTop-box-list" @scroll.stop>
                    <ul>
                        <li class="li" v-for="(value, key, index) in goods.identificationMap">
                            <h3 class="h3 no-enter redPoint">
                                <span>
                                    {{key == "youJi" ? "有机认证" : ""}}
                                    {{key == "ouMeng" ? "欧盟认证" : ""}}
                                    {{key == "wuGongHai" ? "无公害认证" : ""}}
                                    {{key == "lvSe" ? "绿色认证" : ""}}
                                </span>
                            </h3>
                            <!--<p class="p">等待文字等待文字等待文字等待文字等待文字等待文字等待文字等待文字等待文字等待文字</p>-->
                            <aside v-for="item in goods.identificationMap[key]" class="">
                                <img :src="item + ossUrl('webp_480')">
                            </aside>
                        </li>
                    </ul>
                </div>
            </section>
        </transition>       <!--产品保障 @touchmove.prevent-->
        <transition name="slideTop">
            <section class="sToTop-box" v-show="couponShow">
                <div class="sToTop-box-close" @click="slideHide"></div>
                <div class="sToTop-box-title border-bottom-1px">优惠券</div>
                <div class="sToTop-box-list padding-empty" @scroll.stop>
                    <coupon :coupon="coupon" :goodsId="goodsId" @refresh="refreshCouponList"></coupon>
                </div>
            </section>
        </transition>       <!--优惠券  @touchmove.prevent-->
    </div>
    <div class="container_mid is-iphone10" v-else>
        <div class="_empty border-bottom-1px">
            <aside class="empty_icon" @click="ccc"></aside>
            <p class="empty_text">啊哦，产品已失效</p>
        </div>
        <recommend-goods type="detail" :speciesId="goods.speciesId"></recommend-goods>
    </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'

    import recommendGoods from "@/components/common/recommendGoods.vue"
    import sku from "@/pages/index/goodsDetail/sku.vue"
    import coupon from "@/pages/index/goodsDetail/getCoupon.vue"
    import downLoad from "@/components/common/downLoad.vue"

    import share from '../../../modules/_share/share'
    import ua from '../../../modules/_ua/browserUa'

    var timer = null;
    var yushouTimer = null;
    var browser = ua();


    export default {
        data(){
            return {
                isShare:this.$route.query.isShare,  //分享环境打开页面 yes
                swiperOption: {     //swiper的配置参数
//                    autoplay: 3500,
                    notNextTick:true,
                    setWrapperSize :true,
                    pagination: {
                        el: '.swiper-pagination',
                        type:"bullets",
                        modifierClass : 'goodsdetails-pagination-'
//                        bulletActiveClass: 'my-aaaaa-active',
                    },
                    mousewheelControl : true,
                    observeParents:true,
                },

                goodsId:this.$route.query.goodsId,
                goods:{
                    goodsStatus:3,//商品状态 0：待提审，1：待审核，2：待上架，3：已上架，4：已下架，5：已售罄，6：删除，7：下架待提审
                    goodsType:1,//发布商品类型1.助理人，2:自营困户,3:集采,4:善企
                    skuList:[[]],
                    goodsMainMedia:{},
                    areaMap:{1:{},2:{},3:{}},
                    goodsDesc:"[]",
                    identificationMap:{},
                    goodsMediaList:[]
                },

                skuList:[],             //指向goods的skuList(和接口返回的一样)(需要验证库存)
                wishListSkuList:[],     //点击心愿单的skuList(手动添加了库存的，防止没有库存)
//                whichSkuList:'skuList', //给sku组件哪个skuList

                skuId:"",                      //已经选择完成  立即帮扶   sku id
                skuDefault:true,               //用户是否已经选择一次sku （是否是默认的sku）
                skuInfo:{                      //集采不应该出现积分商品？？？
                    wholesaleList:[
                        {
                            price:"0",
                            skuWholesaleId:"",
                            startCount:1
                        }
                    ],
                    isWholesale:0
                },

                wishSkuId:"",                  //已经选择完成  加入心愿单 sku id
                wishSkuDefault:true,            //用户是否已经选择一次sku （是否是默认的sku）心愿单
                wishSkuIdInfo:{

                },
                   //选择的sku对应的信息

                type:"buy",        //加入心愿单还是立即购买 wishList or buy
                onlyChoose:false,   //是否是点击规格出现的sku选择

                headerNavOpacity:0,     //header中间导航的透明度初始为0
                headerBtnOpacity:1,     //header两侧按钮的透明度初始为1
                linearGradient:0.3,     //header渐变色初始值为0.3
                headerB:false,          //header黑按钮模式（一级导航）
                navFixed:false,         //nav悬浮（二级导航）
                HeaderBtnActive:0,      //0 商品， 1 详情 ， 2 推荐
                NavBtnActive:0,         //0 图文详情 ，1 帮扶小贴士
                navAbsolute:false,      //滑动到nav尾部

                title:"商品详情",

                shadowShow:false,        //蒙版层显示
                skuShow:false,          //sku是否显示
                explainShow:false,      //配送说明
                ensureShow:false,       //产品保障
                couponShow:false,       //优惠券弹窗

                amount:1,               //选择数量

                headerImgArr:[],        //评价头像数组
                nl:0,
                storeInfo:{             //店铺信息
//                    storeInfo:{}
                    ownerName:"",
                    entName:"",
                    storeName:"",
                    province:"",
                    county:""
                },
                freightInfo:{
                    supportCity:[],
                    unSupportCity:[],
                    transFeeInfo:{}
                },          //运费信息
                coupon:{
                    canGetList:[],
                    haveGetList:[]
                },          //优惠券信息

                wholesale:false,            //是否处于批发状态
                wholesaleInfo:{},           //当前批发状态的对象
                score:-1,                   //用户当前积分 -1代表还没请求接口
                goodsCartStatus:0,          //购物车状态 0是已查看1是未查看

                evaluationInfo:{
                    goodsRecommendEval:[]
                },       //推荐评价列表
                evalueTotalCount:0,         //评价总数
                appInfo:false,              //环境信息  appInfo.platform
                ready:true  //可以点击下单接口
            }
        },
        watch:{
            skuId(newV,oldV){
                this.goods.skuList.forEach((cur)=>{
                    if(cur.skuId == newV ){
                        this.skuInfo = cur;
                        console.log("sku变了");
                    }
                })
                this.amount = 1;
                if( !this.skuDefault && this.skuId != "error") this.getFreightInfo();  //重新请求运费信息
            },
            wishSkuId(newV,oldV){
//                console.log('wishSkuId',this.wishSkuId)
                this.goods.skuList.forEach((cur)=>{
                    if(cur.skuId == newV ){
                        this.wishSkuIdInfo = cur;
                        console.log("wishSkuId变了");
                    }
                })
            },
//            wishSkuId:"",                  //已经选择完成  加入心愿单 sku id
//            wishSkuIdInfo
            goods:{
                handler(n){
                    console.warn("请勿试图改变goods对象!!!")
//                    console.log(n)
                },
                deep:true
            },
            amount(newV,oldV){
                this.amountMapped();
            }
        },
        beforeCreate(){
//          this.loadState({time:'beforeCreate'})
        },
        created(){
//            this.loadState({time:'created'})
            this.getGoodsDetailData();  //商品详情相关接口
//            window.localStorage.removeItem('wishList');
          window.localStorage.setItem('wishList', '');
//            this.shareSecond();
        },
        mounted(){
//            this.loadState({time:'页面初次挂载'})
            this.syJsbGetAppInfo(this.getAppInfocallBack);  //得到appInfo
            this.$header.show = false;
            if (this.isShare != 'yes') {
                window.addEventListener("scroll", (e) =>{
                    let scrollTop       = this.scrollTop();
                    let headerHeight    = document.querySelector('#__header').offsetHeight;//偏移量 ———— 一个header的高度
//                console.log(scrollTop)
                    //header的滚动监听
                    let headerDoorsill  = document.querySelector('#swiper').offsetHeight - headerHeight;
                    //header动态变化所根据的阈值（轮播图减掉header本身的高度：像素）
                    if (scrollTop < headerDoorsill) {     //顶部导航状态的监听
                        var nPersent        = Math.abs(headerDoorsill - scrollTop)/headerDoorsill;//随着下滑不断减小 1 => 0 => 1 => 更大
                        //此阈值计算出来的百分比（小数）
                        var nPersentX       = nPersent < 1 ? nPersent : 1 ;
                        //加个判断，不能大于1
                        var halfNPersent    = Math.abs(headerDoorsill/2 - scrollTop)/(headerDoorsill/2);//减小速度是上一个百分比的2倍
                        //半阈值百分比（小数）
                        var halfNPersentX   = halfNPersent < 1 ? halfNPersent : 1;
                        //加个判断，不能大于1
                        this.headerNavOpacity = 1 - nPersentX;
                        this.headerBtnOpacity = halfNPersentX;
                        if (scrollTop < headerDoorsill/2) {
                            this.headerB = false;
                            this.linearGradient = halfNPersentX*0.3
                        }else{
                            this.linearGradient = 0;
                            this.headerB = true;
                        }
                    }else{
                        this.linearGradient = 0;
                        this.headerB = true;
                        this.headerNavOpacity = 1;
                        this.headerBtnOpacity = 1;
                    }
                    //header的滚动监听end

                    //二级导航监听(nav是二级导航，一级的叫header)
                    let navBoxDom       = document.querySelector("#navigationBox");
                    let navBoxDomTop    = this.getTargetToDocTop(navBoxDom);
                    let navBoxHeigth    = navBoxDom.offsetHeight;
                    let navHeight       = document.querySelector("#navigation").offsetHeight;

                    if(scrollTop + headerHeight  > navBoxDomTop && scrollTop + headerHeight < navBoxDomTop + navBoxHeigth){
                        this.navFixed = true;
                        if (scrollTop + headerHeight > navBoxDomTop + navBoxHeigth - navHeight ) {
//                        document.querySelector("#n").style.top = navBoxHeigth - navHeight + "px";
                            document.querySelector("#n").setAttribute('style', 'top:' + (navBoxHeigth - navHeight) + 'px' );
                            this.navAbsolute = true;
                        }else{
                            this.navAbsolute = false;
//                        document.querySelector("#n").style = "";
                            document.querySelector("#n").setAttribute('style', "");
                        }
                    }else{
                        this.navFixed = false;
                    }
                    //二级导航监听end

                    //五个按钮的监听（三个一级的，两个二级）
                    //一级的
                    var goods           = document.querySelector("#goods");
                    var detail          = document.querySelector("#navigationBox");
                    var recommendDom    = document.querySelector("#recommend");
                    let aFLevelNav = [
                        {
                            toDocTop:this.getTargetToDocTop(goods),
                            boxHeight:goods.offsetHeight,
                            type:"HeaderBtnActive", //与判断active的字段名称相同
                            index:0
                        },
                        {
                            toDocTop:this.getTargetToDocTop(detail),
                            boxHeight:detail.offsetHeight,
                            type:"HeaderBtnActive",
                            index:1
                        },
                        {
                            toDocTop:this.getTargetToDocTop(recommendDom),
                            boxHeight:recommendDom.offsetHeight,
                            type:"HeaderBtnActive",
                            index:2
                        }
                    ]
                    for(var i = 0; i < aFLevelNav.length; i++){
                        if (scrollTop + headerHeight > aFLevelNav[i].toDocTop && scrollTop + headerHeight < aFLevelNav[i].toDocTop + aFLevelNav[i].boxHeight) {
                            this[aFLevelNav[i]['type']] = aFLevelNav[i].index;
//                        console.log('first',i)
                        }
                    }
                    //一级的end
                    //二级的
                    var goodsDetail = document.querySelector("#goodsDetail");
                    var prompt      = document.querySelector("#prompt");
//                var navHeight         = document.querySelector("#navigation").offsetHeight; 上面声明了，在此作为提示
                    let aSLevelNav = [
                        {
                            toDocTop:this.getTargetToDocTop(goodsDetail),
                            boxHeight:goodsDetail.offsetHeight,
                            type:"NavBtnActive",    //与判断active的字段名称相同
                            index:0
                        },
                        {
                            toDocTop:this.getTargetToDocTop(prompt),
                            boxHeight:prompt.offsetHeight,
                            type:"NavBtnActive",
                            index:1
                        }
                    ]
                    for(var i = 0; i < aSLevelNav.length; i++){
                        if (scrollTop + headerHeight + navHeight > aSLevelNav[i].toDocTop && scrollTop + headerHeight + navHeight < aSLevelNav[i].toDocTop + aSLevelNav[i].boxHeight) {
                            this[aSLevelNav[i]['type']] = aSLevelNav[i].index;
//                        console.log('second',this.nl++,i)
                        }
                    }
                    //二级的end

                    //五个按钮的监听（三个一级的，两个二级）end
                })
            }
        },
        methods:{
            baozhangShow(){         //唤起保障弹窗
                this.slideShow('ensureShow');
            },
            peisongShow(){          //唤起配送弹窗
                if (this.bLimitBuy) {
                    this.slideShow('explainShow');
                }
            },
            slideCouponShow(){      //唤起优惠券弹窗
                this.slideShow('couponShow');
            },
            goCounty(){                     //去县域详情
                if (this.goods.isPoorCounty) {
                    this.appOpen('unionDetail',{areaId:this.poorId});
                }
            },
            callPhone(){
                this.jsCallPhone(this.storeInfo.servicePhone);
            },
            getAppInfocallBack(res){
//                console.log(res);
                this.appInfo = res;
            },
            goPovertyCode(){//前往wishList页面(随便请求个接口，并没有什么卵用，只为用户信息过期时跳转403)
                var url = '/user-center/points/userDetail';
                this.getWithToken(url,{}).then(res=>{
                    if ( res && res.code == 200 ) {
                        this.appOpen('povertyCode')
                    }
                })
            },
            amountMapped(){         //数量改变映射  //goodsType == 3(集采)显示批发价;skuList - isWholesale为1表示可以批发
                if (this.skuInfo.isWholesale == 1) {
                    this.wholesale = false;
                    var count = 10000; //上一波符合批发规格的差值
                    var info = {};
                    this.skuInfo.wholesaleList.forEach((cur,index)=>{
                        var n = this.amount - cur.startCount;//新的差值
                        if (n >= 0) {
                            this.wholesale = true;
                            if(n < count){
                                count = n;
                                info = cur;
                            }
                        }else{ //小于0显示接下来要达到的批发数据

                        }

                    })
                    this.wholesaleInfo = info;
                }else{
                    console.log("当前不是批发商品")
                }
            },
            getSkuId(id,type){   //从sku组件获取skuId wishSkuId
                if(id != 'error'){
                    if (type == 'buy') {
                        this.skuId = id;
                        this.skuDefault = false;
                    }else{
                        this.wishSkuId = id;
                        this.wishSkuDefault = false;
//                        console.log("dasasdgkasdfnsdfas")
                    }
                }else{
                    if (type == 'buy'){
                        this.goods.skuList.forEach((cur)=>{ //isDefault=1的为默认展示数据
                            if(cur.isDefault == 1){
                                this.skuId = cur.skuId;
                            }
                        })
                        this.skuDefault = true;
                    }else{
                        this.goods.skuList.forEach((cur)=>{ //isDefault=1的为默认展示数据
                            if(cur.isDefault == 1){
                                this.wishSkuId = cur.skuId;
                            }
                        })
                        this.wishSkuDefault = true;
                    }
                }
            },
            ccc(){                  //测试用
//                this.goods.goodsStatus = 5
//                console.log(++this.score);
                console.log(this.isShare)
            },
            appGoWishList(){  //前往wishList页面（随便请求个接口，并没有什么卵用，只为用户信息过期时跳转403）
                var url = '/user-center/points/userDetail';
                this.getWithToken(url,{}).then(res=>{
                    if ( res && res.code == 200 ) {
                        this.goodsCartStatus = 0;
                        this.appOpen('wishList');
                    }
                })
            },
            bangfu(){
                if(!this.bangfuBtnDisabled){
                    if(this.score == -1){
                        this.getScore();    //没有token的话会自动跳转登录
                    }else{
                        this.skuShow = true;
                        this.shadowShow = true;
                        this.type = 'buy';
                        this.onlyChoose = false;
                    }
                }

            },
            joinWishList(){
                this.skuShow = true;
                this.shadowShow = true;
                this.type = 'wishList';
                this.onlyChoose = false;
            },
            initWishListSkuList(arr){   //整合并使sku数量增加1
                arr = JSON.parse(JSON.stringify(arr));
//                var resArr = [];
                for(var i = 0; i < arr.length; i++){
                    if (arr[i].skuStatus == 1) {    //=1启用
                        arr[i].stocks++;
                    }
//                    resArr.push(arr[i]);
                }
                return arr;
//                this.wishListSkuList = resArr;
//                console.log("resArr",resArr);
            },
            getGoodsDetailData(){
                var url = "/ebgoods/goods/" + this.goodsId;
                this.getWithToken(url,{}).then(res =>{
                  this.$loading.show=false;
                    if(res && res.code == 200){
                        this.goods = res.data.goods;
                        this.skuList = res.data.goods.skuList;
                        this.wishListSkuList = this.initWishListSkuList(res.data.goods.skuList);
                        window.document.title = res.data.goods.goodsName;
                        this.goods.skuList.forEach((cur)=>{ //页面初始化，isDefault=1的为默认展示数据
                            if(cur.isDefault == 1 ){
                                this.skuId = cur.skuId;
                                this.wishSkuIdInfo = cur;
                            }
                        })

                        if (this.goods.goodsStatus == 3 || this.goods.goodsStatus == 5) {
                            this.getStoreInfo();
                            this.getCoupon();
                            this.getFreightInfo();
//                            this.getScore();  //点击 立即帮扶的时候跳转
                            this.getWishListStatus();
                            this.getEvaluation();
                            this.yushouCountDown();

                            this.getEvalueHeaderImg();
                            this.getEvalueTotalCount();
                        }else{
                            if (this.isShare != 'yes') {
                                this.$header.show = true;
                                this.$header.setTitle('产品已失效');
                            }
                        }
                        this.shareSecond();//二次分享注册
                    }else{
                        this.$toast(res.message);
                        this.goods.goodsStatus = 8;
                        if (this.isShare != 'yes') {
                            this.$header.show = true;
                            this.$header.setTitle('产品已失效');
                        }
                    }
                },err=>{
                    this.$loading.show=false;
                    this.goods.goodsStatus = 8;
                    if (this.isShare != 'yes') {
                        this.$header.show = true;
                        this.$header.setTitle('产品已失效');
                    }
                })
            },
            getEvaluation(){            //获取推荐评价
                var url = "/order-center/evaluate/goodsRecommendEval";
                this.get(url,{goodsId:this.goodsId}).then(res=>{
                    if (res && res.code == 200) {
//                        console.log(res)
                        this.evaluationInfo = res.data;
                    }else{
                        this.$toast(res.message)
                    }
                })
            },
            getWishListStatus(){           //获取购物车状态 0是已查看1是未查看
                var url = "/ebgoods/cart/status";
                this.getWithToken(url,{}).then(res=>{
                    if (res && res.code == 200) {
                        this.goodsCartStatus = res.data.goodsCartStatus;
                    }
                })
            },
            getScore(){//获取个人积分
                var url = '/user-center/points/userDetail';
                this.getWithToken(url,{}).then(res=>{
                    if ( res && res.code == 200 ) {
                        this.score = res.content.remainedPoints || 0;
                        this.bangfu();      //调起sku弹窗
                    }
//                    console.log(res.content.remainedPoints);
                })
            },
            getStoreInfo(){                //获取店铺信息
                var url = "/store-center/storeOpen/storeInfo";
                this.post(url,{storeId:this.goods.storeId}).then(res=>{
                    if(res && res.code == 200){
                        this.storeInfo = res.content.storeInfo;
                    }
                },err=>{

                })
            },
            getCoupon(){                   //获取优惠券信息
                var url = "/coupon-center/couponApp/goodsCouponList";
                this.getWithToken(url,{goodsId:this.goodsId}).then(res=>{
                    if(res && res.code == 200){
                        this.coupon = res.data;
                    }
                },err=>{

                })
            },
            refreshCouponList(){
//                console.log("刷新优惠券列表");
                this.getCoupon();
            },
            getFreightInfo(){               //获取运费信息
                if (this.skuId) {
                    var url = "/ebgoods/cart/info/" + this.skuId;
                    this.get(url,{}).then(res =>{
                        if(res && res.code == 200){
                            this.freightInfo = res.data;
                        }
                    },err=>{

                    })
                }
            },
            changeNum(operator){    //改变数量
                if ( !this.skuDefault && this.skuId != 'error') {
                    if(operator == "+"){
                        if (this.score < (this.skuInfo.points*this.amount) && this.skuInfo.points != 0) {   //验证积分，下面还有一处
                            this.$toast("积分不足,无法增加");
//                            console.log(this.score,this.skuInfo.points*this.amount);
                            return;
                        }else{
//                            if (this.goods.buyLimitCount) {    //如果限购
//                                var maxNum = this.goods.buyLimitCount > this.skuInfo.stocks ? this.skuInfo.stocks : this.goods.buyLimitCount;
//                                if (maxNum == this.goods.buyLimitCount ) {
//                                    this.amount < this.goods.buyLimitCount ? ++this.amount : this.$toast("已超过最大限购数量");
//                                }else{
//                                    this.amount < this.skuInfo.stocks ? ++this.amount : this.$toast("已超过最大库存数量");
//                                }
//                            }else{
//                                this.amount < this.skuInfo.stocks ? ++this.amount : this.$toast("已超过最大库存数量");
//                            }
                            this.validateRule() ? ++this.amount : "";
                        }
                    }else if(operator == "-"){
                        this.amount > 1 ? --this.amount : "";
                    }else{
                        console.log('传的啥玩意');
                    }
                }else{
                    this.$toast("请先选择规格");
                }
            },
            validateRule(callBack){     //验证商品可以下单的规则（记得同时更改下面验证库存方法）
                var result = false;
                if (this.goods.buyLimitCount) {    //如果限购
                    var maxNum = this.goods.buyLimitCount > this.skuInfo.stocks ? this.skuInfo.stocks : this.goods.buyLimitCount;
                    if (maxNum == this.goods.buyLimitCount ) {
                        this.amount < this.goods.buyLimitCount ? result = true : this.$toast("爱心产品每个ID限购" + this.goods.buyLimitCount +  "件");
                    }else{
                        this.amount < this.skuInfo.stocks ? result = true : this.$toast("已超过最大库存数量");
                    }
                }else{
                    this.amount < this.skuInfo.stocks ? result = true : this.$toast("已超过最大库存数量");
                }
                return result;
            },
            confirm(){
              if(this.skuId == 'error'){
                this.$toast('请选择商品规格')
                return;
              }
                if (this.type == "buy") {
                    if (this.onlyChoose) {  //以点击规格出现的sku选择
                        this.slideHide();
                    }else{
                        this.goOrder();
                    }
                }else if (this.type == "wishList") {
                    this.putInWishList();
                }else{
                    this.slideHide();
                }
            },          //弹窗确认
            goOrder(){         //跳转下单
                window.localStorage.setItem('wishList', '');
                if (this.skuDefault || this.skuId == "error" || this.skuId == "") {
                    this.$toast("请选择规格");
                }else{
//                    if(this.goods.goodsType == 4){  //验证积分够不够
                        if (this.score < (this.skuInfo.points*this.amount) && this.skuInfo.points != 0) {
                            this.$toast("积分不足,无法购买");
                            console.log("score本地验证",this.score,this.skuInfo.points*this.amount);
                            return;
                        }
//                    }
                    var skuId = this.skuId;
                    var obj = {};
                    obj[skuId] = this.amount;

                    var that = this
                    this.setAppData({ 'h5Key': 'wishList' , 'h5Value' :JSON.stringify(obj)})
                    this.getAppData('wishList',function (res) {
                        console.log("wishList")
//                        that.appOpen("orderConfirm");
                    })
                    this.checkServerDate(true,true,true,this.getUserAddressList);
                }
            },
            checkServerDate(bStatus,bStock,bLimitBuy,callBack){        //请求接口校验 商品状态 库存 限购
                if (this.ready) {
                    this.ready = false;
                    var url = "/ebgoods/goods/" + this.goodsId;
                    this.get(url,{}).then(res=>{
                        this.ready = true;
                        if (res && res.code == 200) {
                            var data = res.data;
                            var skuInfo = null; //服务器返回的当前sku的信息
                            data.goods.skuList.forEach((cur)=>{
                                if( cur.skuId == this.skuId ){
                                    skuInfo = cur;
                                }
                            })
//                            console.log('验证服务器sku',skuInfo);
                            if (skuInfo == null) {
                                this.$toast("商品规格已经改变，请重新选择");
//                            this.getGoodsDetailData();    //无法刷新已选sku
                                window.location.reload();
                            }

                            if (bStatus) {
                                console.log('验证商品状态');
                                if (data.goods.goodsStatus != 3 && data.goods.goodsStatus != 5) {
                                    this.goods.goodsStatus = data.goods.goodsStatus;
                                    if (this.isShare != 'yes') {
                                        this.$header.show = true;
                                        this.$header.setTitle('产品已失效');
                                    }
                                    this.$toast("爱心产品已失效");
                                    return;
                                }
//                                else if(data.goods.goodsStatus == 5){
//                                    this.goods.goodsStatus = data.goods.goodsStatus;
//                                    this.$toast("爱心产品已售罄");
//                                    return;
//                                }
                            }
                            if (bStock) {
                                console.log('验证库存状态');
                                if ( this.amount > skuInfo.stocks ) {
                                    this.skuInfo = skuInfo;
                                    this.amount = skuInfo.stocks;
                                    this.$toast("爱心产品库存不足");
                                    return;
                                }
                            }
                            if (bLimitBuy) {
                                console.log('验证限购')
                                if (data.goods.buyLimitCount) {
                                    if (this.amount > data.goods.buyLimitCount) {
                                        this.$toast("爱心产品每个ID限购" + data.goods.buyLimitCount +  "件");
                                        this.goods.buyLimitCount = data.goods.buyLimitCount;
                                        this.amount = data.goods.buyLimitCount;
                                        return;
                                    }
                                }
                            }
                            //加了一步验证积分（eg:商品积分价格实时获得，个人剩余积分没有实时获得）
//                        skuInfo.points = 100
                            if (this.score < (skuInfo.points*this.amount) && skuInfo.points != 0) {
                                this.$toast("积分不足,无法购买");
                                this.skuInfo = skuInfo;
                                console.log("score服务器",this.score,skuInfo.points*this.amount);
                                return;
                            }
                            callBack();
                        }else{
                            this.$toast(res.message)
                        }
                    })
                }else{
                    console.log("并未返回数据，点击无效")
                }

            },
            getUserAddressList(){
                var url = "/user-center/receiveAddr/userList";
                this.getWithToken(url,{}).then(res=>{
                    if (res && res.code == 200) {
                        //没有地址，跳转新增地址
                        res.content.length == 0 ? this.appOpen('ed',{from:'goodsDetail'}) : this.appOpen("orderConfirm");
                    }else{
                        this.$toast(res.message)
                    }
                })
            },
            putInWishList(){          //加入购物车
                var url = "/ebgoods/cart";
                var obj = [
                    {
                        "storeId": this.goods.storeId,
                        "goodsId": this.goodsId,
                        "skuId": this.wishSkuId,
                    }
                ]
                if (this.wishSkuDefault || this.wishSkuId == "" || this.wishSkuId == "error") {
                    this.$toast("请选择规格");
                }else{
                    this.checkServerDate(true,false,false,()=>{
                        this.postWithToken(url,{goodsCartInfo:JSON.stringify(obj)}).then(res =>{
                            if(res.code == 200){
                                this.$toast(res.message);
                                this.slideHide();
                                this.goodsCartStatus = 1;
                            }
                        })
                    });
                }
            },
            slideShow(type){
                this.shadowShow = true;
                this[type]      = true;
            },
            slideHide(){
                this.shadowShow = false;
                this.skuShow    = false;
                this.explainShow= false;
                this.ensureShow = false;
                this.couponShow = false;
                //...
            },
            getEvalueHeaderImg(){   //获得评价人的头像
                var url = "/order-center/evaluate/goodsEvalList?goodsId=" + this.goodsId + "&queryType=best&curPage=1";
                this.get(url,{}).then(res=>{
                    if (res && res.code == 200) {
//                        console.log(res);
                        var maxL = res.data.evaluationList.length > 4 ? 4 : res.data.evaluationList.length;
                        for(var i = 0; i < maxL; i++){
                            this.headerImgArr.push(res.data.evaluationList[i].mHeadImg);
                        }
                    }else{
//                        this.$toast(res.message)
                    }
                })
            },
            getEvalueTotalCount(){   //获得评价数总量
                var url = "/order-center/evaluate/goodsEvalList?goodsId=" + this.goodsId + "&queryType=all&curPage=1";
                this.get(url,{}).then(res=>{
                    if (res && res.code == 200) {
                        this.evalueTotalCount = res.data.totalNum;
                    }
                })
            },
            changeHeaderActive(n){
                this.HeaderBtnActive = n;
                let dom = n == 0 ? "#goods" :
                        n == 1 ? "#navigationBox" : "#recommend";
                let domScrollTop = this.getTargetToDocTop(document.querySelector(dom));
                let headerHeight = document.querySelector("#__header").offsetHeight;
                this.scrollTop(domScrollTop - headerHeight + 1); //触发滚动
            },
            changeNavActive(n){
                this.NavBtnActive = n;
                let dom = n == 0 ? "#goodsDetail" : "#prompt";
                let domScrollTop = this.getTargetToDocTop(document.querySelector(dom));
                let downloadH = document.querySelector("#download").offsetHeight;
                let headerHeight = this.isShare == 'yes' ? downloadH/2 : document.querySelector("#__header").offsetHeight;
                let navHeight    = this.isShare == 'yes' ? downloadH/2 : document.querySelector("#navigation").offsetHeight;
                this.scrollTop(domScrollTop - navHeight - headerHeight + 1); //触发滚动
            },
            scrollTop(n) {    //获取滚动条距顶部距离(不填参数)，填参数为滚动到某个位置
                if (n || n == 0) {
//                    this.startMove(n);
                    window.scrollTo(0,n)
                    return;
                }else{
                    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                }
            },
//            startMove(n,fn) {
//                var all = true; //假设所有运动到达目标值
//                clearInterval(timer);
//                timer = setInterval(()=>{
//                    var value = this.scrollTop();
//                    //计算速度
//                    var speed = (n - value) / 8;
//                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//                    if (value !== n ) {
//                        all = false;
//                    }else{
//                        all = true;
//                    }
//                    window.scrollTo(0,value + speed);
//                    if(all){
//                        clearInterval(timer);
//                        if(fn){
//                            fn()
//                        }
//                    }
//                    console.log(value)
//                    console.log(all)
//
//                }, 20)
//            },
            getTargetToDocTop(node){     //获取元素距离文档顶部的距离
                var top = node.offsetTop;
                var parent = node.offsetParent;
                while(parent != null) {
                    top += parent.offsetTop;
                    parent = parent.offsetParent;
                }
                return top;
            },
            goStore(type){
              if(type == 1){
                // 跳转助理人
                this.appOpen('assistant',{storeId:this.storeInfo.storeId})
              }else if(type == 2){
                // 跳转贫困户
                this.appOpen('poverty',{storeId:this.storeInfo.storeId,poorId:this.storeInfo.poorId})
              }else if(type == 4){
                // 跳转善企
                this.appOpen('company',{storeId:this.storeInfo.storeId})
              }
            },
            yushouCountDown(){  //预售倒计时
                if (this.goods.mode == 1) {     //写法有点麻烦，待优化
                    this.goods.presellRemainAt -= 1000;
                    if (this.goods.presellRemainAt<0) {
//                        clearInterval(yushouTimer);
                        this.goods.mode = 0;
                    }
                    var nowTime = Date.now()/1000;
                    var presellAt = this.goods.presellAt;               //预售时间
                    var promiseDeliveryAt = this.goods.promiseDeliveryAt;       //预售承诺发货时间
                    if (nowTime < presellAt || nowTime > promiseDeliveryAt) {
//                        clearInterval(yushouTimer);
                        this.goods.mode = 0;
                    }
                    yushouTimer = setInterval(()=>{
//                        console.log(this.goods.presellRemainAt);//这个给的是毫秒
                        this.goods.presellRemainAt -= 1000;
                        if (this.goods.presellRemainAt<0) {
                            clearInterval(yushouTimer);
                            this.goods.mode = 0;
                        }
                        var nowTime = Date.now()/1000;
                        var presellAt = this.goods.presellAt;               //预售时间
                        var promiseDeliveryAt = this.goods.promiseDeliveryAt;       //预售承诺发货时间
                        if (nowTime < presellAt || nowTime > promiseDeliveryAt) {
                            clearInterval(yushouTimer);
                            this.goods.mode = 0;
                        }
                    },1000);
                }
            },
            share(){
                this.syJsbShare({
                    title:'[爱・源于善] 推荐一款爱心产品，下单就能做公益',
                    text:this.goods.goodsName,
                    url :window.location.origin + '/goodsDetail?goodsId=' + this.goodsId + "&isShare=yes",
                    logo:this.goods.goodsMainMedia.imgUrl || (this.imgUrl + '/common/whitebg.jpg'),
                    sms:"[签名]爱・源于善，您的好友向您推荐一款爱心产品，点击查看：" + window.location.origin + '/goodsDetail?goodsId=' + this.goodsId //短信相关
                })
            },
            shareSecond(){
                var msg = {
                    title:'[爱・源于善] 推荐一款爱心产品，下单就能做公益',
                    text:this.goods.goodsName,
                    url :window.location.origin + '/goodsDetail?goodsId=' + this.goodsId + "&isShare=yes",
                    logo:this.goods.goodsMainMedia.imgUrl || (this.imgUrl + '/common/whitebg.jpg'),
                }
//                console.log("已经注册了微信的二次分享",msg)
                share(msg)
            }
        },

        components:{
            recommendGoods,
            sku,
            coupon,
            downLoad
        },
        filters:{
            float2(val){
                return Number(val).toFixed(2);
            },
            onlyKeepInt(val){
                return isNaN(parseInt(val)) ? "" : parseInt(val);
            },
            onlyKeepFloat(val){
//                var n = parseFloat(val).toString().split(".")[1];
//                return ( n ? "." + n : "");
                var n = '.' + parseFloat(val).toFixed(2).toString().split(".")[1];
                return n == '.undefined' ? "" : n;

            }
        },
        computed:{
            goodsMediaListSort(){
                var compare = function (prop) {
                    return function (obj1, obj2) {
                        var val1 = parseInt(obj1[prop]);
                        var val2 = parseInt(obj2[prop]);
                        if (val1 < val2) {
                            return -1;
                        } else if (val1 > val2) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
                //非空判断
                if (this.goods.goodsMediaList) {
                    return this.goods.goodsMediaList.sort(compare("idx"));
                }else{
                    return this.goods.goodsMediaList;
                }
            },
            couponShowList(){   //条状区域展示的优惠券
                var ar = this.coupon.canGetList.concat(this.coupon.haveGetList);    //整合数组
                var arr = ar.sort(compare('reducePrice'));                          //按满减金额排序
                return uniqeByKeys(arr,['tId']);
            },
            bLimitBuy(){
                var b = (this.freightInfo.supportCity.length && this.freightInfo.unSupportCity.length)  ||
                        (this.freightInfo.unSupportCity.length && this.freightInfo.supportCity.length);
                return b;
            },
            poorId(){
                var a = Object.keys(this.goods.areaMap).length;
//                console.log(a);
                return this.goods.areaMap[a-1].areaId;
            },
            goodsDesc(){
                return JSON.parse(this.goods.goodsDesc);
            },
            couponShowNum(){    //计算一下优惠券应该显示几个 （最大20个数字字符）
                var num = 0;
                var maxNum = this.couponShowList.length >= 2 ? 2 : this.couponShowList.length;
//                console.log(maxNum)
                if (maxNum == 2) {
                    for(var i = 0; i < maxNum; i++){
                        num += String(this.couponShowList[i].reducePrice).length*2;
                        num += String(this.couponShowList[i].toPrice).length;
                    }
                    if (num>=20) {
                        return 1;
                    }else{
                        return 2;
                    }
                }else{
                    return maxNum;
                }
            },
            bangfuBtnDisabled(){    //立即帮扶置灰
                if (this.goods.goodsStatus == 5) {  //售罄
                    return true;
                }else{
                    return false;
                }
            },


        }
    }

    //将对象元素转换成字符串以作比较
    function obj2key(obj, keys){
        var n = keys.length,
                key = [];
        while(n--){
            key.push(obj[keys[n]]);
        }
        return key.join('|');
    }
    //去重操作
    function uniqeByKeys(array,keys){
        var arr = [];
        var hash = {};
        for (var i = 0, j = array.length; i < j; i++) {
            var k = obj2key(array[i], keys);
            if (!(k in hash)) {
                hash[k] = true;
                arr .push(array[i]);
            }
        }
        return arr ;
    }
    //结合arr.sort 根据属性排序对象
    function compare(prop) {
        return function (obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return 1;
            } else if (val1 > val2) {
                return -1;
            } else {
                return 0;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../static/css/g-global.scss";
    @import "goodsDetail.scss";
</style>

<!--商品详情  立即帮扶验证库存及 商品状态-->


<!--1、sku选择数量要根据库存变化 yes-->
<!--2、sku选择数量要显示批发价 yes-->
<!--3、滚动监听的兼容问题 yes-->

<!--4、评价没写 yes-->
<!--5、分享跳转 yes-->
<!--6、加入集采 -->
<!--5、善源甄选专区推荐使用扶贫码 跳转 yes-->

<!--产品需求：-->
    <!--1、购物车激活sku选择时，不需要改变页面已经选择的状态 *****-->

