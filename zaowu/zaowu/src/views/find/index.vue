<template>
  <section class="box">
    <div class="head">head</div>
    <div class="content">
      <!-- 内容 -->
      <div class="left" ref="left">
        <!-- 下拉刷新 -->
        <!-- <div class="pulldown-wrapper">
          <div v-show="beforePullDown">
            <span>refresh</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown">
              <span>Refresh success</span>
            </div>
          </div>
        </div>-->
        <div class="loading" v-show="isPullingDown">Loading...</div>
        <ul>
          <li
            v-for="(item, index) in left"
            :key="item"
            :class="{current:currentIndex== index}"
            @click="selectItem(index)"
            ref="menuList"
          >
            <span class="left-item">{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="right" ref="right">
        <ul>
          <li class="right-item right-item-hook" v-for="item in right" :key="item.name">
            <h2>{{item.name}}</h2>
            <ul>
              <li v-for="num in item.content" :key="num.name">
                <div>{{item.name+num}}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
// BScroll.use(PullDown);
export default {
  data() {
    return {
      currentNum: 0,
      isPullingDown: false,
      left: ["a", "b", "c", "d", "e", "f"],
      right: [
        {
          name: "a",
          content: ["1", "2", "3", "4", "5"]
        },
        {
          name: "b",
          content: ["1", "2", "3", "4", "5"]
        },
        {
          name: "c",
          content: ["1", "2", "3", "4", "5"]
        },
        {
          name: "d",
          content: ["1", "2", "3", "4", "5"]
        },
        {
          name: "e",
          content: ["1", "2", "3", "4", "5"]
        },
        {
          name: "f",
          content: ["1", "2", "3", "4", "5"]
        }
      ],
      listHeight: [],
      scrollY: 0, //实时获取当前y轴的高度
      clickEvent: false
    };
  },
  methods: {
    _initScroll() {
      //better-scroll的实现原理是监听了touchStart,touchend事件，所以阻止了默认的事件（preventDefault）
      //所以在这里做点击的话，需要在初始化的时候传递属性click,派发一个点击事件
      //在pc网页浏览模式下，点击事件是不会阻止的，所以可能会出现2次事件，所以为了避免2次，可以在绑定事件的时候把$event传递过去
      this.lefts = new BScroll(this.$refs.left, {
        click: true,
        // pullDownRefresh: {
        //   threshold: 30, // 下拉距离超过30px触发pullingDown事件
        //   stop: 20 // 回弹停留在距离顶部20px的位置
        // }
      });
      this.rights = new BScroll(this.$refs.right, {
        probeType: 3 //探针的效果，实时获取滚动高度
      });
      //rights这个对象监听事件，实时获取位置pos.y
      this.rights.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
      // this.lefts.on("pullingDown", () => {
      //   this.isPullingDown = true;
      //   console.log("下拉刷新");
      //   setTimeout(() => {
      //     console.log("asfsaf");
      //     // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
      //     this.scroll.finishPullDown();
      //   }, 2000);
      // });
    },
    _getHeight() {
      let rightItems = this.$refs.right.getElementsByClassName(
        "right-item-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      console.log(this.listHeight);
    },
    selectItem(index, event) {
      this.clickEvent = true;
      // this.currentNum  = index;
      // this.currentIndex = index
      //在better-scroll的派发事件的event和普通浏览器的点击事件event有个属性区别_constructed
      //浏览器原生点击事件没有_constructed所以当时浏览器监听到该属性的时候return掉
      // if(!event._constructed){
      //   return
      // }else{
      //   let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
      //   let el = rightItems[index]
      //   this.rights.scrollToElement(el, 300)
      // }
      this.rights.scrollTo(0, -this.listHeight[index], 300);
    },
    _initLeftScroll(index) {
      let menu = this.$refs.menuList;
      let el = menu[index];
      this.lefts.scrollToElement(el, 100, 0, -300);
      console.log(index);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._getHeight();
    });
  },

  computed: {
    currentIndex(index) {
      const { scrollY, listHeight } = this;
      // this.currentNum = 0;
      // for(let i=0,l=listHeight.length-1;i<l;i++){
      //   let item = listHeight[i];
      //   if(  i != l && scrollY >= item && scrollY < listHeight[i+1]  ){
      //     this.currentNum = i; break
      //   }else{
      //     this.currentNum = l;
      //   }
      // }
      // return this.currentNum
      return listHeight.findIndex((items, index) => {
        this._initLeftScroll(index);
        return scrollY >= items && scrollY < listHeight[index + 1];
      });
    }
  }
};
</script>
<style scoped>
.content {
  display: flex;
  position: absolute;
  top: 100px;
  bottom: 100px;
  width: 100%;
  overflow: hidden;
  background: #eee;
}
.left {
  flex: 0 0 80px;
  width: 80px;
  background-color: #f3f5f7;
  border: 1px solid red;
}
.left li {
  width: 100%;
  height: 100%;
  border: 1px solid green;
}
.current {
  background-color: red;
}
.left-item {
  display: block;
  width: 100%;
  height: 100px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid yellow;
}
.right {
  flex: 1;
}
.right-item li {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-bottom: 1px solid yellow;
}
* {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
