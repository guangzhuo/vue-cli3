<template>
  <div>
    <BreadCrumb class="bread" :breads="['客户','客户管理','补货详情']"></BreadCrumb>
    <div class="header">
      <span class="nameFt">补货订单</span>
      <router-link to="/index/ReplenishmentMangement">
        <el-button class="addCustom" size="small" icon="el-icon-arrow-left">
          返回列表
        </el-button>
      </router-link>
    </div>

    <div class="addMain">
      <el-form :model="ruleForm" status-icon  label-width="140px" label-position="right">
        <div class="felxSpace">
          <el-form-item class="formItem" label="补货单号" prop="replace_no">
            <span>{{ ruleForm.replace_no }}</span>
          </el-form-item>
          <el-form-item class="formItem" label="硬件编号" prop="hard_number">
            <span>{{ ruleForm.hard_number }}</span>
          </el-form-item>
        </div>
        <div class="felxSpace">
          <el-form-item class="formItem" label="补货时间" prop="updated_at">
            <span>{{ ruleForm.updated_at }}</span>
          </el-form-item>
          <el-form-item class="formItem" label="补货状态" prop="status">
            <span>{{ ruleForm.status }}</span>
          </el-form-item>
        </div>
        <div class="felxSpace">
          <el-form-item class="formItem" label="类别总数" prop="type_count">
            <span>{{ ruleForm.type_count }}</span>
          </el-form-item>
          <el-form-item class="formItem" label="补货类型" prop="type">
            <span>{{ ruleForm.type }}</span>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <div class="wrap">
      <div class="MainTable">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              type="index"
              scope="index"
              label="序号"
              width="100px"
              align="center">
            <template slot-scope="scope">
              <div class="listOne">{{scope.$index + 1}}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="number"
              label="选择商品（编号）"
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
              prop="category_id"
              label="分类"
              width="112px"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="biz_item_number"
              label="商家商品编码"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="weight"
              label="商品重量（克）"
              align="center"
          >
            <template slot-scope = 'scope'>
              <span>{{ scope.row.min_weight }}</span>
              <span> ~ </span>
              <span>{{ scope.row.max_weight }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="operate_status"
              label="是否上架"
              align="center"
          >
          </el-table-column>
        </el-table>
      </div>
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
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb'
  import apis from  '@/config/apis'
  export default {
    name: "AddContract",
    data() {
      return {
        ruleForm: {
          replace_no: '', //补货单号
          hard_number: '', //hand_number
          updated_at: '', //补货时间
          status: '', //补货状态
          type_count: '', //类别总数
          type: '', //补货类别
        },
        tableData: [],
        currentPage:1,
        PageSize: 6,
        total: 1,
        contractId: this.$route.query.replace_no
      }
    },
    creatd() {
    },
    mounted() {
      console.log(this.contractId)
      this.detailCon()
    },
    methods: {
      detailCon() {
        let url = `${apis.replace_detail}/${this.contractId}`
        let jsonData = {
          // page_size: this.PageSize,
          page_index: this.currentPage
        }
        this.$axios.post(url,jsonData).then( data => {
          console.log(data)
          let datas = data.data
          if(datas.code == 200) {
            let {total_info:{replace_no,hard_number,updated_at,status,type_count,type},
                goods_info,
              } = datas.data
            let {pagination:{page_index,page_size,total}} = datas
            this.ruleForm = {
              replace_no: replace_no, //补货单号
              hard_number: hard_number, //hand_number
              updated_at: updated_at, //补货时间
              status: status, //补货状态
              type_count: type_count, //类别总数
              type: type, //补货类别
            },
              this.tableData = goods_info
              this.total = total
            this.PageSize = page_size
            /* total*/



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


  /*弹窗*/
  .dialogSeach{
    width:50%;
    margin-bottom: 20px;
    .dialogSeachIpt{
      width:48%;
      margin-right: 12px;
    }
  }
  .MainDialog{
    display: flex;
    justify-content: space-between;

    .LeftTable{
      width:70%;
      border: 1px solid rgba(0,0,0,.13);
    }
    .RightType{
      width:28%;
      border: 1px solid rgba(0,0,0,.13);
      overflow: auto;
      max-height: 288px;
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