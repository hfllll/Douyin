<template>
<div class="maskLayer" :style="{'opacity':`${counterStore.videoOpacity}`}" >
    <!-- 标题与简介 -->
    <div class="maskLayer-title" >
        <h3>@我是香香🐂🍺</h3>
        <p>你说爱像云 要自在飘浮才美丽</p>
        </div>
        <!-- 左侧按钮 -->
        <div class="maskLayer-list">
        <!-- 头像 点赞 评论 收藏 转发 静音与音乐封面 -->
        <div class="maskLayer-list-avatar box" :style="{'pointer-events':'auto'}" @click.stop="gotoBlogger"></div>
        <!-- 未关注 -->
        <div class="jiahao" 
            v-if="!isFollow"
            @click.stop="getFollow" 
            :style="{'backgroundColor':'red', 'color':'white'}" >
            <span >＋</span>
        </div>
        <!-- 已关注 -->
        <div class="jiahao" 
            v-else
            :style="{'backgroundColor':'white', 'color':'red'}" >
            <span >✔</span>
        </div>
            <!-- 爱心动画 -->
            <div class="box" @click.stop="likeToggle">
                <div
                    ref="loveRef"
                    class="img maskLayer-list-like"
                ></div>
                123.5w
            </div>
            <div 
                class="box" 
                @click.stop="showComment"
            >
                <div class="maskLayer-list-comment img">
                </div>
                5.7w
            </div>
            <div class="box" @click.stop="collectToggle">
                <div 
                    ref="collectRef"
                    class="maskLayer-list-collect img">
                </div>
                30.2w
            </div>
            <div class="box">
                <div class="maskLayer-list-forward img"></div>
                123.5w
            </div>
            <div
            v-if="isMuted"
            :class="['maskLayer-list-music', 'box', 'loadingAnimation']" 
            @click.stop="unmuteMusic">
            </div>
            <div 
            v-else
            @click.stop="gotoMusic"
            :class="['maskLayer-list-music', 'cover', 'box']" 
            :style="true ? { transform: `rotate(${rotationAngle}deg)` } : {}">
        </div>
    </div>
</div>
</template>

<script setup>
import router from '@/router';
import { useCounterStore } from '@/stores/counter';
import { ref, defineEmits } from 'vue';
import eventBus from '@/eventBus';
const isMuted = ref(true)
const rotationAngle = ref(0)
const counterStore = useCounterStore()
const loveRef = ref(null)
const collectRef = ref(null)
const isFollow = ref(false)
const emit = defineEmits(['unMuted'])
const getFollow = () =>{
    isFollow.value = true
}
const likeToggle = () =>{
    const love = loveRef.value
    if (love.classList.contains('maskLayer-list-like'))
        love.classList.replace('maskLayer-list-like', 'maskLayer-list-belike')
    else love.classList.replace('maskLayer-list-belike', 'maskLayer-list-like')
}
const collectToggle = () =>{
    const collect = collectRef.value
    if (collect.classList.contains('maskLayer-list-collect'))
        collect.classList.replace('maskLayer-list-collect', 'maskLayer-list-becollect')
    else collect.classList.replace('maskLayer-list-becollect', 'maskLayer-list-collect')
}
const gotoBlogger = () =>{
    router.push('/home')
}
const unmuteMusic = () =>{
    isMuted.value = false
    emit('unMuted')
}
// 打开评论列表
const showComment = () =>{
    eventBus.emit('showComment')
}
</script>

<style lang="scss" scoped>
.maskLayer{
    pointer-events: none;
    width: 100%;
    height: 100%;
    // background-color: red;
    &-list{
        position: absolute;
        right: 3rem;
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
        .jiahao{
            pointer-events: auto;
            position: absolute;
            top: calc(var(--vh, 1vh) * 7 );
            right: calc(var(--vh, 1vh) * 3.5 ) ;
            transform: translate(50%,-50%);
            border-radius: 10rem;
            height: 18rem;
            width: 18rem;
            font-size: 18rem;
            line-height: 15rem;
            text-align: center;
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
            pointer-events: auto;
            height: calc(var(--vh, 1vh) * 7 );
            width: calc(var(--vh, 1vh) * 7 );
            line-height: calc(var(--vh, 1vh) * 3);
            cursor: pointer;
            text-align: center;
        }
        .img{
            background-position: center; // 使图片覆盖整个容器
            background-repeat: no-repeat;
            background-size: contain; // 图片居中显示
            margin: 0 auto;
            width: 70%; 
            height: 70%;
        }
    }
    &-title{
        position: absolute;
        bottom: 0rem;
        left: 8rem;
        text-align: left;
        p{
            font-size: 16rem;
            line-height: 12rem;
            height: 25rem;
        }
        h3{
            line-height: 1rem;
            height: 25rem;
            font-size: 19rem;
        }
    }
}
</style>