import bridge from '../../modules/_appjs/bridge'
bridge.syJsbGetAppInfo(function(appInfo) {
    //  appInfo={}
    // appInfo['platform']='iphoneX'
    if (!appInfo) {
        var css = '.header-paddingTop { overflow: hidden; height:44px !important;box-sizing: border-box;}'
        css += '.iphoneTop-box{height: calc(100% - 44px) !important;}'
        css += '.iphone10-paddingTopBox{padding-top:0px;box-sizing: border-box;}'
        css += '.iphone10-footer{bottom:0px;}'
        css += '.iphone10-top{padding-top:0px !important;}'
        css += '.iphone10-footer-padding34{padding-bottom:0px !important; }'
        css += '.iphone10-footer-padding{padding-bottom:0px;}'
        css += '.iphone10-paddingTop{padding-top:0px !important;}'
    } else {
        if (typeof appInfo == 'string') {
            appInfo = JSON.parse(appInfo)
        }
        if (appInfo['platform'] == 'android') {
            var css = '.header-paddingTop { overflow: hidden;  height:44px !important;box-sizing: border-box;}'
            css += '.iphoneTop-box{height: calc(100% - 44px) !important;}'
            css += '.iphone10-paddingTopBox{padding-top:0px;box-sizing: border-box;}'
            css += '.iphone10-footer{bottom:0px;}'
            css += '.iphone10-top{top:0px !important;}'
            css += '.iphone10-footer-padding34{padding-bottom:0px !important; }'
            css += '.iphone10-footer-padding{padding-bottom:0px;}'
            css += '.iphone10-paddingTop{padding-top:0px !important;}'
            css += '.android-jc-top{top:44px!important;}'
        } else if (appInfo['platform'] == 'ios') {
            var css = '.header-paddingTop { overflow: hidden;  height:64px !important;box-sizing: border-box;}'
            css += '.iphoneTop-box{height: calc(100% - 64px) !important;}'
            css += '.iphone10-paddingTopBox{padding-top:20px;box-sizing: border-box;}'
            css += '.iphone10-footer{bottom:0px;}'
            css += '.iphone10-top{padding-top:20px !important;}'
            css += '.iphone10-footer-padding34{padding-bottom:0px !important; }'
            css += '.iphone10-footer-padding{padding-bottom:0px;}'
            css += '.iphone10-paddingTop{padding-top:20px !important;}'
            css += '.ipone-top{top:64px !important;}'
        } else if (appInfo['platform'] == 'iphoneX') {
            var css = '.header-paddingTop { overflow: hidden;  height:88px !important;box-sizing: border-box;background-color:rgba(249,249,249,0.82);}'
            css += '.iphoneTop-box{height: calc(100% - 88px) !important;}'
            css += '.iphone10-paddingTopBox{padding-top:44px;box-sizing: border-box;}'
            css += '.iphone10-footer{bottom:34px !important; }'
            css += '.iphone10-top{top:34px !important;}'
            css += '.iphone10-footer-padding34{padding-bottom:34px !important; }'
            css += '.iphone10-footer-padding{padding-bottom:34px !important; background:rgba(249,249,249,1)}'
            css += '.bottom34{bottom:34px !important;}'
            css += '.iphone10-paddingTop{padding-top:44px !important;}'
            css += '.iphoneX-top{top:88px!important;}'
        }
    }
    var head = document.getElementsByTagName('head')[0]
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
})