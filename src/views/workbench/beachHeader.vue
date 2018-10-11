<template>
<div class="homeTotal">
    <div class="item">
        <div class="total" v-for="item in list">
        <div class="Ltype"><img :src="item.image"></div>
         <div class="Rtype">{{order_sales}}</div>
         </div>
         <div class="amount">今日销售额</div>
    </div>
     <div class="item">
          <div class="total" v-for="item in list">
        <div class="Ltype"><img :src="item.image3"></div>
         <div class="Rtype">{{order_count}}</div>
         </div>
          <div class="amount">今日订单数</div>
     </div>
      <div class="item">
           <div class="total" v-for="item in list">
        <div class="Ltype"><img :src="item.image1"></div>
         <div class="Rtype">{{order_goods}}</div>
         </div>
          <div class="amount">出售商品数</div>
      </div>
       <div class="item">
              <div class="total" v-for="item in list">
        <div class="Ltype"><img :src="item.image2"></div>
         <div class="Rtype">{{order_customer}}</div>
         </div>
          <div class="amount">&nbsp;&nbsp;&nbsp;&nbsp;总顾客数</div>
      </div>
       </div>

</div>
</template>

<script>
import img1 from '@/assets/images/icons/u657.png'
import img2 from '@/assets/images/icons/u656.png'
import img3 from '@/assets/images/icons/u658.png'
import img4 from '@/assets/images/icons/u659.png'
export default {
 data() {
     return{
           list:[
          {
              image:img4,
              image1:img1,
              image2:img2,
              image3:img3
          }
        ],
     }
 },
 props:['order_count','order_customer','order_goods','order_sales']
}
</script>

<style lang="scss" scoped>
.homeTotal{
    width:90%;
    margin: 0 auto;
    display: flex;
    .item{
        width:22%;
        background:#33CC33;
        height:120px;
        flex:1;
        flex-direction: row;
        justify-content: space-around;
        margin-left:2%;
        margin-bottom: 2%;
        margin-top:20px;
        overflow: hidden;
        position: relative;
        .total{
             margin:0 auto;
             width: 100%;
             overflow: hidden;
        .Ltype{
            width: 30%;
            padding-top: 30px;
            font-size: 26px;
            float:left;
            text-align: center;
            color:white;
        }
        .Rtype{
            width: 30%;
             padding-top: 40px;
            font-size: 26px;
            float:right;
            text-align: center;
            color:white;
        }
        }
        .amount{
            float:right;
            width: 40%;
            text-align: center;
            padding-top:2%;
            color: white;
            font-size: 15px;

        }
    }
      .item:nth-child(2){
       background:gold;
      } 
      .item:nth-child(3){
       background:#0099ff;
      } 
      .item:nth-child(4){
       background:#9933ff;
      } 
}

</style>
