<template>
  <Modal
    :value="show"
    title="添加"
    :width="700"
    @on-ok="ok"
    @on-cancel="$emit('cancel', false)">
    
    <Form
      :model="formData"
      :label-width="90"
      ref="form">
      <FormItem label="单曲id" required prop="id">
        <Input @on-blur="getMusicInfo" v-model="formData.id" :disabled="type === 'edit'"/>
      </FormItem>
      <FormItem label="单曲信息" required prop="id">
        <Input disabled v-model="formData.musicName"/>
      </FormItem>
      <FormItem label="tag">
        <Tag
          v-for="(item, index) in tag"
          :key="index"
          :checkable="true"
          :color="formData.tags.indexOf(item._id) >= 0 ? 'primary' : 'default'"
          :checked="formData.tags.indexOf(item._id) >= 0"
          type="dot"
          style="margin-right: 15px;margin-bottom: 10px;"
          @on-change="selectTag(item)">
          {{item.name}}
        </Tag>
      </FormItem>
      <FormItem label="专辑Id" required prop="albumId">
        <Input disabled v-model="formData.albumId"/>
      </FormItem>
      <FormItem label="专辑名称" required prop="album">
        <Input v-model="formData.album"/>
      </FormItem>
      <FormItem label="封面地址" required prop="cover">
        <Input v-model="formData.cover"/>
      </FormItem>
      <FormItem label="上传封面">
        <Upload
          action="/bridge/basic/upload"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess">
          <Button v-if="!base64 && !formData.cover" icon="ios-cloud-upload-outline">Upload files</Button>
          <img v-else :src="base64 || formData.cover" alt="" style="max-width: 100px;">
        </Upload>
      </FormItem>
    </Form>

    <template slot="footer">
      <div class="footer-btn">
        <Button @click="$emit('cancel', false)">取消</Button>
        <Button @click="ok" type="primary">确认</Button>
      </div>
    </template>

  </Modal>
</template>
<script>
export default {
  name: 'Alert',
  props: {
    show: { type: Boolean, default: false },
    tag: { type: Array, default: () => ([]) },
    type: { type: String, default: 'create' },
    data: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      base64: '',
      isAlbum: false,
      formData: {
        id: '',
        tags: [],
        albumId: null,
        album: '',
        cover: ''
      },
    };
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(data) {
        data = JSON.parse(JSON.stringify(data));
        this.base64 = '';
        if (this.type === 'create') {
          this.formData = { id: '', tags: [], albumId: null, album: '', cover: '' };
          return false;
        }
        let { id, tags = [], albumId, album, cover, musicName } = data;
        this.formData = { id, tags, albumId, album, cover, musicName };
      }
    }
  },
  methods: {
    beforeUpload(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        let url = event.target.result;
        this.base64 = url;
      }
    },
    uploadSuccess(data) {
      this.$set(this.formData, 'cover', data.url);
    },
    // 选择标签
    selectTag(data) {
      let tag = data._id;
      if (this.formData.tags.indexOf(tag) < 0) {
        this.formData.tags.push(tag);
      }
      else {
        this.formData.tags.splice(this.formData.tags.indexOf(tag), 1);
      }
    },
    ok() {
      if (this.isAlbum) {
        this.$Message.error('已经存在相同专辑');
        return false;
      }
      this.$refs.form.validate(async valid => {
        if (!valid) return false;
        let data = this.formData;
        let res = await this.$axios({
          url: `/bridge/kwct/v1/album/save`,
          method: 'post',
          data: { list: [data] }
        });
        if (res.code === 0) {
          this.$Message.success(`${this.type === 'create' ? '创建' : '修改'}成功`);
          this.$emit('updated');
          this.$emit('cancel');
        }
        else {
          this.$Message.error(`${this.type === 'create' ? '创建' : '修改'}失败`);
        }
      });
    },
    async getAlbumDetail(id) {
      let res = await this.$axios.get(`/bridge/kwct/v1/album/${id}`);
      return res;
    },
    async getMusicInfo() {
      const id = this.formData.id;
      const res = await this.$axios.post(`/wapi/api/www/music/musicInfo?mid=${id}&offline=1&preOnline=1`);
      if (res.code == 200) {
        this.$set(this.formData, 'musicName', `${res.data.album} ${res.data.name}`);
        this.$set(this.formData, 'albumId', `${res.data.albumid}`);
        this.$set(this.formData, 'album', `${res.data.album}`);
        this.$set(this.formData, 'cover', `${res.data.albumpic}`);
        let album = await this.getAlbumDetail(res.data.albumid);
        // debugger
        if (album.code === 0) {
          this.isAlbum = true;
          this.$Message.error('已经存在相同专辑');
        }
        else {
          this.isAlbum = false;
        }

      } else {
        this.$set(this.formData, 'musicName', '尚未查询到歌曲信息');
        this.$set(this.formData, 'albumId', '');
      }
    },
  },
}
</script>
<style lang="less" scoped>
.alert {

}
</style>