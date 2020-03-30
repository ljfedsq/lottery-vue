import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/common.styl";
import Vant from 'vant';
import VueAMap from 'vue-amap';
import 'vant/lib/index.css';
import { Calendar } from 'vant';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vant).use(Calendar);
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德key
  key: '7f8ec5d8688b8b04c6219e84061d958a',
  // 插件集合 （插件按需引入）
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.15'
});
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
