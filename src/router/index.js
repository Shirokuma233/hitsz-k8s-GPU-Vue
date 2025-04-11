import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    //登录页
    path: "/login",
    component: () => import("@/views/login/LoginView.vue"),
  },
  {
    //标准主页
    path: "/home",
    component: () => import("@/views/home/HomeView.vue"),
    children: [
      {
        //集群概览
        path: "dashboard",
        component: () => import("@/views/dashboard/DashboardView.vue"),
      },
      {
        //实验环境
        path: "image-management",
        component: () => import("@/views/image-management/ImageManagementView.vue"),
      },
      {
        //我的实验
        path: "container-management",
        component: () => import("@/views/container-management/ContainerManagementView.vue"),
      },
      {
        //我的文件
        path: "file-management",
        component: () => import("@/views/file-management/FileManagementView.vue"),
      },
      {
        //共享平台
        path: "file-share",
        component: () => import("@/views/file-share/FileShareView.vue"),
      },
      {
        //平台数据集
        path: "sharing-data",
        component: () => import("@/views/sharing-data/SharingDataView.vue"),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router