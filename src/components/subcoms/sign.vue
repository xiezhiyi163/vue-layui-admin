<template>
	<div style="padding: 10px 0;">
		<div class="signwrap" :style="{width:width+'px'}">
			<div class="signitem" v-for="(v,i) in length" :style="{marginLeft:i==0?(itemwidth==50?'35.5px':'57.5px'):(i%num==0?(itemwidth==50?'35.5px':'57.5px'):''),width:itemwidth+'px',height:itemheight+'px'}">js</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				width:550,
				num:9,
				itemwidth:100,
				itemheight:100,
				length:13//总数最大13个
			}
		},
		methods:{
			setdom:function(){
				var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
				//原生的话，每个地方都有dom操作
				if(width>430){
					this.itemwidth = 100
					this.itemheight = 66
					if(width>1200){
						this.length = 13
						this.width = 550
						this.num = 9
					}else if(width<=1200&&width>540){
						this.length = 10
						this.width = 450
						this.num = 7
					}else{
						this.length = 10
						this.width = 350
						this.num = 5
					}
				}else{
					this.itemwidth = 50
					this.itemheight = 36
					this.length = 10
					this.width = 180
					this.num = 5
				}
			}
		},
		mounted() {
			this.setdom()
			window.addEventListener('resize',()=>{
				this.setdom()
			})
		}
	}
</script>

<style scoped="scoped">
	.signwrap {
		margin: 0 auto;
	}
	.signitem {
		display: inline-block;
		margin: 0 5px;
		background-color: #eee;
	}
</style>
