<template>
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
      </div>
      <!-- 我是输入框 -->
      <div v-if="!loading" class="commentInput">
          我是输入框
      </div>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { ref,  onMounted, onUnmounted } from 'vue'
import MoreComment from './MoreComment.vue';
import eventBus from '@/eventBus';
const drawer = ref(false)
const loading = ref(true)
const commentarea = ref(null)
const showCommentDrawer = () => {
  console.log('弹窗toggle被触发');
  drawer.value = !drawer.value
  if(!drawer.value){
    // 如果是关闭抽屉 传播关闭事件
    eventBus.emit('close-drawer')
  }
}

const handleBeforeLeave = (el) => {
  // 确保在消失动画开始时移除 appear 动画
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
        }
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
