<template>
	<div :id="'layui-'+store.bgcolor" class="main">
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
    },
	watch:{
		'$root.store':{
			immediate:true,
			deep:true,
			handler(o,n) {
				this.store = {}
				for(var i in this.$root.store) {
					this.store[i] = this.$root.store[i]
				}
			}
		}
	},
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
