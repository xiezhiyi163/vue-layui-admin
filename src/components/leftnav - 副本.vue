<template>
	<div>
		<div v-if="item.children">
			<div v-if="item.children.length == 1">
				<div v-if="item.show">
					
					<div class="item" :style="{backgroundColor:tabsactive == item.name?'#57477a':''}" v-if="item.children[0].root != -1" @click.stop="toadditem(item.children[0])">
						<div class="itemdiv" style="padding-left: 20px;" :style="{marginLeft:index*20+'px',color:tabsactive == item.children[0].name?'yellow':''}">
							<div class="itemimg">
								<img v-if="item.navicon.type == 'img'" :src="item.navicon.icon" />
								<i v-if="item.navicon.type == 'font'" :class="item.navicon.icon" aria-hidden="true"></i>
							</div>
							{{item.children[0].title}}
						</div>
					</div>
					
				</div>
			</div>
			<div v-else>
				<div v-if="s">
					<div v-if="item.show">
						
						<div class="item" :style="{backgroundColor:tabsactive == item.name || parentidlist.indexOf(item.name)!=-1?'#73668f':''}" @click="show = !show" v-if="item.name == firstnav?false:true">
							<div class="itemdiv" style="padding-left: 20px;margin-right: 20px;" :style="{marginLeft:index*20+'px',color:tabsactive == item.name || parentidlist.indexOf(item.name)!=-1?'yellow':''}">
								<div class="itemjiantou" :style="{transform:show?'rotate(-90deg)':''}">
									<i class="fa fa-caret-left" style="color: white;"></i>
								</div>
								<div class="itemimg">
									<img v-if="item.navicon.type == 'img'" :src="item.navicon.icon" />
									<i v-if="item.navicon.type == 'font'" :class="item.navicon.icon" aria-hidden="true"></i>
								</div>
								{{item.title}}
							</div>
						</div>
						
					</div>
					<div v-show="item.children">
						<div v-if="item.name == firstnav">
							<div v-for="(v,i) in item.children">
								<leftnavc :item="v" :index="Number(index)+1" :tabsactive='tabsactive' :parentidlist="parentidlist" :firstnav="firstnav" @additems="toadditem"></leftnavc>
							</div>
						</div>
						<div v-else-if="show&&item.name != firstnav">
							<div v-for="(v,i) in item.children">
								<leftnavc :item="v" :index="Number(index)+1" :tabsactive='tabsactive' :parentidlist="parentidlist" :firstnav="firstnav" @additems="toadditem"></leftnavc>
							</div>
						</div>
					</div>
				</div>
				<div v-else style="margin-left: -20px;">
					<div v-for="(v,i) in item.children">
						<leftnavc :item="v" :index="Number(index)+1" :tabsactive='tabsactive' :parentidlist="parentidlist" :firstnav="firstnav" @additems="toadditem"></leftnavc>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			
			<div v-if="item.show&&item.root!=-1" class="item" :style="{backgroundColor:tabsactive == item.name?'#57477a':''}" @click.stop="toadditem(item)">
				<div class="itemdiv" style="padding-left: 20px;" :style="{marginLeft:index*20+'px',color:tabsactive == item.name?'yellow':''}">
					<div class="itemimg">
						<img v-if="item.navicon.type == 'img'" :src="item.navicon.icon" />
						<i v-if="item.navicon.type == 'font'" :class="item.navicon.icon" aria-hidden="true"></i>
					</div>
					{{item.title}}
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import {leftclick , ifleftclick} from '../assets/js/common.js'
	export default {
		name:'leftnavc',
		props:{
			item:{
				type:null,
				default:''
			},
			index:{
				type:null,
				default:0
			},
			tabsactive:{
				type:null,
				default:'index'
			},
			firstnav:{
				type:null,
				default:'Home'
			},
			parentidlist:{
				type:null,
				default:[]
			},
		},
		data(){
			return {
				s:0,
				show:0,
			}
		},
		methods:{
			toadditem(item){
				if(this.$route.meta.isform == 1){
					if(ifleftclick == 0){
						leftclick(1)
						var l = confirm('即将离开表单页')
						if(l){
							this.$router.replace({'name':item.name})
							setTimeout(()=>{
								leftclick(0)
							},500)
						}else{
							setTimeout(()=>{
								leftclick(0)
							},500)
						}
					}
				}else{
					this.$emit('additems',item,1)
				}
			},
		},
		mounted(){
			if(this.item.children){
				var f = 0
				for(var i=0;i<this.item.children.length;i++){
					if(this.item.children[i].show){
						f += 1
					}
				}
				if(f < 2){
					this.s = 0
				}else{
					this.s = 1
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.item {
		position: relative;
		padding: 4px 15px;
		min-height: 21px;
		word-break: break-all;
		color: white;
		font-size: 12px;
		cursor: pointer;
		/* background-color: #897da1 !important; */
	}
	.itemimg {
		position: absolute;
		left: 0;
		top: 4px;
		width: 12px;
		height: 12px;
	}
	.itemimg img,
	.itemimg i {
		vertical-align: top;
	}
	.itemimg i {
		font-size: 14px;
	}
	.itemimg img {
		width: 100%;
		height: 100%;
	}
	.itemdiv {
		position: relative;
		line-height: 22px;
	}
	.itemjiantou {
		position: absolute;
		top: 0px;
		right: -20px;
		width: 8px;
		height: 16px;
	}
</style>
