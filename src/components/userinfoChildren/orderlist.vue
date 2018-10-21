<template>
    <div>
        <div class="bg-wrap" style="min-height: 765px;">
            <div class="sub-tit">
                <ul>
                    <li class="selected">
                        <a href="/user/order-list.html">交易订单</a>
                    </li>
                </ul>
            </div>
            <div class="table-wrap">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                    <tbody>
                        <tr>
                            <th width="16%" align="left">订单号</th>
                            <th width="10%">姓名</th>
                            <th width="12%">订单金额</th>
                            <th width="11%">下单时间</th>
                            <th width="10%">状态</th>
                            <th width="12%">操作</th>
                        </tr>
                        <tr v-for="(item, index) in orderlist" :key="item.id">
                            <td>{{item.order_no}}</td>
                            <td align="left">{{item.accept_name}}</td>
                            <td align="left">
                                <strong style="color: red;">￥{{item.order_amount}}</strong>
                                <br> {{item.paymentTitle}}
                            </td>
                            <td align="left">{{item.payment_time|beautifyTimePro("MM月DD日 HH时mm分ss秒")}}</td>
                            <td align="left">
                                {{item.statusName}}
                            </td>
                            <td align="left">
                                <router-link :to="'/userinfo/orderinfo/'+item.id">查看订单</router-link>
                                <br>
                                <router-link :to="'/payOrder/'+item.id" v-show="item.status==1" class="">去付款</router-link>
                                <br>
                                <!-- <a href="javascript:void(0)">|取消</a> -->
                                <br>
                            </td>
                        </tr>
                    </tbody>
                </table>
                 <el-pagination
                      @size-change="SizeChange"
                      @current-change="CurrentChange"
                      :current-page="pageIndex"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalnum">
                    </el-pagination>
                <div class="page-foot">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "orderlist",
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalnum: 0,
      orderlist: []
    };
  },
  methods: {
    getorderlist() {
      this.$axios
        .get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
        .then(response => {
            // console.table(response);
          this.totalnum = response.data.totalcount;
          this.orderlist = response.data.message;
        });
    },
    SizeChange(val) {
        //  console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getorderlist();
    },
    CurrentChange(val) {
        //   console.log(`当前页: ${val}`);
      this.pageIndex = val
      this.getorderlist();
    }
  },
  created() {
    this.getorderlist();
  }
};
</script>
<style>
</style>