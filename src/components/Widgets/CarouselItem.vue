/**
 * @component 滑动组件
 * @description 这是一个用于展示滑动列表效果的组件,包含多个可滑动的slide
 * @prop {String} slideWidth - 用于设置每个slide的宽度,默认值为'375rem'
 * @prop {String} slideHeight - 用于设置每个slide的高度,默认值为'375rem'
 * @prop {Number} slideNum - 表示滑动列表中slide的数量,默认值为3
 * @emits switchSide - 当轮播切换时会触发该自定义事件 可传入要切换的slide下标与行为behavior 传入的下标从1开始
 * @expose switchSide - 暴露switchSide让外部得以控制
 * @slot - 具名插槽,命名格式为'slide-索引值'(索引值从1开始),用于向每个对应的slide中插入不同的内容,以实现每个slide展示不同的内容结构。
**/

<template>
<div  
  ref="windowRef"
  class="window" 
  @pointerup="touchEnd"
  @pointermove="touchMove"
  @pointerdown="touchStart"
  :style="getSwiperStyles()"
>
  <div class="list">
    <div class="slide" ref="slideRefArr" v-for="i in props.slideNum" :key="i" >
      <slot :name="'slide-' + i"></slot>
    </div>
  </div>
</div>
</template>

<script setup>
import {ref, defineEmits, defineProps, defineExpose} from 'vue'
const windowRef = ref(null)
const slideRefArr = ref([])
// 记录移动数据的数组
const emit = defineEmits([
    'turnNext', 
    'turnLast', 
    'turnPage'
])
const props = defineProps({
    slideWidth:{
        type:String,
        default:'375rem'
    },
    slideHeight:{
        type:String,
        default:'375rem'
    },
    slideNum:{
        type:Number,
        default:3
    }
})
// 切换到对应的side
// 存放移动相关数据的对象
const moveData = ref({
    curIdx:1, // 记录当前的滑块下标 一开始为0
    startX: 0,
    curX: 0,
    downTime:0,
    upTime:0,
    isDown:false
})
// 获取基本样式函数
const getSwiperStyles = () =>{
    return {
      '--slide-height':`${props.slideHeight}`,
      '--slide-width':`${props.slideWidth}`,
      '--list-width':`${props.slideNum * 100}%`
    }
}
// 翻页函数 传参为下标与滑动行为
const switchSide = (index, behavior) =>{
    const move = moveData.value
    slideRefArr.value[index - 1].scrollIntoView({
        behavior: behavior || 'smooth',
        block:'center',
        inline:'center'
    })
    move.curIdx = index
    emit('turnPage')
}
// 触摸开始函数
const touchStart = (e) =>{
    const move = moveData.value
    move.downTime = performance.now()
    move.isDown = true
    move.startX = move.curX = e.clientX
}
// 触摸移动函数
const touchMove = (e) =>{
    if (!moveData.value.isDown) return
    const move = moveData.value
    const gap = e.clientX - move.curX
    if (gap > 0 && move.curIdx == 1) 
    return
    if (gap < 0 && move.curIdx == props.slideNum) 
    return
    windowRef.value.scrollLeft -= gap
    move.curX = e.clientX
}
// 触摸结束函数
const touchEnd = () =>{
    moveData.value.isDown = false
    const move = moveData.value
    const finalGap = move.startX - move.curX
    move.upTime = performance.now()
    
    if (finalGap/windowRef.value.offsetWidth > 0.2 )
    {
        if (move.curIdx == props.slideNum)
        {
            return
        }
        switchSide(++move.curIdx) // 如果位移超过两成 轮播下一张
            return
    }
    if (finalGap/windowRef.value.offsetWidth < -0.2)
    {
        if (move.curIdx == 1)
        return
        switchSide(--move.curIdx) // 繁殖 轮播上一张
        return
    }
    // 如果滑动时间极短
    if (move.upTime - move.downTime < 400)
    {
        if (finalGap > 0){
            if (move.curIdx == props.slideNum){
                return
            }
            switchSide(++move.curIdx) // 轮播下一张
            return
        }
        if (finalGap < 0){
            if (move.curIdx == 1)return
            switchSide(--move.curIdx)  // 轮播上一张
        }
    }
}
defineExpose({
    SlideData:moveData.value,
    SwitchMethod:switchSide,
    slideCount:props.slideNum
})
</script>

<style lang="scss">
.window{
    overflow: hidden;
    // overflow-x: scroll;
    /* 针对触摸操作，只允许水平方向滑动 */
    touch-action: none;
    width: var(--slide-width);
    height: var(--slide-height);

    /* 在WebKit浏览器中启用流畅触摸滚动效果 */
    -webkit-overflow-scrolling: touch;

    /* 隐藏WebKit浏览器下的滚动条 */
    &::-webkit-scrollbar {
        display: none;
    }
    .list{
        width: var(--list-width);
        height: var(--slide-height);
        display: flex;
    }
    .slide{
        width: var(--slide-width);
        // border: 2rem solid black;
    }
}
</style>