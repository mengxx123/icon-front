import footer from './footer'
import page from './page'

export default {
    install: function (Vue) {
        Vue.component('ui-footer', footer)
        Vue.component('my-page', page)
    }
}
