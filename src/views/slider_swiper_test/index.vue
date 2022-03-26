<template>
	<div :id="'layui-'+$root.store.bgcolor" class="main">
		<div class="all-swiper">
		  <div style="width: 1000px;margin: auto;padding-bottom: 20px;">
			<anislider></anislider>
			<singlewithmore-slider></singlewithmore-slider>
		  </div>
		</div>
	</div>
</template>

<script>
	import anislider from './components/animate_slider.vue'
	import singlewithmoreSlider from './components/singlewithmore_slider.vue'
  export default {
    components:{
      anislider,
      singlewithmoreSlider,
    }
  }
</script>

<style scoped="scoped">
	.main {
		padding-top: 20px;
	}
	.all-swiper {
		margin: 0 20px 20px;
		padding: 20px;
		background-color: white;
	}
</style>
