<template>
    <div class="top_back_refresh_wrap" :style="{backgroundColor:'#'+($root.store._bgcolor||'b3c5eb')}" v-if="$route.meta.hasOwnProperty('isform')">
        <div class="top_refresh" @click="$router.go(0)">刷新</div>
        <div class="top_back" @click="$router.back()">{{' << '}}返回</div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .top_back_refresh_wrap {
        height: 30px;
    }
    .top_back {
        margin-left: 10px;
        line-height: 30px;
        color: white;
        cursor: pointer;
    }
    .top_refresh {
        float: right;
        margin-right: 10px;
        line-height: 30px;
        color: white;
        cursor: pointer;
    }
</style>