<template>
  <ul class="warp" v-if="isShow">
    <li :class="{on: item.abbr === pageAbbr}" v-for="(item, index) in cetegory" :key="index">
      <Icon :type="item.icon" size="24"/>
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapState({
        isShow: state => state.category.isShow,
        app: state => state.app.select,
        cetegory: state => state.category.list,
        pageAbbr: state => state.category.select
      })
    },
    methods: {
      changeCategory(index) {
        // const onItem = this.cetegory[index];
        // if (typeof onItem.path !== 'undefined') {
        //   this.$router.push(`/app/${this.app}/${onItem.abbr}/${onItem.path}`);
        //   this.$store.dispatch('category/changeCategory', onItem.abbr);
        //   this.$store.dispatch('menu/selectChange', '0-0');
        //   this.$store.dispatch('menu/openNameChange', '0');
        // }
      }
    }
  }
</script>

<style lang="less" scoped>
  .warp{
    user-select: none;
    width: 650px;
    overflow: hidden;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    li{
      display: inline-block;
      color: #FFF;
      opacity: .69;
      transition: all .2s ease-in-out;
      margin-right: 40px;
      position: relative;
      padding: 0 10px;
      &.on, &:hover {
        color: #fff;
        opacity: 1;
      }
      &.on:after {
          content: "";
          display: block;
          width: 100%;
          height: 4px;
          background-color: #4fe3c1;
          position: absolute;
          bottom: 0;
          left: 0;
        }
    }
  }
</style>
