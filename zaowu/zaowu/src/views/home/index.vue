<template>
  <div class="home-main">
    <!-- 自定义组件 -->
    <BaseLayer>
      <!-- 头部插槽 -->
      <template v-slot:header>
        <!-- 头部 -->
        <div class="nav">
          <!-- 搜索 -->
          <img src="../../assets/img/icons/search.png" alt class="search-img" @click="goSearch" />
          <!-- 造物 -->
          <p class="nav-title">ZAOWU 造物</p>
          <!-- 弹窗与购物车 -->
          <div class="chat-cart">
            <img src="../../assets/img/icons/chat.png" alt @click="goPopup" />
            <img src="../../assets/img/icons/cart.png" alt @click="goCar" />
          </div>
        </div>
      </template>
      <!-- 默认插槽 就是内容区域 -->
      <!-- 主体插槽 -->
      <template v-slot:default>
        <!-- 主轮播部分 -->
        <div class="banner">
          <!-- banner标题 -->
          <div class="banner-title">
            <p>推荐</p>
            <div class="line"></div>
            <p>活动</p>
            <div class="line"></div>
            <p>品牌</p>
            <div class="line"></div>
            <p>定制</p>
          </div>
          <!-- banner下 swiper轮播部分 -->
          <swiper class="banner-swiper" :options="bannerOptions">
            <!-- slides -->
            <swiper-slide v-for="imgObj in bannerImgs" :key="imgObj.id">
              <router-link to="#" class="banner-go">
                <img class="img" :src="imgObj.img" alt />
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
        <div class="content">
          <div class="tue">
            <div class="content-title">
              <div class="content-title-main">-TUE 9.18-</div>
              <div class="content-title-text">周二品质生活专题</div>
            </div>
            <img src="../../assets/img/home/bg1.png" alt class="tue-banner" />
            <div class="tue-goods">
              <div class="tue-good">
                <img src="../../assets/img/home/goods1.png" />
                <p>
                  精油香氛
                  <br />¥344
                </p>
              </div>
              <div class="tue-good">
                <img src="../../assets/img/home/goods2.png" />
                <p>
                  山居猎奇
                  <br />¥344
                </p>
              </div>
              <div class="tue-good">
                <img src="../../assets/img/home/goods3.png" />
                <p>
                  北欧国度
                  <br />¥372
                </p>
              </div>
              <div class="tue-good">
                <img src="../../assets/img/home/goods4.png" />
                <p>
                  卡罗陶瓷碗盘
                  <br />¥388
                </p>
              </div>
            </div>
          </div>
          <div class="mon">
            <div class="content-title">
              <div class="content-title-main">-MON 9.17-</div>
              <div class="content-title-text">周一新品抢鲜放送</div>
            </div>
            <swiper class="mon-box" :options="monOptions">
              <swiper-slide>
                <div class="mon-pics">
                  <div class="mon-pic">
                    <img src="../../assets/img/home/p1.png" alt />
                    <img src="../../assets/img/home/p2.png" alt />
                    <img src="../../assets/img/home/p3.png" alt />
                    <img src="../../assets/img/home/p4.png" alt />
                    <img src="../../assets/img/home/p5.png" alt />
                    <img src="../../assets/img/home/p6.png" alt />
                  </div>
                  <div class="mon-pic">
                    <img src="../../assets/img/home/p7.png" alt />
                    <img src="../../assets/img/home/p8.png" alt />
                    <img src="../../assets/img/home/p9.png" alt />
                    <img src="../../assets/img/home/p10.png" alt />
                    <img src="../../assets/img/home/p11.png" alt />
                    <img src="../../assets/img/home/p12.png" alt />
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </template>
    </BaseLayer>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
//引入组件 注册组件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import BaseLayer from "@/components/BaseLayer";
export default {
  name: "Home",
  components: {
    swiper,
    swiperSlide,
    BaseLayer
  },
  data() {
    return {
      bannerImgs: [
        {
          id: 1,
          img: require("@/assets/img/home/swiper-1.png")
        },
        {
          id: 2,
          img: require("@/assets/img/home/swiper-2.png")
        },
        {
          id: 3,
          img: require("@/assets/img/home/swiper-3.png")
        }
      ],
      bannerOptions: {
        slidesPerView: 1.2,
        spaceBetween: 15,
        centeredSlides: true,
        loop: true,
        loopAdditionalSlides: 1
      },
      monOptions: {
        loop: true,
        freeMode: true,
        spaceBetween: 10
      }
    };
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "search" }); //跳转搜索页
    },
    goPopup() {
      this.$router.push({ name: "popup" }); //跳转弹窗页
    },
    goCar() {
      this.$router.push({ name: "car" }); //跳转弹窗页
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/common/common.scss";

.home-main {
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
    background: rgba(255, 255, 255, 0.9);
    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $basePadding;
    box-sizing: border-box;
    z-index: 2;
    .search-img {
      width: 20px;
      height: 20px;
    }
    .nav-title {
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: #000000;
      font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .chat-cart {
      height: 100%;
      width: 65px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
      }
    }
  }
  .banner {
    width: 100%;
    height: 433px;
    margin-top: 48px;
    .banner-title {
      height: 21px;
      width: 215px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      p {
        font-family: PingFangSC-Light;
        font-size: 15px;
        color: #010e0d;
      }
      .line {
        width: 2px;
        height: 12.4px;
        background-color: #e5e5e5;
      }
    }
    .banner-swiper {
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
      transition: all 0.6s ease;
      .banner-go {
        display: block;
        .img {
          width: 285px;
          height: 392px;
        }
      }
    }
  }
  .content {
    height: 750px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    padding: 0 18px;
    .content-title {
      margin-bottom: 9px;
      .content-title-main {
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        color: #010e0d;
        letter-spacing: 0.06px;
        height: 28px;
        font-weight: bold;
      }
      .content-title-text {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #494949;
        letter-spacing: 0.03px;
      }
    }
    .tue {
      margin-bottom: 30px;
      .tue-banner {
        width: 341px;
        height: 202px;
      }
      .tue-goods {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .tue-good {
        width: 25%;
        height: 112px;
        img {
          width: 79px;
          height: 79px;
        }
        p {
          font-family: PingFangSC-Light;
          font-size: 10px;
          color: #494949;
          letter-spacing: 0.03px;
          line-height: 18px;
        }
      }
    }
    .mon {
      .mon-box {
        width: 516px;
        height: 167px;
        .mon-pics {
          width: 516px;
          height: 167px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .mon-pic {
            width: 516px;
            height: 80px;
            display: flex;
            justify-content: space-between;
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
    }
  }
}
</style>


