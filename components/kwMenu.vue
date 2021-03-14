<template>
  <div class="warp">
    <Menu
      ref="menu"
      style="height: 100%;padding-top: 10px;"
      :active-name="activeName"
      :open-names="openName"
      width="auto"
      theme="light"
      @on-select="openPage"
    >
      <Submenu :key="index" :name="index" v-for="(item, index) in menuData">
        <template slot="title">
          <Icon :type="item.icon" size="16" />
          <span>{{item.name}}</span>
        </template>
        <MenuItem
          :key="`${index}-${i}`"
          :name="`${index}-${i}`"
          v-for="(p, i) in item.pages"
        >{{p.name}}</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      openName: state => state.menu.openName || ['0'],
      activeName: state => state.menu.select || '0-0',
      app: state => state.app.select,
      category: state => state.category.select,
      menuData: state => {
        return state.menu[state.category.select][state.app.select];
      }
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.menu.updateOpened();
      this.$refs.menu.updateActiveName();
      this.$refs.menu.$children.forEach(item => {
        this.openName.forEach(e => {
          if (e == item.name) {
            item.opened = true;
          }
        });
      });
    });
  },
  methods: {
    openPage(activeName) {
      const urlArr = [
        'app',
        this.app,
        this.category
      ];
      const indexArr = activeName.split('-');
      const dir = this.menuData[indexArr[0]].abbr || '';
      const page = this.menuData[indexArr[0]].pages[indexArr[1]].path || '';

      dir && dir !== '/' && urlArr.push(dir);
      page && page !== '/' && urlArr.push(page)
      this.$router.push(`/${urlArr.join('/')}`);
      this.$store.dispatch('menu/selectChange', activeName);
    }
  }
};
</script>

<style  scoped>
.warp {
  height: 100%;
  overflow-y: scroll;
  user-select: none;
}
>>> .ivu-menu,
.ivu-menu-item {
  font-size: 12px;
}
.ivu-menu-submenu >>> .ivu-menu-submenu-title {
  padding: 14px 19px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
>>> .ivu-menu-child-item-active:hover {
  color: #2d8cf0;
}
>>> .ivu-menu-item-selected {
  font-weight: bold;
}
>>> .ivu-menu-vertical .ivu-menu-submenu-title-icon {
  right: 10px;
}
>>> .ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):hover {
  background: #f3f3f3;
}
>>> .ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: #fff;
}
>>> .ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  background: #dcdee2;
  width: 1px;
}
>>> .ivu-menu-vertical .ivu-menu-item:hover {
  background: #f3f3f3;
  color: #657180;
}
>>> .ivu-menu-child-item-active {
  color: #2d8cf0;
}
>>> .nuxt-link-active {
  color: #657180;
}
>>> .ivu-menu-item-selected .nuxt-link-active {
  color: #2d8cf0;
}
</style>
