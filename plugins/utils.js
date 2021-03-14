import Vue from 'vue';
import Qs from 'qs'
export default ({ app }) => {
  // 设置cookie
  const setCookie = (name, val, day) => {
    const days = day;
    const exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(val) + ';expires=' + exp.toGMTString() + ';path=/;domain=.kuwo-inc.com';
  }
  // 获取cookie
  const getCookie = (cookie_name) => {
    const allcookies = document.cookie;
    let cookie_pos = allcookies.indexOf(cookie_name + '=');
    if (cookie_pos != -1) {
      cookie_pos = cookie_pos + cookie_name.length + 1;
      let cookie_end = allcookies.indexOf(";", cookie_pos);
      if (cookie_end == -1) {
        cookie_end = allcookies.length;
      }
      return unescape(allcookies.substring(cookie_pos, cookie_end));
    }
    return null;
  }

  // 服务端获取cookie
  const serGetCookie = (cookie_name, req) => { // 服务端获取cookie
    if (req.headers && req.headers.cookie) {
      const allcookies = req.headers.cookie;
      let cookie_pos = allcookies.indexOf(cookie_name + '=');
      if (cookie_pos != -1) {
        cookie_pos = cookie_pos + cookie_name.length + 1;
        let cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1) {
          cookie_end = allcookies.length;
        }
        return unescape(allcookies.substring(cookie_pos, cookie_end));
      }
      return '';
    } else {
      return '';
    }
  };
  // 删除cookie
  const delCookie = (cookie_name) => {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const val = getCookie(cookie_name);
    if (val != null) {
      document.cookie = cookie_name + '=' + val + ';expires=' + exp.toGMTString() + ';path=/;domain=.kuwo-inc.com'
    }
  }


  //获取时间 格式 年-月-日
  Vue.prototype.$getDate = () => {
    const t = new Date(),
      y = t.getFullYear(),
      m = t.getMonth() + 1,
      d = t.getDate(),
      date = y + '-' + m + '-' + d;
    return date;
  };
  const formatDate = (date) => {
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  function formatDate1(date, fmt) {
    var currentDate = new Date(date);
    var o = {
      "M+": currentDate.getMonth() + 1, //月份
      "d+": currentDate.getDate(), //日
      "h+": currentDate.getHours(), //小时
      "m+": currentDate.getMinutes(), //分
      "s+": currentDate.getSeconds(), //秒
      "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度
      "S": currentDate.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  Vue.prototype.$mFormat = (m) => {
    const sec = Math.floor(m / 60);
    const second = sec > 9 ? sec : '0' + sec;
    const min = Math.floor(m % 60);
    const minute = min > 9 ? min : '0' + min;
    return second + ':' + minute;
  }
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  Vue.prototype.$setCookie = setCookie;
  Vue.prototype.$getCookie = getCookie;
  Vue.prototype.$delCookie = delCookie;
  Vue.prototype.$formatDate = formatDate;
  Vue.prototype.$formatDate1 = formatDate1;
  Vue.prototype.$formatNumber = formatNumber;
  app.$serGetCookie = serGetCookie;
  app.$formatDate = formatDate;
  app.$formatDate1 = formatDate1;
  app.$formatNumber = formatNumber;
  Vue.prototype.$qs = Qs  //全局加载
  // inject('$serGetCookie', serGetCookie)
}
