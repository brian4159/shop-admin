import 
{ createRouter ,
createWebHashHistory
 } from "vue-router";
 import Admin from "~/layouts/admin.vue"
 import Index from '~/pages/index.vue'
 import NotFound from '~/pages/404.vue'
 import Login  from '~/pages/login.vue'
 import  List  from "~/pages/goods/list.vue";

 const routes = [
   {
    path:"/",  
    component:Admin,
    children:[{
      path:"/",
      component:Index,
      meta:{
         title:"后台首页"
    }
    },
    {
      path:'/goods/list',
      component:List,
     },]
 } ,{
  path:'/login',
  component:Login,
  meta:{
   title:"登录页"
}
 },
 
  { path: '/:pathMatch(.*)*', 
  name: 'NotFound', 
  component: NotFound },
 
 ]

const router =createRouter({
    history: createWebHashHistory(),
    routes,
  })

  export  default router