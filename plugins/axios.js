import Qs from 'qs';
export default function ({app, error, $axios, isDev, redirect , req}) {
  if (process.client) {
    $axios.defaults.baseURL = window.location.origin;
  }
  if (process.server) {
    $axios.defaults.baseURL = `http://127.0.0.1:${process.env.NUXT_PORT || 80}`;

  }
  $axios.action = function() {}
  $axios.onRequest(config => {
    if (isDev) { // 开发环境才开始输出
      console.log('Making request to ' + config.url);
    }
  })

  $axios.onResponse(res => {
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      console.log(res)

      process.client && app.$Message.error(res.data.message ||'系统忙，请稍后再试～');
      return res.data;
    }
  });

  $axios.onError(e => {
    // ctx.redirect('/');
    if (process.client) {
      error({statusCode: e.status})
      app.$Message.error(e.message ||'系统忙，请稍后再试～');
      return
    }
    return error({statusCode: e.status})

  })
}
