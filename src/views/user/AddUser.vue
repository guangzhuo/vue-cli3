<template>
    <div>
        <BreadCrumb class="bread" :breads="['用户','用户管理','修改用户']"></BreadCrumb>
        <div class="wrap">
            <div class="header">
                <span class="nameFt">修改用户</span>
                <el-button class="backList" size="small" @click="back()">返回列表</el-button>
            </div>
            <div class="form">
                  <el-form label-position="right" label-width="180px" :model="ruleForm" ref="ruleForm" :rules="rules">
                                <el-form-item label="登陆账号" prop="username" >
                                    <span > <el-input  maxlength="20" placeholder="登陆账号" v-model="ruleForm.username"> </el-input></span>
                                </el-form-item>
                              
                                <el-form-item label="真实姓名" prop="rel_name">
                                  <span > <el-input  maxlength="10" placeholder="姓名"  v-model="ruleForm.rel_name"> </el-input></span>
                                </el-form-item>
                                   <el-form-item label="密码" prop="password" >
                                  <span > <el-input  placeholder="密码" minlength="6" maxlength="20" type="password" v-model="ruleForm.password"> </el-input></span>
                                </el-form-item>
                                 <el-form-item label="确认密码" prop="checkPass">
                                  <span > <el-input  placeholder="确认密码" type="password" v-model="ruleForm.checkPass"> </el-input></span>
                                </el-form-item>
                                  <el-form-item label="是否禁用"  prop="status">
                                      <el-radio-group v-model="ruleForm.status" >
                                      <el-radio  v-for="item in status" 
                                      :label="item.value" 
                                      :key="item.value">{{item.label}}</el-radio>
                                      </el-radio-group>
                                      </el-form-item>

                                 <el-form-item label="性别"  prop="sex">
                                      <el-radio-group v-model="ruleForm.sex" >
                                      <el-radio  v-for="item in sex" 
                                      :label="item.value" 
                                      :key="item.value">{{item.label}}</el-radio>
                                      </el-radio-group>
                                      </el-form-item>
                            <p  class="moreInfo">更多信息</p>
                              <el-form-item label="手机" prop="phone">
                                  <span > <el-input maxlength="11"  placeholder="手机"  v-model="ruleForm.phone"> </el-input></span>
                                </el-form-item>
                              <el-form-item label="是否为补货员"  prop="replenish">
                                      <el-radio-group v-model="ruleForm.replenish" >
                                      <el-radio  v-for="item in replenish" 
                                      :label="item.value" 
                                      :key="item.value">{{item.label}}</el-radio>
                                      </el-radio-group>
                                      </el-form-item>
                            <el-form-item label="头像" prop="imageUrl" class="uploadImage">
                             <el-upload
                              v-model="ruleForm.imageUrl"
                              ref="upload"
                              class="avatar-uploader"
                              action="123"
                              :show-file-list="false"
                             :auto-upload="false"
                            :http-request="httpRequest"
                            :on-change="handleOnChange"
                            :on-success="handleAvatarSuccess">
                             <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                            <span class="iS_noImg"  v-else-if="iS_noImg" >{{ iS_noImg }}</span>
                             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            </el-form-item>
                             <div style="text-align:center;">
                              <el-button type="primary" @click="submitForm('ruleForm','1')">提交并继续添加</el-button>
        <el-button type="success" @click="submitForm('ruleForm','2')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
                               </div>
                            </el-form>
                  </div>
                  
        </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import apis from  '@/config/apis'
import { OSSConfig } from '@/plugins/common'
const client = OSSConfig()
export default {
  data() {
       var validatename = (rule, value, callback) => {
         let reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
         let regs = /^[0-9]*$/;
          if (!value) {
         callback(new Error('姓名不能为空'));
          } else {
          if(regs.test(value)){
          callback(new Error('姓名不能为数字'));
           }
          if (!reg.test(value)) {
          callback(new Error('姓名为1-10个中文或英文,不包含特殊字符'));
           } else {
        callback()
           }
        }
       };
         var validateusername = (rule, value, callback) => {
            let reg = /^[\A-z\d]{3,20}$/;
            if (!value) {
                callback(new Error('登陆账号不能为空'));
            } else {
                if (!reg.test(value)) {
                    callback(new Error('登陆账号为3-20个英文或数字或下划线字符'));
                } else {
                    callback()
                }
            }
        };
              var validatemobile = (rule, value, callback) => {
            let reg = /^((13[0-9])|(17[06-8])|(18[0-9])|(15[0-9]))\d{8}$/;
            if (!value) {
                callback(new Error('手机号不能为空'));
            } else {
                if (value.length < 11) {
                    callback(new Error('请输入11位有效电话'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入有效的手机号码'));
                } else {
                    callback()
                }
            }
        };
      var validatePass = (rule, value, callback) => {
        if (!value) {
            callback();
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          if(value.length < 6){
            callback(new Error("密码长度不小于6位数"))
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (!value && !this.ruleForm.password) {
            callback();
        } else if (value !== this.ruleForm.password)  {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        id:this.$route.query.id,
       imageUrl: '',
        radio: "1",
      status:[ {
          value: '正常',
          label: "正常"
        },
        {
          value: '禁用',
          label: "禁用"
        }],
          sex:[ {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }],
        replenish:[ {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }],
    
     
     
        ruleForm:{
        rel_name:'',
         username:'',
         status:'',
         phone:'',
         replenish:'',
         sex:'',
         imageUrl:''
        },
         imgURL: '',
        restType: '',
         iS_noImg: '',
        old_imageUrl: '',
        // replenish:'',
        rules:{
         status:[{ required: true, message: '请选择是否禁用', trigger: 'change' } ],
         sex:[{ required: true, message: '请选择性别', trigger: 'change' } ],
         replenish:[{ required: true, message: '请选择是否为补货员', trigger: 'change' } ],
         phone: [{ required: true, validator: validatemobile, trigger: 'blur' }],
         rel_name: [{ required: true, validator: validatename, trigger: 'blur' }],
         username: [{ required: true, validator: validateusername, trigger: 'blur' }],
         mobile: [{ required: true, validator: validatemobile, trigger: 'blur' }],
         password: [{ required: true,validator: validatePass, trigger: 'blur' }],
         checkPass: [{  required: true,validator: validatePass2, trigger: 'blur' }],
        imageUrl: [{ required: false, message: '请上传图片', trigger: 'change' }],
        
         
         
        }
    };
  },
  mounted(){
   this.getUser();
  },
  methods: {
      getUser(){
           this.$axios.post(apis.userDetail,{
            "id":this.$route.query.id
        }).then((data)=>{
          console.log(data);
        let datas = data.data;
     let {rel_name,username,phone,status,sex,replenish,image_url,password}=datas.data;
             let thatStatus = status === '正常' ? 
                                         '正常': status === '禁用'? 
                                         '禁用': ''
             let thatSex = sex === '男' ? 
                                        '男': sex === '女' ? 
                                         '女': ''
            let thatreplenish = replenish === '是' ? 
                                        '是': replenish === '否' ? 
                                         '否': ''
                        
            console.log(data);
                this.ruleForm = {
                "rel_name":rel_name,
                "username":username,
                "replenish":thatreplenish,
                "phone":phone,
                "status":thatStatus,
                "sex":thatSex,
                'password':password,
                "imageUrl":image_url
              }    
                let noImgtype = ['.zip','.pdf','.docx']
              let lastSuffx = image_url && image_url.substring(image_url.lastIndexOf('.'))
              let lastType = image_url && image_url.substring(image_url.lastIndexOf('/')+ 1)
              if(noImgtype.indexOf(lastSuffx) != -1) {
                this.ruleForm.imageUrl = ''
                this.iS_noImg = lastType
              }
              this.old_imageUrl = image_url    

        })
      },
    back() {
      this.$router.go(-1);
    },
    /*显示图片*/
          handleOnChange(file, filelist) {
            if(file.status == 'ready') {
              this.ruleForm.imageUrl = URL.createObjectURL(file.raw)
              this.imageName = file.name
              let typeArr = ['.bmp','.jpeg','.jpg','.png','.zip','.pdf','.docx']
              let noImgtype = ['.zip','.pdf','.docx']
              const isLt5M = file.size / 1024 / 1024 < 5;
              let suffxIndex = file.raw.name.lastIndexOf('.')
              let suffxType = file.raw.name.substring(suffxIndex)
              let typeInde = typeArr.indexOf(suffxType) //全部类型
              let no_img_type = noImgtype.indexOf(suffxType) //不是图片

              if(typeInde == -1) {
                this.$message({
                  type: 'error',
                  message: '图片格式错误，请上传jpg,png,bmp等类型图片'
                })
                this.ruleForm.imageUrl = ''
                return false
              } else if(no_img_type != -1) {
                this.ruleForm.imageUrl = ''
                this.iS_noImg = file.name
              }

              if(!isLt5M) {
                this.$message({
                  type: 'error',
                  message: '图片大小不能超过 5MB!'
                })
                this.ruleForm.imageUrl = ''
              }

            }
          },
          handleAvatarSuccess() {},
          onChangeSelect(thatData) {
            console.log(thatData)
          },

          /*图片上传自定义*/
         async httpRequest(option) {
           let file = option.file
           const point = file.name.lastIndexOf('.')
           let suffix = file.name.substr(point)
           let fileName = file.name.substr(0, point)
           client.put(`/pc/${fileName}${suffix}`, file).then(responData => {
             let {status,requestUrls} = responData.res
             if(status == 200) {
                this.imgURL = requestUrls[0]
                this.sublimtUp(this.restType)
            } else {
              this.$message({
                type: 'error',
                message: '上传图片失败，请重新上传！'
              })
            }
           })

          },


          submitForm(formName, type) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.restType = type
                /*先图片*/
                if(this.$refs.upload.uploadFiles.length == 0) {
                  this.sublimtUp(this.restType)
                } else {
                  this.$refs.upload.submit();

                }

              } else {
                this.$message({
                  type: 'error',
                  message: "信息有误，请重新填写"
                })
                return false;
              }
            });
          },
             /*提取上传逻辑*/
          sublimtUp(type) {
            //   debugger;
           let {id,username,rel_name,password,phone,status,sex,imageUrl,replenish} = this.ruleForm;
            let jsonData = {
                   "id":Number(this.$route.query.id),
                   "username":username,
                   "rel_name":rel_name,
                   "password":password,
                   "replenish":replenish,
                  "phoneNumber":phone,
                  "rel_name": rel_name,
                  "sex":sex,
                  "status":status,
                 "image_url": this.$refs.upload.uploadFiles.length == 0 ? this.old_imageUrl : this.imgURL
            }
              let url = `${apis.updateUser}` 

            this.$axios.post(url,jsonData).then(data =>{
              let datas = data.data
              if(datas.code == 200) {
                this.$message({
                  type: 'success',
                  message: datas.msg
                })
                if(type === '2') {
                  this.$router.push({
                    path: '/index/UserMangement'
                  })
                } else {
                  this.resetForm('ruleForm');
                }
              } else {
                this.$message({
                  type: 'error',
                  message: datas.msg
                })
              }
            })
          },
    resetForm(formName) {
            this.$refs[formName].resetFields();
            this.ruleForm.imageUrl = '';
          },
  },
  components: {
    BreadCrumb
  }
};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="scss" scoped>
.wrap {
  height: 100%;
}
.bread {
  padding-bottom: 20px;
}
.nameFt {
  font-size: 14px;
  color: #333;
  padding-left: 17px;
}
.backList {
  width: 90px;
  margin-right: 20px;
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
.form {
  width: 90%;
  margin: 30px auto;
  .el-form-item {
    width: 50%;
    float: left;
    .elInput {
      width: 100%;
    }
   
  }
    .line{
    width:100%;height:2px;border-bottom:1px dotted #d8d8d8;padding-top:200px;margin-top:20px;
  }
  .moreInfo{
      margin-left:-5%;
      padding-top: 14%;
      color:#006633;
      font-weight: bolder;

  }
  .uploadImage{
    padding-top:-30px;
     width:100%;
  }
   
  
  
}
</style>

