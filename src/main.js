import Vue from 'vue'
import 'tcon/dist/reset.css'
// 当前预览的卡片组件名
const componentName = ''
require(`./card-collection/${componentName}`)

Vue.config.productionTip = false

new Vue({
  render: h => h(componentName)
}).$mount('#app')
