import router from "~/router"
import {getToken} from '~/composables/auth.js'
import {toast,showFullLoading,hiddenFullLoading} from '~/composables/util.js'
import store from "./store"


router.beforeEach(async(to, from,next) => {

   showFullLoading()
    const token = getToken()
    
    if(!token && to.path != "/login"){
        toast('请先登录',"error")
        return next({path:'/login'})
    }
   
     //防止重复登录
     if(token && to.path  == '/login'){
        toast('已登录',"error")
        return next({path:from.path?from.path:'/'})
     }
     if(token){
        await store.dispatch('getinfo')
     }

     document.title = "小王同学学习空间"+" "+(to.meta.title? to.meta.title : '')
     next()

  })

  //全局后置守卫
router.afterEach((to, from) => {
       hiddenFullLoading()
  });

 