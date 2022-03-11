<template>
    <div style="position:relative">
        <div class="add" @click="add()">+</div>
        <div class="swipermemowrap">
            <div v-if="show == 1" class="pswiperwrap">
                <div class="swiper-container swiperwrap">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(v,i) in memoarr" :key="i">
                            <div v-if="memoarr.length != 1" class="del" @click="del(i)">x</div>
                            <div class="textarea">
                                <textarea v-model="memoarr[i].value" @input="inputset" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination swiperwrap-pagination"></div>
                    <div v-if="memoarr.length != 1" class="swiper-button-prev"></div>
                    <div v-if="memoarr.length != 1" class="swiper-button-next"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/*
    整个操作都是从数组再到单个然后写入到本地
    增加数组和删除数组
    碰到的难点：忘记关掉item边距，分页器的不匹配问题解决
*/
    export default {
        data(){
            return {
                show:0,
                memoarr:[{value:''}],
                slideind:0,
                mySwiper:null,
                option:{
                    // autoplay: {
                    //     disableOnInteraction: false,
                    //     delay: 2500,
                    // },
                    autoplay: false,
                    speed:300,
                    preventLinksPropagation: false,// 阻止点击事件冒泡
                    //
                    observer:true, 
                    observeParents:true,
                    //
                    pagination: {
                        el: '.swiperwrap-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                }
            }
        },
        watch:{
            memoarr:{
                handler:function(){
                    localStorage.setItem('memoarr',JSON.stringify(this.memoarr))
                },
                deep:true
            }
        },
        methods:{
            inputset(){
                localStorage.setItem('memoarr',JSON.stringify(this.memoarr))
            },
            add(){
                this.show = 0;
                this.memoarr.push({value:''})
                localStorage.setItem('memoarr',JSON.stringify(this.memoarr))
                setTimeout(()=>{
                    this.swiperinit(1,this.slideind)
                },100)
            },
            del(ind){
                this.show = 0;
                this.memoarr.splice(ind,1)
                localStorage.setItem('memoarr',JSON.stringify(this.memoarr))
                if(this.memoarr[ind]){
                    setTimeout(()=>{
                        this.swiperinit(1,ind)
                    },100)
                    return
                }else if(this.memoarr[ind - 1]){
                    setTimeout(()=>{
                        this.swiperinit(1,ind - 1)
                    },100)
                    return
                }
                setTimeout(()=>{
                    this.swiperinit()
                },100)
            },
            //
            swiperinit(type,ind){
                this.show = 1;
                if(this.memoarr.length!=0){
                    this.$nextTick(()=>{
                        this.option.onSlideChangeEnd = (swiper)=>{
                            this.mySwiper.update()//更新
                        }
                        this.option.on = {
                            slideChangeTransitionEnd: () => {
                                this.slideind = this.mySwiper.activeIndex
                                //你的事件
                            },
                        }
                        this.mySwiper = new Swiper('.swiperwrap', this.option)
                        if(type){
                            setTimeout(()=>{
                                this.mySwiper.slideTo(ind,0)
                            },0)
                        }
                        if(this.memoarr.length == 1) {
                            this.slideind = 0
                        }
                    })
                }
            }
        },
        mounted(){
            if(localStorage.getItem('memoarr')){
                this.memoarr = JSON.parse(localStorage.getItem('memoarr'))
            }
            this.swiperinit()
        }
    }
</script>

<style>
    .swipermemowrap .swiper-button-next,
    .swipermemowrap .swiper-button-prev {
        transform: scale(.3);
    }
    .swipermemowrap .swiper-button-next {
        right: -5px;
    }
    .swipermemowrap .swiper-button-prev {
        left: -5px;
    }
</style>

<style scoped>
    .add {
        position: absolute;
        right: 0;
        top: -35px;
    }
    .swipermemowrap {
        margin-top: 20px;
        height: 200px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 #3a96b4;
    }
    .pswiperwrap,
    .swiperwrap {
        height: 100%;
    }
    .del {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .textarea {
        padding: 20px;
        height: 140px;
    }
    .textarea textarea {
        width: 100%;
        height: 100%;
        resize: none;
    }
</style>