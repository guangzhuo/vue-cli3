<template>
<div class="Container">
    <div class="Cleft">
         <div class="dell">待处理</div>
        <div class="Citem">
        <div class="item" v-for="item in list" :key="item.id">
            <div><img :src="item.image1"></div>
            <div class="son">待签约柜子</div>
            <div class="son">{{order_cabinet}}</div>
        </div>
         <div class="item" >
          <div v-for="item in list" :key="item.id"><img :src="item.image2"></div>
            <div class="son">退款/退货</div>
            <div class="son">{{order_refund}}</div>
          </div>
           <!-- <div class="item" v-for="item in list" :key="item.id">
          <div><img :src="item.image2"></div>
            <div class="son">客户反馈</div>
            <div class="son">68</div>
          </div>-->
          </div> 
    </div>
       
    <div class="Cleft">
         <div class="dells">
            <div class="shop">热销商品</div> 
            <div class="tabs">
              <el-button :class='{active:active===1}'  @click='active=1' size="small">按日</el-button>
               <el-button :class='{active:active===2}'  @click='active=2' size="small">按月</el-button>
            </div>
         </div>
         <div  v-show='active===1' class="category">
             <div class="Cgory">
             <div class="Cname">商品名称</div>
             <div class="Csort">分类</div>
             <div class="Csort">销量</div>
             </div>
             <div class="Cpart" v-for="day in item" :key="day.id">
                  <div class="Cname">{{day.name}}</div>
                  <div class="Csort">{{day.classification}}</div>
                  <div class="Csort">{{day.number}}</div>
             </div>
             </div>   
         <div  v-show='active===2' class="category">
               <div class="Cgory">
             <div class="Cname">商品名称</div>
             <div class="Csort">分类</div>
             <div class="Csort">销量</div>
             </div>
             <div class="Cpart" v-for="month in items" :key="month.id" >
                  <div class="Cname">{{month.name}}</div>
                  <div class="Csort">{{month.classification}}</div>
                  <div class="Csort">{{month.number}}</div>
             </div>
             
             </div>           
    </div>
    </div>    
</template>

<script>
import img1 from '@/assets/images/icons/u3761.png'
import img2 from '@/assets/images/icons/u3765.png'
import img3 from '@/assets/images/icons/u3772.png'
import apis from  '@/config/apis'
export default {
    props:['order_refund','order_cabinet'],
    data() {
        return {
            active:1,
            items:[],
            item:[],
            list:[
          {
              image1:img1,
              order_refued:this.order_refued,
              image2:img2,
              image3:img3
          }
        ],

        }
    
        
    },
    methods:{
        getList(){
         this.$axios.get(apis.salesIndex,
         {
         params:{
           'key':'day'
           }
         }
         ).then(data=>{
            let datas = data.data;
            if(datas.code == 200){
               this.item=datas.data.data;
            }
             
         })
        },
        getMonList(){
         this.$axios.get(apis.salesIndex,
         {
         params:{
           'key':'month'
           }
         }
         ).then(data=>{
            let datas = data.data;
            if(datas.code == 200){
               this.items=datas.data.data;
            }
             
         })
        },


    },
    
    created(){
    this.getList();
    },
    mounted(){
     this.getMonList();
    },
    
}
</script>

<style lang="scss" scoped>
.Container{
    width:90%;
    margin:0 auto;
    display: flex;
    .Cleft{
        // width: 43%;
        background:#f8f8f8;
        overflow: hidden;
        height:250px;
        margin-left:2%;
        margin-bottom:2%;
        flex:1;
        flex-direction: row;
        justify-content: space-around;
        .dell{
            width: 100%;
            padding:20px;
            border-bottom: 1px solid	#D8D8D8;
        }
        .dells{
          width:100%;
          display: flex;
          padding:12px;
           border-bottom: 1px solid	#D8D8D8;
          .shop{
            //   display: flex;
            padding:10px 0 0 30px;
            text-align: left;
              flex:1;
              flex-direction: row;
              justify-content: space-between;
         
          }
           .tabs{
            //   display: flex;
            padding:0px 30px 0 0;
            text-align: right;
              flex:1;
              flex-direction: row;
              justify-content: space-between;
              padding-right:30px;
               .active {
                       background: #0099FF;
                        color:white;
                          position: relative;
                        }

          }
     
        
        }
             .category{
              width: 100%;
              overflow: hidden;
              position: relative;
             
              
              .Cgory{
                  width:100%;
                  background: 	#F0FFF0 ;
                   color:#00FA9A;
                  height:40px;
              .Cname{width: 40%;
                    height: 40px;
                    line-height:40px;
                    float:left;
                    margin-left:40px;
                    // text-align: center;
                    // padding-right: -20px;
                    }
              .Csort{
                   width:25%;
                  height: 40px;
                  line-height: 40px;
                  float:left;
                  text-align: center;

              }
              }
              .Cpart{
                  width:100%;
              .Cname{width: 40%;
                    height: 30px;
                    line-height:30px;
                    float:left;
                    font-size:14px;
                    margin-left:40px;
                    }
              .Csort{
                   width:25%;
                  height: 40px;
                  line-height: 40px;
                  float:left;
                  text-align: center;
              }
              }
          }
         
        .Citem{
           width:100%;
           height:250px;
           display: flex;
           .item{
               width:100%;
               height:250px;
               text-align: center;
               padding-top: 7%;
               flex: 1;
               flex-direction: row;
               justify-content: space-around;
               .son{
                 margin-top:20px;
               }
           }
        }
        .shop{
         width: 30%;
        }
    }
   
}

</style>
