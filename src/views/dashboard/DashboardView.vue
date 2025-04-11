<script setup>
import { ref, onMounted } from 'vue'
import requestUtil from '@/utils/request.js'

const total = ref({
    gpu_capacity: 0,
    gpu_allocatable: 0,
    cpu_capacity: 0,
    cpu_allocatable: 0,
    memory_capacity: 0,
    memory_allocatable: 0,
    task: 0
})

const nodes_info = ref([
    {
        "nodeId": 1,
        "nodeName": "k8s-master",
        "gpuType": "暂无",
        "gpuCapacity": "暂无",
        "gpuAllocatable": "暂无",
        "cpuCapacity": 0,
        "cpuAllocatable": 0,
        "memoryCapacity": 0,
        "memoryAllocatable": 0,
        "nodeStatus": "在线"
    }
  ])


const handleDashboard = async () => {
  try {
    const response = await requestUtil.get("home/dashboard")
    const response_data = response.data
    console.log(response)
    console.log('也是ok了')
    console.log(response.data)
    // assign
    total.value = response_data.total
    nodes_info.value = response_data.nodes_info
    console.log(total)
    console.log(nodes_info)
  } catch (error) {
    console.error('Error fetching dashboard:', error)
  }
}

// 使用 onMounted 钩子
onMounted(() => {
  handleDashboard()
})

</script>

<template>
<div class="overview-container">
    <div class="overview-item">
      <div class="item-title">GPU总数</div>
      <div class="item-value"> {{ total.gpu_capacity }} </div>
      <div class="item-sub">{{ total.gpu_capacity - total.gpu_allocatable}} 已使用 / {{total.gpu_allocatable}} 剩余</div>
    </div>

    <div class="overview-item">
      <div class="item-title">CPU总数</div>
      <div class="item-value"> {{ total.cpu_capacity }} </div>
      <div class="item-sub">{{total.cpu_capacity - total.cpu_allocatable}} 已使用 / {{total.cpu_allocatable}} 剩余</div>
    </div>

    <div class="overview-item">
      <div class="item-title">内存总数</div>
      <div class="item-value">{{total.memory_capacity}}</div>
      <div class="item-sub">{{total.memory_capacity - total.memory_allocatable}}GB 已使用 / {{total.memory_allocatable}}GB 剩余</div>
    </div>

    <div class="overview-item">
      <div class="item-title">集群任务总数（实验总数）</div>
      <div class="item-value">{{total.task}}</div>
    </div>
  </div>

  <div class="overview-cluster">
    <div class="overview-title">
      节点信息
    </div>
    <div class="overview-table">
      <el-table :data="nodes_info" border>
        <el-table-column prop="nodeId" label="节点编号" width="60" />
        <el-table-column prop="nodeName" label="主机名" />
        <el-table-column prop="gpuType" label="GPU类型" />
        <el-table-column prop="gpuCapacity" label="GPU总数(卡)" />
        <el-table-column prop="gpuAllocatable" label="GPU剩余数(卡)" />
        <el-table-column prop="cpuCapacity" label="CPU总数(核心)" />
        <el-table-column prop="cpuAllocatable" label="CPU剩余数(核心)" />
        <el-table-column prop="memoryCapacity" label="内存总数(GB)" />
        <el-table-column prop="memoryAllocatable" label="内存剩余数(GB)" />
        <el-table-column prop="nodeStatus" label="节点状态" />


      </el-table>
    </div>

  </div>

</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.overview-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 2列 */
  grid-template-rows: repeat(2, 1fr);
  /* 2行 */
  width: 100%;
  /* 确保容器宽度 */
  box-sizing: border-box;
  /* 确保内边距和边框不会影响布局 */
}

.overview-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  /* 确保内边距和边框不会影响布局 */
  height: 147px;
  margin: 10px;
}

.item-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: large;
}

.item-value {
  font-size: large;
  margin-bottom: 10px;
  color: #40a9ff;
}

.item-sub {
  font-size: 16px;
  color: #666;
}

.overview-cluster {
  margin-top: 10px;
  display: flex;
  width: 100%;
  /* 确保容器宽度 */
  flex-direction: column;
  background-color: #efefef;
}

.overview-cluster .overview-title {
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: large;
  font-weight: bold;
  height: 30px;
}

.overview-cluster .overview-table {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>