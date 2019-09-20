<template>
  <div class="detail-discuss">
    <BaseLayer>
      <template v-slot:default>
        <div class="discuss-main">
          <div class="discuss-item" v-for="(info,index) in infos" :key="index">
            <img :src="info.headImg" class="head-img" />
            <div class="discuss-main">
              <p class="discuss-name">{{info.name}}</p>
              <p class="discuss-date">{{info.date}}</p>
              <p class="discuss-text">{{info.text}}</p>
            </div>
          </div>
        </div>
      </template>
    </BaseLayer>
  </div>
</template>

<script>
import BaseLayer from "@/components/BaseLayer";

export default {
  name: "detailDiscuss",
  components: {
    BaseLayer
  },
  data() {
    return {
      infos: [
        {
          headImg: require("@/assets/img/icons/main-active.png"),
          name: "Tomimy",
          date: "2019-12-08",
          text:
            "稍等哈时间开发大红色方尽快,大姐夫和你技术开发,烦死了快点发给你看上了多功能."
        },
        {
          headImg: require("@/assets/img/icons/main-active.png"),
          name: "Tomimy",
          date: "2019-12-08",
          text:
            "稍等哈时间开发大红色方尽快,大姐夫和你技术开发,烦死了快点发给你看上了多功能."
        },
        {
          headImg: require("@/assets/img/icons/main-active.png"),
          name: "Tomimy",
          date: "2019-12-08",
          text:
            "稍等哈时间开发大红色方尽快,大姐夫和你技术开发,烦死了快点发给你看上了多功能."
        },
        {
          headImg: require("@/assets/img/icons/main-active.png"),
          name: "Tomimy",
          date: "2019-12-08",
          text:
            "稍等哈时间开发大红色方尽快,大姐夫和你技术开发,烦死了快点发给你看上了多功能."
        },
        {
          headImg: require("@/assets/img/icons/main-active.png"),
          name: "Tomimy",
          date: "2019-12-08",
          text:
            "稍等哈时间开发大红色方尽快,大姐夫和你技术开发,烦死了快点发给你看上了多功能."
        }
      ]
    };
  },

  created() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common/common.scss";

.detail-discuss {
  height: 100%;
  .discuss-main{
    padding-bottom: 150px;
    .discuss-item {
      background-color: #fff;
      height: 160px;
      width: 90%;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: $basePadding;
      margin: 0 auto;

      .head-img {
        width: 41px;
        height: 41px;
        margin-top: 15px;
        margin-right: 17.5px;
      }
      .discuss-main {
        width: 278px;
        height: 100%;
        font-family: PingFangSC-Light;
        text-align: left;
        .discuss-name {
          font-size: 18px;
          color: #000000;
        }
        .discuss-date {
          margin: 5px 0 15px;
          font-size: 14px;
          color: #767676;
        }
        .discuss-text {
          font-size: 12px;
          color: #494949;
          letter-spacing: 2px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>