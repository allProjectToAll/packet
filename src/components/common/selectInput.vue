<template>
  <div class="select-component">
    <div class="box">
      <input v-model="inputVal" type="text" class="select-input" placeholder="请选择币种信息" @focus="focuseFn" @blur="blurFn"/>
      <img src="../../assets/imgs/down.png" class="downImg"/>
      <ul v-if="ulDis">
        <li v-for="(item,index) in currencys.currencys" :key="index" @click="clickEach(item)">{{item.id}}</li>
      </ul>
    </div>
  </div>
    
</template>

<script>
import api from '../../public/api'
export default {
  props:[ "currencys" ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ulDis:false,
      inputVal:"",
      
     
    }
  },
  computed:{
    
  },
  created(){
    console.log(this.currencys)
  },
  methods:{
    focuseFn(){
      this.ulDis = true;
    },
    blurFn(){
      this.ulDis = false;
    },
    clickEach(item){
      console.log(item);
      this.inputVal = item.id;
      this.$emit(this.currencys.func,this.inputVal);
    }
     
  }
}
</script>

<style lang="scss" scoped>
.box{
    width:335px;
    height:44px;
    position:relative;
    .select-input{
        width:335px;
        height:44px;
        border:1px solid #eee;
        border-radius:4px;
        background:rgba(246,246,246,1);
        text-indent: 10px;
        &:focus{
          border:1px solid #ccc;
          outline: none;
        }
    }
    .downImg{
        position:absolute;
        right:10px;
        top:18px;
        width:15px;
    }
    ul{
      width:335px;
      height:auto;
      max-height:100px;
      position:absolute;
      left:0;
      top:48px;
      border:1px solid #ccc;
      list-style:none;
      // background:rgba(246,246,246,1);
      background:white;
      border-radius:0 0 8px 8px;
      color:rgba(181,181,181,1);
      overflow:auto;
      li{
        width:335px;
        height:25px;
        line-height:25px;
        font-size:12px;
        border-bottom:1px solid #eee;
        cursor: pointer;
        text-indent: 10px;
        &:hover{
          background:rgba(254,230,157,0.3);
        }

      }
    }
}
ul li:last-child{
  border-bottom: none;
}
</style>

