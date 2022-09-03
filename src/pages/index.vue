<template>
    <div>
        后台首页
        
        <el-button @click="handleLogout" >退出登录</el-button>
    </div>
</template>
<script setup>
import {showModal}  from '~/composables/util.js'
import {logout} from '~/api/manager.js'
import { toast } from '../composables/util';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

    const router = useRouter()
    const store = useStore()

     function handleLogout(){
        showModal("是否退出登录？").then(res=>{
            logout().finally(()=>{
                //移除cookie里的token
             
                //清除当前用户状态vuex
                store.dispatch('logout')
                //跳转登录页面
              
                router.push('/login')
                toast('退出登录成功')
            })
        })
     }
</script>