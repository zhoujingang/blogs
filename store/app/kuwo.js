export const state = () => ({
  selectList: null,
  platforms: [        //平台类型
    {
      icon: 'iconandroid',
      id: 'ar',
    },
    {
      icon: 'iconios',
      id: 'ip'
    },
  ],
});

export const mutations = {
  setSelectList (state, channel) {
    state.selectList = channel;
  }
};

export const getters = {

};

export const actions = {
  async getSelectList({commit}) { //  获取下拉数据
    const res = await this.$axios.get('/api/kuwo/list');
    if (res.code == 200) {
      commit('setSelectList', res.data)
    } else {
      this.app.$Message.error(res.msg || '获取枚举数据失败！');
    }

  },
};
