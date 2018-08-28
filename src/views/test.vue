<template>
 <div>
    <h1>Test</h1>
    <i class="icon icon-name"></i>
    <i class="icon icon-mp" v-imgerror></i>
    <el-button type="primary" @click="setLogin">主要按钮</el-button>
    <div>{{"134567" | cut_str(3)}}</div>
    <div class="imgWrap">
      <img class='maxImg' v-lazy="img" alt="">
    </div>
 </div>
</template>

<script>
import apis from '@/config/apis';
// import axios from '@/config/axios';
 export default {
   data () {
     return {
      //  img:require("@/assets/images/icons/name.png")
       img:"http://www.51pptmoban.com/d/file/2015/03/08/7d359ef09e2ac149c3193f12038a18fd.jpg"
     }
   },
   created() {},
   mounted() {
     console.log(apis.typeList)
      this.$axios.get(apis.typeList,{}).then(data=>{
        console.log(data)
      })
   },
   methods:{
     setLogin() {
      //  .dispatch('getLoginProducts',{'name':'gz'})
      console.log(this.$store.state.LoginStore.login)
      console.log(this.$store.dispatch('getLoginProducts','222'))
      console.log(this.$store)
     }
   },
   components: {

   }
 }
</script>

<style scoped>
.imgWrap{
  width:200px;
  height:200px;
}
 
</style>
