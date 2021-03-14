<template>
  <div class="warp">
    <Row type="flex" justify="space-between">
      <Col span="21" class-name="nav">
        <nuxt-link to="/">
          <div class="logo-info">
            <div class="logo">
                <img src="~/assets/images/logo.svg" alt="">
            </div>
            <div class="site-name">
              <div>在野博客录入</div>
              <div>Together!</div>
            </div>
          </div>
        </nuxt-link>
        <Category/>
      </Col>
      <Col>
        <Row type="flex" justify="end" align="middle" :gutter="25" :style="{paddingRight: '20px'}">
          <Col>
            <div style="height: 50px">
              <img class="tools_button" src="~/assets/images/q.svg" alt="" @click="help = true">
            </div>
          </Col>
          <Col>
            <div class="avatar-out">
              <Avatar :src="userinfo && userinfo.avatar" />
              <ul>
                <li class="info">
                  <div class="left">
                    <img class="avatar" :src="userinfo && userinfo.avatar" alt="">
                  </div>
                  <p class="name">
                    {{userinfo.name}}({{userinfo.userid}})
                  </p>
                </li>
                <li
                  @click="loginOut">
                  <div class="left">
                    <i class="iconfont icontuichudenglu"></i>
                  </div>
                  <p class="text">退出登录</p>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
    <Drawer width="350" :closable="false" v-model="help">
        <Divider>系统版本</Divider>
        <p>version: 1.0.0</p>
        <Divider>社区</Divider>
        <div>
          <Row type="flex" :gutter="20" justify="center">
            <Col span="10" style="">
              <img class="img" src="~/assets/images/qq_qun.png" alt="" srcset="">
            </Col>
            <Col span="10">
              <img class="img" src="~/assets/images/qq_qun.png" alt="" srcset="">
            </Col>
            <Col span="10" class-name="txt">
              <img class="logo_img" src="~/assets/images/qq.svg" alt="" srcset=""> 加入QQ群
            </Col>
            <Col span="10" class-name="txt"><img class="logo_img" src="~/assets/images/work_weixin.svg" alt="" srcset="">加入企业微信群</Col>
          </Row>
        </div>
    </Drawer>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Category from './Category';
  export default {
    components: {
      Category
    },
    data () {
      return {
        help: false
      }
    },
    computed: mapState({
      userinfo: state => state.user || {}
    }),
    created() {
      // console.log(this.userinfo)
    },
    methods: {
      async loginOut() {
        let res = await this.$axios.get(
          `/api/loginOut`
        );
        if (res.code === 200) {
          window.location.href = window.location.origin
        } else {
          this.$Message.error('退出失败！')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .warp {
    user-select: none;
  }
  .img {
    width: 120px;
    height: 120px;
  }
  .logo_img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .txt {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tools_button {
    width: 22px;
    height: 22px;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .logo-info {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      cursor: pointer;
      width: 40px;
      height: 40px;
      margin: 0 10px;
      img{
        width: 100%;
        height: 100%;
        transition: all 0.6s;
      }
      img:hover {
        transform: scale(1.1);
      }
    }
    .site-name {
      min-width: 165px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      div:first-child {
        font-size: 16px;
        color: #FFF;
        height: 25px;
        line-height: 25px;
      }
      div:last-child {
        height: 15px;
        line-height: 15px;
        color: rgba(255, 255, 255, 0.75);
        opacity: 0.85;
      }
    }
  }
  .avatar-out{
    position: relative;
    z-index: 999;
    &:hover {
      ul{
        display: inherit;
      }
    }
    ul{
      display: none;
      position: absolute;
      width: 274px;
      top: 64px;
      right: 5px;
      background: #FFFFFF;
      box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      z-index: 99999999;
      li{
        display: flex;
        list-style: none;
        /*cursor: default;*/
        height: 64px;
        line-height: 64px;
        border-bottom: solid 1px rgba(23, 35, 61, 0.1);
        cursor: pointer;
        &.info{
          cursor: default;
        }
        &:hover{
          background: rgba(23, 35, 61, 0.03);
        }
      }
      .left{
        width: 68px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 36px;
          border-radius: 50%;
        }
        .iconfont{
          font-size: 24px;
          transform: perspective(1px) translateZ(0);
          box-shadow: 0 0 1px rgba(0, 0, 0, 0);
          transition-duration: 0.3s;
          color: rgba(23, 35, 61, 0.55);
          &:hover{
            transform: scale(1.1);
            color: #17233d
          }
        }
      }
      .name{
        flex: 1;
        font-size: 14px;
        color: #17233D;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .text{
        flex: 1;
        font-size: 14px;
        color: rgba(23, 35, 61, 0.75);
      }
    }
  }
  .nav {
    display: flex;
  }
</style>
