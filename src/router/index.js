import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: resolve => require(['@/views/home.vue'],resolve)
  },{
    path: '/analysis',
    name: 'analysis',
    component: resolve => require(['@/views/dataAnalysis.vue'],resolve)
  }]
})

export default router