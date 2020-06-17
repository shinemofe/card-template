import Vue from 'vue'
import 'tcon/dist/reset.css'
// 当前预览的卡片组件名
const componentName = 'rivers-quality-28338153'
require(`./card-collection/${componentName}`)

Vue.config.productionTip = false

new Vue({
  render: h => h(componentName)
}).$mount('#app')
