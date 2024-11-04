<script setup>
// import { Expand, Search } from '@element-plus/icons-vue/dist/types';
import  { ref, onMounted } from 'vue'
import ShortVideo from './components/ShortVideo.vue';
const currentPage = ref(5)
const currentVideo = ref(0)
const videoHeight = ref(0)
const translateX = ref(-200/3)
const bigTranslateX = ref(-25.92)
const index = ref(1)
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
const activeTopTab = ref(4)  // 默认选中第五页
const videoTranslateY = ref(0) // 短视频div的位移
const topTabPosition = ref([90/6, 195/6, 293/6, 386/6, 482/6])  // 点击不同顶部tab，下划线应该对应的位置
const lineLeftPosition = ref(topTabPosition.value[4]) // 顶部导航下划线的位置
const isTogglePlay = ref() // 判断是否是开关视频播放
const videoRef = ref(null)
const right = (e) => {
    e.stopImmediatePropagation()
    if (index.value !== 6){
        translateX.value -= 100 / 6
        index.value++
    }
}
const left = () => {
    if (index.value !== 1){
        translateX.value += 100 / 6
        index.value--
    }else
        openWidget()  
}
const nextVideo = () => {
    videoTranslateY.value -= 100/4
}
const openWidget = () => {
    bigTranslateX.value = 0
}
const openSearch = () => {
    bigTranslateX.value = - 1700 / 27
}
const topTabClick = (index) =>{
    activeTopTab.value = index
    lineLeftPosition.value = topTabPosition.value[index]
    translateX.value = -100* index / 6
    currentPage.value = index + 1
}
const onPointerdown = (e) => {
    // 一开始假设成
    isTogglePlay.value = true
    // 记录一开始的    
    time.value = performance.now() //获取高精度时间
    prevTX.value = translateX.value
    prevTY.value = videoTranslateY.value
    startX.value = currentX.value = e.clientX
    startY.value = currentY.value = e.clientY
    isDown.value = true
    // 暂时去掉box的平滑动画
    document.querySelector('.box').style.transition = 'none'
    document.querySelector('.short-video-container').style.transition = 'none'
    document.querySelector('.top-nav-bottom-line').style.transition = 'none'
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
                if ((disBetMove > 0 && currentPage.value === 1) || 
                (disBetMove < 0 && currentPage.value === 6) ) return

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
            else
                videoTranslateY.value += 100 * (e.clientY - currentY.value) / videoHeight.value
            currentX.value = e.clientX
            currentY.value = e.clientY
        }
    }
}
const onPointerup = () =>{
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
            currentVideo.value += (verticalGap > 0 ? -1 : 1)
            videoRef.value.play(currentVideo.value)
        }
        else videoTranslateY.value = prevTY.value
    }
    witchWay.value = ''
}
onMounted( () => {
    videoHeight.value = document.querySelector('.short-video-container').clientHeight
})
</script>

<template>
    <div class="container"
        @pointerdown="onPointerdown"
        @pointerup="onPointerup"
        @pointermove="onPointermove"
    >
    <div class="father">
        <div class="swiper"
         :style="{ transform: `translateX(${bigTranslateX}%)` }" >
            <div class="widget" style="background-color: gray;" >
                我是最左侧的小组件
            </div>
            <div class="page-list">
                <div class="top-nav">
                    <div class="icon-nav"><el-icon :size="20"><Expand /></el-icon></div>
                    <button 
                    v-for="(tab, index) in topTabs" 
                    :key="index" 
                    :class="{'top-tab-active': activeTopTab === index}"
                    @click="topTabClick(index)">{{ tab }}</button>
                    <div class="top-nav-bottom-line" :style="{ left: `${lineLeftPosition}%` }"></div>
                    <div class="icon-nav"><el-icon :size="20"><Search/></el-icon></div>
                </div>
                <div class="box" :style="{ transform: `translateX(${translateX}%)` }">
                    <div class="son" style="background-color: yellow;">热点</div>
                    <div class="son" style="background-color: blue;" > 长视频</div>
                    <div class="son" style="background-color: gray;" >我的关注</div>
                    <div class="son" style="background-color: #5b2c6f ;" >经验页面</div>
                    <div class="son">
                        <div class="short-video-container" :style="{ transform: `translateY(${videoTranslateY}%)` }" >
                            <ShortVideo :isTogglePlay="isTogglePlay" :currentVideo="currentVideo" ref="videoRef" ></ShortVideo>
                        </div>
                    </div>
                    <div class="son" style="background-color: #873600 ;" >博主主页</div>
                </div>
                <div class="bottom-nav">
                    <button>首页</button>
                    <button>商城</button>
                    <button>+</button>
                    <button>消息</button>
                    <button>我</button>
                </div>
            </div>
            <div class="search" style="background-color: pink;">
                我是最右侧的搜索
            </div>
        </div>
        <div class="btn">
            <button @click.stop="openWidget">打开左侧小组件</button>
            <button @click.stop="openSearch">打开右侧搜索栏</button>
            <button @click.stop="left">上一页</button>
            <button @click.stop="right">下一页</button>
            <button @click.stop="nextVideo">下一个视频</button>
        </div>
    </div>
    </div>
</template>

<style lang="scss">
    .container{
        width: 100vw;
        height: 100vh;
        background-color: #1c2833;
    }
    .father{
        background-color: black;
        position: relative;
        width: 400px;
        height: 100vh;
        margin: 0 auto;
        // background-color: green;
        overflow: hidden;
        display: flex;
        line-height: 93vh;
        .btn{
            position: absolute;
            z-index: 2;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%); //居中按钮
            gap: 10px;
            display: flex;
            height: 29px;
            background-color: transparent;
            display: none;
        }
        .swiper{
            width: 1080px;
            display: flex;
            transition: transform 0.5s ease;
            .widget{
                width: 280px;
            }
            .search{
                width: 400px;
            }
            .page-list{
                position: relative;
                width: 400px;
                overflow: hidden;
                .top-nav{
                    // position: relative;
                    font-weight: 600;
                    width: 100%;
                    height: 6vh;
                    top: 10px;
                    display: flex;
                    justify-content: space-between;
                    color: #A3A6AD;
                    align-items: center;
                    position: absolute;
                    z-index: 2;
                    user-select: none;
                    button{
                        font-weight: 600;
                        font-size: 17px;
                        color: #A3A6AD;
                        border: none;
                        background-color: transparent
                    }
                    .top-tab-active{
                        color: #fff;
                    }
                    .icon-nav{
                        // 图标无法实现和文本对齐 所以单独设置margin-top
                        margin-top: 7px;
                    }
                    .top-nav-bottom-line{
                        position: absolute;
                        bottom: 0%;
                        width: 6%;
                        height: 8%;
                        background-color: #fff;
                        z-index: 2;
                        transition: left 0.3s ease;
                    }
                }
                .box{
                    width: 2400px;
                    background-color: black;
                    display: flex;
                    transition: transform 0.3s ease;
                    height: 93vh;
                    .son{
                        line-height: 93vh;
                        text-align: center;
                        user-select: none;
                        width: 400px;
                        height: 93vh;
                        overflow: hidden;
                        border-radius: 0px 0px 5px 5px;
                        .short-video-container{
                            transition: transform 0.3s ease;
                            width: 400px;
                        }
                    }
                }
                .bottom-nav{
                    height: 7vh;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    
                    button{
                        // background-color: white;
                        user-select: none;
                        color: #CFD3DC;
                        font-size: 16px;
                        font-weight: 600;
                        border: none;
                        background: none;
                    }
                    button:nth-child(3){
                        border: 1px solid white;
                        border-radius: 5px;
                    }
                    button:active{
                        color: aqua;
                        border-color: aqua;
                    }
                }
            }
        }
        
        
    }
</style>