<template>
  <div class="sendProjectPackets">
    <div class="notFixed" ref="notFixed">
      <div class="sendPacketTop">
        <img src="../../assets/imgs/sendPacketTopBg.png"/>
        <div class="top-mess">{{$t('sendProjectPacket.sendProjectPacket')}}</div>
      </div>
      <div class="detailBottom">
        <img src="../../assets/imgs/step2.png" class="step1"/>
        <p class="title">{{$t('sendProjectPacket.extensionSetting')}}</p>

        <!-- <textarea class="textArea2" v-model="mess.propaganda" :placeholder="$t('sendProjectPacket.lowerFontMore')" :class="{readBorder:border.propaganda}">
        </textarea> -->


        <div class="label">
          <span class="Titlmess">{{$t('sendProjectPacket.linkFont')}}</span>
        </div>

        <div class="errorMess">
          <textarea class="textArea1" v-model="mess.linkFont" :class="{readBorder:border.linkFont}"
                    :placeholder="$t('sendProjectPacket.lowerMoreFont')">
          </textarea>
          <p>{{error.linkFont}}</p>
        </div>

        <div class="label">
          <span class="Titlmess">{{$t('sendProjectPacket.detailPic')}}</span>
        </div>
        <div class="errorMess">
          <textarea class="textArea2" v-model="mess.propaganda" :placeholder="$t('sendProjectPacket.lowerFontMore')"
                    :class="{readBorder:border.propaganda}">
          </textarea>
          <p>{{error.propaganda}}</p>
        </div>

        <div class="label">
          <span class="Titlmess">{{$t('sendProjectPacket.forPicTo')}}</span>
        </div>
        <div class="errorMess" style="position:relative;width:335px;height:207.1px;margin:10px 0 0 20px;">
          <div class="upload-demo upload-demo1" :style="{backgroundImage:'url('+imgsrc+')'}">
            <!-- <img :src="imgsrc" class="showImg" style="z-index:0;"/> -->


            <button class="loadImgButt" style="z-index:0;">
              <img src="../../assets/imgs/sendImg.png" class="upTo"/>
              <span>{{$t('sendProjectPacket.clickLoading')}}</span>
            </button>
          </div>
          <div style="position:absolute;left:0;top:0;width:100%;height:100%;">
            <div style="position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;">
              <vue-core-image-upload class="upload-demo"
              :class="['btn', 'btn-primary']"
              :crop="false"
              @imageuploaded="imageuploaded"
              @imageuploading="imageuploading"
              :data="dataImg"
              inputOfFile="image"
              :max-file-size="5242880"
              :headers="headers"
              :url="action" >
              </vue-core-image-upload>
            </div>
            <img src="../common/loading/loading.gif" v-if="loading" style="width:100px;height:100px;position:absolute;left:117px;top:20px;" />
          </div>

          <p>{{error.imgUrl}}</p>
        </div>
        <!--style="height:102px;"-->
        <div class="label">
          <div class="leftDetail">
            <p>{{$t('sendProjectPacket.imgShow')}}</p>
            <div class="detailImgSize">
              {{$t('sendProjectPacket.imgSize')}}
            </div>
          </div>
          <div class="rightImg">
            <div class="detailImgBox">
              <img src="../../assets/imgs/sendPaImg.jpg"/>
              <div class="toBigImg" @click="openBigImg">{{$t('sendProjectPacket.clickBigImg')}}</div>
            </div>
          </div>
        </div>

        <div class="label">
          <span class="Titlmess">{{$t('sendProjectPacket.telegramLink')}}</span>
        </div>
        <div class="errorMess" style="margin-top:10px;">
          <input class="telegramInput" v-model="mess.link" type="text" :class="{readBorder:border.link}"
                 :placeholder="$t('sendProjectPacket.addAfterget')"/>
          <p>{{error.link}}</p>
        </div>
        <div style="width:100%;height:30px;"></div>
        <div style="height:84px;width:335px;">&nbsp;</div>
      </div>
    </div>
    <div class="next fixed-center">
      <button @click="toNext">{{$t('sendProjectPacket.next')}}</button>
    </div>
    <div class="shadow" v-if="bigImgShadowAsync">
      <img src="../../assets/imgs/sendPaImg.jpg" class="bigImg"/>
      <div class="closeImg" @click="closeBigImg">
        <img src="../../assets/imgs/closeImg.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../public/api";
import { Decimal } from "decimal.js";
import util from '../../public/util.js'
import VueCookies from 'vue-cookie'
import {BindScrollMixin} from '../../public/mixins'
import Vue from 'vue'
import {Toast} from 'mint-ui';
import VueCoreImageUpload  from 'vue-core-image-upload';
export default {
  mixins:[BindScrollMixin],
  components:{
    'vue-core-image-upload': VueCoreImageUpload
  },
  data() {
    return {
      loading:false,
      dataImg:{src:""},
      files:[],
      imgsrc: "",
      fileList:[],
      imgId:"",
      bigImgShadowAsync:false,
      mess:{
        linkFont:"",//链接文案
        propaganda:"",//宣传
        link:"",//链接
      },
      error:{
        propaganda:"",//宣传
        link:"",//链接
        imgUrl:"",
        linkFont:"",
      },
      border:{
        propaganda:false,//宣传
        link:false,//链接
        imgUrl:"",
        linkFont:"",//连接文案
      },
      parentJson:{},
      action:`${util.ajax.defaults.baseURL}${"/Image/Upload"}`,
      headers: { Authorization:`Bearer ${this.$store.state.user.token||JSON.parse(VueCookies.get('token'))}`,Lang: this.$store.state.user.language || "cn"},
    };
  },
  watch: {
    "mess.linkFont":{//链接文案
        handler(val,oldVal){
          if(val.length>400){
            this.mess.linkFont = val.substring(0, 400);
          }
  　　  },
  　　　deep:true
    },
    "mess.propaganda":{//宣传
        handler(val,oldVal){
          if(val.length>48){
            this.mess.propaganda = val.substring(0, 48);
          }
  　　  },
  　　　deep:true
    },
  },
  computed: {},
  mounted(){
    this.handBS(this.$refs.notFixed);
  },
  created() {
    this.parentJson = this.$route.query;
    if(this.$store.state.user.fission2.link){
      Object.assign(this.mess, this.$store.state.user.fission2);
      this.imgsrc = this.$store.state.user.fission2.imgsrc;
      this.imgId = this.$store.state.user.fission2.imgId;
    }
  },
  methods: {
    imageuploading(){
      this.loading = true;
    },
    imageuploaded(res) {
      if(res.isOk==false){
        Toast({
            message: res.err.message,
            position: 'middle'
          });
          this.loading = false;
      }else{
        this.imgsrc = util.ajax.defaults.baseURL+"/image/"+res.value;
        this.imgId = res.value;
        this.loading = false;
      }
    },

    toNext() {
      if(this.mess.linkFont.toString().trim().length>400){
        this.error.linkFont = this.$t("sendProjectPacket.shouldLowerMoreFont");
        this.border.linkFont = true;
      }else{
        this.error.linkFont = "";
        this.border.linkFont = false;
      }


        if (this.mess.propaganda.toString().trim() == "") {//宣传
          this.error.propaganda = this.$t("sendProjectPacket.enterFontDetail");
          this.border.propaganda = true;
        } else if (this.mess.propaganda.toString().trim().length > 48) {
          this.error.propaganda = this.$t("sendProjectPacket.shouldlowerFontMore");
          this.border.propaganda = true;
        } else {
          this.error.propaganda = "";
          this.border.propaganda = false;
        }

        if (/^https:\/\/t.me\/.+/.test(this.mess.link) == false) {
          this.error.link = this.$t("sendProjectPacket.enterLinkTrue");
          this.border.link = true;
        } else {
          this.error.link = "";
          this.border.link = false;
        }

        if (this.border.propaganda == false && this.border.imgUrl == false && this.border.link == false && this.border.linkFont == false) {
          let par = {
            linkFont: this.mess.linkFont,//链接文案
            propaganda: this.mess.propaganda,//宣传
            link: this.mess.link,//链接
            imgsrc: this.imgsrc,
            imgId: this.imgId ? this.imgId : "",
          }
          console.log(this.imgId, 33333)
          this.$store.commit('SET_FISSION2_PACKET', par);
          this.$store.commit('SET_FISSION3_PACKET', {firstType: this.parentJson, secondType: par});
          this.$router.push({name: 'sendPackets3', query: {firstType: this.parentJson, secondType: par}})
        }
      },
      // upDatError(err, file, fileList) {
      //   console.log(err, file, fileList,222)
      // },
      // upDateChange(file, fileList){
      //   console.log(file, fileList,333)
      //   this.imgsrc = file.url;
      // },
      closeBigImg() {
        this.bigImgShadowAsync = false;
        console.log(11111)
      },
      openBigImg() {//点击查看大图
        this.bigImgShadowAsync = true;
      },
      // beforeAvatarUpload(file){
      //   const isJPG = file.type === 'image/jpeg'||'image/png';
      //   const isLt2M = file.size / 1024  < 500;
      //   if (!isJPG) {
      //     this.$message.error(this.$t("sendProjectPacket.imgJPGPNG"));
      //   }
      //   if (!isLt2M) {
      //     this.$message.error(this.$t("sendProjectPacket.imgMoreBigger"));
      //   }
      //   return isJPG && isLt2M;
      // },
      // upDateSuccess(response, file, fileList) {//图片上传成功
      // console.log(this.headers);
      //   console.log(response,file,fileList, 444);
      //   this.imgId = response.value;
      //   this.imgsrc = file.url;
      // },
      // upDateError(err, file, fileList){
      //   console.log(err);
      //   this.$message.error(this.$t("sendProjectPacket.imgUploadErr"));
      // },
      // beforeAvatarUpload(file){
      //   const isJPG = file.type === 'image/jpeg'||'image/png';
      //   const isLt2M = file.size / 1024  < 500;
      //   if (!isJPG) {
      //     this.$message.error(this.$t("sendProjectPacket.imgJPGPNG"));
      //   }
      //   if (!isLt2M) {
      //     this.$message.error(this.$t("sendProjectPacket.imgMoreBigger"));
      //   }
      //   return isJPG && isLt2M;
      // },
      // upDateSuccess(response, file, fileList) {//图片上传成功
      //   console.log(response,file,fileList, 444);
      //   this.imgId = response.value;
      //   this.imgsrc = file.url;
      // },
      // upDateError(err, file, fileList){
      //   console.log(err);
      //   this.$message.error(this.$t("sendProjectPacket.imgUploadErr"));
      // },

    }
  };
</script>

<style lang="scss" type="text/scss" scoped>
  a, button, input, optgroup, select, textarea {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  img {
    pointer-events: none;
  }

  .sendProjectPackets {
    width: 100%;
    /*height: 100%;*/
    /*// overflow: hidden;*/
    /*// position: relative;*/
    .notFixed {
      position: relative;
      width: 100%;
      /*height:100%;*/
      /*overflow: auto;*/

      /*// overflow-y: scroll;*/
    }
  }

  .sendPacketTop {
    width: 375px;
    height: 100px;
    position: relative;
    img {
      width: 100%;
    }
    .top-mess {
      position: absolute;
      width: 100%;
      left: 0;
      top: 30px;
      color: white;
      text-align: center;
      font-size:20px;
    }
  }

  .detailBottom {
    width: 375px;
    background: white;
    // position: absolute;
    // left: 0;
    // top: 90px;
    margin-top: -5px;
    border-radius: 12px 12px 0 0;
    // overflow:hidden;
    .step1 {
      width: 320px;
      margin: 20px 0 0 27px;
    }
    .title {
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      margin: 30px 0 0 20px;
      font-weight: bold;
    }
  }

  .next {
    left: 0;
    bottom: 0;
    position: fixed;
    width: 375px;
    height: 74px;
    background: white;
    border-top: 1px solid #eee;
    box-shadow: 0px -2px 4px #eee;
    button {
      width: 335px;
      height: 44px;
      background: linear-gradient(
          90deg,
          rgba(255, 142, 76, 1),
          rgba(253, 100, 51, 1)
      );
      border-radius: 4px;
      border: none;
      text-align: center;
      line-height: 44px;
      color: white;
      font-size: 16px;
      margin-left: 20px;
      margin-top: 15px;
      &:focus {
        outline: none;
      }
    }
  }

  .label {
    width: 335px;
    /*height: 30px;*/
    margin: 15px 0 0 20px;
    .Titlmess {
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
    }
  }

  textarea {
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }

  .textArea1 {
    width: 335px;
    height: 160px;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    margin: 10px 0 0 20px;
    padding: 10px;
    border: 1px solid #eee;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    font-size: 14px;
    line-height: 20px;
  }

  .textArea2 {
    width: 335px;
    height: 88px;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    margin: 10px 0 0 20px;
    padding: 10px;
    border: 1px solid #eee;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    font-size: 14px;
    line-height: 20px;
  }

  .leftDetail {
    /*float: left;*/
    display: inline-block;
    width: 50%;
    p {
      font-size: 14px;
      color: rgba(85, 85, 85, 1);
      line-height: 20px;
      margin-bottom: 10px;
    }
    .detailImgSize {
      font-size: 14px;
      color: rgba(181, 181, 181, 1);
      line-height: 20px;
      word-break: break-all;
    }
  }

  .rightImg {
    /*float: left;*/
    display: inline-block;
    width: 50%;
    margin-left:-6px;
    .detailImgBox {
      width: 165px;
      height: 102px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .toBigImg {
        height: 28px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 14px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        font-size: 12px;
        color: white;
        line-height: 28px;
        cursor: pointer;
        width: 120px;
        text-align: center;
      }
    }
  }

  .telegramInput {
    width: 335px;
    height: 44px;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    text-indent: 15px;
    margin-left: 20px;
  }

  .shadow {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    position: fixed;
    left: 0;
    top: 0;
    .bigImg {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
    }
    .closeImg {
      position: absolute;
      left: 168px;
      bottom: 17px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      img {
        width: 40px;
      }
    }
  }

  .errorMess p {
    height: 10px;
    color: red;
    font-size: 12px;
    margin-left: 20px;
  }

  .readBorder {
    border: 1px solid red !important;
  }

  .upload-demo1 {
    border: 1px dashed #ccc !important;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    .loadImgButt {
      position: absolute;
      width: 125px;
      height: 44px;
      border-radius: 22px;
      left: 50%;
      top: 50%;
      margin-left: -63px;
      margin-top: -22px;
      border: none;
      background: linear-gradient(90deg, rgba(230, 186, 126, 1), rgba(213, 160, 79, 1));
      &:focus {
        outline: none;
      }
      .upTo {
        width: 24px;
        margin-left: 20px;
        float: left;
      }
      span {
        float: left;
        font-size: 14px;
        color: white;
        margin-left: 5px;
        margin-top:3px;
      }
      .files {
        position: absolute;
        left: 0;
        top: 0;
        width: 125px;
        height: 44px;
        border-radius: 22px;
        border: none;
        opacity: 0;
        &:focus {
          outline: none;
        }
      }
    }
  }
</style>
<style>
  .file-uploads {
    position: static !important
  }

  .el-upload-list--picture {
    display: none;
  }

  .showImg {
    position: absolute;
    /* left:0; */
    /* top:0; */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    /* width: 335px; */
  }

  .upload-demo {
    width: 335px !important;
    height: 207.1px !important;
    border-radius: 4px !important;
    position: relative;
    /* position:absolute;
    left:0;
    top:0; */
  }
</style>
