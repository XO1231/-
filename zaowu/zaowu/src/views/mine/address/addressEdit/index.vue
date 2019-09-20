<template>
  <div class="address-edit">
    <div class="nav">
      <!-- 返回 -->
      <img src="../../../../assets/img/icons/arr-l.png" @click="$router.push({name:'address'})" class="go-back" />
      <!-- 标题 -->
      <p class="nav-title">地址编辑</p>
    </div>
    <div class="main">
      <van-address-edit
        :area-list="areaList"
        :address-info="userInfo"
        show-delete
        @save="onSave"
        @delete="onDelete"
        @change-area="onArea"
      >
        <div slot="default">
          <van-field v-model="tag" label="标签" placeholder="家庭/公司/其他" />
        </div>
      </van-address-edit>
    </div>
  </div>
</template>

<script>

import areaList from "../../../../assets/js/area";
import "vant/lib/toast/style";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import addressApi from "@/api/zaowu/address";
export default {
  name: "AddressEdit",
  data() {
    return {
      areaList,
      tag: "",
      form: {},
      cityCode: "",
      cityStr: "",
      userInfo: {}
    };
  },
  mounted() {
    var v = this.$route.params.v;
    // console.log(v);
    if (v) {
      this.userInfo = {
        id: v.id,
        name: v.name,
        tel: v.tel,
        addressDetail: v.cityBak,
        areaCode: v.cityCode,
        isUse: v.isUse,
        cityCode: v.cityCode,
        cityStr: v.cityStr
      };
      this.tag = v.tag;
    }
  },
  methods: {
    onSave(content) {
      //   console.log(content);
      this.form = content;
      this.onSumit();
    },
    onDelete() {
      var id = this.userInfo.id;
      if (id) {
        addressApi
          .addressDel({ id })
          .then(res => {
            if (res.code == "S") {
              this.$toast.success("删除成功！");
              setTimeout(() => {
                this.$router.push({ name: "address" });
              }, 1500);
            } else {
              // Toast.fail("删除失败！");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push({ name: "address" });
      }
    },
    onArea(value) {
      this.cityCode = value[0].code + "," + value[1].code + "," + value[2].code;
      this.cityStr = value[0].name + "," + value[1].name + "," + value[2].name;
    },
    onSumit() {
      var userId = JSON.parse(localStorage.getItem("userId")),
        tag = this.tag,
        cityCode = this.cityCode,
        cityStr = this.cityStr,
        cityBak = this.form.addressDetail,
        name = this.form.name,
        tel = this.form.tel,
        api = null,
        obj = {
          userId,
          tag,
          cityCode,
          cityStr,
          cityBak,
          name,
          tel,
          isUse: 0
        };
      if (this.userInfo.id) {
        if (!this.cityCode) {
          obj.cityCode = this.userInfo.cityCode;
          obj.cityStr = this.userInfo.cityStr;
        }
        api = addressApi.addressUpdate;
        obj.isUse = this.userInfo.isUse;
        obj.id = this.userInfo.id;
      } else {
        api = addressApi.addressSave;
      }
      //   console.log(obj);

      api(obj)
        .then(res => {
          if (res.code == "S") {
            Toast.success("保存成功！");
            setTimeout(() => {
              this.$router.push({ name: "address" });
            }, 1500);
          } else {
            Toast.fail("保存失败！");
          }
        //   console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addressUpdate() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common/common.scss";

.address-edit {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .nav {
    padding: $basePadding;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    color: #000;
    background-color: #fff;
    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    position: relative;
    .nav-title {
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: #000000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .go-back {
      position: relative;
      left: -10px;
      width: 30px;
      height: 30px;
    }
  }
  .main {
    width: 100%;
    text-align: left;
    ::v-deep .van-button {
      border-width: 0;
    }
    ::v-deep .van-button--danger {
      background-color: #034c46;
    }
    ::v-deep .van-button--default {
      background-color: #f44;
      color: #fff;
    }
  }
}
</style>