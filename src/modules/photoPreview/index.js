/**
 * Created by win 10 on 2018/6/15.
 */
import Vue from 'vue'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
var options={
    fullscreenEl:false,//关闭全屏按钮
    preload:[2,2],
}
Vue.use(preview,options);
//export default
//yourPhotoSwipeInstance.options.escKey = false; )。