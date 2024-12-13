<script setup>
import { ref ,defineProps} from 'vue'
const randomNum = ref(0)
const getRandom = () =>{
    // 获得随机角度
    randomNum.value = Math.floor(Math.random() * 31) - 15
}
getRandom()
const props = defineProps({
    // 父组件传过来的X与Y坐标
    X:{
        type:Number,
        Required:true
    },
    Y:{
        type:Number,
        Required:true
    }
})
</script>

<template>
<!-- 向父级传递动画结束事件 -->
<!-- 动画终止时发送信息 -->
<!-- 在行内style定义--initial-rotate -->
<img
@animationend="$emit('onAnimationEnd')" 
 src="@/assets/奶浓3.png" 
alt=""
:style="{left:`${props.X}`, top:`${props.Y}`, '--initial-rotate': `${randomNum}deg`}"
>
</template>

<style lang="scss" scoped >
img{
    width: 100rem;
    height: 100rem;
    animation: love 1.1s ease ;
    position: absolute;
    transform: rotate(var(--initial-rotate))
}
@keyframes love {
    0%{
        transform: translate(-50rem, -80rem) scale(2.5) rotate(var(--initial-rotate));
        opacity: 0;
    }
    20% {
        transform: translate(-50rem, -80rem) scale(0.8) rotate(var(--initial-rotate));
        opacity: 1;
    }
    60%{
        transform: translate(-50rem, -80rem) scale(0.8) rotate(var(--initial-rotate));
        opacity: 1;
    }
    100%{
        transform: translate(-50rem, -180rem) scale(1.5) rotate(var(--initial-rotate));
        opacity: 0;
    }
}
</style>
