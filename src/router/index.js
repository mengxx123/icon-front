import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Spec = resolve => require(['@/views/Spec'], resolve)
const SpecHelp = resolve => require(['@/views/SpecHelp'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const All = resolve => require(['@/views/All'], resolve)
const CollectionDetail = resolve => require(['@/views/CollectionDetail'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: All
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/spec',
        component: Spec
    },
    {
        path: '/spec/help',
        component: SpecHelp
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '/all',
        component: All
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/collections/:id',
        component: CollectionDetail,
        meta: {
            title: '图标库详情'
        }
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
