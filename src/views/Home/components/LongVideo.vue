<template>
    <div class="body">
        <!-- 顶部tab栏固钉部分 -->
        <div class="affix-area" :style="{ position: 'fixed' }">
        </div>
        <div class="affix-area">
        </div>

        <!-- 页面主体 -->
        <div class="container">
            <div class="video">
                <video
                    ref="videoRef"
                    preload="auto"
                    autoplay
                    loop
                    muted
                    playsinline="true"
                    @error="handleVideoError"
                    @loadeddata="handleVideoLoaded"
                    src="https://www.w3schools.com/html/mov_bbb.mp4">
                </video>
                <div class="options">
                    <div class="options-item">
                        <img src="/images/home/icon_like.png" alt="">
                    </div>
                    <div class="options-item">
                        
                    </div>
                    <div class="options-item">
                        
                    </div>
                </div>
            </div>
            <AncientBeautyGallery></AncientBeautyGallery>
            <AncientBeautyGallery></AncientBeautyGallery>
            <AncientBeautyGallery></AncientBeautyGallery>
            <AncientBeautyGallery></AncientBeautyGallery>
            <AncientBeautyGallery></AncientBeautyGallery>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AncientBeautyGallery from '@/components/Widgets/AncientBeautyGallery.vue'

const videoRef = ref(null)

const handleVideoError = (e) => {
    console.error('视频加载失败:', e)
}

const handleVideoLoaded = () => {
    console.log('视频加载成功')
    videoRef.value?.play()
        .catch(err => console.error('自动播放失败:', err))
}

onMounted(() => {
    // 确保视频组件已经挂载
    if (videoRef.value) {
        videoRef.value.load()
    }
})
</script>

<style lang="scss">
.affix-area {
    top: 0;
    z-index: 100;
    width: 375rem;
    height: calc(var(--vh, 1vh) * 6);
    background: #151724;
     box-shadow: 0 2rem 10rem rgba(0,0,0,0.2);
}

.video{
    height: 220rem;
    video{
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    }
}

.container{
    background-color: black;
}
</style>