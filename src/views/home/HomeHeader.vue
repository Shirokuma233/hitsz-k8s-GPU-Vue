<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  router.push("/login")
};

const username = ref('');

onMounted(() => {
  // 从会话存储中获取用户名
  username.value = sessionStorage.getItem('username') || '默认用户名';
});
</script>

<template>
  <div class="header">
    <div class="title">
        <a href="/home/dashboard">BearOs</a>
    </div>

    <div class="admin">
      <el-dropdown trigger="click">
        <span class="el-dropdown-admin">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<style scoped>
/*  .header */
.header {
  display: flex;
  height: 55px;
  background: #fff;
}

.header .title {
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  background: #fff;
  
}

.header .title a {
  color: rgb(11, 153, 201);
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
}


.header .admin {
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  flex: 1;
}

.header .admin .el-dropdown .el-dropdown-admin {
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
}
</style>
