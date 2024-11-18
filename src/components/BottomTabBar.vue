<template>
    <div class="bottom-nav">
        <button @click="$router.push('/home')">首页</button>
        <button @click="$router.push('/shop')">商城</button>
        <button @click="$router.push('/publish')">+</button>
        <button @click="$router.push('/message')">消息</button>
        <button @click="$router.push('/my')">我</button>
    </div>
</template>

<style lang="scss" scoped>
    .bottom-nav{
        height: 7vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        button{
            // background-color: white;
            user-select: none;
            color: #CFD3DC;
            font-size: 16px;
            font-weight: 600;
            border: none;
            background: none;
        }
        button:nth-child(3){
            border: 1rem solid white;
            border-radius: 5rem;
        }
        button:active{
            color: aqua;
            border-color: aqua;
        }
    }
</style>