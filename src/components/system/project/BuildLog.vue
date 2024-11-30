
/**<template>
  <div id="app">
    <h1>Text from Backend</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p v-for="(line, index) in lines" :key="index">{{ line }}</p >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lines: [],
      textContent: ''
    };
  },mounted() {
     this.getLogs();
  }, methods: {
    getLogs() {
      this.$request.get('/api/project/get/logs', {

      }).then(response => {
          this.lines = response.data;
          loading.close(); // 关闭数据加载效果
      }).catch(error => {
      })
  }
  }
};
</script>**/


<template>
  <div id="app">
    <h1>Build Log</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p v-for="(line, index) in lines" :key="index">{{ line }}</p >
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      lines: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchText() {
      this.loading = true;
      this.error = null; // 重置错误信息
      try {
        const response = await axios.get('http://localhost:8081/hive/api/project/get/logs');
        this.lines = response.data; // 直接获取数据
      } catch (err) {
        console.error('Error fetching data:', err);
        this.error = 'Error fetching data'; // 设置错误信息
      } finally {
        this.loading = false; // 无论成功与否，都设置为加载完成
      }
    },
  },
  mounted() {
    this.fetchText(); // 组件挂载时自动获取文本
  },
};
</script>

<style>
/* 添加样式以便更好展示 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.error {
  color: red;
}
</style>

<style>
/* Style for the app */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left; /* Align text to the left */
  margin-top: 10px;
}



/* Loading message style */
.loading {
  text-align: center; /* Center loading text */
}

/* Error message style */
.error {
  color: red;
  text-align: center; /* Center error message */
}
</style>
