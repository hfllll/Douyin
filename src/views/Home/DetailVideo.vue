<template>
<div class="container " >
    <!-- father相当于视窗 -->
    <div class="father">
        <!-- 中间视频区 -->
        <div 
            @pointerdown.stop="slideStart"
            @pointerup="slideEnd"
            @pointermove="slideMove"
            ref="videoArea"
            class="video-area">
            <!-- 视频列表 -->
             <!-- 在确认切换下一个视频的时候 让视频跟着滚起来 滚到当前的页面 这样就可以实现一个video标签和一堆photo配合使用了 -->
             <!-- 这是视频 -->
             <div 
                :style="{'zIndex':`${zIndex}`}"
                class="video-container">
                <video
                    @pause="showImg"
                    @play="hiddenImg"
                    :src=videoSrc
                    ref="videoItem"
                    preload="auto"
                    loop
                    muted
                    autoplay
                    class="cover-video"
                    @click="pauseVideo"
                ></video>
            </div>
            <div class="video-list">
                <div 
                    class="video-item" 
                    ref="coverOne">
                    <!-- 这是这遮罩层 -->
                    <MaskLayer @unMuted="onUnMuted" 
                        @click="pauseVideo"   
                        class="mask">
                    </MaskLayer>
                    <!-- 这才是图片 -->
                    <ThumbnailImg                      
                        @click="playVideo"
                        class="cover-img" 
                        :videoSrc="'/videos/抖音2024113-280908.mp4'"
                    ></ThumbnailImg>
                    <!-- 这是暂停动画 -->
                    <PauseAnimation v-if="isPlay" class="pauseMation"></PauseAnimation>
                </div>
                <div 
                    class="video-item" 
                    ref="coverTwo">
                    <MaskLayer @unMuted="onUnMuted" 
                        @click="pauseVideo"
                        class="mask">
                    </MaskLayer>
                    <!-- 图片 -->
                    <ThumbnailImg
                        @click="playVideo"
                        :video-src="'/videos/抖音2024113-291746.mp4'"
                        class="cover-img"
                        ref="thumbnailRef"
                    ></ThumbnailImg>
                    <PauseAnimation v-if="isPlay" class="pauseMation"></PauseAnimation>
                </div>
                <div 
                    class="video-item" 
                    ref="coverThree">   
                    <MaskLayer @unMuted="onUnMuted" class="mask"></MaskLayer>
                    <ThumbnailImg
                        @click="playVideo"
                        :video-src="'/videos/抖音2024113-909771.mp4'"
                        class="cover-img">
                    </ThumbnailImg>
                    <PauseAnimation v-if="isPlay" class="pauseMation"></PauseAnimation>
                </div>
            </div>
        </div>
        
        <!-- 底部输入框区 -->
        <div class="input-area">
            <InputItem :color="'#1D1D1D'" :text="'留下你的足迹吧'" ></InputItem>
        </div>
        <!-- 顶部功能区 -->
        <el-row class="search-area">
            <!-- 返回标志 -->
            <el-col :span="3" class="return-box" @click="router.back">
                <img src="@/assets/左.png" class="search-img" alt="">
            </el-col>
            <!-- 搜索栏 -->
            <el-col :span="20" class="search-box" @click="router.push('/search')">
                <img src="@/assets/my-search.png" alt="">
                <span>搜你想看的</span>
                <span class="text"><el-divider direction="vertical" />搜索</span>
            </el-col>
            <!-- 占位符 -->
            <el-col :span="1"></el-col>
        </el-row>
        <!-- 评论区 -->
        <CommentArea :style="{'zIndex':'3'}"></CommentArea>
    </div>
</div>
</template>

<script setup>
import {  onMounted, ref } from 'vue'
import InputItem from '@/components/Widgets/InputItem.vue';
import ThumbnailImg from '@/components/Widgets/ThumbnailImg.vue';
import MaskLayer from '@/components/Widgets/MaskLayer.vue';
import CommentArea from '@/components/CommentArea.vue';
import PauseAnimation from '@/components/Animations/PauseAnimation.vue';
import router from '@/router';

const isPlay = ref(false)
const videoArea = ref(null)
const isDown = ref(false)
const coverOne = ref(null)
const coverTwo =ref(null)
const coverThree =ref(null)
const videoItem = ref(null)
const thumbnailRef = ref(null)
const videoSrc = ref('/videos/抖音2024113-291746.mp4')
const tempY = ref(0)
const zIndex = ref(2)
const sY = ref()
const videoIndex = ref(2)
const videoHeight = ref(0)
let observer = null; // 定义 observer 变量
// 视频播放函数
const playVideo = () =>{
    console.log('被播放了');
    isPlay.value = false
    videoItem.value.play()
}
const onUnMuted = () =>{
    videoItem.value.muted = false
}
const pauseVideo = () =>{
    console.log('被暂停了');
    isPlay.value = true
    videoItem.value.pause()
}
const showImg = () =>{
    zIndex.value = -1
}
const hiddenImg = () =>{
    zIndex.value = 2
}
// 监听多个元素，选择性地观察
const createObserver = (target) => {
    // 这是回调函数
    
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 目标元素进入视口时，修改z-index
                switch(videoIndex.value){
                    case 1: videoSrc.value = '/videos/抖音2024113-280908.mp4'
                         break
                    case 2: videoSrc.value = '/videos/抖音2024113-291746.mp4'
                         break
                    case 3: videoSrc.value = '/videos/抖音2024113-909771.mp4'   
                         break
                }
                playVideo()
                
                observer.disconnect()  // 停止观察
            }
        })
    }, {
        // 设置观察条件
        threshold: 0.999 // 50% 进入视口时触发
    })

    observer.observe(target)  // 监听传入的 target 元素
}
// 这玩意得绑在滚动容器上
const scrollVideo = () =>{
    // 如果画出范围了 还是滚到第一个视频
    if (videoIndex.value < 1) {
        videoIndex.value = 1
        return
    }
    if (videoIndex.value > 3){
         videoIndex.value = 3
         return
    }
    let videoRef = null
    switch(videoIndex.value){
        case 1: videoRef = coverOne.value
            break
        case 2: videoRef = coverTwo.value
            break
        case 3: videoRef = coverThree.value
            break
        default: return
    }
    // videoSrc.value = '/videos/抖音2024113-291746.mp4'
    videoRef.scrollIntoView({
        behavior:'smooth',
        block:'center',
        inline:'center'
    })
    // console.log(videoRef);
    
    // 延迟调用createObserver，确保scrollIntoView完成
    createObserver(videoRef)
    
}
const slideStart = (e) =>{
    // 获取一个视频页面的高度
    // pauseVideo()
    isDown.value = true
    // 标记起始点
    tempY.value = sY.value = e.clientY
}
const slideMove = (e) =>{
    if (!isDown.value) return
    if (!videoItem.value.paused) videoItem.value.pause()
    const gap = tempY.value - e.clientY
    // 算出每次移动的百分比再除以3
    // const percent =  100 * gap / videoHeight.value
    videoArea.value.scrollTop += gap
    tempY.value = e.clientY
}
const slideEnd = (e) =>{
    isDown.value = false
    const gap = e.clientY - sY.value
    if (!gap) return // 如果只是一次点击 则不执行函数
    const percent = 100 * gap / videoHeight.value
    // 如果是向上滚动并超过阈值 则进入上一个视频
    if (percent > 15) videoIndex.value--
    // 如果是向下滚动并超过阈值 则进入下一个视频
    if (percent < -15) videoIndex.value++
    scrollVideo()
}
onMounted(() =>{
    videoHeight.value = coverTwo.value.offsetHeight
    videoArea.value.scrollTop = videoHeight.value
})
</script>

<style lang="scss" scoped>
.container{
    touch-action: none;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    background-color: #1c2833;
    .father{
        width: 375rem;
        height: calc(var(--vh, 1vh) * 100);;
        margin: 0 auto;
        position: relative;
    }

    .video-area{
        .pauseMation{
            position: absolute;
            z-index: 2;
            top: 301rem;
            right: 155rem;
            transform: translate(50%, -50%);
        }
        .video-container{
            position: fixed;
            top: 0rem;
            // left: 0rem;
            width: 375rem;
            height: calc(var(--vh, 1vh) * 92);
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
            .cover-video{
                max-width: 375rem;
                max-height: calc(var(--vh, 1vh) * 92);
            }
        }
        // width: 375rem;
        position: relative; // 开启定位 用于视频video的固定定位
        overflow: hidden;
        height: calc(var(--vh, 1vh) * 92);
        .video-list{
            height: calc(var(--vh, 1vh) * 92*3);
            background-color: black;
            .video-item{
                height: calc(var(--vh, 1vh) * 92);
                width: 375rem;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                .mask{
                    position: absolute;
                    z-index: 2;
                    top: 0;
                    color: white;
                }
                .cover-img{
                    max-width: 375rem;
                    max-height: calc(var(--vh, 1vh) * 92);
                }
            }
        }
    }
    .input-area{
        background-color: black;
        height:  calc(var(--vh, 1vh) * 8);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-area{
        width: 375rem;
        height: 5vh;
        position: absolute;
        z-index: 2;
        top: 10rem;
        left: 0;
        .search-box{
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 7rem;
            align-items: center;
            display: flex;
            font-size: 15rem;
            color: #A3A6AD;
            img{
                margin: 0 4rem 0 10rem;
                width: 18rem;
                height: 18rem;
            }
            .text{
                margin-left: 150rem;
                font-weight: 500;
                color: #CFD3DC;
            }
        }
        .return-box{
            justify-content: center;
            align-items: center;
            display: flex;
            img{
                width: 16rem;
                height: 14rem;
            }
        }
    }
}
</style>
