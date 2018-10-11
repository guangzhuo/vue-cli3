<template>
  <div>
    <BreadCrumb class="bread" :breads="['运营','活动管理']"></BreadCrumb>
    <div class="wrap">
      <div class="header">
        <span class="nameFt">活动管理</span>
        <router-link to="/index/AddActivity">
          <el-button class="addCustom" size="small" type="primary" icon="el-icon-plus">
            添加活动
          </el-button>
        </router-link>
      </div>
      <div class="Twoheader">
        <div class="keywordScur">
          <!--<span class="nameFt">机器编号：</span>
          <el-input class="customIpt" v-model="cusName" size="small" placeholder="请输入客户名称"></el-input>-->
          <el-select class="selectWin" v-model="selectVal" size="small" placeholder="活动状态">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button v-dacusClick  class="queryBtn" size="small" type="primary" @click="search('cl')">查询</el-button>
      </div>
      <div class="MainTable">
        <el-table
            :data="tableData"
            style="width: 100%">
          <!--<el-table-column-->
              <!--prop="id"-->
              <!--label="ID"-->
              <!--align="center"-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
                  prop="activity_name"
                  label="活动名称"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="activity_type"
                  label="活动类型"
                  width="112px"
                  align="center"
          >
          </el-table-column>
          <el-table-column
              prop="activity_area"
              label="区域"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="start_time"
              label="活动开始时间"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="end_time"
              label="活动结束时间"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="status"
              label="活动状态"
              align="center"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.status| activeType }}</div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center"
          >
            <template slot-scope="scope">
              <el-button
                  :disabled="scope.row.status === 'TAKE_EFFECT' || scope.row.status === 'EXPIRED'"
                  size="small"
                  title="活动详情"
                  type="primary"
                  @click="handleClick(scope.row)"
                  icon="el-icon-edit" circle></el-button>
              <!--:disabled="scope.row.status === '已下线'"
              EXPIRED//下线
              TAKE_EFFECT//已生效
              WAIT_EFFECT//待生效-->
              <el-button  size="small"
                          type="primary"
                          :disabled="scope.row.status === 'EXPIRED'"
                          :title="scope.row.status === 'EXPIRED'? '下线活动': '上线活动'"

                          @click="scope.row.status === 'EXPIRED'? '' :
                                  scope.row.status === 'TAKE_EFFECT' ? DownClick(scope.row) :
                                  scope.row.status === 'WAIT_EFFECT' ? upClick(scope.row) : DownClick(scope.row)"

                          :icon="scope.row.status === 'EXPIRED' ? 'el-icon-download':
                                 scope.row.status === 'TAKE_EFFECT' ? 'el-icon-download' :
                                 scope.row.status === 'WAIT_EFFECT' ? 'el-icon-upload2' :'el-icon-download'"

                          circle></el-button>

              <el-button size="small" title="删除活动" type="danger" @click="removeClick(scope.row)" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationWrap">
          <el-pagination
              @current-change="handleCurrentChange"
              :page-size="PageSize"
              :current-page="currentPage"
              layout="total, prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

<!--删除-->
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
        <div class="infoTwo">你将无法恢复这条数据！</div>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="danger" v-dacusClick @click="remove">删 除</el-button>
            </span>
    </el-dialog>
<!--生效-->
    <el-dialog
        class="dialogMY"
        :visible.sync="showUpDialog"
        width="30%"
        center>
      <div slot="title">
        <i class="el-icon-warning"></i>
      </div>
      <div class="Main">
        <div class="infoOne">确定要{{ action === 'down' ? '下' : '上' }}线活动吗？</div>
        <!--<div class="infoTwo">生效后后动将展示给用户</div>-->
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showUpDialog = false">取 消</el-button>
          <el-button type="danger" v-dacusClick @click="action === 'down' ? effectDown() : effectUp()">{{ action === 'down' ? '下 线': '上 线' }}</el-button>
            </span>
    </el-dialog>


  </div>
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb'
  import apis from  '@/config/apis'
  export default {
    name: "CustomerManagement",
    data() {
      return {
        showDialog: false,
        showUpDialog: false,
        removeData: '',
        upData: '',
        cusName: '',
        selectVal: '',
        options: [
          {
            value: '',
            label: '活动状态'
          },
          {
            value: 'WAIT_EFFECT',
            label: '待生效'
          },
          {
            value: 'TAKE_EFFECT',
            label: '已生效'
          },
          {
            value: 'EXPIRED',
            label: '已下线'
          }
        ],
        tableData: [],
        total: 1,
        currentPage: 1,
        PageSize: 10,
        action: ''
      }
    },
    created() {
      this.search()
    },
    mounted() {
    },
    filters: {
      activeType(data) {
        return data === 'EXPIRED' ? '已下线':
                data === 'TAKE_EFFECT'? '已生效':
                data === 'WAIT_EFFECT' ? '待生效': ''
      },
    },
    methods: {

      /*search*/
      search(thatType = '') {
        let jsonData = {
          "activity_area": this.cusName,
          "status": this.selectVal,
          "page_index": thatType === 'cl'? this.currentPage = 1 : this.currentPage
        }


        this.$axios.post(apis.getAllActivities,jsonData).then( data => {
          let datas = data.data
          if(datas.code === 200) {
            let {data,pagination:{page_count,page_index,page_size,total}} = datas
            this.tableData = data
            this.PageSize = page_size
            this.total = total
          } else {
            this.$message({
              type:'error',
              message: datas.msg
            })
          }
        })
      },
      /*修改跳转*/
      handleClick(routerData) {
        if(routerData.status === '已生效') {
          this.$message({
            message: '已生效活动不可修改',
            type: 'error'
          });
          return false
        }
        if(routerData.status === 'EXPIRED') {
          this.$message({
            message: '已下线活动不可修改',
            type: 'error'
          });
          return false
        }
        this.$router.push({
          path:'/index/AddActivity',
          query: {id: routerData.id}
        })
      },

      /*弹窗 操作*/
      upClick(data) {
        this.action = '';
        this.upData = data;
        this.showUpDialog = true;
      },
      DownClick(data) {
        this.action = 'down'
        this.upData = data;
        this.showUpDialog = true;
      },
      effectUp() {
        let jsonData = {
          aid: this.upData.id
        }
        this.$axios.post(apis.takeActivityEffective,jsonData).then(data=> {
          let datas = data.data
          if(datas.code === 200) {
            this.$message({
              message: '活动生效',
              type: 'success'
            });
            this.search()
            this.showUpDialog = false;
          } else {
            this.$message({
              message: datas.msg,
              type: 'error'
            });
            this.showUpDialog = false;
          }
        })
      },
      /*下线逻辑*/
      effectDown() {
        let jsonData = {
          aid: this.upData.id
        }
        this.$axios.post(apis.takeActivityExpired,jsonData).then(data=> {
          let datas = data.data
          if(datas.code === 200) {
            this.$message({
              message: '活动下线成功',
              type: 'success'
            });
            this.search()
            this.showUpDialog = false;
          } else {
            this.$message({
              message: datas.msg,
              type: 'error'
            });
            this.showUpDialog = false;
          }
        })
      },
      /*显示删除弹窗*/
      removeClick(data) {
        this.removeData = data;
        this.showDialog = true;
      },
      /*确认删除数据接口*/
      remove() {
        let jsonData = {
          aid: this.removeData.id
        }
         this.$axios.delete(apis.deleteActivity,{params:jsonData}).then(data=> {
           let datas = data.data
           if(datas.code === 200) {
             this.$message({
                     message: '删除成功',
                     type: 'success'
              });
              this.search()
              this.showDialog = false;
           }
         })
      },
      //分页-当前页
      handleCurrentChange(page) {
        this.currentPage = page
        this.search()
      }
    },
    components: {
      BreadCrumb
    }

  }
</script>

<style lang="scss" scoped>
  .wrap{
    border: 1px solid rgba(0,0,0,.13)
  }
  .bread{
    padding-bottom:20px;
  }
  .nameFt{
    font-size: 14px;
    color:#333;
    padding-left: 17px;
  }
  .addCustom,.queryBtn{
    width: 90px;
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

  .Twoheader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:9px 0px;
    border-bottom: 1px solid rgba(0,0,0,.13);
    .keywordScur{
      width:50%;
      /*padding-left: 17px;*/
      .selectWin{
        width:30%;
        margin-left:27px;
      }
    }
    .customIpt{
      width:40%;
    }
    .queryBtn{
      margin-right: 17px;
    }
  }
  .paginationWrap{
    padding:10px 0;
    text-align:right;
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
<style lang="scss">
  .dialogMY{
    .el-dialog__body{
      padding: 20px 25px 25px;
    }
  }
</style>