import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import jango from '@/components/jango'
import child1 from '@/components/child1'
import child2 from '@/components/child2'
import child3 from '@/components/child3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/jango',
      name: 'jango',
      component: jango,
      children:[
        {
          path: 'child1',
          component: child1,
        },
         {
          path: 'child2',
          component: child2,
        },
         {
          path: 'child3',
          name:'child3',
          component: child3,
        },
      ]
    }
  ]
})
