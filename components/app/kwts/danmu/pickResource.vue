<template>
  <div v-show="modalShow" class="popup" v-fixed @click.stop="">
    <div class="popup_content">
      <div class="popup_body">
        <Row
          class="popup_body_title"
          type="flex"
          justify="start"
          align="middle">
          <i-col :span="20">选择素材</i-col>
          <i-col :span="4" class="popup_body_title_icon">
            <Icon
              class="popup_body_title_icon_B"
              @click="modalShow = false"
              type="md-close"/>
          </i-col>
        </Row>
        <Row class="popup_body_Form" type="flex" justify="start" align="middle">
          <i-col :span="2">类型</i-col>
          <i-col :span="6">
            <RadioGroup v-model="form.type">
              <Radio label="picture">
                <span>图片</span>
              </Radio>
              <Radio label="animate">
                <span>动画</span>
              </Radio>
              <Radio label="video">
                <span>视频</span>
              </Radio>
            </RadioGroup></i-col>
          <i-col :span="2">搜索</i-col>
          <i-col :span="4">
            <Input
              v-model="form.fileName"
              placeholder=""
              class="valueType"
              :clearable="true"/></i-col>
          <i-col :span="4" :offset="1">
            <Button icon="md-search" type="primary" @click="secrchList">搜索</Button>
          </i-col>
        </Row>
        <Row class="popup_body_tab">
          <div
            class="tab"
            v-for="(item, index) in fileList"
            :key="index"
            @click="fileListNum = index">
            <div
              :span="20"
              :offset="2"
              class="tab_main"
              :class="{ active: fileListNum == index }">
              <img
                :src="item.url"
                v-if="item.rtype == 'picture'"
                alt=""/>
              <img v-else-if="item.rtype == 'video'" src="https://h5static.kuwo.cn/upload/image/f7e6cb38563982d68b20c52029d9cfb28a116779c7c3ccdd72b890e20b8f2226.jpg" alt="">
              <img src="@/assets/images/timg.jpg" v-else alt="" />
              <Icon class="icon_ative" type="md-checkmark-circle" />
            </div>
            <i-col
              :span="20"
              :offset="2"
              class="tab_small wordType"
              :title="item.name">
              {{ item.name }}
            </i-col>
          </div>
        </Row>
        <Row type="flex" justify="space-between" align="middle">
          <Page
            :page-size="pageInfo.rn"
            :current="pageInfo.pn"
            :total="pageInfo.total"
            @on-change="updataChange"/>
          <i-button
            :disabled="fileListNum == -1"
            type="primary"
            @click.native="selectResource">选择资源</i-button>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        modalShow: false,
        form: {
          type: "picture",
          fileName: ""
        },
        pageInfo: {
          rn: 12,
          pn: 1,
          total: 0
        },
        fileList: [],
        fileListNum: -1,
      }
    },
    directives: {
      fixed: {
        // inserted 被绑定元素插入父节点时调用
        inserted() {
          let scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
          document.body.style.cssText +=
            "position:fixed;width:100%;top:-" + scrollTop + "px;";
        },
        // unbind 指令与元素解绑时调用
        unbind() {
          let body = document.body;
          body.style.position = "";
          let top = body.style.top;
          document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
            top
          );
          body.style.top = "";
        }
      }
    },
    mounted() {
      this.getResourceList()
    },
    methods: {
      /**
       * 弹出层搜索
       */
      secrchList() {
        this.pageInfo.pn = 1;
        this.getResourceList();
      },

      /**
       * 监听分页变化
       */
      updataChange(vel) {
        this.fileListNum = -1;
        this.pageInfo.pn = vel;
        this.getResourceList();
      },
      /**
       * 选择资源
       */
      selectResource() {
        const data = JSON.parse(JSON.stringify(this.fileList[this.fileListNum]));
        this.$emit('chooseImg', data);
        this.modalShow = false;
        this.fileListNum = -1;
        this.form = {
          type: "picture",
          fileName: ""
        }
      },
      async getResourceList() {
        const { type, fileName } = this.form;
        let postData  = {
          isshow: "online",
          rtype: type,
          pn: this.pageInfo.pn,
          rn: this.pageInfo.rn,
          name: fileName
        } ;
        let res = await this.$axios.get(
          `/bridge/kwct/v1/dmresource/list`, {
            params: postData
          }
        );
        if (res.code !== 0) {
          this.$Message.error("数据网络超时");
        }
        this.fileList = res.data.list;
        this.pageInfo.total = res.data.count;
      },
    }
  };
</script>

<style lang="less" scoped>
  .popup {
    font-family: PingFangSC-Medium, PingFang SC;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    .popup_content{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .popup_body {
      width: 800px;
      min-height: 400px;
      background: #fff;
      border-radius: 8px;
      padding: 10px;
      box-sizing: border-box;
      &.json {
        width: 300px;
        .popup_body_curl {
          padding-top: 20px;
        }
        .popup_body_text {
          padding: 20px 12px;
          font-size: 12px;
          text-align: left;
        }
        .popup_body_copy {
          padding-top: 10px;
          font-size: 12px;
          text-align: center;
          cursor: pointer;
        }
        .popup_body_butt {
          padding-top: 20px;
        }
      }
      .popup_body_title {
        font-size: 18px;
        height: 45px;
        padding: 0 10px;
        .popup_body_title_icon {
          font-size: 18px;
          text-align: right;
          .popup_body_title_icon_B {
            cursor: pointer;
          }
        }
      }
      .popup_body_Form {
        font-size: 14px;
        height: 45px;
        padding: 0 10px;
      }
      .popup_body_tab {
        min-height: 320px;
        display: flex;
        flex-wrap: wrap;
        .tab {
          width: 114px;
          flex-shrink: 0;
          margin: 8px;
          // width: 160px;
          .tab_main {
            overflow: hidden;
            position: relative;
            width: 100%;
            padding-bottom: 100%;
            background-color: #fff;
            position: relative;
            border-radius: 8px;
            border: 1px solid #f2f2f2;
            cursor: pointer;
            img {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              max-width: 100%;
              max-height: 100%;
            }
            &.active {
              border-color: #d1efd1;
              background-color: #d1efd1;
              .icon_ative {
                display: block;
              }
            }
            .icon_ative {
              color: #2d8cf0;
              position: absolute;
              bottom: 5px;
              right: 5px;
              transform: translate(-50%, -50%);
              display: none;
            }
          }
          .tab_small {
            margin-top: 5px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }

  }
</style>
