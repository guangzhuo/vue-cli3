<template>
 <div>
     <!--测试分支提交-->
    <h1>Test</h1>
    <i class="icon icon-name"></i>
    <i class="icon icon-mp" v-imgerror></i>
    <el-button type="primary" @click="setLogin">主要按钮</el-button>
     <div>{{"134567" | cut_str(3)}}</div>
     <div>{{new Date().getTime()| timeflier}}</div>
    <div class="imgWrap">
      <img class='maxImg' v-lazy="img" alt="">
    </div>
    <div>
        <template>
    <div v-bgb-block>
        <div style="margin-top:10px;">
            <el-form :rules="model.rules" :model="model"  ref="form">
                <!-- 表布局 -->
                <el-table
                border
                :data="model.tableData"
                style="width: 100%;"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                    width="100px"
                    label="要求批次">
                    <template slot-scope="scope">
                            <el-form-item :prop="'tableData.' + scope.$index + '.input'" :rules='model.rules.name'>
                                <el-input style="width:80px"  v-model="scope.row.input" ></el-input>
                            </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                    width="180px"
                    label="要求供应商">
                    <template slot-scope="scope">
                            <el-form-item :prop="'tableData.' + scope.$index + '.supplier'" :rules='model.rules.supplier'>
                                <el-select style="width:130px" v-model="scope.row.supplier" placeholder="请选择要求供应商"></el-select>
                            </el-form-item>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    width="180px"
                    label="要求生产日期">
                        <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.producedate.start'" :rules='model.rules["producedate.start"]'>
                                    <bingobox-datepicker type="date" :model="scope.row.producedate" ></bingobox-datepicker>
                                </el-form-item>
                        </template>
                    </el-table-column> -->
                <!-- <el-table-column
                    width="180px"
                    label="要求有效期至">
                        <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.expireddate.start'" :rules='model.rules["expireddate.start"]'>
                                    <bingobox-datepicker type="date" :model="scope.row.expireddate" ></bingobox-datepicker>
                                </el-form-item>
                        </template>
                </el-table-column> -->
                <el-table-column
                    width="150px"
                    label="要求商品形态">
                        <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.goodstatus'" :rules='model.rules.goodstatus'>
                                    <el-select style="width:130px" v-model="scope.row.goodstatus" placeholder="请选择商品形态"></el-select>
                                </el-form-item>
                        </template>
                </el-table-column>
                <el-table-column
                    width="100px"
                    label="期待出库数量">
                        <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.name'" :rules='model.rules.name'>
                                    <el-input style="width:80px"  v-model="scope.row.name" ></el-input>
                                </el-form-item>
                        </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" v-button-color>删除</el-button>
                        </template>
                </el-table-column>
            </el-table>
            </el-form>
        </div>
    </div>
</template>
    </div>
 </div>
</template>

<script>
import apis from '@/config/apis';
// import axios from '@/config/axios';
 export default {
   data () {
        var validatename = (rule, value, callback) => {
           debugger;
            let reg = /^[\u4e00-\u9fa5A-z\d]{1,10}$/;
            if (value) {
                callback(new Error('姓名不能为空'));
            } else {
                if (!reg.test(value)) {
                    callback(new Error('姓名为1-10个中文或英文或数字字符,不包含特殊字符'));
                } else {
                    callback()
                }
            }
        };
     return {
      //  img:require("@/assets/images/icons/name.png")
       img:"http://www.51pptmoban.com/d/file/2015/03/08/7d359ef09e2ac149c3193f12038a18fd.jpg",
        //  form:{
        //         supplier2:"",
        //         type:"",
        //         desc:"",
        //         input:""
        //     },
            model:{
                rules: {
                    name:{ type:"string",required:true,validator: validatename,trigger:"change"},
                    input:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                    supplier:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                    goodstatus:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                    "producedate.start":{ type:"string",required:true,message:"必填字段",trigger:"change"},
                    "expireddate.start":{ type:"string",required:true,message:"必填字段",trigger:"change"}
                },
                tableData:[{
                    input:"",
                    name:"32323",
                    supplier:"",
                    goodstatus:"",
                    producedate:{
                        start:""
                    },
                    expireddate:{
                        start:""
                    }
                },{
                    input:"",
                    name:"32323",
                    supplier:"",
                    goodstatus:"",
                    producedate:{
                        start:""
                    },
                    expireddate:{
                        start:""
                    }
                }]
            },
     }
   },
   created() {},
   mounted() {
     console.log(apis.typeList)
      /*this.$axios.get(apis.typeList,{}).then(data=>{
        console.log(data)
      })*/
   },
   methods:{
     setLogin() {
      //  .dispatch('getLoginProducts',{'name':'gz'})
      console.log(this.$store.state.LoginStore.login)
      // console.log(this.$store.dispatch('getLoginProducts','222'))
      console.log(this.$store.commit('setProducts','222'))
      console.log(this.$store)
     },

     add () {
            console.log(this.form);
        },
        save () {
            this.$refs["form"].validate((valid,model)=>{
                console.log(valid);
                console.log(model);
            })
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
