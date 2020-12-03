<template>
  <div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="star"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="remove"
      class="lizi"
    >
    </vue-particles>
    <div class="login_box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0"
        class="demo-ruleForm"
      >
        <h2 class="title">后台管理系统</h2>
        <el-form-item prop="username" style="position: relative">
          <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
          <!-- <img src="../assets/username.png" alt="" class="img_abs" /> -->
        </el-form-item>
        <el-form-item prop="password" style="position: relative">
          <el-input v-model="ruleForm.password" placeholder="密码" show-password ></el-input>
          <!-- <img src="../assets/password.png" alt="" class="img_abs" /> -->
        </el-form-item>
        <el-form-item class="denglu" >
          <el-button type="primary" @click="resetForm" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  // 接收父组件传递过来的参数
  props: {},
  // 注册组件
  components: {},
  // 定义变量
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      user: {},
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "用户名在2~10为之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能位空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "密码在错误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  // 事件方法执行
  methods: {
    resetForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .get(
              `http://beian.028qmhy.cn:81/api/login/doLogin?userName=${this.ruleForm.username}&password=${this.ruleForm.password}`
            )
            .then((res) => {
              console.log(res);
              if (res.data.state === "ok") {
                let user = res.data.loginAccount;
                // console.log(user,33)
                localStorage.setItem("user", JSON.stringify(user));
                this.$router.push("/");
                this.$message.success("登录成功");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.error("登录错误");
          return false;
        }
      });
    },
  },
  // 页面初始化方法
  mounted() {},
  // 监听值变化
  watch: {},
  // 计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.demo-ruleForm {
  margin-top: -50px;
  background: white;
  opacity: 0.8;
  width: 25vw;
  padding: 30px 50px 50px 50px;
  border-radius: 7px;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #525151;
}

.img_abs {
  position: absolute;
  left: 6px;
  top: 13px;
}
/deep/.el-input__inner {
  padding: 0 30px;
}
.lizi {
  background: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  width: 100vw;
  height: 100vh;
  // border: 1px solid red;
  position: relative;
}
.login_box {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, 0);
}

@media screen and (max-width: 450px) {
  // 表单
  .demo-ruleForm {
    margin-top: -50px;
    background: rgba($color: rgb(218, 214, 214), $alpha: 0.3);
    width: 55vw;
    padding: 30px 50px 50px 50px;
    border-radius: 7px;
  }
  // 粒子图
  .lizi {
    // background-image: url("../assets/timg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    // border: 1px solid red;
    position: relative;
  }
}
.denglu{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
