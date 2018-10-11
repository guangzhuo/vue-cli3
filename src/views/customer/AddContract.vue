<template>
  <div>
    <BreadCrumb class="bread" :breads="['客户','合同管理','编辑合同']"></BreadCrumb>
    <div class="header">
      <span class="nameFt">合同管理</span>
      <router-link to="/index/contract">
        <el-button class="addCustom" size="small" icon="el-icon-arrow-left">
          返回列表
        </el-button>
      </router-link>
    </div>
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
    <div class="addMain">
        <div class="felxSpace">
          <el-form-item class="formItem" label="甲方" prop="firstTime">
              <span>零眸智能科技有限公司</span>
            </el-date-picker>
          </el-form-item>
          <el-form-item class="formItem" label="乙方" prop="biz_name">
             <span>{{biz_name}}</span>
          </el-form-item>
        </div>
        <div class="felxSpace">
          <el-form-item class="formItem" label="设备名称" prop="terminal_number">
              <el-input v-model="ruleForm.terminal_number" style="width:60%;"></el-input>
          </el-form-item>
          <el-form-item class="formItem" label="硬件编号" prop="hard_number">
                 <span>{{hard_number}}</span>
          </el-form-item>
        </div>
        <div class="felxSpace">
          <el-form-item class="formItem" label="合同生效" prop="start_time">
            <span> {{start_time}} </span>
          </el-form-item>
          <el-form-item class="formItem" label="合同失效" prop="end_time">
              <span>{{end_time}}</span>
          </el-form-item>
        </div>
    </div>


    <div class="wrap">
      <div class="MainTable">
        <el-table
            :data="Contract"
            style="width: 100%">
             
          <el-table-column
              label="序号"
              width="50px"
              scope="index"
               type="index"
              align="center">
    
          </el-table-column>
          <el-table-column
              prop="number"
              label="系统编号(平台)"
              align="center">
          </el-table-column>
          <el-table-column
              prop="name"
              label="商品名称"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="category_name"
              label="分类"
              align="center"
          >
          </el-table-column>
           <el-table-column 
              label="商家商品编码"
              align="center"
          >
            <template slot-scope ='scope' > 
                <el-form-item :prop="'Contract.' + scope.$index + '.biz_item_number'" :rules='rules.biz_item_number'>
             <el-input v-model="scope.row.biz_item_number" style="width:80px;" ></el-input> 
                </el-form-item>
            </template>
          </el-table-column>
        <el-table-column width="200"
              label="商品重量（克）"
              align="center"
          >
            <template slot-scope ='scope'> 
                <div style="width:100%;">
                  <el-form-item :prop="'Contract.' + scope.$index + '.min_weight'" :rules='rules.min_weight' style="width:60px">
             <el-input v-model="scope.row.min_weight" style="width:60px;" ></el-input> 
                  </el-form-item>
                 <el-form-item :prop="'Contract.' + scope.$index + '.max_weight'" :rules='rules.max_weight' style="width:60px;margin-top:-62px;margin-left:90px;">
                <el-input v-model="scope.row.max_weight" style="width:60px;" ></el-input>
                 </el-form-item>
                 </div>
            </template>
          </el-table-column>
           <el-table-column label="安全库存" header-align="center" align="center" >
                            <template slot-scope="scope">
                                <el-form-item :prop="'Contract.' + scope.$index + '.secqty'" :rules='rules.secqty'>
                                <el-input v-model="scope.row.secqty" style="width:60px;"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                          <el-table-column label="成本/元" header-align="center"  align="center" >
                            <template slot-scope="scope">
                                 <el-form-item :prop="'Contract.' + scope.$index + '.cost_price'" :rules='rules.cost_price'>
                                <el-input  v-model="scope.row.cost_price"  style="width:60px;"></el-input>
                                 </el-form-item>
                            </template>
                        </el-table-column>
                          <el-table-column label="售价/元" header-align="center" align="center" >
                            <template slot-scope="scope">
                                 <el-form-item :prop="'Contract.' + scope.$index + '.real_price'" :rules='rules.real_price'>
                                <el-input v-model="scope.row.real_price"  style="width:60px;"></el-input>
                                 </el-form-item>
                            </template>
                        </el-table-column> 
          <el-table-column
              prop="is_sale"
              label="状态(平台)"
              align="center">
          </el-table-column>
        </el-table>
   
      </div>
    
    </div>
       </el-form>
    <div class="addBtn-group">
      <el-button type="primary" @click="submitForm('ruleForm','1')">提交并继续添加</el-button>
      <el-button type="success" @click="submitForm('ruleForm','2')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import apis from  '@/config/apis'
export default {
  name: "AddContract",
  data() {
         var validateSecqty = (rule, value, callback) => {
        let regs=/^[0-9]*[1-9][0-9]*$/;
        if (!value) {
            callback(new Error("值不能为空或为0"));
        } 
        if(!regs.test(value)){
         callback(new Error('只能输入正整数，且不为0'));
}
        else {
          if (value==0) {
            callback(new Error("值不能为0"))
          }
          callback();
        }
      };
      var validateRealPrice = (rule, value, callback) => {
        let regs=/^\d+(\.\d{0,1})?$/;
        if (!value) {
            callback(new Error("值不能为空或为0"));
        } 
        if(!regs.test(value)){
         callback(new Error('只能正数且保留1位小数'));
}
        else {
          if (value==0) {
            callback(new Error("值不能为0"))
          }
          callback();
        }
      };
      
      var validateCostPrice = (rule, value, callback) => {
        let regs=/^\d+(\.\d{0,1})?$/;
        if (!value) {
            callback(new Error("值不能为空或为0"));
        } 
        if(!regs.test(value)){
         callback(new Error('只能正数且保留1位小数'));
}
        else {
          if (value==0) {
            callback(new Error("值不能为0"))
          }
          callback();
        }
      }
       var validateNumber = (rule, value, callback) => {
        if (!value) {
            callback(new Error("值不能为空或为0"));
        } else {
          if (value==0) {
            callback(new Error("值不能为0"))
          }
          callback();
        }
      };
       var validateMinweight = (rule, value, callback) => {
        if (!value) {
            callback(new Error("值不能为空或为0"));
        } else {
          if (value==0) {
            callback(new Error("值不能为0"))
          }
          callback();
        }
      };
       var validateMaxweight = (rule, value, callback) => {
        if (!value) {
            callback(new Error("值不能为空或为0"));
        } else {
          if (value==0) {
            callback(new Error("值不能为0"))
          }
          callback();
        }
      };
    return {
          ruleForm:{
        hard_number:"",
        terminal_number:"",
        Contract:[],
        secqty:'',
        real_price:'',
        cost_price:'',
        min_weight:'',
        max_weight:'',
      },
                rules: {
                      terminal_number: {required: true, message: '请填写设备名称', trigger: 'change' },
                      hard_number: "",
                      min_weight:{ required:true,validator: validateMinweight,trigger:"blur"},
                      max_weight:{ required:true,validator: validateMaxweight,trigger:"blur"},
                      secqty:{ required:true,validator: validateSecqty,trigger:"blur"},
                      real_price:{ required:true,validator: validateRealPrice,trigger:"blur"},
                      cost_price:{ required:true,validator: validateCostPrice,trigger:"blur"},
                      biz_item_number:{ required:true,validator: validateNumber,trigger:"blur"},
                },
        cid:this.$route.query.id,
        terminal_number:'',
         hard_number:'',
        start_time:'',
        end_time:'',
    };
  },
  creatd() {},
  mounted() {this.getContractList();},
  methods: {
      getContractList(){
        //   debugger;
             this.$axios.post(apis.getContractDetail,{
            "cid":this.$route.query.id
        }).then((data)=>{
            if(data.data.code == 200){
            let datas =data.data
            const cotdata=datas.data.contractInfor;
            this.hard_number=cotdata.hard_number;
            this.start_time=cotdata.start_time;
            this.end_time=cotdata.end_time;
            this.biz_name=cotdata.biz_name;
            this.ruleForm.terminal_number=cotdata.terminal_number;
            this.Contract =datas.data.items;
            let {terminal_number,hard_number} = datas.data.contractInfor;
            let {Contract} = datas.data.items;
              this.ruleForm = {
                "terminal_number":terminal_number, 
                "hard_number":hard_number,
                "Contract":this.Contract
              }        
            }
    })

      },
    // submitForm(formName, type) {
    //     debugger;
    //   console.log(type);
    //   let jsonData = {
    //       "hard_number":this.hard_number,
    //       "terminal_number":this.terminal_number,
    //       "item_list":this.Contract
    //   }
    //   let url=`${apis.updateContract}`
    //     this.$axios.post(url,jsonData).then(data =>{
    //         console.log(data);
    //               let datas = data.data
    //               if(datas.code == 200) {
    //                 this.$message({
    //                   type: 'success',
    //                   message: datas.msg
    //                 })
    //                 if(type === '2') {
    //                   this.$router.push({
    //                     path: '/index/Contract'
    //                   })
    //                 } else {
    //                   this.resetForm('ruleForm');
    //                 }
    //               } 
    //               else {
    //                 this.$message({
    //                   type: 'error',
    //                   message: datas.msg
    //                 })
    //               }
    //             })
    // },

      submitForm(formName, type) {
        //   debugger;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                let {hard_number,terminal_number,secqty,Contract} = this.ruleForm;
                 let jsonData = {
                           "hard_number":this.hard_number,
                           "terminal_number":this.ruleForm.terminal_number,
                          "items_list":this.Contract
                  
                } 
                let url =  `${apis.updateContract}`
                this.$axios.post(url,jsonData).then(data =>{
                  let datas = data.data
                  if(datas.code == 200) {
                    this.$message({
                      type: 'success',
                      message: datas.msg
                    })
                    if(type === '2') {
                      this.$router.push({
                        path: '/index/Contract'
                      })
                    } else {
                      this.resetForm('ruleForm');
                    }
                  } 
                  else {
                    this.$message({
                      type: 'error',
                      message: datas.msg
                    })
                  }
                })

              } 
              else {
                this.$message({
                  type: 'warning',
                  message: "信息有误，请重新填写"
                })
                return false;
              }
 
            });
          },
  },
  components: {
    BreadCrumb
  }
};
</script>
<style lang="scss" scoped>
 .el-form-item__content {
    position: relative;
    font-size: 14px;
    width: 30%;
    float: left;
}
</style>


<style lang="scss" scoped>
.wrap {
  border: 1px solid rgba(0, 0, 0, 0.13);
}
.bread {
  padding-bottom: 20px;
}
.nameFt {
  font-size: 14px;
  color: #333;
  padding-left: 17px;
}
.paginationWrap {
  padding: 10px 0;
  text-align: right;
}
.header {
  width: 100%;
  height: 46px;
  line-height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(236, 239, 241, 1);

  .addCustom {
    padding: 9px 10px;
    margin-right: 17px;
  }
}
.addMain {
  width: 90%;
  margin: 0 auto;
  padding-top: 18px;
  .selectWin {
    width: 100%;
  }
  .formItem {
    width: 48%;
  }
  .felxSpace {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.addBtn-group {
  margin-top: 40px;
  text-align: center;
}
.footer-addBtn-group {
  text-align: center;
}

/*弹窗*/
.dialogSeach {
  width: 50%;
  margin-bottom: 20px;
  .dialogSeachIpt {
    width: 48%;
    margin-right: 12px;
  }
}
.MainDialog {
  display: flex;
  justify-content: space-between;

  .LeftTable {
    width: 70%;
    border: 1px solid rgba(0, 0, 0, 0.13);
  }
  .RightType {
    width: 28%;
    border: 1px solid rgba(0, 0, 0, 0.13);
    overflow: auto;
    max-height: 288px;
  }
}
</style>
<style lang="scss">
.listClose {
  text-align: center;
  .el-button--mini {
    padding: 3px 15px;
  }
  .listTwo {
    display: none;
  }
  &:hover {
    .listOne {
      display: none;
    }
    .listTwo {
      display: inline-block;
    }
  }
}
</style>