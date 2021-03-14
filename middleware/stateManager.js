'use strict';

export default async ctx => {
  const store = ctx.store;
  const route = ctx.route;

  // 根据当前 URL 初始化状态
  const routePathArr = route.path.split('/');
  routePathArr.shift();
  const routeName = route.name;
  // 判断当前是哪一个 app
  if (/^app-/.test(routeName)) {
    //获取 app 名字
    store.commit('app/selectApp', routePathArr[1]);
    store.commit('category/changeShow', true);
    if (routePathArr[2]) {
      store.commit('category/onCategory', routePathArr[2]);
    }
    if (routePathArr[4]) {
      const appMenu = store.state.menu[routePathArr[2]][routePathArr[1]];
      const parentIndex = appMenu.findIndex(item => item.abbr === routePathArr[3]);
      const subsetIndex = appMenu[parentIndex].pages.findIndex(item => item.path === routePathArr[4]);
      store.dispatch('menu/openNameChange', parentIndex);
      store.dispatch('menu/selectChange', `${parentIndex}-${subsetIndex}`);
    }
  } else {
    store.commit('category/changeShow', false);
  }
}
