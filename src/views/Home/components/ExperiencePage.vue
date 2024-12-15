<template>
<!-- 顶部tab栏固钉部分 -->
<el-affix>
    <div class="affix-area">
    </div>
</el-affix>

<!-- 搜索栏 -->
<el-row class="search-area">
    <!-- 占位符 -->
    <el-col :span="1"></el-col>
    <!-- 搜索栏 -->
    <el-col :span="22" class="search-box" @click="router.push('/search')">
        <img src="@/assets/my-search.png" alt="">
        <span>瑜伽服</span>
        <span class="text">搜索</span>
    </el-col>
    <!-- 占位符 -->
    <el-col :span="1"></el-col>
</el-row>

<!-- 页面主体 -->
<div class="container" ref="containerRef" >
    <!-- 左列 -->
    <div class="column">
        <ExpericeCard v-for="i in numArr" :key="i">85E|夏日大🐻显小内衣 显瘦又圆润</ExpericeCard>
    </div>  
    <!-- 右列 -->
    <div class="column">
        <ExpericeCard v-for="i in numArr" :key="i">今天回头率好高👀</ExpericeCard>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import ExpericeCard from '../widgets/ExpericeCard.vue';
import eventBus from '@/eventBus';
const containerRef = ref(null)
const numArr = ref(3)
eventBus.on('experienceScroll', () => {
    numArr.value += 3
})
</script>

<style lang="scss" scoped>
.affix-area{
    width: 375rem;
    height: calc(var(--vh, 1vh) * 6);
    background-color: #151724;
}
.search-area{
    width: 375rem;
    margin-bottom: 10rem;
    .search-box{
        height: 5vh;
        border-radius: 5rem;
        border: #808080 1rem solid;
        align-items: center;
        display: flex;
        font-size: 15rem;
        color: #808080;
        img{
            margin: 0 4rem 0 10rem;
            width: 18rem;
            height: 18rem;
        }
        .text{
            margin-left: 225rem;
            font-weight: 500;
            color: white;
        }
    }
}
.container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    .column{
        display: flex;
        flex-direction: column;
        gap: 10rem;
        align-items: center;
    }
}

</style>