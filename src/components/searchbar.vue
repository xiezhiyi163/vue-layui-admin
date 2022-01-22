<template>
	<div class="searchicon" @click.stop="showbar = !showbar">
		<i class="fa fa-search" style="cursor: pointer;"></i>
		<div class="searchbar" v-if="showbar" @click.stop=" ">
			<div class="searchbarinput">
				<input type="text" v-model="thevalue">
			</div>
			<div class="searchres">
				<div class="searchresitem" v-for="(v,i) in list" @click="toadditem(v)">
					<span v-for="(vs,ind) in v.titlearr" :style="{color:v.valuearr.indexOf(vs)!=-1?'red':'#333'}">{{vs}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {_rec_routes} from '../router/recurrence-router.js'
	import {leftclick , ifleftclick} from '../assets/js/common.js'
	export default {
		data(){
			return {
				showbar:0,
				thevalue:'',
				list:[]
			}
		},
		methods:{
			toadditem(item){
				if(this.$route.meta.isform == 1){
					if(ifleftclick == 0){
						leftclick(1)
						var l = confirm('即将离开表单页')
						if(l){
							this.showbar = 0
							this.thevalue = ''
							this.list = []
							this.$router.replace({'name':item.name})
							setTimeout(()=>{
								leftclick(0)
							},500)
						}else{
							this.showbar = 0
							this.thevalue = ''
							this.list = []
							setTimeout(()=>{
								leftclick(0)
							},500)
						}
					}
				}else{
					this.showbar = 0
					this.thevalue = ''
					this.list = []
					this.$emit('additems',item,1)
				}
			},
		},
		watch:{
			showbar(news,old){
				if(news == 1) {
					this.thevalue = ''
					this.list = []
				}
			},
			thevalue(){
				this.list = []
				var arr = []
				function fns(list){
					list.map(item=>{arr.push(item);if(item.children){fns(item.children)}})
				}
				fns(_rec_routes)
				for(var i = 0 ; i < arr.length;i++){
					var num = 0
					var thename = arr[i].title.split('')	
					var value = this.thevalue.split('')
					for(var k = 0;k<value.length;k++){
						var temp = value[k]
						if(thename.indexOf(temp)!=-1){
							num = num + 1
						}
					}
					if(num != 0) {
						this.list.push(Object.assign(arr[i],{valuearr:value,titlearr:thename}))
					}
				}
				if(this.thevalue == ''){
					this.list = []
				}
			}
		},
		mounted(){
			document.addEventListener('click',()=>{
				this.showbar = 0
				this.thevalue = ''
				this.list = []
			})
		}
	}
</script>

<style scoped="scoped">
	.searchicon {
		position: relative;
		display: inline-block;
		margin-right: 15px;
		line-height: 60px;
		font-size: 20px;
		color: white;
	}
	.searchbar {
		position: absolute;
		top: 48px;
		right: 0;
		width: 300px;
		min-height: 40px;
		background-color: #eee;
		box-shadow: 0 0 20px 0 #666;
	}
	.searchbarinput {
		margin: 10px;
		height: 20px;
		overflow: hidden;
		border-bottom: 1px solid #aaaaff;
	}
	.searchbarinput input {
		vertical-align: top;
		width: 100%;
		font-size: 16px;
		background-color: transparent;
	}
	.searchres {
		position: relative;
		max-height: 200px;
		background-color: white;
		overflow: hidden auto;
	}
	.searchresitem {
		padding: 10px;
		line-height: normal;
		color: #333;
		word-break: break-all;
		font-size: 16px;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
	}
	.searchresitem:hover {
		background-color: #eee;
	}
</style>
