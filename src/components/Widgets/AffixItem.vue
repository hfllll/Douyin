<template>
<!-- 我是钉子 -->
<div ref="dingzi" :style="affixStyle">
    <slot></slot>
</div>
<!-- 我是占位符 -->
<div v-if="isTop" :style="{height:theHeight + 'px'}" >
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const dingzi = ref(null)
const affixStyle = ref({}) // 固钉样式
const offsetT = ref()
const isTop = ref(false)
const theHeight = ref(0)
const handleScroll = () =>{
    if (offsetT.value - window.scrollY <= 0 ){
        affixStyle.value = {
            position: 'fixed',
            top: '0rem',
            width:`${dingzi.value.offsetWidth}px` // 需要保持宽度不变 不然不知道为什么会坍塌
        }
        console.log('我在滚');

        isTop.value = true
        theHeight.value = dingzi.value.offsetHeight;
    }else{
        affixStyle.value = {}
        isTop.value = false
    }
}
onMounted(()=>{
    window.addEventListener('scroll', handleScroll)
    offsetT.value = dingzi.value.offsetTop
})
onUnmounted(()=>{
    window.removeEventListener('scroll', handleScroll)
})
</script>