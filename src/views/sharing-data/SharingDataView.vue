<script setup>
import { reactive } from 'vue';

const data = reactive(
  [
    { path: '/share/datasets/ILSVRC2012_img_train/', type: 'image', description: ''},
    { path: '/share/datasets/3D/SceneFlow', type: '图片', description: '双目视差数据，涵盖超过3万个样本。'},
    { path: '/share/datasets/2DImages', type: '图片/文本', description: '多模态问答大模型训练数据'},
    { path: '/share/datasets/videochatgpt_tune', type: '视频/文本', description: '视频/文本问答大模型训练数据'},
  ])
</script>

<template>
  <el-row>
    <el-col :span="12" class="dataset-title">
      <span>平台数据集</span>
    </el-col>
  </el-row>


  <div class="dataset-table">
    <el-table :data="data">
      <el-table-column prop="path" label="路径"/>
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="description" label="描述" />



    </el-table>
  </div>
</template>

<style scoped>
.dataset-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: large;
}
</style>