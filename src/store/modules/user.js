import api from '../../public/api'
import $i18n from '../../i18n/i18n'
import VueCookies from 'vue-cookie'

function getBrowserLanguage(){
  let lang = navigator.language;
  if(lang.match(/^zh/)){
    return 'cn'
  }else {
    return 'en'
  }
}
// if(['ko','ja','ru'].includes('lang')){
//   return lang
// }else
function getCoinByLang(lan){
  switch(lan){
    case 'cn': return 'Cny';break;
    case 'en': return 'Usd';break;
    case 'ko': return 'Krw';break;
    case 'ja': return 'Jpy';break;
    case 'ru': return 'Rub';break;
    default: return 'Usd';break;
  }
}

const user = {
  state: {
    token: undefined,
    isLogin: false,
    info: null,
    coin: 'Cny',
    language: 'cn',
    ordinaryPacket: {}, // 用于记录拼手气红包的 from 填写
    fission1: {},//返回裂变红包第一步
    fission2: {},//返回裂变红包第二部
    fission3:{},//裂变红包详情
    getCurrencyPrecisions:[],
    mask:false
  },
  mutations: {
    ['SET_TOKEN'](state, data) {
      VueCookies.set('token', JSON.stringify(data), {path: '/'});
      state.token = data;
      state.isLogin = !!state.token; //login 不再包含二次验证通过，因部分页面不二次验证也可以使用
    },
    ['SET_USER'](state, data) {
      state.info = data;
    },
    ['SET_MASK'](state,data){
      state.mask = data;
    },
    ['SET_COIN'](state, data) {
      state.coin = data;
    },
    ['SET_USER'](state,data){
      state.info=data
    },
    ['SET_LANGUAGE'](state, data) {
      state.language = data;
      $i18n.locale = state.language;
    },
    ['SET_ORDINARY_PACKET'](state, data) {
      state.ordinaryPacket = data;
    },
    ['SET_FISSION1_PACKET'](state, data) {
      state.fission1 = data;
    },
    ['SET_FISSION2_PACKET'](state, data) {
      state.fission2 = data;
    },
    ['SET_FISSION3_PACKET'](state, data) {
      state.fission3 = data;
    },
    ['CURRENCY_PRECISIONS'](state, data){
      state.getCurrencyPrecisions = data;
    }
  },
  actions: {
    setToken: ({dispatch, commit}, data) => {
      commit('SET_TOKEN', data)
    },
    setMask:({commit}, data)=>{
      commit('SET_MASK', data)
    },
    clearToken: ({commit}) => {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    },
    getCurrencyPrecisions:({ commit })=>{
      return new Promise((resolve, reject) => {
        api.post('/Currency/GetCurrencyPrecisions')
          .then((res) => {
            //console.log(res,888888888);
            commit('CURRENCY_PRECISIONS', res.data.value)
            resolve(res.data.value)
          }, (err) => {
            reject(err)
          });
      })
    },
    getUser: ({commit}) => {
      return new Promise((resolve, reject) => {
        api.post('/User/GetUserInfo')
          .then((res) => {
            commit('SET_USER', res.data.value)
            resolve(res.data.value)
          }, (err) => {
            reject(err)
          });
      })
    },
    setUser: ({commit}, data) => {
      commit('SET_USER', data)
    },
    setCoin: ({commit}, data) => {
      commit('SET_COIN', data)
    },
    setLanguage: ({commit}, data) => {
      commit('SET_LANGUAGE', data)
    },
    initStore: ({dispatch}) => {
      let language = getBrowserLanguage();
      dispatch('setToken',JSON.parse(VueCookies.get('token')));
      dispatch('setLanguage',JSON.parse(localStorage.getItem('language')) || language);
      dispatch('setCoin',JSON.parse(localStorage.getItem('legalMoney')) || getCoinByLang(language));
    }
  }
};

export default user
