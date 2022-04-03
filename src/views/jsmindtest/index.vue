<template>
	<div :id="'layui-'+store.bgcolor" class="main">
		<div style="padding: 20px;">仅作基础演示：</div>
		<div style="background-color: white;">
			<div id="jsmindtest"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				times:'',
			}
		},
		methods:{
			initmind:function(){
				var mind = {
					"meta":{
						"name":"demo",
						"author":"hizzgdev@163.com",
						"version":"0.2",
					},
					"format":"node_array",
					"data":[
						{"id":"root", "isroot":true, "topic":"jsMind"},
		
						{"id":"sub1", "parentid":"root", "direction":"left", "topic":"sub1", "background-color":"#0000ff"},
						{"id":"sub11", "parentid":"sub1", "topic":"sub11"},
						{"id":"sub12", "parentid":"sub1", "topic":"sub12"},
						{"id":"sub13", "parentid":"sub1", "topic":"sub13"},
		
						{"id":"sub2", "parentid":"root", "topic":"sub2"},
						{"id":"sub21", "parentid":"sub2", "topic":"sub21"},
						{"id":"sub22", "parentid":"sub2", "topic":"sub22","foreground-color":"#33ff33"},
		
						{"id":"sub3", "parentid":"root", "topic":"sub3"},
					]
				};
				var options = {
					container:'jsmindtest',
					editable:true,
					theme:'primary'
				}
				var jm = jsMind.show(options,mind);
				// jm.set_readonly(true);
				// var mind_data = jm.get_data();
				// alert(mind_data);
				jm.add_node("sub2","sub23", "new node", {"background-color":"red"});
				jm.set_node_color('sub21', 'green', '#ccc');
			}
		},
		computed:{
			store(){
				return this.$root.store
			}
		},
		mounted(){
			this.initmind()
			window.addEventListener('resize',()=>{
				if(this.times){
					clearTimeout(this.times)
				}
				this.times = setTimeout(()=>{
					document.getElementById('jsmindtest').innerHTML = ''
					this.initmind()
				},100)
			})
		}
	}
</script>

<style scoped="scoped">
	.main {
		padding: 20px 20px 0;
	}
	#jsmindtest {
		height: 500px;
	}
</style>
