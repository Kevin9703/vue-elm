import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import configure from './configure';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    configure,
  },
});

export default store;
