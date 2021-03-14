<template>
  <div>
    <Menu
      mode="horizontal"
      :theme="theme1"
      active-name="0"
      @on-select="routerPush">
      <MenuItem
        v-for="item in topMenu"
        :key="item.name"
        :name="item.name">
        <i class="iconfont" :class="item.icon"></i>
        <!--<Icon :type="item.icon" />-->
        {{item.title}}
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "index.vue",
    data () {
      return {
        theme1: 'light'
      }
    },
    computed: {
      ...mapState({
        currentApp(state) {
          return this.$store.state.currentApp;
        },
        topMenu(state) {
          const navApp = state.navApp;
          if (navApp && navApp.topMenu) {
            return navApp.topMenu
          } else {
            return []
          }
        }

      }),
    },
    mounted(){
    },
    methods: {
      routerPush(name) {
        const item = this.topMenu[name];
        this.$store.commit('setTopNav', item.key);
        this.$router.push(item.route);
      }
    }
  }
</script>

<style scoped>

</style>
