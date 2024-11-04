<script setup>
import { ref, defineProps, defineExpose, onMounted} from 'vue';
const videoRefs = ref([]);
const isPlay = ref(false)
const progressBar = ref(0);
const progressCircle = ref(2)
const videoSources = [
    "/videos/抖音2024113-021964.mp4",
    "/videos/抖音2024113-295887.mp4",
    "/videos/抖音2024113-291746.mp4",
    "/videos/抖音2024113-853385.mp4",
];
const play = (index) =>{
    if (!videoRefs.value[index]) return
    videoRefs.value[index].play()
    isPlay.value = true
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
        <div class="maskLayer">
            <div class="progress"
            v-if="!isPlay"
             :style=" { background:`linear-gradient(to right, #FFFFFF ${progressBar}% ,#8D9095 ${progressBar}%)` }" >
            </div>
            <div class="circle" 
            v-if="!isPlay"
            :style="{ left: `${progressCircle}%` }"
            ></div>
        </div>
    </div>
</template>

<style lang="scss"> 
.grandson {
    color: white;
    width: 400px;
    height: 94vh;
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    .video {
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
            width: 94%;
            height: 0.6vh;
            border-radius: 5px;
            position: absolute;
            bottom: 1.2%;
            left: 3%;
        }
        .circle{
            width: 0.5vw;
            border-radius: 50%;
            height: 1vh;
            background-color: white;
            position: absolute;
            bottom: 1%;
            left: 3%;
        }
    }
}
</style>
