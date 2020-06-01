import Vue from 'vue'
import Router from 'vue-router'

import Vant from 'vant'
import './../static/index.css'

// 引入插件对象
import Hello from '../util/component'

// 导入对应的vuex文件
import store from './../store/store'

import tool from './../util/tool'

// 导入相应的子组件
import Main from './../views/main'
import Clinic from './../views/freeClinic/index'
import Fresh22 from './../views/fresh22/fresh22'

import Child from './../views/child'
import InfoList from './../views/infoList'

import Learn from './../views/learnVue/index'

Vue.use(Router)
Vue.use(Vant)
Vue.use(tool)
Vue.use(Hello)


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
              },{
                  name: 'fresh22',
                  path: 'fresh22',
                  component: Fresh22
              },{
                  name: 'child',
                  path: 'child',
                  meta: {
                      title: '疫情管理系统'
                  },
                  component: Child,
              },{
                  name: 'infoList',
                  path: 'infoList',
                  meta: {
                      title: '疫情管理系统'
                  },
                  component: InfoList,
              }
          ]
      },{
          name: 'learn',
          path: '/learn',
          component: Learn,
          children: [
              {
                  name: 'freeClinic333',
                  path: 'free2333',
              }
          ]
      }
  ]
})

export default router