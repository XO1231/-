<template>
  <div class="kind-main">
    <!-- 自定义组件 -->
    <BaseLayer ref="BScroll">
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
            <img src="../../assets/img/icons/cart.png" alt @click="$router.push({ name: 'car' })" />
          </div>
        </div>
      </template>
      <!-- 默认插槽 就是内容区域 -->
      <!-- 主体插槽 -->
      <template v-slot:default>
        <div class="main">
          <div class="lists" v-for="(list,index) in kinds" :key="index">
            <div class="list-box" @click="goShow(list)">
              <img :src="list.img" alt class="list-img" />
              <div class="list-text">
                <div class="list-title">{{list.title}}</div>
                <div class="list-ctitle">{{list.ctitle}}</div>
              </div>
            </div>
            <ul class="details" v-show="list.show">
              <li
                v-for="(item,index) in list.children"
                :key="index"
                class="detail"
                @click="goDetails(item.id,item.title)"
              >
                <p>{{item.title}}</p>
                <img src="../../assets/img/icons/arr-r-1.png" alt class="arr-r" />
              </li>
            </ul>
          </div>
        </div>
      </template>
    </BaseLayer>
  </div>
</template>
<script>
//引入组件 注册组件
import BaseLayer from "@/components/BaseLayer";
import kindApi from "@/api/zaowu/kind";
import { mapState } from "vuex";

export default {
  name: "Kind",
  components: {
    BaseLayer
  },
  data() {
    return {
      kinds: []
    };
  },
  computed: {
    ...mapState({
      obj: state => state.car.kindDetails
    })
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "search" }); //跳转搜索页
    },
    goPopup() {
      this.$router.push({ name: "popup" }); //跳转弹窗页
    },
    goDetails(id, title) {
      this.obj.id = id;
      this.obj.title = title;
      this.$router.push({ name: "kindDetails" });
    },
    goShow(val) {
      this.kinds.map(ele => {
        if (ele != val) {
          ele.show = false;
        }
      });
      val.show = val.show == false ? true : false;
      this.$nextTick(() => {
        this.$refs.BScroll.$BScroll.refresh();
      });
    },
    getKind() {
      kindApi
        .getList()
        .then(({ data }) => {
          // 解构写法 res ==> {data}
          this.kinds = data.map(ele => {
            ele.zaowuGoodsKind.children = ele.list;
            ele.zaowuGoodsKind.show = false;
            return ele.zaowuGoodsKind;
          });
          console.log(this.kinds);
          this.$nextTick(() => {
            this.$refs.BScroll.$BScroll.refresh();
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getKind();
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/common/common.scss";

.kind-main {
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
  .main {
    margin-top: 48px;
    padding: $basePadding;
    padding-top: 0;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-bottom: 150px;
    .lists {
      margin-bottom: 5px;
      .list-box {
        width: 100%;
        height: 120px;
        position: relative;
        background-color: #f4f4f4;
        border-radius: 4px;
        .list-text {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 105px;

          .list-title {
            font-family: PingFangSC-Regular;
            font-size: 20px;
            color: #010e0d;
            letter-spacing: 1.02px;
          }
          .list-ctitle {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #aca7a9;
            margin-top: 5px;
          }
        }
        .list-img {
          width: 66px;
          height: 68px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &:nth-child(2n) {
        .list-text {
          left: 37px;
        }
        .list-img {
          right: 47px;
        }
      }
      &:nth-child(2n + 1) {
        .list-text {
          right: 37px;
        }
        .list-img {
          left: 47px;
        }
      }
      .details {
        width: 100%;
        transition: all 0.4s ease;
        .detail {
          width: 100%;
          height: 38px;
          border-bottom: 1px solid #d8d6d6;
          line-height: 38px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-family: PingFangSC-Light;
            font-size: 16px;
            color: #494949;
            letter-spacing: 0.19px;
          }
          .arr-r {
            height: 15px;
            width: 15px;
          }
        }
      }
    }
  }
}
</style>