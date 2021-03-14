<template>
  <div class="warp">
    <div class="info-pic"></div>
    <h1>暂无权限!!</h1>
    <p>
      如果有需求可以发送邮件 <i style="color: red">fe.list@kuwo.cn</i> 联系开发哥哥给你“安排上”
    </p>
    <div class="link">
      <Button type="primary" @click="goBack">返回上一页面</Button>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'hcf',
    methods: {
      goBack() {
        window.history.back();
      }
    }
  }
</script>


<style lang="less" scoped>
  .warp {
    padding-top: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
  .info-pic {
    background-image: url('~assets/images/uninstall.png');
    background-size: contain;
    background-position-x: -20px;
    background-repeat: no-repeat;
    height: 300px;
    width: 400px;
  }
  .bg-img {
    width: 400px;
  }
  .link {
    padding: 15px 0;
  }
</style>
