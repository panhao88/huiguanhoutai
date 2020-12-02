<template>
  <div class="box1">
    <!-- 首页布局 -->
    <el-container>
      <el-header>
        <navigation></navigation>
      </el-header>
      <el-container>
        <!-- <el-aside width="15%">
          <sidebar></sidebar>
        </el-aside> -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import navigation from "../../components/navigation/navigation";
// import sidebar from "../../components/sidebar/sidebar";
export default {
  name: "",
  props: {},
  components: {
    navigation,
    // sidebar
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.box1{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.el-header{
    padding: 0px;
}
</style>