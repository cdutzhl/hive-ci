<template>
  <div class="projectStatus-page">
    <h1>项目列表</h1>

    <table class="projectStatus-table">
      <thead>
        <tr>
          <th>项目</th>
          <th>上次成功</th>
          <th>上次失败</th>
          <th>持续时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td> <router-link to="/buildLog">{{ project.projectName }}</router-link></td>
          <td>{{ project.lastSuccess }}</td>
          <td>{{ project.lastFail }}</td>
          <td>{{ project.duration }}</td>
          <td>
            <button  @click="build(project)">构建</button>
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
      name: 'ProjectStatusPage',
      data() {
        return {
          projects: [],
           // 分页排序数据
          Pages: {
              pageIndex: 1,
              pageSize: 10, // 默认每页10条
              total: 0
              //sortWord: "id", // 默认 id降序
             //sortOrder: "DESC", // "ASC"
             // searchWord: "",
          }
        }
      },
      mounted() {
        this.getProjectStatusList();
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
        getProjectStatusList() {
             const loading = this.$loading({
                  // 开启数据加载效果
                  lock: true,
                  text: "数据加载中...",
                  spinner: "el-icon-loading",
                  background: "rgba(255,255,255,.5)",
             });
            this.$request.get('/api/project/get/projectStatus', {
                 params: {
                    pageIndex: this.Pages.pageIndex,
                    pageSize: this.Pages.pageSize
                  }
            }).then(response => {
                console.log(response.data.data);
                this.projects = response.data.data;
                loading.close(); // 关闭数据加载效果
                this.Pages.total = response.data.total;
            }).catch(error => {
                console.error('Error fetching project status', error);
            })
        },build(project) {
               console.log('编辑用户:', project);
               this.$request.post('/api/project/build/projectId/' + project.id).then(response => {
                   if (response.status == 200) {
                     // this.$message.success('删除用户成功！');
                      //this.getUserList();
                   } else {
                      //return this.$message.error('删除用户失败！');
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
.projectStatus-page {
  padding: 20px;
}

.projectStatus-table {
  width: 100%;
  border-collapse: collapse;
}

.projectStatus-table th,
.projectStatus-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.projectStatus-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.projectStatus-details {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}
</style>