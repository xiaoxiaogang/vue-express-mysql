import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'

import service from './util/http'

Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$http = service

new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App}
})
