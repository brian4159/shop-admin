import { ElNotification,ElMessage, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'


//消息提示
export function toast(message,type='success',dangerouslyUseHTMLString = true){
    ElNotification({
        message,
         type,
         dangerouslyUseHTMLString,
        duration:3000
    })
}

export function showModal(content="提示内容",type="warning",title=""){
    return ElMessageBox.confirm(
    content,title,
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type,
        }
      )    
}

export function showFullLoading(){
        nprogress.start()          
}
export function hiddenFullLoading(){
        nprogress.done()          
}
