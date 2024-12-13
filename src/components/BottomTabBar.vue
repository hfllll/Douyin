<template>
    <div class="bottom-nav">
        <button @click="$router.push('/home')" class="select" >首页</button>
        <button @click="$router.push('/shop')">
            <BadgeItem>2</BadgeItem>
            商城
        </button>
        <button @click="$router.push('/publish')">＋</button>
        <button @click="$router.push('/message')">
            消息
            <BadgeItem>79</BadgeItem>
        </button>
        <button @click="$router.push('/my')">我</button>
    </div>
</template>

<script setup>
import BadgeItem from './Widgets/BadgeItem.vue';
</script>

<style lang="scss" scoped>
    .bottom-nav{
        height: 7vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        
        button{
            // background-color: white;
            user-select: none;
            color: #636466;
            font-size: 17rem;
            font-weight: 600;
            border: none;
            background: none;
            position: relative;
        }
        
        button:nth-child(3){
            width: 40rem;
            height: 30rem;
            border: 4rem solid #4C4D4F;
            border-radius: 12rem;
            font-size: 20rem;
            line-height: 20rem;
        }
        button:active{
            color: aqua;
            border-color: aqua;
        }
        .select{
            color:#6C6E72;
        }
    }
</style>