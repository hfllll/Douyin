<template>
<div 
    class="box" 
    :style="{
        'height':`${Height}px`,
        'top':`${Top}px`, 
        'left':`${Left}px`, 
        'zIndex' : `${zIndex}`,
        '--top':`${Top}px`,
        '--height': `${Height}px`,
        '--left':`${Left}px`}"
    :class="{
        'animation':isMation,
        'reverse':returnMation}"
>
    <!-- 加载的图片占位符 -->
    <div v-if="!isLoaded" class="loading"></div>

    <!-- 图片容器 -->
    <div class="img-container" 
        @animationend="mationEnd"
        @animationstart="mationStart"
        :class="{
            'imgMation':isMation,
            'imgReverse':returnMation
        }" 
        v-show="isLoaded">
        <img @load=" loadImg" :src=imgUrl alt="">
    </div>

    <!-- 底部内容 -->
    <div class="bottom" v-show="!isShowDetail">
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

<!-- 从这开始是放大后的内容 -->
    <!-- 退出按钮 -->
    <div class="header" v-show="isShowDetail">
        <div class="returnSign" @click="returnPage" >
        </div>
        <div class="searchSign" @click="gotoSearch">
        </div>
    </div>

    <!-- 主体内容2 -->
    <div class="content" v-show="isShowDetail">
        <div class="content-header">
            <img src="https://sns-avatar-qc.xhscdn.com/avatar/629f7cd8f76f790be0b003fc.jpg?imageView2/2/w/80/format/jpg" alt="">
            <span>袁梦舒Enna</span>
            <button>关注</button>
        </div>
        <div class="desc">{{ text }}</div>
        <div class="date">08-21</div>
        <div class="card">
            <div class="card-header">
                <div>评论 16</div>
                <div>
                    查看全部<img src="@/assets/right.png" alt="">
                </div>
            </div>
            <div class="comment">
                <img src="https://cdn.seovx.com/img/mom2018%20(997).jpg" alt="">
                <span>
                    方明：导便众物半重广划市报精年省。整然例小领局而一儿表国料全拉以。江律治小种你建公给回道部见。
                </span>
            </div>
            <div class="comment">
                <img src="https://cdn.seovx.com/img/momcn-19-10-9%20(19).jpg" alt="">
                <span>
                    侯勇：根联件知般土格同八信它身备些。国包革本团所清想学生有交按情几来于也。争山支消观标算得说然保由深。
                </span>
            </div>
        </div>
    </div>

    <!-- 底部工具栏 -->
    <div class="toolbar" v-show="isShowDetail" :style="{'position' : `${toolPosition}`}">
        <div class="input">
            说点什么...
        </div>
        <div class="tools">
            <div class="options">
                <img src="@/assets/白色爱心.png" alt="">
                <div class="text">444</div>
            </div>
            <div class="options">
                <img src="@/assets/白色镂空收藏.png" alt="">
                <div class="text">12</div>
            </div>
            <div class="options">
                <img src="@/assets/白色镂空评论.png" alt="">
                <div class="text">1522</div>
            </div>
            <div class="options">
                <img src="@/assets/白色镂空转发.png" alt="">
                <div class="text">746</div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import eventBus from '@/eventBus';
import { ref } from 'vue'
const toolPosition = ref('absolute')
const Height = ref(0)
const text = ref('')
const imgUrl = ref('')
const isShowDetail = ref(false) //控制详细页面元素的函数
const isMation = ref(false)
const returnMation = ref(false)
const isLoaded = ref(false)
const Top = ref(0)
const Left = ref(0)
const zIndex = ref(-1)
const loadImg = () =>{
    isLoaded.value = true
}
// 动画结束函数
const mationEnd = () =>{
    console.log(123);
    // 开启动画结束时 底部工具栏设为绝对定位
    if (isMation.value){
        toolPosition.value = 'fixed'
    }
    //关闭动画结束时 隐藏卡片
    if (!isMation.value){
        zIndex.value = -1
    }
}
// 动画开始函数
const mationStart = () =>{
    if (isMation.value){
        // 开启动画开始时 100ms后显示详细信息
        setTimeout(() =>{
            
            isShowDetail.value = true
        }, 100)
    }
    if (!isMation.value){
        // 关闭动画开始时 隐藏详细信息
        isShowDetail.value = false
        toolPosition.value = 'absolute'
    }
}
// 将启动动画类变量设为false 将关闭动画类变量设为true
const returnPage = () => {
    isMation.value = false
    returnMation.value = true
}
// 进入页面函数
eventBus.on('showGoodsDetail', ({Text, ImgUrl, top, height,left}) =>{
    zIndex.value = 2
    isMation.value = true
    returnMation.value = false
    text.value = Text
    imgUrl.value = ImgUrl
    Top.value = top
    Left.value = left
    Height.value = height
})
</script>

<style lang="scss" scoped>
.toolbar{
    // width: 100%;
    // max-width: 375rem;
    width: 375rem;
    height: 8.5%;
    background-color: #151515;
    // left: 0;
    bottom: 0;
    padding:8rem 0rem 8rem 10rem;
    border-top: 1px solid rgba(255, 255, 255, .1);
    display: flex;
    align-items: center;
    gap: 5rem;
    justify-content: space-between;
    .tools{
        display: flex;
        flex: 1;
        .options{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            font-size: 13rem;
            // justify-content: space-around;
            img{
                width: 24rem;
                height: 24rem;
            }
            .text{

            }
        }
    }
    .input{
        width: 125rem;
        padding-left: 15rem;
        height: 34rem;
        border-radius: 30rem;
        background: rgba(58,58,70,0.4);
        color: gray;
        display: flex;
        align-items: center;
        font-size: 14rem;
    }
}
.content{
    width: 100%;
    padding: 15rem 15rem 80rem 15rem;
    .card{
        margin-top: 13rem;
        width: 345rem;
        height: 115rem;
        background-color: #000;
        border-radius: 10rem;
        padding: 10rem 15rem;
        .comment{
            display: flex;
            gap: 5rem;
            margin-top: 16rem;
            align-items: center;
            img{
                border-radius: 50%;
                width: 20rem;
                height: 20rem
            }
            span{
                overflow: hidden;
                font-size: 14rem;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .card-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            div:nth-child(1){
                font-size: 15rem;
            }
            div:nth-child(2){
                color: #808080;
                font-size: 12rem;
                font-style: normal;
                vertical-align: baseline;
                img{
                    margin-left: 2rem;
                    width: 12rem;
                    height: 10rem;
                }
            }
        }

    }
    .desc{
        margin-top: 10rem;
        font-size: 14px;
    }
    .date{
        margin-top: 8rem;
        font-size: 12rem;
        color: #808080;
    }
    .content-header{
        display: flex;
        align-items: center;
        img{
            border-radius: 18rem;
            width: 36rem;
            height: 36rem;
        }
        span{
            margin-left: 10rem;
            font-size: 16rem;
        }
        button{
            margin-left: 155rem;
            width: 56rem;
            height: 28rem;
            background-color: #fc2f56;
            border-radius: 3rem;
        }
    }
}
.header{
    position: absolute;
    top: 2.5%;
    left: 4%;
    width: 92%;
    
    display: flex;
    justify-content: space-between;
    div{
        width: 40rem;
        height: 40rem;
        border-radius: 20rem;
        background-color: #b0b0b066;
        background-position: center;
    }
    .returnSign{
        background-image: url('@/assets/左.png');
        background-size: 15rem;
    }
    .searchSign{
        background-image: url('@/assets/my-search.png');
        background-size: 20rem;
    }
}
img{
    -webkit-user-drag: none; // 防止拖拽虚影
}
// 进入详情页面的动画类
.animation{
    animation: toDetail 0.3s ease forwards;
}
// 退出详情页面的动画类
.reverse{
    animation: quitDetail 0.3s ease forwards;
}
// 图片放大的动画类
.imgMation{
    animation: imgScale 0.3s ease forwards;
}
// 图片退出的动画类
.imgReverse{
    animation: imgNarrow 0.3s ease forwards;
}
// 图片放大动画
@keyframes imgScale {
    0%{
        height: 230rem;
        border-radius: 5rem 5rem 0rem 0rem;
    }
    100%{
        // height: 70vh;
        height: calc(var(--vh, 1vh) * 70);
        border-radius: 0rem;
    }
}
// 图片缩小动画
@keyframes imgNarrow {
    0%{
        height: calc(var(--vh, 1vh) * 70);
        border-radius: 0rem;
    }
    100%{
        height: 238rem;
        border-radius: 5rem 5rem 0rem 0rem;
    }
}
// 开启动画
@keyframes toDetail {
    0%{
        top: var(--top);
        left: var(--left);
        height: var(--height);
        width: 178rem;
    }
    100%{
        top: 0;
        left: 0;
        height: calc(var(--vh, 1vh) * 100);
        width: 375rem;
    }
}
// 退出动画
@keyframes quitDetail {
    0%{
        top: 0;
        left: 0;
        height: calc(var(--vh, 1vh) * 100);
        width: 375rem;
    }
    100% {
        top: var(--top);  /* 反向动画时，恢复到原始的位置 */
        left: var(--left);
        height: var(--height);
        width: 178rem; /* 可以根据需要调整宽度 */
    }
}
.returnBtn{
    position: absolute;
    top: 10%;
    left: 10%;
    width: 100rem;
    height: 100rem;
}
.box{
    font-size: 12rem;
    position: absolute;
    background-color: #151515;
    border-radius: 5rem;
    width: 178rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: white;
    -webkit-overflow-scrolling: touch; /* 保持流畅的滚动体验 */
    overflow-y: scroll;
    touch-action: pan-y ; /* 允许水平手势滚动 */
    &::-webkit-scrollbar{
        display: none;
    }
    .loading{
        border-radius: 5rem 5rem 0rem 0rem;
        width: 178rem;
        height: 210rem;
        background-color: #3b4356;
    }
    .img-container{
        width: 100%;
        height: 230rem;
        border-radius: 5rem 5rem 0rem 0rem;
        // overflow: hidden;
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