

import HOST from './hostConfig'

export default isStarApp

function isStarApp(url) {
  //url-schem 协议唤醒
  if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
    var loadDateTime = new Date();
    window.setTimeout(function() {
      var timeOutDateTime = new Date();
      if (timeOutDateTime - loadDateTime< 500) {
        //window.open(url)
        //下载
        window.location=url
       /*window.location=HOST.HOSTNAME + HOST.RouterBase +"download";*/
      } else {
        window.close();
      }
    },25);
    window.location="azex://telegram?join_group=link";
  } else if(navigator.userAgent.match(/android/i)){
    var state = null;
    try {
      state = window.open("azex://telegram?join_group=link",'_blank');
    }catch(e) {}
    if(state) {
      window.close();
    }else {
      window.open(url,'_blank')
      /*window.location =HOST.HOSTNAME + HOST.RouterBase+"download";*/
    }
  }
}



