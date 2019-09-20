<template>
  <div class="details-main">
    <!-- 自定义组件 -->
    <BaseLayer>
      <!-- 头部插槽 -->
      <template v-slot:header>
        <!-- 头部 -->
        <div class="nav">
          <!-- 返回 -->
          <img
            src="../../../assets/img/icons/arr-l.png"
            class="go-back"
            @click="$router.push({name:'kind'})"
          />
          <!-- 标题 -->
          <p class="nav-title">{{obj.title}}</p>
          <!-- 搜索与购物车 -->
          <div class="chat-cart">
            <img src="../../../assets/img/icons/search.png" @click="goSearch" />
            <img
              src="../../../assets/img/icons/cart.png"
              alt
              @click="$router.push({ name: 'car' })"
            />
          </div>
        </div>
        <div class="sort">
          <div class="sort-item">新品</div>
          <div class="sort-item">
            销量
            <img :src="filterImg" class="filter-img img1" @click="goSort" />
          </div>
          <div class="sort-item">
            价格
            <img :src="filterImg" class="filter-img img2" @click="goSort" />
          </div>
          <div class="sort-item" @click="goScreen">筛选</div>
        </div>
      </template>
      <!-- 默认插槽 就是内容区域 -->
      <!-- 主体插槽 -->
      <template v-slot:default>
        <div class="main">
          <div class="keywords">
            <div v-for="(tag,index) in tags" :key="index" class="key-tag">{{ tag }}</div>
          </div>
          <div class="pros">
            <div v-for="(pro,index) in list" :key="index" class="pros-item" @click="goDetail(pro)">
              <img :src="pro.img1" />
              <p>{{pro.brandId}}</p>
              <p>{{pro.name}}</p>
              <p class="price">¥{{pro.priceNow}}</p>
            </div>
          </div>
        </div>
      </template>
    </BaseLayer>
  </div>
</template>
<script>
//引入组件 注册组件
import goodsApi from "@/api/zaowu/goods";
import kindApi from "@/api/zaowu/kind";

import BaseLayer from "@/components/BaseLayer";
import { mapState } from "vuex";

export default {
  name: "kindDetails",
  components: {
    BaseLayer
  },
  data() {
    return {
      filterImg: require("@/assets/img/icons/filter-arr.png"),
      filterUp: require("@/assets/img/icons/filter-up.png"),
      filterDown: require("@/assets/img/icons/filter-down.png"),
      tags: ["无痕", "美背", "运动", "性感"],
      make: [],
      list: []
    };
  },
  computed: {
    ...mapState({
      obj: state => state.car.kindDetails
    })
  },
  created() {
    if (this.$route.params.key) {
      this.tags = this.$route.params.key;
    }
    if (this.$route.params.make) {
      this.make = this.$route.params.make;
    }
    if (this.obj.id) {
      goodsApi
        .getList({
          start: 1,
          limit: 10,
          subKindId: this.obj.id
        })
        .then(({ data }) => {
          this.list = data.list.map(ele => {
            return ele.goods;
          });
          // console.log(this.list);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "search" }); //跳转搜索页
    },
    goPopup() {
      this.$router.push({ name: "popup" }); //跳转弹窗页
    },
    goSort(v) {
      if (v.target.src == this.filterDown) {
        v.target.src = this.filterUp;
        kindApi
          .sort({
            sortBy: "priceNow",
            desc: 1,
            subKindId: this.obj.id
          })
          .then(({ data }) => {
            this.list = data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        v.target.src = this.filterDown;
        kindApi
          .sort({
            sortBy: "priceNow",
            desc: 0,
            subKindId: this.obj.id
          })
          .then(({ data }) => {
            this.list = data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    goScreen() {
      this.$router.push({ name: "detailsScreen" }); //跳转筛选页
    },
    goDetail(val) {
      this.obj.good = val;
      this.$router.push({ name: "goodsDescribe" });
      console.log(this.obj.good)
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/common/common.scss";

.details-main {
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
  .sort {
    background: #f9f9f9;
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    margin-top: 48px;
    color: #010e0d;
    z-index: 99999;
    .sort-item {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      .filter-img {
        width: 10px;
        height: 10px;
      }
    }
  }
  .main {
    padding-top: 90px;
    box-sizing: border-box;
    .keywords {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 14px 0 0;
      .key-tag {
        background: #f9f9f9;
        border-radius: 1px;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #010e0d;
        width: 51px;
        height: 23px;
        text-align: center;
        line-height: 23px;
        margin-left: 33px;
        margin-bottom: 10px;
      }
    }
    .pros {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding-bottom: 80px;

      .pros-item {
        height: 180px;
        width: 129px;
        margin-left: 37px;
        margin-bottom: 10px;
        img {
          width: 129px;
          height: 129px;
        }
        p {
          font-family: PingFangSC-Light;
          font-size: 12px;
          margin-bottom: 5px;
          color: #494949;
        }
        .price {
          font-family: PingFangSC-Medium;
          font-weight: bold;
          color: #010e0d;
        }
      }
    }
  }
}
</style>