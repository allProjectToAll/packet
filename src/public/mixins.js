import BSscroll from './scroll'
export const BindScrollMixin={
  data(){
    return {
    }
  },
  created(){
  },
  methods:{
    handBS(el){
      BSscroll.overscroll(el)
    }
  }
}
