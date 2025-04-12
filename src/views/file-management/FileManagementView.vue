<script setup>
import { Back, Delete, Upload, UploadFilled } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import requestUtil from '@/utils/request';

const filedata = ref([])
const currentPath = ref('')
const form = ref({
  username: '',
  relativepath: '',
})

const showButtons = (row) => {
  row.show = true
}

const hideButtons = (row) => {
  row.show = false
}

// 控制upload对话框的显示状态
const showUpload = ref(false)

const fileList = async (path = '') => {
  try {
    // 发送 GET 请求到后端
    form.value.relativepath = path
    const response = await requestUtil.get("home/file-management/files/list", form.value);
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

// const fileUpload = async () => {
//   try {
//     // 发送 GET 请求到后端
//     const response = await requestUtil.get("home/file-management/files/list", form.value);
//   } catch (error) {
//     console.error('刷新失败:', error);
//     // 处理错误，例如显示错误消息给用户
//   }
// };

const fileDelete = async (path) => {
  try {
    // 发送 POST 请求到后端
    console.log("fileDeletePre:", currentPath.value, path)
    form.value.relativepath = path
    const response = await requestUtil.post("home/file-management/files/delete", form.value);
    console.log(response.data)
    console.log("fileListPre:", currentPath.value)
    fileList(currentPath.value)
  } catch (error) {
    console.error('刷新失败:', error);
    // 处理错误，例如显示错误消息给用户
    console.log(currentPath.value)
  }
};

const fileDownload = async (row) => {
  try {
    form.value.relativepath = row.path;

    // 1. 发送请求获取文件（确保后端返回的是文件流）
    const response = await requestUtil.get("home/file-management/files/download", form.value, {
      responseType: 'blob' // ⚠️关键：告诉浏览器这是二进制文件（如PDF/Excel/ZIP等）
    });

    // 2. 创建一个临时下载链接并自动点击
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', row.name); // 设置文件名
    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (error) {
    console.error('下载失败:', error);
  }
};

const handleUpload = () => {
  showUpload.value = true
  form.value.relativepath = currentPath.value
}

// 文件上传成功回调
const handleSuccess = () => {
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
      <span> workspace/{{ currentPath }} </span>
    </el-col>

    <el-col :span="12" class="file-buttons">
      <el-button type="primary" @click="handleUpload">
        <el-icon>
          <Upload />
        </el-icon>
        上传
      </el-button>
    </el-col>
  </el-row>

  <el-table :data="filedata" height="500px" stripe :row-style="{ height: '50px' }" @row-click="handleRowClick"
    @cell-mouse-enter="showButtons" @cell-mouse-leave="hideButtons">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="文件名" width="600">
      <template #default="scope">
        <div class="row-file">
          <!-- 动态显示文件/文件夹图标 -->
          <el-icon>
            <component :is="scope.row.type === 'directory' ? 'Folder' : 'Document'" />
          </el-icon>
          <span>{{ scope.row.name }}</span>
          <!-- 操作按钮（悬停显示） -->
          <div class="row-buttons" v-if="scope.row.show">
            <!-- 文件夹操作 -->
            <template v-if="scope.row.type === 'directory'">
              <el-tooltip content="进入" placement="top">
                <el-button type="primary" @click.stop="enterDirectory(scope.row.path)">
                  <el-icon>
                    <Right />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </template>

            <!-- 文件操作 -->
            <template v-else>
              <el-tooltip content="下载" placement="top">
                <el-button type="primary" @click.stop="fileDownload(scope.row)">
                  <el-icon>
                    <Download />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </template>

            <!-- 通用操作 -->
            <el-tooltip content="删除" placement="top">
              <el-button type="primary" @click.stop="fileDelete(scope.row.path)">
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="modified" label="修改时间" />
    <el-table-column prop="size" label="大小" />
  </el-table>

  <el-dialog v-model="showUpload" >
    <el-upload class="upload-demo" drag action="http://localhost:8000/home/file-management/files/upload" :data="form" :on-success="handleSuccess" multiple >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>

  </el-dialog>


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

.row-buttons {
  display: flex;
  justify-content: end;
  width: 100%;
}
</style>