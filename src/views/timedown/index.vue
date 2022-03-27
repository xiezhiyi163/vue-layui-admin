<template>
	<div :id="'layui-'+store.bgcolor">
		<div style="padding: 20px;">增量倒计时演示(不是商品列表的倒计时，使用interval，不要timeout一个个去增，会有误差)：</div>
		<div class="main">
			<div class="wrap">
				<!-- 倒计时 -->
				<div class="countdown">
					{{countdown}}
				</div>
				<div @click="setcountdown">
					{{countdownflag?'暂停倒计时':'开始倒计时'}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				countdown:'00:00:00:00',
				timestrmp:0,
				countdownfn:'',
				countdownflag:0
			}
		},
		methods:{
			tocountdown:function(){
				var _this = this;
				function Timedown(){
					this.flag = 0;
					this.setflag = function(){
						if(this.flag == 1){this.flag = 0}else{
							_this.timestrmp = 0;
							this.flag = 1;this.tocountdownfn()
						}
						return this.flag
					};
					this.tocountdownfn = function(){
						var timer = setInterval(()=>{
							if(this.flag == 1){
								_this.timestrmp = _this.timestrmp + 50
								// 总秒数
								var second = _this.timestrmp / 1000;
								// 天数
								var day = Math.floor(second / 3600 / 24)<10?'0'+Math.floor(second / 3600 / 24):Math.floor(second / 3600 / 24);
								// 小时
								var hr = Math.floor(second / 3600 % 24)<10?'0'+Math.floor(second / 3600 % 24):Math.floor(second / 3600 % 24);
								// 分钟
								var min = Math.floor(second / 60 % 60)<10?'0'+Math.floor(second / 60 % 60):Math.floor(second / 60 % 60);
								// 秒
								var sec = Math.floor(second % 60)<10?'0'+Math.floor(second % 60):Math.floor(second % 60);
								//毫秒
								var millsec = ((second * 1000) % 1000)<10?('0'+((second * 1000) % 1000)):((second * 1000) % 1000)
								var lastmillsec = Math.floor(millsec) / 10 < 10 ? ('0' +  Math.floor(millsec) / 10) :  (Math.floor(millsec) / 10)
								//最后的显示时间
								_this.countdown = ((hr * day) < 10 ? ('0' + (hr * day)) : (hr * day)) + ':' + min + ':' + sec + ':' + lastmillsec
									// if(_this.timestrmp > 60000) {
									// 	_this.countdownflag = 0
									// 	this.flag = 0
									// 	return;
									// }
							}else{
								clearInterval(timer)
							}
						},50)
					}
				}
				this.countdownfn = new Timedown()
			},
			setcountdown:function(){
				this.countdownflag = this.countdownfn.setflag()
			}
		},
		watch:{
			'$root.store':{
				immediate:true,
				deep:true,
				handler(o,n) {
					this.store = {}
					for(var i in this.$root.store) {
						this.store[i] = this.$root.store[i]
					}
				}
			}
		},
		mounted() {
			this.tocountdown()
		}
	}
</script>

<style scoped="scoped">
	.main {
		padding-top: 20px;
	}
	.wrap {
		margin: 0 20px 20px;
		padding: 20px;
		background-color: white;
	}
	.countdown {
		text-align: center;
	}
</style>
