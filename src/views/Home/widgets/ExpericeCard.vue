<template>
<div class="card" ref="cardRef" @click="handleClick">
    <!-- 加载的背景板 -->
    <div v-if="!isLoaded" class="loading"></div>
    <!-- 图片 -->
    <div class="img-container" v-show="isLoaded">
        <img @load=" loadImg " :src=imgUrl alt="">
    </div>
    <div class="bottom">
        <!-- 标题 -->
        <span class="title">
            {{ text }}
        </span>
        <div class="b2">
            <!-- 用户和点赞 -->
            <div class="user">
                <img src="https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30tsf4kbk4u005o96d3c08pgso7iqj6o?imageView2/2/w/80/format/jpg" alt="">
                <span>袁梦舒Enna</span>
            </div>
            <div class="star">
                <img src="@/assets/白色爱心.png" alt="">
                3993
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter';
import eventBus from '@/eventBus';
const isLoaded = ref(false)
const cardRef = ref(null)
const counterStore = useCounterStore()
const imgUrl = counterStore.expericePhoto[Math.floor(Math.random() * counterStore.expericePhoto.length)]
const text = counterStore.expericeText[Math.floor(Math.random() * counterStore.expericeText.length)]
const loadImg = () =>{
    isLoaded.value = true 
}
const handleClick = () =>{
    const rect = cardRef.value.getBoundingClientRect()
    // 将点击位置和链接，标题带过去
    eventBus.emit('showGoodsDetail', {
        ImgUrl:imgUrl,
        Text:text,
        top:rect.top,
        left:rect.left - counterStore.experienceContainerLeft,
        height:rect.height
    })
}
</script>

<style lang="scss" scoped>
img{
    -webkit-user-drag: none; // 防止拖拽虚影
}
.card{
    border-radius: 5rem;
    width: 178rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: #dcdcdc;
    .loading{
        border-radius: 5rem 5rem 0rem 0rem;
        width: 178rem;
        height: 210rem;
        background-color: #3b4356;
    }
    .img-container{
        width: 178rem;
        height: 230rem;
        border-radius: 5rem 5rem 0rem 0rem;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .bottom{
        margin: 10rem 10rem 10rem;
        text-align: left;
        .title{
            font-size: 14rem;
            line-height: 6rem;
        }
    }
    .b2{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4rem;
        img{
            margin-right: 5rem;
            width: 15rem;
            height: 15rem;
        }
        .user{
            display: flex;
            align-items: center;
            img{
                border-radius: 7.5rem;
                vertical-align: baseline;
            }
        }
        .star{
            display: flex;
            align-items: center;
        }
    }
}
</style>