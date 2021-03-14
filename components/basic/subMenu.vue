<template>
  <div>
    <Menu
      :width="'226px'"
      :theme="theme2"
      :active-name="active"
      @on-select="routerPush"
      @on-open-change="routerOpen">
      <template
        v-for="item in sideMenu">
        <Submenu
          v-if="item.submenu"
          :key="item.name"
          :name="item.name">
          <template slot="title">
            <Icon :type="item.icon" />
            {{item.title}}
          </template>
          <MenuItem
            v-for="_item in item.submenu"
            :key="_item.name"
            :name="_item.name">{{_item.title}}</MenuItem>
        </Submenu>
        <MenuItem
          v-else
          :name="item.name"><Icon :type="item.icon" />{{item.title}}</MenuItem>
      </template>
    </Menu>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        theme2: 'light',
        active: ''
      }
    },
    computed: {
      ...mapState({
        sideMenu(state) {
          const navApp = state.navApp;
          const topNav = state.topNav;
          if (navApp && topNav) {
            return navApp.sideMenu[topNav]
          } else {
            return []
          }
        }

      })
    },
    mounted() {
      this.active = this.$route.path
    },
    methods: {
      routerOpen(name) {
        console.log(name)
      },
      routerPush(name) {
        this.$router.push(name)
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
