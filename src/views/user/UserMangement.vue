<template>
    <div>
        <BreadCrumb class="bread" :breads="['用户','用户管理']"></BreadCrumb>
        <div class="wrap">
            <div class="header">
                <span class="nameFt">用户管理</span>
                 <router-link to="/index/ModifyUser">
                <el-button class="addCustom" size="small" type="primary" icon="el-icon-plus">添加用户</el-button>
                 </router-link>
            </div>
            <div class="Twoheader">
                <div class="keywordScur">
                    <span class="nameFt">真实姓名：</span>
                    <el-input class="customIpt" v-model="rel_name" size="small"  maxlength="10" placeholder="请输入真实姓名"></el-input>
                      <el-select class="selectWin" clearable v-model="status" size="small" placeholder="是否禁用">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                      </el-select>
                </div>
                <el-button class="queryBtn" size="small" type="primary" @click="search">查询</el-button>
            </div>
            <div class="MainTable">
                
                    <el-table
                        :data="userList"
                        style="width: 100%">
                    <el-table-column
                            prop="rel_name"
                            label="真实姓名"
                            align="center"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号码"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别"
                            align="center"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="入职日期"
                            align="center"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="replenish"
                            label="是否为补货员"
                            align="center"
                    >
                    </el-table-column>
                   <el-table-column
                            prop="status"
                            label="是否禁用"
                            align="center"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="start"
                            label="操作"
                            align="center"
                            >
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="modify(scope.row)" icon="el-icon-edit" circle></el-button>
                            <el-button size="small" type="danger" @click="removeClick(scope.row)" icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="paginationWrap">
                    <el-pagination
                            @current-change="paging"
                            :page-size="10"
                            layout="total, prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>

            </div>
          
        </div>
             <el-dialog
            class="dialogMY"
            :visible.sync="showDialog"
            width="30%"
            center>
            <div slot="title">
                <i class="el-icon-warning"></i>
            </div>
            <div class="Main">
                <div class="infoOne">确定要删除吗？</div>
                <div class="infoTwo">删除后你将无法恢复这条数据！</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="danger" @click="remove">删 除</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import apis from  '@/config/apis'
export default {
  name: "CustomerManagement",
  data() {
    return {
        userList:[],
        rel_name:'',
      showDialog: false,
      removeData: '',
      status:'',
      total: 0,
      page_index:1,
      page_size:10,
       options:[ {
          value: 'NORMOL',
          label: "正常"
        },
        {
          value: 'DISABLE',
          label: "禁用"
        }],
    };
  },
  creatd() {},
  mounted() {this.getUserList();},
  methods: {
    modify(row) {
      this.$router.push({
        path: "/index/AddUser",
        query: { id: row.id }
      });
    },
    paging(val){
      this.page_index=value;
        this.getUserList();
    },
    search(){
        this.page_index=1;
        this.getUserList();
    },
    getUserList(){
        this.$axios.get(apis.userList,{
            params:{
            "page_index":1,
            "name":this.rel_name,
            "page_size":this.page_size,
            "status":this.status
        }
        }
        ).then((data)=>{
            let datas =data.data;
            if(datas.code == 200){
               this.userList=datas.data.staff_list;
               this.total=datas.pagination.total_count;
            }
                  
    })
      },
     removeClick(data) {
            this.removeData = data;
            this.showDialog = true;
          },
    remove() {
        let jsonData = {
                id: this.removeData.id
               }
             },
    //分页-当前页
    handleCurrentChange(page) {
      console.log(page);
    }
  },
  components: {
    BreadCrumb,
    // ModifyCupboard
  }
};
</script>

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
.addCustom,
.queryBtn {
  width: 90px;
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

.Twoheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  .keywordScur {
    width: 50%;
    /*padding-left: 17px;*/
    .selectWin {
      width: 30%;
      margin-left: 27px;
    }
  }
  .customIpt {
    width: 40%;
  }
  .queryBtn {
    margin-right: 17px;
  }
}
.paginationWrap {
  text-align: right;
}

 /*弹窗*/
    .el-icon-warning{
        color:#E6A23C;
        font-size:60px;
    }
    .Main{
        text-align: center;
        .infoOne{
            font-size: 28px;
            line-height: normal;
        }
        .infoTwo{
            padding-top: 10px;
            font-size: 14px;
        }
    }
</style>