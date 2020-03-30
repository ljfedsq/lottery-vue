import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [{
    path: '/',
    name: 'home',
    component: resolve => require(['@/views/home.vue'],resolve)
  },{
    path: '/lottery',
    name: 'lottery',
    component: resolve => require(['@/views/lottery.vue'],resolve)
  },{
    path: '/analysis',
    name: 'analysis',
    component: resolve => require(['@/views/dataAnalysis.vue'],resolve)
  },{
    path: '/school',
    name: 'school',
    component: resolve => require(['@/views/school.vue'],resolve)
  },{
    path: '/schoolMap',
    name: 'schoolMap',
    component: resolve => require(['@/views/schoolMap.vue'],resolve)
  }]
})

export default router