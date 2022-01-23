<template>
	<div class="iconcenter">
		<div class="contbox">
			<div class="contboxin left">
				天气信息展示
			</div>
			<div class="contcentericon">
				·
			</div>
		</div>
		<div class="contbox">
			<div class="contboxin right">
				天气信息展示
			</div>
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
</script>

<style scoped>
	.iconcenter .contbox {
		position: relative;
		float: left;
		width: 50%;
		height: 90px;
	}
	.iconcenter .contbox .left {
		margin-right: 45px;
	}
	.iconcenter .contbox .right {
		margin-left: 45px;
	}
	.iconcenter .contboxin {
		height: 100%;
		line-height: 90px;
		text-align: center;
		border: 1px solid #ccc;
	}
	.iconcenter .contcentericon {
		position: absolute;
		right: -45px;
		top: 0;
		width: 90px;
		height: 90px;
		line-height: 90px;
		text-align: center;
		border: 1px solid #ccc;
		border-left: 0;
		border-right: 0;
		font-size: 90px;
		color: #ffff00;
	}
</style>
