import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 初始化 html的font-size
import 'lib-flexible';
// 初始化 css样式
import '@/assets/style/common/reset.scss'

import "vant/lib/stepper/style";
import "vant/lib/submit-bar/style";
import "vant/lib/radio-group/style";
import "vant/lib/radio/style";
import "vant/lib/cell/style";
import "vant/lib/cell-group/style";
import 'vant/lib/switch/style';
import 'vant/lib/checkbox/style';
import 'vant/lib/checkbox-group/style';
import "vant/lib/toast/style";
import "vant/lib/popup/style";
import "vant/lib/address-edit/style";
import "vant/lib/field/style";

import {
  Stepper,
  SubmitBar,
  AddressEdit,
  Field,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Toast,
  Popup
} from "vant";
Vue.use(Stepper)
  .use(SubmitBar)
  .use(RadioGroup)
  .use(Radio)
  .use(Cell)
  .use(CellGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Switch)
  .use(Popup)
  .use(Field)
  .use(AddressEdit)
  .use(Toast);
// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')