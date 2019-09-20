<template>
  <div class="mine-register">
    <div class="head">
      <img src="../../../assets/img/icons/arr-l.png" @click="$router.go(-1)" />
    </div>
    <div class="main">
      <img src="../../../assets/img/main/logo.png" alt class="logo" />
      <form>
        <div class="flex flex-text">
          <input type="text" placeholder="请输入手机号" v-model.trim="user.username" @blur="doCheck" />
          <div class="test-box">获取验证码</div>
        </div>
        <div class="flex">
          <input type="text" placeholder="请输入验证码" v-model.trim="user.password" />
        </div>
      </form>
      <div class="register-btn" @click="register">注册</div>
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
  name: "mineregister",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      var zaowuUser = {
        zaowuUser: { ...this.user }
      };
      loginApi
        .doRegister(zaowuUser)
        .then(res => {
          if (res.code == "S") {
            Toast.success("注册成功！");
            this.$router.push({name:'login'})
          } else {
            Toast.fail("注册失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    doCheck() {
      loginApi
        .checkUserName(this.user.username)
        .then(res => {
          // console.log(res);
          if (res.code == "S") {
            Toast.success("用户名可用！");
          } else {
            Toast.fail("用户名不可用！");
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

.mine-register {
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
    .flex-text {
      input {
        width: 150px;
      }
      .test-box {
        width: 84px;
        height: 30px;
        background: #1c4b47;
        line-height: 30px;
      }
    }
    .register-btn {
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
  }
}
</style>