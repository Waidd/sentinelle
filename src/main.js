import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility/dist/vue-observe-visibility';

Vue.use(VueObserveVisibility);

import App from './App.vue';
import configuration from './configuration.js';
import store from './stores';
import { start } from './stores/actions';

export default new Vue({
  el: '#app',
  store,
  render: h => h(App)
});

start(store, configuration.tourdeguet.url);
