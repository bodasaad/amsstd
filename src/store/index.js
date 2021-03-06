import Vue from 'vue';
import Vuex from 'vuex';
import studioModule from './modules/studio';
import adminModule from './modules/admin';
import Admin from '@/api/Admin';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin: adminModule,
    studio: studioModule,
  },
  state: {
    categories: [],
    url: "https://servers.ams-server.xyz",
    // url: "http://localhost:4000",
    msg: null,
    networkconnections: true,
    colWidth: 33.3,
    screenwidth: window.innerWidth,
    one: {
      left: 33.3,
      right: null,
      lastPos: null,
      min: 5
    },
    two: {
      left: 66.6,
      right: null,
      lastPos: null,
      min: 95
    },
  },
  getters: {},
  mutations: {
    msg(state, msg) {
      state.msg = msg
      setTimeout(function () { state.msg = null }, 6000);
    },

    updatecategories(state, data) {
      state.categories = data
    }
  },

  actions: {
    async  checkConnection({ state }) {

      const res = await fetch("http://info.cern.ch/")
      console.log(res);

      state.networkconnections = !state.networkconnections
    },
    async  getCategories({ commit, rootState }) {
      const res = await Admin.getCategories(rootState.url)
      !res.state && commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' })
      res.state && commit('updatecategories', res.json.categories)
      return res.state ? true : false
    }
  },

});
