<template>
    <div
        class="logo"
        @click="routerPush('/menu/appList')">
        <img style="width: 50px" src="http://h5static.kuwo.cn/img/pc_pic_applogo@2x.png" alt="">
        <div class="text">
            <h2>酷我应用配置后台</h2>
            <p>Kuwo Application Platform</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            routerPush(path) {
                console.log(path)
                this.$router.push(path);
            }
        }
    }
</script>
<style lang="less" scoped>
    .logo{
        display: flex;
        align-items: center;
        color: #fff;
        cursor: pointer;
        .text{
            margin-left: 20px;
        }
        h2{

        }
    }
</style>
