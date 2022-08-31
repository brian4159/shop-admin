<template>
    <div>
        后台首页
        <el-button @click="addCount">{{count }}</el-button>
        <el-button type="primary" @click="addFormCount">{{form.count }}</el-button>
    </div>
</template>
<script setup>
    import { ref ,reactive}  from 'vue'
     let count = ref(1);
    let form = reactive({
        count:2
    })

     function addCount(){
        console.log(count.value ++)
     }
     function addFormCount(){
        console.log(form.count ++)
     }
</script>