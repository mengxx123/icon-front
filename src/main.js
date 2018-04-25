import Vue from 'vue'
import App from './App'
import router from './router'
import ui from './components/index'
import http from './util/http'
import qs from 'qs'
import storage from './util/storage'
import './scss/main.scss'

Vue.config.productionTip = false

Vue.use(ui)

Vue.prototype.$http = http
Vue.prototype.$qs = qs
Vue.prototype.$storage = storage

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
