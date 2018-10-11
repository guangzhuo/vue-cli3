<template>
  <div>
    <BreadCrumb class="bread" :breads="['客户','客户管理','订单详情']"></BreadCrumb>
    <div class="header">
      <span class="nameFt">订单详情</span>
      <router-link to="/index/OrderMangement">
        <el-button class="addCustom" size="small" icon="el-icon-arrow-left">
          返回列表
        </el-button>
      </router-link>
    </div>

    <div class="addMain">
      <el-form :model="ruleForm" status-icon  label-width="140px" label-position="right">
        <el-form-item class="formItem" label="订单编号" prop="order_no">
          <span>{{ ruleForm.order_no }}</span>
        </el-form-item>
        <div class="felxSpace">
          <el-form-item class="formItem" label="创建时间" prop="created_at">
            <span>{{ ruleForm.created_at }}</span>
          </el-form-item>
          <el-form-item class="formItem" label="设备编号" prop="hard_number">
            <span>{{ ruleForm.hard_number }}</span>
          </el-form-item>
        </div>
        <div class="felxSpace">
          <el-form-item class="formItem" label="付款时间" prop="updated_at">
            <span>{{ ruleForm.updated_at }}</span>
          </el-form-item>
          <el-form-item class="formItem" label="付款方式" prop="pay_channel">
            <span>{{ ruleForm.pay_channel }}</span>
          </el-form-item>
        </div>
        <div class="felxSpace">
          <el-form-item class="formItem" label="订单状态" prop="status">
            <span>{{ ruleForm.status }}</span>
          </el-form-item>
          <el-form-item class="formItem" label="用户手机" prop="mobile">
            <span>{{ ruleForm.mobile }}</span>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <div class="wrap">
      <div class="MainTable">
        <el-table
            :data="tableData"
            @selection-change="selectChange"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="number"
              label="商品编号"
              align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.number }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="name"
              label="商品名称"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="pay_price"
              label="销售单价"
              width="112px"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="qty"
              label="数量"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="price"
              label="金额"
              align="center"
          >
         <!--   <template slot-scope = 'scope'>
              <span>{{ scope.row.price | filterPrice }}</span>
            </template>-->
          </el-table-column>
          <el-table-column
              prop="real_refund_amount"
              label="退款"
              align="center"
          >
          </el-table-column>

        </el-table>
      </div>
      <!--<div class="paginationWrap">
        <el-pagination
            @current-change="handleCurrentChange"
            :page-size="PageSize"
            :current-page="currentPage"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>-->
    </div>
    <div class="btnFroup">
      <el-button v-if="status_name == 'WAIT_PAY'" size="small" type="primary" round @click="SK_showDialog">收款</el-button>
      <el-button v-if="status_name == 'WAIT_CHECK'" size="small" type="error" round @click="TK_showDialog">退款</el-button>
    </div>
    <div class="footerMoney">
      <div class="countMoney">总额：{{ order_amount }}</div>
      <div class="countMoney beforeLine">优惠：{{ discount }}</div>
      <div class="countMoney">实付：{{ real_amount }}</div>
    </div>

    <!--退款-->
    <el-dialog
        class="dialogMY"
        :visible.sync="showDialog"
        width="30%"
        center>
      <div slot="title">
        <i class="el-icon-warning"></i>
      </div>
      <div class="Main">
        <div class="infoOne">确定要给用户退款吗？</div>
        <div class="Return_monery">{{ `（￥${returnMonery}）` }}</div>
        <div class="infoTwo">退款只有一次机会,请仔细核对！</div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button v-dacusClick type="danger" @click="downFun">退 款</el-button>
      </span>
    </el-dialog>

  <!--收款-->
    <el-dialog
        class="dialogMY"
        :visible.sync="SKDialog"
        width="30%"
        center>
      <div slot="title">
        <i class="el-icon-warning"></i>
      </div>
      <div class="Main">
        <div class="infoOne">确定要给用户收款吗？</div>
        <div class="Return_monery">{{ `（￥${returnMonery}）` }}</div>
        <div class="infoTwo">收款只有一次机会,请仔细核对！</div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="SKDialog = false">取 消</el-button>
          <el-button v-dacusClick type="danger" @click="ShouFun">收 款</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb'
  import apis from  '@/config/apis'
  export default {
    name: "OrderDetails",
    data() {
      return {
        showDialog: false,
        SKDialog: false,
        ruleForm: {
          order_no: '', //订单编号
          created_at: '', //创建时间
          hard_number: '', //设备编号
          updated_at: '', //付款时间
          pay_channel: '', //付款方式
          status: '', //订单状态
          mobile: '', //用户手机
        },
        tableData: [],
        currentPage:1,
        PageSize: 6,
        total: 1,
        contractId: this.$route.query.order_id,
        SK_Data:null,
        TK_Data:null,
        order_amount: '',
        discount: '',
        real_amount: '',
        itemidArr:[], //多选数据
        returnMonery: 0,//退款总金额
        status_name: '' //判断按钮显示
      }
    },
    created() {
    },
    mounted() {
      this.detailCon()
    },

    methods: {
      detailCon() {
        let url = `${apis.order_detail}/${this.contractId}`
        this.$axios.get(url).then( data => {
          let datas = data.data
          if(datas.code == 200) {
            let {total_info:{order_no,created_at,hard_number,updated_at,pay_channel,status,mobile,status_name},
              goods_info,
              payment:{discount,order_amount,real_amount}
            } = datas.data
            // let {pagination:{page_index,page_size,total}} = datas
            this.ruleForm = {
              order_no: order_no, //订单编号
              created_at: created_at, //创建时间
              hard_number: hard_number, //设备编号
              updated_at: updated_at, //付款时间
              pay_channel: pay_channel, //付款方式
              status: status, //订单状态
              mobile: mobile, //用户手机
            },

              this.status_name = status_name

            this.tableData = goods_info

              this.order_amount = order_amount,
              this.discount = discount,
              this.real_amount =  real_amount

            /*this.total = total
            this.PageSize = page_size*/

          } else {
            this.$message({
              type: 'error',
              message: datas.msg
            })
          }
        })
      },


      /*table 多选*/
      selectChange(selection) {
        this.itemidArr = selection
      },

      /*弹窗操作*/
      SK_showDialog() { //收款弹框
        this.returnMonery = 0
        let num = 0
        this.itemidArr.filter( (item,index) => {
          num += item.price
        })
        this.returnMonery = num.toFixed(2)
        this.SKDialog = true
      },
      TK_showDialog(){//退款弹框
        this.returnMonery = 0
        let num = 0
        this.itemidArr.filter( (item,index) => {
          num += item.price
        })
        this.returnMonery = num.toFixed(2)
        this.showDialog = true
      },
      /*退款*/
      downFun() {
        let ids = []
        for(let item of this.itemidArr) {
          ids.push(item.id)
        }
        if(ids.length == 0){
          this.$message({
            type: 'error',
            message: '没有勾选退款商品！'
          })
          return false
        }
        let jsonData = {
          "out_order_no": this.ruleForm.order_no,
          "ids": ids
        }

        this.$axios.post(apis.refund,jsonData).then( data => {
          let datas = data.data
          if(datas.code == 200) {
            this.$message({
              type: 'success',
              message: datas.msg
            })
            this.detailCon()
            this.showDialog = false
          } else {
            this.$message({
              type: 'error',
              message: datas.msg
            })
          }
        })
      },
      /*收款*/
      ShouFun() {
        let jsonData = {
          "out_trade_no": this.ruleForm.order_no,
        }

        this.$axios.post(apis.pappayapply,jsonData).then( data => {
          let datas = data.data
          if(datas.code == 200) {
              this.$message({
              type: 'success',
              message: datas.msg
            })
            this.detailCon()
            this.SKDialog = false
          } else {
            this.$message({
              type: 'error',
              message: datas.msg
            })
          }
        })
      },

      //分页-当前页
      handleCurrentChange(page) {
        this.currentPage = page
        this.detailCon()
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
  .paginationWrap{
    padding:10px 0;
    text-align:right;
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
    .selectWin{
      width:100%;
    }
    .formItem{
      width:48%;
    }
    .felxSpace{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

  }
  .addBtn-group{
    margin-top:40px;
    text-align: center;
  }
  .footer-addBtn-group{
    text-align: center;
  }
  .btnFroup{
    text-align: right;
    margin-top:6px;
  }
  .footerMoney{
    margin-top:12px;
    .countMoney{
      text-align: right;
      padding-bottom:6px;
      font-size: 14px;
      color:#999
    }
    .beforeLine{
      position: relative;
      &::before{
        content:"";
        position: absolute;
        width:78px;
        height:1px;
        z-index: 2;
        background: #999;
        top: 8px;
        right: -2px;
      }
    }
  }

  /*弹窗*/
  .Return_monery{
    font-size: 26px;
    line-height: normal;
  }
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
  .listClose{
    text-align: center;
    .el-button--mini{
      padding: 3px 15px;
    }
    .listTwo{
      display: none;
    }
    &:hover{
      .listOne{
        display: none;
      }
      .listTwo{
        display: inline-block;

      }
    }
  }
</style>