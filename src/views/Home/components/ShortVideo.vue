<script setup>
import { ref, defineProps, defineExpose, onMounted} from 'vue';
const videoRefs = ref([]);
const isPlay = ref(false)
const progressBar = ref(0);
const progressCircle = ref(2)
const isDown = ref(false)
const videoSources = [
    "/videos/抖音2024113-021964.mp4",
    "/videos/抖音2024113-295887.mp4",
    "/videos/抖音2024113-291746.mp4",
    "/videos/抖音2024113-853385.mp4",
];
const play = (index, replay) =>{
    if (!videoRefs.value[index]) return
    videoRefs.value[index].play()
    isPlay.value = true
    if (replay){
        videoRefs.value[index].currentTime = 0
    }
}
const updateProgress = (e) =>{
    const video = e.target
    if (video && video.duration > 0){
        progressBar.value = 100 * (video.currentTime / video.duration)
        progressCircle.value = 2 + (47/50) * progressBar.value
    }
    else
        alert('这个视频没有进度条啊');
}
const stop = (index) =>{
    if (!videoRefs.value[index]) return
    videoRefs.value[index].pause()
    isPlay.value = false
}
const togglePlay = (index) => {
    if (!props.isTogglePlay) return
    if (videoRefs.value[index].paused) play(index)
    else stop(index)
}
const onPointerdown = (e) => {
    console.log('Pointer down event triggered');
    e.preventDefault(); // 阻止默认事件
    e.stopPropagation(); 
    // 这里可以添加其他逻辑，比如开始拖动进度条
    isDown.value = true
}
const onPointermove = (e) => {
    if ( isDown.value ){
        e.preventDefault(); // 阻止默认事件
    e.stopPropagation(); 
    // 这里可以添加其他逻辑，比如开始拖动进度条
        console.log('移动');
    }
}
const onPointerup = (e) =>{
    e.preventDefault(); // 阻止默认事件
    e.stopPropagation(); 
    // 这里可以添加其他逻辑，比如开始拖动进度条
    isDown.value = false
}
const props = defineProps({
    isTogglePlay:{
        type:Boolean,
    },
    currentVideo:{
        type: Number
    }
})
// 计算进度条的值
defineExpose({
    play, stop
})
onMounted(() => {
    play(0); // 播放第一个视频或指定的视频
})
</script>

<template>
    <div class="grandson"
    v-for="(src, index) in videoSources"
    @click="togglePlay(index)"
     :key="index">
        <video
            ref="videoRefs" 
            loop
            class="video"
            :src="src" 
            muted
            @timeupdate="updateProgress"
        ></video>
        <el-icon class="playIcon" size="60" color="#FFF" v-if="!isPlay">
            <CaretRight />
        </el-icon>
        <div class="maskLayer" >
            <div class="progress"
            @pointerdown="onPointerdown" 
            @pointerup="onPointerup" 
            @pointermove="onPointermove" 
            v-if="!isPlay">
                <div 
                :style=" { 
                    background:`linear-gradient(to right, #FFFFFF ${progressBar}% ,#8D9095 ${progressBar}%)`, 
                    height: isDown ? '10rem' : '4rem' 
                    }"
                class="progress-line" >
                </div>
            </div>
            <div class="circle" 
            v-if="!isPlay"
            :style="{ 
                left: `${progressCircle}%`,
                scale: isDown ? '10rem' : '4rem' 
                }"
            ></div>
        </div>
    </div>
</template>

<style lang="scss"> 
.grandson {
    color: white;
    width: 375rem;
    height: 25%;
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    .video {
        // 设置最大宽高 实现自缩放
        max-width: 100%;
        max-height: 100%;
        height: auto;
        width: auto;
        object-fit: contain;
    }
    .playIcon {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1);
    }
    .maskLayer{
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        // background-color: red;
        .progress{
            &-line{
                border-radius: 5rem;
                width: 100%;
                transition: height 0.2s ease;
            }
            width: 94%;
            height: 20rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: -4rem;
            left: 3%;
            cursor: pointer;
        }
        .circle{
            width: 6rem;
            border-radius: 50%;
            height: 6rem;
            background-color: white;
            position: absolute;
            bottom: 3rem;
            left: 3%;
        }
    }
}
</style>
