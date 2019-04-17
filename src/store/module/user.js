import {SET_UNION_ID, SET_LOGIN_STATUS} from '../mutation-types';
const state = {
  unionId: '',
  isLogin: false
};
const actions = {
  setUnionId({commit}, unionId) {
    commit(SET_UNION_ID, unionId);
  },
  setLoginStatus({commit}, unionId) {
    commit(SET_LOGIN_STATUS, unionId);
  }
};
const mutations = {
  [SET_UNION_ID](state, id) {
    state.unionId = id;
    id && localStorage.setItem('userUnionId', id);
  },
  [SET_LOGIN_STATUS](state, isLogin) {
    state.isLogin = isLogin;
  }
};
const getters = {
  unionId: state => state.unionId || localStorage.getItem('userUnionId'),
  isLogin: state => state.isLogin
};
export default {
  state,
  actions,
  mutations,
  getters
};
