<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 没有数据时显示 -->
                                <tr v-show="goodList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-show="goodList!=0" v-for="(item, index) in goodList" :key="item.id">
                                    <td>
                                        <el-switch @click="carSelect(item.id,item.selected)"
                                            v-model="item.selected"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949">
                                            </el-switch>    
                                    </td>
                                    <td><img :src="item.img_url" alt="" style="width: 65px;"></td>
                                    <td>
                                        {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number v-model="item.buycount" @change="upDataBuyNum(item.id,$event)" :min="1"  label="描述文字"></el-input-number>
                                    </td>
                                    <td>
                                        {{item.sell_price*item.buycount}}</td>
                                    <td>
                                        <button   @click="delOne(item.id)" type="button" class="el-button el-button--danger is-circle"><i class="el-icon-delete"></i>
                                        </button>
                                        </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{countNum.subNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{countNum.subPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->

                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                          <router-link to="/index" >
                            <button class="button" >继续购物</button>
                          </router-link>
                            <router-link to="/checkOrder"  >
                                <button class="submit" >立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
  name: "shopcar",
  data: function() {
    return {
      goodList: [],
     
    };
  },
  methods: {
      //拼接id字符串
    getshopcargoods() {
      let ids = "";
      for (let key in this.$store.state.shopCarData) {
        ids += key;
        ids += ",";
      }
      //把处理后的字符串赋值给ids
      ids = ids.slice(0, -1);
      this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
        // let shopcarlist = response.data.message;
        this.goodList=response.data.message;
       //修改商品数量为正确的数值 添加一个选择对象到goodlist里 
        response.data.message.forEach(element => { 
          element.buycount = this.$store.state.shopCarData[element.id];
        //   element.selected = true;
          this.$set(element,"selected",true)
          
        });
        console.log(this.goodList);
        
        // this.goodList = shopcarlist;
     
      });
    },
    //因为数量是vuex里获取的，所以增加数量的时候要设置vuex里的数值 
    upDataBuyNum(id, newcount) {
      this.$store.commit("updateCount", {
        id,
        newcount
      });
    },
    delOne(delid){
 this.$confirm('确定删除此宝贝吗??', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.goodList.forEach((e,index)=>{
                if(e.id==delid){
                    this.goodList.splice(index,1);
                }
            })
            this.$store.commit("delGood",delid);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });



         
    },
   
  },
  computed:{
      countNum(){
       let subNum=0;
       let subPrice=0;
        this.goodList.forEach(element => {
            if(element.selected==true){
                subNum+=element.buycount;
                subPrice+=element.sell_price*element.buycount
            }
           
        });
         return {
             subNum,
             subPrice
             }
      },
      
  },
  created() {
    this.getshopcargoods();
  }
};
</script>

<style>
</style>