<template>
  <div>
    <Form>
      <FormItem label="模块标题" :label-width="70">
        <Input v-model="data.title" placeholder="模块标题" style="margin-bottom: 40px;"/>
      </FormItem>
    </Form>
    <Upload
      action="/bridge/basic/upload?https=1"
      :show-upload-list="false"
      :on-success="uploadSuccess">
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
    <Form
      :label-width="80"
      :model="data.data"
      :show-upload-list="false"
      style="width: 500px;"
      ref="form">
      <img class="cover" :src="uploadUrl" alt="">
      <FormItem label="专辑封面地址" required prop="cover">
        <Input v-model="data.data.cover"/>
      </FormItem>
      <FormItem label="跳转方式" prop="type" required>
        <RadioGroup v-model="data.data.type">
          <Radio label="h5">
            <span>h5</span>
          </Radio>
          <Radio label="album">
            <span>专辑</span>
          </Radio>
          <Radio label="noJump">
            <span>不跳转</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <template v-if="data.data.type === 'album'">
        <FormItem label="单曲id" required prop="id">
          <Input @on-blur="getMusicInfo" v-model="data.data.id" />
        </FormItem>
        <FormItem label="单曲信息" required prop="id">
          <Input disabled v-model="data.data.musicName"/>
        </FormItem>
        <FormItem label="专辑Id" required prop="albumId">
          <Input disabled v-model="data.data.albumId"/>
        </FormItem>
        <FormItem label="专辑名称" required prop="album">
          <Input v-model="data.data.album"/>
        </FormItem>
      </template>
      <template v-if="data.data.type === 'h5'">
        <FormItem label="url" required prop="url">
          <Input v-model="data.data.url"/>
        </FormItem>
      </template>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "smallFocus",
    props: {
      currentData: {
        type: Object
      }
    },
    data() {
      return {
        data: {
          type: '',
          data: {
            cover: '',
            album: '',
            id: '',
            albumId: ''
          }
        },
        formData: {},
        show: false, // show formData
        editType: 'add', // formdata类型， add or edit
        editIndex: null, // edit item index
        uploadUrl: null,
      };
    },
    mounted(){
      this.data = JSON.parse(JSON.stringify(this.currentData))
    },
    methods: {
      uploadSuccess(res) {
        this.data.data.cover = res.url;
      },
      postData() {
        let temp = JSON.parse(JSON.stringify(this.data));
        let type = temp.data.type;
        let data = {
          type: temp.type,
          data: {
            cover: temp.data.cover,
            type
          }
        }
        if (type === 'h5') {
          data.data.url = temp.data.url;
        }
        else if (type === 'album') {
          data.data.album = temp.data.album;
          data.data.albumId = temp.data.albumId;
          data.data.id = temp.data.id;
          data.data.playIndex = temp.data.playIndex;
          data.data.musicName = temp.data.musicName;
        }
        return data

      },
      async getMusicInfo() {
        const id = this.data.data.id;
        const res = await this.$axios.get(`/bridge/kwct/v1/album/music/${id}`);
        if (res.code == 0) {
          this.$set(this.data.data, 'musicName', `${res.data.musicName}`);
          this.$set(this.data.data, 'albumId', `${res.data.albumId}`);
          this.$set(this.data.data, 'album', `${res.data.album}`);
          this.$set(this.data.data, 'cover', res.data.cover);

        } else {
          this.$set(this.data.data, 'musicName', '尚未查询到歌曲信息');
          this.$set(this.data.data, 'albumId', '');
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .cover{
    max-width: 200px;
    margin: 10px 0;
  }
</style>
