export const state = () => ({
  list: [
    {
      appName: '酷我听书',
      app: 'kwts',
      platform: ['android', 'apple'],
      path: 'content/danmu/resource',
      newAdd: '--',
      dau: '--'
    }
  ],
  select: ''
});

export const mutations = {
  selectApp(state, app) {
    state.select = app;
  }
}


export const actions = {
  selectApp({ commit }, app) {
    commit('selectApp', app);
  }
};
