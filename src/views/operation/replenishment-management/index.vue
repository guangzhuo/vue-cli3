<template>
  <div>
    <BreadCrumb class="bread" :breads="['运营','补货管理']"></BreadCrumb>
    <div class="wrap">
      <div class="header">
        <span class="nameFt">补货管理</span>
      </div>
      <div class="Twoheader">
        <div class="keywordScur">
          <span class="nameFt">开始时间：</span>
          <el-date-picker
              class="selectWin"
              size="small"
              v-model="search.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始日期">
          </el-date-picker>

          <span class="nameFt">结束时间：</span>
          <el-date-picker
              class="selectWin"
              size="small"
              v-model="search.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择结束日期">
          </el-date-picker>

          <span class="nameFt">机器编号：</span>
          <el-input class="customIpt" v-model="search.number" size="small" placeholder="请输入机器编号"></el-input>

          <el-select class="selectWin" v-model="search.type" size="small" placeholder="补货状态">
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
          <el-table-column
              prop="replace_no"
              label="补货单号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="hard_number"
              label="硬件编号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="terminal_type"
              label="终端类型"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="phone"
              label="手机"
              width="112px"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="total_count"
              label="类别总数"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="operate_status"
              label="补货类型"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="updated_at"
              label="补货时间"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="status"
              label="补货状态"
              align="center"
          >
          </el-table-column>
          <el-table-column
              label="操作"
              align="center"
          >
            <template slot-scope="scope">
              <el-button v-dacusClick size="small" title="补货详情" type="primary" @click="seeLook(scope.row)" icon="el-icon-view" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationWrap">
          <el-pagination
              v-dacusClick
              @current-change="handleCurrentChange"
              :page-size="PageSize"
              :current-page="currentPage"
              layout="total, prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb'
  import apis from  '@/config/apis'
  import {TimeSzie} from '@/plugins/common'
  export default {
    name: "CustomerManagement",
    data() {
      return {
        search:{
          startTime: '',
          endTime: '',
          number: '',
          type: ''
        },
        typeOptions: [
          {
            value: '',
            label: '补货状态'
          },
          {
            value: 'WAIT_REP',
            label: '待补货'
          },
          {
            value: 'REPING',
            label: '补货中'
          },
          {
            value: 'FINSH_REP',
            label: '补货完成'
          },
          {
            value: 'ADJUS_REP',
            label: '已调整'
          }
        ],
        tableData: [],
        total: 1,
        currentPage: 1,
        PageSize: 10
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
        let {startTime, endTime, number, type} = this.search
        let jsonData = {
          "start_time": startTime,
          "end_time": endTime,
          "key_word": number,
          "terminal_type": type,
          "sort_by": "desc",
          "page_index": clickThat === 'cl'? this.currentPage = 1: this.currentPage
        }

        if(TimeSzie(startTime,endTime)) {
          this.$message({
            type: 'error',
            message: '开始时间不能小于结束时间'
          })
          return false
        }


        this.$axios.post(apis.replace_list,jsonData).then( data => {
          let datas = data.data
          if(datas.code === 200) {
            let {data:{data},pagination:{page_count,page_index,page_size,total}} = datas
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
      seeLook(routerData) {
        this.$router.push({
          path:'/index/ReplenishmentDetails',
          query: {replace_no: routerData.replace_no}
        })
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