<template>
  <div class="config-page">
    <h1>系统设置</h1>
    <div>
        <!-- 触发弹框的按钮 -->
        <el-button class="newConfigClass" @click="addNewConfig()">新增</el-button>

        <!-- 新增弹框 -->
        <el-dialog
          title="新增配置"
          :visible.sync="dialogVisible"
          @close="resetConfigForm()">
          <!-- 新增表单 -->
          <el-form ref="newDataForm" :model="newData"  label-width="80px">
            <el-form-item label="编码" prop="configCode">
              <el-input v-model="newData.configCode" required></el-input>
            </el-form-item>
            <el-form-item label="数值" prop="configValue">
              <el-input v-model="newData.configValue" required></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describeMsg">
              <el-input v-model="newData.describeMsg" required></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="active">
                <el-radio   v-model="newData.active" label="Y" >生效</el-radio>
                <el-radio   v-model="newData.active" label="N" >不生效</el-radio>
            </el-form-item>
            <el-form-item label="级别" prop="level">
                <el-radio   v-model="newData.level" label="1" >系统</el-radio>
                <el-radio   v-model="newData.level" label="0" >项目</el-radio>
            </el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    <table class="config-table">
      <thead>
        <tr>
          <th>编码</th>
          <th>数值</th>
          <th>描述</th>
          <th>状态</th>
          <th>级别</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in configs" :key="item.id">
          <td>{{ item.configCode }}</td>
          <td>{{ item.configValue }}</td>
          <td>{{ item.describeMsg }}</td>
          <td>{{ item.active }}</td>
          <td>{{ item.level }}</td>
          <td>
            <button @click="editConfig(item)">编辑</button>
            <button @click="deleteConfig(item)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="config-details" v-if="selectedConfig">
      <h2>{{ selectedConfig.userName }}</h2>
      <p>邮箱: {{ selectedConfig.email }}</p >
      <p>角色: {{ selectedConfig.role }}</p >
      <p>注册时间: {{ selectedConfig.createdAt }}</p >
      <button @click="closeUserDetails">关闭</button>
    </div>
     <!-- 分页部分 -->
      <div class="elPaginations">
        <el-pagination layout="slot" :total="Pages.total">
          <span class="leftPagination"
            >共{{ Pages.total }}条记录，第{{ Pages.pageIndex }}/{{
              Math.ceil(Pages.total / Pages.pageSize)
            }}页面</span
          >
        </el-pagination>
        <el-pagination
          style="color: #757575"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="Pages.pageIndex"
          :page-sizes="[5, 10, 20]"
          :page-size="Pages.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="Pages.total"
        >
        </el-pagination>
      </div>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
      name: 'ConfigPage',
      data() {
        return {
          active: "Y",
          level: "1",
          configs: [],
          selectedConfig:null,
          dialogVisible: false,
           // 分页排序数据
          Pages: {
              pageIndex: 1,
              pageSize: 10, // 默认每页10条
              total: 0
              //sortWord: "id", // 默认 id降序
             //sortOrder: "DESC", // "ASC"
             // searchWord: "",
          },
          newData: {
             id: '',
             configCode: '',
             configValue: '',
             describeMsg: '',
             active: '',
             level: ''
          }
        }
      },
      mounted() {
        this.getConfigList();
      },
      methods: {
        // 页数改变
        handleCurrentChange(val) {
            this.Pages.pageIndex = val;
            this.getConfigList();
        },
          // 条目数改变
        handleSizeChange(val) {
            this.Pages.pageIndex = 1;
            this.Pages.pageSize = val;
            this.getConfigList();
        },
        resetConfigForm() {
            this.$refs.newDataForm.resetFields();
        },
        addNewConfig() {
            this.dialogVisible = true;
        },
        submitForm() {
            this.$refs.newDataForm.validate(valid=>{
                if(!valid){
                    return;
                }
                 this.$request.put('/api/config/add', this.newData).then(response => {
                     console.info(response);
                     if (response.status == 200) {
                        this.$message.success('添加配置成功！');
                        this.getConfigList();
                        this.dialogVisible = false;
                     } else {
                        return this.$message.error('添加配置失败！');
                     }
                 })
            })
        },
        getConfigList() {
             const loading = this.$loading({
                  // 开启数据加载效果
                  lock: true,
                  text: "数据加载中...",
                  spinner: "el-icon-loading",
                  background: "rgba(255,255,255,.5)",
             });
            this.$request.get('/api/config/list', {
                 params: {
                    pageIndex: this.Pages.pageIndex,
                    pageSize: this.Pages.pageSize
                  }
            }).then(response => {
                console.log(response.data.data);
                this.configs = response.data.data;
                loading.close(); // 关闭数据加载效果
                this.Pages.total = response.data.total;
            }).catch(error => {
                console.error('Error fetching config', error);
            })
        },
        showUserDetails(config) {
          this.selectedConfig = user;
        },
        closeUserDetails() {
          this.selectedConfig = null;
        },
        editConfig(config) {
          this.dialogVisible = true;
          this.newData.id = config.id;
          this.newData.configCode = config.configCode;
          this.newData.configValue = config.configValue;
          this.newData.describeMsg = config.describeMsg;
          this.newData.active = config.active == "生效" ? "Y" : "N";
          this.newData.level = config.level == "系统" ? "1" : "0";
        },
        deleteConfig(config) {
          console.log('编辑配置:', config);
          // 删除用户逻辑
           this.$request.delete('/api/config/delete/' + config.id).then(response => {
               if (response.status == 200) {
                  this.$message.success('删除配置成功！');
                  this.getConfigList();
               } else {
                  return this.$message.error('删除配置失败！');
               }
           })
        }
      }
    }
</script>

<style scoped>
.newConfigClass {
  float: right; /* 使按钮浮动到容器的右边 */
}
.config-page {
  padding: 20px;
}

.config-table {
  width: 100%;
  border-collapse: collapse;
}

.config-table th,
.config-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}


.config-details {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}
</style>