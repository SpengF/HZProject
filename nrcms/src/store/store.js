import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userArr:{}
  },
  mutations: {
    setUserArr(state,e){
      state.userArr=e
    }
  },
  actions:{
    // setUserArr({commit}){
    //   commit('setUserArr',e)
    // }
  },
  getters: {
    getUserArr(state){
      return state.userArr
    }
  }
})
