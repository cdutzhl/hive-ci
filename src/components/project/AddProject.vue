<template>
  <div class="addProject-page" id="app">
     <h1>新建项目</h1>
    <div class="container">
      <el-form  :model="newData" class="project-form">

        <div class="form-group">
          <label for="project-name" class="form-label">项  目  名  称:</label>
           <el-input id="projectName" v-model="newData.projectName" placeholder="输入项目名称"  required></el-input>
        </div>

        <div class="form-group">
          <label for="project-description" class="form-label">项  目  描  述:</label>
           <el-input id="desc" v-model="newData.desc" placeholder="输入项目描述"  required></el-input>
        </div>

        <div class="form-group">
          <label for="project-repository" class="form-label">仓  库  地  址:</label>
          <el-input id="repository" v-model="newData.repository" placeholder="输入仓库地址"  required></el-input>
        </div>

           <div class="form-group">
                  <label for="project-repository" class="form-label">分     支:</label>
                  <el-input id="repository" v-model="newData.branch" placeholder="输入构建分支"  required></el-input>
                </div>

        <div class="form-group">
          <label for="pipeline-script" class="form-label">Pipeline 脚本:</label>
          <el-input type="textarea" id="pipeline-script" v-model="newData.pipelineScript" placeholder="Pipeline脚本" rows="15"  required></el-input>
        </div>

        <button type="submit" @click="createProject()" class="btn btn-primary">创建项目</button>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      newData: {
        projectName: '',
        desc: '',
        repository: '',
        pipelineScript: ''
      }
    }
  },
  methods: {
    createProject() {
       this.$request.put('/api/project/add', this.newData).then(response => {
              console.info(response);
              if (response.status == 200) {
                 this.$message.success('添加用户成功！');
                 this.$router.push('projectStatus');
              } else {
                 return this.$message.error('添加用户失败！');
              }
       })
    }
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
}

.project-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.form-label {
  flex-basis: 150px;
  font-weight: bold;
}

.form-control {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>