<template>
<div 
    :style = styleStr
    class="shady">
</div>
</template>

<script setup>
import {computed, defineProps, onMounted, ref} from 'vue'
const props = defineProps({
    clickObj:{
        type: Object,
        Required:true
    }
})
const obj = computed(() => props.clickObj)
const styleStr = ref({
    'right':`${window.innerWidth - obj.value.right}px`,
    'top':`${obj.value.top}px`,
})
onMounted(() =>{
    console.log(window.innerWidth);
})
</script>

<style lang="scss" scoped>
.shady{
    width: 125rem;
    height: calc(var(--vh, 1vh) * 25);
    position: fixed;
    background-color: black;
    z-index: 5;
    // 定位必须从右边开始定 左边会跑到第一个页面去 我也不知道为什么 似乎会跨国父级去定位最大的容器
    // transform-origin: 0% 0%;
    animation: openvideo 0.2s ease forwards;
}

@keyframes openvideo {
    0%{
        transform: scale(1)
    }
    100%{
        transform: scale(10)
    }
}
</style>