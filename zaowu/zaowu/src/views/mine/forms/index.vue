<template>
  <div class="forms-main">
    <!-- 自定义组件 -->
    <BaseLayer ref="BScroll">
      <!-- 头部插槽 -->
      <template v-slot:header>
        <!-- 头部 -->
        <div class="nav">
          <!-- 返回 -->
          <img src="../../../assets/img/icons/arr-l.png" class="go-back" @click="$router.go(-1)" />
          <!-- 标题 -->
          <p class="nav-title">我的订单</p>
          <!-- 搜索与购物车 -->
          <img src="../../../assets/img/icons/search.png" @click="goSearch" />
        </div>
        <!-- 订单导航 -->
        <div class="forms-nav">
          <div class="form-item" :class="{active:current==0}" @click="goSlide(0)">全部</div>
          <div class="form-item" :class="{active:current==1}" @click="goSlide(1)">待付款</div>
          <div class="form-item" :class="{active:current==2}" @click="goSlide(2)">待收货</div>
          <div class="form-item" :class="{active:current==3}" @click="goSlide(3)">已完成</div>
        </div>
      </template>
      <!-- 默认插槽 就是内容区域 -->
      <!-- 主体插槽 -->
      <template v-slot:default>
        <div class="main">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <!-- 全部订单 -->
            <swiper-slide>
              <div class="goods-item" v-for="good in goods" :key="good.id">
                <div class="goods-head">
                  <p class="form-num">订单编号{{good.goodsSku}}</p>
                  <div class="goods-status">{{good.orderStatus|status}}</div>
                </div>
                <div class="goods-main">
                  <img :src="good.img1" alt />
                  <div class="main-items">
                    <p>
                      <span>{{good.name}}</span>
                      <span>¥ {{good.price}}</span>
                    </p>
                    <p>
                      <span>{{good.desc}}</span>
                      <span>x {{good.count}}</span>
                    </p>
                  </div>
                </div>
                <div class="goods-totle">
                  <p>
                    合计：
                    <span>¥ {{good.count*good.price}}</span>
                  </p>
                </div>
                <div class="goods-btns">
                  <div class="good-btn btn-l" @click="doBtnl(good)">{{good.orderStatus|btnL}}</div>
                  <div class="good-btn btn-r" @click="doBtnr(good)">{{good.orderStatus|btnR}}</div>
                </div>
              </div>
              <div class="box" v-show="!goods.length">
                <p>暂无数据~</p>
              </div>
            </swiper-slide>
            <!-- 待付款 -->
            <swiper-slide>
              <div class="goods-item" v-for="good in payGoods" :key="good.id">
                <div class="goods-head">
                  <p class="form-num">订单编号{{good.goodsSku}}</p>
                  <div class="goods-status">{{good.orderStatus|status}}</div>
                </div>
                <div class="goods-main">
                  <img :src="good.img1" alt />
                  <div class="main-items">
                    <p>
                      <span>{{good.name}}</span>
                      <span>¥ {{good.price}}</span>
                    </p>
                    <p>
                      <span>{{good.desc}}</span>
                      <span>x {{good.count}}</span>
                    </p>
                  </div>
                </div>
                <div class="goods-totle">
                  <p>
                    合计：
                    <span>¥ {{good.count*good.price}}</span>
                  </p>
                </div>
                <div class="goods-btns">
                  <div class="good-btn btn-l" @click="doBtnl(good)">{{good.orderStatus|btnL}}</div>
                  <div class="good-btn btn-r" @click="doBtnr(good)">{{good.orderStatus|btnR}}</div>
                </div>
              </div>
              <div class="box" v-show="!payGoods.length">
                <p>暂无数据~</p>
              </div>
            </swiper-slide>
            <!-- 待收货 -->
            <swiper-slide>
              <div class="goods-item" v-for="good in acceptGoods" :key="good.id">
                <div class="goods-head">
                  <p class="form-num">订单编号{{good.goodsSku}}</p>
                  <div class="goods-status">{{good.orderStatus|status}}</div>
                </div>
                <div class="goods-main">
                  <img :src="good.img1" alt />
                  <div class="main-items">
                    <p>
                      <span>{{good.name}}</span>
                      <span>¥ {{good.price}}</span>
                    </p>
                    <p>
                      <span>{{good.desc}}</span>
                      <span>x {{good.count}}</span>
                    </p>
                  </div>
                </div>
                <div class="goods-totle">
                  <p>
                    合计：
                    <span>¥ {{good.count*good.price}}</span>
                  </p>
                </div>
                <div class="goods-btns">
                  <div class="good-btn btn-l">{{good.orderStatus|btnL}}</div>
                  <div class="good-btn btn-r">{{good.orderStatus|btnR}}</div>
                </div>
              </div>
              <div class="box" v-show="!acceptGoods.length">
                <p>暂无数据~</p>
              </div>
            </swiper-slide>
            <!-- 已完成 -->
            <swiper-slide>
              <div class="goods-item" v-for="good in doneGoods" :key="good.id">
                <div class="goods-head">
                  <p class="form-num">订单编号{{good.goodsSku}}</p>
                  <div class="goods-status">{{good.orderStatus|status}}</div>
                </div>
                <div class="goods-main">
                  <img :src="good.img1" alt />
                  <div class="main-items">
                    <p>
                      <span>{{good.name}}</span>
                      <span>¥ {{good.price}}</span>
                    </p>
                    <p>
                      <span>{{good.desc}}</span>
                      <span>x {{good.count}}</span>
                    </p>
                  </div>
                </div>
                <div class="goods-totle">
                  <p>
                    合计：
                    <span>¥ {{good.count*good.price}}</span>
                  </p>
                </div>
                <div class="goods-btns">
                  <div class="good-btn btn-l">{{good.orderStatus|btnL}}</div>
                  <div class="good-btn btn-r">{{good.orderStatus|btnR}}</div>
                </div>
              </div>
              <div class="box" v-show="!doneGoods.length">
                <p>暂无数据~</p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </template>
    </BaseLayer>
  </div>
</template>
<script>
//引入组件 注册组件
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import BaseLayer from "@/components/BaseLayer";
import orderApi from "@/api/zaowu/order";
import "vant/lib/toast/style";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "kindDetails",
  components: {
    BaseLayer,
    swiper,
    swiperSlide
  },
  data() {
    let that = this;
    return {
      goods: [],
      current: 0,
      swiperOption: {
        centeredSlides: true,
        spaceBetween: 30,
        on: {
          slideChangeTransitionStart: function() {
            // 当前slide下标赋值给导航
            that.current = this.activeIndex;
          }
        }
      }
    };
  },
  filters: {
    status(v) {
      if (v == "0") {
        return "待付款";
      } else if (v == "1") {
        return "已发货";
      } else if (v == "2") {
        return "已收货";
      }
    },
    btnL(v) {
      if (v == "0") {
        return "取消订单";
      } else if (v == "1") {
        return "查看物流";
      } else if (v == "2") {
        return "申请售后";
      }
    },
    btnR(v) {
      if (v == "0") {
        return "付款";
      } else if (v == "1") {
        return "确认收货";
      } else if (v == "2") {
        return "评价";
      }
    }
  },
  mounted() {
    var i = this.$route.params.current;
    if (i) {
      this.current = i;
      this.$refs.mySwiper.swiper.slideTo(i);
    }
    this.getList();
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "search" }); //跳转搜索页
    },
    goPopup() {
      this.$router.push({ name: "popup" }); //跳转弹窗页
    },
    goSlide(i) {
      this.$refs.mySwiper.swiper.slideTo(i, 400);
      this.current = i;
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
          this.goods = res.data.list.filter(el => {
            return el.orderStatus != "9";
          });
          this.$nextTick(() => {
            this.$refs.BScroll.$BScroll.refresh();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    doBtnl(v) {
      console.log(v);
      if (v.orderStatus == "0") {
        orderApi
          .cancelOrder({ id: v.id })
          .then(res => {
            // console.log(res);
            if (res.code == "success") {
              Toast.success("取消成功！");
              this.getList();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    doBtnr(v) {
      console.log(v);
      if (v.orderStatus == "0") {
        orderApi
          .payDone({ id: v.id })
          .then(res => {
            // console.log(res);
            if (res.code == "success") {
              Toast.success("付款成功！");
              this.getList();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  computed: {
    payGoods() {
      return this.goods.filter(el => el.orderStatus == "0");
    },
    acceptGoods() {
      return this.goods.filter(el => el.orderStatus == "1");
    },
    doneGoods() {
      return this.goods.filter(el => el.orderStatus == "2");
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/common/common.scss";

.forms-main {
  height: 100%;
  width: 100%;
  overflow-x: hidden;

  .nav {
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
      left: -8px;
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
    img {
      width: 22px;
      height: 22px;
    }
  }
  .forms-nav {
    padding: $basePadding;
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9f9f9;

    .form-item {
      height: 22px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #151515;
      transition: all 0.4s ease;
    }
    .active {
      color: #1c4b47;
    }
  }
  .main {
    width: 100%;
    height: 100%;
    margin-top: 90px;
    box-sizing: border-box;
    background: #f4f4f4;
    padding: $basePadding;
    padding-bottom: 120px;
    .swiper-slide {
      overflow: hidden;
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
      .goods-item {
        margin-top: 16px;
        width: 100%;
        height: 186px;
        background-color: #fff;
        text-align: left;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #494949;
        position: relative;
        .goods-head {
          padding: 10.5px 9px;
          box-sizing: border-box;
          width: 100%;
          height: 41px;
          position: relative;
          .goods-status {
            font-family: PingFangSC-Medium;
            color: #034c46;
            position: absolute;
            top: 10.5px;
            right: 9px;
            background-color: #fff;
            padding-left: 5px;
          }
        }
        .goods-main {
          padding: 0 9px;
          box-sizing: border-box;
          width: 100%;
          height: 76px;
          display: flex;
          justify-content: space-between;
          img {
            width: 76px;
            height: 76px;
          }
          .main-items {
            width: 230px;
            height: 100%;
            p {
              display: flex;
              justify-content: space-between;
              span {
                margin-bottom: 5px;
              }
            }
          }
        }
        .goods-totle {
          width: 100%;
          text-align: right;
          span {
            font-family: PingFangSC-Medium;
            color: #034c46;
            padding-right: 9px;
          }
        }
        .goods-btns {
          height: 30px;
          width: 167.5px;
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 13px;
          right: 9px;

          .good-btn {
            margin-left: 11.5px;
            border: 1px solid #999999;
            border-radius: 100px;
            width: 78px;
            height: 28px;
            line-height: 28px;
            text-align: center;
          }
          .btn-r {
            border: 1px solid #034c46;
            color: #034c46;
          }
        }
      }
    }
  }
}
</style>