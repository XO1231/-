<template>
  <div class="order-form">
    <!-- 自定义组件 -->
    <BaseLayer ref="BScroll">
      <!-- 头部插槽 -->
      <template v-slot:header>
        <!-- 头部 -->
        <div class="nav">
          <!-- 返回 -->
          <img src="../../../assets/img/icons/arr-l.png" class="go-back" @click="$router.go(-1)" />
          <!-- 标题 -->
          <p class="nav-title">确认订单</p>
        </div>
      </template>
      <!-- 默认插槽 就是内容区域 -->
      <!-- 主体插槽 -->
      <template v-slot:default>
        <div class="main">
          <div class="main-item" @click="$router.push({name:'address',params:{status:1}})">
            <p>添加收货地址</p>
            <img src="../../../assets/img/icons/arr-r-1.png" alt />
          </div>
          <div class="main-good" v-for="good in car" :key="good.id">
            <div class="main-box">
              <img :src="good.img1" alt />
              <div class="good-items">
                <p class="good-make">{{good.brandId}}</p>
                <p class="good-describe">{{good.desc}}</p>
                <p class="good-price">¥{{good.price}}</p>
              </div>
              <p class="good-num">x {{good.count}}</p>
            </div>
          </div>
          <div class="box" v-show="!car.length">
            <p>订单空空如也~</p>
          </div>
          <div class="main-item">
            <p class="coupon">优惠券</p>
            <img src="../../../assets/img/icons/arr-r-1.png" alt />
          </div>
          <div class="main-line"></div>
          <div class="main-mark">
            <label for="mark">备注</label>
            <input type="text" id="mark" placeholder="选填" />
          </div>
          <div class="main-line"></div>
          <div class="main-price">
            <div class="price-item">
              <p>商品总额</p>
              <p>¥{{totalPrice}}</p>
            </div>
            <div class="price-item">
              <p>运费</p>
              <p>¥10.0</p>
            </div>
          </div>
          <div class="main-line"></div>
          <div class="main-price-totle">
            实付金额&#12288;¥
            <span class="priceTotle">{{totalPrice+10}}</span>
          </div>
          <div class="pay-types">
            <img src="../../../assets/img/icons/微信.png" alt class="pay-img wx-img" />
            <img src="../../../assets/img/icons/支付宝.png" alt class="pay-img zfb-img" />
            <van-radio-group v-model="payType">
              <van-cell-group>
                <van-cell
                  title="微信支付"
                  label="微信安全支付"
                  icon="wechat"
                  clickable
                  @click="payType = 'wx'"
                >
                  <van-radio slot="right-icon" name="wx" checked-color="#07c160" />
                </van-cell>
                <van-cell
                  title="支付宝支付"
                  label="支付宝安全支付"
                  clickable
                  icon="alipay"
                  @click="payType = 'zfb'"
                >
                  <van-radio slot="right-icon" name="zfb" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </div>
      </template>
    </BaseLayer>
    <div class="foot">
      <div class="payNow">
        <p @click="payNow">
          <span class="foot-text">立即支付¥</span>
          <span class="foot-price">{{totalPrice+10}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
//引入组件 注册组件
import BaseLayer from "@/components/BaseLayer";
import orderApi from "@/api/zaowu/order";
import "vant/lib/toast/style";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "orderForm",
  components: {
    BaseLayer
  },
  data() {
    return {
      car: [],
      payType: "wx",
      userId: ""
    };
  },
  created() {
    this.getList();
    this.getList();
  },
  computed: {
    totalPrice() {
      return this.car.reduce(function(pre, next) {
        return pre + next.count * next.price;
      }, 0);
    }
  },
  methods: {
    payNow() {
      if (this.car.length > 0) {
        this.car.map(ele => {
          orderApi
            .payDone({ id: ele.id })
            .then(res => {
              // console.log(res);
              if (res.code != "success") {
                Toast.fail("支付失败！");
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
        this.$router.push({
          name: "pay",
          params: { price: this.totalPrice + 10 }
        });
      }
    },
    getList() {
      this.userId = JSON.parse(localStorage.getItem("userId"));
      var data = {
        userId: this.userId,
        status: "0"
      };
      orderApi
        .getList(data)
        .then(res => {
          // console.log(res);
          this.car = res.data.list.filter(el => {
            return el.orderStatus == '0';
          });
          // this.car = res.data.list;
          this.$nextTick(() => {
            this.$refs.BScroll.$BScroll.refresh();
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/common/common.scss";

.order-form {
  height: 100%;
  width: 100%;
  overflow-x: hidden;

  .nav {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 48px;
    color: #000;
    background: #f9f9f9;
    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $basePadding;
    box-sizing: border-box;
    z-index: 2;
    .go-back {
      width: 30px;
      height: 30px;
      position: relative;
      left: -10px;
    }
    .nav-title {
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: #000000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .main {
    margin-top: 48px;
    box-sizing: border-box;
    padding: $basePadding;
    padding-bottom: 150px;
    width: 100%;
    .box {
      height: 100px;
      width: 100%;
      background-color: #fff;
      p {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #000000;
        width: 100%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .main-item {
      height: 30px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-family: PingFangSC-Light;
        font-size: 16px;
        color: #010e0d;
      }
      img {
        width: 20px;
        height: 20px;
      }
      .coupon {
        color: #494949;
      }
    }
    .main-good {
      width: 333px;
      height: 114px;
      background: #f9f9f9;
      border-radius: 4px;
      margin: 20px auto;
      .main-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 20px;
        img {
          width: 76px;
          height: 76px;
        }
        .good-items {
          width: 156px;
          height: 76px;
          margin-left: 14px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          font-family: PingFangSC-Light;
          font-size: 12px;
          color: #494949;
          text-align: left;
          .good-price {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #1c4b47;
          }
        }
        .good-num {
          position: absolute;
          right: 20px;
          bottom: 20px;
          font-family: PingFangSC-Light;
          font-size: 14px;
          color: #010e0d;
        }
      }
    }
    .main-line {
      width: 100%;
      height: 2px;
      background-color: #e5e5e5;
      opacity: 0.9;
      margin: 15px 0;
    }
    .main-mark {
      font-family: PingFangSC-Light;
      font-size: 16px;
      color: #494949;
      text-align: left;
      input {
        outline: none;
        border-width: 0;
        width: 85%;
      }
      input::-ms-input-placeholder {
        text-align: center;
      }
      input::-webkit-input-placeholder {
        text-align: center;
      }
    }
    .main-price {
      height: 49px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        p {
          font-family: PingFangSC-Light;
          font-size: 16px;
          color: #494949;
        }
      }
    }
    .main-price-totle {
      width: 100%;
      font-family: PingFangSC-Light;
      font-size: 16px;
      color: #000000;
      text-align: right;
      .priceTotle {
        font-family: PingFangSC-Medium;
        color: #1c4b47;
      }
    }
    .pay-types {
      width: 100%;
      height: 124px;
      background: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      margin-top: 60.5px;
      position: relative;
      .pay-img {
        width: 22px;
        height: 20px;
        position: absolute;
        z-index: 9;
      }
      .wx-img {
        top: 25px;
        left: 15px;
      }
      .zfb-img {
        left: 15px;
        top: 85px;
        background: #fff;
      }
      .van-radio-group {
        width: 100%;
        height: 100%;
        text-align: left;
      }
      ::v-deep .van-cell__left-icon {
        width: 22px;
        height: 22px;
        position: relative;
        top: 10px;
      }

      .pay-type {
        width: 100%;
        height: 50%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .foot {
    position: fixed;
    width: 100%;
    height: 80px;
    bottom: 0;
    background-color: #fff;
    z-index: 99;
    .payNow {
      width: 185px;
      height: 44px;
      background: #1c4b47;
      border: 1px solid #979797;
      border-radius: 4px;
      width: 90%;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #ffffff;
      line-height: 44px;
      p {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .foot-price {
          font-size: 24px;
        }
      }
    }
  }
}
</style>