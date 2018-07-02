import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 首页
import index from '@/pages/index'
import index_v1 from '@/pages/index/index/index'
import hometownGoods from '@/pages/index/hometownGoods/index' //故乡特产首页
import scoreMall from '@/pages/index/hometownGoods/scoreMall' //积分商城首页

// 图片预览插件
const photoSwiper = r => require.ensure([], () => r(require('@/components/common/photoSwiper.vue')), 'photoSwiper');

// UIKit
const kit = r => require.ensure([], () => r(require('@/components/common/kit.vue')), 'test');
// 测试页面
const test = r => require.ensure([], () => r(require('@/components/common/test.vue')), 'test');
// const testPage = r => require.ensure([], () => r(require('@/components/common/test_page.vue')), 'test');

/* 登录部分 */
// 注册页面
const signin = r => require.ensure([], () => r(require('@/pages/login/signin.vue')), 'login');
// 注册下一步
const sign_next = r => require.ensure([], () => r(require('@/pages/login/sign_next.vue')), 'login');
// 去登录
const go_login = r => require.ensure([], () => r(require('@/pages/login/go_login.vue')), 'login');
// 密码登录
const password_login = r => require.ensure([], () => r(require('@/pages/login/password_login.vue')), 'login');
// 验证码登录
const code_login = r => require.ensure([], () => r(require('@/pages/login/code_login.vue')), 'login');
// 验证码登录下一步
const code_login_next = r => require.ensure([], () => r(require('@/pages/login/code_login_next.vue')), 'login');
// 微信登录
const wx_login = r => require.ensure([], () => r(require('@/pages/login/wx_login.vue')), 'login');
// 微信登录下一步
const wx_login_next = r => require.ensure([], () => r(require('@/pages/login/wx_login_next.vue')), 'login');
// 注册成功
const signin_success = r => require.ensure([], () => r(require('@/pages/login/signin_success.vue')), 'login');
// 阿里验证
const verify = r => require.ensure([], () => r(require('@/pages/login/appVerify.vue')), 'login');
// 原生调用纯验证
const onlyVerify = r => require.ensure([], () => r(require('@/pages/login/onlyVerify.vue')), 'login');

// index start(首页)

//搜索
const search = r => require.ensure([], () => r(require('@/pages/index/search/search.vue')), 'search')
const searchEmpty = r => require.ensure([], () => r(require('@/pages/index/search/searchEmpty.vue')), 'search')
const resultStore = r => require.ensure([], () => r(require('@/pages/index/search/result-store.vue')), 'search')
const resultArticle = r => require.ensure([], () => r(require('@/pages/index/search/result-article.vue')), 'search')
    //目录列表
const catalogLists = r => require.ensure([], () => r(require('@/pages/index/catalogLists/catalogLists.vue')), 'catalogLists')
    //运营活动商品列表
const actGoodsLists = r => require.ensure([], () => r(require('@/pages/index/actGoodsLists/actGoodsLists.vue')), 'actGoodsLists')

//商品详情
const goodsDetail = r => require.ensure([], () => r(require('@/pages/index/goodsDetail/goodsDetail.vue')), 'goodsDetail')
const sku = r => require.ensure([], () => r(require('@/pages/index/goodsDetail/sku.vue')), 'goodsDetail')

//评价相关 start
//评价列表
const evaluationList = r => require.ensure([], () => r(require('@/pages/order/evaluation/list.vue')), 'evaluation')
    //发表评价
const evaluationPublish = r => require.ensure([], () => r(require('@/pages/order/evaluation/publish.vue')), 'evaluation')
    //追加评价
const evaluationAppend = r => require.ensure([], () => r(require('@/pages/order/evaluation/append.vue')), 'evaluation')
    //评价结果
const evaluationResult = r => require.ensure([], () => r(require('@/pages/order/evaluation/result.vue')), 'evaluation')


//评价相关 end

// index end


// specialty start(故乡特产)

const goodsList = r => require.ensure([], () => r(require('@/pages/specialty/goodsList/specialGoods.vue')), 'goodsList')
    //目录
const goodsListC = r => require.ensure([], () => r(require('@/pages/specialty/goodsList/specialGoodsC.vue')), 'goodsList')

//积分商城
const integralGoods = r => require.ensure([], () => r(require('@/pages/specialty/goodsList/integralGoods.vue')), 'goodsList')

//积分商城目录
const integralGoodsC = r => require.ensure([], () => r(require('@/pages/specialty/goodsList/integralGoodsC.vue')), 'goodsList')


// specialty end


// pubwelfare start(扶贫公益)

// pubwelfare end

//退款
const applyRefund = r => require.ensure([], () => r(require('@/pages/order/applyRefund/index.vue')), 'applyRefund')
const applyRefundReason = r => require.ensure([], () => r(require('@/pages/order/applyRefund/reason.vue')), 'applyRefund')
const applyRefundDetails = r => require.ensure([], () => r(require('@/pages/order/applyRefund/details.vue')), 'applyRefund')
const applyRefundList = r => require.ensure([], () => r(require('@/pages/order/applyRefund/list.vue')), 'applyRefund')
    //退款 end

// volunteer start(扶贫志愿)

// volunteer end


// mine start(我的)

// import mine from '@/pages/mine/index'
const mine = r => require.ensure([], () => r(require('@/pages/mine/index.vue')), 'mine')
    //心愿单
const wishList = r => require.ensure([], () => r(require('@/pages/mine/wishList/wish_list.vue')), 'wishList')
    //账户设置
const userSetting = r => require.ensure([], () => r(require('@/pages/mine/userInfo/userSetting.vue')), 'userInfo')
    //修改姓名
const modifyName = r => require.ensure([], () => r(require('@/pages/mine/userInfo/modifyName.vue')), 'userInfo')
    //信息完善
const completeInfo = r => require.ensure([], () => r(require('@/pages/mine/userInfo/completeInfo.vue')), 'userInfo')
    //修改性别
const modifyGender = r => require.ensure([], () => r(require('@/pages/mine/userInfo/modifyGender.vue')), 'userInfo')
    //选择组织
const selectPolitics = r => require.ensure([], () => r(require('@/pages/mine/userInfo/selectPolitics.vue')), 'userInfo')
    //选择所属行业
const selectWork = r => require.ensure([], () => r(require('@/pages/mine/userInfo/selectWork.vue')), 'userInfo')
    //实名认证
const realName = r => require.ensure([], () => r(require('@/pages/mine/userInfo/realName.vue')), 'userInfo')
    //账户与安全
const accountSecurity = r => require.ensure([], () => r(require('@/pages/mine/userInfo/accountSecurity.vue')), 'userInfo')
    //修改手机号
const modifyPhone = r => require.ensure([], () => r(require('@/pages/mine/userInfo/modifyPhone.vue')), 'userInfo')
    //修改/绑定新手机号
const modifyPhone2 = r => require.ensure([], () => r(require('@/pages/mine/userInfo/modifyPhone2.vue')), 'userInfo')
    //设置登录密码
const setPassword = r => require.ensure([], () => r(require('@/pages/mine/userInfo/setPassword.vue')), 'userInfo')
    //设置登录密码2
const setPassword2 = r => require.ensure([], () => r(require('@/pages/mine/userInfo/setPassword2.vue')), 'userInfo')
    //支付管理
const iPayment = r => require.ensure([], () => r(require('@/pages/mine/userInfo/iPayment.vue')), 'userInfo')
    //设置支付密码
const setPayPassword = r => require.ensure([], () => r(require('@/pages/mine/userInfo/setPayPassword.vue')), 'userInfo')
    //修改密码
const modifyPassword = r => require.ensure([], () => r(require('@/pages/mine/userInfo/modifyPassword.vue')), 'userInfo')

//修改支付密码
const modifyPayPassword = r => require.ensure([], () => r(require('@/pages/mine/userInfo/modifyPayPassword.vue')), 'userInfo')
    //修改支付密码2
const modifyPayPassword2 = r => require.ensure([], () => r(require('@/pages/mine/userInfo/modifyPayPassword2.vue')), 'userInfo')
    //修改支付密码2
const forgetPayPassword = r => require.ensure([], () => r(require('@/pages/mine/userInfo/forgetPayPassword.vue')), 'userInfo')
    //关于
const about = r => require.ensure([], () => r(require('@/pages/mine/userInfo/about.vue')), 'userInfo')
    //意见反馈
const feedback = r => require.ensure([], () => r(require('@/pages/mine/userInfo/feedback.vue')), 'userInfo')
    //关于公益中国
const aboutApp = r => require.ensure([], () => r(require('@/pages/mine/userInfo/aboutApp.vue')), 'userInfo')
    //软件许可及服务协议
const serviceAgreement = r => require.ensure([], () => r(require('@/pages/mine/userInfo/serviceAgreement.vue')), 'userInfo')
    //消息列表
const messageList = r => require.ensure([], () => r(require('@/pages/mine/message/messageList.vue')), 'message')
    //消息详情
const messageDetails = r => require.ensure([], () => r(require('@/pages/mine/message/messageDetails.vue')), 'message')
    //我的益客圈
const myFriends = r => require.ensure([], () => r(require('@/pages/mine/invitation/myFriends.vue')), 'invitation')
    //邀请益客
const inviteFriend = r => require.ensure([], () => r(require('@/pages/mine/invitation/inviteFriend.vue')), 'invitation')
    //微信邀请益客（加入）
const weChartJoin = r => require.ensure([], () => r(require('@/pages/mine/invitation/weChartJoin.vue')), 'invitation')
    //微信邀请登录注册
const weChartLogin = r => require.ensure([], () => r(require('@/pages/mine/invitation/weChartLogin.vue')), 'invitation')
    //邀请有礼（下载）
const downLoad = r => require.ensure([], () => r(require('@/pages/mine/invitation/downLoad.vue')), 'invitation')


//公益平台客服（猜你想问）
const guessQuestion = r => require.ensure([], () => r(require('@/pages/mine/helpCenter/guessQuestion.vue')), 'helpCenter')
    //公益平台客服（猜你想问）
const questionList = r => require.ensure([], () => r(require('@/pages/mine/helpCenter/questionList.vue')), 'helpCenter')
    //公益平台客服（详情）
const questionDetail = r => require.ensure([], () => r(require('@/pages/mine/helpCenter/questionDetail.vue')), 'helpCenter')

// mine end

//address
const ed = r => require.ensure([], () => r(require('@/components/address/editAddress.vue')), 'address')
const cd = r => require.ensure([], () => r(require('@/components/address/chooseAddress.vue')), 'address')

//order 订单预提交
const orderConfirm = r => require.ensure([], () => r(require('@/pages/order/orderConfirm.vue')), 'order')
    //order 其他状态订单详情
const orderInfo = r => require.ensure([], () => r(require('@/pages/order/orderInfo.vue')), 'order')
    //order 待支付订单详情
const orderWaitInfo = r => require.ensure([], () => r(require('@/pages/order/orderWaitInfo.vue')), 'order')
    // 查看物流
const logistics = r => require.ensure([], () => r(require('@/pages/order/logistics/logistics.vue')), 'order')
const logisticsList = r => require.ensure([], () => r(require('@/pages/order/logistics/logisticsList.vue')), 'order')
    // 包裹列表收货
const receive = r => require.ensure([], () => r(require('@/pages/order/receive/receive.vue')), 'order')

//payment支付
const payment = r => require.ensure([], () => r(require('@/pages/payment/index.vue')), 'payment')
    //payment支付 成功
const success = r => require.ensure([], () => r(require('@/pages/payment/success.vue')), 'payment')
    //payment支付失败
const fail = r => require.ensure([], () => r(require('@/pages/payment/fail.vue')), 'payment')
const paymentWaiting = r => require.ensure([], () => r(require('@/pages/payment/paymentWaiting.vue')), 'payment')


// order start
//訂單列表
const consumRecord = r => require.ensure([], () => r(require('@/pages/order/orderStateList/consum_record.vue')), 'consumRecord')
    //訂單列表分享
const orderListShare = r => require.ensure([], () => r(require('@/pages/order/orderStateList/orderListShare.vue')), 'consumRecord')

const orderDetail = r => require.ensure([], () => r(require('@/pages/order/refundList/order_detail.vue')), 'orderDetail')
const complain = r => require.ensure([], () => r(require('@/pages/order/complain/complain.vue')), 'complain')
const complainDetail = r => require.ensure([], () => r(require('@/pages/order/complain/complain_detail.vue')), 'complainDetail')
const coupon = r => require.ensure([], () => r(require('@/pages/order/coupon/coupon.vue')), 'coupon')
const getCoupon = r => require.ensure([], () => r(require('@/pages/order/coupon/getCoupon.vue')), 'getCoupon')
    //order end

// 店铺详情页
const assistant = r => require.ensure([], () => r(require('@/pages/store/assistant.vue')), 'store')
const company = r => require.ensure([], () => r(require('@/pages/store/company.vue')), 'store')
const poverty = r => require.ensure([], () => r(require('@/pages/store/poverty.vue')), 'store')

//快报列表
const letterList = r => require.ensure([], () => r(require('@/pages/letterList/letterList.vue')), 'letterList')
    //快报详情
const letterDetails = r => require.ensure([], () => r(require('@/pages/letterList/letterDetails.vue')), 'letterList')


//联盟介绍页
const union = r => require.ensure([], () => r(require('@/pages/union/union.vue')), 'union')
const unionInfo = r => require.ensure([], () => r(require('@/pages/union/unionInfo.vue')), 'union')
const unionDetail = r => require.ensure([], () => r(require('@/pages/union/unionDetail.vue')), 'union')
const unionRank = r => require.ensure([], () => r(require('@/pages/union/unionRank.vue')), 'union')
const unionPartment = r => require.ensure([], () => r(require('@/pages/union/unionPartment.vue')), 'union')
const unionChoose = r => require.ensure([], () => r(require('@/pages/union/unionChoose.vue')), 'union')
const unionChooseNext = r => require.ensure([], () => r(require('@/pages/union/unionChooseNext.vue')), 'union')

//单位集采 bizbuy start
//商品采购
const bizIndex = r => require.ensure([], () => r(require('@/pages/bizbuy/public/biz_index.vue')), 'bizGoodsBuy')
const bizAssistant = r => require.ensure([], () => r(require('@/pages/bizbuy/public/biz_assistant.vue')), 'bizGoodsBuy')
const bizGoodsList = r => require.ensure([], () => r(require('@/pages/bizbuy/collectiveorder/procurement_will_list.vue')), 'bizGoodsBuy')
const bizPurchaseRecord = r => require.ensure([], () => r(require('@/pages/bizbuy/public/purchase_record.vue')), 'bizGoodsBuy')
const bizInvoiceManage = r => require.ensure([], () => r(require('@/pages/bizbuy/public/invoice_management.vue')), 'bizGoodsBuy')
const bizTransferInfo = r => require.ensure([], () => r(require('@/pages/bizbuy/public/transfer_info.vue')), 'bizGoodsBuy')
const bizEnterpriseInfo = r => require.ensure([], () => r(require('@/pages/bizbuy/collectiveorder/procurement_enterprise_info.vue')), 'bizGoodsBuy')
const bizOrder = r => require.ensure([], () => r(require('@/pages/bizbuy/collectiveorder/procurement_order.vue')), 'bizGoodsBuy')
const bizOrderDetail = r => require.ensure([], () => r(require('@/pages/bizbuy/collectiveorder/procurement_order_detai.vue')), 'bizGoodsBuy')
const bizOrderAgreement = r => require.ensure([], () => r(require('@/pages/bizbuy/collectiveorder/purchase_agreement.vue')), 'bizGoodsBuy')
const bizOrderResults = r => require.ensure([], () => r(require('@/pages/bizbuy/collectiveorder/purchase_order_results.vue')), 'bizGoodsBuy')
    //扶贫码采购
const fpmPurchasingInfo = r => require.ensure([], () => r(require('@/pages/bizbuy/couponcode/fpm_purchasing_info.vue')), 'fpmPurchasingInfo')
const fpmOrderInfo = r => require.ensure([], () => r(require('@/pages/bizbuy/couponcode/fpm_order_info.vue')), 'fpmOrderInfo')
const fpmAgreement = r => require.ensure([], () => r(require('@/pages/bizbuy/couponcode/fpm_agreement.vue')), 'fpmAgreement')
const fpmOrderDetail = r => require.ensure([], () => r(require('@/pages/bizbuy/couponcode/fpm_order_detail.vue')), 'fpmOrderDetail')
const fpmOrderResults = r => require.ensure([], () => r(require('@/pages/bizbuy/couponcode/fpm_order_results.vue')), 'fpmOrderResults')
const fpmOrderContract = r => require.ensure([], () => r(require('@/pages/bizbuy/couponcode/fpm_order_contract.vue')), 'fpmOrderResults');
//集采地址
const bizAddrEdit = r => require.ensure([], () => r(require('@/pages/bizbuy/bizAddress/editAddress.vue')), 'bizAddress')
const bizAddrCd = r => require.ensure([], () => r(require('@/pages/bizbuy/bizAddress/chooseAddress.vue')), 'bizAddress')
    //单位集采 bizbuy end

//善缘商场

const syMarket = r => require.ensure([], () => r(require('@/pages/syMarket/index.vue')), 'syMarket');

const page_500 = r => require.ensure([], () => r(require('@/components/common/500.vue')), 'test');
const headerDownLoad = r => require.ensure([], () => r(require('@/components/common/downLoad.vue')), 'test');
//签到
const signOnApp = r => require.ensure([], () => r(require('@/pages/signOnApp/index.vue')), 'signOnApp');


//上月最佳帮扶人
const support = r => require.ensure([], () => r(require('@/pages/support/support.vue')), 'support');

//公益积分
const PublicIntegral = r => require.ensure([], () => r(require('@/pages/PublicIntegral/PublicIntegral.vue')), 'Integral');

//扶贫码
const PovertyCode = r => require.ensure([], () => r(require('@/pages/povertyCode/povertyCode.vue')), 'povertyCode');

//添加电子扶贫码
const AddOverweight = r => require.ensure([], () => r(require('@/pages/povertyCode/addOverweight.vue')), 'povertyCode');

//微信授权测试页面
const wxTestPage = r => require.ensure([], () => r(require('@/pages/wxTestPage.vue')), 'wx');

const loading = r => require.ensure([], () => r(require('@/components/common/loading.vue')), 'loading');

const webOutside = r => require.ensure([], () => r(require('@/components/common/webOutside.vue')), 'webOutside');

//订单分享

const orderShare = r => require.ensure([], () => r(require('@/pages/order/orderShare.vue')), 'orderShare');
//支付结果页面
const success_v1 = r => require.ensure([], () => r(require('@/pages/payment/success_v1.vue')), 'payment');
const fail_v1 = r => require.ensure([], () => r(require('@/pages/payment/fail_v1.vue')), 'payment');

//分享失效页面
const failure = r => require.ensure([], () => r(require('@/components/common/failure.vue')), 'failure');

//全面升级
const upgrade = r => require.ensure([], () => r(require('@/components/common/upgrade.vue')), 'upgrade');

//系统维护
const maintenance = r => require.ensure([], () => r(require('@/components/common/maintenance.vue')), 'maintenance');

// 复兴商城
const fx_index = r => require.ensure([], () => r(require('@/pages/fx/fx_index.vue')), 'fx');
const wx_myorder_v3 = r => require.ensure([], () => r(require('@/pages/fx/wx_myorder_v3.vue')), 'fx');

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/success_v1',
            name: 'success_v1',
            component: success_v1
        }, {
            path: '/fail_v1',
            name: 'fail_v1',
            component: fail_v1
        }, {
            path: '/orderShare',
            name: 'orderShare',
            component: orderShare
        }, {
            path: '/wxTestPage',
            name: 'wxTestPage',
            component: wxTestPage
        }, {
            path: '/headerDownLoad',
            name: 'headerDownLoad',
            component: headerDownLoad
        }, {
            path: '/webOutside',
            name: 'webOutside',
            component: webOutside
        }, {
            path: '/loading',
            name: 'loading',
            component: loading
        }, {
            path: '/testJsBridge',
            name: 'testJsBridge',
            component: index
        }, {
            path: '/index',
            name: 'index',
            component: index_v1
        }, {
            path: "/hometownGoods",
            name: "hometownGoods",
            component: hometownGoods
        }, {
            path: "/scoreMall",
            name: "scoreMall",
            component: scoreMall
        },
        {
            path: "/signOnApp",
            name: "signOnApp",
            component: signOnApp
        },

        {
            path: '/syMarket',
            name: 'syMarket',
            component: syMarket
        },
        {
            path: '/500',
            name: 'error',
            component: page_500
        },
        {
            path: '/unionInfo',
            name: 'unionInfo',
            component: unionInfo
        },
        {
            path: '/union',
            name: 'union',
            component: union
        },
        {
            path: '/unionChoose',
            name: 'unionChoose',
            component: unionChoose
        },
        {
            path: '/unionChooseNext',
            name: 'unionChooseNext',
            component: unionChooseNext
        }, //unionChooseNext
        {
            path: '/unionRank',
            name: 'unionRank',
            component: unionRank
        },
        {
            path: '/unionPartment',
            name: 'unionPartment',
            component: unionPartment
        },

        {
            path: '/unionDetail',
            name: 'unionDetail',
            component: unionDetail
        },
        //获取优惠券
        {
            path: '/getCoupon',
            name: 'getCoupon',
            component: getCoupon
        },
        {
            path: '/fail',
            name: 'fail',
            component: fail
        },
        {

            path: '/success',
            name: 'success',
            component: success
        },
        // paymentWaiting
        {
            path: '/paymentWaiting',
            name: 'paymentWaiting',
            component: paymentWaiting
        },
        {

            path: '/payment',
            name: 'payment',
            component: payment
        },
        {

            path: '/orderWaitInfo',
            name: 'orderWaitInfo',
            component: orderWaitInfo
        },
        {

            path: '/orderInfo',
            name: 'orderInfo',
            component: orderInfo
        },
        {

            path: '/orderConfirm',
            name: 'orderConfirm',
            component: orderConfirm
        },
        { // 查看物流// logistics
            path: '/logistics',
            name: 'logistics',
            component: logistics
        },
        { // 查看物流列表 // logistics
            path: '/logisticsList',
            name: 'logisticsList',
            component: logisticsList
        },
        { // 包裹列表收货 receive
            path: '/receive',
            name: 'receive',
            component: receive
        },
        {
            path: '/cd',
            name: 'cd',
            component: cd
        },
        {
            path: '/ed',
            name: 'ed',
            component: ed
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        /*{
          path: '/testPage',
          name: 'testPage',
          component:testPage
        },*/
        {
            path: '/goodsList',
            name: 'goodsList',
            component: goodsList
        },
        {
            path: '/goodsListC',
            name: 'goodsListC',
            component: goodsListC
        },
        {
            path: '/integralGoods',
            name: 'integralGoods',
            component: integralGoods
        },
        {
            path: '/integralGoodsC',
            name: 'integralGoodsC',
            component: integralGoodsC
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: "/searchEmpty",
            name: "searchEmpty",
            component: searchEmpty
        },
        {
            path: "/resultStore",
            name: "resultStore",
            component: resultStore
        }, {
            path: "/resultArticle",
            name: "resultArticle",
            component: resultArticle
        },
        {
            path: "/catalogLists",
            name: "catalogLists",
            component: catalogLists
        },
        {
            path: "/actGoodsLists",
            name: "actGoodsLists",
            component: actGoodsLists
        },
        {
            path: "/applyRefund",
            name: "applyRefund",
            component: applyRefund
        },
        {
            path: "/evaluationList",
            name: "evaluationList",
            component: evaluationList
        },
        {
            path: "/evaluationPublish",
            name: "evaluationPublish",
            component: evaluationPublish
        },
        {
            path: "/evaluationAppend",
            name: "evaluationAppend",
            component: evaluationAppend
        },
        {
            path: "/evaluationResult",
            name: "evaluationResult",
            component: evaluationResult
        },
        {
            path: "/sku",
            name: "sku",
            component: sku
        },
        {
            path: "/applyRefundReason",
            name: "applyRefundReason",
            component: applyRefundReason
        },
        {
            path: "/applyRefundDetails",
            name: "applyRefundDetails",
            component: applyRefundDetails
        },
        {
            path: "/applyRefundList",
            name: "applyRefundList",
            component: applyRefundList
        },
        {
            path: "/goodsDetail",
            name: "goodsDetail",
            component: goodsDetail
        },
        {
            path: '/kit',
            name: 'kit',
            component: kit
        },
        {
            path: '/signin',
            name: 'signin',
            component: signin
        },
        {
            path: '/sign_next',
            name: 'sign_next',
            component: sign_next
        },
        {
            path: '/go_login',
            name: 'go_login',
            component: go_login
        },
        {
            path: '/signin_success',
            name: 'signin_success',
            component: signin_success
        },
        {
            path: '/verify',
            name: 'verify',
            component: verify
        },
        // onlyVerify
        {
            path: '/onlyVerify',
            name: 'onlyVerify',
            component: onlyVerify
        },
        {
            path: '/password_login',
            name: 'password_login',
            component: password_login
        },
        {
            path: '/code_login',
            name: 'code_login',
            component: code_login
        },
        {
            path: '/code_login_next',
            name: 'code_login_next',
            component: code_login_next
        },
        {
            path: '/wx_login',
            name: 'wx_login',
            component: wx_login
        },
        {
            path: '/wx_login_next',
            name: 'wx_login_next',
            component: wx_login_next
        },


        // specialty end


        // pubwelfare start(扶贫公益)

        // pubwelfare end


        // volunteer start(扶贫志愿)

        // volunteer end


        // mine start(我的)
        { //个人中心
            path: '/mine',
            name: 'mine',
            component: mine
        },
        { //心愿单
            path: '/wishList',
            name: 'wishList',
            component: wishList
        },
        { //账户设置
            path: '/userSetting',
            name: 'userSetting',
            component: userSetting
        },
        { //修改姓名
            path: '/modifyName',
            name: 'modifyName',
            component: modifyName
        },
        { //信息完善
            path: '/completeInfo',
            name: 'completeInfo',
            component: completeInfo
        },
        { //修改性别
            path: '/modifyGender',
            name: 'modifyGender',
            component: modifyGender
        },
        { //选择政治面貌
            path: '/selectPolitics',
            name: 'selectPolitics',
            component: selectPolitics
        },
        { //选择所属行业
            path: '/selectWork',
            name: 'selectWork',
            component: selectWork
        },
        { //实名认证
            path: '/realName',
            name: 'realName',
            component: realName
        },
        { //账户与安全
            path: '/accountSecurity',
            name: 'accountSecurity',
            component: accountSecurity
        },
        { //修改手机号
            path: '/modifyPhone',
            name: 'modifyPhone',
            component: modifyPhone
        },
        { //修改/绑定新手机号
            path: '/modifyPhone2',
            name: 'modifyPhone2',
            component: modifyPhone2
        },
        { //设置登录密码
            path: '/setPassword',
            name: 'setPassword',
            component: setPassword
        },
        { //设置登录密码2
            path: '/setPassword2',
            name: 'setPassword2',
            component: setPassword2
        },
        { //支付管理
            path: '/iPayment',
            name: 'iPayment',
            component: iPayment
        },
        { //设置支付密码
            path: '/setPayPassword',
            name: 'setPayPassword',
            component: setPayPassword
        },
        { //修改面膜
            path: '/modifyPassword',
            name: 'modifyPassword',
            component: modifyPassword
        },
        { //修改支付密码
            path: '/modifyPayPassword',
            name: 'modifyPayPassword',
            component: modifyPayPassword
        },
        { //修改支付密码2
            path: '/modifyPayPassword2',
            name: 'modifyPayPassword2',
            component: modifyPayPassword2
        },
        { //忘记支付密码
            path: '/forgetPayPassword',
            name: 'forgetPayPassword',
            component: forgetPayPassword
        },
        { //关于
            path: '/about',
            name: 'about',
            component: about
        },
        { //意见反馈
            path: '/feedback',
            name: 'feedback',
            component: feedback
        },
        { //关于公益中国
            path: '/aboutApp',
            name: 'aboutApp',
            component: aboutApp
        },
        { //软件许可及服务协议
            path: '/serviceAgreement',
            name: 'serviceAgreement',
            component: serviceAgreement
        },
        { //消息列表
            path: '/messageList',
            name: 'messageList',
            component: messageList
        },
        { //消息详情
            path: '/messageDetails',
            name: 'messageDetails',
            component: messageDetails
        },
        { //我的益客圈
            path: '/myFriends',
            name: 'myFriends',
            component: myFriends
        },
        { //邀请益客
            path: '/inviteFriend',
            name: 'inviteFriend',
            component: inviteFriend
        },
        { //微信端邀请益客（加入）
            path: '/weChartJoin',
            name: 'weChartJoin',
            component: weChartJoin
        },
        { //微信端登录注册
            path: '/weChartLogin',
            name: 'weChartLogin',
            component: weChartLogin
        },
        { //邀请有礼（下载）
            path: '/downLoad',
            name: 'downLoad',
            component: downLoad
        },


        { //公益平台客服（猜你想问）
            path: '/guessQuestion',
            name: 'guessQuestion',
            component: guessQuestion
        },
        { //公益平台客服（问题列表）
            path: '/questionList',
            name: 'questionList',
            component: questionList
        },
        { //公益平台客服（详情）
            path: '/questionDetail',
            name: 'questionDetail',
            component: questionDetail
        },
        // mine end


        //order start
        { //订单状态列表
            path: '/consumRecord',
            name: 'consumRecord',
            component: consumRecord
        },
        { //订单状态列表分享
            path: '/orderListShare',
            name: 'orderListShare',
            component: orderListShare
        },
        { //退款投诉列表
            path: '/orderDetail',
            name: 'orderDetail',
            component: orderDetail
        },
        { //投诉
            path: '/complain',
            name: 'complain',
            component: complain
        },
        { //投诉详情
            path: '/complainDetail',
            name: 'complainDetail',
            component: complainDetail
        },
        { //优惠券
            path: '/coupon',
            name: 'coupon',
            component: coupon
        },
        //order end
        { // 助理人详情页
            path: '/assistant',
            name: 'assistant',
            component: assistant
        },
        { // 善企详情页
            path: '/company',
            name: 'company',
            component: company
        },
        { // 店铺详情页
            path: '/poverty',
            name: 'poverty',
            component: poverty
        },


        { // 快报列表
            path: '/letterList',
            name: 'letterList',
            component: letterList
        },
        { // 快报详情
            path: '/letterDetails',
            name: 'letterDetails',
            component: letterDetails
        },





        //集采下单 start
        { //集采tabFooterBar 入口
            path: '/bizIndex',
            name: 'bizIndex',
            component: bizIndex
        },
        { //集采助手
            path: '/bizAssistant',
            name: 'bizAssistant',
            component: bizAssistant
        },
        { //集采商品清单
            path: '/bizGoodsList',
            name: 'bizGoodsList',
            component: bizGoodsList
        },
        { //集采采购记录
            path: '/bizPurchaseRecord',
            name: 'bizPurchaseRecord',
            component: bizPurchaseRecord
        },
        { //集采发票管理
            path: '/bizInvoiceManage',
            name: 'bizInvoiceManage',
            component: bizInvoiceManage
        },
        { //集采登记转账信息
            path: '/bizTransferInfo',
            name: 'bizTransferInfo',
            component: bizTransferInfo
        },
        { //集采单位信息
            path: '/bizEnterpriseInfo',
            name: 'bizEnterpriseInfo',
            component: bizEnterpriseInfo
        },
        { //集采订单
            path: '/bizOrder',
            name: 'bizOrder',
            component: bizOrder
        },
        { //集采订单详情
            path: '/bizOrderDetail',
            name: 'bizOrderDetail',
            component: bizOrderDetail
        },
        { //集采订单协议
            path: '/bizOrderAgreement',
            name: 'bizOrderAgreement',
            component: bizOrderAgreement
        },
        { //集采订单结果
            path: '/bizOrderResults',
            name: 'bizOrderResults',
            component: bizOrderResults
        },
        { //扶贫码采购企业信息
            path: '/fpmPurchasingInfo',
            name: 'fpmPurchasingInfo',
            component: fpmPurchasingInfo
        },
        { //扶贫码下单
            path: '/fpmOrderInfo',
            name: 'fpmOrderInfo',
            component: fpmOrderInfo
        },
        { //扶贫码协议
            path: '/fpmAgreement',
            name: 'fpmAgreement',
            component: fpmAgreement
        },
        { //扶贫码订单详情
            path: '/fpmOrderDetail',
            name: 'fpmOrderDetail',
            component: fpmOrderDetail
        },
        { //扶贫码订单详情--查看合同
            path: '/fpmOrderContract',
            name: 'fpmOrderContract',
            component: fpmOrderContract
        },
        { //扶贫码下单结果
            path: '/fpmOrderResults',
            name: 'fpmOrderResults',
            component: fpmOrderResults
        },
        { //集采地址
            path: '/bizEd',
            name: 'bizEd',
            component: bizAddrEdit
        },
        { //集采地址
            path: '/bizAddrCd',
            name: 'bizAddrCd',
            component: bizAddrCd
        },
        //集采下单 end

        { //上月最佳帮扶人
            path: '/support',
            name: 'support',
            component: support
        },
        { //公益积分
            path: '/publicIntegral',
            name: 'publicIntegral',
            component: PublicIntegral
        },
        { //扶贫码
            path: '/povertyCode',
            name: 'povertyCode',
            component: PovertyCode
        },
        { //添加电子扶贫码
            path: '/addOverweight',
            name: 'addOverweight',
            component: AddOverweight
        },
        { //图片预览
            path: '/photoSwiper',
            name: 'photoSwiper',
            component: photoSwiper
        },
        { //分享失效
            path: '/failure',
            name: 'failure',
            component: failure
        },
        { //全面升级
            path: '/upgrade',
            name: 'upgrade',
            component: upgrade
        },
        { //系统维护
            path: '/maintenance',
            name: 'maintenance',
            component: maintenance
        },
        // fx_index
        { //复兴商城
            path: '/fx_index',
            name: 'fx_index',
            component: fx_index
        },
        // wx_myorder_v3
        { //复兴商城 我的订单
            path: '/wx_myorder_v3',
            name: 'wx_myorder_v3',
            component: wx_myorder_v3
        },
    ]
})
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
        // next()
    if (to.matched.length === 0) { //如果未匹配到路由
        //  跳转404页面
    } else {
        next(); //如果匹配到正确跳转
    }
})
export default router