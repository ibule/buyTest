<template>

    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                     <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                  
                                                </div> -->

                                                  <el-input-number v-model="num1"  :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button  class="buy">立即购买</button>
                                                <button @click="addCart" ref="cart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                               <Affix>
         <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="selectIndex=0"  :class="{selected:selectIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectIndex=1" :class="{selected:selectIndex==1}" >商品评论</a>
                                    </li>
                                </ul>
                            </div>
    </Affix>
                           
        <div class="tab-content entry" v-show="selectIndex==0" style="display: block;" v-html="goodsinfo.content">
                               
                            </div>
                            <div class="tab-content" v-show="selectIndex==1" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea @keyup.enter="submitComents" v-model.trim="commentTxt" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComents"  id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span  class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentlist" class="list-box">
                                        <p v-show="commentlist==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-show="commentlist!=0" v-for="(item, index) in commentlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.username}}</span>
                                                    <span>{{item.add_time|beautifyTimePro("YYYY/MM/DD HH:mm:ss")}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                       
                                            <Page @on-change="changePage" :current="pageIndex" @on-page-size-change="changePageSize" :total="totalcount" :page-size-opts=[10,30,50]  placement="top" show-elevator show-sizer />
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id" >
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id"> 
                                                <img :src="item.img_url">
                                        </router-link>
                                        </div>
                                        <div class="txt-box">
                                           <router-link :to="'/detail/'+item.id">
                                           {{item.title}}
                                           </router-link>
                                        
                                            <span>{{item.add_time|capitalize}}</span>
                                        </div>
                                    </li>
                                  
                                      
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
    <img class="fly-img" style="display:none" ref="cartimg" :src="imglist==0?'':imglist[0].original_path" alt="">
    
    
    </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "detail",
  data: function() {
    return {
      goodId: "",
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      num1: 1,
      selectIndex: 0,
      commentlist: [],
      pageIndex: 1,
      pageSize: 10,
      totalcount: 0,
      commentTxt: "",
      images: {
        normal_size: [
          {
            id: 1,
            url:
              "http://pic.qiantucdn.com/58pic/27/63/56/59dfd0b1c13cc_1024.jpg!qt324"
          },
          {
            id: 2,
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfsWq0W0SWVcO7qRH3icDFeKoyELaYraX02v4yP72kLTJiysi_g"
          }
        ]
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "yellow"
      },
      isFinsh:true,
    };
  },
  methods: {
    getGoodInfo() {
      this.num1 = 1;
      this.pageIndex = 1;
      this.images.normal_size = [];
      this.$axios
        .get("site/goods/getgoodsinfo/" + this.goodId)
        .then(response => {
          //   console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          let tem_normal_size = [];
          this.imglist.forEach(v => {
            tem_normal_size.push({
              id: v.id,
              url: v.thumb_path
            });
          });
          this.images.normal_size = tem_normal_size;
        });
    },
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
            this.pageIndex
          }&pageSize={this.pageSize`
        )
        .then(response => {
          this.commentlist = response.data.message;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
          this.totalcount = response.data.totalcount;
        });
    },
    changePage(pageNum) {
      this.pageIndex = pageNum;
      this.getComments();
    },
    changePageSize(pageSize) {
      // console.log(pageSize);

      this.pageSize = pageSize;
      this.getComments();
    },
    submitComents() {
      if (this.commentTxt == "") {
        this.$Message.warning("请输入内容,再提交");
        return;
      }
      this.$axios
        .post("site/validate/comment/post/goods/" + this.goodId, {
          commenttxt: this.commentTxt
        })
        .then(response => {
          // console.log(response.status);

          if (response.data.status == 0) {
            this.$Message.success(response.data.message);
            this.pageIndex = 1;
            this.getComments();
            this.commentTxt = "";
          }
          if (response.data.status == 1) {
            this.$Message.warning(response.data.message);
          }
        });
    },

    addCart() {
      
      if(this.isFinsh==false) return;
      this.isFinsh=false;
      $(this.$refs.cart).addClass('disabled');

      
let fromPos = $(this.$refs.cart).offset();
      let toPos = $(this.$parent.$refs.cart).offset();
      console.log(fromPos);
      $(this.$refs.cartimg).stop().show().css(fromPos).addClass("animate").animate(toPos, 1000, ()=>{  
            $(this.$refs.cartimg)
            .removeClass("animate")
            .hide();
            this.$store.commit("addCart", {
            id: this.goodId,
            buyCount: this.num1
          });  
          this.isFinsh=true;
           $(this.$refs.cart).removeClass('disabled');

    })
  }
},
  created() {
    this.goodId = this.$route.params.id;
    this.getGoodInfo();
    this.getComments();
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.goodId = to.params.id;
      this.getGoodInfo();
      this.getComments();
    }
  }
}
</script>

<style>
.pic-box {
  width: 300px;
}

.inline-zoomer-hahaha-zoomer-box {
  height: 300px;
}
.preview-box img {
  height: 250px;
}
.control-box {
  height: 50px;
}
.control {
  margin: 0 auto;
}
.control-box > div {
  float: left;
  height: 50px;
}
.control-box .thumb-list img {
  width: 50px;
  height: 50px;
  float: left;
}
.fly-img {
  width: 40px;
  height: 40px;
  position: absolute;
}
.fly-img.animate {
  transform: rotate(3400deg) scale(0.8, 0.8);
  opacity: 0;
  transition: transform 1s, opacity 2s;
}
.goods-spec .spec-box .btn-buy .add.disabled{
    cursor: not-allowed;
    background-color: gray;
}
</style>
