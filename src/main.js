import Vue from 'vue';

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
