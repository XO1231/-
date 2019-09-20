<template>
  <div class="screen-main">
    <!-- 自定义组件 -->
    <BaseLayer>
      <!-- 头部插槽 -->
      <template v-slot:header>
        <!-- 头部 -->
        <div class="nav">
          <!-- 返回 -->
          <img src="../../../../assets/img/icons/arr-l.png" class="go-back" @click="$router.go(-1)" />
          <!-- 标题 -->
          <p class="nav-title">筛选</p>
        </div>
      </template>
      <!-- 默认插槽 就是内容区域 -->
      <!-- 主体插槽 -->
      <template v-slot:default>
        <div class="main">
          <div class="keywords">
            <div class="main-head">
              <p class="title">关键词</p>
              <div class="more">
                <p>更多</p>
                <img src="../../../../assets/img/icons/下箭头.png" alt />
              </div>
            </div>
            <div class="key-main">
              <div
                class="main-tag"
                v-for="(key,index) in keys"
                :key="index"
                @click="selsecKey(key)"
              >{{key}}</div>
            </div>
          </div>
          <div class="keywords">
            <div class="main-head">
              <p class="title">品牌</p>
              <div class="more">
                <p>更多</p>
                <img src="../../../../assets/img/icons/下箭头.png" alt />
              </div>
            </div>
            <div class="key-main">
              <div
                class="main-tag"
                v-for="(make,index) in makes"
                :key="index"
                @click="selsecMake(make)"
              >{{make}}</div>
            </div>
          </div>
          <div class="foot">
            <div @click="goReset">重置筛选项</div>
            <div class="active" @click="goSubmit">确定</div>
          </div>
        </div>
      </template>
    </BaseLayer>
  </div>
</template>
<script>
//引入组件 注册组件
import BaseLayer from "@/components/BaseLayer";
export default {
  name: "datailsScreen",
  components: {
    BaseLayer
  },
  data() {
    return {
      keys: ["无钢圈", "吊带", "超薄", "蕾丝", "少女", "无痕"],
      makes: [
        "NEIWAI",
        "TRIUMPU",
        "LAPERLA",
        "ESSENCE",
        "CRYSTALS",
        "JUDYHUA",
        "MAIAACTIVE",
        "AUBADE"
      ],
      keySelected: [],
      makeSelected: []
    };
  },
  created() {
    this.title = this.$route.params.val;
  },
  methods: {
    goReset() {
      this.keySelected = [];
      this.makeSelected = [];
      var el = document.querySelectorAll(".select");
      for (let i = 0; i < el.length; i++) {
        el[i].classList.remove("select");
      }
    },
    goSubmit() {
      //如果有数据,就提交
      if (this.keySelected.length > 0 || this.makeSelected.length > 0) {
        this.$router.push({
          name: "kindDetails",
          params: { key: this.keySelected, make: this.makeSelected }
        });
        //跳转确认订单并传数据,用this.$route.params接收数据
      }
    },
    selsecKey(val) {
      var el = event.target;
      this.switch(val, el, this.keySelected);
    },
    selsecMake(val) {
      var el = event.target;
      console.log("el",JSON.stringify(el))
      console.log("val",val)
      this.switch(val, el, this.makeSelected);
    },
    switch(val, el, arr) {
      var index = arr.findIndex(
        item => JSON.stringify(item) == JSON.stringify(val)
      ); //获取子元素下标
      //判断该子元素是否已存在
      if (index == -1) {
        arr.push(val); //不存在就添加
        el.classList.add("select");
      } else {
        arr.splice(index, 1); //已存在就移除
        el.classList.remove("select");
      }
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
    background: #f9f9f9;
    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: $basePadding;
    box-sizing: border-box;
    z-index: 2;
    .go-back {
      width: 30px;
      height: 30px;
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
    padding-top: 0;
    box-sizing: border-box;
    height: 670px;
    .main-head {
      width: 100%;
      height: 32px;
      padding: $basePadding;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      .title {
        color: #010e0d;
      }
      .more {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 60;
        height: 100%;
        p {
          color: #9e9e9e;
        }
        img {
          width: 16px;
          height: 16px;
          margin-left: 10px;
        }
      }
    }
    .keywords {
      margin-left: 10px;
      .key-main {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 20px 0;
      }
    }
    .main-tag {
      background: #f9f9f9;
      border-radius: 1px;
      width: 105px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-family: PingFangSC-Light;
      font-size: 14px;
      margin-bottom: 10px;
      margin-left: 10px;
      color: #010e0d;
      transition: all 0.4s ease;
    }
    .select {
      background: #1c4b47;
      color: #ffffff;
    }

    .foot {
      display: flex;
      justify-content: space-between;
      height: 70px;
      margin-top: 150px;
      width: 100%;
      box-sizing: border-box;
      left: 0;
      z-index: 2;
      padding: $basePadding;
      div {
        background: #ffffff;
        border-radius: 4px;
        font-family: PingFangSC-Light;
        font-size: 18px;
        color: #1c4b47;
        width: 155px;
        height: 48px;
        line-height: 48px;
        border: 1px solid #1c4b47;
      }
      .active {
        background: #1c4b47;
        color: #ffffff;
      }
    }
  }
}
</style>