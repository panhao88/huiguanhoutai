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
    =====================
    
=====================================
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