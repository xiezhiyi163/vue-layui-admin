<template>
	<div :id="'layui-'+store.bgcolor">
		<div style="padding: 20px;">某个用户的权限配置：</div>
		<div class="main">
			<div class="treemap">
				<div id="checktree"></div>
				<div type="button" class="layui-btn" @click="getchecktreedata">获取</div>
			</div>
			<div style="padding: 20px;">某个按钮的权限配置：使用本地配置的全局方法$getroot([])传权限数组进去匹配是否存在当前用户相应的权限，用v-if="$getroot(['xxx'])"进行判断，存在则显示某个元素，如果权限是希望后台返回的，比如可以当前页面这样$getroot(theroot.a)&&ifdone</div>
		</div>
	</div>
</template>

<script>
	import {_rec_routes} from '../../router/recurrence-router.js'
	export default {
		data(){
			return {
				$layui:'',
				ifdone:1,
				theroot:{
					a:['admin']
				}
			}
		},
		methods:{
			setchecktree:function(){
				var temp = ['index','recurrence','coms','swipertest','table_drag_test']
				//是否是导航处理
				var ifnavsub = []
				function fns(list){
					list.map(item=>{if(item.children){ifnavsub.push(item.name);fns(item.children)}})
				}
				fns(_rec_routes)
				//删除是导航的name
				function fns2(){
					ifnavsub.map(item=>{
						if(temp.indexOf(item)!=-1){
							temp.splice(temp.indexOf(item),1)
						}
					})
				}
				fns2()
				//渲染树
				this.$layui.tree.render({
					elem: '#checktree'
					,data: _rec_routes
					,id: 'trees'
					,showCheckbox: true
				});
				this.$layui.tree.setChecked('trees', temp)
			},
			getchecktreedata:function(){
				var submitarr = []
				var templist = this.$layui.tree.getChecked('trees')
				var setroot = (list) => {
					for(var i in list){
						submitarr.push(list[i].name)
						if(list[i].children){
							setroot(list[i].children)
						}
					}
					return list
				}
				setroot(templist)
				this.$layui.layer.msg('提交权限配置到对应角色权限')
			},
		},
		computed:{
			store(){
				return this.$root.store
			}
		},
		mounted() {
			layui.use(['layer','tree'],()=>{
				this.$layui = layui
				this.setchecktree()
			})
		}
	}
</script>

<style scoped="scoped">
	.main {
		padding-top: 20px;
	}
	.treemap {
		margin: 0 20px 20px;
		padding: 20px;
		background-color: white;
	}
	.layui-btn {
		margin-top: 20px;
	}
</style>
