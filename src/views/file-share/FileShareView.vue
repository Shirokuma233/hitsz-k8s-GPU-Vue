<script setup>
import { Back, Folder } from '@element-plus/icons-vue';
import { reactive } from 'vue';

const data = reactive([
  { fileName: "linux1", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux2", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux3", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux4", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux5", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux6", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux7", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux1", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux2", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux3", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux4", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux5", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux6", changeTime: "2024/5/8 10:35:23", fileSize: "" },
  { fileName: "linux7", changeTime: "2024/5/8 10:35:23", fileSize: "" },
])

const showButtons = (row) => {
  row.show = true
}

const hideButtons = (row) => {
  row.show = false
}
</script>

<template>
  <el-row>
    <el-col :span="12" class="file-title">
      <el-button link>
        <el-icon>
          <Back />
        </el-icon>
        上级目录
      </el-button>
      <span class="line"> | </span>
      share
    </el-col>

    <!--     <el-col :span="12" class="file-buttons">
      <el-button type="danger" plain :disabled="true">
        <el-icon>
          <Delete />
        </el-icon>
        删除
      </el-button>
      <el-button>
        <el-icon>
          <FolderAdd />
        </el-icon>
        新建文件夹
      </el-button>
      <el-button type="primary">
        <el-icon>
          <Upload />
        </el-icon>
        上传
      </el-button>
    </el-col> -->

  </el-row>

  <el-table :data="data" height="500px" stripe :row-style="{ height: '50px' }" @cell-mouse-enter="showButtons" @cell-mouse-leave="hideButtons">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="fileName" label="文件名" width="600">
      <template #default="scope">
        <div class="row-file" >
          <el-icon>
            <Folder />
          </el-icon>
          <span>{{ scope.row.fileName }}</span>
          <div class="row-buttons" v-if="scope.row.show">

            <!-- <el-tooltip content="重命名" placement="top">
              <el-button type="text" @click="renameFile(scope.row)">
                <el-icon>
                  <Edit />
                </el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="text" @click="deleteFile(scope.row)">
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </el-tooltip> -->

            <el-tooltip content="下载" placement="top">
              <el-button type="text" @click="downloadFile(scope.row)">
                <el-icon>
                  <Download />
                </el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="changeTime" label="修改时间" />
    <el-table-column prop="fileSize" label="大小" />
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

.row-buttons {
  display: flex;
  justify-content: end;
  width: 100%;
}
</style>