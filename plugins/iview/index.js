import Vue from 'vue'
import iView from 'iview'
import locale from 'iview/dist/locale/zh-CN'

import './theme.less'

export default ({app}) => {
  Vue.use(iView, {
    locale
  });
  Vue.prototype.$Message.config({
    duration: 3
  });
  app.$Message = Vue.prototype.$Message;

}
