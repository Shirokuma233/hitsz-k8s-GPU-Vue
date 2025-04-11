<script setup>
import EnvCard from './EnvCard.vue';


// 为了接受父组件传过来的页码和一页里显示的数量
const props = defineProps({
  pageNum: Number,
  pageSize: Number,
  envs: Array
})

</script>

<template>
  <div class="parent-container">
    <EnvCard
      v-for="(env, index) in props.envs.slice((props.pageNum - 1) * props.pageSize, (props.pageNum - 1) * props.pageSize + props.pageSize)"
      :key="index"
      :imageIcon="env.icon"
      :imageTitle="env.title"
      :imageTag="env.tag"
      :imageSharing="env.sharing"
      :imageDate="env.date"
      :imageNote="env.note"
      :imageSize="env.size"
    />
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
}

.parent-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}



</style>