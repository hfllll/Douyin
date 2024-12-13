<template>
<!-- 单条评论区 -->
<el-row >
    <!-- 头像 -->
    <el-col :span="3"><el-avatar 
        size="large"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/></el-col>
    <el-col :span="16">
        <!-- 评论区主体 -->
        <div class="name" >今天没烦恼 <el-tag effect="dark" type="danger" size="small" v-if="random() < 0.1" >作者</el-tag> </div>
        <div class="text">逼罗猫好可爱</div>
        <div class="time">2024-11-13&nbsp;&nbsp;江苏&nbsp;&nbsp;回复</div>
    </el-col>
    <el-col :span="5" >
        <!-- 点赞 -->
        <div class="likes">
            <div class="likeImg" @click="isLike =! isLike" >
                <img v-if="isLike" src="@/assets/点赞的爱心.png" alt="" class="love">
                <img v-else  src="@/assets/爱心4.png" alt="" class="love">
                1234
            </div>
            <div @click="disLike = !disLike">
                <img v-if="!disLike" src="@/assets/心碎1.png" alt="" class="love">
                <img v-else src="@/assets/心碎.png" alt="" class="love">
            </div>
        </div>
    </el-col>
</el-row>
<!-- 展开更多的区域 -->
    <div v-show="biglist.length" v-for="ele in biglist" v-loading="ele.loading"  class="morethemore"  :key="ele.num" >
        <el-row v-if="!ele.loading" class="moreList">
            <el-col :span="3"></el-col>
            <el-col  :span="21" @click="console.log('被点击了')">
                <el-row  v-for="i in ele.num" :key="i" class="extend">
                    <!-- 头像 -->
                    <el-col :span="2">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                    </el-col>
                    <el-col :span="16">
                        <!-- 评论区主体 -->
                        <div class="name extend">今天没烦恼</div>
                        <div class="text">逼罗猫好可爱</div>
                        <div class="time">2024-11-13&nbsp;&nbsp;江苏&nbsp;&nbsp;回复</div>
                    </el-col>
                    <el-col :span="6" >
                        <!-- 点赞 -->
                        <div class="likes ">
                            <div class="likeImg" @click="isLike = !isLike" >
                                <img v-if="isLike" src="@/assets/点赞的爱心.png" alt="" class="love">
                                <img v-else  src="@/assets/爱心4.png" alt="" class="love">
                                1234
                            </div>
                             <div @click="disLike = !disLike">
                                <img v-if="!disLike" src="@/assets/心碎1.png" alt="" class="love">
                                <img v-else src="@/assets/心碎.png" alt="" class="love">
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
<!-- 在展开更多里没东西的时候 长度为0 -->
<div @click="showMore(3)" class="more" v-if="biglist.length === 0">----&nbsp;&nbsp;展开392条回复&nbsp;&#9660;</div>
<!-- 评论展开更多里有东西 并且最后一个的loading为true时 在浮现出来 -->
<div @click="showMore(7)" class="more" v-else-if="!biglist[biglist.length - 1].loading">----&nbsp;&nbsp;展开更多&nbsp;&#9660;</div>
</template>
<script setup>
import { random } from 'lodash';
import { ref } from 'vue'
const isLike = ref(false)
const disLike = ref(false)
const biglist = ref([])
const showMore = (num) =>{
    biglist.value.push({
        num,
        loading: true
    })
    setTimeout(() => {
        biglist.value[biglist.value.length - 1].loading = false
    }, 700)
}
</script>

<style scoped scss="lang">
 div{
text-align: left;
margin-top: 2.5px;
}
.name{
margin-top: 10px;
color: rgb(186, 186, 187);
font-size: 14px;
}
.text{
font-size: 14px;
}
.time{
font-size: 13px;
color: rgb(186, 186, 187);
cursor: pointer;
}
.likes{
margin-top: 58px;
display: flex;
gap: 20px;
.likeImg{
    font-size: 13px;
    color: rgb(128, 128, 128);
    display: flex;
    align-items: center;
    margin-top: 0;
}
.love{
    width: 15px;
    height: 15px;
    cursor: pointer;
}
}
.morethemore{
    min-height: 8vh;
}
.moreList{
    overflow: hidden;
    animation: slide-down ease 2s forwards;
}
.more{
font-size: 13px;
color: rgb(128, 128, 128);
margin-top: 10px;
margin-bottom: 10px;
cursor: pointer;
margin-left: 15%;
}
@keyframes slide-down {
    0%{
        max-height: 0vh;
    }
    100%{
        max-height: 200vh;
    }
}
</style>