import Vue from 'vue';
import Vuex from 'vuex';
import { starWarsData } from './modules/people/starWars.module.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    starWarsData,
  },
});
