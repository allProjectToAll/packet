let t1=0;
let t2=0;
let timer=null
class Scroll {
  constructor(scrollDom,domHeight,windowHeight) {
    this.x = scrollDom;
    this.y = domHeight;
    this.z = windowHeight;
    this.indexList={maxIndex:0,minIndex:0}
  }

  get ScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  }
  set ScrollTop(value) {
    this.x.scrollTop=value;
  }
  get windowHeight(){
    return window.clientHeight  || document.documentElement.clientHeight  || document.body.clientHeight
  }

  get ScrollHeight(){
    return this.x.scrollHeight;
  }
  set ScrollHeight(value){
    this.x.scrollHeight = value;
  }

  bindScroll(callback){
    this.x.onscroll=function (...arg) {
      clearTimeout(timer)
      timer=setTimeout(()=>{
        Object.assign(this.indexList,this.isScrollEnd())
        callbak(this.indexList)
      },1000)
      t1=this.ScrollTop

    }.bind(this)
  }
  unbindSrcollBottom(){
    this.x.onscroll=null
  }
  bindScrollBottom(callbak1,callback2,callback3) {
    //滚动到底部
    this.ScrollTop=0;
    this.x.onscroll=function (...arg) {
      clearTimeout(timer)
      /*console.log(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,this.ScrollHeight)*/
      timer=setTimeout(()=>{
        if(this.ScrollTop+this.windowHeight>this.ScrollHeight-50){
          //滚动到底部
          console.log('滚动到底部')
          //Object.assign(this.indexList,this.isScrollEnd())
          callbak1()
         // callback2(this.ScrollTop)
         // callback3(false)
        }else {
          //Object.assign(this.indexList,this.isScrollEnd())
          //callback2(this.ScrollTop)
          //callback3(false)
        }
      },1000)
      t1=this.ScrollTop
    }.bind(this)
  }

  pullUpRefresh(){
    //上拉刷新
  }
  pullDownRefresh(){
    //下拉刷新
  }
  init(callback){
    callback(this.getDataIndex())
  }

  isScrollEnd(){
    t2=this.ScrollTop;
    if(t2==t1){
      return this.getDataIndex()
    }
  }

  getDataIndex(){
    let a=Math.ceil((this.ScrollTop-30)/(this.y+25))
    let b=Math.ceil((this.ScrollTop+this.z-30)/(this.y+25))
    let c=(this.ScrollTop-30)%(this.y+25)
    var d=0
    if(c>this.y){
      d=a+1
    }else {
      d=a
    }
    return {maxIndex:b,minIndex:d<=0?0:d}
  }
}

function overscroll(el) {
  var leftAndRight=0;
  var downUp=0;
  el.addEventListener('touchstart', function(evt) {
    leftAndRight=evt.touches[0].clientX
    downUp=evt.touches[0].clientY
    var top = el.scrollTop
      , totalScroll = el.scrollHeight
      , currentScroll = top + el.offsetHeight;

    if(top === 0) {
      el.scrollTop = 1;
    } else if(currentScroll === totalScroll) {
      el.scrollTop = top - 1;
    }
  });
/*  el.addEventListener('touchend',function (evt) {
    var deta=Math.abs(evt.changedTouches[0].clientX-leftAndRight)
    //console.log(deta,'end')
    if(el.offsetHeight < el.scrollHeight && deta<=2){
      evt._isScroller = true;
      //evt.stopPropagation();
    }else {
      evt._isScroller = false;
    }
  });*/
 /* el.addEventListener('touchmove', function (evt) {
    var detaX=Math.abs(evt.touches[0].clientX-leftAndRight)
    var detaY=Math.abs(evt.touches[0].clientY-downUp)
    var deta=detaY-detaX
    if(el.offsetHeight < el.scrollHeight && deta>1){
      evt._isScroller = true;
    }
  });*/
/*  el.addEventListener('touchstart', function(evt) {
    leftAndRight=evt.touches[0].clientX
    var top = el.scrollTop
      , totalScroll = el.scrollHeight
      , currentScroll = top + el.offsetHeight;

    if(top === 0) {
      el.scrollTop = 1;
    } else if(currentScroll === totalScroll) {
      el.scrollTop = top - 1;
    }
  });
  el.addEventListener('touchmove', function(evt) {
    var deta=Math.abs(evt.touches[0].clientX-leftAndRight)
    if(el.offsetHeight < el.scrollHeight && deta<=5)
      evt._isScroller = true;
  });*/
}

function CompareArry() {
    this.url=url;
    this.params=params;
    this.arryList=arryList;
}
CompareArry.prototype.getApidata=()=>{
}

function APIs() {
  this.created = APitool;
}

function APitool() {
  return {
      sendApi:function () {
        console.log('url')
      },
      CompareObject(){
        console.log('object')
      },
      arrToobj(arr){
        var temp={}
        arr.forEach((item)=>{
          temp[item.id]=item
        })
        return temp
      },
      findData(min,max,list,obj){
        min=min*2-1<0?0:min*2-1
        var temArry=list.slice(min,max*2)
        return temArry.filter(function (item) {
          return !obj[item.id]
        })

      }
  }
}


export default {
  Scroll:Scroll,
  overscroll:overscroll,
  CompareArry:CompareArry,
  APIs:APIs
}
