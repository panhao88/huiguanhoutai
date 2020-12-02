<template>
  <div class="box1">
    <div class="box2">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <div class="input-name">
            <el-input v-model="ruleForm.username"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <div class="input-name">
            <el-input v-model="ruleForm.password"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "111111",
      },
      user:{},
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
  methods: {
    resetForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .get(
              `/api/api/login/doLogin?userName=${this.ruleForm.username}&password=${this.ruleForm.password}`
            )
            .then((res) => {
              console.log(res);
              if (res.data.state === "ok") {
                  let user = res.data.loginAccount
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
  mounted() {},
  watch: {},
  computed: {},
  filters: {},
};
</script>

<style scoped lang='scss'>
.box1 {
  //   position: fixed;
  //   margin: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box2 {
  width: 600px;
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
// // input输入框名字
// .input-name {
//   width: 100%;
// }
// .inputs {
//   width: 80%;
//   display: flex;
// }
</style>