<template>
  <div class="mine-set">
    <div class="head">
      <img src="../../../assets/img/icons/arr-l.png" @click="$router.go(-1)"/>
      <p>通用设置</p>
    </div>
    <div class="main">
      <div class="main-tiems">
        <p class="items-l">新消息提醒</p>
        <div class="items-r">
          <van-switch v-model="checked" active-color="#1C4B47" inactive-color="#fff" />
        </div>
      </div>
      <div class="main-tiems">
        <p class="items-l">清除图片缓存</p>
        <div class="items-r">
          <img src="../../../assets/img/icons/arr-r-1.png" />
        </div>
      </div>
      <div class="main-tiems">
        <p class="items-l">反馈与建议</p>
        <div class="items-r">
          <img src="../../../assets/img/icons/arr-r-1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mineSet",
  data() {
    return {
      checked: true
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common/common.scss";

.mine-set {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  text-align: left;
  .head {
    width: 100%;
    padding: $basePadding;
    box-sizing: border-box;
    height: 48px;
    position: relative;
    background-color: #fff;
    img {
      width: 30px;
      height: 30px;
      position: relative;
      left: -5px;
    }
    p {
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #010e0d;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .main-tiems {
    background-color: #fff;
    width: 100%;
    height: 57.5px;
    border-top: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .items-l {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #494949;
      margin-left: 19px;
    }
    .items-r {
      margin-right: 19px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>