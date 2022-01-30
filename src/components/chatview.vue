<template>
	<div>
		<div class="chatbox" :style="{height:winheight - 71 + 'px',width:winw - 40 +'px',right:ifshowchat == 1?'':'-100%'}">
			<div class="iframe">
				<iframe :src="link" style="width:100%;height: 100%;" frameborder="0"></iframe>
			</div>
			<div class="btn" @click="ifshowchat == 1?ifshowchat = 2:ifshowchat = 1">
				<i class="fa fa-comments" aria-hidden="true"></i>
			</div>
		</div>
		<div class="btn" style="right: 0;left: auto;margin-top: 60px;position: fixed;" v-if="ifshowchat == 2" @click="ifshowchat == 1?ifshowchat = 2:ifshowchat = 1">
			<i class="fa fa-comments" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				winheight:'',
				winw:'',
				link:'#/chatpage',
				ifshowchat:2,//1为出现，2为不出现
			}
		},
		methods:{
			listens:function(){
				this.winheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
				this.winw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
				window.addEventListener('resize',()=>{
					this.winheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
					this.winw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
				})
			}
		},
		mounted() {
			this.listens()
		}
	}
</script>

<style scoped="scoped">
	.chatbox {
		position: fixed;
		top: 70px;
		right: 0;
		max-width: 500px;
		z-index: 1;
		background-color: #fff;
		transition:right 500ms;
	}
	.chatbox .iframe {
		position: relative;
		width:100%;height: 100%;
		z-index: 2;
		box-shadow: 0 0 20px 0 #aaa;
		border-left: 1px solid #ccc;
	}
	.btn {
		position: absolute;
		top: 50%;
		left: -30px;
		width: 30px;
		height: 30px;
		line-height: 30px;
		transform: translateY(-50%);
		background-color: #ffff7f;
		box-shadow: 0 0 10px 0 #aaa;
		text-align: center;
		cursor: pointer;
	}
	.btn i {
		color: #B084EB;
	}
</style>
