<template>
  <div class="home-popup">
      <img src="../../../assets/img/home/popup/弹窗.png" alt="" class="main">
      <img src="../../../assets/img/home/popup/圈叉.png" alt="" class="close" @click="$router.go(-1)">
  </div>
</template>

<script>
export default {
    name:"homePopup"
}
</script>

<style lang="scss" scoped>
.home-popup{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.80);
    position: relative;
    img{
        position: absolute;
        left: 50%;
    }
    .main{
        width: 300px;
        height: 321px;
        top: 48%;
        transform: translate(-50%,-50%)
    }
    .close{
        width: 54px;
        height: 54px;
        bottom: 120px;
        transform: translateX(-50%)
    }
}
</style>