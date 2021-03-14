<template>
  <Dropdown
    @on-visible-change="openList"
    trigger="custom"
    :visible="isOpen">
    <button
      @click="clickList"
      class="platform">
      <span class="plat-inn">
        <i v-for="(item, index) in platforms"
          :key="item.id"
          v-show="choosePlats[index]"
          class="iconfont"
          :class="item.icon"></i>
      </span>

      <Icon class="arrow" type="ios-arrow-down"></Icon>

    </button>
    <DropdownMenu
      slot="list">
      <div class="menu">
        <div class="check-group">
          <div v-for="(item, index) in platforms"
            :key="item.id"
            class="item">
            <Checkbox style="display: flex;align-items: center; flex-direction: row-reverse" v-model="choosePlats[index]">
              <i class="iconfont"
                :class="item.icon"></i>
            </Checkbox>
          </div>
        </div>
        <div class="btns">
          <Button
            type="primary" size="small"
            @click="selectPlat">确定</Button>
          <Button
            size="small"
            @click="cancle">取消</Button>
        </div>
      </div>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "platform",
    data() {
      return {
        isOpen: false,
        choosePlats: [],
        cashChoosePlats: []
      }
    },
    computed: {
      ...mapState({
        currentApp(state) {
          return state.app.select
        },
        platforms(state) {
          const currentApp = this.currentApp;
          if (currentApp) {
            return state.app[currentApp] && state.app[currentApp].platforms
          } else {
            return []
          }
        }
      })
    },
    watch: {
      choosePlats: {
        handler (newVal, oldVal) {
          if (newVal.length > 0) {
            const noplat = newVal.every((item) => {
              return !item
            });
            if (noplat) {
              this.$Message.warning('请至少选择一个平台！');
            }
          }
        },
        deep: true
      }
    },
    created() {
      if (process.client) {
        const platforms = this.platforms;
        const choosePlats = [];
        if (platforms.length > 0) {
          platforms.forEach((item, index) => {
            choosePlats[index] = true
          });
          this.choosePlats = choosePlats
        }
      }
    },
    methods: {
      clickList() {
        this.isOpen = !this.isOpen;
      },
      openList(val) {
        if (val) {
          this.cashChoosePlats = this.choosePlats.concat([]);

        }
      },
      selectPlat() {
        const choosePlats = this.choosePlats;
        const list = [];
        if (choosePlats.length > 0) {
          const noplat = choosePlats.every((item) => {
            return !item
          });
          if (noplat) {
            this.$Message.warning('请至少选择一个平台！');
            return
          }
          choosePlats.forEach((item, index) => {
            if (item) list.push(this.platforms[index].id)
          })
          this.$emit('confirm', list.join(','))

        }
        this.isOpen = !this.isOpen;
      },
      cancle() {
        this.choosePlats = this.cashChoosePlats.concat([]);
        this.isOpen = !this.isOpen;

      }

    }
  }
</script>

<style lang="less" scoped>
  .platform{
    display: flex;
    align-items: center;
    justify-content: space-between;
    outline: none;
    min-width: 120px;
    width: 100%;
    height: 36px;
    padding: 3px 12px 3px 3px!important;
    border-radius: 32px;
    cursor: pointer;
    color: #495060;
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: #dddee1;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    &:hover{
      border-color: #3091f2;
      .arrow{
        color: #3091f2;
      }
    }
    &:focus{
      box-shadow: 0 0 0 2px rgba(45,140,240,.2);
      .arrow{
        color: #3091f2;
      }
    }
    .plat-inn{
      display: flex;
      align-items: center;
    }
  }
  .iconfont{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #3091f2;
    width: 28px;
    height: 28px;
    border:  1px solid #3091f2;
    border-radius: 50%;
    margin-right: 6px;
  }
  .menu{
    min-width: 120px;
    .check-group{
      font-size: 14px;
      .item{
        display: flex;
        height: 30px;
        margin: 10px 6px;
        cursor: pointer;
        font-size: 12px;
      }
    }
    .btns{
      margin: 2px;
      text-align: center;
    }
  }
</style>
