<template>
<div class="Echart">
    <div class="chart">
         <ul  class="list">
             <li class="market">销售额统计</li>
                     <li  class="lilist">
                            <div class="line">
                                            <ul>
                                                <li ><el-button v-for='(item,index) in items' :class='{"active":item.show == true}' :key="item.id" @click='cross(item,index)' size="small">{{item.name}}</el-button></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                         </div>
    <div id="drawLine"></div>
    </div>
</template>

<script>
// import echarts from "echarts";
export default {
    data(){
     return{
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
            //  Data:data.Chart.month,
            //  resData:data.Chart.value
           Data: ["7.01", "7.02", "7.03", "7.04","7.05", "7.06", "7.07", "7.08", "7.09",
                 "7.10","7.11","7.12", "7.13", "7.14", "7.15", "7.16", "7.17", "7.18", "7.19",
                 "7.20", "7.21", "7.22", "7.23", "7.24", "7.25", "7.26", "7.27", "7.28", "7.29", "7.30"],
            resData: [720,932, 901,934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901,534,129,133,132,820,932,901,
                    934,1250,1230,120,820,532,901,934,1290,330,1320]
     }
    },
    
     mounted() {
    this.$nextTick(function() {
      this.drawLine("drawLine");
       var that = this;
        window.addEventListener("resize", function () {
                that.chart.resize();
            });
     
    });
  },
    methods: {
        cross(item, index) {
            this.items.forEach(function(val) {
                val.show = false;
            });
            item.show = true;
            switch(index){
                case 0:
                 echarts.dispose(this.chart);
                    this.Data =  ["7.01", "7.02", "7.03", "7.04","7.05", "7.06", "7.07", "7.08", "7.09",
                 "7.10","7.11","7.12", "7.13", "7.14", "7.15", "7.16", "7.17", "7.18", "7.19",
                 "7.20", "7.21", "7.22", "7.23", "7.24", "7.25", "7.26", "7.27", "7.28", "7.29", "7.30"]
                    this.resData = [720,932, 901,934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901,534,129,133,132,820,932,901,
                    934,1250,1230,120,820,532,901,934,1290,330,1320]
                    this.drawLine('drawLine');
                break
                case 1:
                echarts.dispose(this.chart);
                 this.Data =  ["1", "2", "3", "4","5", "6", "7", "8", "9",
                 "10","11","12"]
                  this.resData = [8200,9032, 9001,9304, 12900, 13030, 13020, 8020, 9032, 9010, 9304, 12090]
                  this.drawLine("drawLine");
                break
            }
             
            },
   

    drawLine(id) {
      this.chart = echarts.init(document.getElementById(id));
      this.chart.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
        //   data:datas.Chart.name,
        data:this.Data,
        },
          tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                textStyle: {
                    color: '#000'
                },
                extraCssText: 'width: 120px',
                formatter: function(val) {
                    let sadata = val.name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '' + '<br>' + '销售额' + '&nbsp;&nbsp;&nbsp;' + val.value + '台' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                    return sadata + '<br>' + '';
                },
                backgroundColor: 'rgba(0,0,0,0.6)',
                textStyle: {
                    color: 'white'
                }
            },
        yAxis: {
          type: "value",
          nameGap:'40'
        },
        series: [
          {
            data:this.resData,
            // data:datas.Chart.value,
            type: "line",
            symbolSize: 15, 
            // smooth:true,
            itemStyle : {
                          normal : {
                          color:'green',
                           lineStyle:{
                                      color:'red',
                                    },
                                    label : {show: true}
                                }
                  }        },
              ]
      });
    }
  },
}
</script>

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
