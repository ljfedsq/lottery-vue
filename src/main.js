import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/common.styl";
import Vant from 'vant';
import 'vant/lib/index.css';
import { Calendar } from 'vant';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vant).use(Calendar);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
