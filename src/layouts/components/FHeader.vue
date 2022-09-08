<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><Football /></el-icon>
      小王同学
    </span>
    <el-tooltip effect="dark" content="扩展" placement="bottom-start">
      <el-icon class="icon-btn"><Fold /></el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="bottom-start">
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center justify-center">
      <UseFullscreen>
        <el-icon class="icon-btn" @click="toggle"><FullScreen v-if="!isFullscreen" />
            <Aim v-if="isFullscreen"/>
        </el-icon>
      </UseFullscreen>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <form-drawer ref="formDrawerRef" title="修改密码"  confirmText="提交" destroyOnClose @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form" >
    <el-form-item prop="oldpassword" label="旧密码" label-width="80px">
                  <el-input type="password" v-model="form.oldpassword" placeholder="请输入密码" show-password>
                  </el-input>
              </el-form-item>
              <el-form-item prop="password" label="新密码" label-width="80px">
                  <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                  </el-input>
              </el-form-item>
              <el-form-item prop="repassword" label="确认密码" label-width="80px">
                  <el-input type="password" v-model="form.repassword" placeholder="请再次输入密码" show-password>
                  </el-input>
              </el-form-item>
        
          </el-form>
  </form-drawer>
 
</template>

<script setup>
import FormDrawer from "~/components/FormDrawer.vue";
import { showModal, toast } from "~/composables/util.js";
import { logout } from "~/api/manager.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useFullscreen } from "@vueuse/core";
import { ref,reactive } from 'vue'
import { updatepassword } from "../../api/manager";

const form = reactive({
oldpassword:"",
password:"",
repassword:""
})

const rules = {
    oldpassword: [
        {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
        },
    ],
    repassword: [
        {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
        },
    ]
}
const formDrawerRef=ref(null)
const formRef = ref(null)
const router = useRouter();
const store = useStore();

const { isFullscreen,toggle } = useFullscreen();



const handleCommand = (c) => {
  switch (c) {
    case "rePassword":
      // showDrawer.value=true;
      formDrawerRef.value.open()
      break;

    case "logout":
      handleLogout();
      break;

    default:
      break;
  }
};
//刷新
const handleRefresh = () => location.reload();

function handleLogout() {
  showModal("是否退出登录？").then((res) => {
    logout().finally(() => {
      //移除cookie里的token

      //清除当前用户状态vuex
      store.dispatch("logout");
      //跳转登录页面

      router.push("/login");
      toast("退出登录成功");
    });
  });
}
const onSubmit = () => {
  formRef.value.validate((valid)=>{
      if(!valid){
          return false
      }
      formDrawerRef.value.showLoading()
      updatepassword(form).then(res=>{
        toast('修改密码成功，请重新登录 ')
        store.dispatch("logout")
        router.push("/login")
      }).finally(()=>{
        formDrawerRef.value.hideLoading()
      })
  
      
  })
}
</script>

<style>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}
.logo {
  width: 250px;
  @apply flex items-center justify-center text-xl font-thin;
}
.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.icon-btn:hover {
  @apply bg-indigo-600;
}
.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex items-center justify-center mx-5;
}
</style>