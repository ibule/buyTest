<template>
    <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName"  v-model="username" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit"  @click="login" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>


</div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$axios
        .post("site/account/login", {
          user_name: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response);
          if (response.data.status == 1) {
           this.$notify.error({
          title: '错误',
          message: response.data.message
        });
          }else{
              this.$notify({
          title: '成功',
         message: response.data.message,
          type: 'success'
        });
    this.$store.commit("updateLogin",true);
    //  this.$router.push('/index');
    //返回上一页
     this.$router.back();
          }
        });
    }
  }
};
</script>
<style>
</style>


