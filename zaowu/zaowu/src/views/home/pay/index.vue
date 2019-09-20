<template>
  <div class="home-pay">
    <div class="head">
      <img src="../../../assets/img/icons/arr-l.png" @click="$router.go(-1)" class="go-back" />
    </div>
    <div class="main">
      <img :src="img" class="main-img" />
      <p class="main-text">{{payText}}</p>
      <div class="btn my-forms" @click="goMyForms">{{btnText}}</div>
      <div class="btn go-home" @click="goHome">返回首页</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pay",
  data() {
    return {
      imgSuccess: require("../../../assets/img/icons/success.png"),
      imgFail: require("../../../assets/img/icons/fail.png"),
      isSuccess: true
    };
  },
  methods: {
    goHome(){
        this.$router.push({name:'home'})
    },
    goMyForms(){
      this.$router.push({name:'forms'})
    }  
  },
  created() {
    console.log(this.$route.params);
  },
  computed: {
    payText() {
      return this.isSuccess == true ? "恭喜您支付成功" : "抱歉您支付失败了";
    },
    img() {
      return this.isSuccess == true ? this.imgSuccess : this.imgFail;
    },
    btnText(){
      return this.isSuccess == true ? '查看我的订单' : '重新支付';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common/common.scss";

.home-pay {
  .head {
    text-align: left;
    width: 100%;
    padding: $basePadding;
    .go-back {
      width: 30px;
      height: 30px;
    }
  }
  .main {
    .main-img {
      width: 88px;
      height: 88px;
      margin: 126px auto 31.5px;
    }
    .main-text {
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: #494949;
      margin-bottom: 57px;
    }
    .btn {
      margin: 0 auto;
      width: 229px;
      height: 57px;
      line-height: 57px;
      font-family: PingFangSC-Medium;
      font-size: 20px;
    }
    .my-forms {
      background: #1c4b47;
      border-radius: 4px;
      width: 229px;
      height: 57px;
      margin-bottom: 21.5px;
      color: #ffffff;
    }
    .go-home {
      color: #494949;
    }
  }
}
</style>