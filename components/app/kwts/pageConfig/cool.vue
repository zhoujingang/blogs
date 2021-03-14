<template>
  <div class="cool">
    <!-- <div class="list">
      <div class="item" v-for="(item, index) in data" :key="index">
        <img :src="item.cover" alt="">
        <div class="item-cover" v-if="!show">
          <div class="item-btn">
            <Button @click="edit(index)">编辑</Button>
            <Button @click="del(index)">删除</Button>
          </div>
        </div>
      </div>
      <div class="item item-add" @click="add" v-if="!show"><Icon type="ios-add-circle-outline"/></div>
    </div> -->
    <Form>
      <FormItem label="模块标题" :label-width="70">
        <Input v-model="data.title" placeholder="模块标题" style="margin-bottom: 40px;"/>
      </FormItem>
    </Form>

    <div class="card">
      <div class="card-scroll" v-if="!preview">
        <div class="card-item" v-for="(item, index) in data.data" :key="index">
          {{item.album}} <span style="color: #999">{{item.musicName}}</span>
          <div class="card-cover" v-if="!show">
            <!-- <div @click="edit(index)">预览</div> -->
            <div @click="edit(index)">编辑</div>
            <div @click="del(index)">删除</div>
          </div>
        </div>
      </div>
      <div class="card-scroll preview" v-else>
        <div class="preview-item" v-for="(item, index) in data.data" :key="index">
          <img :src="item.cover" alt="" style="max-width: 100px">
        </div>
      </div>
      <div style="margin-top: 20px;">
        <Button type="primary" @click="add" :disabled="show">添加</Button>
        <Button type="success" @click="preview = !preview" style="width: 80px;">{{preview ? '取消预览' : '预览'}}</Button>
      </div>
    </div>

    <Form
      v-if="show"
      :label-width="80"
      :model="formData"
      ref="form"
      class="form"
      style="margin-top: 20px;">
      <FormItem label="封面" prop="cover" required>
        <!-- <uploadPic v-model="formData.cover"/> -->
        <Upload
          action="/bridge/basic/upload?https=1"
          :show-upload-list="false"
          :on-success="uploadSuccess">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </FormItem>
      <FormItem label="封面地址" required prop="cover">
        <Input v-model="formData.cover"/>
      </FormItem>
      <FormItem label="单曲id" required prop="id">
        <Input @on-blur="getMusicInfo" v-model="formData.id" />
      </FormItem>
      <FormItem label="单曲信息" required prop="id">
        <Input disabled v-model="formData.musicName"/>
      </FormItem>
      <FormItem label="专辑Id" required prop="albumId">
        <Input disabled v-model="formData.albumId"/>
      </FormItem>
      <FormItem label="专辑名称" required prop="album">
        <Input v-model="formData.album"/>
      </FormItem>
      <FormItem label="介绍" required prop="rec">
        <Input v-model="formData.rec"/>
      </FormItem>
      <FormItem label="tag" prop="tag">
        <Input v-model="formData.tag"/>
      </FormItem>
      <FormItem label="标签背景" prop="tagType" v-if="formData.tag">
        <!-- 独家0自制1 -->
        <!-- <Select v-model="formData.tagType">
          <Option :value="0">独家</Option>
          <Option :value="1">自制</Option>
        </Select> -->
        <!-- <RadioGroup v-model="formData.tagType">
          <Radio :label="item" border v-for="(item, index) in tag" :key="index">
            <img :src="item" alt="" style="width: 40px;">
          </Radio>
        </RadioGroup> -->
        <div class="tag">
          <div
            class="tag-item"
            v-for="(item, index) in tag"
            :key="index"
            :class="[isTagActive(item, formData.tagType) ? 'active' : '']"
            @click="selectTag(item)">
            <img :src="item" alt="">
          </div>
        </div>
      </FormItem>
      <FormItem>
        <Button @click="cancel">取消</Button>
        <Button @click="empty">清空</Button>
        <Button type="primary" @click="submit" style="width: 120px;">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import uploadPic from './upload';
export default {
  name: 'Cool',
  components: {
    uploadPic
  },
  props: {
    currentData: { type: Object }
  },
  data() {
    return {
      tag: [
        'https://h5static.kuwo.cn/tsConfig/1604656354821.png',
        'https://h5static.kuwo.cn/tsConfig/1604656373087.png'
      ],
      preview: false, // 预览
      data: [], // list
      formData: {},
      show: false, // show formData
      editType: 'add', // formdata类型， add or edit
      editIndex: null, // edit item index
    };
  },
  mounted() {
    // this.data.data = JSON.parse(JSON.stringify(this.currentData || "[]"));
    this.data = JSON.parse(JSON.stringify(this.currentData || {}));
  },
  methods: {
    isTagActive(d1, d2) {
      d1 = d1 || '';
      d2 = d2 || '';
      let reg = /^(https|http)(.*)$/gim
      d1 = String(d1).replace(reg, '$2');
      d2 = String(d2).replace(reg, '$2');
      return d1 === d2;
    },
    // 选择标签
    selectTag(data) {
      if (this.formData.tagType === data)
        this.$set(this.formData, 'tagType', '');
      else
        this.$set(this.formData, 'tagType', data);
    },
    uploadSuccess(data) {
      this.$set(this.formData, 'cover', data.url);
    },
    del(index) {
      this.data.data.splice(index, 1);
    },
    edit(index) {
      this.editType = 'edit';
      this.formData = this.data.data[index];
      this.show = true;
    },
    add() {
      this.show = true;
      this.editType = 'add';
    },
    cancel() {
      this.show = false;
      this.formData = {};
    },
    empty() {
      this.formData = {};
    },
    async getMusicInfo() {
      const id = this.formData.id;
      const res = await this.$axios.get(`/bridge/kwct/v1/album/music/${id}`);
      if (res.code == 0) {
        this.$set(this.formData, 'musicName', `${res.data.musicName}`);
        this.$set(this.formData, 'albumId', `${res.data.albumId}`);
        this.$set(this.formData, 'album', `${res.data.album}`);
        this.$set(this.formData, 'cover', res.data.cover);

      } else {
        this.$set(this.formData, 'musicName', '尚未查询到歌曲信息');
        this.$set(this.formData, 'albumId', '');
      }
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false;
        if (this.editType === 'add') {
          this.data.data.push(this.formData);
        }
        else {
          this.data.data[this.editIndex] = this.formData;
        }
        this.formData = {};
        this.show = false;
      })
    },
    postData() {
      console.log(this.data);
      return this.data;
    }
  },
}
</script>
<style lang="less" scoped>
.cool {
  padding: 30px;
  .form {
    // box-shadow: 0 0 10px 10px #eee;
    // padding: 20px;
    // border-radius: 10px;
  }
  .list {
    display: flex;
    width: 100%;
    overflow-x: auto;
    .item {
      width: 100px;
      height: 140px;
      box-shadow: 0 0 10px 10px #fafafa;
      cursor: pointer;
      margin-right: 10px;
      margin-top: 10px;
      position: relative;
      border-radius: 10px;
      flex: none;
      img {
        width: 100%;
        height: 100%;
      }
      &.item-add {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        font-weight: 700;
        border: 1px solid #eee;
      }
      &:hover .item-cover {
        display: block;
      }
      .item-cover {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .2);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        display: none;
        .item-btn {
          float: right;
          margin: 10px;
          button {
            display: block;
            padding: 0;
            margin-bottom: 5px;
            background: transparent;
            color: #fff;
            border: none!important;

          }
        }
      }
    }
  }
  .card {
    // display: flex;
    align-items: center;
    flex-wrap: wrap;
    .card-scroll {
      max-height: 200px;
     overflow: auto;
    }
    .card-item {
      // width: 120px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #eee;
      padding: 0 10px;
      margin-right: 10px;
      position: relative;
      border-radius: 6px;
      text-overflow: hidden;
      margin-bottom: 10px;
      &:hover .card-cover {
        display: flex;
      }
      .card-cover {
        display: none;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        // background: rgba(0, 0, 0, .3);
        // display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #000;
        div {
          cursor: pointer;
          font-size: 12px;
          margin-right: 10px;
        }
      }
    }
  }
  .preview {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .preview-item {
      width: 100px;
      margin-right: 10px;
      margin-bottom: 10px;
      border: 1px solid #eee;
      flex: none;
      img {
        width: 100%;
        max-width: 100px;
      }
    }
  }
  .tag {
    display: flex;
    .tag-item {
      padding-left: 30px;
      position: relative;
      cursor: pointer;
      img {
        width: 40px;
      }
      &::before,
      &::after {
        content: "";
        display: block;
        width: 14px;
        height: 14px;
        border: 1px solid #ccc;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 7px;
        font-size: 12px;
        text-align: center;
        line-height: 14px;
      }
      &.active::after {
        width: 10px;
        height: 10px;
        left: 12px;
        background: #2d8cf0;
      }
    }
  }
}
</style>
