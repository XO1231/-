<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="Home">
      <router-view />
      </keep-alive>
    </transition>
    <Footer v-if="$route.meta.footerShow"></Footer>
  </div>
</template>
<script>
// 引入公共组件
import Footer from "@/components/Footer";
export default {
  name: "App",
  // 注册组件
  components: {
    Footer
  },
  data(){
    return{
      transitionName:"fade"
    }
  },
  watch:{
    $route(to,from){
      const tabpath=[
        "/home",
        "/movie",
        "/cinema",
        "/purch",
        "/main"
      ];
      if(
        tabpath.some(ele=>ele==to.path)&&
        tabpath.some(ele=>ele==from.path)
        ){
          this.transitionName="fade";
        }else{
          const toDepth=to.path.split("/").length;
          const fromDepth=from.path.split("/").length;
           this.transitionName=toDepth<fromDepth?"slide-right":"slide-left";//向外跳转右边滑入,向里跳转左边滑入(向里就是一级路由跳二级路由)
        }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/style/common/common.scss";

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  background-color: $baseBgColor;
  color:#000000;
  -webkit-tap-highlight-color: rgba($color: #000000, $alpha: 0);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
// .transitionMain-enter-active,.transitionMain-leave-active {
//   transition: all 0.5s ease;
// }
// .transitionMain-enter{
//   transform: translateX(100%);
//   opacity: 0;
// }
// .transitionMain-leave-to{
//   transform: translateX(-100%);
//   opacity: 0;
// }
.fade-enter{
  opacity: 0;
}
.fade-enter-active {
   transition:all .2s ease;
}
.slide-right-enter{
  opacity: 0;
  transform: translateX(-100%);
}
.slide-right-enter-active{
   transition: all .4s ease;
}
.slide-left-enter{
  opacity: 0;
  transform: translateX(100%);
}
.slide-left-enter-active{
   transition: all .4s ease;
}
</style>
