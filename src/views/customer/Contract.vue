<template>
  <div>
    <BreadCrumb class="bread" :breads="['签约','合同管理']"></BreadCrumb>
    <div class="wrap">
      <div class="header">
        <span class="nameFt">合同管理</span>
      </div>
      <div class="Twoheader">
        <div class="keywordScur">
          <span class="nameFt">硬件编号：</span>
          <el-input class="customIpt" v-model="hard_number" size="small" placeholder="请输入硬件编号"></el-input>
          <el-select class="selectWin" clearable v-model="status" size="small" placeholder="合同状态">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button class="queryBtn" size="small" type="primary" @click="select">查询</el-button>
      </div>
      <div class="MainTable">
          <el-form>
        <el-table
            :data="contractList"
            style="width: 100%">
          <el-table-column
              prop="id"
              label="ID"
              width="60"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="company"
              label="公司名称"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="contract_no"
              label="合同编号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="hard_number"
              label="硬件编号"
              width="112px"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="created_at"
              label="合同生效时间"
              align="center"
              width="120px"
          >
          </el-table-column>
          <el-table-column
              prop="end_time"
              label="合同失效时间"
              align="center"
              width="120px"
          >
          </el-table-column>
          <el-table-column
              prop="sku_count"
              label="sku数量"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="salesman"
              label="业务员"
              align="center"
          >
          
          </el-table-column>
          <el-table-column
              prop="status"
                :formatter="formatRole"
              label="状态"
              align="center"
          >
          
          </el-table-column>
          <el-table-column
              prop="name"
              label="操作"
              align="center"
              width="150px"
          >
            <template slot-scope="scope">
              <el-button size="small" type="primary" 
         
              @click="handleClick(scope.row)" 
              icon="el-icon-edit" 
             :disabled="scope.row.status =='TAKE_REJECT'"
             title="修改合同"
              circle></el-button>
              <el-button size="small" type="success"
               :disabled="scope.row.status =='TAKE_EFFECTIVE' || scope.row.status=='TAKE_REJECT'"
               @click="confirm(scope.row)" 
               icon="el-icon-success" 
                title="确认合同"
               circle
            ></el-button>
              <el-button size="small" type="danger"
               :disabled="scope.row.status =='TAKE_EFFECTIVE' || scope.row.status=='TAKE_REJECT'"
               @click="cancel(scope.row)"
                icon="el-icon-circle-close"
                title="删除合同"
                 circle></el-button>
            </template>
          </el-table-column>
        </el-table>
          </el-form>
        <div class="paginationWrap">
          <el-pagination
              @current-change="paging"
              :page-size="page_size"
              layout="total, prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb'
import apis from  '@/config/apis'
  export default {
    name: "CustomerManagement",
    data() {
      return {
        hard_number: '',
        contractList:[],
        status:'',
        total:0,
        page_index:1,
        page_size:20,
        options: [
          {
            value: 'TAKE_EFFECTIVE',
            label: '已生效'
          }, {
            value: 'TAKE_REJECT',
            label: '已驳回'
          },{
            value: 'WAIT_CONFIRM',
            label: '待确认'
          }
        ],
      }
    },
    creatd() {
    },
    mounted() {
        this.getContract();
    },
    methods: {
      //分页-当前页
       formatRole: function(row, column) {     
            return row.status == 'TAKE_EFFECTIVE'
             ? "已生效" : row.status == 'TAKE_REJECT' ?
              "已驳回" :row.status == 'WAIT_CONFIRM' ? "待确认":''},


      handleCurrentChange(page) {
        // console.log(page)
      },
      handleClick(row) {
        //   debugger;
      this.$router.push({
        path: "/index/AddContract",
        query: { id: row.id
        }
      });
    },
       paging(val){
        this.page_index=val;
        this.getContract();
    
    },
    select(){
        this.page_index=1;
        this.getContract();

    },
          confirm(row){
        this.$axios.post(apis.changeContract,{
            "cid":row.id,
            "status":"TAKE_EFFECTIVE"
           }).then((data)=>{
            console.log(data);
            if(data.data.code==200){
                this.$message({
                    message:'合同已生效',
                    type:'success'
                })
                this.getContract();
            }
                         
    })
      },
        cancel(row){
        this.$axios.post(apis.changeContract,{
            "cid":row.id,
            "status":"TAKE_REJECT"
           }).then((data)=>{
            console.log(data);
            if(data.data.code==200){
                this.$message({
                    message:'合同驳回',
                    type:'success',
                })
                 this.getContract();
            }
                         
    })
      },


  
      getContract(){
        this.$axios.get(apis.contractList,{
        params:{
            "page_index":this.page_index,
            "hard_number":this.hard_number,
            "status":this.status,
               
}
        }).then((data)=>{
            console.log(data);
            if(data.data.code==200){
                this.contractList=data.data.data;
                if(this.contractList.status=='TAKE_EFFECTIVE'){
                    this.contractList.status='已生效'
                }
                this.total=data.data.pagination.total;
            }
                         
    })
      },
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
</style>