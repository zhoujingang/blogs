'use strict';
const config = require('../nuxt.config').default;
export default async ({ app, store, route, redirect, $axios, query }) => {
  const user = store.state.user;
  // if (process.client) {
  //   if (route.name === 'notallow') {
  //     return
  //   }
  //   if (user && user._id) {
  //     console.log('========')
  //     if (user.sudo == 1 || user.access.includes(10000)) {

  //     } else {
  //       app.$Message.error('暂无权限～');
  //       redirect('/notallow')
  //     }

  //   } else {
  //     const redirectUrl = encodeURIComponent(window.location.href);
  //     redirect(`${config.loginUrl}/login?redirectUrl=${redirectUrl}`)
  //   }
  // }
}
