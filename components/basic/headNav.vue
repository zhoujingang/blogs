<template>
  <div class="head">
    <logo class="logo"/>
    <div class="app-top nav">
      <top-menu/>
      <div class="login-status">
        <i
          @click="openDrawer"
          class="iconfont iconwenhao_huabanfuben"></i>
        <span
          class="text"
          @click="routerPush">登录</span>
      </div>
    </div>
    <Drawer
      class="drawer"
      width="300"
      title="帮助中心"
      :closable="false"
      v-model="drawer">
      <div>
        <img
          style="width: 100%"
          class="qrcode"
          src="https://h5static.kuwo.cn/upload/image/f9f6b4d474c5e13cd9cc1bd503eb1d0d0f3baf9a436656dfd550d9dc2647e030.jpeg" alt="">
      </div>
    </Drawer>
  </div>
</template>
<script>
  import logo from '~/components/basic/logo';
  import topMenu from '~/components/basic/topMenu';
  import { mapState } from 'vuex'
  export default {
    components: {
      logo,
      topMenu
    },
    computed: {
      ...mapState({
        currentApp(state) {
          console.log(state)
          return state.currentApp;
        },
        topMenu(state) {

          const navJson = state.navJson;

          const curApp = this.currentApp;
          if(navJson[curApp]) {
            return navJson[curApp].topMenu;
          } else {
            return []
          }
        }
      })
    },
    data () {
      return {
        theme1: 'light',
        drawer: false
      }
    },
    methods: {
      openDrawer() {
        this.drawer = true;
      },
      routerPush(){
        this.$router.push('/login')
      }
    }
  }
</script>
<style lang="less" scoped>
  .head{
    height: 60px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 0px 4px -1px;
    background-color: #2b83f9;
    background-image: linear-gradient(143deg, #1D42AB, #2173DC, #1E93FF);
  }
  .logo{
    flex-shrink: 0;
  }
  .nav{
    flex: 1;
    min-width: 768px;
    flex-shrink: 0;
    margin-left: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .login-status{
    display: flex;
    align-items: center;
    .iconfont{
      color: #fff;
      font-size: 24px;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      opacity: 0.8;
      transition: transform 0.3s;
      margin-right: 23px;
      cursor: pointer;
      &:hover{
        transform: scale(1.2);
        opacity: 1;
      }
    }
    .text{
      margin-right: 23px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
    .drawer{
      padding: 0 20px;
    }
  }
</style>
