export const state = () => ({
  list: [
    {
      name: '博客社区',
      abbr: 'content',
      path: '',
      icon: 'ios-book-outline'
    }
  ],
  select: 'basics',
  isShow: false
});

export const mutations = {
  onCategory(state, abbr) {
    state.select = abbr;
  },
  changeShow(state, show) {
    state.isShow = show;
  }
}

export const actions = {
  changeCategory({ commit, dispatch }, abbr) {
    commit('onCategory', abbr);
  }
};
