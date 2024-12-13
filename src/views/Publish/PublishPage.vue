<template>
  <div>
    <!-- 视频文件上传输入框 -->
    <video ref="videoEle" src="/videos/抖音2024113-909771.mp4" @canplay="getVideoThumbnail" :style="{'display':'none'}"></video>

    <!-- 显示视频封面 -->
    <img v-if="thumbnailUrl" :src="thumbnailUrl" alt="Video Thumbnail" class="video-cover-img" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const thumbnailUrl = ref(null);
const videoEle = ref(null)
const getVideoThumbnail = () => {
   // 获取视频元素
   const video = videoEle.value

   // 设置到视频的1秒时获取封面图
   video.currentTime = 0.1; 

   // 创造画布元素 获取2d
   const canvas = document.createElement('canvas');
   const context = canvas.getContext('2d');

   // 设置画布和视频的宽高英语
   canvas.width = video.videoWidth
   canvas.height = video.videoHeight

   // 绘制视频的当前帧
   context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); 

   // 获取图片的base64编码
   const thumbnail = canvas.toDataURL('image/png'); // 获取图片的base64编码

   // 赋值给字符变量
   thumbnailUrl.value = thumbnail
};
</script>

<style scoped>
.video-cover-img {
  width: 300rem;
  height: auto;
}
</style>
