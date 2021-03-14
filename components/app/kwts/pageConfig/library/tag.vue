<template>
  <Modal
    :value="show"
    title="tag"
    :width="400"
    @on-ok="ok"
    @on-cancel="$emit('cancel', false)">
    <Form
      :model="formData"
      :label-width="50"
      ref="form">
      <FormItem label="tag" prop="name" required>
        <Input v-model="formData.name" placeholder="请输入标签名称"/>
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
    type: { type: String, default: 'create' },
    data: { type: Object, default: () => ({ name: '' }) }
  },
  data() {
    return {
      formData: {
        name: '',
      }
    };
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(data) {
        this.formData = data;
      }
    }
  },
  methods: {
    ok(close) {
      this.$refs.form.validate(async valid => {
        if (!valid) return false;
        let url = this.type === 'create'
          ? '/bridge/kwct/v1/tag/create'
          : `/bridge/kwct/v1/tag/update/${this.formData._id}`;
        let res = await this.$axios({
          url,
          method: 'post',
          data: {
            name: this.formData.name
          }
        });
        if (res.code === 0) {
          this.$Message.success(`${this.type === 'create' ? '创建' : '修改'}成功`);
          this.$emit('updated');
          this.$emit('cancel');
        }
        else {
          this.$Message.error(`${this.type === 'create' ? '创建' : '修改'}失败`);
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.alert {

}
</style>