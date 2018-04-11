import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import start from './actions';
import mutations from './mutations';

const state = {
  items: [],
  connected: false,
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  actions: { start },
  mutations,
});
