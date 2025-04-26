<script setup>
import { User, Lock} from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import requestUtil from '@/utils/request'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';


//const adminStore = useAdminStore()
const router = useRouter()

const data = reactive({
  username:"",
  password:""
})

const rules = {
  name: [
    {required: true, message: '请填写用户名', trigger: 'blur'}, 
    {min: 2, max: 10, message: '用户名长度为2-10个字符', trigger: 'blur'}
  ],
  password :[
    {required: true, message: '请填写密码', trigger: 'blur'}
  ]
}

const elFormRef = ref()
const login = async () => {
  // 先进行表单验证
  elFormRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
    
    // 验证通过后执行登录逻辑
    handleLogin();
  });
};

const handleLogin = async () => {
  try {
    // 登录成功后会向后端发送相应的请求
    const response_valid = await requestUtil.post("login/valid", data);
    console.log(response_valid.data);
    sessionStorage.setItem('username', data.username);
    console.log('用户名已存入 sessionStorage');

    // 检查是否存在PV，没有则要申请
    const response_resource = await requestUtil.post("login/resource", data);
    console.log(response_resource.data);
    //网页跳转
    router.push("/home/dashboard")
  } catch (error) {
    console.error("登录失败:", error);
    ElMessage({
    showClose: true,
    message: "用户名或密码错误",
    type: "error",
  });
  }
};

</script>

<template>
  <div class="login">
    <el-form :model="data" :rules="rules" ref="elFormRef">
      <div class="title">
        BearOs
      </div>

      <el-form-item >
        <el-input :prefix-icon="User" v-model="data.username"/>
      </el-form-item>

      <el-form-item >
        <el-input :prefix-icon="Lock" show-password v-model="data.password"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<style scoped>


.login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login .el-form{
  width: 360px;
  height: 240px;
  background: #fff;
  box-shadow: 0px 0px 20px #0486cd;
}

.login .el-form .title{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  height: 60px;
  font-weight: bold;
  color: #0486cd;
}

.login .el-form .el-form-item {
  margin-left: 30px;
  width: 300px;
}

.login .el-form .el-form-item .el-button {
  width: 300px;
}
</style>