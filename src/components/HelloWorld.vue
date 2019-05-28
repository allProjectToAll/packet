<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
    <h2>Essential Links</h2> -->
    {{name}}
    {{ $t("message.hello") }}
<button @click="openPicker">324</button>

   <mt-datetime-picker
    ref="picker"
    type="time"
    v-model="pickerValue">
  </mt-datetime-picker>

  <mt-radio title="单选框列表" v-model="value" :options="options">
</mt-radio>

  <mt-switch v-model="async">开关</mt-switch>
  </div>
</template>

<!--
解决ios中 微信打开链接，上下滑动，导致浏览器滑动并没有使得里面内容滑动

import {BindScrollMixin} from '../../../../public/mixins'
mixins:[BindScrollMixin],
 mounted(){ this.handBS(this.$refs.fission) } //fission是对滚动的div的 ref="fission"

overflow-y: scroll; //滚动的div的



-->
<script>
import api from '../public/api'
import {Decimal} from 'decimal.js';
export default {
  name: 'HelloWorld',
  components:{

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name:this.$store.state.name,
      list:[1,2,3,4,5,6,6],
      pickerValue:"12",
      async:false,
      value:"值A",
      options:[{
        label: '被禁用',
        value: '值F',
      },
      {
        label: '选项A',
        value: '值A'
      },
      {
        label: '选项B',
        value: '值B'
      }]
    }
  },
  computed:{

  },
  created(){
    this.getCountry();

  },
  methods:{
     openPicker() {
        this.$refs.picker.open();
      },
      getCountry(){
        api.post('/Country/GetList', {}).then((res)=>{
            console.log(res);

        }).catch((err)=> {
            console.log(err);
        })

        // let a = new Decimal(0.00001);
        // a = a.times(0.001).toString();
        // console.log(a);
      },
  }
}
</script>

<style lang="scss" scoped>
</style>

