<template>
  <div ref='swipers'>
    <!-- =====-->
    <div style="padding: 20px 20px 0;">普通切换</div>
    <div class="swiper-container swiperwrap">
      <div class="swiper-wrapper">
        <div class="swiper-slide">slider1</div>
        <div class="swiper-slide">slider2</div>
        <div class="swiper-slide">slider3</div>
      </div>
      <div class="swiper-pagination swiperwrap-pagination"></div>
    </div>
    <!-- =====-->
    <div style="padding: 20px 20px 0;">视差切换(PC)</div>
    <div class="swiper-container swiperwrap2">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div data-swiper-parallax="-100">slider1</div>
          <div>slider1cont</div>
        </div>
        <div class="swiper-slide">
          <div data-swiper-parallax="-100">slider2</div>
          <div>slider2cont</div>
        </div>
        <div class="swiper-slide">
          <div data-swiper-parallax="-100">slider3</div>
          <div>slider3cont</div>
        </div>
      </div>
      <div class="swiper-pagination swiperwrap2-pagination"></div>
    </div>
    <!-- =====-->
    <div style="padding: 20px 20px 0;">提前量加自动宽度切换(PC，不适用于响应式)</div>
    <div class="swiper-container swiperwrap3">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="width: 20%;">slider1</div>
        <div class="swiper-slide" style="width: 20%;">slider2</div>
        <div class="swiper-slide" style="width: 20%;">slider3</div>
        <div class="swiper-slide" style="width: 20%;">slider4</div>
        <div class="swiper-slide" style="width: 20%;">slider5</div>
        <div class="swiper-slide" style="width: 20%;">slider6</div>
      </div>
      <div class="swiper-pagination swiperwrap3-pagination"></div>
    </div>
    <!-- =====-->
    <div style="padding: 20px 20px 0;">直接动画切换</div>
    <div class="swiper-container swiperwrap4">
      <div class="swiper-wrapper">
        <div class="swiper-slide">slider1
          <div class="swiper-slide-cont">slider1-cont</div>
        </div>
        <div class="swiper-slide">slider2
          <div class="swiper-slide-cont">slider2-cont</div>
        </div>
        <div class="swiper-slide">slider3
          <div class="swiper-slide-cont">slider3-cont</div>
        </div>
      </div>
      <div class="swiper-pagination swiperwrap4-pagination"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data:()=>({
      widths:''
    }),
    methods:{
      swiperload:function(){
        var self = this
        /* ===== */
        self.mySwiper = new Swiper('.swiperwrap', {
        	autoplay: {
            disableOnInteraction: false,
            delay: 2500,
          },
          slidesOffsetBefore: 20,
          speed:2500,
          preventLinksPropagation: false,// 阻止点击事件冒泡
          loop:true,
          //
          pagination: {
            el: '.swiperwrap-pagination',
          },
        })
        /* ===== */
        self.mySwiper2 = new Swiper('.swiperwrap2', {
        	autoplay: {
            disableOnInteraction: false,
            delay: 2500,
          },
          speed:2500,
          preventLinksPropagation: false,// 阻止点击事件冒泡
          loop:true,
          //
          pagination: {
            el: '.swiperwrap2-pagination',
          },
          //
          parallax : true,
        })
        /* ===== */
        self.mySwiper3 = new Swiper('.swiperwrap3', {
        	autoplay: {
            disableOnInteraction: false,
            delay: 2500,
          },
          speed:2500,
          slidesOffsetBefore: self.widths * .2,
          slidesPerView: "auto",
          preventLinksPropagation: false,// 阻止点击事件冒泡
          loop:true,
          //
          pagination: {
            el: '.swiperwrap3-pagination',
          },
          on:{
            transitionStart: function() {
              var indexTitle = this.$el.find(".swiper-slide-active").index();
              this.slides.eq(indexTitle).prevAll().css({color:'#ccc'});
              this.slides.eq(indexTitle).nextAll().css({color:'#999'});
              this.slides.eq(indexTitle).css({color:'#ff0000'})
            },
            transitionEnd: function() {
              var indexTitle = this.$el.find(".swiper-slide-active").index();
              this.slides.eq(indexTitle).prevAll().css({color:'#ccc'});
              this.slides.eq(indexTitle).nextAll().css({color:'#999'});
              this.slides.eq(indexTitle).css({color:'#ff0000'})
            },
          },
          init: function() {
            this.emit("transitionEnd transitionStart")
          }
        })
        /* ===== */
        self.mySwiper4 = new Swiper('.swiperwrap4', {
        	autoplay: {
            disableOnInteraction: false,
            delay: 2500,
          },
          effect: 'fade',
          speed:500,
          preventLinksPropagation: false,// 阻止点击事件冒泡
          loop:true,
          //
          pagination: {
            el: '.swiperwrap4-pagination',
          },
          on:{
            transitionStart: function() {
              var indexTitle = this.$el.find(".swiper-slide-active").index();
              this.slides.find(".swiper-slide-cont").css({color:'#ff0000',transitionDelay:'10ms',opacity:1})
            },
            transitionEnd: function() {
              var indexTitle = this.$el.find(".swiper-slide-active").index();
              this.slides.find(".swiper-slide-cont").css({color:'#999',transitionDelay:'1990ms',opacity:0})
            },
          },
          init: function() {
            this.emit("transitionEnd transitionStart")
          }
        })
      }
    },
    mounted(){
      this.widths = this.$refs.swipers.offsetWidth
      this.swiperload()
      window.addEventListener('resize',() => {
        if(location.href.indexOf('/slider/slider')!=-1){
          this.widths = this.$refs.swipers.offsetWidth
        }
      })
    }
  }
</script>

<style scoped>
  .swiperwrap,.swiperwrap2,.swiperwrap3,.swiperwrap4 {
    margin: 20px 20px 0;
    height: 100px;
    background-color: #eee;
    border-radius: 8px;
  }
  .swiperwrap2 .swiper-slide {
    text-align: center;
  }
  .swiperwrap4 .swiper-slide {
    background-color: #eee;
  }
  .swiperwrap4 .swiper-slide .swiper-slide-cont {
    transition: 1s;
    color: #ff0000;
  }
</style>
