<template>
    <div>
  <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
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
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                            <div class="info">
                                                <strong>订单已支付成功！</strong>  <span>还有{{num}}秒返回首页</span>
                                                <p>您可以点击这里进入
                                                  <router-link to="/userinfo">会员中心</router-link>
                                                    查看订单状态！</p>
                                                <p>如有其它问题，请立即与我们客服人员联系。</p>
                                            </div>
                                        </div>
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
        name:"paysuccess",
        data(){
            return{
                num:5,
                intervalId:0
            }
        },
        created(){
            this.intervalId=setInterval(()=>{
                this.num--;
                console.log(this.num);
                
                if(this.num==0){
                    this.$router.push('/index');
                }
            },1000)
        },
        destroyed(){
            clearInterval(this.intervalId);
        }
    }
</script>
<style>

</style>

