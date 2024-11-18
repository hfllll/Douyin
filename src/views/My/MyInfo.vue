<script setup>
import {ref} from 'vue'
import { useRouter,useRoute } from 'vue-router';

const route = useRoute();
const nickname = route.query.parentNickname||'无'
const items = ref([
  {title:'名字',content: nickname},
  {title:'抖音号',content:'1234jinzhijiaolv'},
  {title:'简介',content:'每晚12:00直播 韩舞业余，专业蹦迪！我的小号@金止蕉绿。这辈子人潮汹涌 遇到你 我很幸运'},
  {title:'性别',content:'女'},
  {title:'生日',content:'20'},
  {title:'所在地',content:'福建·武夷山'},
  {title:'学校',content:'武夷学院'}
])
const router = useRouter();

console.log('MyInfo',nickname);

const goBack = () =>{
  router.push('/my')
}
const avatarSrc = ref('@/assets/my-avatar.jpg'); // 默认头像路径

// 更换头像功能
const changeAvatar = async () => {
  // 创建文件选择器（适用于 Web 项目）
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        avatarSrc.value = reader.result; // 将读取到的图片 URL 赋值给 avatarSrc
      };
      reader.readAsDataURL(file);
    }
  };
  input.click(); // 触发文件选择器
};
const gotoMyInfoItem = () =>{
  router.push('/infoItem')
}
</script>
<template>
  <router-view>
    <div class="container">
      <div class="main">
        <!-- 顶部栏 -->
        <div class="header">
          <span class="header-img" @click="goBack"><img class="header-img-info" src="@/assets/left.png"/></span>
          <span class="header-text">
            <div class="header-text-edit">编辑资料</div>
            <div class="header-text-process">已完成85%</div>
          </span>
        </div>
        <!-- 线 -->
         <div class="line"></div>
        <!-- 头像 -->
         <div class="avatar" @click="changeAvatar">
          <img class="avatar-img" :src="avatarSrc"/>
         </div>
         <div class="avatartext">点击更换头像</div>
         <!-- 基本信息 -->
         <div v-for="(item,index) in items" :key="index">
          <div class="left" >
          <span class="left-title">{{ item.title }}</span>
          <span class="left-name">{{ item.content }}</span>
          <img class="left-icon" src="@/assets/right.png" @click="gotoMyInfoItem"/>
         </div>
         </div>
      </div>
    </div>
  </router-view>
</template>
<style lang="scss">
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
  width: 375rem;
  margin-bottom: 2%;
  &-img {
    float: left;
    width: 20rem;
    height: 8%;
    margin-top: 3%;
    margin-left: 5rem;
    &-info {
      width: 20rem;
      height: 5%;
    }
  }
  &-text {
    margin-top: 2%;
    width: 20rem;
    height: 6%;
    &-edit {
      color: white;
      display: flex;
      justify-content: center;
      font-size: 16rem;
    }
    &-process {
      color: #bababb;
      display: flex;
      justify-content: center;
      font-size: 11rem;
    }
  }
}
.line {
  width: 375rem;
  height: 0.1%;
  background-color: #222330;
}
.avatar {
  margin-top: 35rem;
  border-radius: 50%;
  width: 82rem;
  height: 82rem;
  &-img {
    border-radius: 50%;
    width: 82rem;
    height: 82rem;
  }
}
.avatartext {
  margin: 10rem 144rem 40rem 144rem;
  color: white;
  font-size: 14rem;
}
.left {
  margin: 15rem 0;
  width: 375rem;
  height: 7%;
  position: relative;
  display: flex;
  justify-content: space-between;
  &-title {
    margin: 10rem 0 10rem 10rem;
    font-size: 14rem;
    font-weight: bold;
    color: white;
  }
  &-name {
    margin: 10rem 0;
    position: absolute;
    right: 50rem;
    font-size: 14rem;
    color: #bababb;
    max-width: 200rem;
  }
  &-icon {
    // margin: 0 0 10rem 0;
    position: absolute;
    right: 10rem;
    top: 50%;
    transform: translateY(-50%);
    width: 18rem;
    height: 40%;
  }
}
.info {
  width: 375rem;
  min-height: 10%;
  position: relative;
  display: flex;
  justify-content: space-between;
  &-title {
    margin: 10rem 0 10rem 10rem;
    font-size: 14rem;
    font-weight: bold;
    color: white;
    padding: 20rem 0;
  }
  &-name {
    margin: 10rem 0;
    position: absolute;
    right: 50rem;
    font-size: 14rem;
    color: #bababb;
    max-width: 200rem;
  }
  &-icon {
    margin: 10rem 10rem 10rem 0;
    width: 20rem;
    height: 4%;
  }
}
</style>