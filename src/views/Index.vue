<template>
 <div>
     <el-container>
         <el-header class="header" v-loading="loading" >
             <div class="title">
                 <span class="name">无人零售云平台</span>
                 <span class="version">V1.1</span>
             </div>
             <div class="rightSetting">
                 <div class="nameImg">
                      <img  v-if="imageShows==true" v-bind:src="Pimage" style="width:50px;height:50px;border-radius:100%;" />
                     <img  v-else="imageShow==true" v-bind:src="image" style="width:50px;height:50px;border-radius:100%;" />
                     
                     
                 </div>
                 <span class="thatName">{{rel_name}}</span>
                 <el-button class="cirBtn settingBtn" type="text" icon="el-icon-setting" circle @click="rightShowAside = !rightShowAside"></el-button>
                 <el-button class="cirBtn outBtn" type="text" icon="el-icon-close" @click="outAdmin">退出</el-button>
             </div>
         </el-header>
         <el-container class="elCon">
             <el-aside width="200px" class="aside" style="background-color: rgba(57, 61, 73, 1)">
                 <el-menu
                         router
                         index="/"
                         :default-active="$route.path"
                         menu-trigger="click"
                         unique-opened
                         background-color="#393d49"
                          text-color="#fff"
                         class="menuActive"
                          active-text-color="#009688">
                     <el-menu-item index="/index/workbrnch">工作台</el-menu-item>
                     <el-submenu index="2">
                         <template slot="title">
                             <span slot="title">签约</span>
                         </template>
                         <el-menu-item-group>
                             <el-menu-item index="/index/contract">合同管理</el-menu-item>
                         </el-menu-item-group>
                     </el-submenu>
                     <el-submenu index="3">
                         <template slot="title">
                             <span slot="title">运营</span>
                         </template>
                         <el-menu-item-group>
                             <el-menu-item index="/index/CabinetMangement">柜子管理</el-menu-item>
                             <el-menu-item index="/index/OrderMangement">订单管理</el-menu-item>
                             <el-menu-item index="/index/ReplenishmentMangement">补货管理</el-menu-item>
                             <el-menu-item index="/index/ActivityMangement">活动管理</el-menu-item>
                         </el-menu-item-group>
                     </el-submenu>
                     <el-submenu index="4">
                         <template slot="title">
                             <span slot="title">用户</span>
                         </template>
                         <el-menu-item-group>
                             <el-menu-item index="/index/UserMangement">用户管理</el-menu-item>
                         </el-menu-item-group>
                     </el-submenu>

                 </el-menu>
             </el-aside>
             <el-main class="Main">
                 <router-view/>
             </el-main>
             <transition name="show">
                 <el-aside v-show="rightShowAside" width="300px" class="rightAside">
                     <div class="settPass">
                         <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                         <ul class="smallWrap">
                             <li class="passLi">
                                 <div class="passSty">旧密码</div>
                                 <el-form-item prop="passOne">
                                 <el-input maxlength="20" v-model="ruleForm.passOne" type="password" placeholder=""></el-input>
                                 </el-form-item>
                             </li>
                             <li class="passLi">
                                 <div class="passSty">新密码</div>
                                 <el-form-item prop="password">
                                 <el-input  maxlength="20" v-model="ruleForm.password" type="password" placeholder=""></el-input>
                                 </el-form-item>
                             </li>
                             <li class="passLi">
                                 <div class="passSty">确认密码</div>
                                   <el-form-item prop="checkPass">
                                 <el-input  maxlength="20" v-model="ruleForm.checkPass" type="password" placeholder=""></el-input>
                                   </el-form-item>
                             </li>
                             <li class="passLi flexSpace">
                                 <el-button class="xPassBtn" type="primary"@click="modifyBtn('ruleForm')">修改密码</el-button>
                                 <el-button class="canchBtn" @click="cancahBtn">取消</el-button>
                             </li>
                         </ul>
                         </el-form>
                     </div>
                 </el-aside>
             </transition>

         </el-container>
     </el-container>




     <div class="rightFixed">
         <ul>
           <a href="http://www.lingmouai.com/" target="_blank" style="text-decoration: none">
             <li class="fixed_li">
                 <i class="icon icon-comupted"></i>
                 <span class="flex_info">零眸智能</span>
             </li>
           </a>
             <li class="fixed_li">
                 <i class="icon icon-weChat"></i>
                 <span class="flex_info">微信</span>

                 <div class="mouseWrap weChatMouse">

                     <div class="icon icon-mouse">
                       <div class="smallMouse">
                       <div class="mouseTitle">
                         <i class="icon icon-weChatLogo"></i>
                         <span class="t_info">微信：零眸智能</span>
                       </div>
                       <div class="codeWrap">
                         <img class="codeWin" src="@/assets/images/common/Code.jpg" alt="">
                       </div>
                       <div class="wrapFooter">
                         微信扫一扫添加好友 <br>
                         或搜索微信号：jtao-home
                       </div>

                       </div>
                     </div>


                 </div>
             </li>
         </ul>
     </div>
 </div>
</template>

<script>
import apis from "@/config/apis";
import mouse from "@/assets/images/Image.jpg";
export default {
  data() {
    var checkPassOne = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码长度不小于6位数"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        if (value.length < 6) {
          callback(new Error("密码长度不小于6位数"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
        loading:false,
      rightShowAside: false,
      image: "",
      imageShow: false,
      imageShows: false,
      Pimage: mouse,
      rel_name: "",
      passOne: "",
      passTwo: "",
      passThree: "",
      ruleForm: {
        passOne: "",
        password: "",
        checkPass: ""
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        passOne: [{ required: true, validator: checkPassOne, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getImage();
  },
  mounted() {
    console.log(this.$route);
  },
  activated() {
    this.getImage();
  },

  methods: {
    getImage() {
      this.imageShow = false;
      this.imageShows = false;
      this.loading=true;
      this.$axios
        .get(apis.userImage, {
          image: this.image,
          rel_name: this.rel_name
        })
        .then(data => {
          let datas = data.data;
          if (datas.code == 200) {
              this.loading=false;
            if (this.image == null) {
              this.imageShows = true;
            } else {
              this.imageShow = true;
              this.image = datas.data.image;
            }

            this.rel_name = datas.data.rel_name;
            //  console.log(this.image,"这事登录的事情")
          }
        });
    },
    outAdmin() {
        this.rightShowAside=false;
      localStorage.setItem("tonken", "");
      this.$router.push({ path: "/login" });
    },
    modifyBtn(forName) {
      this.$refs[forName].validate(valid => {
        if (valid) {
          let jsonData = {
            old_password: Base64.encode(this.ruleForm.passOne),
            new_password: Base64.encode(this.ruleForm.password)
          };
          this.$axios.post(apis.updatePassword, jsonData).then(data => {
            console.log(data);
            if (data.data.code == 200) {
              this.$message({
                message: "密码修改成功",
                type: "success"
              });
              this.ruleForm.passOne='';
              this.ruleForm.password='';
              this.ruleForm.checkPass='';
              this.rightShowAside = false;
            } else {
              this.$message({
                message: "密码修改错误",
                type: "warning"
              });
            }
          });
        }
      });
      //   if(this.passYz()) return false;
      //    this.rightShowAside = false;
    },
    cancahBtn() {
      this.rightShowAside = false;
      this.passOne = "";
      this.passTwo = "";
      this.passThree = "";
    }
    //    passYz() {
    //    // debugger
    //       if(!this.passOne) {
    //           this.$message({
    //               message: '旧密码不能为空',
    //               type: 'warning'
    //           });
    //           return true
    //       } else if (!this.passTwo) {
    //           this.$message({
    //               message: '新密码不能为空',
    //               type: 'warning'
    //           });
    //           return true
    //       } else if (!this.passThree) {
    //           this.$message({
    //               message: '确认密码不能为空',
    //               type: 'warning'
    //           });
    //           return true
    //       } else if(this.passTwo != this.passThree) {
    //           this.$message({
    //               message: '新密码与确认密码有误，请重新检查',
    //               type: 'warning'
    //           });
    //         return true
    //       }
    //       return false;
    //    },
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.header {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  position: fixed;
  width: 100%;
  min-width: 1200px;
  z-index: 2;
  .title {
    /*width:200px;*/
    margin: 17px 0;
    text-align: center;
    display: inline-block;
  }
  .name {
    color: #333;
    font-size: 21px;
    font-weight: bold;
    display: inline-block;
    vertical-align: middle;
  }
  .version {
    display: inline-block;
    padding: 5px 16px;
    margin-left: 12px;
    background: #009688;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
    font-weight: normal;
    vertical-align: middle;
  }
  .rightSetting {
    float: right;
    /*width:300px;*/
    height: 60px;
    line-height: 56px;
    .nameImg {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      display: inline-block;
      vertical-align: middle;
      background: #fff;
      border: 1px solid gray;
    }
    .thatName {
      padding: 0 12px;
      color: #666;
    }
    .cirBtn {
      vertical-align: middle;
    }
    .settingBtn {
      font-size: 28px;
      padding: 0px;
      color: gray;
    }
    .outBtn {
      color: #666;
      font-size: 15px;
      margin-left: 45px;
    }
  }
}
.aside {
  position: fixed;
  top: 60px;
  bottom: 0;
  z-index: 1;
  /*height:calc(100vh - 60px);*/
}
.Main {
  margin: 60px 0 0 200px;
  //   background: rgb(248,248,248)
}
.rightAside {
  background: #fff;
  position: fixed;
  right: 0px;
  top: 60px;
  bottom: 0;
  z-index: 3;
  border-left: 1px solid rgba(0, 0, 0, 0.13);
  .settPass {
    .smallWrap {
      width: 80%;
      margin: 40px auto 0;
    }
    .passSty {
      padding-bottom: 12px;
      color: #333;
    }
    .passLi {
      margin-bottom: 12px;
    }
    .flexSpace {
      display: flex;
      justify-content: space-between;
      .xPassBtn,
      .canchBtn {
        width: 44%;
      }
    }
  }
}
/*动画*/
.show-enter-active,
.show-leave-active {
  transition: all 0.5s;
}
.show-enter {
  right: -300px;
}
.show-leave-to {
  right: -300px;
}

/*fixed*/
.rightFixed {
  position: fixed;
  right: -70px;
  bottom: 100px;
  z-index: 10;
  transition: all 0.5s linear;
  .fixed_li {
    cursor: pointer;
    text-align: center;
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.5);
    margin-bottom: 6px;
    .flex_info {
      display: block;
      font-size: 13px;
      color: #e4e4e4;
      padding-top: 6px;
    }
    .icon {
      margin-top: 15px;
    }
    .mouseWrap {
      display: none;
      position: absolute;
      right: 100%;
      top: -194px;
      z-index: 3;
    }
    .weChatMouse {
      top: -104px;
      .smallMouse {
        width: 90%;
        .mouseTitle {
          margin-top: 15px;
          .icon-weChatLogo {
            margin-top: 0;
            vertical-align: middle;
          }
          .t_info {
            vertical-align: middle;
            font-size: 14px;
            margin-left: 10px;
            font-weight: bold;
          }
        }
        .codeWrap {
          width: 134px;
          height: 134px;
          margin: 10px auto;
          .codeWin {
            width: 100%;
          }
        }
        .wrapFooter {
          font-size: 14px;
        }
      }
    }
    &:hover {
      .mouseWrap {
        display: block;
      }
    }
  }
  &:hover {
    right: 0;
  }
}
</style>
<style lang="scss">
.aside {
  .el-menu {
    border-right: 0;
  }
}
.menuActive {
  .el-menu-item.is-active {
    background-color: rgb(46, 49, 58) !important;
  }
}
</style>
