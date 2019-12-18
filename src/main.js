import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header'
import store from './vuex'
import Star from './components/Star/Star'
import i18n from './i18n'
import './validate'
import * as API from './api'
import {Button} from 'mint-ui'
import './mock/mockserver'
import CartControl from '@/components/CartControl/CartControl'

Vue.config.productionTip = false
Vue.component('Header',Header)
Vue.component('CartControl',CartControl)
Vue.component(Button.name,Button)
Vue.prototype.$API = API

Vue.component('Star',Star)
new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
