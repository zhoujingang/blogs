<template>
  <div class="layout">
    <Layout>
      <Header class="header_style">
        <kwHeader></kwHeader>
      </Header>
      <Layout style="height: calc(100% - 60px)" class="layout-content">
        <Sider hide-trigger class="sider-list">
            <kwMenu />
        </Sider>
        <Layout>
          <!--<div class="filter" v-if="isShow">-->

          <!--</div>-->
          <Content class="container">
            <nuxt/>
          <!--<playControl v-show="!routeTo_wkTs"></playControl>-->
          </Content>
          <Footer class="layout-footer-center">
            <div class="right">
              酷我音乐 - 前端组
            </div>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import kwHeader from '~/components/kwHeader';
import kwMenu from '~/components/kwMenu';
import playControl from '~/components/basic/playControl';
export default {
  components: {
    kwHeader,
    kwMenu,
    playControl
  },
  data() {
    return {
      routeTo_wkTs: false
    }
  },
  mounted() {
    // 酷我听书隐藏播控条
    this.routeTo_wkTs = /^\/app\/kwts/.test(this.$route.path);
  },
  computed: {
    isShow() {
      const isFq = /^app-fq/.test(this.$route.name);
      return /^app-/.test(this.$route.name) && !isFq;
    }
  },
  watch: {
    '$route'(e) {
      // 酷我听书隐藏播控条
      this.routeTo_wkTs = /^\/app\/kwts/.test(e.path);
    }
  }
}
</script>

<style lang="less" scoped>
.layout-content {
  display: flex;
  flex-direction: row;
}
.header_style {
  padding: 0 15px;
  background-color: #2b83f9;
  background-image: linear-gradient(143deg, #1D42AB, #2173DC, #1E93FF);
}
.sider-list {
  background: #FFF;
}
.filter {
  height: 56px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
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
  height: fit-content;
  padding: 20px;
  width: 100%;
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
