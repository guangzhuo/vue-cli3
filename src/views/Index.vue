<template>
 <div>
     <el-container>
         <el-header class="header">Header</el-header>
         <el-container>
             <el-aside width="200px" class="aside" style="background-color: rgba(57, 61, 73, 1)">
                 <el-menu
                         index="1"
                         background-color="#393d49"
                          text-color="#fff"
                          active-text-color="#ffd04b">
                     <el-menu-item index="3">工作台</el-menu-item>
                     <el-submenu index="2">
                         <template slot="title">
                             <i class="el-icon-location"></i>
                             <span slot="title">导航一</span>
                         </template>
                         <el-menu-item-group>
                             <!--<span slot="title">分组一</span>-->
                             <el-menu-item index="1-1">选项1</el-menu-item>
                             <el-menu-item index="1-2">选项2</el-menu-item>
                         </el-menu-item-group>
                     </el-submenu>
                 </el-menu>
             </el-aside>
             <el-main class="Main">
                 <router-view/>
             </el-main>
         </el-container>
     </el-container>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   created() {},
   mounted() {},
   components: {

   }
 }
</script>

<style scoped>
  .header{
      background: white;
  }
  .aside{
      position: absolute;
      top: 60px;
      bottom: 0;
  }
  .Main{
      margin-left: 200px;
  }
 
</style>
