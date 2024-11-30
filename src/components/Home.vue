<template>

  <el-container>
    <!-- 页面顶部 -->
    <el-header>
      <div class="title">
        软 件 集 成 实 训 平 台
      </div>
      <div class="logonout">
        <el-popconfirm title="确认退出登录？" @confirm='loginout()'>
          <div slot="reference">退出登录</div>
        </el-popconfirm>
      </div>

    </el-header>
    <el-container>
      <!-- 侧边菜单栏 -->
      <el-aside width="250px">
        <el-menu :router='rou' background-color='#003055' class="el-menu-demo" default-active='/projectStatus'
                 text-color="#fff" active-text-color="#00aaff" unique-opened>
        <!-- 项目管理 -->
         <el-submenu index="projectManage">
           <template slot="title">
             <i class="el-icon-s-home"></i>
             <span>持续集成</span>
           </template>
           <el-menu-item index="/newProject">
             <template slot="title">
               <i class="el-icon-document-copy"></i>
               <span>新建项目</span>
             </template>
           </el-menu-item>
            <el-menu-item index="/projectStatus">
             <template slot="title">
               <i class="el-icon-document-copy"></i>
               <span>持续集成</span>
             </template>
           </el-menu-item>
            <el-menu-item index="/clientNode">
               <template slot="title">
                    <i class="el-icon-document-copy"></i>
                  <span>客户端管理</span>
               </template>
            </el-menu-item>
         </el-submenu>

          <!-- 系统管理 -->
          <el-submenu index="systemManage">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/user">
              <template slot="title">
                <i class="el-icon-document-copy"></i>
                <span>用户管理</span>
              </template>
            </el-menu-item>
             <el-menu-item index="/project">
              <template slot="title">
                <i class="el-icon-document-copy"></i>
                <span>项目组管理</span>
              </template>
            </el-menu-item>
             <el-menu-item index="/system">
                  <template slot="title">
                    <i class="el-icon-document-copy"></i>
                  <span>系统管理</span>
               </template>
            </el-menu-item>


          </el-submenu>
          <!-- 接口管理 -->
          <el-submenu index="interfacaseManage">
            <template slot="title">
              <i class="el-icon-folder-opened"></i>
              <span>运维服务</span>
            </template>
            <el-menu-item index="/syslog">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>系统日志</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/clientNodeStatus">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>监控服务</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/interface">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>数据分析</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 主体内容显示区域 -->
      <el-main>
        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    /*
    退出登录的实现
    1、点击退出登录按钮，触发点击事件
    2、在处理函数中，删除sessionStorage中的token,并将路由重定向到login页面

    */

    export default {
        data() {
            return {
                rou: true
            }
        },
        methods: {
            // 退出登录的方法
            loginout() {
                window.sessionStorage.removeItem('token')
                this.$router.push('/login')
            }
        },

    }
</script>

<style scoped>
  /* --------页面顶部的样式-------- */
  .el-header {
    background: #003055;
    margin-bottom: 5px;
  }

  .title {
    width: 90%;
    color: #fff;
    font: normal 28px/60px "microsoft yahei";
    text-align: center;
    float: left;
  }

  .logonout {
    width: 60px;
    color: #fff;
    font: normal 14px/60px "microsoft yahei";
    float: right;
    text-align: center;
  }

  .logonout:hover {
    background: #000;
  }

  /* ----------侧边菜单的样式---------- */
  .el-menu {
    height: 850px;
  }
</style>