<template>
  <div class="screen-main">
    <!-- 自定义组件 -->
    <BaseLayer>
      <!-- 头部插槽 -->
      <template v-slot:header>
        <!-- 头部 -->
        <div class="nav">
          <!-- 返回 -->
          <img src="../../../assets/img/icons/arr-l.png" @click="goBack" class="go-back" />
          <!-- 标题 -->
          <p class="nav-title">我的收货地址</p>
          <img
            src="../../../assets/img/icons/添加图标.png"
            alt
            class="nav-add"
            @click="$router.push({name:'addressEdit'})"
          />
        </div>
      </template>
      <!-- 默认插槽 就是内容区域 -->
      <!-- 主体插槽 -->
      <template v-slot:default>
        <div class="main">
          <div class="main-item" v-for="(list,index) in lists" :key="index">
            <div class="item-text" @click="goDefault(list)">
              <p>
                <span class="item-name">{{list.name}}</span>
                <span>&#8194; {{list.tel}}</span>
              </p>
              <div class="item-flex">
                <div class="item-default" v-show="list.isUse==1">默认</div>
                <p class="item-address">{{list.cityStr|address}}{{list.cityBak}}</p>
              </div>
            </div>
            <div class="item-line"></div>
            <div class="item-exit" @click="goEdit(list)">
              <img src="../../../assets/img/icons/编辑.png" alt />
              <p>编辑</p>
            </div>
          </div>
        </div>
      </template>
    </BaseLayer>
  </div>
</template>
<script>
//引入组件 注册组件
import BaseLayer from "@/components/BaseLayer";
import addressApi from "@/api/zaowu/address";
import "vant/lib/toast/style";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "datailsScreen",
  components: {
    BaseLayer
  },
  data() {
    return {
      lists: [],
      status:0
    };
  },
  filters: {
    address(v) {
      if (v) {
        var arr = v.split(",");
        return arr[0] + arr[1] + arr[2];
      }
    }
  },
  mounted() {
    this.getList();
    var sta=this.$route.params.status;
    if (sta) {
      this.status=sta
    }
  },
  methods: {
    goBack(){
      if (this.status) {
        this.$router.push({name:'orderForm'})
        }else{
        this.$router.push({name:'mine'})
      }
    },
    goDefault(v) {
      var item=this.lists.find(el => (el.isUse == 1));
      if (item!==v) {
        item.isUse=0;
        addressApi
          .addressUpdate(item)
          .then(res => {
            if (res.code != "S") {
              Toast.fail("设置失败！");
            }
          })
          .catch(err => {
            console.log(err);
          });
        addressApi
          .setOne({ id:v.id })
          .then(res => {
            if (res.code == "S") {
              this.getList();
            } else {
              Toast.fail("设置失败！");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getList() {
      var userId = JSON.parse(localStorage.getItem("userId"));
      addressApi
        .getList({ userId })
        .then(({ data }) => {
          // console.log(data);
          this.lists = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goEdit(v){
      this.$router.push({name:'addressEdit',params:{v}})
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/common/common.scss";

.screen-main {
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
    background-color: #fff;
    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $basePadding;
    box-sizing: border-box;
    z-index: 2;
    .go-back {
      position: relative;
      left: -10px;
      width: 30px;
      height: 30px;
    }
    .nav-add {
      height: 20px;
      width: 20px;
    }
    .nav-title {
      font-family: PingFangSC-Medium;
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .main {
    margin-top: 48px;
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    color: #000;
    .main-item {
      height: 77px;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-left: 30.5px;
      padding-right: 19.5px;
      font-size: 10px;
      color: #999999;
      .item-text {
        width: 275px;
        font-family: PingFangSC-Regular;
        text-align: left;
        p {
          display: flex;
          align-items: center;
          .item-name {
            color: #494949;
            font-size: 14px;
          }
        }
        .item-flex {
          display: flex;
          align-items: center;
          margin-top: 5px;
          .item-default {
            background: #034c46;
            font-family: PingFangSC-Light;
            font-size: 8px;
            color: #ffffff;
            width: 50px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            margin-right: 8px;
          }
          .item-address {
            line-height: 20px;
          }
        }
      }
      .item-line {
        background-color: #d8d6d6;
        width: 1px;
        height: 80%;
      }
      .item-exit {
        width: 25px;
        height: 33px;
        text-align: center;
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>