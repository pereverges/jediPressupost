import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import JsonCSV from 'vue-json-csv'
import store from "./store"
import VueResizeText from 'vue-resize-text';

library.add(faPlus, faMinus);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('downloadCsv', JsonCSV);
Vue.use(VueResizeText);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
