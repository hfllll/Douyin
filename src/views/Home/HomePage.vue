<script setup>
import _ from 'lodash'
import  { ref, onMounted, computed } from 'vue'
import ShortVideo from './components/ShortVideo.vue';
import BottomTabBar from '@/components/BottomTabBar.vue';
import CommentArea from '@/components/CommentArea.vue';
import { useCounterStore } from '@/stores/counter';
import BloggerHome from '@/components/BloggerHome.vue';
import BadgeItem from '@/components/Widgets/BadgeItem.vue';
import ExperiencePage from './components/ExperiencePage.vue';
import DetailGoods from '@/components/DetailGoods.vue';
import LongVideo from './components/LongVideo.vue'
import eventBus from '@/eventBus';
const counterStore = useCounterStore()
const currentPage = ref(counterStore.homePageIndex)
const currentVideo = ref(0)
const videoHeight = ref(0)
const translateX = ref(-(counterStore.homePageIndex - 1) * 50 / 3)
const bigTranslateX = ref(-25.92)
const fatherRef = ref(null)
// const bigTranslateX = ref(0)
const isDown = ref(false)
const currentX = ref(0)
const currentY = ref(0)
const startX = ref(0)
const startY = ref(0)
const prevTX = ref(0)
const prevTY = ref(0)
const time = ref(0)
const witchWay =ref(false) // 界面切换方向
const topTabs = ref(['热点', '长视频', '关注', '经验', '推荐']) //顶部导航标志
const activeTopTab = ref(counterStore.homePageIndex -1)  // 默认选中第五页
const videoTranslateY = ref(0) // 短视频div的位移
const topTabPosition = ref([75/6, 180/6, 290/6, 380/6, 478/6])  // 点击不同顶部tab，下划线应该对应的位置
const lineLeftPosition = ref(topTabPosition.value[counterStore.homePageIndex -1]) // 顶部导航下划线的位置
const isTogglePlay = ref() // 判断是否是开关视频播放
const videoRef = ref(null)
const isLongVideoPage = computed(() => currentPage.value === 2) // 假设长视频页面是第二个页面
const topTabClick = (index) =>{
    activeTopTab.value = index
    lineLeftPosition.value = topTabPosition.value[index]
    translateX.value = -100* index / 6
    currentPage.value = index + 1
}
const onPointerdown = (e) => {
    console.log('鼠标按下');

    // 一开始假设成
    isTogglePlay.value = true
    // 记录一开始的    
    time.value = performance.now() //获取高精度时间
    prevTX.value = translateX.value
    prevTY.value = videoTranslateY.value
    startX.value = currentX.value = e.clientX
    startY.value = currentY.value = e.clientY
    
    isDown.value = true
    // 暂时去掉三个动画效果
    document.querySelector('.box').style.transition = 'none'
    document.querySelector('.short-video-container').style.transition = 'none'
    document.querySelector('.top-nav-bottom-line').style.transition = 'none'
    // 往视窗增加抬起和移动事件监听
    document.addEventListener('pointerup', onPointerup)
    document.addEventListener('pointermove', onPointermove)
}

const onPointermove = (e) => {

    isTogglePlay.value = false
    if (isDown.value === true){
        if ( !witchWay.value ){
            // 判断滑动方向
            if (Math.abs(e.clientX - currentX.value) > Math.abs(e.clientY - currentY.value))
                witchWay.value = 'HORIZONTAL'
            else if(Math.abs(e.clientX - currentX.value) < Math.abs(e.clientY - currentY.value) && currentPage.value === 5){
                witchWay.value = 'VERTICAL'
            }
        }else{
            if (witchWay.value === 'HORIZONTAL'){
                // 边界处理
                const disBetMove = e.clientX - currentX.value
                if ((disBetMove > 0 && currentPage.value === 1) || (disBetMove < 0 && currentPage.value === 6)) return

                translateX.value += disBetMove / 24
                if (disBetMove < 0){
                    // 如果是向右拖拽
                    const disBetTab = topTabPosition.value[activeTopTab.value+1] - topTabPosition.value[activeTopTab.value] //计算顶部导航之间的距离
                    lineLeftPosition.value -= (disBetTab / 100) * (disBetMove / 4)
                }else{
                    const disBetTab = topTabPosition.value[activeTopTab.value] - topTabPosition.value[activeTopTab.value - 1] //计算顶部导航之间的距离
                    lineLeftPosition.value -= (disBetTab / 100) * (disBetMove / 4)
                }
            }
            else {
                videoTranslateY.value += 100 * (e.clientY - currentY.value) / videoHeight.value
                // 上下滑动时 遮罩层变淡的效果
                if (counterStore.videoOpacity > 0.35) {
                    counterStore.videoOpacity-=0.02
                }
            }
            currentX.value = e.clientX
            currentY.value = e.clientY
        }
    }
}

const onPointerup = () => {
    console.log('鼠标抬起');
    const horizontalGap = translateX.value - prevTX.value
    const verticalGap = videoTranslateY.value - prevTY.value
    isDown.value = false
    const nowTime = performance.now()
    // 解除动画限制
    document.querySelector('.box').style.transition = 'transform 0.3s ease'
    document.querySelector('.short-video-container').style.transition = 'transform 0.3s ease'
    document.querySelector('.top-nav-bottom-line').style.transition = 'left 0.3s ease'
    // 根据方向决定去留
    if (witchWay.value === 'HORIZONTAL'){
        // 向左or向右
        if ( (nowTime - time.value < 400 && horizontalGap )  || Math.abs( horizontalGap ) > 100/18){
            
            currentPage.value += (horizontalGap > 0 ? -1 : 1)
            activeTopTab.value += (horizontalGap > 0 ? -1 : 1)

            translateX.value = prevTX.value +( horizontalGap > 0 ? 100/6 : -100/6 );
            // 判断下划线的临界条件 进行临界移动
            lineLeftPosition.value = topTabPosition.value[activeTopTab.value]
            // 增加当前短视频的判断
        }
        // 归位
        else translateX.value = prevTX.value
    }else if(witchWay.value === 'VERTICAL'){
        if ( (nowTime - time.value < 400 && verticalGap )  || Math.abs( verticalGap ) > 100 / 12 ){
            videoTranslateY.value = prevTY.value + ( verticalGap > 0 ? 25 : -25 );
            videoRef.value.stop(currentVideo.value)
            if (verticalGap > 0){
                // 切换到了上一个视频
                // counterStore.videoSources[0]

            }else{
                // 切换到了下一个视频
                if(counterStore.videoSources.length - currentVideo.value === 4){
                    counterStore.videoSources.push(counterStore.videoSources[currentVideo.value])
                }
                // 解决方法：将currentVideo设为一个对象 包含当前下标还有是否已经被push过
            }
            currentVideo.value += (verticalGap > 0 ? -1 : 1)
            videoRef.value.play(currentVideo.value, true)
        }
        else videoTranslateY.value = prevTY.value
        // 遮罩层在滑动结束后变正常的效果
        counterStore.videoOpacity = 1
    }
    witchWay.value = ''

    // 移除两个增加的事件
    document.removeEventListener('pointerup', onPointerup)
    document.removeEventListener('pointermove', onPointermove)
}
const handleBlogger = () =>{
    translateX.value = -100* 5 / 6
    currentPage.value ++
}
// 经验页面的防抖函数 滑动到距离底部还有50时 加载新的card
const expecienceScroll = _.debounce((e) => {
    const page = e.target;
    if (page.scrollTop + page.clientHeight > page.scrollHeight - 50) {
        eventBus.emit('experienceScroll');
    }
}, 200); 
onMounted( () => {
    // console.log(currentPage.value,translateX.value,activeTopTab.value ,lineLeftPosition.value);
    
    videoHeight.value = document.querySelector('.short-video-container').clientHeight
    eventBus.on('gotoBlogger', handleBlogger)
    const left = fatherRef.value.getBoundingClientRect().left
    counterStore.experienceContainerLeft = left
    
    // console.log(currentPage.value,translateX.value,activeTopTab.value ,lineLeftPosition.value);
})
</script>

<template>
    <div class="containered" @pointerdown="onPointerdown">
        <div class="father" ref="fatherRef">
            <!-- 中间的轮播部分 -->
            <div class="swiper" :style="{ transform: 'translateX(' + bigTranslateX + '%)' }">
                <!-- 左侧的小组件 -->
                <div class="widget" style="background-color: gray;">
                    我是最左侧的小组件
                </div>
                <!-- 中间的轮播图 -->
                <div class="page-list">
                    <!-- 顶部导航部分 -->
                    <div class="top-nav" v-show="currentPage !== 6">
                        <div class="icon-nav">
                            <el-icon :size="20">
                                <Expand />
                            </el-icon>
                            <BadgeItem>38</BadgeItem>
                        </div>
                        <button v-for="(tab, index) in topTabs" :key="index"
                            :class="{'top-tab-active': activeTopTab === index}" @click="topTabClick(index)">{{ tab
                            }}</button>
                        <div class="top-nav-bottom-line" :style="{ left: lineLeftPosition + '%' }"></div>

                        <div class="icon-nav"><el-icon :size="20">
                                <Search />
                            </el-icon></div>
                    </div>
                    <!-- 所有的子页面们 -->
                    <div class="box" :style="{ transform: 'translateX(' + translateX + '%)' }">
                        <!-- 热点页面 -->
                        <div class="son" style="background-color: yellow;">热点</div>
                        <!-- 长视频 -->
                        <div class="son" style="background-color: blue;
                         -webkit-overflow-scrolling: touch; /* 保持流畅的滚动体验 */
                        touch-action: pan-y ; /* 允许水平手势滚动 */
                        overflow-y: scroll;">
                            <LongVideo v-if="isLongVideoPage"></LongVideo>
                        </div>
                        <!-- 关注页面 -->
                        <div class="son" style="background-color: gray;">关注</div>
                        <!-- 经验页面 -->
                        <div class="son" @scroll="expecienceScroll" style="background-color: #151724;
                        -webkit-overflow-scrolling: touch; /* 保持流畅的滚动体验 */
                        touch-action: pan-y ; /* 允许水平手势滚动 */
                        overflow-y: scroll;">
                            <ExperiencePage></ExperiencePage>
                        </div>
                        <!-- 短视频下滑主页 -->
                        <div class="son">
                            <div class="short-video-container"
                                :style="{ transform: 'translateY(' + videoTranslateY + '%)' }">
                                <ShortVideo :isTogglePlay="isTogglePlay" :currentVideo="currentVideo" ref="videoRef">
                                </ShortVideo>
                            </div>
                        </div>
                        <!-- 博主主页 -->
                        <div class="son blog" style="background-color: #873600 ;">
                            <BloggerHome @returnPage="topTabClick(4)"></BloggerHome>
                        </div>
                    </div>
                    <BottomTabBar v-if="currentPage !== 6"></BottomTabBar>
                </div>
                <!-- 没用的搜索页 -->
                <div class="search" style="background-color: pink;">
                    我是最右侧的搜索
                </div>
            </div>
            <!-- 评论区内容 -->
            <CommentArea class="comment"></CommentArea>
            <!-- 视频详细页 -->
            <detailGoods></detailGoods>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .short-video-container{
        height: 400%;
        transition: transform 0.3s ease;
        width: 375rem;
    }
    .containered{
        touch-action: none;
        width: 100vw;
        // 在这里开始使用动态的vh值
        height: calc(var(--vh, 1vh) * 100);
        background-color: #1c2833;
        
    }
    .father{
        background: linear-gradient(to bottom, #1a1a1a, #000);
        position: relative;
        width: 375rem;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        // max-width: ;
        .swiper{
            width: 270%;
            display: flex;
            transition: transform 0.5s ease;
            .widget{
                width: 262.5rem;
            }
            .search{
                width: 375rem;
            }
            .page-list{
                position: relative;
                width: 375rem;
                // overflow: hidden;
                .top-nav{
                    font-weight: 600;
                    width: 95%;
                    height: 6%;
                    top: 0rem;
                    left: 2.5%;
                    display: flex;
                    justify-content: space-between;
                    color: #A3A6AD;
                    align-items: center;
                    position: absolute;
                    z-index: 1;
                    user-select: none;
                    button{
                        font-weight: 600;
                        font-size: 16rem;
                        color: #A3A6AD;
                        border: none;
                        background-color: transparent
                    }
                    .top-tab-active{
                        color: #fff;
                    }
                    .icon-nav{
                        // 图标无法使用context-cente 所以单独设置margin-top
                        // margin-top: 6rem;
                        position: relative;
                    }
                    .top-nav-bottom-line{
                        position: absolute;
                        bottom: 6rem;
                        width: 30rem;
                        height: 2.2rem;
                        border-radius: 3rem;
                        background-color: #fff;
                        z-index: 2;
                        transition: left 0.3s ease;
                    }
                }
                .box{
                    width: 2250rem;
                    background-color: black;
                    display: flex;
                    transition: transform 0.3s ease;
                    height: 93%;
                    .son{
                        &::-webkit-scrollbar{
                            display: none;
                        }
                        text-align: center;
                        user-select: none;
                        width: 375rem;
                        height: 100%;
                        overflow: hidden;
                        border-radius: 0rem 0rem 4rem 4rem;
                        position: relative;
                        font-size: 12rem;
                    }
                    .blog{
                        position: relative;
                        height: 100vh;
                    }
                }
            }
        }
    }
</style>