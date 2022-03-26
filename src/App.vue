<template>
	<div>
		<store></store>
	  <router-view></router-view>
	</div>
</template>

<script>
import store from './components/store.vue'
export default {
	components:{
		store,
	},
	data(){
		return {
			store:null,
		}
	}
}
</script>

