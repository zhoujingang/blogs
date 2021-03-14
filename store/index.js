const config = require('../nuxt.config').default;

export const state = () => ({
  user: null
});

export const mutations = {
  user(state, user) {
    state.user = user;
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { res, req, query, redirect, $axios, app }) {
    // const resData = await $axios.get(`${config.loginUrl}/api/sessionInfo`);
    // if (resData.code === 200) {
    //   commit('user', resData.data);
    // } else {
    //   const redirectUrl = encodeURIComponent(`http://${req.headers.host}${req.url}`);
    //   redirect(`${config.loginUrl}/login?redirectUrl=${redirectUrl}`);
    // }
  },
  setUserInfo(context, data){
    context.commit('user', data);
  }
};
