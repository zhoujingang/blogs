<template>
  <div class="warp">
    <Card :bordered="false">
        <Row type="flex" slot="title" justify="center" align="middle">
            <Col span="3">
              <img src="~/assets/images/logo.svg" style="width: 40px; height: 40px">
            </Col>
            <Col span="21">
              <h1>酷我音乐运营管理系统</h1>
            </Col>
        </Row>
        <div class="login_box">
          <div id="login_wechat_work"></div>
        </div>
    </Card>
  </div>
</template>

<script>
  export default {
    // layout: 'hcf',
    head: {
      script: [
        {
          src: '//rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js'
        }
      ]
    },
    asyncData({ env }) {
      const { weChatWork } = env;
      return { weChatWork };
    },
    mounted() {
      const url = window.location.origin;
      window.WwLogin({
        "id" : "login_wechat_work",
        "appid" : this.weChatWork.corpid,
        "agentid" : this.weChatWork.agentid,
        "redirect_uri" : encodeURIComponent('http://api.dev.kuwo-inc.com' + '/api/kuwo/v1/login/wechat-work?' + `callbackUrl=${encodeURIComponent(url)}`),
        "state" : "ugc",
        "href" : "",
      });
    }
  }
</script>

<style lang="less" scoped>
  .warp{
    width: 440px;
    padding: 30px;
    background: #FFF;
    margin: 200px auto 0 auto;
    color: rgba(29,36,54,.8);
  }
  .login_box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
