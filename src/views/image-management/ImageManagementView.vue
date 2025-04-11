<script setup>
import { Refresh } from '@element-plus/icons-vue';
import { ref, watch, reactive } from 'vue';
import EnvList from '@/views/image-management/EnvList.vue';

const env_select = ref("1")
const currentPageNum = ref(1)
const pageSize = ref(9)

// 后端传来的数据
const total_envs = reactive([
  {
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFSElEQVR4nO2XyW8bVRzHHz1wYj1Qbo0dr1m97/vusT3jJN4tRClXFvXABahEr7RI/AcUISFxbOCIEBckpLaoF8ShvbWexeOxxzN2oYlJHnrPdnAiCtSZaRspX+lz8/vN50nv/X7PAJzmNKdRJRCA5wbFxmVwEgMrlecHVOOrYbEJwUlLP998dUg1fkTyJ24DfxRrmiHV/G0qf6I2MNx8wzIoNlqz8idmA8ONZmFQbAyPyg+pxg/gWc+AatQHxeZoRhojk42v0WU++nspV8/LuWpLylXvS0SNAE8zw2LzrQHV/HMqPSARdcQV1Eb/aQ0Sl3MVKBMVKBHle+BpZUjV3x6Q9b0ZaSjna3uDfO3df1snEZX7MlGGcrYMpWzp6WxAouqUTNZHWLyAqCH5HTlfL//nWqJESOnSfSlTutdPb2afjPGsAFn1yvn6AyQ9yI+Rc9UdmahugGc9vxcq5wa5mjAWryJxKOUqu1K2SipRvx/b0PXj1DtAtedBvvIzkh6DLmFlXyLKbypRvx/bcIgxiuvFqP1uhKoDpSMTlc+n3QOTLUM5U/5Qidr9OJkSY+RAjJFQjJJQjJCSGCK1QKmImapdypb2sDSmBPvp0vajWuVj148WEr0oORKjBShGxnRDuW3FnsVSpvwTkpYyUzbv9pKVl4GCESOFD3rhPDwglIO9QDZ47ML9TKk6lt6CUnqMnNoKA4UDwSdnuiHiNhYPEphuIHv92IWl9NYtLJ7aHJPc+AaolK4/m+sFsDjs+rNQ8GVGrC91du6CYmbTPhXvJzegmCju9RNbi0DFdP2ZO11fBnZ9aYzgTZ2fu5iYKF5G4v0EoohQ/XUpeFOfCV4sDgVPCnbciS/mLtaPF7/H4nEEBcUYdQGoHMGdSgueJBTciAQUXPEbcxfrx0h6Ig5xj44X7EDl8K6EUXAlYAfhjCP4uYv1ouRDPFgwqD8XXwEqp70ceQGLO2IY3h7ZmbtYL5LfmQ4WMZKHHT/1IlA5gjv7UscehQjeFoG8Lfxw7mK9cK4zO1j4IGEEKqezFjNhcSsiDPn18PxHqBvK3cSDZTJchGAmCVRO2xJK85Yw5C0h2F4PwfZacP5L3A0SX04mIkbwpT8FKodbC15trweROIZbCVybu5jgS1/o+jMQg4dL6i5QOdxq4E57NQAxK37ILAfmH2ScJ/664E2PurODxZVMAJXSXvGnkTSHWPZBdsm3y+iDrx2rqOBObf89WJJQcCZuKfWMng0E4Ay75L2NxLklL4Y1e4//mOt5ksEjgwW2HbH3gMLhzN6LWNyMxD2YtsnpV6R4xxn7bjpYOvYY5G3REWeLKnaUOLMnxZjcIyxucmMYg0uZPzQo7HpIy9uiMm+bDBdrBLatIZGzBRNKyLMmt4jFjS4MY3BKrMmjAUqGt0XqbWt4f9qjEdxacMSvB99H5/dx66E1tNF9kTE4R1jcgMUhrXfuszp7VVH5g01YQpfwcDno05N2t+r7lV3xFf5vHc7gTLJG1y9TaUaPcEBG54C0zv6RKvIHH18LXOJWA/vt1Um7m7Q83PbM3juc2XMFHQva6DOjhxmCMXiWaL07zepdVxmD8+5RaUZnh/SifZ/R2j4GTyLsir/GLnvl2ZbHTToHa5pcROPkTBsQU+HD0swiwgZbGqvU0qh0bB65CaNby5nd384rTWsnLFi22QWLshf2cUIbHQHU8hi9a/eQtO6wNH1Yere1YLneOmdVps8rEXZx/Syz6DhP6xzXaK39JqO1dWitbYfW2HZaGmuntWC5QWus11oa63lGbz3e8+A0pzkNmOYv0NHVTAJhqkQAAAAASUVORK5CYII=",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "09:59:39",
    note: "",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "",
    note: "",
    size: "",
  },
])

const personal_envs = reactive([
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
])

const opening_envs = reactive([
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },

])

const basic_envs = reactive([
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
  {
    icon: "",
    title: "pytorch",
    tag: "tag:b3461ea6-7643fe72-czq-c7498-2.0.1-cuda11.7-cudnn8-devel-v20",
    sharing: "",
    date: "最近使用时间：2024-09-18 09:59:39",
    note: "备注:Auto commit before container finishing",
    size: "",
  },
])

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

</script>

<template>
  <el-row>
    <el-col :span="12" class="env-title">
      <span>实验环境</span>
    </el-col>

    <el-col :span="12" class="env-refresh">
      <el-button type="primary">
        <el-icon>
          <Refresh />
        </el-icon>刷新镜像列表
      </el-button>
    </el-col>
  </el-row>

  <div class="env-list">
    <el-radio-group v-model="env_select">
      <el-radio value="1" size="large" border>全部环境</el-radio>
      <el-radio value="2" size="large" border>个人环境</el-radio>
      <el-radio value="3" size="large" border>公开环境</el-radio>
      <el-radio value="4" size="large" border>基础环境</el-radio>
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