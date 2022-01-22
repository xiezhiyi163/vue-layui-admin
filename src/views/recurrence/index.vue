<template>
	<div>
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
				ifdone:1,
				theroot:{
					a:['admin']
				}
			}
		},
		methods:{
			setchecktree:function(){
				//渲染树
				layui.use(['tree'],()=>{
					layui.tree.render({
						elem: '#checktree'
						,data: _rec_routes
						,id: 'trees'
						,showCheckbox: true
					});
					layui.tree.setChecked('trees', ['index','recurrence','coms','swipertest','table_drag_test'])
				})
			},
			getchecktreedata:function(){
				layui.use(['tree','layer'],()=>{
					var submitarr = []
					var templist = layui.tree.getChecked('trees')
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
					layui.layer.msg('提交权限配置到对应角色权限')
				})
			},
		},
		mounted() {
			this.setchecktree()
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
