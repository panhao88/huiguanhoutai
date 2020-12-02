<template>
  <div>
    <el-card>
      <div class="confirm">
        <el-button type="success" @click="goto" class="success">添加</el-button>
      </div>
    </el-card>
    <el-card>
      <div>
        <el-table :data="arr" style="width: 100%">
          <el-table-column label="姓名" width="350" prop="name" align="center">
          </el-table-column>
          <el-table-column
            label="日期"
            width="180"
            prop="createAt"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="网站地址"
            width="240"
            prop="oldsite"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="授权天数"
            width="100"
            prop="days"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="授权码"
            width="400"
            prop="newsite"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="del(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 编辑 -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNumber"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRow"
        >
        </el-pagination>
      </div>
      <div>
        <el-dialog title="编辑" :visible.sync="dialogFormVisibleaa">
          <el-form :model="ruleFormmm" ref="ruleFormmm">
            <el-form-item label="使用单位" label-width="80px">
              <el-input v-model="ruleFormmm.username"></el-input>
            </el-form-item>
            <el-form-item label="网站地址" label-width="80px">
              <el-input v-model="ruleFormmm.poldsitepa"></el-input>
            </el-form-item>
            <el-form-item label="授权天数" label-width="80px">
              <el-input v-model="ruleFormmm.pdays"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" label-width="80px">
              <el-date-picker
                v-model="ruleFormmm.pbeginAt"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleaa = false">取 消</el-button>
            <el-button type="primary" @click="Confirmedit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 添加 -->
      <div>
        <el-dialog title="添加站点" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
            <el-form-item label="使用单位" label-width="80px" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="网站地址" label-width="80px" prop="oldsite">
              <el-input v-model="ruleForm.oldsite"></el-input>
            </el-form-item>
            <el-form-item label="授权天数" label-width="80px">
              <el-input v-model="ruleForm.days"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" label-width="80px">
              <el-date-picker
                v-model="ruleForm.beginAt"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
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
      arr: [], //列表数组
      dialogFormVisible: false, //dialog弹出框
      dialogFormVisibleaa: false, //编辑弹出框
      //添加用户
      ruleForm: {
        name: "",
        oldsite: "",
        days: "",
        beginAt: "",
      },
      //编辑用户
      ruleFormmm: {
        username: "",
        poldsitepa: "",
        pdays: "",
        pbeginAt: "",
      },
      id: 5,
      pageNumber: 0, //当前第几页
      totalPage: "", //一共几页
      pageSize: 10, //一页多少条
      totalRow: 0, //一共多少条
      rules: {
        name: [
          {
            required: true,
            message: "请输入单位",
            trigger: "blur",
          },
          { min: 3, max: 8, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
      
    };
  },
  methods: {
    //数据列表
    getdata() {
      axios
        .get("/api/api/site/sitePage")
        .then((res) => {
          if (res.data.state === "ok") {
            this.arr = res.data.page.list;
            let abb = []
            this.arr.map((item,index) => {
               abb = item.beginAt
            })
            console.log(abb)
            this.pageNumber = res.data.page.pageNumber;
            this.totalPage = res.data.page.totalPage;
            this.pageSize = res.data.page.pageSize;
            this.totalRow = res.data.page.totalRow;
          }
          console.log(res.data,"data");
          console.log(res.data.page.list)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //删除
    del(index, row) {
      const params = new URLSearchParams();
      params.append("id", row.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          axios
            .post("/api/api/site/siteDelete", params)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      this.getdata();
    },
    //添加
    goto() {
      this.dialogFormVisible = true;
    },
    // 确认添加
    confirm() {
      const params = new URLSearchParams();
      params.append("name", this.ruleForm.name);
      params.append("oldsite", this.ruleForm.oldsite);
      params.append("days", this.ruleForm.days);
      params.append("beginAt", this.ruleForm.beginAt);
        var time = new Date(this.ruleForm.beginAt)
        var year = time.getFullYear();
      console.log(year,"时间")
      axios
        .post("/api/api/site/siteSave", params)
        .then((res) => {
          console.log(res.data, "添加");
        })
        .catch((err) => {
          console.log;
        });
      this.getdata();
      this.ruleForm.name = "";
      this.ruleForm.oldsite = "";
      this.ruleForm.days = "";
      this.ruleForm.beginAt = "";
      this.dialogFormVisible = false;
    },
    // 编辑
    handleEdit(index, row) {
      this.id = row.id;
      console.log(this.id);
      console.log(row);
      this.dialogFormVisibleaa = true;
      this.ruleFormmm.username = row.name;
      this.ruleFormmm.poldsitepa = row.oldsite;
      this.ruleFormmm.pdays = row.days;
      this.ruleFormmm.pbeginAt = row.beginAt;
    },
    //确认编辑
    Confirmedit() {
      const params = new URLSearchParams();
      params.append("id", this.id);
      params.append("name", this.ruleFormmm.username);
      params.append("oldsite", this.ruleFormmm.poldsitepa);
      params.append("days", this.ruleFormmm.pdays);
      params.append("beginAt", this.ruleFormmm.pbeginAt);
      axios
        .post("/api/api/site/siteUpdate", params)
        .then((res) => {
          // if(res.data.)
          this.dialogFormVisibleaa = false;
        })
        .catch((err) => {
          console.log(err);
        });
      this.getdata();
    },
    // 分页条数
    handleSizeChange(val) {
      this.pageSize = val;
      axios
        .get(
          `/api/api/site/sitePage?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
        )
        .then((res) => {
          if (res.data.state === "ok") {
            this.arr = res.data.page.list;
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分页页数
    handleCurrentChange(val) {
      this.pageNumber = val;
      axios
        .get(`/api/api/site/sitePage?pageNumber=${this.pageNumber}`)
        .then((res) => {
          if (res.data.state === "ok") {
            this.arr = res.data.page.list;
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getdata();
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.confirm {
  margin-left: 30px;
}
</style>