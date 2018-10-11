<template>
  <div>
    <BreadCrumb class="bread" :breads="['运营','订单管理']"></BreadCrumb>
    <div class="wrap">
      <div class="header">
        <span class="nameFt">订单管理</span>
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


          <el-select class="selectWin" v-model="search.type" size="small" placeholder="订单状态">
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
                  prop="order_no"
                  label="订单编号"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="machine_id"
                  label="机器编号"
                  width="112px"
                  align="center"
          >
          </el-table-column>
          <el-table-column
              prop="created_at"
              label="创建时间"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="qty_count"
              label="数量"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="order_price"
              label="支付(元)"
              align="center"
          >
            <template slot-scope="scope">
              <div class="amount">￥{{scope.row.order_amount}}</div>
              <div>￥{{ scope.row.real_amount }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="pay_channel"
              label="支付渠道"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="status"
              label="订单状态"
              align="center"
          >
          </el-table-column>
          <el-table-column
              label="操作"
              align="center"
          >
            <template slot-scope="scope">
              <el-button title="订单详情" v-dacusClick size="small" type="primary" @click="seeLook(scope.row)" icon="el-icon-view" circle></el-button>
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
            label: '订单状态'
          },
          {
            value: 'WAIT_CHECK',
            label: '处理中'
          },
          {
            value: 'WAIT_PAY',
            label: '待支付'
          },
          {
            value: 'TRADE_SUCCESS',
            label: '交易成功'
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
        let {startTime, endTime, type} = this.search
        let jsonData = {
          "start_time": startTime,
          "end_time": endTime,
          "status": type,
          "key_world":"",
          "page_index": clickThat === 'cl'? this.currentPage = 1: this.currentPage
        }

        if(TimeSzie(startTime,endTime)) {
          this.$message({
            type: 'error',
            message: '开始时间需要小于结束时间'
          })
          return false
        }

        this.$axios.post(apis.order_list,jsonData).then( data => {
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
          path:'/index/OrderDetails',
          query: {order_id: routerData.id}
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
  .amount{
    position: relative;
    &:before{
      content: '';
      width:50px;
      height:1px;
      position: absolute;
      top:11px;
      left:0px;
      right:0;
      margin:auto;
      background: gray;

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