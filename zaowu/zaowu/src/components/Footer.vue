<template>
  <div class="footer-main">
    <router-link class="link-item" v-for="link in links" :key="link.to" :to="{name:link.to}">
      <p>{{link.title}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Footer",

  data() {
    return {
      links: [
        {
          to: "home",
          title: "首页"
        },
        {
          to: "kind",
          title: "分类"
        },
        {
          to: "find",
          title: "发现"
        },
        {
          to: "mine",
          title: "我的"
        }
      ]
    };
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
.footer-main {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  height: 83px;
  display: flex;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.25);
  font-size: 12px;
  justify-content: space-around;
  align-items: flex-end;
  .link-item.router-link-active {
    p {
      color: #1c4b47;
    }
  }
  .link-item {
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 39px;
    transition: all 0.4s ease;
    position: relative;
    p {
      position: absolute;
      bottom: -18px;
      width: 30px;
      text-align: center;
      color: #999999;
      transition: all 0.4s ease;
    }
    &:nth-child(1) {
      background-image: url("../assets/img/icons/home.png");
    }
    &:nth-child(1).router-link-active {
      background-image: url("../assets/img/icons/home-active.png");
    }
    &:nth-child(2) {
      background-image: url("../assets/img/icons/kind.png");
    }
    &:nth-child(2).router-link-active {
      background-image: url("../assets/img/icons/kind-active.png");
    }
    &:nth-child(3) {
      background-image: url("../assets/img/icons/find.png");
    }
    &:nth-child(3).router-link-active {
      background-image: url("../assets/img/icons/find-active.png");
    }
    &:nth-child(4) {
      background-image: url("../assets/img/icons/main.png");
    }
    &:nth-child(4).router-link-active {
      background-image: url("../assets/img/icons/main-active.png");
    }
  }
}
</style>
