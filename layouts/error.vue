<template>
  <div class="error">
    <div
      v-if="error.statusCode == 404"
      class="">
      <img
        src="~assets/images/bg-404.png"
        alt="">
      <p class="text">页面去了其它星球，{{ time }}s之后跳转到首页</p>
      <p>
        <nuxt-link
          class="btn"
          to="/menu/appList">立即回到首页</nuxt-link>
      </p>
    </div>
    <div
      v-else
      class="">
      <img
        class="nodata_img"
        src="~assets/images/data_grey.png"
        alt="">
      <p class="text">抱歉，暂无相关数据，重新刷新页面试试吧</p>
      <p>
        <a
          class="btn"
          href="javascript:;"
          @click="reload">刷新页面</a>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    layout: 'hcf',
    props: {
      error: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        time: 5,
        timer: null,
        code: '',
      }
    },
    mounted() {
      const code = this.error.statusCode;
      // this.code = code;
      if (code === 404) {
        clearInterval(this.timer);
        this.timer = setInterval(()=> {
          this.time--;
          if (this.time === 1) {
            clearInterval(this.timer);
            this.$router.push('/');
          }
        }, 1000)
      }
    },
    destroyed() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    methods: {
      reload() {
        window.location.reload();
      }
    },

  }
</script>
<style lang="less" scoped>
  .error{
    text-align: center;
    color: #c81623;
    padding: 100px;
    .text{
      margin-top: 20px;
      color: #999;
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
    }
    .btn{
      display: inline-block;
      margin-top: 30px;
      width: 182px;
      height: 40px;
      line-height: 40px;
      border-radius: 22px;
      background: #3091f2;
      color: #fff;
      box-shadow:0px 4px 10px 0px #3091f2;
    }
    .nodata_img{
      width: 260px
    }
  }
</style>
