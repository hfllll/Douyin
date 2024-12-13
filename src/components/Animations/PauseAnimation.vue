<template>
    <img src="@/assets/暂停.png" alt="" >
</template>

<script setup>

</script>

<style scoped lang="scss">
img{
    pointer-events: none;
    animation: play 0.3s ease forwards;
    width:  65rem;
    height:  65rem;
}
@keyframes play {
    0%{
        transform: scale(5);
        opacity: 0.2;
    }
    100%{
        transform: scale(1);
        opacity: 1;
    }
}
</style>