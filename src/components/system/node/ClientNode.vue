<template>
  <div class="node-page">
    <h1>节点管理</h1>
    <div>
        <!-- 触发弹框的按钮 -->
        <el-button class="newNodeClass" @click="addNewNode()">新增</el-button>

        <!-- 新增弹框 -->
        <el-dialog
          title="新增节点-"
          :visible.sync="dialogVisible"
          @close="resetNodeForm()">
          <!-- 新增表单 -->
          <el-form ref="newDataForm" :model="newData"  label-width="80px">
            <el-form-item label="服务名" prop="serverName">
              <el-input v-model="newData.serverName" required></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="ip">
              <el-input v-model="newData.ip" required></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port">
              <el-input v-model="newData.port" required></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describeMsg">
              <el-input v-model="newData.describeMsg" required></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="active">
                <el-radio   v-model="newData.active" label="Y" >启用</el-radio>
                <el-radio   v-model="newData.active" label="N" >关闭</el-radio>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    <table class="node-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>服务名</th>
          <th>地址</th>
          <th>端口</th>
          <th>描述</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in nodes" :key="item.id">
          <td>{{ item.serverName }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.ip }}</td>
          <td>{{ item.port }}</td>
          <td>{{ item.describeMsg }}</td>
          <td>{{ item.active }}</td>
          <td>
            <button @click="editNode(item)">编辑</button>
            <button @click="deleteNode(item)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

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
      name: 'NodePage',
      data() {
        return {
          active: "Y",
          nodes: [],
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
             serverName: '',
             code: '',
             ip: '',
             port: '',
             active: '',
             describeMsg: ''
          }
        }
      },
      mounted() {
        this.getNodeList();
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
            this.getNodeList();
        },
        resetNodeForm() {
            this.$refs.newDataForm.resetFields();
        },
        addNewNode() {
            this.dialogVisible = true;
            this.newData.id = '';
            this.newData.serverName = '';
            this.newData.ip = '';
            this.newData.code = '';
            this.newData.port = '';
            this.newData.active = 'Y';
            this.newData.describeMsg =  '';
        },
        submitForm() {
            this.$refs.newDataForm.validate(valid=>{
                if(!valid){
                    return;
                }
                 this.$request.put('/api/clientNode/add', this.newData).then(response => {
                     console.info(response);
                     if (response.status == 200) {
                        this.$message.success('添加节点成功！');
                        this.getNodeList();
                        this.dialogVisible = false;
                     } else {
                        return this.$message.error('添加节点失败！');
                     }
                 })
            })
        },
        getNodeList() {
             const loading = this.$loading({
                  // 开启数据加载效果
                  lock: true,
                  text: "数据加载中...",
                  spinner: "el-icon-loading",
                  background: "rgba(255,255,255,.5)",
             });
            this.$request.get('/api/clientNode/list', {
                 params: {
                    pageIndex: this.Pages.pageIndex,
                    pageSize: this.Pages.pageSize
                  }
            }).then(response => {
                console.log(response.data.data);
                this.nodes = response.data.data;
                loading.close(); // 关闭数据加载效果
                this.Pages.total = response.data.total;
            }).catch(error => {
                console.error('Error fetching config', error);
            })
        },
        showNodeDetails(item) {
          this.selectedConfig = item;
        },
        editNode(item) {
          this.dialogVisible = true;
          this.newData.id = item.id;
          this.newData.serverName = item.serverName;
          this.newData.ip = item.ip;
          this.newData.port = item.port;
          this.newData.describeMsg = item.describeMsg;
          this.newData.active = item.active == "生效" ? "Y" : "N";

        },
        deleteNode(item) {
          console.log('编辑配置:', item);
          // 删除用户逻辑
           this.$request.delete('/api/clientNode/delete/' + config.id).then(response => {
               if (response.status == 200) {
                  this.$message.success('删除节点成功！');
                  this.getNodeList();
               } else {
                  return this.$message.error('删除节点失败！');
               }
           })
        }
      }
    }
</script>

<style scoped>
.newNodeClass {
  float: right; /* 使按钮浮动到容器的右边 */
}
.node-page {
  padding: 20px;
}

.node-table {
  width: 100%;
  border-collapse: collapse;
}

.node-table th,
.node-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}


.node-details {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}
</style>