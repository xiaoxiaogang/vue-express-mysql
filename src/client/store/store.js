import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      user: {
          name: 'rookie'
      }
  },
  getters: {
      getName: function (state) {
          return state.user.name+'=AAA'
      },
      getOtherName: function (state) {
          return state.user.name+'=bbb'
      }
  },
  mutations: {
      setUser(state, payload){
          if(payload.hasOwnProperty('name')){
              let num = Math.floor(Math.random(0, 1)* 100)
              state.user.name = payload.name + num
          }
      }
  },
  actions: {
      addSetUser (context, payload) {
          return new Promise((resolve,reject)=> {
              setTimeout(() => {
                  context.commit('setUser', {'name':  payload.name})
                  resolve()
              }, 100)
          })
      }
  }
})

export default store