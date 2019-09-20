<template>
  <div class="mine-main">
    <BaseLayer>
      <template v-slot:default>
        <div class="head">
          <img src="../../assets/img/main/logo.png" alt class="head-img" />
          <img
            src="../../assets/img/icons/setting.png"
            alt
            class="head-set"
            @click="$router.push({name:'set'})"
          />
          <div class="head-items" v-show="!loginStatus">
            <p @click="$router.push({name:'register'})">注册</p>
            <div class="line"></div>
            <p @click="$router.push({name:'login'})">登录</p>
          </div>
        </div>
        <div class="main">
          <div class="main-box">
            <van-cell title="我的订单" is-link url="#/mine/forms" />
            <div class="box-items">
              <div class="box-item" @click="$router.push({name:'forms',params:{current:1}})">
                <img src="../../assets/img/main/payment.png" alt />
                <p>待付款</p>
              </div>
              <div class="box-item" @click="$router.push({name:'forms',params:{current:2}})">
                <img src="../../assets/img/main/car.png" alt />
                <p>待收货</p>
              </div>
              <div class="box-item" @click="$router.push({name:'forms',params:{current:3}})">
                <img src="../../assets/img/main/done.png" alt />
                <p>已完成</p>
              </div>
              <div class="box-item">
                <img src="../../assets/img/main/after.png" alt />
                <p>售后</p>
              </div>
            </div>
          </div>
          <div class="main-box">
            <van-cell title="我的收藏" is-link url="/home" />
            <div class="box-items">
              <div class="box-item">
                <img src="../../assets/img/main/collect.png" alt />
                <p>物品</p>
              </div>
              <div class="box-item">
                <img src="../../assets/img/main/品牌.png" alt />
                <p>品牌</p>
              </div>
              <div class="box-item">
                <img src="../../assets/img/main/article.png" alt />
                <p>文章</p>
              </div>
            </div>
          </div>
          <img src="../../assets/img/main/position.png" class="item-icno item-icno-1" />
          <img src="../../assets/img/main/ticket.png" class="item-icno item-icno-2" />
          <img src="../../assets/img/main/account.png" class="item-icno item-icno-3" />
          <img src="../../assets/img/main/tel.png" class="item-icno item-icno-4" />
          <img src="../../assets/img/main/about.png" class="item-icno item-icno-5" />
          <van-cell title="收货地址" icon="shop-o" is-link url="#/mine/address" class="main-item" />
          <van-cell title="我的优惠券" icon="shop-o" is-link url="/home" class="main-item" />
          <van-cell title="账户安全" icon="shop-o" is-link url="/home" class="main-item" />
          <van-cell title="联系客服" icon="shop-o" is-link url="/home" class="main-item" />
          <van-cell title="关于造物" icon="info-o" is-link url="/home" class="main-item" />
        </div>
      </template>
    </BaseLayer>
  </div>
</template>

<script>
import BaseLayer from "@/components/BaseLayer";

export default {
  name: "Mine",
  components: {
    BaseLayer
  },
  data() {
    return {
      loginStatus: false
    };
  },
  created () {
    var userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      this.loginStatus=true;
    }
  }
};
</script>

<style lang="scss" scoped>
.mine-main {
  width: 100%;
  height: 100%;
  ::v-deep .header {
    height: 0;
  }
  .head {
    width: 100%;
    height: 192px;
    background: url("../../assets/img/main/bg.png") no-repeat;
    background-size: cover;
    position: relative;
    z-index: 99;
    .head-img {
      margin-top: 10px;
      width: 74px;
      height: 74px;
      border-radius: 50%;
    }
    .head-set {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
    }
    .head-items {
      width: 94px;
      height: 32.6px;
      background: #ffffff;
      display: flex;
      justify-content: space-evenly;
      margin: 18.5px auto;
      line-height: 32.6px;
      p {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #010e0d;
      }
      .line {
        width: 1px;
        height: 100%;
        background-color: #999999;
      }
    }
  }
  .main {
    width: 100%;
    background: #f5f5f5;
    text-align: left;
    padding-bottom: 46px;
    position: relative;
    .main-box {
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(233, 233, 233, 0.5);
      width: 336px;
      height: 119px;
      margin: 0 auto 9px;
      border-radius: 4px;
      position: relative;
      z-index: 100;
      top: -39px;
      .van-cell {
        font-family: PingFangSC-Regular;
        height: 40px;
        font-size: 16px;
        color: #010e0d;
        border-bottom: 1px solid #e5e5e5;
        span,
        i {
          position: relative;
          top: -3px;
        }
      }
      .box-items {
        width: 100%;
        height: 79px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .box-item {
          height: 48px;
          width: 42px;
          text-align: center;
          img {
            width: 32px;
            height: 32px;
          }
          p {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #494949;
          }
        }
      }
    }
    .main-item {
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      top: -39px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #494949;
      height: 53.5px;
      span,
      i {
        position: relative;
        top: 4px;
      }
      ::v-deep .van-cell__left-icon {
        width: 22px;
        height: 22px;
        margin-left: 8px;
      }
    }
    .item-icno {
      width: 22px;
      height: 22px;
      z-index: 9;
      background-color: #fff;
      position: absolute;
      left: 20px;
      top: 232px;
    }
    .item-icno-2 {
      top: 285.5px;
    }
    .item-icno-3 {
      top: 339px;
    }
    .item-icno-4 {
      top: 392.5px;
    }
    .item-icno-5 {
      top: 446px;
    }
  }
}
</style>