<template>
  <div>
    <div class="pad">
      轮播联动(PC)(<div style="display: inline-block;" id="slidergroup-pros">0</div>)
    </div>
    <div class="slidergroup">
      <div class="subslider left">
        <div class="swiper-container tswiperwrapl">
          <div class="swiper-wrapper">
            <div class="swiper-slide">slider1</div>
            <div class="swiper-slide">slider2</div>
            <div class="swiper-slide">slider3</div>
          </div>
        </div>
      </div>
      <div class="mainslider">
        <div class="swiper-container tswiperwrap">
          <div class="swiper-wrapper">
            <div class="swiper-slide">slider1</div>
            <div class="swiper-slide">slider2</div>
            <div class="swiper-slide">slider3</div>
          </div>
          <div class="swiper-pagination tswiperwrap-pagination"></div>
        </div>
      </div>
      <div class="subslider right">
        <div class="swiper-container tswiperwrapr">
          <div class="swiper-wrapper">
            <div class="swiper-slide">slider1</div>
            <div class="swiper-slide">slider2</div>
            <div class="swiper-slide">slider3</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pad">
      走马灯(PC)
    </div>
    <div class="tswiperwrap2wrap">
      <div class="swiper-container tswiperwrap2">
        <div class="swiper-wrapper">
          <div class="swiper-slide" style="width: 20%;">slider1</div>
          <div class="swiper-slide" style="width: 20%;">slider2</div>
          <div class="swiper-slide" style="width: 20%;">slider3</div>
          <div class="swiper-slide" style="width: 20%;">slider4</div>
          <div class="swiper-slide" style="width: 20%;">slider5</div>
          <div class="swiper-slide" style="width: 20%;">slider6</div>
          <div class="swiper-slide" style="width: 20%;">slider7</div>
          <div class="swiper-slide" style="width: 20%;">slider8</div>
          <div class="swiper-slide" style="width: 20%;">slider9</div>
          <div class="swiper-slide" style="width: 20%;">slider10</div>
          <div class="swiper-slide" style="width: 20%;">slider11</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      loadsider:function(){
        /* === */
        var subwiperl = new Swiper('.tswiperwrapl', {
          loop:true,
          simulateTouch: false
        });
        var subwiperr = new Swiper('.tswiperwrapr', {
          loop:true,
          simulateTouch: false
        });
        var mainswiper = new Swiper('.tswiperwrap', {
        	autoplay: {
            disableOnInteraction: false,
            delay: 2500,
          },
          watchSlidesProgress: !0,//适合平分的情况来使用，这样搞的话要么数据就是写死的
          speed:2500,
          preventLinksPropagation: false,// 阻止点击事件冒泡
          loop:true,
          //
          pagination: {
            el: '.tswiperwrap-pagination',
          },
          //
          on:{
            touchMove:function(){
              document.getElementById('slidergroup-pros').innerHTML = this.progress
            },
            touchEnd:function(){
              document.getElementById('slidergroup-pros').innerHTML = this.progress
            },
            setTransition:function(){
              document.getElementById('slidergroup-pros').innerHTML = this.progress
            },
            autoplay:function(){
              document.getElementById('slidergroup-pros').innerHTML = this.progress
            }
          }
        });
        mainswiper.controller.control = [subwiperl,subwiperr]
        /* === */
        var mainswiper2 = new Swiper('.tswiperwrap2', {
        	autoplay: {
            disableOnInteraction: false,
            delay: 0,
          },
          freeMode:true,
          speed:1500,
          slidesPerView: "auto",
          preventLinksPropagation: false,// 阻止点击事件冒泡
          loop:true,
        });

      }
    },
    mounted(){
      this.loadsider()
    }
  }
</script>

<style scoped="scoped">
  .swiper-container {
    height: 100%;
  }
  /* == */
  .tswiperwrap2wrap .swiper-container-free-mode > .swiper-wrapper {
    -webkit-transition-timing-function: linear;    /*之前是ease-out*/
    -moz-transition-timing-function: linear;
    -ms-transition-timing-function: linear;
    -o-transition-timing-function: linear;
    transition-timing-function: linear;
  }
  /* = */
  .pad {
    padding: 20px 20px 0;
  }
  .slidergroup {
    /* 外层容器*/
    position: relative;
    margin: 20px 20px 0;
  }
  .mainslider {
    position: relative;
    width: 500px;
    height: 200px;
    margin: 0 auto;
    background-color: #ccc;
    border-radius: 8px;
  }
  .subslider.left,.subslider.right {
    position: absolute;
    top: 20px;
    width: 400px;
    height: 160px;
    background-color: #eee;
    border-radius: 8px;
    z-index: -1;
  }
  .subslider.left {
    left: 0;
  }
  .subslider.right {
    right: 0;
  }
  /* - */
  .tswiperwrap2wrap {
    margin: 20px 20px 0;background-color: #eee;border-radius: 8px;height: 100px;
  }
</style>
