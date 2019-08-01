import Vue from 'vue'
import Router from 'vue-router'
import baseMap from '@/views/baseMap'
import featureLayer from '@/views/featureLayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'featureLayer',
      component: featureLayer
    }
  ]
})
