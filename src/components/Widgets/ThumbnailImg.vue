<template>
  <!-- 显示视频封面 -->
  <img 
    v-if="thumbnailUrl" 
    :src="thumbnailUrl" 
    class="video-cover-img"
    alt="Video Thumbnail" />
</template>

<script setup>
import { ref, defineProps, onMounted, defineExpose } from 'vue';

const props = defineProps({
    videoSrc: {
        type: String,
        default: '/videos/抖音2024113-909771.mp4'
    }
});

const thumbnailUrl = ref(null);
const video = document.createElement('video')

const update = (totime) =>{
    // 把他变成totime
    video.currentTime = totime;
}
const getVideoThumbnail = () => {
    // 为了防止加载没完成导致各种错误 使用seeked函数 代表成功跳转到合适的时间点后触发的函数
    video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        // 设置画布和视频的宽高
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // 绘制视频的当前帧
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        thumbnailUrl.value = canvas.toDataURL('image/png'); // 获取图片的base64编码    
    });
};
// 向外暴露更新缩略图的方法
defineExpose({
    update
})
onMounted(()=>{
    video.src = props.videoSrc
    getVideoThumbnail()
    update(0.01)
})
</script>

<style scoped>
.video-cover-img {
  -webkit-user-drag: none; /* 禁止拖动虚影 */
  user-select: none;
}
</style>
