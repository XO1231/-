<template>
  <div class="pulldown">
    <div ref="bsWrapper" class="pulldown-bswrapper">
      <div class="pulldown-scroller">
        <div class="pulldown-wrapper">
          <div v-show="beforePullDown">
            <span>下拉刷新</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown">
              <span>刷新成功</span>
            </div>
          </div>
        </div>
        <ul class="pulldown-list">
          <li v-for="i of 50" :key="i" class="pulldown-list-item">{{ `I am item ${i} ` }}</li>
        </ul>
        <div class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">加载更多</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import Pullup from "@better-scroll/pull-up";
BScroll.use(PullDown);
BScroll.use(Pullup);
// function getOneRandomList(step = 0) {
//   const arr = Array.apply(null, {length: (30 + step)}).map((...args) => args[1])
//   return arr.sort(() => Math.random() - 0.5)
// }

const TIME_BOUNCE = 800;
const TIME_STOP = 600;
const THRESHOLD = 50; //下拉距离超过30px触发pullingDown事件
const STOP = 56;
let STEP = 0;
export default {
  data() {
    return {
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      data: 30
      // dataList:
      // getOneRandomList()
    };
  },
  // created() {
  //   this.bscroll = null;
  // },
  mounted() {
    this.initBscroll();
  },
  methods: {
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.bsWrapper, {
        scrollY: true,
        bounceTime: TIME_BOUNCE, //弹起事件
        pullDownRefresh: {
          threshold: THRESHOLD, //下拉距离超过30px触发pullingDown事件
          stop: STOP
        },
        pullUpLoad: true
      });

      this.bscroll.on("pullingDown", this.pullingDownHandler);
      this.bscroll.on("pullingUp", this.pullingUpHandler);
    },
    //下拉
    async pullingDownHandler() {
      this.beforePullDown = false;
      this.isPullingDown = true;
      // STEP += 10

      // await this.requestData()

      this.isPullingDown = false;
      this.finishPullDown();
    },
    async finishPullDown() {
      const stopTime = TIME_STOP;
      await new Promise(resolve => {
        setTimeout(() => {
          this.bscroll.finishPullDown();
          resolve();
        }, stopTime);
      });
      setTimeout(() => {
        this.beforePullDown = true;
        this.bscroll.refresh();
      }, 3000);
    },
    // async requestData() {
    //   try {
    //     const newData = await this.ajaxGet(/* url */)
    //     this.dataList = newData
    //   } catch (err) {
    //     // handle err
    //     console.log(err)
    //   }
    // },
    // ajaxGet(/* url */) {
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       const dataList = getOneRandomList(STEP)
    //       resolve(dataList)
    //     }, 1000)
    //   })
    // }
    // 上拉
    async pullingUpHandler() {
      this.isPullUpLoad = true;
      await this.requestData();
      this.bscroll.finishPullUp();
      this.bscroll.refresh();
      this.isPullUpLoad = false;
    },
    //函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。
    async requestData() {
      try {
        const newData = await this.ajaxGet(/* url */);
        this.data += newData;
      } catch (err) {
        // handle err
        console.log(err);
      }
    },
    ajaxGet(/* url */) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(20);
        }, 1000);
      });
    }
  }
};
</script>
<style lang="stylus">
.pulldown {
  height: 100%;
}

.pulldown-bswrapper {
  position: relative;
  height: 100%;
  padding: 0 10px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.pulldown-list {
  padding: 0;
}

.pulldown-list-item {
  padding: 10px 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
}

.pulldown-wrapper {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
</style>