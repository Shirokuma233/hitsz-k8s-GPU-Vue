<script setup>
const props = defineProps({
  imageIcon: String,
  imageTitle: String,
  imageTag: String,
  imageSharing: String,
  imageDate: String,
  imageNote: String,
  imageSize: String,
});
</script>

<template>
  <el-card >
    <div class="image-info">
        <div class="image-header">
          <img
            :src= "props.imageIcon" alt="镜像图标" class="image-icon">
          <p class="image-title">{{imageTitle}}</p>
        </div>
        <p class="image-tag">{{ props.imageTag }}</p>
        <p class="image-sharing">{{ props.imageSharing }}</p>
        <p class="image-date">{{ props.imageDate }}</p>
        <p class="image-note">{{props.imageNote}}</p>
        <p class="image-size">{{ props.imageSize }}</p>
      </div>
    <template #footer>
      <el-dropdown trigger="click">
        <span class="el-dropdown-more">
          更多
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item >设为公开</el-dropdown-item>
            <el-dropdown-item >添加备注</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button link >
        删除
      </el-button>

    </template>
  </el-card>

</template>

<style scoped>
/* 卡片容器样式 */
*{
  margin: 0;
  padding: 0;
}

.el-card {
  display: flex;
  width: 350px;
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-direction: column;
}

/* 图片信息容器样式 */
.image-info {
  display: flex;
  flex-direction: column;
}

/* 图片头部样式 */
.image-header {
  display: flex;
  align-items: center;
}

/* 图片图标样式 */
.image-icon {
  width: 30px;
  height: 30px;
  margin-right: 12px;
  border-radius: 50%;
}

/* 图片标题样式 */
.image-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* 图片标签样式 */
.image-tag {
  font-size: 14px;
  color: #666;
}

/* 图片日期样式 */
.image-date {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

/* 图片备注样式 */
.image-note {
  font-size: 12px;
  color: #666;
}

/* 卡片底部样式 */
.el-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 更多按钮样式 */
.el-dropdown-more {
  cursor: pointer;
  font-size: 14px;
  color: #4ba6e2;
  margin-top: 2px;
}

/* 删除按钮样式 */
.el-button {
  font-size: 14px;
  color: #f56c6c;
}

/* 下拉菜单项样式 */
.el-dropdown-item {
  font-size: 14px;
  color: #333;
  padding: 8px 16px;
}

/* 下拉菜单项悬停样式 */
.el-dropdown-item:hover {
  background-color: #f5f7fa;
  color: #409eff;
}
</style>