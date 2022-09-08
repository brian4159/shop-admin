import { showModal,toast } from "~/composables/util.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref,reactive } from 'vue'
import { logout ,updatepassword } from "~/api/manager.js";


export function useRepassword(){
    
    const router = useRouter();
    const store = useStore();
    const formRef = ref(null)  
    const formDrawerRef=ref(null)
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
  const openRepasswordForm = ()=> formDrawerRef.value.open()
  
    return{
      form,formRef,formDrawerRef,rules,onSubmit,openRepasswordForm 
    }
  }

export function useLogout(){
    const router = useRouter();
    const store = useStore(); 
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
      return {handleLogout}
}