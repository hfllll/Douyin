<template>
  <!-- before-leave：退出动画开始时触发 -->
  <transition name="fade" @before-leave="handleBeforeLeave">
    <!-- 整个页面：带有上方留白 -->
  <div
    class="box"
    v-if="drawer"
    @click.stop="showCommentDrawer"
    @pointerdown.stop
    >
    <!-- 评论区弹窗内容 -->
    <div class="comment" 
      v-loading="loading"
      element-loading-text="加载中..."
      @click.stop>
      <!-- 固钉 评论条数 -->
      <div v-if="!loading" class="commentNum">
          40条评论
      </div>
      <!-- 评论主体 -->
      <div v-if="!loading" 
        @scroll="handleScroll"
        @touchstart="startTouch"
        ref="commentarea"
        class="commentArea">
        <div v-for="i in 7" :key="i">
          <MoreComment></MoreComment>
        </div>
        <!-- 暂时没有更多评论了部分 -->
        <div class="nomore">暂时没有更多了</div>
      </div>
      <!-- 我是输入框 -->
       <div v-if="!loading" class="commentInput">
         <InputItem></InputItem>
       </div>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { ref,  onMounted, onUnmounted } from 'vue'
import MoreComment from './MoreComment.vue';
import eventBus from '@/eventBus';
import InputItem from './Widgets/InputItem.vue';
const drawer = ref(false)
const loading = ref(true)
const commentarea = ref(null)
const showCommentDrawer = () => {
  drawer.value = !drawer.value
  if(!drawer.value){
    // 如果是关闭抽屉 传播关闭事件
    eventBus.emit('close-drawer')
  }
}

// 确保在消失动画开始时移除 appear 动画
const handleBeforeLeave = (el) => {
  el.querySelector('.comment').style.animation = 'disappear 0.5s ease forwards'
}

const isTop = ref(true) //一开始是到顶的
const handleScroll = (e) => {
  if (isTop.value) isTop.value = false
  if(!e.target.scrollTop)
    isTop.value = true
}
const sY = ref(0)

const startTouch = (e) =>{
  if (isTop.value){
    sY.value = e.touches[0].clientY
    commentarea.value.addEventListener('touchmove', touchMove)
  }
}

const touchMove = (e) => {
  if (isTop.value){
    if (e.touches[0].clientY - sY.value > 30){
     showCommentDrawer()
      commentarea.value.removeEventListener('touchmove', touchMove)
    }
  }
}

onMounted(() => {
  eventBus.on('showComment', showCommentDrawer)
  setTimeout(() => {
    loading.value = false
  }, 500)
})

onUnmounted(() => {
  eventBus.off('showComment', showCommentDrawer)
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: transparent;
  right: 0;
  bottom: 0;
  position: absolute;
  
  .comment {
      right: 0;
      bottom: 0;
      
      position: absolute;
      width: 100%;
      height: 65%;
      background-color: white;
      text-align: center;
      font-size: 10rem;
      animation: appear 0.5s ease forwards;
      border-radius: 10rem 10rem 0 0;
      .commentNum{
        height: 7%;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center;     /* 垂直居中 */
        font-weight: 600;
      }
      .commentArea{
          overscroll-behavior: none;
          overflow-y: auto;
          height: 83%;
          &::-webkit-scrollbar{
              display: none; // 隐藏滚动条
          }
        }
        .commentInput{
          height: 10%;
          border-top: #CFD3DC 1rem solid ;
          display: flex;
          justify-content: center;
          align-items: center;
          .input{
            padding-left: 6rem;
            width: 95vw;
            height: 80%;
            border-radius: 20rem;
            background-color: #E5EAF3;
            display: flex;
            align-items: center;
            color: #636466;
            font-size: 14rem;
            .text{
              width: 65%;
              text-align: left;
            }
            img{
              margin-left: 4%;
              width: 22rem;
              height: 22rem;
              // vertical-align: baseline;
            }
          }
        }
  }
  .nomore{
    color: gray;
    font-size: 12rem;
    line-height: 40rem;
    text-align: center;
    height: 40rem;
  }
}

@keyframes appear {
  0% {
    bottom: -70%;
    opacity: 0;
  }
  100% {
    bottom: 0%;
    opacity: 1;
  }
}

@keyframes disappear {
  0% {
    bottom: 0%;
    opacity: 1;
  }
  100% {
    bottom: -70%;
    opacity: 0;
  }
}

/* 定义进入和离开时的样式 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  bottom: -70%;
}
</style>
