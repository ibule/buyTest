<template>
  <div id="app">
    <!-- 头部 -->
    
    <div class="header">
        <!-- 1.0 导航栏头部 -->
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>黑马买买买</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <!-- 未登录 -->
                    <span v-show="$store.state.checkLoginState==false">
                  <router-link to="/login">登录</router-link>
                        <strong>|</strong>
                        <a href="" class="">注册</a>
                        <strong>|</strong>
                    </span>
                    <!-- 登录后显示 -->
                    <span v-show="$store.state.checkLoginState==true">
                        <a href="" class="">会员中心</a>
                        <strong>|</strong>
                        <a @click="logout">退出</a>
                        <strong>|</strong>
                    </span>
                        <router-link to="/shopcar">
                        <i ref="cart" class="iconfont icon-cart"></i>购物车
                        <span id="shoppingCartCount">
                            <span>{{$store.getters.carGoodCount}}</span>
                        </span>
                        </router-link>
                       
                </div>
            </div>
        </div>

        <!-- 2.0 导航条 -->
        <div class="head-nav">
            <div class="section">
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                           <router-link to="/index">
                               <span class="out" style="top: 0px;">首页</span>
                           </router-link>
                        </li>
                        <li class="news">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </a>
                        </li>
                        <li class="photo">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </a>
                        </li>
                        <li class="video">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">黑马超市</span>
                            </a>
                        </li>
                        <li class="down">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </a>
                        </li>
                        <li class="goods">
                            <a href="" class="router-link-exact-active ">
                                <span class="out" style="top: 0px;">购物商城</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
        </div>
         
    </div>
    <router-view></router-view>
    <!-- 尾部 -->
    <div class="footer">
                <div class="section">
                    <div class="foot-nav">
                        <a href="">关于我们</a>
                        <strong>|</strong>
                        <a href="">联系我们</a>
                        <strong>|</strong>
                        <a href="">联系客服</a>
                        <strong>|</strong>
                        <a href="">合作招商</a>
                        <strong>|</strong>
                        <a href="">商家帮助</a>
                        <strong>|</strong>
                        <a href="">营销中心</a>
                        <strong>|</strong>
                        <a href="">隐私政策</a>
                    </div>
                    <div class="foot-box">
                        <div class="copyright">
                            <p>版权所有 黑马买买买 </p>
                            <p>公司地址： 联系电话：</p>
                            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                        </div>
                        <div class="service">
                            <p>周一至周日 9:00-24:00</p>
                            <a href="#">
                                <i class="iconfont icon-phone"></i>在线客服</a>
                        </div>
                    </div>
                </div>
            </div>
  
   <BackTop :bottom="50">
        <div class="top">🎈</div>
    </BackTop>
  </div>
   
</template>
<script>
import $ from "jquery";
export default {
  name: 'app',
  components: {
   
  },
  methods:{
checknum(){
    console.log(this.$store.state.count);
    this.$store.commit('increment');
},
 logout(){
      this.$axios.get("site/account/logout").then(response=>{
          console.log(response);
               this.$confirm('你确定要离开我吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功,欢迎下次回来'
          });
          this.$router.push("/index");
          this.$store.commit('updateLogin',false)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      })
  }
  },
created() {
    // console.log('顶级Vue示例的生命周期函数');
  this.$axios.get('site/account/islogin').then(response => {
      console.log(response);
      if (response.data.code == 'logined') {
        // 登录了
        console.log("我登陆了");
        
       this.$store.commit('updateLogin', true);
      } else {
        // 没有登录
    this.$store.commit('updateLogin', false);
      }
    })
  },
beforeMount() {
      
  },
  mounted(){
      $("#menu2 li a").wrapInner( '<span class="out"></span>' );
	$("#menu2 li a").each(function() {
		$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
	});

	$("#menu2 li a").hover(function() {
		$(".out",	this).stop().animate({'top':	'48px'},	300); // move down - hide
		$(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

	}, function() {
		$(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
		$(".over",	this).stop().animate({'top':	'-48px'},	300); // move up - hide
	});

  },
 
  
}
</script>

<style>
/* 导入样式 */
@import url("./assets/statics/site/css/style.css");
.menuhd ul li a span.over{
    background-color: yellowgreen;
}
.top{
        padding: 10px;
        /* background: rgba(0, 153, 229, .7); */
        color: #fff;
        text-align: center;
        border: 1px solid blue;
        border-radius: 50%;
        font-size: 50px;
    }
</style>
