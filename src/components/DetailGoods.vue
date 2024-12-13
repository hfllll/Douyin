<template>
<div 
    :style="{'top':`${Top}px`, 'left':`${Left}px`, 'zIndex' : `${zIndex}`}"
    class="box" 
    :class="{'animation':isMation}" >
        <!-- 加载的背景板 -->
        <div v-if="!isLoaded" class="loading"></div>
        <!-- 图片 -->
        <div :class="{'img-container':!isMation, 'img-container-two':isMation}" v-show="isLoaded">
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

    <div class="img-container-two" v-show="false" >
        <img :src=imgUrl alt="">
    </div>
</div>
</template>

<script setup>
import eventBus from '@/eventBus';
import { ref } from 'vue'
const text = ref('')
const imgUrl = ref('')
const isMation = ref(false)
const isLoaded = ref(false)
const Top = ref(0)
const Left = ref(0)
const zIndex = ref(-1)
const loadImg = () =>{
    isLoaded.value = true
}
eventBus.on('showGoodsDetail', ({Text, ImgUrl, top, left}) =>{
    zIndex.value = 2
    isMation.value = true
    console.log(Text, ImgUrl, top, left);
    text.value = Text
    imgUrl.value = ImgUrl
    Top.value = top
    Left.value = left
})
</script>

<style lang="scss" scoped>
img{
    -webkit-user-drag: none; // 防止拖拽虚影
}
.animation{
    animation: toDetail 0.3s linear forwards;
}
@keyframes toDetail {
    0%{
        height: 300rem;
    }
    100%{
        top: 0;
        left: 0;
        height: 100vh;
        width: 375rem;
    }
}
.box{
    font-size: 12rem;
    position: absolute;
    background-color: red;
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
    .img-container-two{
        width: 100%;
        height: 70%;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .bottom{
        margin: 8rem 10rem 10rem;
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