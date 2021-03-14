export const state = () => ({
  select: '0-0',
  openName: ['0']
});

export const mutations = {
  selectChange(state, activeName) {
    state.select = activeName;
  },
  openNameChange(state, index) {
    state.openName = [index];
  }
}


export const actions = {
  selectChange({ commit }, activeName) {
    commit('selectChange', activeName);
  },
  openNameChange({ commit }, index) {
    commit('openNameChange', index);
  }
};
