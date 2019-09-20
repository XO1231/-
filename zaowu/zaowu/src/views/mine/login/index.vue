<template>
  <div class="mine-login">
    <div class="head">
      <img src="../../../assets/img/icons/arr-l.png" @click="$router.go(-1)" />
    </div>
    <div class="main">
      <img src="../../../assets/img/main/logo.png" alt class="logo" />
      <form>
        <div class="flex">
          <input
            type="text"
            placeholder="请输入账号或手机号"
            v-model.trim="user.username"
            autocomplete="username"
          />
        </div>
        <div class="flex">
          <input
            type="password"
            placeholder="请输入密码"
            v-model.trim="user.password"
            autocomplete="current-password"
          />
        </div>
      </form>
      <div class="login-btn" @click="login">登录</div>
      <div class="login-items">
        <p class="post" @click="$router.push({name:'register'})">注册账户</p>
        <p class="forget">忘记密码</p>
      </div>
      <div class="third">
        <div class="third-title">
          <div class="line"></div>
          <p>第三方登录</p>
          <div class="line"></div>
        </div>
        <div class="third-items">
          <img src="../../../assets/img/icons/qq.png" alt />
          <img src="../../../assets/img/icons/wx.png" alt />
          <img src="../../../assets/img/icons/wb.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginApi from "@/api/zaowu/login";
import "vant/lib/toast/style";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "mineLogin",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loginStaus:true
    };
  },
  methods: {
    login() {
      var zaowuUser = {
        zaowuUser: { ...this.user }
      };
      loginApi
        .doLogin(zaowuUser)
        .then(res => {
          console.log(res);
          if (res.code == "S") {
            Toast.success("登录成功！");
            localStorage.setItem("userId", JSON.stringify(res.userId));
            setTimeout(()=>{
              this.$router.push({ name: "mine" });
            },2000)
          } else {
            Toast.fail("注册失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common/common.scss";

.mine-login {
  width: 100%;
  height: 100%;
  text-align: left;
  .head {
    width: 100%;
    padding: $basePadding;
    box-sizing: border-box;
    height: 48px;
    position: relative;
    img {
      width: 30px;
      height: 30px;
      position: relative;
      left: -5px;
    }
  }
  .main {
    text-align: center;
    .logo {
      width: 151px;
      height: 151px;
      margin: 39px auto 41px;
    }
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 23px;
      input {
        border-width: 0;
        width: 239px;
        height: 25px;
        border-bottom: 1px solid #bdbdbd;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #000;
      }
    }
    .login-btn {
      width: 239px;
      height: 44px;
      margin: 0 auto;
      background: #1c4b47;
      border-radius: 4px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #ffffff;
      line-height: 44px;
    }
    .login-items {
      width: 239px;
      height: 18px;
      margin: 16.5px auto;
      display: flex;
      justify-content: space-between;
      p {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #494949;
      }
    }
    .third {
      height: 70.5px;
      width: 239px;
      margin: 115.5px auto 0;
      .third-title {
        width: 100%;
        height: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .line {
          width: 77px;
          height: 1px;
          background-color: #bdbdbd;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #494949;
          height: 100%;
        }
      }
      .third-items {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
</style>