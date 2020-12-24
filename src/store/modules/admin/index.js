import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  fetching: true,
  allarticles: [],
  allprojects: [],
  allcategories:[],
  jwt: localStorage.getItem('at'),
  isAuth: false,
  msg: null
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};