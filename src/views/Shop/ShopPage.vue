<template>
    <div 
        class="top" 
        :style="{'backgroundSize':`${sizeNum*2 + 10}% ${sizeNum+10}%`}"
        ref="topBox">
        
    </div>
    <div class="bottom" >
        <span v-for="i in 100" :key="i">我是我是视频</span>
    </div>  
</template>

<script setup>
import {ref, onMounted, watch } from 'vue';
const scrollYYY = ref()
const topBox = ref(null)
const sizeNum = ref(50) // 这个代表缩放大小
const boxHeight = ref()
const miscroll = () => {
    if (window.scrollY >= 166) return;
    window.scrollTo({
        top: boxHeight.value / 2,
        behavior: 'smooth'
    });
}

const onScroll = () =>{
    if (window.scrollY >= boxHeight.value / 2) return
    scrollYYY.value = window.scrollY
}

watch( scrollYYY, (newVal, oldVal) =>{
    const gap = newVal - oldVal
    if (isNaN(gap)) return  // 去掉一开始的特殊情况 此时oldVal不存在 没有旧值
    const percentage = gap / boxHeight.value
    sizeNum.value -= percentage*100
    console.log(sizeNum.value);
})

onMounted(() => {
    boxHeight.value = topBox.value.offsetHeight
    window.addEventListener('scrollend', miscroll)
    window.addEventListener('scroll', onScroll)
    window.scrollTo({
        top: boxHeight.value / 2,
        behavior: 'smooth'
    });
})

</script>

<style scoped>
.top{
    width: 100%;
    height:333.5rem;
    background-color: black;
    background-image: url('@/assets/抖音背景图片 男.jpg');
    background-position: 50% 100%;
    /* background-size: 100% 50%; */
    font-size: 15rem;
    color: white;
}
.bottom{
    width: 100%;
    height:1300rem;
    background-color: pink;
    font-size: 15rem;
    color: black;
}
</style>
