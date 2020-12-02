<template>
  <div>
    <div class="box">
      <div class="box1">
        <el-col>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="rgb(60,120,140)"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1" @click="homepage">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <!-- <el-menu-item index="2" @click="goto">
              <i class="el-icon-menu"></i>
              <span slot="title">站点</span>
            </el-menu-item> -->
          </el-menu>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
      //首页
      homepage(){
          this.$router.push('/')
      },
      //战绩
      goto(){
        this.$router.push('/Record')
      }
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  width: 15%;
  height: 800px;
  background: rgb(60, 120, 140);
  position: fixed;
}
// .el-menu-vertical-demo {
//   height: 600px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// }
</style>