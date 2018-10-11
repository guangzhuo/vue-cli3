<template>
<div class="Container"  v-loading="loading"  element-loading-text="加载中">
    <BreadCrumb class="bread"></BreadCrumb>
<beachHeader :order_goods='order_goods' :order_count='order_count'
:order_customer='order_customer' :order_sales='order_sales'
></beachHeader>
<beachContainer :order_refund='order_refund' :order_cabinet='order_cabinet'></beachContainer> 
<div class="Echart">
    <div class="chart">
         <ul  class="list">
             <li class="market">销售额统计</li>
                     <li  class="lilist">
                            <div class="line">
                                            <ul>
                                                <li><el-button v-for='(item,index) in items' :class='{"active":item.show == true}' :key="item.id" @click='cross(item,index)' size="small">{{item.name}}</el-button></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                         </div>
    <div id="drawLine"></div>
    </div>
</div>
</template>

<script>
import beachHeader from './beachHeader'
import beachContainer from './beachContainer'
import echarts from 'echarts';
import apis from  '@/config/apis'
// import beachEchart from './beachEchart'
import BreadCrumb from '@/components/BreadCrumb'

export default {
    components:{
        beachHeader,
        beachContainer,
        // beachEchart,
        BreadCrumb
    },
    data(){
        return {
            loading:false,
            order_cabinet:'',
            order_customer:'',
            order_count:'',
            order_goods:'',
            order_sales:'',
            order_refund:'',
            terminal_count:'',
            year: "",
      itemStyleObj: {
        normal: {
          barBorderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#14c8d4" },
            { offset: 1, color: "#43eec6" }
          ])
        }
      },
      itemStyleObj2: {
        normal: {
          color: "red",
          lineStyle: {
            color: "red"
          },
          label: { show: false }
        }
      },
            
             items: [
                {
                    name: '按日',
                    show: true,
                },
                {
                    name: '按月',
                    show: false,
                },
               
            ],
     }


        },
      
  methods: {
        cross(item, index) {
      this.items.forEach(function(val) {
        val.show = false;
      });
      item.show = true;
      switch (index) {
        case 0:
          this.getData();
          break;
        case 1:
          this.getMonth();
          break;
      }
    },

    getCount(){
        this.loading=true;
    this.$axios.get(apis.cliIndex).then(data =>{
       let datas =data.data;
     if(datas.code == 200){
         this.loading=false;
         this.order_cabinet=datas.data.order_cabinet;
         this.order_count=datas.data.order_count;
         this.order_customer=datas.data.order_customer;
         this.order_goods=datas.data.order_goods;
         this.order_refund=datas.data.order_refund;
         this.order_sales=datas.data.order_sales;
     }
    })
    },

            getMonth() {
            this.loading=true;
      this.$axios.post(apis.workIndex, {
          show_key: this.year
        }).then(data => {
            if(data.data.code== 200){
                this.loading=false;
          let Month = data.data.data.month_order_list;
          let MonthArr = [];
          let valueArr = [];
          let qtyArr = [];
          for (let obj in Month) {
            MonthArr.push(Month[obj].time);
            valueArr.push(Month[obj].value);
            qtyArr.push(Month[obj].qty);
            this.MonthValue = MonthArr;
            this.value1 = valueArr;
            this.qty1 = qtyArr;
          }
       
        this.chart.setOption({
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.MonthValue,
            axisLabel: {
              rotate: 60
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          series: [
            {
              data: this.value1,
              name: "销售额",

              type: "bar",
              barWidth: 10,
              itemStyle: this.itemStyleObj
            },
            {
              data: this.qty1,
              name: "销售量",
              smooth: true,
              type: "line",
              symbolSize: 12,
              itemStyle: this.itemStyleObj2
            }
          ]
           });
           }
        });
        
    },
      getData() {
          this.loading=true;
      this.$axios.post(apis.workIndex).then(data => {
        let datas =data.data;
        if(datas.code == 200){
            this.loading=false;
        let Day = datas.data.month_order_list;
        let DayArr = [];
        let valueArr = [];
        let qtyArr = [];
        for (let obj in Day) {
          DayArr.push(Day[obj].time);
          valueArr.push(Day[obj].value);
          qtyArr.push(Day[obj].qty);
          this.day = DayArr;
          this.value = valueArr;
          this.qty = qtyArr;
        }
        this.chart.setOption({
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.day,
            axisLabel: {
              rotate: 60
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: ["销售额", "销售量"]
          },
          yAxis: {
            type: "value",
            nameGap: "40"
          },
          series: [
            {
              data: this.value,
              name: "销售额",

              type: "bar",
              barWidth: 10,
              itemStyle: this.itemStyleObj
            },
            {
              data: this.qty,
              name: "销售量",
              smooth: true,
              type: "line",
              symbolSize: 15,
              itemStyle: this.itemStyleObj2
            }
          ]
        });
        }
      });
    
    },
   

    drawLine(id) {
          this.chart = echarts.init(document.getElementById("drawLine"));
      var that = this;
      window.addEventListener("resize", function() {
        that.chart.resize();
      });
       this.getCount();
      this.getData();
    //   this.getMonth();
     
    }
  },
  mounted() {
      this.drawLine("drawLine")
  }
}


</script>

<style lang="scss" scoped>
.Container{
    //   background: rgb(248,248,248) ;
    background: white;
      .BreadCrumb{
      margin-top: 20px;
      }
}
</style>

<style lang="scss" scoped>
.Echart{
      .chart {
          width:100%;
        
    height: auto;
    overflow: hidden;
    .list{
        width:90%;height:75px;margin:0 auto;
        .market{
           width:120px;height:75px;float:left;margin-left:2%;line-height: 75px;font-size: 20px;
        }
        .lilist{
            float: right;
         .line {
                width: 100%;
                height: 20px;
                margin-top:12px;
                .active {
                    background: #0099FF;
                    cursor: pointer;
                    color: white;
                    border-bottom: 1px solid #999999;
                    font-weight: 200;
                }
                ul {
                    width: 100%; 
                }
            }
        }
    }
     
  }
 #drawLine{
     width:100%;
      height:350px;
      margin-top: -30px;
      }
}
</style>