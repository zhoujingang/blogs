<template>
  <div>
    <Form>
      <FormItem label="模块标题" :label-width="70">
        <Input v-model="data.title" placeholder="模块标题" style="margin-bottom: 40px;"/>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "Rank",
    props: {
      currentData: {
        type: Object
      }
    },
    data() {
      return {
        data: {
          title: '',
          type: ''
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
      postData() {
        return this.data

      }
    }
  }
</script>

<style scoped lang="less">
  .cover{
    max-width: 200px;
    margin: 10px 0;
  }
</style>
