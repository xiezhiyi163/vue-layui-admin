<template>
	<div :id="'layui-'+$root.store.bgcolor" class="main">
		<h3 style="padding: 20px;">新建项目</h3>
		<div class="form-tables">
			<div class="formwrap layui-form">
				<div class="layui-form-item">
					<label class="layui-form-label">输入框</label>
					<div class="layui-input-block">
						<input type="text" name="" placeholder="请输入" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">选择框</label>
					<div class="layui-input-block">
						<select name="city" class="layui-select" lay-search>
							<option value=""></option>
							<option value="0">北京</option>
							<option value="1">上海</option>
							<option value="2">广州</option>
							<option value="3">深圳</option>
							<option value="4">杭州</option>
						</select>
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">开关</label>
					<div class="layui-input-block">
						<input type="checkbox" name="switch" lay-skin="switch">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">单选框</label>
					<div class="layui-input-block">
						<input type="radio" name="sex" value="男" title="男">
						<input type="radio" name="sex" value="女" title="女" checked>
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">树状选择</label>
					<div class="layui-input-block">
						<input type="text" id="search" value="1" @change="valuechange" name="" placeholder="请输入" autocomplete="off" class="layui-input">
						<div id="checktree" class="layui-tree-search"></div>
					</div>
				</div>
				<div class="layui-form-item layui-form-text">
					<label class="layui-form-label">文本域</label>
					<div class="layui-input-block">
						<textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
					</div>
				</div>
			</div>
			<div type="button" class="layui-btn" @click="$router.push({path:'/home/table_sub/form2_new'})">下一步</div>
		</div>
	</div>
</template>

<script>
	import {ifleftclick} from '../../assets/js/common.js'
	export default {
		data() {
			return {
				forms: '',
				trees: ''
			}
		},
		methods: {
			renderform: function() {
				var _this = this
				layui.use(['form', 'tree','layer'], function(){
					_this.forms = layui.form
					//render第一个参数是渲染type为什么的表单组件，第二个参数是指定只渲染某个name为什么的form表单
					_this.forms.render('select')
					_this.forms.render('radio')
					_this.forms.render('checkbox')
					_this.forms.render('textarea')
					layui.tree.search = treesearch
					_this.trees = layui.tree
					_this.trees.render({
					    elem: '#checktree'
					    ,data: [
							{
								id:'1',
								title:'1',
								children:[
									{
										id:'2',
										title:'2',
									}
								],
							}
						]
						,id: 'trees'
					    ,showCheckbox: true
						,showSearch:true
					});
					_this.trees.search('checktree','#search',function (treeElem, filterElem, hitNumbers) {
					    console.log('hitNumbers', hitNumbers);
					    layer.msg('找到' + hitNumbers + '个节点');
					},layui.$);
				})
			},
			valuechange:function(){
				layui.use(['layer'], ()=>{
					this.trees.search('checktree','#search',function (treeElem, filterElem, hitNumbers) {
						console.log('hitNumbers', hitNumbers);
						layer.msg('找到' + hitNumbers + '个节点');
					},layui.$);
				})
			}
		},
		beforeRouteLeave(to,from,next) {
			if(from.meta.hasOwnProperty('isform')){
				if(from.meta.isform == 1&&ifleftclick){
					next()
				}else{
					var l = confirm('确定离开页面？')
					if(l){
						next()
					}
				}
			}
		},
		mounted() {
			this.renderform()
		}
	}
</script>

<style scoped="scoped">
	.main {
		padding: 20px 0 0;
	}
	
	.form-tables {
		padding: 20px;
		margin: 0 20px 20px;
		background-color: white;
	}

	.formwrap {
		margin: 0 auto;
		max-width: 1000px;
	}
</style>
