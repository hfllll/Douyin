<script setup>
import {ref,computed,watch,defineEmits} from 'vue';
const nickname = ref('')
const placeholderText = ref('记得填名字哦')
const nicknameLength = computed(()=>nickname.value.length)
const emit = defineEmits(['updateNickname'])
const editNickname = () => {
  if(nickname.value==='') {
    placeholderText.value = '记得填名字哦'
  } else {
    placeholderText.value = ''
  }
  if(nicknameLength.value>20){
    return false
  }
  emit('updateNickname',nickname.value)
}
watch(nickname,(newValue)=>{
  showClearButton.value = newValue.length>0
  emit('updateNickname',newValue)
})
const showClearButton = ref(true)
const deleteName = () => {
  nickname.value = ''
  placeholderText.value = '记得填名字哦'
  showClearButton.value = false
}

</script>
<template>
  <div class="name">
    <div class="name-subtitle">我的名字</div>
    <div class="name-nickname">
      <input class="name-nickname-text" v-model="nickname" @input="editNickname" :placeholder="placeholderText">
      <img class="name-nickname-img" v-if="showClearButton" src="@/assets/my-delete.png" @click="deleteName"/>
    </div>
  </div>
  <div class="line"></div>
  <div class="textcount">{{nicknameLength}}/20</div>
</template>
<style scoped lang="scss">
.name {
  &-subtitle {
    margin-left: 14rem;
    font-size: 14rem;
    color: #bababb;
    text-align: left
  }
  &-nickname {
    display: flex;
    justify-content: space-between;
    height: 20rem;
    line-height: 20rem;
    margin-bottom: 20rem;
    &-text {
      margin: 10rem 15rem;
      font-size: 15rem;
      color: white;
      width: 300rem;
      height: 30rem;
      background-color: #151724;
      border: 0rem;
      outline: none;
    }
    &-img {
      margin: 10rem 15rem;
      width: 20rem;
      height: 20rem;
    }
  }
}
.line {
  width: 95%;
  height: 1rem;
  background-color: #1c2030;
}
.textcount {
  margin-top: 6rem;
  font-size: 14rem;
  color: #bababb;
  margin-left: 15rem;
}
</style>