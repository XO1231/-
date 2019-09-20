<template>
  <div class="car-main">
    <!-- 自定义组件 -->
    <BaseLayer>
      <!-- 头部插槽 -->
      <template v-slot:header>
        <!-- 头部 -->
        <div class="nav">
          <!-- 返回 -->
          <img src="../../../assets/img/icons/arr-l.png" class="go-back" @click="$router.go(-1)" />
          <!-- 标题 -->
          <p class="nav-title">购物车</p>
          <p class="nav-r" @click="isExit=!isExit">编辑</p>
        </div>
      </template>
      <!-- 默认插槽 就是内容区域 -->
      <!-- 主体插槽 -->
      <template v-slot:default>
        <div class="main">
          <div class="box">
            <p v-show="!carList.length">购物车空空如也~</p>
          </div>
          <div class="main-good" v-for="(item,index) in carList" :key="index">
            <van-checkbox v-model="item.checked"></van-checkbox>
            <img :src="item.img1" alt />
            <div class="good-items">
              <p class="good-make">{{item.name}}</p>
              <p class="good-describe">{{item.desc}}</p>
              <p class="good-price">¥{{item.priceNow}}</p>
            </div>
            <van-stepper v-model="item.carCount" min="0" :max="item.totalNum" />
          </div>
        </div>
      </template>
    </BaseLayer>
    <div class="foot">
      <van-submit-bar :price="totalPrice" :button-text="submitText" @submit="onSubmit">
        <van-checkbox v-model="checkedAll" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
//引入组件 注册组件
import orderApi from "@/api/zaowu/order";
import addressApi from "@/api/zaowu/address";
import BaseLayer from "@/components/BaseLayer";
import "vant/lib/toast/style";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "car",
  components: {
    BaseLayer
  },
  data() {
    return {
      isExit: false,
      carList: []
    };
  },
  mounted() {
    var car = JSON.parse(localStorage.getItem("carList"));
    if (car) {
      this.carList = car;
    }
    // console.log(this.carList);
  },
  computed: {
    submitText() {
      return this.isExit == false ? "立即购买" : "删除";
    },
    totalPrice() {
      return this.carList.reduce(function(pre, next) {
        if (next.checked) {
          return pre + next.carCount * next.priceNow * 100;
        } else {
          return pre;
        }
      }, 0);
    },
    checkedAll: {
      get: function() {
        if (this.carList.length > 0) {
          return this.carList.every(ele => ele.checked == true);
        } else {
          return false;
        }
      },
      set: function() {}
    }
  },
  methods: {
    onSubmit() {
      if (this.carList.some(ele => ele.checked == true)) {
        if (this.isExit == true) {
          this.carList = this.carList.filter(ele => {
            return ele.checked == false;
          });
          localStorage.setItem("carList", JSON.stringify(this.carList));
        } else {
          var list = this.carList.filter(ele => {
              return ele.checked == true;
            }),
            userId = JSON.parse(localStorage.getItem("userId"));
          addressApi
            .getList({ userId })
            .then(({ data }) => {
              // console.log(data);
              var obj = data.filter(el => {
                return el.userId == 1;
              });
              list.map(el => {
                orderApi
                  .saveOrder({
                    userId,
                    goodsId: el.id,
                    color: el.color,
                    size: el.size,
                    addressId: obj.id,
                    count: el.carCount
                  })
                  .then(res => {
                    if (res.code != "success") {
                      Toast.fail("加入订单失败！");
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
              this.carList = this.carList.filter(ele => {
                return ele.checked == false;
              });
              localStorage.setItem("carList", JSON.stringify(this.carList));
              this.$router.push({ name: "orderForm" }); //跳转确认订单
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    checkAll() {
      if (this.carList.some(ele => ele.checked == false)) {
        this.carList.forEach(ele => (ele.checked = true));
      } else {
        this.carList.forEach(ele => (ele.checked = false));
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/common/common.scss";

.car-main {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background: #f4f4f4;

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
    }
    .nav-r {
      font-family: PingFangSC-Light;
      font-size: 16px;
      color: #010e0d;
    }
  }
  .main {
    margin-top: 48px;
    box-sizing: border-box;
    padding-bottom: 130px;
    height: 100%;
    width: 100%;
    .box {
      height: 0.5px;
      width: 100%;
      p {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #000000;
        width: 100%;
        position: relative;
        top: 50px;
      }
    }
    .main-good {
      width: 333px;
      height: 114px;
      background: #ffffff;
      border-radius: 4px;
      margin: 20px auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      .van-checkbox {
        margin: 0 8px;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
      }
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
      .van-stepper {
        position: absolute;
        right: 14px;
        bottom: 17.5px;
      }
    }
  }
  .foot {
    position: fixed;
    width: 100%;
    height: 80px;
    bottom: 0;
    background-color: #fff;
    .van-submit-bar {
      width: 90%;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      ::v-deep button {
        background-color: #1c4b47;
        border-radius: 4px;
        width: 113px;
        font-family: PingFangSC-Light;
        font-size: 15px;
        color: #ffffff;
        border-width: 0;
      }
      .van-checkbox {
        font-family: PingFangSC-Light;
        font-size: 18px;
        color: #010e0d;
      }
      .van-submit-bar__price {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #1c4b47;
      }
    }
  }
}
</style>