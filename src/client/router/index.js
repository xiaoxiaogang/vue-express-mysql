import Vue from 'vue'
import Router from 'vue-router'

import Vant from 'vant'
import 'vant/lib/index.css'

// 导入对应的vuex文件
import store from './../store/store'

import tool from './../util/tool'

// 导入相应的子组件

import Main from './../views/main'
import Clinic from './../views/freeClinic/index'
import Fresh22 from './../views/fresh22/fresh22'

Vue.use(Router)
Vue.use(Vant)
Vue.use(tool)

var router = new Router({
  mode: 'history',
  routes: [
      {
          name: 'main',
          path: '/index',
          component: Main,
          children: [
              {
                  name: 'freeClinic',
                  path: 'free',
                  component: Clinic
              },
              {
                  name: 'fresh22',
                  path: 'bb',
                  component: Fresh22
              },
          ]
      }]
})

export default router