import Vue from 'vue'
import App from './App.vue'
//导入路由相关
import VueRouter from "vue-router";
Vue.use(VueRouter);


//导入vuex组件
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    shopCarData:JSON.parse(window.localStorage.getItem('carData'))||{},
   checkLoginState:false,
  },
  mutations: {
   addCart(state,opt){
     if(state.shopCarData[opt.id]==undefined){
      //  ID不存在,添加并设置
      // console.log(state.shopCarData[opt.id]);
      Vue.set(state.shopCarData,opt.id,opt.buyCount);
     }else{
       state.shopCarData[opt.id]+=opt.buyCount;
     }
    //  window.localStorage.setItem('carData',JSON.stringify(state.shopCarData))
   },
   updateCount(state,opt){
     state.shopCarData[opt.id]=opt.newcount;
   },
   delGood(state,id){
    Vue.delete(state.shopCarData,id);
   },
   //筛选选中
   selectGood(state,opt){
     state.shopGoodSelect[opt.id]=opt.select;
   },



   //更新登录状态
   updateLogin(state,loginstate){
     state.checkLoginState=loginstate;
   }
  },
  getters:{
    carGoodCount(state){
      let totalCount=0;
      for(let key in state.shopCarData){
        totalCount+=state.shopCarData[key]
      }
      return totalCount;
    }
   
  }
})
//导入组件
import index from "./components/index.vue";
import detail from "./components/detail.vue"
import shopcar from "./components/shopcar.vue"
import checkOrder from "./components/checkOrder.vue"
import login from "./components/login.vue"
import payOrder from "./components/payOrder.vue"
import paySuccess from "./components/paySuccess.vue"
import "./assets/cavars.js"
//导入轮播图插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入axios
import axios from "axios";
Vue.prototype.$axios=axios;
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
//设置头部请求附带cookie
axios.defaults.withCredentials = true

//导入懒加载插件
import VueLazyload from 'vue-lazyload';

//导入分页插件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//导入放大镜组件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

//导入二维码插件
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/statics/images/error.png'),
  loading: require('./assets/statics/images/loading.gif'),
  attempt: 1
})
Vue.config.productionTip = false
//写规则
const routes=[
  {
    path:"/",
    component:index,
    meta:{
      titleName:"首页"
    }


  },
  {
    path:"/index",
    component:index,
    meta:{
      titleName:"首页"
    }

  },
  {
    path:'/detail/:id',
    component:detail,
    meta:{
      titleName:"产品详情页"
    }

  },
  {
    path:'/shopcar',
    component:shopcar,
    meta:{
      titleName:"购物车"
    }

  },
  {
    path:'/checkOrder/:ids',
    component:checkOrder,
    meta:{
      titleName:"订单详情页",
      checkLogin:true,
    }

  },
  {
    path:"/login",
    component:login,
    meta:{
      titleName:"登录页"
    }

  },
  {
    path:"/payOrder/:orderid",
    component:payOrder,
    meta:{
      titleName:"支付页",
      checkLogin:true,
    }
  },
  {
    path:"/paySuccess",
    component:paySuccess,
    meta:{
      titleName:"支付页成功",
      checkLogin:true,
    }
  }
]
//实例化路由对象
const router=new VueRouter({
  routes
})

//设置路由守卫
router.beforeEach((to,from,next)=>{
//  console.log(to);
//  console.log(from);
window.document.title=to.meta.titleName;
if(to.meta.checkLogin==true){
  axios.get("site/account/islogin").then(
   response=>{
    // console.log(response);
    if(response.data.code=="nologin"){
      Vue.prototype.$message.warning("请先登录哈");
      router.push("/login");
    }else{
      next();
    }
   }
    
  )
}else{
  next();
}
 
 
  
  })

  router.afterEach((to,from)=>{
    window.scroll(0,0)
  })
//全局过滤器
import moment from "moment";
Vue.filter('capitalize', function (value) {
  return moment(value).format("YYYY年MM月DD天");
})
Vue.filter("beautifyTimePro",function(value,str){
  return moment(value).format(str);
})


new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    
  },
}).$mount('#app')

// 浏览器关闭事件
window.onbeforeunload=function(){
  window.localStorage.setItem("carData",JSON.stringify(store.state.shopCarData));  
}
