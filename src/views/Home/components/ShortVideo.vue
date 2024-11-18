<script setup>
import { ref, defineProps, defineExpose, onMounted, watch,onUnmounted} from 'vue';
import LikeAnimation from '@/components/LikeAnimation.vue';
import eventBus from '@/eventBus';
import { useCounterStore } from '@/stores/counter';
// import { de } from 'element-plus/es/locale';
const videoRefs = ref([]);
const isMuted = ref(true)
const isAnimating = ref(false)
const lastTime = ref(0)
const isPlay = ref(false)
const isDrag = ref(false)
const progressBar = ref(0);
const progressCircle = ref(2)
const isDown = ref(false)
const progressContainer = ref(null)
const rotationAngle = ref(-5)
const rotationId = ref(null)
// const firstClick = ref(false)
// const secondClick = ref(false)
// const delay = 250
// likes并不是存放爱心的数组 而是爱心的指引数组
const likes = ref([])
const likeRefs = ref([])
const counterStore = useCounterStore()
const play = (index, replay) => {
    if (!videoRefs.value[index]) return
    videoRefs.value[index].play()
    // 如果取消静音了
    if (isMuted.value === false)
        videoRefs.value[index].muted = false
    isPlay.value = true
    if (replay){
        // 如果是切换到当前视频 才进行播放的 需要重置进度条
        videoRefs.value[index].currentTime = 0
        // 音乐专辑从0°开始旋转
        rotationAngle.value = 0
        // 同时 爱心动画需要全部清空
        likes.value = []
    }
}
const updateProgress = (e) => {
    const video = e.target
    if (video && video.duration > 0){
        progressBar.value = 100 * (video.currentTime / video.duration)
        progressCircle.value = 2 + (47/50) * progressBar.value
    }
    else console.log('这个视频没有进度条啊');
}
const stop = (index) => {
    if (!videoRefs.value[index]) return
    videoRefs.value[index].pause()
    isPlay.value = false
}
const delayTime = ref(200)
const clickType = ref(1)
const timeId = ref(null)
const togglePlay = (index, e) => {
    if (!props.isTogglePlay) return;
    console.log('播放开关');
    
    if (clickType.value === 1) {
        clickType.value = 2;
        setTimeout(() => {
            if (!timeId.value) {
                // 单击事件
                if (videoRefs.value[index]?.paused) play(index);
                else stop(index);
                clickType.value = 1;
            }
        }, delayTime.value);
    } else {
        addLikes(e);
        clearTimeout(timeId.value); // 确保不会有多个未清理的定时器
        timeId.value = setTimeout(() => {
            clickType.value = 1;
            timeId.value = null;
        }, delayTime.value);
    }
};

const onPointerdown = (e) => {
    e.stopPropagation(); 
    // 这里可以添加其他逻辑，比如开始拖动进度条
    progressContainer.value = e.currentTarget.getBoundingClientRect()
    isDown.value = true
    isDrag.value = true
    // 添加全局监听事件pointermove和pointerup 
    // 避免鼠标超出判定范围就不进行判定
    document.addEventListener('pointermove', onPointermove)
    document.addEventListener('pointerup', onPointerup)
}
const flashProgress = (e) => {
    videoRefs.value[props.currentVideo].currentTime = videoRefs.value[props.currentVideo].duration * (e.clientX - progressContainer.value.left) / progressContainer.value.width
}
const onPointermove = (e) => {
    e.stopPropagation(); // 阻止冒泡

    // 设置防抖50毫秒
    const now = Date.now()
    if (now - lastTime.value < 50) return 
    lastTime.value = now
    if (!isAnimating.value){
        isAnimating.value = true
        requestAnimationFrame(() =>{
            flashProgress(e)
            isAnimating.value = false
        })
    }
}
const onPointerup = (e) =>{
    // e.preventDefault(); // 阻止默认事件
    e.stopPropagation(); 
    // 这里可以添加其他逻辑，比如开始拖动进度条
    isDown.value = false
    isDrag.value = false

    document.removeEventListener('pointermove', onPointermove)
    document.removeEventListener('pointerup', onPointerup)
}
// 控制音乐盒子旋转函数
const beginRotate = () => {
    // 每13.9秒转动一度
    if (rotationId.value) return //避免 点按过快 重复出发暂停
    rotationId.value =  setInterval(() => {
        rotationAngle.value++
    }, 13.9)
}
// 停止音乐盒子旋转函数
const stopRotate = () => {
    clearInterval(rotationId.value)
    rotationId.value = null
}
// 解除静音
const unmuteMusic = (e) =>{
    e.stopPropagation();
    isMuted.value = false
    // 第一次点击无法直接将当前视频接触静音 需要额外解除
    videoRefs.value[props.currentVideo].muted = false
}
// 使小心心变红
const clickLike = (e, oneWay) =>{
    console.log('我是爱心事件');
    
    e.stopPropagation()
    const child = likeRefs.value[props.currentVideo]
    if (child.classList.contains('maskLayer-list-like'))
        child.classList.replace('maskLayer-list-like', 'maskLayer-list-belike')
    else if(!oneWay) child.classList.replace('maskLayer-list-belike', 'maskLayer-list-like')
}
// 成功收藏
const clickCollect = (e) =>{
    e.stopPropagation()
    const child = e.currentTarget.querySelector('.img')
    if (child.classList.contains('maskLayer-list-collect'))
        child.classList.replace('maskLayer-list-collect', 'maskLayer-list-becollect')
    else child.classList.replace('maskLayer-list-becollect', 'maskLayer-list-collect')
}
// 爱心数组消失事件
const removeLike = (index) =>{ 
    likes.value.splice(index, 1) // 移除指定的点赞动画
}
// 添加爱心动画
const addLikes = (e) =>{
    // 得到视频实例 获取视频的left位置进行加减
    const reallyX = e.clientX - videoRefs.value[props.currentVideo].closest('.grandson').getBoundingClientRect().left
    clickLike(e, true)
    likes.value.push({
        x:reallyX,
        y:e.clientY,
        key:Date.now()
    })
}
// 打开评论列表
const showComment = (e) =>{
    e.stopPropagation(); // 防止其他事件干扰
    console.log('打开评论区');
    console.log('currentVideo:', props.currentVideo);
    console.log('videoRefs:', videoRefs.value);
    eventBus.emit('showComment')
    videoRefs.value[props.currentVideo].style.maxHeight = '50%';
}
// 关闭抽屉随着扩大画面的函数
const handleClose = () => {
    console.log('关闭弹窗');
    
    console.log('currentVideo:', props.currentVideo);
    console.log('videoRefs:', videoRefs.value);
    videoRefs.value[props.currentVideo].style.maxHeight = '100%'
}
const props = defineProps({
    isTogglePlay:{
        type:Boolean,
    },
    currentVideo:{
        type: Number
    }
})
// 暴露播放与暂停方法 由父级控制切换的播放
defineExpose({
    play, stop
})
onMounted(() => {
    eventBus.on('close-drawer', handleClose) 
    play(0); // 播放第一个视频
    // 监听close-drawer事件
})
onUnmounted(() => {
    eventBus.off('close-drawer', handleClose);
});
watch([isPlay, isMuted], ()=>{
    if (isPlay.value && !isMuted.value)
        beginRotate()
    else if(!isPlay.value)
        stopRotate()
})
</script>

<template>
    <div class="grandson"
    v-for="(src, index) in counterStore.videoSources"
    @click="togglePlay(index, $event)"
     :key="index">
        <!-- 视频 -->
        <video
            ref="videoRefs"
            loop
            class="video"
            :src="src"
            muted
            playsinline
            webkit-playsinline
            x5-playsinline
            x5-video-player-type="h5"
            x5-video-player-fullscreen="false"
            preload="auto"
            @timeupdate="updateProgress"
            disablepictureinpicture
            controlslist="nodownload nofullscreen"  
        >
        </video>

        <!-- 暂停按键 -->
        <el-icon class="playIcon" size="60" color="#FFF" v-if="!isPlay && !isDrag && props.currentVideo === index">
            <CaretRight />
        </el-icon>

        <!-- 遮罩层 -->
        <div class="maskLayer">
            <!-- 爱心动画组 -->
             <transition-group tag="div" v-if="props.currentVideo === index">
                <LikeAnimation
                v-for="(item, index) in likes"
                :key="item.key"
                @onAnimationEnd="removeLike(index)"
                :X="item.x"
                :Y="item.y"
                :style="{ top:`${item.y}px`, left:`${item.x}px`}"
                >
                </LikeAnimation>
             </transition-group>
            <!-- 进度条 -->
            <div class="progress"
            @pointerdown="onPointerdown" 
            v-if="!isPlay && props.currentVideo === index" >
                <div 
                :style=" { 
                    background:`linear-gradient(to right, #FFFFFF ${progressBar}% ,#8D9095 ${progressBar}%)`, 
                    height: isDown ? '10rem' : '4rem' 
                    }"
                class="progress-line" >
                </div>
            </div>
            <!-- 小圆标 -->
            <div class="circle"
                v-if="!isPlay && props.currentVideo === index"
                :style="{
                    left: `${progressCircle}%`,
                    scale: isDown ? '2' : '1' 
                    }"
            ></div>
            <!-- 标题与简介 -->
             <div class="maskLayer-title">
                <h3>@我是香香🐂🍺</h3>
                <p>你说爱像云 要自在飘浮才美丽</p>
             </div>
             <!-- 左侧按钮 -->
             <div class="maskLayer-list">
                <!-- 头像 点赞 评论 收藏 转发 静音与音乐封面 -->
                <div class="maskLayer-list-avatar box"></div>
                <div class="box" @click="clickLike($event, false)">
                    <div 
                    ref="likeRefs"
                    class="img maskLayer-list-like">
                   </div>
                   123.5w
                </div>
                <div class="box" 
                    @click.stop="showComment">
                    <div class="maskLayer-list-comment img">
                    </div>
                    5.7w
                </div>
                 <div class="box" @click="clickCollect">
                     <div class="maskLayer-list-collect img">
                     </div>
                     30.2w
                 </div>
                 <div class="box">
                    <div class="maskLayer-list-forward img">
                    </div>
                    123.5w
                 </div>
                 <div
                 v-if="isMuted"
                  :class="['maskLayer-list-music', 'box', 'loadingAnimation']" 
                  @click="unmuteMusic">
                  </div>
                 <div 
                 v-else
                 :class="['maskLayer-list-music', 'cover', 'box']" 
                 :style="index === props.currentVideo ? { transform: `rotate(${rotationAngle}deg)` } : {}">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
.grandson {
    color: white;
    width: 375rem;
    height: 25%;
    // align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
.video {
    // justify-self: flex-start;
    max-width: 100%; /* 限制最大宽度 */
    max-height: 100%; /* 限制最大高度 */
    width: auto; /* 根据高度调整宽度 */
    height: auto; /* 根据宽度调整高度 */
    object-fit: contain; /* 完整展示视频内容 */
    background-color: black; /* 防止黑边影响体验 */
    -webkit-user-select: none; /* 禁止长按触发默认交互 */
    -webkit-tap-highlight-color: transparent; /* 移除点击高亮 */
    touch-action: manipulation; /* 防止浏览器手势操作干扰 */

    transition: max-height 0.5s ease
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
        &-list{
            position: absolute;
            right: 10rem;
            bottom: calc(var(--vh, 1vh) * 2 );
            gap: calc(var(--vh, 1vh) * 4 );
            display: flex;
            justify-content: left;
            flex-direction: column;
            align-items: end;
            font-size: calc(var(--vh, 1vh) * 2 );
            &-music {
                // background-image: url('/src/assets/静音.png');
                background-size: 50%;
                background-repeat: no-repeat;
                background-color: white;
                background-position: center;
                border-radius: calc(var(--vh, 1vh) * 7 );
            }
            &-music.cover{
                background-size: contain; // 图片居中显示
                background-image: url('/public/images/by2歌曲封面.jpg');
            }
            &-avatar{
                border: 2rem solid white;
                border-radius: 50%;
                background-image: url('/public/images/健身头像.jpg');
                background-size: contain; // 图片居中显示
            }
            &-like{
                background-image: url('/src/assets/爱心.png');
            }
            &-belike{
                background-image: url('/src/assets/爱心1.png');
            }
            &-comment{
                z-index: 3;
                background-image: url('/src/assets/评论.png');
            }
            &-collect{
                background-image: url('/src/assets/收藏.png');
            }
            &-becollect{
                background-image: url('/src/assets/收藏1.png');
            }
            &-forward{
                background-image: url('/src/assets/转发.png');
            }
            .loadingAnimation{
                background-image: url('/src/assets/静音.png');
                animation: loadingAnimation 2s ease forwards;
            }
            @keyframes loadingAnimation {
                0%{
                    width: calc(var(--vh, 1vh) * 14 );
                }
                50%{
                    width: calc(var(--vh, 1vh) * 14 );
                }
                100%{
                    width: calc(var(--vh, 1vh) * 7 );

                }
            }
            .box{
                height: calc(var(--vh, 1vh) * 7 );
                width: calc(var(--vh, 1vh) * 7 );
                line-height: calc(var(--vh, 1vh) * 3);
                cursor: pointer;
            }
            .img{
                background-position: center; // 使图片覆盖整个容器
                background-repeat: no-repeat;
                background-size: contain; // 图片居中显示
                width: 80%; 
                height: 80%;
            }
        }
        &-title{
            position: absolute;
            bottom: 0rem;
            left: 8rem;
            text-align: left;
            p{
                font-size: 12rem;
                line-height: 14rem;
                height: 25rem;
            }
            h3{
                line-height: 1rem;
                height: 16rem;
                font-size: 15rem;
            }
        }
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
            z-index: 3;
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
            transition: scale 0.2s ease
        }
    }
}
</style>
