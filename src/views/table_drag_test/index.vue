<template>
	<div class="main">
		<div type="button" class="layui-btn" @click="$router.push({path:'/home/table_sub/form_new'})">添加</div>
		<div class="el-tables">
			<el-table :data="tableData" style="width: 100%" row-key="id">
				<el-table-column prop="date" label="日期" width="180">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="address" label="地址">
				</el-table-column>
			</el-table>
		</div>
		<div class="dg-wrap">
			<draggable v-model="vdtest.list"  chosenClass="chosen" forceFallback="true" animation="1000" @start="onStart" @end="onEnd">
				<transition-group>
					<div v-for="(v,i) in vdtest.list" :key="v.id">{{v.id}}</div>
				</transition-group>
			</draggable> 
		</div>
	</div>
</template>

<script>
	import { defineComponent } from 'vue'//当存在按需引入时引入这个
	import { VueDraggableNext } from 'vue-draggable-next'
	export default defineComponent({//存在按需引入的组件时，export default { 改成 export default defineComponent({
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				//vue-draggable-test
				drag:false,
				vdtest:{
					list:[]
				}
			}
		},
		components:{
			draggable:VueDraggableNext,
		},
		mounted() {
			this.rowDrop();
			//vue-draggable-test
			this.getdata()
		},
		methods: {
			//行拖拽
			rowDrop() {
				const tbody = document.querySelector(".el-table__body-wrapper tbody");
				const _this = this;
				Sortable.create(tbody, {
					// 官网上的配置项,加到这里面来,可以实现各种效果和功能
					animation: 150,
					// ghostClass: "blue-background-class",
					onEnd({
						newIndex,
						oldIndex
					}) {
						_this.tableData.splice(newIndex, 0, _this.tableData.splice(oldIndex, 1)[0]);
						var newArray = _this.tableData.slice(0);
						_this.tableData = [];
						_this.$nextTick(function(){
							_this.tableData = newArray;
						})
					}
				});
			},
			//vuedraggable
			//获取数据
			getdata(){
				var _this = this
				setTimeout(function() {
					_this.vdtest.list = [
						{
							id:1
						},
						{
							id:2
						},
						{
							id:3
						},
						{
							id:4
						},
					]					
				},500)
			},
			//开始拖拽事件
			onStart(){
				this.drag=true;
			},
			//拖拽结束事件
			onEnd() {
				this.drag=false;
			},
		},
	})
</script>

<style scoped="scoped">
	.main {
		padding-top: 20px;
	}
	.layui-btn {
		margin: 0 20px 20px;
	}
	.el-tables,
	.dg-wrap {
		margin: 0 20px 20px;
		padding: 20px;
		background-color: white;
	}
</style>
