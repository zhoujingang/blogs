import Vue from 'vue';
export default function ({app, error, $axios, isDev}) {
  const createUrl = '/bridge/kwct/v1/dmconfig/create';
  const updateUrl = '/bridge/kwct/v1/dmconfig/update/';
  const closeUrl = '/bridge/kwct/v1/dmconfig/closeMany'

  const $danmuAsync = {
    /**
     * 保存弹幕
     * @type {{create(*): void}}
     */
    create (data) {
      const { albumid, background, frontground, background_dyn, isshow, lyric,  musicid, songname, created, updated, pd } = data;
      const config = {
        albumId: albumid,
        musicId: musicid,
        background,
        frontground,
        background_dyn,
        isshow,
        lyric,
        songname,
        created,
        updated
      }
      switch (pd) {
        case 1:
          config.platform = ['ct'];
          break;
        case 2:
          config.platform = ['kw'];
          break;
        case 3:
          config.platform = ['ct','kw'];
          break;
        default:
        break;
      }
      $axios.post(createUrl, config).then((res) => {
        console.log(res)
      }).catch(err => {
      })
    },

    /**
     * 更新弹幕
     * @param data
     */
    update (data) {
      const { musicId, isshow, updated } = data;
      const url = updateUrl + musicId;
      $axios.post(url, { isshow, updated }).then((res) => {
        console.log(res)
      }).catch()
    },
    /**
     * 批量关闭
     */
    closeMany(data) {
      const { idList, date } = data;
      $axios.post(closeUrl, { ids: idList, updated: date}).then((res) => {
        console.log(res)
      }).catch()
    }
  }

  Vue.prototype.$danmuAsync = $danmuAsync;

}
