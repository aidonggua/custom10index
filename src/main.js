import Vue from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

Vue.use(Element)
Vue.use(VueRouter)

new Vue({
    render: h => h(App),
}).$mount('#app')
