<template>
	<div>
		<div class="tabs_wrap">
			<!-- left -->
			<div class="tabs_leftbutton" v-show="showlr" @click="toleft()">{{'<'}}</div>
			<!-- tabview -->
			<div class="tabs_subwrap" :style="{left:!showlr?'-20px':''}">
				<div class="tabs_sliderwrap">
					<!-- item:active -->
					<div class="tabs_item" v-for="(v,i) in list" @click="itemactive(i)" :style="{zIndex:list.length-i}">
						<div class="tabs_itemin" :class="{active:activeid == v.id}">
							<div class="tabs_close" v-show="!v.notclose" @click.stop="delitem(i)">×</div>
							<div class="tabs_info" :style="{left:v.notclose?'0':''}">
								{{v.name||'home'}}
							</div>
						</div>
						<div class="tabs_itemright"></div>
					</div>
				</div>
			</div>
			<!-- right -->
			<div class="tabs_rightbutton" v-show="showlr" @click="toright()">{{'>'}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		//如果不是setup语法糖，这个要打开来接收
		props:{
			list:{
				type: null,
				default:[]
			},
			activeid:{
				type: null,
				default:''
			},
			iftocenter:{
				type: null,
				default:0
			}
		},
		data(){
			return {
				lengths:0,
				showlr:0,
			}
		},
		methods:{
			listenwidth:function(){
				//监听宽度
				const tabs_subwrap = document.querySelectorAll('.tabs_subwrap')[0]
				const tabs_sliderwrap = document.querySelectorAll('.tabs_sliderwrap')[0]
				const tabs_wrap = document.querySelectorAll('.tabs_wrap')[0]
				const tabs_item = document.querySelectorAll('.tabs_item')
				const tabs_leftbutton = document.querySelectorAll('.tabs_leftbutton')[0]
				//适配右边调节
				var temp = tabs_wrap.getBoundingClientRect().left + tabs_leftbutton.offsetWidth
				if(tabs_sliderwrap.getBoundingClientRect().left - temp < -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth) && tabs_sliderwrap.offsetWidth>tabs_subwrap.offsetWidth){
					tabs_sliderwrap.style.left = -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)+'px'
				}else if(tabs_sliderwrap.offsetWidth<tabs_subwrap.offsetWidth){
					tabs_sliderwrap.style.left = 0+'px'
				}
				//是否打开左右按钮
				var widths = 0
				for(var i=0;i<tabs_item.length;i++){
					widths+=tabs_item[i].offsetWidth
				}
				if(tabs_subwrap.offsetWidth<widths){
					this.showlr = 1
				}else{
					this.showlr = 0
				}
				//监听数据长度
				if(this.lengths < this.list.length){
					this.lengths = this.list.length
					if(tabs_sliderwrap.offsetWidth>tabs_subwrap.offsetWidth){
						tabs_sliderwrap.style.left = -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)+'px'
					}
				}
			},
			toleft:function(){
				const tabs_sliderwrap = document.querySelectorAll('.tabs_sliderwrap')[0]
				const tabs_wrap = document.querySelectorAll('.tabs_wrap')[0]
				const tabs_leftbutton = document.querySelectorAll('.tabs_leftbutton')[0]
				var temp = tabs_wrap.getBoundingClientRect().left + tabs_leftbutton.offsetWidth//用来排除可视区以外的位置
				var distence = 200//移动的距离========================
				if(tabs_sliderwrap.getBoundingClientRect().left - temp < 0) {
					tabs_sliderwrap.style.left = tabs_sliderwrap.getBoundingClientRect().left - temp + distence + 'px'
					if(tabs_sliderwrap.getBoundingClientRect().left - temp > 0){
						tabs_sliderwrap.style.left = 0+'px'
					}
				}
			},
			toright:function(){
				const tabs_subwrap = document.querySelectorAll('.tabs_subwrap')[0]
				const tabs_sliderwrap = document.querySelectorAll('.tabs_sliderwrap')[0]
				const tabs_wrap = document.querySelectorAll('.tabs_wrap')[0]
				const tabs_leftbutton = document.querySelectorAll('.tabs_leftbutton')[0]
				var temp = tabs_wrap.getBoundingClientRect().left + tabs_leftbutton.offsetWidth
				var distence = 200//移动的距离========================
				if(tabs_sliderwrap.getBoundingClientRect().left - temp > -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)) {
					tabs_sliderwrap.style.left = tabs_sliderwrap.getBoundingClientRect().left - temp - distence + 'px'
					if(tabs_sliderwrap.getBoundingClientRect().left - temp < -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)){
						tabs_sliderwrap.style.left = -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)+'px'
					}
				}
			},
			delitem:function(i){
				//触发删除事件
				this.$emit('delitem',{ind:i})
				this.lengths = this.list.length
				//是否居中
				if(this.iftocenter){
					setTimeout(()=>{
						for(var k=0;k<this.list.length;k++){
							if(this.list[k].id == this.activeid){
								this.tocenter(k)
							}
						}
					},10)
				}
			},
			itemactive:function(i){
				this.$emit('itemactive',{ind:i,title:this.list[i].name})
				if(this.iftocenter){
					this.tocenter(i)
				}
			},
			tocenter:function(i){
				const tabs_item = document.querySelectorAll('.tabs_item')
				const tabs_subwrap = document.querySelectorAll('.tabs_subwrap')[0]
				const tabs_sliderwrap = document.querySelectorAll('.tabs_sliderwrap')[0]
				const tabs_wrap = document.querySelectorAll('.tabs_wrap')[0]
				const tabs_leftbutton = document.querySelectorAll('.tabs_leftbutton')[0]
				var temp = tabs_wrap.getBoundingClientRect().left + tabs_leftbutton.offsetWidth
				//
				if(tabs_sliderwrap.offsetWidth>tabs_subwrap.offsetWidth){
					var tempdistence = ((tabs_subwrap.offsetWidth - tabs_item[i].offsetWidth) / 2) - (tabs_item[i].getBoundingClientRect().left - temp)
					tabs_sliderwrap.style.left = tabs_sliderwrap.getBoundingClientRect().left - temp + tempdistence + 'px'
				}
				//
				if(tabs_sliderwrap.getBoundingClientRect().left - temp > 0){
					tabs_sliderwrap.style.left = 0+'px'
				}else if(tabs_sliderwrap.getBoundingClientRect().left - temp < -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)){
					tabs_sliderwrap.style.left = -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)+'px'
					if(tabs_sliderwrap.offsetWidth<tabs_subwrap.offsetWidth){
						tabs_sliderwrap.style.left = 0+'px'
					}
				}
			}
		},
		mounted(){
			this.listenwidth()
			window.addEventListener('resize',()=>{
				if(this.listenwidth && document.querySelectorAll('.tabs_subwrap')[0]){
					this.listenwidth()
				}
			})
		}
	}
</script>

<style scoped="scoped">
	.tabs_wrap {
		position: relative;
		margin-top: -3px;
		height: 33px;
		/* border-bottom: 1px solid #687cac; */
		overflow: hidden;
	}
	.tabs_leftbutton,
	.tabs_rightbutton {
		position: absolute;
		top: 3px;
		width: 20px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
		color: white;
	}
	.tabs_leftbutton {
		left: 0;
	}
	.tabs_rightbutton {
		right: 0;
	}
	.tabs_subwrap {
		position: relative;
		margin: 0 20px;
		padding-top: 0px;
		overflow: hidden;
	}
	.tabs_sliderwrap {
		position: relative;
		display: inline-block;
		white-space: nowrap;
		font-size: 0;
	}
	.tabs_item {
		position: relative;
		display: inline-block;
		height: 30px;
		font-size: 16px;
	}
	.tabs_close {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		border-radius: 50%;
		visibility: hidden;
	}
	.tabs_info {
		position: relative;
		font-size: 12px;
	}
	.tabs_itemin {
		position: relative;
		display: inline-block;
		padding: 0 30px;
		height: 30px;
		line-height: 30px;
		vertical-align: bottom;
		/* border: 1px solid #687cac; */
		border: 1px solid transparent;
		border-bottom: 0;
		cursor: pointer;
		/* background-color: #687cac; */
		color: #fff;
	}
	.tabs_itemin:hover .tabs_close{
		visibility: visible;
	}
	.tabs_itemin:hover .tabs_info {
		left: -10px;
	}
	.tabs_item .active {
		height: 30px;
		line-height: 30px;
		/* border-radius: 10px 10px 0 0; */
		background-color: #f5f5f5;
		border: 1px solid #f5f5f5;
		/* color: #0000FF; */
		color: #8b84b5;
		transition: 300ms;
	}
	.tabs_itemright {
		display: inline-block;
		height: 30px;
	}
</style>
