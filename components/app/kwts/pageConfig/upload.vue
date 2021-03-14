<template>
  <div class="upload">
    <Upload
      ref="upload"
      :format="['jpg','jpeg','png']"
      multiple
      type="drag"
      class="upload"
      :action="action"
      :before-upload="beforeUpload"
      :show-upload-list="false"
      :on-success="success">
      <slot>
        <img class="upload-item" :src="base64 || value" alt="" v-if="base64 || value">
        <div class="upload-item" v-if="!(base64 || value)">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
      </slot>
    </Upload>
  </div>
</template>
<script>
export default {
  name: 'UploadPic',
  props: {
    value: { type: String },
    action: { type: String, default: '/bridge/basic/upload?https=1'}
  },
  data() {
    return {
      url: '',
      base64: '',
      run: null
    };
  },
  methods: {
    reset() {
      this.base64 = '';
      this.url = '';
    },
    beforeUpload(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        let url = event.target.result;
        this.base64 = url;
        // clearTimeout(this.run);
      }
    },
    success(data) {
      this.url = data.url;
      this.$emit('input', this.url);
    }
  },
}
</script>
<style lang="less" scoped>
.upload {
  width: 102px;
  height: 102px;
  overflow: hidden;
  .upload-item {
    width: 100px;
    height: 100px;
    line-height: 100px;
    overflow: hidden;
    padding: 1px;
    box-sizing: border-box;
  }
}
</style>
