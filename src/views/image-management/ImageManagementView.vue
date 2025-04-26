<script setup>
import { Refresh } from '@element-plus/icons-vue';
import { ref, watch, onMounted } from 'vue';
import EnvList from '@/views/image-management/EnvList.vue';
import requestUtil from '@/utils/request';

const env_select = ref("1")
const currentPageNum = ref(1)
const pageSize = ref(9)

// 后端传来的数据
const total_envs = ref([
  {
    title: "",
    tag: "",
    date: "",
    note: "",
    size: "",
  },
])

const personal_envs = ref([])
const opening_envs = ref([])
const basic_envs = ref([])

// 刷新函数
const refresh = async () => {
  try {
    // 发送 GET 请求到后端
    const response = await requestUtil.get("home/image-management");
    const images_info = response.data;
    total_envs.value = images_info.totalEnvs
    console.log('成功:', total_envs.value);
  } catch (error) {
    console.error('刷新失败:', error);
    // 处理错误，例如显示错误消息给用户
  }
};


let cur_envs = total_envs
watch(env_select, (newValue) => {
  if (newValue == "1") {
    cur_envs = total_envs
  }
  else if (newValue == "2") {
    cur_envs = personal_envs
  }
  else if (newValue == "3") {
    cur_envs = opening_envs
  } else if (newValue == "4") {
    cur_envs = basic_envs
  }
})

onMounted(() => {
  refresh()
})

</script>

<template>
  <el-row>
    <el-col :span="12" class="env-title">
      <span>实验环境</span>
    </el-col>

    <el-col :span="12" class="env-refresh">
      <el-button type="primary" @click="refresh">
        <el-icon>
          <Refresh />
        </el-icon>刷新镜像列表
      </el-button>
    </el-col>
  </el-row>

  <div class="env-list">
    <el-radio-group v-model="env_select">
      <el-radio value="1" size="large" border>全部环境</el-radio>
      <!-- <el-radio value="2" size="large" border>个人环境</el-radio>
      <el-radio value="3" size="large" border>公开环境</el-radio>
      <el-radio value="4" size="large" border>基础环境</el-radio> -->
    </el-radio-group>
  </div>

  <!-- 子页面 -->
  <div class="env-page">
    <EnvList :pageNum="currentPageNum" :pageSize="pageSize" :envs="cur_envs" />
  </div>

  <!-- 页码 -->
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPageNum" v-model:page-size="pageSize" :page-sizes="[9, 18, 27]"
      :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="249" />
  </div>
</template>

<style scoped>
.el-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* 左侧标题样式 */
.env-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

/* 右侧刷新按钮样式 */
.env-refresh {
  display: flex;
  justify-content: flex-end;
}

.env-page {
  display: flex;
  margin: 20px;
}
</style>