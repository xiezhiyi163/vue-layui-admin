<template>
	<div>
		<div v-if="showleft == 1">
			<router-view v-slot="{ Component }">
			  <transition mode='out-in' name="fade-transform">
				<component :is="Component" />
			  </transition>
			</router-view>
		</div>
		<div v-else>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import {_rec_routes} from '../router/recurrence-router.js'
	export default {
		data(){
			return {
				showleft:1
			}
		},
		methods:{
			ifthisroute:function(){
				var arr = []
				function fn(list){
					list.map(item=>{arr.push({name:item.name,title:item.title,id:item.id});if(item.children){fn(item.children)}})
				}
				fn(_rec_routes)
				var thispath = this.$route.path.split('/')[this.$route.path.split('/').length-1]
				if(arr.find(item=>item.name == thispath)){
					this.showleft = 1//包含在导航里面的，左侧导航和标签打开
				}else{
					this.showleft = 0//不包含的，关闭
				}
			},
		},
		watch:{
			$route(news,old){
				this.ifthisroute()
			}
		}
	}
</script>

<style scoped="scoped">
</style>
