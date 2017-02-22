import Vue from 'vue';

import App from './App.vue';
import configuration from './configuration.js';
import FeedsStore from './stores/feeds';

FeedsStore.start(configuration.tourdeguet.url);

export default new Vue({
  el: '#app',
  render: h => h(App)
});
