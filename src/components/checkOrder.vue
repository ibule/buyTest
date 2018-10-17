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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                       <el-form status-icon label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item  label="姓名" prop="name" >
                             <el-input style="width:500px"  v-model.trim="ruleForm.name"></el-input>
                                </el-form-item>       
                            <el-form-item  label="所属区域" prop="address" >
                            <v-distpicker @selected="areaChange" :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                </el-form-item>    
                            <el-form-item  label="地址" prop="address" >
                             <el-input style="width:500px"  v-model.trim="ruleForm.address"></el-input>
                                </el-form-item>    
                                 <el-form-item label="手机号码" prop="mobile">
                                 <el-input style="width:500px" v-model="ruleForm.mobile" ></el-input>
                                 </el-form-item>   
                                 
                                 <el-form-item label="邮箱" prop="email">
                                 <el-input  style="width:500px" v-model="ruleForm.email" ></el-input>
                                 </el-form-item>   
                                   
                                 <el-form-item label="邮编" prop="post_code">
                                 <el-input style="width:100px" v-model="ruleForm.post_code" ></el-input>
                                 </el-form-item>   
                        </el-form>
                        <!-- <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <dl class="form-group">
                                    <dt>收货人姓名：</dt>
                                    <dd>
                                        <input name="book_id" id="book_id" type="hidden" value="0">
                                        <input name="accept_name" id="accept_name" type="text" class="input" value="" datatype="s2-20" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人姓名</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>所属地区：</dt>
                                    <dd>
                                        <select id="province" name="province" class="select">
                                            <option value="">所属省份</option>
                                            <option value="北京市">北京市</option>
                                            <option value="天津市">天津市</option>
                                            <option value="河北省">河北省</option>
                                            <option value="山西省">山西省</option>
                                            <option value="内蒙古自治区">内蒙古自治区</option>
                                            <option value="辽宁省">辽宁省</option>
                                            <option value="吉林省">吉林省</option>
                                            <option value="黑龙江省">黑龙江省</option>
                                            <option value="上海市">上海市</option>
                                            <option value="江苏省">江苏省</option>
                                            <option value="浙江省">浙江省</option>
                                            <option value="安徽省">安徽省</option>
                                            <option value="福建省">福建省</option>
                                            <option value="江西省">江西省</option>
                                            <option value="山东省">山东省</option>
                                            <option value="河南省">河南省</option>
                                            <option value="湖北省">湖北省</option>
                                            <option value="湖南省">湖南省</option>
                                            <option value="广东省">广东省</option>
                                            <option value="广西壮族自治区">广西壮族自治区</option>
                                            <option value="海南省">海南省</option>
                                            <option value="重庆市">重庆市</option>
                                            <option value="四川省">四川省</option>
                                            <option value="贵州省">贵州省</option>
                                            <option value="云南省">云南省</option>
                                            <option value="西藏自治区">西藏自治区</option>
                                            <option value="陕西省">陕西省</option>
                                            <option value="甘肃省">甘肃省</option>
                                            <option value="青海省">青海省</option>
                                            <option value="宁夏回族自治区">宁夏回族自治区</option>
                                            <option value="新疆维吾尔自治区">新疆维吾尔自治区</option>
                                            <option value="香港特别行政区">香港特别行政区</option>
                                            <option value="澳门特别行政区">澳门特别行政区</option>
                                            <option value="台湾省">台湾省</option>
                                            <option value="其它">其它</option>
                                        </select>
                                        <select id="city" name="city" class="select">
                                            <option value="">所属城市</option>
                                        </select>
                                        <select id="area" name="area" class="select" datatype="*" sucmsg=" ">
                                            <option value="">所属地区</option>
                                        </select>
                                        <span class="Validform_checktip">*请选择您所在的地区</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>详细地址：</dt>
                                    <dd>
                                        <input name="address" id="address" type="text" class="input" value="" datatype="*2-100" sucmsg=" ">
                                        <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>手机号码：</dt>
                                    <dd>
                                        <input name="mobile" id="mobile" type="text" class="input" value="" datatype="m" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人的手机号码</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>联系电话：</dt>
                                    <dd>
                                        <input name="telphone" id="telphone" type="text" class="input" value="">
                                        <span class="Validform_checktip">收货人的联系电话，非必填</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>电子邮箱：</dt>
                                    <dd>
                                        <input name="email" id="email" type="text" class="input" value="">
                                        <span class="Validform_checktip">方便通知订单状态，非必填</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>邮政编码：</dt>
                                    <dd>
                                        <input name="post_code" id="post_code" type="txt" class="input code">
                                        <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                                    </dd>
                                </dl>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                 <ul class="item-box clearfix">
                                <li>
                                      <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                       <em>手续费：0.00元</em>
                                   
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                 
                                    <el-radio v-model="ruleForm.express_id" label="1">顺丰快递</el-radio>
                                       <em>费用：20.00元</em>
                                    <el-radio v-model="ruleForm.express_id" label="2">圆通快递</el-radio>
                                       <em>费用：12.00元</em>
                                    <el-radio v-model="ruleForm.express_id" label="3">韵达快递</el-radio>
                                       <em>费用：10.00元</em>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr>
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200046589514.jpg" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">小米（Mi）小米Note 16G双网通版</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥2299.00
                                            </span>
                                        </td>
                                        <td align="center">1</td>
                                        <td>
                                            <span class="red">
                                                ￥2299.00
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">2299.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">0.00</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">2299.00</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>


</div>
</template>

<script>
//引入省市联动插件
import VDistpicker from 'v-distpicker'
export default {
  name: "checkorder",
  data: function() {
    var validateMobile = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (reg.test(value) == false) {
          return callback(new Error("手机号码输入错误"));
        } else {
          callback();
        }
      }, 500);
    };
    var validateEmail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

      setTimeout(() => {
        if (reg.test(value) == false) {
          return callback(new Error("邮箱输入错误"));
        } else {
          callback();
        }
      }, 500);
    };
    var validatePostcode = (rule, value, callback) => {
      let reg = /^[1-9]\d{5}(?!\d)$/;

      setTimeout(() => {
        if (reg.test(value) == false) {
          return callback(new Error("邮编输入错误"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      ruleForm: {
        name: "",
        address: "",
        mobile: "",
        email: "",
        post_code: "",
        area:{
           province:{
               code:"440000",
               value:"广东省"
           },
           city:{
               code:"440300",
               value:"深圳市"
           },
           area:{
               code:"440306",
               value:"宝安区"
           }
           
        },
        express_id:"1",
        payment_id:"6"
        
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 5 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 3, message: "地址大于3个字符", trigger: "change" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validateMobile, trigger: "change" }
        ],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostcode, trigger: "change" }]
      }
    };
  },
  components: { VDistpicker },
  methods: {
    areaChange(data) {
      this.ruleForm.area=data;  
    }
  }
};
</script>
<style>
</style>
