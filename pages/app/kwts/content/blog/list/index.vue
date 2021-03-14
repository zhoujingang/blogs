<template>
  <div class="wrap">
    <div class="header">
      <span>博客列表管理</span
      ><Button type="primary" >录入博客</Button>
    </div>
    <Breadcrumb class="navList">
      <Breadcrumb-item class="nav" to="/app/kwts/content/danmu/config"
        >博客列表管理</Breadcrumb-item
      >
    </Breadcrumb>
    <Row class="search" type="flex" justify="start" align="middle">
      <i-select class="nav" v-model="fromData.TypeList">
        <i-option
          v-for="(item, index) in TypeList"
          :value="item.value"
          :key="index"
          >{{ item.label }}</i-option
        >
      </i-select>
      <i-input
        class="nav"
        v-model="fromData.id"
        placeholder="请输入ID"
        :clearable="true"
      ></i-input>
      <!--<i-col span="3">-->
      <!--开通时间-->
      <!--</i-col>-->
      <div class="nav">开通时间</div>
      <div class="nav">
        <Date-picker
          class="nav"
          :value="fromData.Date"
          format="yyyy/MM/dd"
          type="daterange"
          placement="bottom-end"
          placeholder="选择日期"
          style="width: 200px"
        ></Date-picker>
      </div>
      <i-button class="nav" type="primary" icon="ios-search" @click="search"
        >搜索</i-button
      >
    </Row>
    <Row class="Title" type="flex" justify="space-between" align="middle">
      <i-col class="small" :span="4">共记录{{ paging.total }}个博客</i-col>
    </Row>
    <Row class="TableBody">
      <Table
        ref="selection"
        border
        :columns="listKey"
        @on-selection-change="handleSelectRow($event)"
        :data="formatData"
      >
        <template slot-scope="{ row }" slot="address">
          <a :href="row.address" target="_blank">{{ row.address }}</a>
        </template>
      </Table>
    </Row>
    <Row class="paging" type="flex" justify="space-between" align="middle">
      <i-col :span="12">
        <Page
          :page-size="paging.pageSize"
          :current="paging.current"
          :total="paging.total"
          @on-change="updataChange"
          @on-page-size-change="updataPageSize"
          size="small"
          show-elevator
          show-sizer
        />
      </i-col>
      <i-col :span="12">
        <Row type="flex" class="butt_body" justify="end" align="middle">
          <Button @click="handleSelectAll()">全选</Button>
          <Button @click="unhandleSelectAll()">反选</Button>
          <Button
            type="error"
            :disabled="SelectList.length == 0"
            @click="BatchClose"
            >批量关闭</Button
          >
        </Row>
      </i-col>
    </Row>
  </div>
</template>

<script>
const pageSize = 10;
export default {
  name: "config",
  layout: "hscf",
  data() {
    return {
      downloadData: {
        url: "www.baidu2.com",
        icon: require("@/assets/images/tslogo.png")
      },
      result: null,
      DrawerType: false,
      paging: {
        pageSize: pageSize,
        total: 0,
        current: 1
      },
      fromData: {
        Date: [],
        TypeList: "1",
        id: ""
      },
      pd: {
        1: '畅听',
        2: '音乐盒',
        3: '畅听、音乐盒'
      },
      TypeList: [
        {
          value: "1",
          label: "歌曲ID"
        },
        {
          value: "2",
          label: "专辑ID"
        }
      ],
      query: null,
      formatData: [],
      listKey: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "博客主",
          key: "name"
        },
        {
          title: "网址",
          slot: "address"
        },
        {
          title: "rss",
          key: "rssFeed"
        },
        {
          title: "标签",
          key: "tags",
        }
      ],
      SelectList: [],
      formValidate: {}
    };
  },
  mounted() {
    this.getformatData(1, pageSize);
  },
  components: {
  },
  methods: {
    /**
     * 搜索功能
     */
    search() {
      const { TypeList, id } = this.fromData;
      let query = {};
      if (id != "") {
        if (TypeList == "2") {
          query = { term: { albumid: id } };
          this.getformatData(1, pageSize, query);
        }
        if (TypeList == "1") {
          query = { term: { musicid: id } };
          this.getformatData(1, pageSize, query);
        }

      } else {
        this.getformatData(1, pageSize);
      }
      this.query = query
    },
  
    /**
     * 开启or关闭弹幕
     */
    async openOrClose(index, type) {
      let postData = {
        doc: {
          isshow: type,
          updated: parseInt(new Date().getTime() / 1000)
        }
      };
      let msg = await this.$axios.post(
        `/danmu/kuwochangting_edit_index/_update/${this.formatData[index].music_id}`,
        postData
      );
      if (msg.result == "updated") {
        this.$set(this.formatData[index], "isshow", type);
        this.$set(
          this.formatData[index],
          "type",
          type == "online" ? "开启" : "关闭"
        );
        this.$Message.success(type == "online" ? "开启弹幕" : "关闭弹幕");
      } else {
        this.$Message.error("操作失败");
      }
      try {
        /**
         * 同步更新数据
         * @type {{isshow: *, musicId: (fromData.id|string|*), updated: number}}
         */
        const data = {
          isshow: type,
          updated: parseInt(new Date().getTime() / 1000),
          musicId: this.formatData[index].music_id
        }
        this.$danmuAsync.update(data)
      } catch (e) {

      }
    },
    /**
     * 批量关闭
     */
    async BatchClose() {

      this.$Message.warning("改功能尚未设计");
    },
    /**
     * 监听页长
     */
    updataPageSize(vel) {
      const query = this.query
      this.paging.pageSize = vel;
      this.paging.current = 1;
      this.getformatData(1, vel, query);
    },
    /**
     * 监听页码
     */
    updataChange(vel) {
      const query = this.query;
      this.paging.current = vel;
      this.getformatData(vel, this.paging.pageSize, query);
    },
    /**
     * 全选
     */
    handleSelectAll() {
      if (this.SelectList.length == this.paging.pageSize) {
        this.$refs.selection.selectAll(false);
      } else {
        this.$refs.selection.selectAll(true);
      }
    },
    /**
     * 反选
     */
    unhandleSelectAll() {
      this.SelectList = [];
      for (let key in this.$refs.selection.$refs.tbody.objData) {
        let data = this.$refs.selection.$refs.tbody.objData[key];
        if (data._isChecked) {
          data._isChecked = false;
        } else {
          data._isChecked = true;
          this.SelectList.push(this.formatData[key]);
        }
      }
    },

    /**
     * 表格选中项发生变化时就会触发
     */
    handleSelectRow(selection) {
      this.SelectList = selection;
    },
  
    /**
     * 分页器
     */
    async getformatData(from, size, query) {
    
      let res = await this.$axios.get(`/api/list`, {params: {pn: from, rn: size }});
      if (res.code === 200) {
        this.formatData = res.data.list;
        this.paging.total = res.data.count;
      } else {
        this.$Message.error("服务异常");
      }
    },
  }
};
</script>
<style scoped lang="less">
.wrap {
  padding-bottom: 50px;
  .header {
    font-size: 24px;
    display: flex;
    justify-content: space-between;
  }
  .navList {
    padding: 20px 0 20px;
    .nav {
      cursor: pointer;
    }
  }
  .search {
    height: 40px;
    line-height: 40px;
    .nav {
      margin-right: 20px;
      word-wrap: break-word;
      max-width: 140px;
    }
  }
  .Title {
    height: 35px;
    .small {
      color: #808695;
      font-size: 10px;
    }
  }
  .TableBody {
    margin-top: 10px;
  }
  .paging {
    margin-top: 40px;
  }
  .butt_body {
    button {
      margin-left: 5px;
    }
  }
}
</style>
