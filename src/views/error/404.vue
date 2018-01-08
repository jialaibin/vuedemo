<template>
    <div class="error">
        <p>你进入了错误的页面，请不要输入url链接进入。</p>
        <mt-button type="primary" @click="goto">点击返回首页</mt-button>
    </div>
</template>

<script>
    export default {
        methods:{
            goto(){
                this.$router.push('/');
            }
        }
    }
</script>

<style  lang="less" scoped>
    .error{
        width: 100%;

    }
</style>