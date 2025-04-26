<script setup>
import { ElMessage } from 'element-plus'
import requestUtil from '@/utils/request';

const props = defineProps({
  pageNum: Number,
  pageSize: Number,
  labs: Array,
})

// 复制文本
const copyText = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => ElMessage.success('已复制'))
}

// 处理菜单点击
const handleMenuCommand = (command) => {
  const { action, row } = command;
  switch (action) {
    case 'save':
      console.log('保存容器')
      saveImage(row.name)
      break
    case 'restart':
      console.log('重启容器')
      break
    case 'delete':
      console.log('删除操作')
      deleteContainer(row.name)
      break
  }
}



// 保存镜像方法
const saveImage = async (podName) => {
  try {
    const response = await requestUtil.post('home/container-management/save', {"podName": podName, "namespace": "container-management"});
    console.log('保存成功:', response.data.image);
  } catch (error) {
    console.error('保存失败:', error.response.data);
  }
};

// 删除实验方法
const deleteContainer = async (podName) => {
  try {
    const response = await requestUtil.post('home/container-management/delete', {"podName": podName, "namespace": "container-management"});
    console.log('保存成功:', response.data.message);
  } catch (error) {
    console.error('保存失败:', error.response.data);
  }
};

// // 重启实验方法
// const restartContainer = async (podName) => {
//   try {
//     const response = await requestUtil.post('home/container-management/restart', {"podName": podName, "namespace": "container-management"});
//     console.log('保存成功:', response.data.message);
//   } catch (error) {
//     console.error('保存失败:', error.response.data);
//   }
// };


const deleteFinished = (pod_name) => {
  console.log("delete ", pod_name)
}

</script>

<template>
  <div class="lab-table">
    <el-table
      :data="props.labs.slice((props.pageNum - 1) * props.pageSize, (props.pageNum - 1) * props.pageSize + props.pageSize)"
      border>
      <el-table-column prop="name" label="实验名称" class="labName" width="150" />
      <el-table-column prop="status" label="状态" class="labStatus" width="110" />
      <el-table-column prop="startTime" label="创建时间" class="labCreateTime" width="180" />
      <el-table-column  label="计算资源" class="labGpu" width="190">
        <template #default="scope">
          <el-tooltip placement="top" content="申请的资源类型,与后续申请相关" effect="light">
            <el-button link type="primary">
              <span v-for="(gpu, index) in scope.row.calculateResource" :key="index" class="gpu">{{ gpu }}</span>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="totalDuration" label="持续时间(h)" class="labTotalTime" width="100" />
      <el-table-column prop="runtimeDuration" label="已运行时长(h)" class="labRunningTime" width="100" />
      <el-table-column prop="images" label="环境" class="labEnvironment" width="80" />
      <el-table-column label="操作" >
        <template #default="{ row }">
          <div class="operation-container">
            <template v-for="op in row.operation" :key="op.action">

              <!-- SSH Tooltip 按钮 -->
              <el-tooltip v-if="op.action === 'ssh' && row.status !== '已完成'" placement="top" effect="light"
                :raw-content="true">
                <template #content>
                  <div class="ssh-tooltip">
                    <div @click="copyText(op.tooltip.command)">
                      登录命令: <b>{{ op.tooltip.command }}</b>
                    </div>
                    <div @click="copyText(op.tooltip.password)">
                      密码: <b>{{ op.tooltip.password }}</b>
                    </div>
                  </div>
                </template>
                <el-button link type="primary" size="small">
                  {{ op.label }}
                </el-button>
              </el-tooltip>

              <!-- 更多操作下拉菜单 -->
              <el-dropdown v-else-if="op.action === 'menu' && row.status !== '已完成'" trigger="click"
                @command="handleMenuCommand">
                <el-button link type="primary" size="small">
                  {{ op.label }}<el-icon><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-for="item in op.menuItems" :key="item.action" :command="{  action: item.action, row: row }"
                      :divided="item.divided">
                      {{ item.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <!-- 实验删除按钮 -->
              <el-button type="danger" v-else-if="op.action === 'deleteFinished' && row.status === '已完成'" @click="deleteFinished">
                删除
              </el-button>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
/* 表格容器样式 */
.lab-table {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

/* 表格样式 */
.el-table {
  width: 100%;
  font-size: 14px;
}

/* 表格行样式 */
.el-table__row {
  transition: background-color 0.3s;
}

/* 表格行悬停样式 */
.el-table__row:hover {
  background-color: #f0f9eb;
}

.operation-container {
  display: flex;
  gap: 8px;
}

.ssh-tooltip div {
  padding: 4px 0;
  cursor: pointer;
  line-height: 1.6;
}

.ssh-tooltip b {
  color: var(--el-color-primary);
}

.ssh-tooltip div:hover {
  background: rgba(0, 0, 0, 0.04);
}
</style>