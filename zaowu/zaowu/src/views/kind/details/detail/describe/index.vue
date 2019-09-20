<template>
  <div class="detail-describe">
    <BaseLayer>
      <template v-slot:default>
        <div class="describe-main">
          <div class="describe-make">{{good.brandId}}</div>
          <div class="describe-describe">{{good.desc}}</div>
          <img :src="good.img1" class="describe-img" />
        </div>
      </template>
    </BaseLayer>
  </div>
</template>

<script>
import BaseLayer from "@/components/BaseLayer";
import { mapState } from "vuex";

export default {
  name: "detailDescribe",
  data() {
    return {
      good: {}
    };
  },
  components: {
    BaseLayer
  },
  computed: {
    ...mapState({
      obj: state => state.car.kindDetails
    })
  },
  created() {
    this.good = this.obj.good;
    // console.log(this.$route.params);
  }
};
</script>

<style lang="scss" scoped>
.detail-describe {
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  .describe-main {
    text-align: center;
    height: 100%;
    padding-bottom: 200px;
    background: #fff;
    .describe-make {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #010e0d;
      margin-bottom: 7px;
    }
    .describe-describe {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #010e0d;
      letter-spacing: 2.7px;
      margin-bottom: 7px;
    }
    .describe-img {
      margin-top: 28.5px;
      width: 339px;
      height: 354px;
    }
  }
}
</style>