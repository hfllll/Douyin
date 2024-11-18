<template>
    <router-view></router-view>
</template>
<script setup>
import { onMounted } from 'vue';// 计算并设置1vh的值
const updateVh = () =>{
    const vh = window.innerHeight * 0.01 // 计算 1vh
    // 将--vh设置为基础css样式
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    console.log('当前页面高度:', window.innerHeight);
    console.log('计算的 1vh 值:', vh)
}

// 动态更新font-size，限制在移动端样式
const updateFontSize = () =>{
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 + 'px'
    
    console.log("当前界面宽度:", document.documentElement.clientWidth); // 输出当前宽度
    console.log("当前fontsize:", document.documentElement.clientWidth / 375); // 输出计算的fontSize
    const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    console.log("当前rem:", remSize); // 输出计算后的remSize
    console.log('----------------------------------');
}

// 自定义节流函数
function throttle(fn, wait) {
    let lastTime = 0;

    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// 对页面变化进行监听防抖
const handleResize = throttle(() => {
       setTimeout(updateVh, 100);
    if (document.documentElement.clientWidth >= 510){
        document.documentElement.style.fontSize = 510 / 375 + 'px'
        return
    }
    updateFontSize() 
}, 200)

// 在组件挂载时监听窗口大小变化 更新长宽单位
onMounted(() => {
    // 节流操作
    window.addEventListener('resize', handleResize)
    updateVh()
    if (document.documentElement.clientWidth >= 510){
        document.documentElement.style.fontSize = 510 / 375 + 'px'
    }
    else updateFontSize() 
    // 首次调用 设置字体大小
})

</script>
<style>
    *{
        box-sizing: border-box;
        margin: 0 auto;
    }
</style>

