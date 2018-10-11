<template>
  <div>
    <BreadCrumb class="bread" :breads="['活动','活动管理',$route.query.id ? '修改活动': '新增活动']"></BreadCrumb>
    <div class="header">
      <span class="nameFt">{{ $route.query.id ? '修改活动': '新增活动'}}</span>
      <router-link to="/index/ActivityMangement">
        <el-button class="addCustom" size="small" icon="el-icon-arrow-left">
          返回列表
        </el-button>
      </router-link>
    </div>

    <div class="addMain">

      <el-form :model="ruleForm" :validate-on-rule-change="false" status-icon  ref="ruleForm" label-width="140px" label-position="right" :rules="rules">
        <div class="felxSpace">
          <el-form-item class="formItem"  label="活动名称" prop="acName">
            <el-input class="cla-ipt" maxlength="50" size="medium" v-model="ruleForm.acName" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item class="formItem"  label="活动类型" prop="acType">
            <el-select class="selectWin"  v-model="ruleForm.acType" placeholder="请选择类型"  @change="acselect">
              <el-option
                  size="medium"
                  v-for="item in CustypeOptions"
                  :key="item.value"
                  :value-key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="felxSpace">
          <el-form-item class="formItem" label="开始时间" prop="acfirstTime">
            <el-date-picker
                class="selectWin"
                v-model="ruleForm.acfirstTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="formItem" label="结束时间" prop="aclastTime">
            <el-date-picker
                class="selectWin"
                v-model="ruleForm.aclastTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
        </div>

        <div class="felxSpace">
          <el-form-item class="formItem" label="地区" prop="selMac">
            <el-select class="selectWin"v-model="ruleForm.selMac" placeholder="请选择地区">
              <el-option
                  size="medium"
                  v-for="item in MacOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="金额(元)" prop="money">
            <el-input class="cla-ipt" maxlength="50" size="medium" v-model="ruleForm.money" placeholder="请输入金额"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="活动图片" prop="upImg">
          <div class="filesUp">
            <!--<div class="labelName">合同附件</div>-->
            <div class="uploadWrap">
              <el-upload
                  v-model="ruleForm.upImg"
                  class="avatar-uploader"
                  ref="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :auto-upload="false"
                  :http-request="httpRequest"
                  :on-change="handleOnChange"
                  :on-success="handleAvatarSuccess">
                <img v-if="ruleForm.upImg" :src="ruleForm.upImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="活动说明" prop="RichText">
          <div class="Rich-Text">
            <!--<div class="labelName">售后服务</div>-->
            <div class="richMain">
              <quillEditor
                  v-model="ruleForm.RichText"
                  ref="myQuillEditor"
                  class="editer"
                  @input="conetntVal"
              ></quillEditor>
            </div>
          </div>
        </el-form-item>

      </el-form>




      <div class="addBtn-group">
        <clickButton type="primary"></clickButton>
        <el-button type="primary" v-dacusClick @click="submitForm('ruleForm','1')">提交并继续添加</el-button>
        <el-button type="success" v-dacusClick @click="submitForm('ruleForm','2')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb'
  import quillEditor from '@/components/Ue' //调用编辑器
  import { isPhone,  OSSConfig, TimeSzie, isW,isNumber,circleNumber} from '@/plugins/common'
  import apis from '@/config/apis'
  const client = OSSConfig()
  export default {
    name: "AddActivity",
    data() {
      var acNameFun = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('活动名称不能为空'));
        }
        if (!isW(value)) {
          return callback(new Error('活动名称只能为中文、字母'));
        }
        callback()
      };
      var acType = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('活动类型不能为空'));
        }
        callback()
      };
      var acfirstTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('开始时间不能为空'));
        }

        let aclastTime = this.ruleForm.aclastTime
        if (value) {
          if(TimeSzie(value,aclastTime)) {
            return callback(new Error("开始时间不能小于结束时间"));
          }
        }

        callback()
      };
      var aclastTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('结束时间不能为空'));
        }

        let acfirstTime = this.ruleForm.acfirstTime
        if (acfirstTime) {
          if(TimeSzie(acfirstTime,value)) {
            return callback(new Error("开始时间不能小于结束时间"));
          }
        }


        callback()
      };
      var selMac = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('选择地区不能为空'));
        }
        callback()
      };
      var RichText = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('活动说明不能为空'));
        }
        callback()
      };
      var upImg = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('图片不能为空'));
        }
        callback()
      };
      var moneyFun = (rule, value, callback) => {
        let valArr = value.toString().split('.')
        if (!value) {
          return callback(new Error('金额不能为空'));
        }
        if(!circleNumber(value)) {
          return callback(new Error('请输入正确的数字'));
        }
        if(valArr.length > 1 && valArr[1].length > 2){
          return callback(new Error('金额只能保留两位小数点'));
        }
        callback()
      };

      return {
        ruleForm: {
          acName: '',
          acType: '',
          acfirstTime: '',
          aclastTime: '',
          money: '',
          selMac: '',
          RichText: '',
          upImg: ''
        },
        rules: {
          acName:[
            { validator: acNameFun, trigger: 'blur',required: true },
          ],
          acType:[
            { validator: acType, trigger: 'change', required:true},
          ],
          acfirstTime:[
            { validator: acfirstTime, trigger: 'change', required: true,},
          ],
          aclastTime:[
            { validator: aclastTime, trigger: 'change', required: true,},
          ],
          money:[
            { validator: moneyFun, trigger: 'blur', required: true,},
          ],
          selMac:[
            { validator: selMac, trigger: 'change', required: true,},
          ],
          RichText:[
            { validator: RichText, trigger: 'blur', required: true,},
          ],
          upImg:[
            { validator: upImg, trigger: 'change', required: true,},
          ],
        },
        CustypeOptions: [
          {
            value: 'NEW_COUPON',
            label: '新人现金券'
          },
          {
            value: 'CASH_COUPON',
            label: '抵扣现金券'
          },

        ],
        MacOptions:[
          {
            value: 'ALL_CHINA',
            label: '全国'
          },
        ],
        cusId: this.$route.query.id && this.$route.query.id,
        imgURL: '',
        restType: '',
        old_imageUrl: ''
      }
    },
    computed:{

    },
    created() {

    },
    mounted() {
      if(this.cusId) {
        this.routerIdName(this.cusId)
      }
    },
    methods: {
      /*id查询 用户信息*/
      routerIdName (id) {
        this.$axios.post(apis.getActivityDetail,{aid:id}).then( data => {
          let datas = data.data
          if(datas.code == 200 ) {
            let {activity_name,activity_type,start_time,end_time,activity_area,activity_amount,url,note} = datas.data
            this.ruleForm = {
              acName:activity_name,//活动名称
              acType: activity_type,//活动类型
              acfirstTime: start_time,
              aclastTime: end_time,
              selMac: activity_area,//区域
              money: activity_amount, //金额
              upImg:url,//图片地址
              RichText: note //富文本
            }
            if(url.length) {
              let urlIndex = url.indexOf('/pc')
              this.old_imageUrl = url.substring(urlIndex, url.length - 1)
            } else {
              this.old_imageUrl = ''
            }


          } else {
            this.$message({
              type: 'error',
              message: datas.msg
            })
          }
        }).catch((data)=>{
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        })
      },

      submitForm(formName, type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.restType = type

            /*先图片*/
            if(this.$refs.upload.uploadFiles.length == 0) {
              this.sublimtUp(type)
            } else {
              this.$refs.upload.submit();
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      /*上传逻辑代码分离*/
      sublimtUp(type) {
        let { selMac,acType,money,acfirstTime,aclastTime,acName,upImg,RichText } = this.ruleForm
        let jsonData = {
          "activity_area": selMac, //区域
          "activity_type": acType, //活动类型
          "activity_amount": parseFloat(money)*100, //金额
          "start_time": acfirstTime,
          "end_time": aclastTime,
          "activity_name": acName, //活动名称
          "note": RichText, //富文本
          "url": this.$refs.upload.uploadFiles.length == 0 ? this.old_imageUrl : this.imgURL //图片地址
        }
        let url = apis.addActivity
        if(this.cusId){
          jsonData.aid = this.cusId
          url = apis.updateActivity
        } else {
          url = apis.addActivity
        }

        this.$axios.post(url,jsonData).then( data => {
          let datas = data.data
          if(datas.code == 200 ) {
            this.$message({
              type: 'success',
              message: datas.msg
            })
            if(type == '2') {
              this.$router.push({
                path: '/index/ActivityMangement'
              })
            } else {
              this.$refs.ruleForm.resetFields()
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
        this.ruleForm.RichText = ''
      },

      visibleChange(visi) {
        // this.$refs.ruleForm.validate(acType)
        this.defaChange = visi
        // console.log(visi)
      },

      acselect() {
        console.log('change')
      },

      /*显示图片*/
      handleOnChange(file, filelist) {
        if(file.status == 'ready') {
          if(this.$refs.upload.uploadFiles.length > 1){
            this.$refs.upload.uploadFiles.shift()
          }
          this.ruleForm.upImg = file.url
          this.$refs.ruleForm.clearValidate('upImg');
          let typeArr = ['.bmp','.jpeg','.jpg','.png']
          const isLt5M = file.size / 1024 / 1024 < 5;
          let suffxIndex = file.raw.name.lastIndexOf('.')
          let suffxType = file.raw.name.substring(suffxIndex)
          let typeInde = typeArr.indexOf(suffxType) //全部类型

          if(typeInde == -1) {
            this.$message({
              type: 'error',
              message: '图片格式错误，请上传jpg,png,bmp等类型图片'
            })
            this.ruleForm.upImg = ''
            return false
          }

          if(!isLt5M) {
            this.$message({
              type: 'error',
              message: '图片大小不能超过 5MB!'
            })
            this.ruleForm.upImg = ''
          }

        }
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
            // this.imgURL = requestUrls[0]
            this.imgURL = `/pc/${fileName}${suffix}`
            this.sublimtUp(this.restType)
          } else {
            this.$message({
              type: 'error',
              message: '上传图片失败，请重新上传！'
            })
          }
        })

      },


    /*上传的*/
      beforeAvatarUpload() {},
      handleAvatarSuccess() {},


      conetntVal(val) {
        console.log(val)
      }


    },
    components: {
      BreadCrumb,
      quillEditor,
    }

  }
</script>

<style lang="scss" scoped>
  .bread{
    padding-bottom:20px;
  }
  .nameFt{
    font-size: 14px;
    color:#333;
    padding-left: 17px;
  }
  .header{
    width:100%;
    height: 46px;
    line-height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(236, 239, 241, 1);

    .addCustom{
      padding: 9px 10px;
      margin-right: 17px;
    }
  }
  .addMain{
    width: 90%;
    margin: 0 auto;
    padding-top: 18px;
    .formItemCus{
      width: 48%;

    }
    .felxSpace{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .formItem{
      width:48%;

    }
    .selectWin{
      width:100%;
    }
    .Rich-Text{
      display: flex;
      justify-content: space-between;

      .labelName{
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        width:66px;
      }
      .richMain{
        display: inline-block;
        width:100%;
        /*height:253px;*/
      }

    }
    .filesUp{
      .labelName{
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
      }
    }
    .uploadWrap{
      display: inline-block;
      margin-left: 6px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      line-height: normal;
      font-size: 0;
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
    }

  }
  .addBtn-group{
    margin-top:40px;
    text-align: center;
  }

</style>
<style lang="scss">

</style>