
import { createStore } from 'vuex'
import { login ,getinfo} from '~/api/manager'
import { setToken,removeToken} from '~/composables/auth.js'
const store = createStore({
    state () {
      return {
        //用户信息
        user:{},
        //侧边宽度
        asideWidth:"250px"
      }
    },
    mutations:  {
        //记录用户信息
        SET_USERINFO(state,user){
            state.user =  user
        },
        handleAsideWidth(state){
            state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
        }
    },
    actions:{
        login({commit},{username,password}){
            return new Promise((resolve,reject)=>{
                login(username,password).then(res=>{
                    setToken(res.token)
                    resolve(res)
                }).catch(err=>reject(err))
            })
        },
        //获取当前登录用户信息
        getinfo({commit}){
            return new Promise((resolve,reject)=>{
                getinfo().then(res=>{
                    commit("SET_USERINFO",res)
                    resolve(res)
                }).catch(err=>reject(err))
            }) 
        },
        //退出登录
        logout({commit}){
            removeToken()
            commit('SET_USERINFO')
        }
    }
  })

  export default store