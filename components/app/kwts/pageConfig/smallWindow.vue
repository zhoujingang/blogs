<template>
  <div>
    <Form
      :label-width="80"
      :model="formData"
      :show-upload-list="false"
      style="width: 500px;"
      ref="form">
      <FormItem label="单曲id" required prop="id">
        <Input @on-blur="getMusicInfo" v-model="formData.id" />
      </FormItem>
      <FormItem label="单曲信息" required prop="id">
        <Input disabled v-model="formData.musicName"/>
      </FormItem>
      <FormItem label="专辑Id" required prop="albumId">
        <Input disabled v-model="formData.albumId"/>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "smallWindow",
    props: {
      currentData: {
        type: Object
      }
    },
    data() {
      return {
        formData: {
          albumId: '',
          id: '',
        },
      };
    },
    watch: {
      currentData() {
        this.formData = JSON.parse(JSON.stringify(this.currentData))
      }
    },
    methods: {
      uploadSuccess(res) {
        this.formData.cover = res.url;
      },
      postData() {
        return this.formData

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
    }
  }
</script>

<style scoped lang="less">
  .cover{
    max-width: 200px;
    margin: 10px 0;
  }
</style>
