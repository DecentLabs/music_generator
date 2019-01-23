import Vue from 'vue'
import App from './App.vue'
import store from './store'
import paper from 'paper'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$paper = paper

paper.install(window)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
