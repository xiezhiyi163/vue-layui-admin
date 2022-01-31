<template>
	<div>
		<div style="text-align: center;padding-top: 40px;word-break: break-all;" v-html="datas"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				datas:`
					ie10(标配，别问为什么)<br/><br/>
					集成了第三方font-awesome 4.7在里面<br/><br/>
					登录拿到权限名称（只需要一个字符串就行）<br/><br/>
					home.vue里面，两种模式切换：top_max_zindex为1的时候，顶部铺满，否则就是默认模式<br/>
					home.vue里面请求并返回可以访问的路由导航的name数组 (name是围绕整个项目的路由唯一键值对，必须保证不一样)<br/>
					处理上去到左侧导航那里<br/><br/>
					如果是创建用户并提交有权限访问的左侧导航栏，直接提交相应的name数组就行<br/><br/>
					该系统只有左侧导航栏存在的类目打开的时候才会出现在标签栏那里<br/><br/>
					从头到尾开发者只需要关注页面创建到路由配置，开发者按照routerMap里面的文档和路由参数匹配规则走，不会出现太大的问题<br/><br/>
					另外，275759-12-31这个时间为目前计算机支持的最大时间（chrome亲测得出）
				`
			}
		}
	}
</script>

<style>
</style>
