<template>
  <div class="addProject-page" id="app">
     <h1>新建项目</h1>
    <div class="container">
      <form @submit.prevent="createProject" class="project-form">
        <div class="form-group">
          <label for="project-name" class="form-label">项  目  名  称:</label>
          <input type="text" id="project-name" v-model="projectName" placeholder="输入项目名称" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="project-description" class="form-label">项  目  描  述:</label>
          <textarea id="project-description" v-model="projectDescription" placeholder="输入项目描述" class="form-control" required></textarea>
        </div>

        <div class="form-group">
                  <label for="project-repository" class="form-label">仓  库  地  址:</label>
                  <input type="text" id="project-repository" v-model="projectRepository" placeholder="输入仓库地址" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="pipeline-script" class="form-label">Pipeline 脚本:</label>
          <textarea id="pipeline-script" v-model="pipelineScript" placeholder="Pipeline脚本" rows="20" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">创建项目</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      projectName: '',
      projectDescription: '',
      projectType: '',
      projectRepository: '',
      pipelineScript: ''
    }
  },
  methods: {
    createProject() {
      // 在这里添加创建Jenkins项目的逻辑
      console.log('Project Name:', this.projectName);
      console.log('Project Description:', this.projectDescription);
      console.log('Project Type:', this.projectType);
      console.log('Repository URL:', this.projectRepository);
      console.log('Pipeline Script:', this.pipelineScript);
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