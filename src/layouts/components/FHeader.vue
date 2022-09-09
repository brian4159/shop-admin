<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><Football /></el-icon>
      小王同学
    </span>
    <el-icon  class="icon-btn" @click="$store.commit('handleAsideWidth')">
      <Fold v-if="$store.state.asideWidth =='250px'" />
    <Expand v-else /></el-icon>
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
import { useFullscreen } from "@vueuse/core";
import {useRepassword ,useLogout} from "~/composables/userManager.js"


const { isFullscreen,toggle } = useFullscreen();
const {form,formRef,formDrawerRef,rules,onSubmit,openRepasswordForm } = useRepassword();
const { handleLogout} = useLogout();

const handleCommand = (c) => {
  switch (c) {
    case "rePassword":
    openRepasswordForm()
     
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