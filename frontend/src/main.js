// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import vuetify from 'vuetify' // new 추가
import 'vuetify/dist/vuetify.min.css' // new 추가 Ensure you are using css-loader

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(vuetify) // new 추가

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
