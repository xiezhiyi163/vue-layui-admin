<template>
	<div :id="'layui-'+store.bgcolor" class="homemain">
		<div class="toppart">
			本后台项目直接单独使用vue框架可进行搭建的系统架构源码文件：<br/>
			login.vue,Home.vue,leftnav.vue,tabs.vue,_.vue,chatview.vue(聊天组件，酌情去掉)<br/>main.js,routerMap.js,recurrence-router.js,common.js<br/><br/>
			项目通过npm安装的依赖：elementui，sortable，vuedraggble<br/><br/>
			其他都是通过第三方引进到index.html里面使用的(请酌情调整)
		</div>
		<div class="numdatawrap">
			<div class="numdata">
				<div>登陆人数</div>
				<div class="num_data">100</div>
			</div>
			<div class="numdata">
				<div>注册人数</div>
				<div class="num_data">100</div>
			</div>
			<div class="numdata">
				<div>网站访问量</div>
				<div class="num_data">100</div>
			</div>
		</div>
		<div class="toppart">
			hellolocalstore:{{$root.store.test}}<br/>
			hellolocalstoreMixin:{{$root.store.test2}}<br/>
			hellolocalstoreConputed:{{$root.store.changetest}}
		</div>
	</div>
</template>

<script>
	import { reactive,getCurrentInstance,watch,ref,onMounted} from 'vue'	
	export default {
		data(){
			return {
				indextest:1
			}
		},
		setup(props,cont){
			//组合式api的全局root获取
			//--------
			var {proxy} = reactive(getCurrentInstance())
			var {store} = reactive(proxy.$root)
			// console.log(store) //可直接store修改对应的data，调用对应的方法
			//--------
			//
			//watch监听处理
			//--------
			var count = ref({num:{num:0}})
			//watch深度监听
			watch([count],(n,o)=>{
				// console.log(23424,[...n])
			},{
				deep:true
			})
			count.value.num.num++
			//--------
			//
			//外面数据获取
			//--------
			var $this = reactive(getCurrentInstance())
			onMounted(()=>{
				// console.log($this.data)
			})
			//--------
			//
			return {
				proxy,
				store,
				count,
				$this
			}
		},
		mounted(){
			// console.log(this.indextest)
			// setTimeout(()=>{
			// 	console.log(this.count)
			// },2000)
			this.$root.store.storetest()
		}
	}
</script>

<style scoped="scoped">
	.homemain {
		padding-top: 20px;
	}
	.toppart {
		margin: 0 20px 20px;padding: 20px;word-break: break-all;background-color: white;
	}
	.numdatawrap {
		padding: 20px 0 25px;
		margin: 0 20px 20px;
		background-color: white;
	}
	.numdatawrap:after {
		content: '';
		display: block;
		clear: both;
	}
	.numdata {
		float: left;
		width: 33.333%;
		text-align: center;
	}
	.num_data {
		margin-top: 10px;
		font-size: 30px;
		font-weight: 800;
	}
</style>
