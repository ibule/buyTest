import Vue from 'vue'
import App from './App.vue'
//导入路由相关
import VueRouter from "vue-router";
//导入首页组件
import index from "./components/index.vue";
Vue.use(VueRouter);
//导入轮播图插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
//写规则
const routes=[
  {
    path:"/",
    component:index

  },
  {
    path:"/index",
    component:index
  }
]
//实例化路由对象
const router=new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
