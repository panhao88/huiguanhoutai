<template>
  <div>
    <div class="box1">
      <div class="bot">
        <div class="box2">
          <div>欢迎来到成都慧冠教育咨询有限责任公司站点信息管理</div>
        </div>
        <div class="box3">
          <div>{{ gaka.userName }}</div>
          <div @click="signout">退出</div>
        </div>
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
    return {
      gaka: {},
    };
  },
  methods: {
      //退出
      signout(){
          localStorage.removeItem('user')
          this.$router.push('/login')
          this.$message.error("退出成功");
      }
  },
  mounted() {
    this.gaka = JSON.parse(localStorage.getItem("user"));
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.box1 {
  width: 100%;
  height: 60px;
  background: rgb(46, 94, 133);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.box2 {
  font-size: 25px;
  color: #fff;
}
.box3 {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
}
.bot {
  width: 75%;
  display: flex;
  justify-content: space-around;
}
</style>