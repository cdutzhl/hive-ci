<template>
  <div class="projectStatus-page">
    <h1>项目列表</h1>

    <table class="projectStatus-table">
      <thead>
        <tr>
          <th>项目组名</th>
          <th>项目组负责人</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in project" :key="user.id">
          <td>{{ user.userName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="showUserDetails(user)">项目详情</button>
           <!--     <button @click="editUser(user)">编辑</button> -->
            <button @click="deleteUser(user)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="user-details" v-if="selectedUser">
      <h2>{{ selectedUser.userName }}</h2>
      <p>邮箱: {{ selectedUser.email }}</p >
      <p>角色: {{ selectedUser.role }}</p >
      <p>注册时间: {{ selectedUser.createdAt }}</p >
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
      name: 'UserPage',
      data() {
      var checkEmail = (rule, value, callback) => {
          const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
          if(regEmail.test(value)){
              return callback();
           }
           callback(new Error('请输入合法的额邮箱'));
        };
      var checkPassword = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.newData.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
      }
        return {
          users: [],
          selectedUser:null,
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
             userName: '',
             email: '',
             password: '',
             confirmPassword: ''
          },
          addUserFormRul: {
              userName: [{
                required: true,
                message: '请输入用户名',
                trigger: 'blur'
              }],
              email: [{
                  required: true,
                  message: '请输入用户名',
                  trigger: 'blur'
              }, {
                   validator: checkEmail, trigger: 'blur'
              }],
              password: [{
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur'
                },
                {
                   min: 6,
                   max: 12,
                   message: '长度为6个字符',
                   trigger: 'blur'
               }
              ],
               confirmPassword: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                  },
                  {
                     min: 6,
                     max: 12,
                     message: '长度为6个字符',
                     trigger: 'blur'
                 },{
                    validator: checkPassword, trigger: 'blur'
                 }
               ]
          }

        }
      },
      mounted() {
        this.getUserList();
      },
      methods: {
        // 页数改变
        handleCurrentChange(val) {
            this.Pages.pageIndex = val;
            this.getUserList();
        },
          // 条目数改变
        handleSizeChange(val) {
            this.Pages.pageIndex = 1;
            this.Pages.pageSize = val;
            this.getUserList();
        },
        resetUserForm() {
            this.$refs.newDataForm.resetFields();
        },
        addNewUser() {
            this.dialogVisible = true;
            this.newData.email ='';
            this.newData.password ='';
        },
        submitForm() {
            this.$refs.newDataForm.validate(valid=>{
                if(!valid){
                    return;
                }
                 this.$request.put('/api/user/add', this.newData).then(response => {
                     console.info(response);
                     if (response.status == 200) {
                        this.$message.success('添加用户成功！');
                        this.getUserList();
                        this.dialogVisible = false;
                     } else {
                        return this.$message.error('添加用户失败！');
                     }
                 })
            })
        },
        getUserList() {
             const loading = this.$loading({
                  // 开启数据加载效果
                  lock: true,
                  text: "数据加载中...",
                  spinner: "el-icon-loading",
                  background: "rgba(255,255,255,.5)",
             });
            this.$request.get('/api/user/list', {
                 params: {
                    pageIndex: this.Pages.pageIndex,
                    pageSize: this.Pages.pageSize
                  }
            }).then(response => {
                console.log(response.data.data);
                this.users = response.data.data;
                loading.close(); // 关闭数据加载效果
                this.Pages.total = response.data.total;
            }).catch(error => {
                console.error('Error fetching users', error);
            })
        },
        showUserDetails(user) {
          this.selectedUser = user;
        },
        closeUserDetails() {
          this.selectedUser = null;
        },
        editUser(user) {
          // 编辑用户逻辑
          console.log('编辑用户:', user);
        },
        deleteUser(user) {
          // 删除用户逻辑
           this.$request.delete('/api/user/delete/' + user.id).then(response => {
               if (response.status == 200) {
                  this.$message.success('删除用户成功！');
                  this.getUserList();
               } else {
                  return this.$message.error('删除用户失败！');
               }
           })
        }
      }
    }
</script>

<style scoped>
.newUserClass {
  float: right; /* 使按钮浮动到容器的右边 */
}
.user-page {
  padding: 20px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-details {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}
</style>