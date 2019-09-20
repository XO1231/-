<template>
  <div class="detail-main">
    <!-- 头部 -->
    <div class="nav">
      <!-- 返回 -->
      <img src="../../../../assets/img/icons/arr-l.png" class="go-back" @click="goBack" />
      <!-- 标题 -->
      <p class="nav-title">商品详情</p>
      <!-- 分享与购物车 -->
      <div class="chat-cart">
        <img src="../../../../assets/img/icons/share.png" @click="sharePopup=!sharePopup" />
        <img src="../../../../assets/img/icons/cart.png" @click="$router.push({ name: 'car' })" alt />
      </div>
    </div>
    <div class="main-nav">
      <router-link class="describe" to="/kind/details/detail/describe">详情</router-link>
      <router-link class="discuss" to="/kind/details/detail/discuss">评价</router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <van-popup
      v-model="sharePopup"
      position="bottom"
      :style="{ height: '465px' }"
      class="pop-share"
    >
      <p class="share">分享</p>
      <div class="pop-main">
        <div class="pop-item">
          <img src="../../../../assets/img/icons/wx.png" alt />
          <p>微信好友</p>
        </div>
        <div class="pop-item">
          <img src="../../../../assets/img/icons/friends.png" alt />
          <p>朋友圈</p>
        </div>
        <div class="pop-item">
          <img src="../../../../assets/img/icons/wb.png" alt />
          <p>微博</p>
        </div>
        <div class="pop-item">
          <img src="../../../../assets/img/icons/qq.png" alt />
          <p>QQ好友</p>
        </div>
        <div class="pop-item">
          <img src="../../../../assets/img/icons/qq1.png" alt />
          <p>QQ空间</p>
        </div>
        <div class="pop-item">
          <img src="../../../../assets/img/icons/clone.png" alt />
          <p>复制链接</p>
        </div>
        <div class="pop-item">
          <img src="../../../../assets/img/icons/....png" alt />
          <p>更多分享</p>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="buyPopup" round position="bottom" class="pop-buy">
      <div class="buy-main">
        <div class="buy-head">
          <img :src="good.img1" alt />
          <div class="head-text">
            <img
              src="../../../../assets/img/icons/关闭.png"
              class="buy-close"
              @click="buyPopup=false"
            />
            <p class="buy-make">{{good.brandId}}</p>
            <p class="buy-make">{{good.desc}}</p>
            <p class="buy-price">{{good.priceNow}}</p>
            <p class="buy-num">仅剩{{currentNum}}件</p>
          </div>
        </div>
        <div class="buy-item">
          <div class="item-title">
            <p>颜色</p>
            <img src="../../../../assets/img/icons/arr-d.png" alt />
          </div>
          <div class="item-main">
            <div
              class="item-color"
              :style="{'background-color':good.color1}"
              @click="colorSelect(good.color1)"
            ></div>
            <div
              class="item-color"
              :style="{'background-color':good.color2}"
              @click="colorSelect(good.color2)"
            ></div>
            <div
              class="item-color"
              :style="{'background-color':good.color3}"
              @click="colorSelect(good.color3)"
            ></div>
          </div>
        </div>
        <div class="buy-item">
          <div class="item-title">
            <p>规格</p>
            <img src="../../../../assets/img/icons/arr-d.png" alt />
          </div>
          <div class="item-main">
            <div class="item-size" @click="sizeSelect('S')">S</div>
            <div class="item-size" @click="sizeSelect('M')">M</div>
            <div class="item-size" @click="sizeSelect('L')">L</div>
          </div>
        </div>
        <div class="buy-item">
          <div class="item-title">
            <p>数量</p>
            <img src="../../../../assets/img/icons/arr-d.png" alt />
          </div>
          <div class="item-main">
            <van-stepper v-model="buyNum" min="0" :max="currentNum" />
          </div>
        </div>
        <div class="buy-btn" @click="goSubmit(good.id)">确定</div>
      </div>
    </van-popup>
    <div class="foot">
      <div class="foot-flex foot-l">
        <img src="../../../../assets/img/icons/like.png" />
        <img src="../../../../assets/img/icons/kf.png" />
      </div>
      <div class="foot-flex foot-r">
        <div class="foot-btn btn-l" @click="buyShow">加入购物车</div>
        <div class="foot-btn btn-r" @click="buyShow">立即购买</div>
      </div>
    </div>
  </div>
</template>
<script>
//引入组件 注册组件
import BaseLayer from "@/components/BaseLayer";
import stockApi from "@/api/zaowu/stock";

import { mapState } from "vuex";

export default {
  name: "detailsDetail",
  components: {
    BaseLayer
  },
  data() {
    return {
      good: {},
      list: [],
      sharePopup: false,
      buyPopup: false,
      buyNum: 0,
      color: "",
      size: "",
      carList: []
    };
  },
  mounted() {
    var car = JSON.parse(localStorage.getItem("carList"));
    if (car) {
      this.carList = car;
    }
  },
  computed: {
    ...mapState({
      obj: state => state.car.kindDetails
    }),
    currentNum() {
      if (this.color && this.size) {
        var sum = 0;
        this.list.map(ele => {
          if (ele.color == this.color && ele.size == this.size) {
            sum += ele.count;
          }
        });
        return sum;
      } else {
        return Number(this.good.count);
      }
    }
  },
  created() {
    if (this.obj.good) {
      this.good = this.obj.good;
      this.getDetail();
    }
  },
  methods: {
    buyShow() {
      this.buyPopup = true;
      this.buyNum = 0;
    },
    getDetail() {
      stockApi
        .getList({ id: this.good.id })
        .then(({ data }) => {
          this.list = data;
          // console.log(this.list);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.push({ name: "kindDetails" });
    },
    goShare() {
      this.$router.push({ name: "search" }); //跳转搜索页
    },
    goPopup() {
      this.$router.push({ name: "popup" }); //跳转弹窗页
    },
    goDetail(val) {
      this.$router.push({ name: "detailsDetail", params: { good: val } });
    },
    colorSelect(v) {
      var el = event.target;
      var els = document.querySelectorAll(".item-color");
      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove("item-act");
      }
      el.classList.toggle("item-act");
      this.color = v;
    },
    sizeSelect(v) {
      var el = event.target;
      var els = document.querySelectorAll(".item-size");
      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove("item-act");
      }
      el.classList.toggle("item-act");
      this.size = v;
    },
    goSubmit(id) {
      if (this.buyNum != 0) {
        this.good.totalNum = this.good.count;
        this.good.currentCount = this.good.count - this.buyNum;
        this.good.color = this.color;
        this.good.size = this.size;
        this.good.checked = false;
        var obj = this.carList.find(ele => ele.id == id);
        if (!obj) {
          this.good.carCount = this.buyNum;
          this.carList.push(this.good);
        } else {
          if (this.good.color == obj.color && this.good.size == obj.size) {
            this.good.carCount = obj.carCount + this.buyNum;
            var index = this.carList.findIndex(ele => ele.id == id);
            this.carList.splice(index, 1, this.good);
          } else {
            this.good.carCount = this.buyNum;
            this.carList.push(this.good);
          }
          // console.log(this.good);
        }
      }
      this.buyPopup = false;
      localStorage.setItem("carList", JSON.stringify(this.carList));
      console.log(this.carList);
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/common/common.scss";

.detail-main {
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
    background: rgba(255, 255, 255);
    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $basePadding;
    box-sizing: border-box;
    z-index: 999999;
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
  .main-nav {
    margin: 64px auto 20px;
    width: 120px;
    height: 24px;
    z-index: 9999999999;
    background: rgba(255, 255, 255, 0.9);
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    a {
      font-family: PingFangSC-Light;
      font-size: 17px;
      color: #999999;
    }
    .router-link-active {
      color: #1c4b47;
    }
  }
  .main {
    box-sizing: border-box;
    height: 100%;
  }
  .pop-share {
    background: #e9e8e8;
    text-align: center;
    .share {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #010e0d;
      letter-spacing: 0.24px;
      margin-top: 12px;
      margin-bottom: 30px;
    }
    .pop-main {
      width: 300px;
      height: 368px;
      margin-left: 52px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .pop-item {
        width: 70px;
        height: 100px;
        margin-right: 30px;
        margin-bottom: 30px;
        img {
          height: 70px;
          width: 70px;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #010e0d;
          letter-spacing: 0.17px;
          margin-top: 10px;
        }
      }
    }
  }
  .pop-buy {
    height: 495px;
    width: 90%;
    background-color: #fff;
    left: 18px;
    .buy-main {
      padding: 16px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .buy-head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        img {
          width: 114px;
          height: 114px;
        }
        .head-text {
          height: 114px;
          width: 170px;
          margin-left: 18px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          text-align: left;
          .buy-close {
            position: absolute;
            top: 0;
            right: 0;
            width: 17px;
            height: 17px;
          }
          .buy-make {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #494949;
          }
          .buy-price {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #010e0d;
          }
          .buy-num {
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: #494949;
          }
        }
      }
      .buy-item {
        height: 70px;
        width: 100%;
        color: #000000;
        font-family: PingFangSC-Light;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .item-title {
          width: 45px;
          height: 17px;
          line-height: 17px;
          display: flex;
          justify-content: space-between;
          p {
            font-size: 14px;
          }
          img {
            width: 17px;
            height: 17px;
          }
        }
        .item-main {
          height: 40px;
          margin-left: 15px;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          .item-color {
            width: 40px;
            height: 40px;
            margin-right: 33.5px;
            border-radius: 50%;
            transition: all 0.4s ease;
            box-shadow: 0 2px 5px 0 #bfbfbf;
          }
          .item-size {
            margin-right: 33.5px;
            width: 40px;
            height: 40px;
            background: #ffffff;
            box-shadow: 0 2px 5px 0 #e9e9e9;
            border-radius: 4px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            color: #000000;
            transition: all 0.4s ease;
          }
          ::v-deep input,
          ::v-deep button {
            background-color: #ffffff;
            box-shadow: 0 2px 5px 0 #e9e9e9;
            border-radius: 1px;
          }
          .item-act {
            box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, 0.25);
            transform: translate(0, -3px);
          }
        }
      }
      .buy-btn {
        background: #1c4b47;
        border-radius: 4px;
        width: 177px;
        height: 40px;
        margin: 0 auto;
        font-family: PingFangSC-Light;
        font-size: 15px;
        color: #ffffff;
        line-height: 40px;
        text-align: center;
      }
    }
  }
  .foot {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    padding: 10px 0 30px;
    display: flex;
    background: rgba(255, 255, 255, 0.9);
    justify-content: space-between;
    align-items: center;
    height: 42px;
    width: 340px;
    .foot-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .foot-l {
      width: 70px;
      height: 100%;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .foot-r {
      width: 234px;
      height: 40px;
      .foot-btn {
        width: 113px;
        height: 40px;
        border: 1px solid #1c4b47;
        border-radius: 4px;
        font-family: PingFangSC-Light;
        font-size: 15px;
        line-height: 40px;
      }
      .btn-l {
        color: #1c4b47;
      }
      .btn-r {
        background: #1c4b47;
        box-shadow: 0 2px 5px 0 #e9e9e9;
        color: #fff;
      }
    }
  }
}
</style>