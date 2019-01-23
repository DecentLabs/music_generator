import Vue from 'vue'
import App from './App.vue'
import paper from 'paper'

Vue.config.productionTip = false
Vue.prototype.$paper = paper

paper.install(window)

new Vue({
  render: h => h(App)
}).$mount('#app')
