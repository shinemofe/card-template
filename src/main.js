import Vue from 'vue'
import card from './card.vue'
import 'tcon/dist/reset.css'
import './index'

Vue.config.productionTip = false

new Vue({
  render: h => h(card)
}).$mount('#app')
