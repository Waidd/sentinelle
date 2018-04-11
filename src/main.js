import Vue from 'vue';

import App from './App.vue';
import configuration from './configuration';
import store from './stores';
import start from './stores/actions';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

export default new Vue({
  el: '#app',
  store,
  render: h => h(App),
});

start(store, configuration.tourdeguet.url);
