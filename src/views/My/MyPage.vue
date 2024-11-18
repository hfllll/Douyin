
<script setup>
import {ref} from 'vue';
import BottomTabBar from '@/components/BottomTabBar.vue';
import { useRouter } from 'vue-router';
const setStatus = (status) => {
  selectedStatus.value = status
}
const selectedStatus = ref('作品')
const videoSources = [
    "/videos/抖音2024113-021964.mp4",
    "/videos/抖音2024113-295887.mp4",
    "/videos/抖音2024113-291746.mp4",
    "/videos/抖音2024113-853385.mp4",
];
const videoRefs = ref([])
const router = useRouter();
const editInfo = () =>{
  router.push('/info')
}
</script>
<template>
  <router-view>
    <div class="container">
      <div class="main">
        <!-- 上部分 -->
        <div class="header">
          <img
            class="bgc"
            src="@/assets/my.jpg"
            mode="scaleToFill"
          />` `
          <!-- 导航栏 -->
          <div class="navigate">
            <div @click="editInfo" class="navigate-edit">
              <img src="@/assets/my-edit.png" class="navigate-edit-icon"/>
              <div class="navigate-edit-text">编辑资料</div>
            </div>
            <div class="navigate-icon">
              <img class="icons" src="@/assets/my-right.png"/>
              <img class="icons" src="@/assets/my-people.png"/>
              <img class="icons" src="@/assets/my-search.png"/>
              <img class="icons" src="@/assets/my-menu.png"/>
            </div>
            <div class="navigate-avatar">
              <div class="navigate-avatar-img">
                <img class="avatarimg" src="@/assets/my-avatar.jpg"/>
              </div>
            </div>
            <div class="navigate-info">
              <div class="navigate-info-name">5G学高数</div>
              <div class="navigate-info-id">
                <div class="id">抖音号：12345douyin</div>
                <img class="ecode" src="@/assets/my-ercode.png"/>
              </div>
            </div>
          </div>
        </div>
         <!-- 弹出层 -->
        <div class="popup">
          <!-- 获赞 朋友 关注 粉丝 -->
           <div class="popup-container">
            <span class="fans">
              <div class="fans-text">124</div>
              <div class="fans-item">获赞</div>
            </span>
            <span class="fans">
              <div class="fans-text">3778</div>
              <div class="fans-item">朋友</div>
            </span>
            <span class="fans">
              <div class="fans-text">3778</div>
              <div class="fans-item">关注</div>
            </span>
            <span class="fans">
              <div class="fans-text">173.5万</div>
              <div class="fans-item">粉丝</div>
            </span>
            <button class="button">添加朋友</button>
           </div>
          <!-- 个人简介 -->
           <div class="context">
            <div class="context-info">每晚12:00直播 韩舞业余，专业蹦迪！</div>
            <div class="context-info">我的小号@金止蕉绿</div>
            <div class="context-info">商务V：Joymedia7</div>
            <div class="context-info">这辈子人潮汹涌 遇到你 我很幸运</div>
           </div>
           <!-- 年龄 地址 -->
            <div class="area">
              <span class="area-age">
                <img v-if="true" class="area-age-img" src="@/assets/girl.png"/>
                <img v-else class="area-age-img" src="@/assets/boy.png"/>
                <span class="area-age-info">27岁</span>
              </span>
              <span class="area-address">广东·珠海</span>
            </div>
          <!-- 抖音商城 我的音乐 我的群聊 查看更多 -->
           <div class="extra">
            <span class="extraItem">
              <img class="extraItem-img" src="@/assets/shoppingcar.png"/>
              <div class="extraItem-info">抖音商城</div>
            </span>
            <span class="extraItem">
              <img class="extraItem-img" src="@/assets/music.png"/>
              <div class="extraItem-info">我的音乐</div>
            </span>
            <span class="extraItem">
              <img class="extraItem-img" src="@/assets/contact.png"/>
              <div class="extraItem-info">我的群聊</div>
            </span>
            <span class="extraItem">
              <img class="extraItem-img" src="@/assets/more.png"/>
              <div class="extraItem-info">查看更多</div>
            </span>
           </div>
           <!-- 作品 私密 喜欢 收藏 -->
           <div class="status">
            <span :class="['status-item',{ active:selectedStatus==='作品'}]" @click="setStatus('作品')">作品</span>
            <span :class="['status-item',{ active:selectedStatus==='私密'}]" @click="setStatus('私密')">私密</span>
            <span :class="['status-item',{ active:selectedStatus==='喜欢'}]" @click="setStatus('喜欢')">喜欢</span>
            <span :class="['status-item',{ active:selectedStatus==='收藏'}]" @click="setStatus('收藏')">收藏</span>
          </div>
          <!-- 作品 -->
           <div class="works" v-for="(src,index) in videoSources" :key="index">
              <vedio ref="videoRefs" loop muted class="works-vedio" :src="src"></vedio>
           </div>
        </div>
        
         
         <!-- 底部导航栏 -->
         <BottomTabBar class="bottom"></BottomTabBar>
      </div>
    </div>
  </router-view>
</template>
<style lang="scss" scoped>
.container {
  
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #1c2833;
  .main {
    margin: 0 auto;
    width: 375rem;
    height: 100%; 
    position: relative;
  }
}
.bgc {
  width: 375rem;
  height: 20%;
}
// 导航栏 头像
.navigate {
  width: 375rem;
  padding: 1% 5rem;
  position: absolute;
  left: 0;
  top: 2%;
  &-edit {
    width: 100rem;
    height: 5%;
    background:rgba(0,0,0,0.1);
    display: flex;
    padding: 4px;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
    margin: 0;
    float: left;
    &-icon {
      width: 16rem;
      height: 4%;
      float: left;
    }
    &-text {
      font-size: 15rem;
      color: white;
    }
  }
  &-icon {

    // margin-left: 100rem;
  }
  &-avatar {
    margin-top: 3%; 
    float: left;
  }
  &-info {
    height: 90rem;
    // display: flex;
    flex-direction: column;
    vertical-align: middle;
    position:absolute;
    left: 110rem;
    margin-left:2rem;
    text-align: left;
    &-name {
      // line-height: 10%;
      font-size: 16rem;
      color: white;
      margin-top: 3em;
    }
    &-id {
      margin-top: 4rem;
    }
  }
}
.icons {
  width: 30rem;
  height: 8%;
  padding: 4px;
  // margin-right: 5rem;
  border-radius: 50%;
  background: rgba(0,0,0,0.1);
}
.icons:nth-child(1) {
  margin-left: 100rem;
  margin-right: 8rem;
}
.icon:nth-child(4){
  margin-right: 0;
}
.icon:nth-child(3){
  margin-right: 8rem;
}
.icon:nth-child(2){
  margin-right: 8rem;
}
.avatarimg {
  width: 100rem;
  height: 26.6%;
  border-radius: 50%;
  border: 2px solid #000;
}
.id {
  font-size: 14rem;
  color: #babec7;
  float: left;
}
.ecode {
  margin-top: 4rem;
  margin-left: 6rem;
  width: 11rem;
  height:11rem;
}
//弹出层
.popup {
  position: absolute;
  top: 200rem;
  width: 375rem;
  min-height: 70%;
  border: 1px solid #000;
  border-radius: 20px 20px 0 0;
  padding: 1em 0 0 0;
  background-color: #151724;
}
.fans {
  margin-top: 10rem;
  float: left;
  width: 62rem;
  height: 15%;
  &-text {
    color: white;
    font-weight: bold;
    font-size: 15rem;
    text-align: center;
  }
  &-item {
    color: #b2b2b3;
    font-size:15rem;
    text-align: center;
  }
}
.button {
  margin-top: 14rem;
  background-color:#3a3a46;
  width: 90rem;
  height: 2.5em;
  border-radius: 6px;
  color: white;
  margin-left: 25rem;
  font-size: 15rem;
}
// 个人简介
.context {
  margin-left: 16rem;
  margin-top: 5%;
  &-info {
    color: #b2b2b3;
    font-size: 13rem;
  }
}
// 年龄 地址
.area {
  margin-left: 16rem;
  margin-top: 3%;
  // line-height: 1em;
  color: #b2b2b3;
  &-age {
    border-radius: 5px;
    background-color: #3a3a46;
    padding:12rem;
    line-height:13rem;
    &-img {
      width: 12rem;
      height: 12rem;
    }
    &-info {
      margin-left: 4rem;
      font-size: 14rem;
    }
  }
  &-address {
    margin-left: 0.6em;
    border-radius: 5px;
    padding: 0.3em;
    background-color: #3a3a46;
    font-size: 14rem;
  }
}
// //抖音商城 我的音乐 我的群聊 查看更多

.extraItem {
  margin-bottom: 20rem;
  margin-top: 6rem;
  width: 93rem;
  height: 10%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &-img {
    width: 24rem;
    height: 6.4%;
  }
  &-info {
    margin-top: 0.5em;
    color: #808080;
    font-size: 12rem;
  }
}
// //作品 私密 喜欢 收藏
.status {
  margin-bottom: 10rem;
  &-item {
    width: 93rem;
    height: 15%;
    padding: 8rem 29rem 8rem 29rem;
    color: white;
    font-size: 17rem;
    font-weight: bold;
  }
}
.active {
  border-bottom:2px solid #ffd700;
}
// 作品视频
.works {
  margin: 0;
  width: 125rem;
  height: 6vh; 
  background-color: green;
  
}
.works-vedio {
    width: 125rem;
    height: 6vh;
  }
.bottom {
  width: 375rem;
  height: 7vh;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>

