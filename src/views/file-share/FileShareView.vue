<script setup>
import { Back} from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import requestUtil from '@/utils/request';

const filedata = ref([])
const currentPath = ref('')
const form = ref({
  username: '',
  relativepath: '',
})



const fileList = async (path = '') => {
  try {
    // 发送 GET 请求到后端
    form.value.relativepath = path
    const response = await requestUtil.get("home/file-share", form.value);
    filedata.value = response.data.files
    console.log(response.data)
  } catch (error) {
    console.error('刷新失败:', error);
    // 处理错误，例如显示错误消息给用户
  }
};

const enterDirectory = (path) => {
  currentPath.value = path
  console.log("enterDirectory:path", currentPath.value)
  fileList(path)
}

// 点击行事件（区分文件和文件夹）
const handleRowClick = (row) => {
  if (row.type === 'directory') {
    enterDirectory(row.path)
  }
}

const goUpOneLevel = () => {
  // 分割路径并移除空段（处理连续斜杠情况）
  const segments = currentPath.value.split('/')
  // 移除最后一段（如果存在）
  if (segments.length > 0) {
    segments.pop()
  }
  currentPath.value = segments.join("/")
  console.log(currentPath.value)
  fileList(currentPath.value)
}

onMounted(() => {
  form.value.username = sessionStorage.getItem('username')
  fileList()
});
</script>

<template>
  <el-row>
    <el-col :span="12" class="file-title">
      <el-button v-if="currentPath" @click="goUpOneLevel">
        <el-icon>
          <Back />
        </el-icon>
        上级目录
      </el-button>
      <span class="line"> | </span>
      <span> share/{{ currentPath }} </span>
    </el-col>
  </el-row>

  <el-table :data="filedata" height="500px" stripe :row-style="{ height: '50px' }" @row-click="handleRowClick">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="文件名" width="600">
      <template #default="scope">
        <div class="row-file">
          <!-- 动态显示文件/文件夹图标 -->
          <el-icon>
            <component :is="scope.row.type === 'directory' ? 'Folder' : 'Document'" />
          </el-icon>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="modified" label="修改时间" />
    <el-table-column prop="size" label="大小" />
  </el-table>

</template>

<style scoped>
.el-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* 右侧刷新按钮样式 */
.file-buttons {
  display: flex;
  justify-content: flex-end;
}

.line {
  font-weight: 100;
}


.row-file {
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>