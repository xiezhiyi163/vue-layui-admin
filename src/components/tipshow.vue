<template>
    <div class="tips" :class="{tipsshow:tips == ''?false:true}">
        {{tips}} <div class="close">×</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tips:'',
                tiplist:[
                    '组件系统是一款多功能可拓展性强的可视化展示工具',
                    '该系统融合了当前市场最常见的系统架构设计',
                    '开发者可在该系统上面进行多元化的开发和调试',
                    '系统开箱即用，可进行权限模块的重新开发'
                ]
            }
        },
        methods:{
            showtipsfn:function(tips){
                this.tips = tips||'欢迎使用组件系统'
                setTimeout(()=>{
                    this.tips = ''
                    setTimeout(()=>{
                        this.showtipsfn(this.tiplist[Math.floor(Math.random()*4)])
                    },5000)
                },5000)
            }
        },
        mounted(){
            this.showtipsfn()
        }
    }
</script>

<style scoped>
    .tips {
        position: fixed;
        right: 20px;
        bottom: 20px;
        padding: 10px;
        height: 20px;
        min-width: 20px;
        text-align: right;
        background-color: rgb(157, 106, 214);
        border-radius: 10px;
        color: white;
        z-index: 3;
        visibility: hidden;
        opacity: 0;
    }
    .tipsshow{
        visibility: visible !important;
        transition: 700ms;
        opacity: 1 !important;
    }
    .close {
        display: inline;
        margin-left: 5px;
        color: white;
    }
</style>