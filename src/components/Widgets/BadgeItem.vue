<template>
<div class="badge" :style="{'backgroundColor':props.color}" >
    <slot></slot>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    color:{
        type:String,
        default: 'red'
    }
})
</script>

<style lang="scss" scoped>
.badge{
    height: 18rem;
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 5rem 0 5rem;
    transform: translate(50%, -30%);
    font-size: 12rem;
    color: white;
    text-align: center;
    line-height: 18rem;
    border-radius: 10rem;
}
</style>