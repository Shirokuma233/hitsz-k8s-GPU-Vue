<script setup>
import HomeSide from '@/views/home/HomeSide.vue';
import HomeHeader from '@/views/home/HomeHeader.vue';
</script>


<template>
  <div class="bear-home">
    <HomeHeader />

    <div class="main">
      <HomeSide />

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>


<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  font-size: 14px;
}

a {
  outline: none;
  text-decoration: none;
  cursor: pointer;
}

ul,
li {
  list-style-type: none;
}

/* .bear-home */
.bear-home {
  display: flex;
  flex-direction: column;
  /* 容器内的元素从上至下排列 */
  height: 100vh;
  margin-right: 30px;
}


/* .bear-home .main */
.bear-home .main {
  display: flex;
  height: calc(100vh - 55px);
  /* 减去 header 高度 */
}

.bear-home .main .side {
  width: 200px;
  background: #fff;
}

.bear-home .main .content {
  padding: 5px;
  flex: 1;
  overflow-y: auto;
}
</style>