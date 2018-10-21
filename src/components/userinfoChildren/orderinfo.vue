<template>
    <div>
        <div class="bg-wrap" style="min-height: 765px;">
            <div class="sub-tit">
                <a href="javascript:void(0)" class="add" @click="back">
                    <i  class="iconfont icon-reply"></i>返回</a>
                <ul>
                    <li class="selected">
                        <a href="javascript:;">查看订单</a>
                    </li>
                </ul>
            </div>
            <div class="order-progress">
                <ul>
                    <li class="first " :class="orderinfo.status>=1?'active':''">
                        <div class="progress">下单</div>
                        <div class="info">{{orderinfo.add_time|beautifyTimePro("MM月DD日 HH时mm分ss秒")}}</div>
                    </li>
                    <li :class="orderinfo.status>=2?'active':''">
                        <div class="progress" >已付款</div>
                        <div class="info">{{orderinfo.payment_time|beautifyTimePro("MM月DD日 HH时mm分ss秒")}}</div>
                    </li>
                    <li :class="orderinfo.status>=3?'active':''">
                        <div class="progress">已经发货</div>
                        <div class="info">{{orderinfo.express_time|beautifyTimePro("MM月DD日 HH时mm分ss秒")}}</div>
                    </li>
                    <li class="last" :class="orderinfo.status>=4?'active':''">
                        <div class="progress">已完成</div>
                        <div class="info">{{orderinfo.complete_time|beautifyTimePro("MM月DD日 HH时mm分ss秒")}}</div>
                    </li>
                </ul>
            </div>
            <div class="form-box accept-box form-box1">
                <dl class="head form-group">
                    <dd>
                        订单号：{{orderinfo.order_no}}

                        <router-link v-show="orderinfo.status==1" :to="'/payOrder/'+orderinfo.id" class="btn-pay">去付款</router-link>
                        <a  @click="changeStatus" v-show="orderinfo.status==2||orderinfo.status==3" href="#">去签收</a>
                        <!---->
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt>订单状态：</dt>
                    <dd>
                        {{orderinfo.statusName}}
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt>快递单号：</dt>
                    <dd>
                        {{orderinfo.express_no}}
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt>支付方式：</dt>
                    <dd>{{orderinfo.paymentTitle}}</dd>
                </dl>
            </div>
            <div class="table-wrap">
                <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                    <tbody>
                        <tr>
                            <th align="left">商品信息</th>
                            <th width="60%">名称</th>
                            <th width="10%">单价
                            </th>
                            <th width="10%">数量</th>
                            <th width="10%">金额</th>
                        </tr>
                        <tr v-for="(item, index) in goodslist" :key="item.id">
                            <td width="60">
                                <img :src="item.imgurl" class="img">
                            </td>
                            <td align="left">
                                <a target="_blank" href="/goods/show-92.html">{{item.goods_title}}</a>
                            </td>
                            <td align="center">
                                <s>{{item.goods_price}}</s>
                                <p>￥{{item.goods_price}}</p>
                            </td>
                            <td align="center">1</td>
                            <td align="center">￥7200</td>
                        </tr>
                        <tr>
                            <td colspan="7" align="right">
                                <p>商品金额：
                                    <b class="red">￥7200</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                    <b class="red">￥20</b>
                                </p>
                                <p style="font-size: 22px;">应付总金额：
                                    <b class="red">￥7220</b>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="form-box accept-box">
                <dl class="head form-group">
                    <dd>收货信息</dd>
                </dl>
                <dl class="form-group">
                    <dt>顾客姓名：</dt>
                    <dd>ivanyb1212</dd>
                </dl>
                <dl class="form-group">
                    <dt>送货地址：</dt>
                    <dd>江西省,萍乡市,安源区 sdfsdf </dd>
                </dl>
                <dl class="form-group">
                    <dt>联系电话：</dt>
                    <dd>13987766472 </dd>
                </dl>
                <dl class="form-group">
                    <dt>电子邮箱：</dt>
                    <dd> </dd>
                </dl>
                <dl class="form-group">
                    <dt>备注留言：</dt>
                    <dd></dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "orderinfo",
        data(){
            return{
                orderid:0,
                goodslist:[],
                orderinfo:{},
               
            }
        },
        methods:{
            getorderinfo(){
                this.$axios.get("site/validate/order/getorderdetial/"+this.orderid).then(response=>{
                    // console.dir(response);
                    this.goodslist=response.data.message.goodslist;
                    this.orderinfo=response.data.message.orderinfo;
                    // console.log(this.orderinfo);
                    
                    // this.status=response.data.status;
                    // console.log(this.status);
                    
                })
            },
            changeStatus(){
                this.$axios.get("site/validate/order/complate/"+this.orderinfo.id).then(
                    response=>{
                        console.log(response);
                        if(response.data.status==0){
                            this.$message.success(response.data.message);
                            this.getorderinfo();
                        }else{
                             this.$message.error(response.data.message);
                        }
                    }
                )
            },
            back(){
                this.$router.go(-1);
            }
        },
        created(){
            this.orderid=this.$route.params.orderid;
            this.getorderinfo();
        }
    };
</script>
<style>
</style>