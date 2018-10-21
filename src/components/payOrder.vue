<template>
    <div>
      <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderMessage.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderMessage.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderMessage.area}}{{orderMessage.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderMessage.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderMessage.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderMessage.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                   <!-- <img src="../assets/statics/images/error.png" alt=""> -->
                                   <qriously :value="'site/validate/pay/alipay/'+orderMessage.id" :size="200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>
</template>
<script>
    export default{
        name:"payOrder",
        data:function(){
                 return{
                orderMessage:{},
                intervalId:0,
             orderId:0,
            }
        },
       methods:{
           getOrderInfo(){
               
            this.$axios.get("site/validate/order/getorder/"+this.orderId).then(
                response=>{         
                        this.orderMessage=response.data.message[0];
                       
                }
            );
           }
       },
        created(){
            this.orderId=this.$route.params.orderid;
            console.log(this.orderId);  
             this.getOrderInfo();
      //设置定时器 查询支付状态
    
      
     this.intervalId= setInterval(()=>{
           this.$axios.get("site/validate/order/getorder/"+this.orderId).then(
                response=>{         
                      console.log(response.data.message[0].status);
                        if(response.data.message[0].status==2){
                                //支付成功
                                this.$router.push('/paySuccess');
                        }

                }
            );
      },1000)
                
            },
  destroyed(){
                clearInterval(this.intervalId)
            }
        }
    
</script>
<style>
</style>

