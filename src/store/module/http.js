import {SET_LOADING} from '../mutation-types';

const state = {
  state: false,
  text: '加载中···'
};

const mutations = {
  [SET_LOADING](state, data) {
    state.state = data.state;
    state.text = data.text || '加载中···';
  }
};
const actions = {
  setLoading({commit}, store) {
    commit(SET_LOADING, store);
  }
};
export default {
  state,
  mutations,
  actions
};
