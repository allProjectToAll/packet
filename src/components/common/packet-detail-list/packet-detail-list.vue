<template>
  <div class="detail">
    <div class="detail-wrap">
      <div class="myDraw" v-show="Object.keys(myTake).length">
        <ul>
          <li>
            <div class="lefts">
              <div class="userPhoto">
                <img :src="myuserNameImg.userImg" alt="">
                <!--<i class="icon1"></i>-->
              </div>
              <div class="userName">
                <div class="userTop">
                  <b>{{$t('redInfo.drawNoLi')}}{{myTake.userOrder}}</b>
                 <!-- <span class="no1"></span>-->
                </div>
                <p class="userTime">{{myuserNameImg.name}}</p>
              </div>
            </div>
            <div class="rights">
              <p>{{myTake.volume}} {{myTake.currency?myTake.currency.toLocaleUpperCase():''}}</p>
            </div>
          </li>
        </ul>
        <div class="fenge"></div>
      </div>
      <div class="detail-title">
        <span>{{$t('redInfo.drawNoLi')}}</span>
        <span>{{$t('redInfo.drawMoney')}}</span>
      </div>
      <ul class="publicDetail" v-if="isCanView">
        <li v-for="(item,index) in otherTake">
          <div class="lefts">
            <div class="userPhoto">
              <img :src="TakeUserListNickName[item.userId]?TakeUserListNickName[item.userId].userImg:''" alt="">
              <i :class="index==0?'icon1':index==1?'icon2':index==2?'icon3':''"></i>
            </div>
            <div class="userName">
              <div class="userTop">
                <b>{{TakeUserListNickName[item.userId]?TakeUserListNickName[item.userId].name:''}}</b>
                <span :class="index==0?'no1':index==1?'no2':index==2?'no3':''"></span>
              </div>
              <p class="userTime">{{item.createTime | dateTime(1)}}</p>
            </div>
          </div>
          <div class="rights">
            <p>{{item.volume}} {{item.currency?item.currency.toLocaleUpperCase():''}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /*import api from '../../../public/api'*/
  export default {
    name: "packet-detail-list",
    data() {
      return {
        isCanView:false
      }
    },
    props:{
      myTake:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      otherTake:{
        type:Array,
        default:()=>{
          return []
        }
      },
      myuserNameImg:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      userNameImg:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      TakeUserListNickName:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    created(){
      //获取用户信息
    },
    computed:{
      redType(){
        return this.$route.params.id
      },
    },
    methods:{
      refresh(data){
        this.isCanView=data
      }
    },
    watch:{
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
  @import "~assets/style/public";
  .detail{
    .detail-wrap{
      .detail-title{
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:12px;
        font-family:PingFangSC_Medium;
        color:rgba(178,178,178,1);
        line-height:12px;
        padding: 0 20px;
      }
      .myDraw{
        ul{
          padding: 0 20px;
          li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0px;
            .lefts{
              display: flex;
              justify-content: space-between;
              align-items: center;
              .userPhoto{
                width: 44px;
                height: 44px;
                margin-right: 10px;
                position: relative;
                img{
                  width: 44px;
                  height: 44px;
                  border-radius: 50%;
                  overflow: hidden;
                }
              }
              .userName{
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 44px;
                .userTop{
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                  align-items: center;
                  b{
                    @include no-wrap();
                    font-size:12px;
                    color:rgba(178,178,178,1);
                    line-height:12px;
                    font-family: PingFangSC_Medium;
                    font-weight: normal;
                  }
                  span{
                    width: 30px;
                    height: 16px;
                    &.no1{
                      @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_No.1");
                    }
                    &.no2{
                      @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_No.2");
                    }
                    &.no3{
                      @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_No.3");
                    }
                  }
                }
                .userTime{
                  font-size:16px;
                  font-family:PingFangSC_Bold;
                  color:rgba(85,85,85,1);
                  line-height:16px;
                }
              }
            }
            .rights{
              p{
                font-size:14px;
                font-family:PingFangSC_Bold;
                color:rgba(238,179,80,1);
                line-height:20px;
              }
            }
          }
        }
        .fenge{
          padding:0 20px;
          height: 10px;
          background: #EEEEEE;
        }
      }
      .publicDetail{
        padding: 0 20px;
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0px;
          .lefts{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .userPhoto{
              width: 44px;
              height: 44px;
              /*@include bg-image("~assets/imgs/redInfo/az-icon-change_face");*/
              margin-right: 10px;
              position: relative;
              i{
                position: absolute;
                border-radius: 50%;
                overflow: hidden;
                width: 18px;
                height: 16px;
                top: -7px;
                &.icon1{
                  @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_Crown_1");
                }
                &.icon2{
                  position: absolute;
                  @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_Crown_2");
                }
                &.icon3{
                  position: absolute;
                  @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_Crown_3");
                }
              }
              img{
                width: 44px;
                height: 44px;
                border-radius: 50%;
                overflow: hidden;
              }
            }
            .userName{
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 44px;
              .userTop{
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
                align-items: center;
                b{
                  max-width: 176px;
                  @include no-wrap();
                  font-size:16px;
                  font-family:PingFangSC_Bold;
                  color:rgba(85,85,85,1);
                  line-height:16px;
                }
                span{
                  width: 30px;
                  height: 16px;
                  margin-left: 14px;
                  &.no1{
                    @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_No.1");
                  }
                  &.no2{
                    @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_No.2");
                  }
                  &.no3{
                    @include bg-image("~assets/imgs/redInfo/azapp_icon_Rank_No.3");
                  }
                }
              }
              .userTime{
                font-size:12px;
                font-family:PingFangSC_Medium;
                color:rgba(178,178,178,1);
                line-height:12px;
              }
            }
          }
          .rights{
            p{
              font-size:14px;
              font-family:PingFangSC_Bold;
              color:rgba(238,179,80,1);
              line-height:20px;
            }
          }
        }
      }
    }
  }
</style>
