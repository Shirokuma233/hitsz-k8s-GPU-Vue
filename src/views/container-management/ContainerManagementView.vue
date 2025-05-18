<script setup>
import { Refresh } from '@element-plus/icons-vue';
import { onMounted, ref, watch } from 'vue';
import ContainerCard from '@/views/container-management/ContainerCard.vue';
import requestUtil from '@/utils/request';


const task_select = ref("1")
const currentPageNum = ref(1)
const pageSize = ref(9)
const runningTask = ref([])
const finishedTask = ref([])

let cur_labs = runningTask
watch(task_select, (newValue) => {
  if (newValue == "1") {
    cur_labs = runningTask
  }
  else if (newValue == "2") {
    cur_labs = finishedTask
  }
})

// 控制表单对话框的显示状态
const showForm = ref(false)
const showDistribute = ref(false)

// 表单数据对象
const form = ref({
  username: '',
  pod_name: '',
  password: '',
  imageEnvironment: '',
  gpuResource: '',
  gpuCount: 1,
  runtime: 1
})

const distribute = ref({
  username: '',
  pod_name: '',
  imageEnvironment: '',
  param: "",
  workerReplicas: 1,
  slotPerWorker: 1,
  gpuResource: '',
})

const total_envs = ref([
  {
    title: "",
    tag: "",
    date: "",
    note: "",
    size: "",
  },
])

// 刷新函数,获取pod以及镜像信息
const refresh = async () => {
  try {
    // 请求pod信息
    const response = await requestUtil.get("home/container-management/create", form.value);
    const pods_info = response.data;
    runningTask.value = pods_info.runningTask
    finishedTask.value = pods_info.finishedTask
    //请求镜像信息
    const response2 = await requestUtil.get("home/image-management");
    const images_info = response2.data;
    total_envs.value = images_info.totalEnvs

    console.log('成功:', pods_info);
  } catch (error) {
    console.error('刷新失败:', error);
    // 处理错误，例如显示错误消息给用户
  }
};

// 提交创建实验表单的处理函数
const submitForm = async () => {
  try {
    // 发送 POST 请求到后端
    const response = await requestUtil.post("home/container-management/create", form.value);
    console.log('成功:', response.data);
    // 关闭对话框
    showForm.value = false;

    // 调用refresh函数来更新数据
    await refresh();
  } catch (error) {
    console.error('提交失败:', error);
    // 处理错误，例如显示错误消息
  }
}

// 提交分布式部署的处理函数
const submitDistribute = async () => {
  try {
    // 发送 POST 请求到后端
    const response = await requestUtil.post("home/container-management/distribute", distribute.value);
    console.log('成功创建分布式任务实验":', response.data);
    // 关闭对话框
    showDistribute.value = false;

    // 调用refresh函数来更新数据
    await refresh();
  } catch (error) {
    console.error('提交失败:', error);
    // 处理错误，例如显示错误消息
  }
}


onMounted(() => {
  form.value.username = sessionStorage.getItem('username')
  distribute.value.username = sessionStorage.getItem('username')
  console.log(form.value)
  refresh()
})

</script>

<template>
  <el-row>
    <el-col :span="12" class="task-title">
      <span>我的实验</span>
    </el-col>

    <el-col :span="12" class="task-refresh">
      <el-button type="primary" @click="refresh">
        <el-icon>
          <Refresh />
        </el-icon>刷新实验列表
      </el-button>
      <el-button type="primary" @click="showForm = true">
        创建实验
      </el-button>
      <el-button type="primary" @click="showDistribute = true">
        分布式部署实验
      </el-button>
    </el-col>
  </el-row>

  <div class="task-list">
    <el-radio-group v-model="task_select">
      <el-radio value="1" size="large" border>当前任务</el-radio>
      <el-radio value="2" size="large" border>已完成任务</el-radio>
    </el-radio-group>
  </div>

  <!-- 子页面 -->
  <div class="task-page">
    <ContainerCard :pageNum="currentPageNum" :pageSize="pageSize" :labs="cur_labs" />
  </div>

  <!-- 页码 -->
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPageNum" v-model:page-size="pageSize" :page-sizes="[9, 18, 27]"
      :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="249" />
  </div>

  <!-- 动态显示的表单对话框 -->
  <el-dialog v-model="showForm" title="新建实验" width="50%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="form.pod_name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="镜像环境">
        <el-select v-model="form.imageEnvironment" placeholder="请选择镜像环境">
          <el-option label="(测试用镜像)Ubuntu 22.04" value="ubuntu:22.04"></el-option>
          <el-option label="(测试用镜像)pytorch:2.5.1-cuda12.1-cudnn9-runtime" value="pytorch/pytorch:2.5.1-cuda12.1-cudnn9-runtime"></el-option>
          <el-option v-for="(env, index) in total_envs" :key="index" :label="`${env.title}:${env.tag}`"
            :value="`172.25.95.4:5000/${env.title}:${env.tag}`"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="GPU资源">
        <el-select v-model="form.gpuResource" placeholder="请选择GPU资源">
          <el-option label="NVIDIA T4" value="nvidia-t4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="GPU数量">
        <el-select v-model="form.gpuCount" placeholder="请选择GPU数量">
          <el-option v-for="n in 4" :key="n" :label="n" :value="n"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行时间(小时)">
        <el-input-number v-model="form.runtime" :min="1" :max="48" label="描述文字"></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 分布式部署 -->
  <el-dialog v-model="showDistribute" title="分布式部署" width="50%">
    <el-form :model="distribute" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="distribute.pod_name"></el-input>
      </el-form-item>
      <el-form-item label="镜像环境">
        <el-select v-model="distribute.imageEnvironment" placeholder="请选择镜像环境">
          <el-option label="(测试用镜像)cpu_mpi" value="cpu_mpi"></el-option>
          <el-option label="(测试用镜像)pytorch2.5.1-mpi" value="pytorch/pytorch:2.5.1-cuda12.1-cudnn9-runtime-mpi"></el-option>
          <el-option v-for="(env, index) in total_envs" :key="index" :label="`${env.title}:${env.tag}`"
            :value="`172.25.95.4:5000/${env.title}:${env.tag}`"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启动参数">
        <el-input v-model="distribute.param"></el-input>
      </el-form-item>
      <el-form-item label="节点数">
        <el-input v-model="distribute.workerReplicas"></el-input>
      </el-form-item>
      <el-form-item label="每节点进程数">
        <el-input v-model="distribute.slotPerWorker"></el-input>
      </el-form-item>
      <el-form-item label="GPU资源">
        <el-select v-model="distribute.gpuResource" placeholder="请选择GPU资源">
          <el-option label="NVIDIA T4" value="nvidia-t4"></el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDistribute = false">取消</el-button>
        <el-button type="primary" @click="submitDistribute">提交</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style scoped>
.el-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* 左侧标题样式 */
.task-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

/* 右侧刷新按钮样式 */
.task-refresh {
  display: flex;
  justify-content: flex-end;
}

.task-page {
  display: flex;
  margin: 20px;
}
</style>
