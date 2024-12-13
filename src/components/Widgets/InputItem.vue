<template>
<div class="input" :style=styleStr>
    <span class="text">
        {{ props.text }}
    </span>
    <img src="@/assets/图片.png" alt="">
    <img src="@/assets/艾特.png" alt="">
    <img src="@/assets/表情.png" alt="">
</div>
</template>

<script setup>
// 可以传入颜色and文本内容 默认灰白色和一段字符
import { defineProps, ref } from 'vue';
const props = defineProps({
    text:{
        type: String,
        default: '善语结良缘，恶语伤人心'
    },
    color:{
        type: String,
        default: '#E5EAF3'
    }   
})
const styleStr = ref({
    'backgroundColor': `${props.color}`
})
</script>

<style lang="scss" scoped>
.input{
    padding-left: 10rem;
    width: 95vw;
    height: 80%;
    border-radius: 20rem;
    display: flex;
    align-items: center;
    color: #636466;
    font-size: 15rem;
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
</style>