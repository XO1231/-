<template>
  <div class="home-search">
    <div class="head">
      <div class="input">
        <img src="../../../assets/img/icons/search.png" alt class="search-img" />
        <input type="text" placeholder="首饰" autofocus />
      </div>
      <p @click="$router.go(-1)">取消</p>
    </div>
    <div class="main">
      <div class="main-tit">热门搜索</div>
      <div class="main-tags main-tags-1">
        <div class="main-tag">香氛</div>
        <div class="main-tag">项链</div>
        <div class="main-tag">马克杯</div>
        <div class="main-tag">手镯</div>
      </div>
      <div class="main-tags main-tags-2">
        <div class="main-tag tag-short">包</div>
        <div class="main-tag">床品</div>
        <div class="main-tag">香水</div>
      </div>
      <div class="main-tit">历史搜索</div>
      <div class="main-tags main-tags-1">
        <div class="main-tag">香氛</div>
        <div class="main-tag">项链</div>
        <div class="main-tag">马克杯</div>
        <div class="main-tag">手镯</div>
      </div>
      <div class="main-tags main-tags-2">
        <div class="main-tag tag-short">包</div>
        <div class="main-tag">床品</div>
        <div class="main-tag">香水</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeSearch"
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common/common.scss";

.home-search {
  .head {
    width: 100%;
    height: 54px;
    box-sizing: border-box;
    padding: $basePadding;
    display: flex;
    justify-content: space-between;
    line-height: 34px;

    .input {
      background: #f4f4f4;
      border-radius: 8px;
      display: flex;
      justify-content: flex-start;
      height: 34px;
      width: 274px;
      line-height: 34px;
      .search-img {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        margin-left: 5px;
      }
      input {
        font-family: PingFangSC-Light;
        font-size: 16px;
        color: #b0b0b0;
        margin-left: 15px;
        border-width: 0;
        outline: none;
        background: #f4f4f4;
      }
    }
    p {
      font-family: PingFangSC-Light;
      font-size: 16px;
      color: #010e0d;
      height: 100%;
    }
  }
  .main {
    width: 100%;
    box-sizing: border-box;
    padding: $basePadding;
    text-align: left;
    .main-tit {
      margin-bottom: 15px;
      font-family: PingFangSC-Light;
      font-size: 16px;
      color: #000000;
    }
    .main-tags {
      display: flex;
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      .main-tag {
        text-align: center;
        background: #f4f4f4;
        border-radius: 8px;
        width: 78px;
        height: 30px;
        font-family: PingFangSC-Light;
        font-size: 16px;
        color: #010e0d;
        line-height: 30px;
      }
    }
    .main-tags-1 {
      justify-content: space-between;
    }
    .main-tags-2 {
      justify-content: flex-start;
      margin-bottom: 24px;
      .main-tag {
        margin-right: 10px;
      }
      .tag-short {
        width: 39px;
      }
    }
  }
}
</style>