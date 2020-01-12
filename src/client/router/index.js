import Vue from 'vue'
import Router from 'vue-router'

// 导入对应的vuex文件
import store from './../store/store'

// 导入相应的子组件
import Index from './../views/index'
import Game from './../views/game'
import Ranking from './../views/ranking'
import  Icon from './../components/Icon'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
      {
          name: 'index',
          path: '/',
          component: Index
      },
      {
          name: 'ranking',
          path: '/ranking',
          component: Ranking
      },
      {
          name: 'game',
          path: '/game',
          component: Game
      }]
})

export default router