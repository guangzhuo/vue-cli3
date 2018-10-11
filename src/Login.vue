<template>
    <section class="loginBG">
        <div class="login-wrap">
            <div class="title">
                <span class="name">无人零售云平台</span>
                <span class="version">V1.1</span>
            </div>
            <div class="login-main">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                    <el-form-item prop="name">
                        <el-input class="cla-ipt" maxlength="20" size="medium" v-model="ruleForm.name" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="cla-ipt" maxlength="20" size="medium"
                                  type="password"
                                  @keyup.enter.native="login('ruleForm')"
                                  v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary"
                                   @keyup.enter="login('ruleForm')"
                                   @click="login('ruleForm')">登录</el-button>
                    </el-form-item>

                </el-form>

            </div>

        </div>
    </section>
</template>

<script>
    import apis from '@/config/apis';
    import { isNumber_AZ } from '@/plugins/common'
    export default {
        name: "Login",
        data() {
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
              callback();

            };
            var checkPass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空,最大不能超过20位字符'));
                }
              if(!isNumber_AZ(value)) {
                return callback(new Error('密码只能输入数字、字母、下划线'));
              }
              callback();

            };
            return {
                ruleForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        { validator: checkName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: checkPass, trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
          /*nikky*/
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let jsonData = {
                          username: this.ruleForm.name,
                          password: Base64.encode(this.ruleForm.password)
                        }
                        this.$axios.post(apis.logins, jsonData).then((data)=>{
                          let datas = data.data
                          if(datas.code === 200) {
                            localStorage.setItem('tonken', `basic ${Base64.encode(datas.data+':')}`)
                            this.$router.push('/index')
                            this.$refs[formName].resetFields();
                          } else {
                            this.$message.error(datas.msg);
                          }
      

                        })
                    } else {
                      this.$message({
                            message: '信息未填写正确，请重新检查',
                            type: 'warning'
                          });
                        return false;
                    }
                });
            },

        },
        components: {}

    }
</script>

<style lang="scss" scoped>
.loginBG{
    position: absolute;
    width:100%;
    height:100%;
    background: #31bdff;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-wrap{
        width: 440px;
        height:370px;
        background: #fff;
        border-radius:6px;
        .title{
            margin: 45px 0;
            text-align: center;
        }
        .name{
            color:#333;
            font-size: 26px;
            font-weight: bold;
            display: inline-block;
            vertical-align: middle;
        }
        .version{
            display: inline-block;
            padding: 10px 16px;
            margin-left:12px;
            background: #1AB394;
            color:#fff;
            border-radius: 6px;
            font-size: 15px;
            font-weight: normal;
            vertical-align: middle;
        }
        .login-main{
            width:84%;
            margin:60px auto 0;
        }
        .cla-ipt{
            /*margin-bottom: 20px;*/
        }
        .btn{
            width:100%;
        }
    }
}
</style>