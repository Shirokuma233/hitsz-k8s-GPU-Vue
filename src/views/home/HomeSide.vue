<script setup>

</script>

<template>
  <div class="side">
    <el-menu router text-color="#000" active-text-color="#40a9ff">
      <el-menu-item index="/home/dashboard">
         集群概览 
      </el-menu-item>

      <el-menu-item index="/home/image-management">
         实验环境
      </el-menu-item>

      <el-menu-item index="/home/container-management">
         我的实验
      </el-menu-item>

      <el-menu-item index="/home/file-management">
         我的文件
      </el-menu-item>

      <el-menu-item index="/home/file-share">
         共享空间
      </el-menu-item>


    </el-menu>
  </div>
</template>

<style scoped></style>