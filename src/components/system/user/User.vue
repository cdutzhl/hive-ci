<template>
  <div class="user-page">
    <h1>用户列表</h1>
    <div>
        <!-- 触发弹框的按钮 -->
        <el-button class="newUserClass" @click="addNewUser()">新增</el-button>

        <!-- 新增弹框 -->
        <el-dialog
          title="新增用户"
          :visible.sync="dialogVisible"
          @close="resetUserForm()">
          <!-- 新增表单 -->
          <el-form ref="newDataForm" :model="newData" label-width="80px">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="newData.userName" required></el-input>
            </el-form-item>
             <el-form-item label="邮箱" prop="email">
                <el-input v-model="newData.email" type="email"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
                <el-input v-model.trim="newData.password" placeholder="请输入密码" type="password" show-password/>
             </el-form-item>
             <el-form-item label="确认密码" prop="confirmPassword">
                 <el-input v-model.trim="newData.confirmPassword" placeholder="请输入密码" type="password" show-password/>
             </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    <table class="user-table">
      <thead>
        <tr>
          <th>用户名</th>
          <th>邮箱</th>
          <th>角色</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.userName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="showUserDetails(user)">查看详情</button>
            <button @click="editUser(user)">编辑</button>
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
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
      name: 'UserPage',
      data() {
        return {
          users: [],
          selectedUser:null,
          dialogVisible: false,
          newData: {
             userName: '',
             email: '',
             password: '',
             confirmPassword: ''
          }
        }
      },
      mounted() {
        this.getUserList();
      },
      methods: {
        resetUserForm() {
            this.$refs.newDataForm.resetFields();
        },
        addNewUser() {
            this.dialogVisible = true;
            this.newData.email ='';
            this.newData.password ='';
        },
        submitForm() {
            this.$refs.loginRef.validate(async (valid) => {
                 if(this.newData.password != this.newData.confirmPassword) {
                                alert("两次输入的密码不一致，请重新输入！")
                 }
                 console.info(this.newData);
            })
        },
        getUserList() {
            this.$request.get('/api/user/list')
            .then(response => {
                this.users = response.data;
                //selectedUser = response.data[0]
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
          console.log('删除用户:', user);
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