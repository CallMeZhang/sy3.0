# sy3_front

> 3.0 前端项目

## 安装＆打包

``` bash
# 安装依赖
# 如果开发过程中需要安装依赖，要修改package.json 如果是开发依赖运行npm install *** --save-dev自动修改，如果是生产依赖运行npm install *** --save
# 比如要安装 mint-ui 要执行 npm install mint-ui --save
npm install

# 本地调试
npm run dev

# 打包(本地不再提供打包服务，本地打包只提供调试，打包需到服务端执行脚本)
npm run dll  //如果修改了modules文件夹及公共JS插件，要执行此命令
npm run build  //正常打包
```

<font color=blue size=3 face="微软雅黑">npm可以用淘宝源cnpm，请自行百度</font>

## 项目结构与约定

```
/
├── src
    ├── assets 需构建的静态资源目录    
    ├── components 开发组件根目录
        ├── common  通用组件
            └── ...
        ├── ...        
    ├── directives 全局指令目录    
    ├── dom dom操作全局函数    
    ├── filters 全局过滤器        
    ├── pages 所有页面目录
        ├── index  首页目录
        ├── login  登录注册目录
        ├── mine   我的
        ├── specialty  故乡特产
        ├── volunteer  扶贫志愿
        ├── welfare  扶贫公益        
    ├── modules  功能组件(该文件不会轻易更改)
        └── ...                           
    ├── requests  http组建(各类接口总目录)
        └── ...        
    ├── router   路由目录    
    ├── utils   全局工具方法目录
    
├── static                         
│   ├── js                    
│   │   └── dll/vendor.dll.js
│   ├── css
│   └── image                
├── 


```

<font color=red size=3 face="微软雅黑">公共组件及库文件不允许擅自修改！！！</font>

## 前端发开规范

* 引入第三方库需修改package.json文件，如果是开发依赖运行npm install *** --save-dev自动修改，如果是生产依赖运行npm install *** --save。
* 不允许擅自修改非src/components目录下的文件,路由和API定义除外。
* 严禁修改js/css原生属性。
* src/modules目录下为自定义库文件，不允许放置业务相关代码。
* src/requests目录下为所有API接口，所有API接口必须在此体现。
* Vue-router需按照模块进行路由懒加载处理。
* 状态处理工具不得存放与用户行为相关的状态，即用户刷新浏览器不可丢失数据。
* src/components/common目录为业务通用组件，要提供使用接口，各组件之间不得有依赖关系。
* 不允许在src/components根目录下存放无归属文件及文件夹。比如直接建立一个商品详情页的文件夹。
* CSS除现在的clsty.css文件（清除原生样式）外，暂不设置公共样式，如需请讨论决定。公共UI定为UIKIT，uikit为components/kit文件。
* 全局css样式在static/css/base.scss文件 包含通用样式 通用css类名前端开发人员需熟悉一下
* CSS中背景图片和模版中img标签（img标签内容为后台提供除外）存放为/static/images/下，例：

 ``` 
 background: url(‘/static/images/***’),<img src=‘/static/images/***’>
 ```
* 尽量要有提炼出来的模块化组件，该组件应不依赖其他任何组件。
* 做好自己的工作。

### 开发注意事项

* 项目src下pages目录为页面组件，index(首页),login(登陆注册),mine(我的),specialty(故乡特产),volunteer(扶贫志愿),扶贫公益(welfare),所有子模块都在此目录下新建

* 静态图片(static目录下)路径引用需要加上变量 imgUrl + 图片目录  代码如下
```
<img :src="imgUrl+'/common/checked.png'" alt="">
<img v-lazy="imgUrl+'/common/checked.png'" alt="">  // 需懒加载使用指令v-lazy
```
* static/css/base.scss 文件是全局基本css文件 包含项目通用类名 前端开发人员需熟悉下通用类名

* ajax请求全局配置 方法: get, post, getWithToken, postWithToken; 调用如下 @params url:请求地址(string),param:请求参数(object),例下
```
this.get('/userInfo',{id:123}).then(res=>{
  if(res && res.code == 200){
    // todo
  }
})
```

* 打开新页面 使用this.appOpen(page,query,fullUrl,isCurPage)方法 
// @params page 页面组件名(路由)[必传参数]， 可选参数[query:页面传递参数obj{} fullUrl 是否是完整路径  isCurPage 是否在当前页面打开]
```
this.appOpen('login',{name:'小黑'})
this.appOpen('https://www.baidu.com',null,true)
```


#### 项目

* 项目目录src下directives目录为vue全局指令，可向此文件中添加自定义指令 目前指令 
```
v-titel:设置页面标题
v-drag: 元素拖拽
v-to-top:让元素滚动到页面顶端
v-lazy: 图片懒加载指令
```

* 项目目录src下dom目录为vue组件通用函数 目前调用方法

```
confrim对话框:  this.$confirm(text,confirmFn,btnText)  
  @params text:confirm对话框提示文字  confirmFn 点击确定执行的回调函数  btnText: 可不传 默认确定取消 传入对象{sure:'确定',cancel:'取消'}

alert框：   this.$alert(text,fn) 
  @params text:提示文字,   fn:点击确定执行的回调函数

toast提示：  this.$toast(text,time) 
  @params  text:toast提示文字 time:持续时间

页面滚动到底部，分页：this.$scroll(fn)
  @params  fn 页面滚动到底部执行的回调 分页可使用此方法
```

* 项目目录src下filters目录为vue组件全局过滤器(方法第一个参数为过滤参数，使用时不传) 目前过滤器 

```
formatTime(value,type,join) 格式化时间过滤器如果过滤器 则第一个参数为过滤参数   此方法亦是全局工具函数
   @params value：时间对象或者时间戳，type：过滤类型：YMD，YMDHMS，HMS，YM，china 此参数不传测默认是'年/月/日', join:为连接符 默认是'/' 
   
formatCash(num)  数字加千分号  此方法亦是全局工具函数
   @params  num：数字或者字符串 
   
tofloat(value,num)   保留小数 默认保留两位  
 @params value:数值  num:可选参数 保留小数位数默认为保留两位 
```

* 项目目录src下utils目录为vue组件全局工具方法 目前工具函数

```
校验手机号:    this.checkPhone(phone)      return:true || false
校验身份证号： this.checkCard(card)       return:true || false
校验银行卡号： this.checkBankCard(bankCard)   return:true || false
校验邮箱:     this.checkMail(mail)       return:true || false
判断是否是空对象： this.isEmpty(obj)     return:true || false
获取时间字符串:this.getDateStr(date)    return 20180410 
基本数据类型数组去重，不改变原有数组  this.removeArr(arr)  return: Array  
对象类型数据数组去重，不改变原有数组  this.removeJsonArr(arr,key) @params arr：Json数组 按键值移除key return Array
判断是否ios android   this.isIos()  this.isAndroid()  return true || false
数字加千分号(逗号)  this.formatComma(arr)  return 123,456
保留小数 默认保留两位  this.tofloat(value,num) @params value:数值  num:可选参数 保留小数位数默认为保留两位 
时间格式化    this.formatTime(value,type,join)  
```

# sy3.0
