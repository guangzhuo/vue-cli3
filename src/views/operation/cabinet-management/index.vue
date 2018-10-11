<template>
  <div>
    <BreadCrumb class="bread" :breads="['运营','柜子管理']"></BreadCrumb>
    <div class="wrap">
      <div class="header">
        <span class="nameFt">柜子管理</span>
      </div>
      <div class="Twoheader">
        <div class="keywordScur">
          <span class="nameFt">硬件编号：</span>
          <el-input class="customIpt" v-model="search.hard_number" size="small" placeholder="请输入硬件编号"></el-input>

          <el-select class="selectWin" v-model="search.status" size="small" placeholder="柜子状态">
            <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button v-dacusClick class="queryBtn" size="small" type="primary" @click="searchBtn('cl')">查询</el-button>
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
              prop="hard_number"
              label="硬件编号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="terminal_number"
              label="设备名称"
              align="center"
          >
          </el-table-column>
          <el-table-column
              label="柜子状态"
              width="142px"
              align="center"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.status }} {{ scope.row.network_status }}{{ scope.row.latest_online_time }} 更新</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="num"
              label="今日销售"
              align="center"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.total_amount }}元/共{{ scope.row.total_order_count }}单</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="total_stock"
              label="库存"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="updated_at"
              label="最后操作"
              align="center"
          >
          </el-table-column>
          <el-table-column
              label="操作"
              align="center"
          >
            <template slot-scope="scope">
              <el-button size="small" type="primary" v-dacusClick @click="downLine(scope.row)">下线</el-button>
              <el-button size="small" type="primary" v-dacusClick @click="reloadsetting(scope.row)">重启</el-button>
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

    <!--下线-->
    <el-dialog
        class="XX_dialog"
        :visible.sync="XX_dialog"
        width="30%"
        center>
      <div slot="title">
        <i class="el-icon-warning"></i>
      </div>
      <div class="Main">
        <div class="infoOne">确定要下线该机器吗？</div>
        <div class="infoTwo">下线后用户无法开门购买，请谨慎操作！</div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="XX_dialog = false">取 消</el-button>
          <el-button type="danger" v-dacusClick @click="downHand">确 认</el-button>
      </span>
    </el-dialog>

    <!--重启-->
    <el-dialog
        class="reload_dialog"
        :visible.sync="reload_dialog"
        width="30%"
        center>
      <div slot="title">
        <i class="el-icon-warning"></i>
      </div>
      <div class="Main">
        <div class="infoOne">确定要重启该机器吗？</div>
        <div class="infoTwo">5分钟内将无法再次重启！</div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="reload_dialog = false">取 消</el-button>
          <el-button type="danger" v-dacusClick @click="reloadHand">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb'
  import apis from  '@/config/apis'
  export default {
    name: "CabinetMangement",
    data() {
      return {
        search:{
          hard_number: '',
          status: '',
        },
        typeOptions: [
          {
            value: '',
            label: '柜子状态'
          },
          {
            value: 'TAKE_ENABLE',
            label: '已启用'
          },
          {
            value: 'NO_ENABLE',
            label: '未启用'
          },
        ],
        tableData: [],
        total: 1,
        currentPage: 1,
        PageSize: 10,
        XX_dialog: false,
        downData: null,
        reloadData: null,
        reload_dialog: false
      }
    },
    created() {
      this.searchBtn()
    },
    mounted() {
    },
    methods: {

      /*search*/
      searchBtn(clickThat = '') {
        let {hard_number, status} = this.search
        let params = {
          "hard_number": hard_number,
          "status": status,
          "page_index": clickThat === 'cl'? this.currentPage = 1: this.currentPage
        }


        this.$axios.get(apis.terminal_list,{params}).then( data => {
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

      /*下线*/
      downLine(data) {
        this.downData = data
        this.XX_dialog = true
      },

      downHand() {
        let data = this.downData
        this.XX_dialog = false
       /* this.$axios.post(apis.url,{id: data.id}).then( data=> {
          let datas = data.data
          if(datas.code == 200) {
            this.$message({
              type: 'success',
              message: datas.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: '下线失败，请重试'
            })
          }
        })*/
      },

      /*重启*/
      reloadsetting(data) {
        this.reloadData = data
        this.reload_dialog = true
      },
      reloadHand() {
        let data = this.reloadData
        this.reload_dialog = false
        /* this.$axios.post(apis.url,{id: data.id}).then( data=> {
           let datas = data.data
           if(datas.code == 200) {
             this.$message({
               type: 'success',
               message: datas.msg
             })
           } else {
             this.$message({
               type: 'error',
               message: '下线失败，请重试'
             })
           }
         })*/
      },

      //分页-当前页
      handleCurrentChange(page) {
        this.currentPage = page
        this.searchBtn()
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
      width:90%;
      .selectWin{
        width:13%;
        margin-left:27px;
      }
    }
    .customIpt{
      width:15%;
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