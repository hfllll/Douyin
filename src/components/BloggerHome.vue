<!-- 博主个人主页页面 -->

<template>
<div class="container" 
    ref="container" 
    @scrollend="handleScrollend"
    @scroll="handleScroll" >
    <!-- 主页背景 -->
    <div class="background" 
        :style="{'backgroundSize':`${photoSize*1.5}% ${photoSize}%`}"
        ref="background" >
        <!-- 头像 -->
        <div class="avatar"></div>
        <!-- 名字 -->
        <span class="name">路明非</span>
        <!-- 抖音号 -->
        <span class="number">抖音号：431851304378 <img src="@/assets/复制.png" alt=""> </span>
    </div>
    <!-- 主页主体 -->
    <div class="body">
        <!-- 获赞状态 -->
        <el-row>
            <el-col :span="6" class="top" style="margin-left: 3%;"><span>38.1万</span> 获赞</el-col>
            <el-col :span="6" class="top"><span>649</span> 关注</el-col>
            <el-col :span="6" class="top"><span>3.4万</span> 粉丝</el-col>
        </el-row>
        <!-- 简介 and 广子 -->
        <el-row>
            <el-col class="text" :span="24">
                分享美好<span v-if="isMore" @click.stop="showMore">... 更多</span>
                <p v-else>
                    穿搭：<i class="yellow">@周三拾（穿什么）</i><br>
                    感谢你的喜欢 <br>
                    🈴：1927OTSD（备注来意）
                </p>
            </el-col>
        </el-row>
        <el-row style="margin-top: 1vh;">
            <el-col class="text" :span="24">
                <i class="yellow">找我合作上星图</i>
            </el-col>
        </el-row>

        <!-- 标签部分 -->
        <div class="tag">
            <el-tag type="info" color="rgba(58, 58, 70, 0.4)" effect="dark" size="small">
                <img src="@/assets/男 (1).png" class="boy" width="" alt="">
                男
            </el-tag>
            <el-tag type="info" color="rgba(58, 58, 70, 0.4)" effect="dark" size="small">
                <img src="@/assets/身份证.png" class="boy" width="" alt="">
                已实名
            </el-tag>
            <el-tag type="info" color="rgba(58, 58, 70, 0.4)" effect="dark" size="small">IP：四川</el-tag>
        </div>

        <!-- 额外功能 -->
        <div class="function">
            <div class="section">
                <div class="card card-1">
                </div>
                <div style="margin-left: 6rem;">
                    <span>直播动态<br><i>查看历史记录</i></span>
                </div>
            </div>
            <div class="section">
                <div class="card card-2">
                </div>
                <div style="margin-left: 6rem;">
                    <span>公开群<br><i>已有七个群聊</i></span>
                </div>
            </div>
        </div>

        <!-- 按钮部分 -->
        <div class="button">
            <div @click="takeFollow" :class="{'beFollow':isFollow}" class="follow">
                <span v-if="isFollow">取消关注</span>
                <span v-else>+关注</span>
            </div>
            <div class="private" :class="{'bePrivate':isFollow}"  >
                私信
            </div>
            <div class="more">
                <img :class="{'beRotate':isRotate}" class="triangle" src="@/assets/三角形.png" alt="" >
            </div>
        </div>

        <!-- 切换栏部分 固钉部分 -->
        <div class="middle-tab" ref="tab" :class="{'affix':isTop}">
            <div class="tab" :class="{'active':true}" >作品 419</div>
            <div class="tab" :class="{'active':false}">喜欢 1085</div>
        </div>
        <div v-if="isTop" :style="{height: `${tab.offsetHeight}rem`}"></div>

        <!-- 视频列表 -->
        <div class="video-list">
            <div class="video" v-for="i in 80" :key="i" @click="openVideo">
                <!-- 置顶标签 -->
                <el-tag 
                    class="pinned" 
                    effect="dark"
                    type="warning"
                    v-if="i < 4" >置顶</el-tag>
                    <!-- 左下角白色的爱心 -->
                <div class="likes">
                    <img src="@/assets/白色爱心.png" alt="" style="width: 12rem;
                    height: 12rem;vertical-align: middle;">
                    1234
                </div>
            </div>
        </div>
        <!-- 暂时没有更多了 -->
         <div class="nomore">
            <span v-if="true">暂时没有更多了</span>
            <span v-else>暂时没有作品</span>
         </div>
    </div>
    <div class="topnavlist" ref="topnav" >
    <!-- 左上角的退出标志 -->
        <div class="topnav return" @click="$emit('returnPage')">
            <img class="img" src="@/assets/左.png" alt="">
        </div>
        <!-- 右上角的有搜索标志 -->
        <div class="topnav search">
            <img class="img" src="@/assets/my-search.png" alt="">
        </div>
        <!-- 右上角的点点号 更多 -->
        <div class="topnav extend">
            <img class="img" src="@/assets/更多.png" alt="">
        </div>
    </div>
    <!-- 打开视频的动画 -->
    <OpenvideoAnimation 
        @animationend="animationEnd" 
        :clickObj="clickObj"
        v-if="isStartAnimation"
    ></OpenvideoAnimation>
</div>

</template>

<script setup>
import { onMounted, onUnmounted, ref,watch } from 'vue';
import OpenvideoAnimation from './Animations/OpenvideoAnimation.vue';
import router from '@/router';
import { useCounterStore } from '@/stores/counter';
const background = ref(null)
const isTop = ref(false)
const container = ref(null)
const isMore = ref(true)
const isRotate = ref(false)
const isFollow = ref(false)
const tab = ref(null)
const tabHeight = ref(0)
const topnav = ref(null)
const boxHeight = ref()
const photoSize = ref(70)
const scrollTop = ref()
const isStartAnimation = ref(false)
const clickObj = ref({})
const counterStore = useCounterStore()
// 打开动画函数 
const openVideo = (e) =>{
    const target = e.target
    const rect = target.getBoundingClientRect()
    clickObj.value = {
        height: target.offsetHeight,
        width: target.offsetWidth,
        top: rect.top,
        right: rect.right
    }
    counterStore.homePageIndex = 6
    // 用v-if触发动画
    isStartAnimation.value = true
}
// 动画结束函数 跳转到detailvideo页面
const animationEnd = () =>{
    router.push('/detailVideo')
}
// 展示更多函数
const showMore = () => {
    isMore.value = false
}
// 关注开关
const takeFollow = () =>{
    isRotate.value = !isRotate.value
    isFollow.value = !isFollow.value
}
// 判断是否显示固钉函数
const handleScroll = () =>{
    scrollTop.value = container.value.scrollTop
    if ( scrollTop.value + topnav.value.offsetHeight >= tabHeight.value ){
        isTop.value = true
        topnav.value.style.backgroundColor = '#1c1e1f'
    }else{
        isTop.value = false
        topnav.value.style.backgroundColor = 'transparent'
    }    
}
// 判断是否回弹
const handleScrollend = () => {
    if (scrollTop.value >= (boxHeight.value / 2) - 2) return
    Rebound()  // 如果滑动结束后 高度超过应该有的高度 进行回弹
}
// 回弹函数
const Rebound = () => {
    container.value.scrollTo({
        top: boxHeight.value / 2,
        behavior: 'smooth'
    });
}
// 监听滚动值 如果滚动值符合条件 放大或缩小背景图片
watch(scrollTop, (newVal, oldVal) =>{
    if (isNaN(oldVal)) return // 不存在旧值的第一次返回
    if (newVal >= boxHeight.value /2) return // 在下面滑动时 返回
    const gap = newVal - oldVal
    const percentage = 100 * gap / boxHeight.value
    photoSize.value -= percentage
})
onMounted(() => {
    tabHeight.value = container.value.scrollTop + tab.value.getBoundingClientRect().top
    boxHeight.value = background.value.offsetHeight // 将高度赋值给这个
    container.value.scrollTo({
        top: boxHeight.value / 2,
        behavior: 'auto'
    });
})
onUnmounted(() => {
    
})
</script>

<style lang="scss" scoped>
.container::-webkit-scrollbar {
  display: none;  /* 隐藏滚动条 */
}
.container{
    height: calc(var(--vh, 1vh) * 100);
    width: 375rem;
    overflow-y: scroll; /* 强制启用滚动 */
    -webkit-overflow-scrolling: touch; /* 保持流畅的滚动体验 */
    touch-action: pan-y !important; /* 允许水平手势滚动 并且优先级盖过父级的none设置 */
    position: relative; // 开启定位 方便操作
}
// 这是固定在页面上面的
.topnavlist{
    position: fixed;
    top: 0;
    z-index: 4;
    width: 375rem;
    height: 7%;
    background-color: transparent;
    .topnav{
        position: absolute;
        background-color: rgba(27, 26, 26, 0.35);
        width: 30rem;
        height: 30rem;
        border-radius: 15rem;
        display: flex;
        justify-content: center;
        align-items: center;        
    }
    img{
        width: 22rem;
        height: 22rem;
    }
    .return{
        top: 10rem;
        left: 10rem;
        img{
            width: 15rem;
            height: 15rem;
        }
    }
    .search{
        top: 10rem;
        right: 50rem;
    }
    .extend{
        top: 10rem;
        right: 10rem;
    }
}
.background{
    width: 375rem;
    height: 333.5rem;
    background-image:
        url('@/assets/博主主页背景图.jpg');
    background-repeat: no-repeat;
    background-position: 50% 100%;
    position: relative;
    .avatar{
        position: absolute;
        width: 80rem;
        height: 80rem;
        border-radius: 40rem;
        border: 2rem white solid;
        background-image: url('@/assets/炸药包.jpg');
        background-position: center;
        background-size:contain; 
        bottom: 30rem;
        left: 20rem;
    }
    .name{
        line-height: 24rem;
        position: absolute;
        font-size: 24rem;
        bottom: 70rem;
        left: 110rem;
        // font-weight: 700;
        color: white;
    }
    .number{
        line-height: 12rem;
        position: absolute;
        font-size: 12rem;
        bottom: 50rem;
        left: 110rem;
        color: #CFD3DC;
        img{
            vertical-align: middle;
            width: 12rem;
            height: 12rem;
        }
    }
}
.body{
    position: relative;
    width: 375rem;
    background-color: #1c1e1f;
    border-radius: 10rem 10rem 0 0;
    z-index: 2;
    top: -2%;
    .nomore{
        width: 375rem;   
        height: 10vh;
        line-height: 10vh;
        font-size: 14rem;
        color: #817c77;
    }
    .video-list{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 1rem;
        .video{
            position: relative;
            height: 180rem;
            background-image:
                linear-gradient(to top, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0)),  /* 渐变从下到上 */
                url('@/assets/和服少女.jpg');
            background-size: cover;
            .pinned{
                position: absolute;
                top: 10rem;
                left: 10rem;
                color: black;
            }
            .likes{
                height: 15rem;
                position: absolute;
                left: 3%;
                bottom: 3%;
                font-size: 10rem;
                // line-height: 15rem;
                line-height: 15rem;
                color: white;
            }
        }
    }
    .middle-tab{
        display: flex;
        height: 36rem;
        line-height: 36rem;
        font-size: 13rem;
        color: #817c77;
        border-bottom: 1rem solid rgba(129, 124, 119, 0.3); /* 50% 透明度 */
        .tab{
            width: 187.5rem;
        }
        .active{
            color: white;
            font-weight: 700;
            border-bottom: #ffda01 2rem solid;
        }
    }
    .affix{
        position: fixed;
        top: 7%;
        z-index: 3;
        width: 100vw;
        background-color: #1c1e1f;
    }
    .button{
        margin-left: 3%;
        margin-top: 4%; 
        margin-bottom: 1.8vh;
        display: flex;
        line-height: 36rem;
        font-size: 14rem;
        color: white;
        gap:1%;
        .private{
            height: 36rem;
            width: 0%;
            background-color: #817c77;
            border-radius: 4rem;
            transition: all 0.3s ease;
            color: transparent;
            white-space: nowrap; //禁止换行
        }
        .bePrivate{
            width: 146.25rem;
            color: white;
        }
        .follow{
            height: 36rem;
            width: 300rem;
            background-color: #ff380e;
            border-radius: 4rem;
            transition: all 0.3s ease;
        }
        .beFollow{
            background-color: #817c77;
            width: 39%;
        }
        .more{
            height: 36rem;
            border-radius: 3rem;
            background-color: #4f4c4b;
            width: 37.5rem;
            .triangle{
                width: 10rem;
                height: 10rem;
                transition: transform 0.3s ease;
                transform: rotate(180deg);
            }
            .beRotate{
                transform: rotate(0deg);
            }
        }   
    }
    .function{
        margin-left: 3%;
        margin-top: 5%;
        height: 36rem;
        display: flex;
        gap: 26rem;
        .section{
            display: flex;
            align-items: center;
            text-align: start;
            color: white;
            line-height: 14rem;
            font-size: 14rem;
            white-space: nowrap; /* 禁止换行 */
            i{
                font-size: 10rem;
                font-style: normal;
                color: #817c77;
            }
        }
        .card{
            width: 36rem;
            height: 36rem;
            background-color: #2e3132;
            background-repeat: no-repeat;
            background-size: 40% 40%;
            background-position: center;
            border-radius: 6rem;
        }
        .card-1{
            background-image: url('@/assets/直播.png');
        }
        .card-2{
            background-image: url('@/assets/群聊入口.png');
            background-size: 50% 50%;
        }
    }
    .tag{
        display: flex;
        margin-left: 3%;
        margin-top: 2%;
        gap: 1.5%;
        .boy{
            vertical-align: middle;
            width: 15rem;
            height: auto;
        }
    }
    .top{
        span{
            font-size: 16rem;
            font-weight: 700;
            color: white;
        }
        font-size: 13rem;
        line-height: 6vh;
        color: #817c77;
    }
    .text{
        margin-left: 3%;
        font-size: 13rem;
        color:white;
        text-align: left;
        line-height: 2.5vh;
        span{
            color: #817c77;
        }
        .yellow{
            font-style: normal;
            color: #ffda01;
        }
    }
}
</style>