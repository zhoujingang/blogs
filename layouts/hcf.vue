<template>
  <div class="layout">
    <Layout>
      <Header class="header_style">
        <kwHeader></kwHeader>
      </Header>
      <Content class="container">
        <nuxt/>
      </Content>
      <Footer class="layout-footer-center">
        <div class="right">
          酷我音乐 - 前端组
        </div>
      </Footer>
    </Layout>
  </div>
</template>

<script>
import kwHeader from '~/components/kwHeader';
export default {
  components: {
    kwHeader
  }
}
</script>

<style lang="less" scoped>
.header_style {
  /*overflow: hidden;*/
  height: 60px;
  padding: 0 15px;
  background-color: #2b83f9;
  background-image: linear-gradient(143deg, #1D42AB, #2173DC, #1E93FF);
}
.layout{
  position: relative;
  overflow: hidden;
  background-color: #FFF;
  min-width: 1024px;
  height: 100%;
  .ivu-layout {
    height: 100%;
  }
}
.container {
  height: 100%;
}
.layout-footer-center{
  padding: 24px 0;
  margin: 0 auto;
  text-align: center;
  color: #999;
  font-size: 12px;
  .right{
    margin: 0 auto;
  }
}

</style>
