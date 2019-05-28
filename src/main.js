
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import i18n from './i18n/i18n'


//后期可优化为 按需引入组件，减少体积
import MintUI from 'mint-ui'
import fastclick from 'fastclick'
import 'mint-ui/lib/style.css'



import './assets/style/index.scss'
import './assets/style/country.css'
import './font/fonts.css'

//自定义函数
import './public/index.js'
import Adapt from './public/adapt'

// 智能验证
import './public/guide.js'
import './public/smartCaptcha.js'

import util from './public/util'
import VueClipboard from 'vue-clipboard2'
import MetaInfo from 'vue-meta-info'



Vue.config.productionTip = false
Adapt(window).resize(375,'',480)
Vue.use(VueClipboard)
// Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(MetaInfo)
/* eslint-disable no-new */
/* 移动端点击300MS延时 */

//fastclick.attach(document.body)


Vue.filter('concatText',function (value,cat = '',totalNum,fromStart = false) {
  let val = value.toString();
  if(!totalNum || totalNum<= value.length){
    return value;
  }
  let text = cat.repeat(totalNum-value.length);
  if(fromStart){
    return `${text}${value}`;
  }else{
    return `${value}${text}`;
  }
});

Vue.filter('dateTime', function(value,format) {
  if(!value) {
    return '';
  }
  let d = new Date(value*1000);
  let year = d.getFullYear();
  let month = '0'+(d.getMonth() + 1);
  let day = '0'+d.getDate();
  let hour = '0'+d.getHours()+'';
  let minutes = '0'+d.getMinutes()+'';
  let seconds = '0'+d.getSeconds()+'';
  if(format==1){
    return `${month.substr(-2,2)}/${day.substr(-2,2)} ${hour.substr(-2,2)}:${minutes.substr(-2,2)}`
  }else {
    return  year+ '/' + month.substr(-2,2) + '/' + day.substr(-2,2) + ' ' + hour.substr(-2,2) + ':'
      + minutes.substr(-2,2) + ':' + seconds.substr(-2,2);
  }

});

Vue.filter('covImgPath',function(value){
  // 转换 static 下图片路径，拼接上当前基本路径 如：/envelope/
  return process.env.absoluteImgPath + value;
})

Vue.filter('headImgPath',function(value){
  // 获取服务器图片路径 value 为 userId/headImageId
  return `${util.ajax.defaults.baseURL}/User/HeadImage/${value}`
})

Vue.filter('currencyImgPath',function(value){
  // 获取图片路径
  return `${util.ajax.defaults.baseURL}/image/currency/web_${value}.png`;
})



new Vue({
  el: '#app',
  render: h => h(App),
  store,
  i18n,
  router,
})
