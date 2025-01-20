<template>
<!-- 顶部tab栏固钉部分 -->
<div class="affix-area" :style="{position:'fixed'}">
</div>
<div class="affix-area">
</div>

<!-- 搜索栏 -->
<el-row class="search-area">
    <!-- 占位符 -->
    <el-col :span="1"></el-col>
    <!-- 搜索栏 -->
    <el-col :span="22">
        <div class="search-box" @click="router.push('/search')">
            <div class="search-inner">
                <img src="@/assets/my-search.png" alt="">
                <span class="placeholder">瑜伽服</span>
                <span class="search-text">搜索</span>
            </div>
        </div>
    </el-col>
    <!-- 占位符 -->
    <el-col :span="1"></el-col>
</el-row>


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
<div class="bottom-area">
    <div class="bottom-area-left">
        <div class="bottom-area-left-top">
            <div class="bottom-area-left-top-left"></div>
            <div class="bottom-area-left-top-right"></div>
        </div>
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
.affix-area {
    top: 0;
    z-index: 100;
    width: 375rem;
    height: calc(var(--vh, 1vh) * 6);
    background: #151724;
    // box-shadow: 0 2rem 10rem rgba(0,0,0,0.2);
}

.search-area {
    width: 375rem;
    margin: 10rem 0;
    
    .search-box {
        .search-inner {
            height: 42rem;
            border-radius: 21rem;
            background: rgba(255,255,255,0.1);
            border: 1rem solid rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            padding: 0 15rem;
            transition: all 0.3s ease;
            
            &:active {
                transform: scale(0.98);
                background: rgba(255,255,255,0.15);
            }
            
            img {
                width: 18rem;
                height: 18rem;
                margin-right: 10rem;
                opacity: 0.8;
            }
            
            .placeholder {
                flex: 1;
                color: rgba(255,255,255,0.6);
                font-size: 14rem;
            }
            
            .search-text {
                color: #fff;
                font-size: 14rem;
                font-weight: 500;
                padding: 5rem 12rem;
                background: rgba(255,255,255,0.1);
                border-radius: 15rem;
            }
        }
    }
}

.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12rem;
    padding: 0 12rem;
    
    .column {
        display: flex;
        flex-direction: column;
        gap: 12rem;
    }
}

</style>