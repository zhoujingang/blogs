<template>
  <div class="warp">
    <div class="header-tab">
      <Menu mode="horizontal" active-name="1" class="menu">
        <MenuItem name="1" to="/">产品中心</MenuItem>
      </Menu>
    </div>
    <div class="app-list">
      <Table minWidth="1010px" disabled-hover :columns="columns" :data="data" no-data-text="未配置应用">
        <template slot-scope="{ row, index }" slot="appName">
          <div @click="openApp(index)">
            <Row type="flex" justify="start" align="middle" class-name="appName">
              <Col style="font-size: 0;margin-right: 5px">
                <img v-if="row.app === 'kwts'" src="~/assets/images/tslogo.png" style="width: 30px; height: 30px" alt="">
              </Col>
              <Col>
                <span>{{row.appName}}</span>
              </Col>
            </Row>
          </div>
        </template>
        <template slot-scope="{ row, index }" slot="platform">
            <Icon :type="'logo-' + item" size="25" v-for="item in row.platform" :key="item"/>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  layout: 'hcf',
  asyncData({ redirect }) {
    redirect('/app/kwts/content/blog/list')
  },
  computed: {
    ...mapState({
      data(state) {
        const user = state.user;
        const data = state.app.list.concat([]);
        if (user && user.userid === 'ZhangXiaoDong') {
          return data.filter((item) => {
            return item.app == 'kweb'
          })
        }
        return state.app.list
      }
      // data: state => state.app.list
    })
  },
  data() {
    return {
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '应用名称',
          slot: 'appName',
          width: 150
        },
        {
          title: '应用平台',
          slot: 'platform',
          minWidth: 150,
        },
        {
          title: '新增用户',
          key: 'newAdd',
          minWidth: 150,
          align: 'right'
        },
        {
          title: '活跃用户数',
          key: 'dau',
          minWidth: 150,
          align: 'right'
        }
      ]
    }
  },
  methods: {
    openApp(index) {
      const onItem = this.data[index];
      if (onItem.app && onItem.path) {
        this.$router.push(`/app/${onItem.app}/${onItem.path}`);
        this.$store.dispatch('app/selectApp', onItem.app);
        this.$store.dispatch('menu/selectChange', '0-0');
      }
    }
  }
}
</script>

<style scoped>
>>>.ivu-table th {
  background: #FFF;
}
>>>.ivu-table-wrapper{
  border-left: none;
  border-right: none;
}
>>>.ivu-table:before{content:'';width:100%;height:0px;position:absolute;left:0;bottom:0;z-index:1}
>>>.ivu-table:after{content:'';width:0px;height:100%;position:absolute;top:0;right:0;z-index:3}

.header-tab {
  background: #FFF;
  padding-left: 2%;
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #fff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.menu {
  height: 46px;
  line-height: 46px;
  position: inherit;
}
.app-list {
  padding: 40px 100px;
}
.appName {
  color: #2d8cf0;
  cursor: pointer;
}
</style>
