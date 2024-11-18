<script setup>
import {ref} from 'vue'
import editName from './components/editName.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter();
const parentNickname = ref('')
const handleNicknameUpdate = (nickname) => {
  parentNickname.value = nickname
}
const flag = ref(false)
const saveContent = () => {
  flag.value = true
}
const backMyInfo = () => {
  if(flag.value === false){
    open()
  }else {
    router.push({path:'/info',query:{parentNickname:parentNickname.value}}) 
    console.log('页面参数',parentNickname.value);
    
  }
}
const open = () => {
  ElMessageBox.confirm(
    '是否保存修改',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '保存成功',
      })
      router.push({path:'/info',query:parentNickname.value})
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消保存',
      })
    })
}
</script>
<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <img class="header-left" src="@/assets/left.png" @click="backMyInfo"/>
        <span class="header-middle">修改名字</span>
        <span class="header-right" @click="saveContent">保存</span>
      </div>
      <div class="line"></div>
      <div class="footer">
        <editName @updateNickname="handleNicknameUpdate"></editName>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #1c2833;
  .main {
    width: 375rem;
    height: 100%;
    background-color: #151724;
  }
}
.header {
  padding: 15rem 0;
  display: flex;
  justify-content: space-between;
  &-left {
    margin: 0 20rem;
    width: 20rem;
    height: 20rem;
  }
  &-middle {
    margin: 0 ;
    font-size: 16rem;
    color: white;
  }
  &-right {
    margin: 0 20rem;
    font-size: 16rem;
    color: #7b223a;
  }
}
.line {
  width: 100%;
  height: 1rem;
  background-color: #1c2030;
}

</style>