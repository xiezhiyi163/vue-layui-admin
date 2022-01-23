<template>
	<div class="itemwrap">
	  <div class="hello">
		<div class="detailmain">
			<div class="detail-table">
				<div class="detail-cell">
					<img class="detail-img" src="" alt="">
				</div>
				<div class="detail-cell" style="width: 100%;">
					<div class="detail-info">
						<div class="detail-title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
						<div class="detail-jiangli">
							<!-- * -->
						</div>
						<div class="detail-nowprice">
							<div class="detail-nowpricesign">￥ </div>
							<div class="detail-nowpricesnum"> 0.00</div>
							<div class="detail-oldpricesnum"> ￥ 0.00</div>
						</div>
					</div>
				</div>
			</div>
			<div class="detail-num">x1</div>
		</div>
	  </div>		
	</div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.itemwrap {
		padding: 20px 10px 0;
	}
	.hello {
		min-height: 120px;
		border-radius: 8px;
		border: 1px solid #ccc;
	}
	.detailmain {
		position: relative;
	}
	.detail-table {
		width: 100%;
	}
	.detail-cell {
		vertical-align: top;
		word-break: break-word;
	}
	.detail-img {
		position: relative;
		width: 100%;
		height: 100px;
		background-color: #eee;
		border-radius: 8px 8px 0 0;
		overflow:hidden;
	}
	.detail-info {
		padding: 0px 10px 10px;
	}
	.detail-title {
		display: -webkit-box;
		position: relative;
		min-height: 30px;
		max-height: 42px;
		margin-top: 10px;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.detail-jiangli {
		height: 37px;
	}
	.detail-nowpricesign,.detail-nowpricesnum {
		display: inline-block;
		color: orangered;
	}
	.detail-nowpricesign {
		font-size: 12px;
	}
	.detail-nowpricesnum {
		font-size: 24px;
	}
	.detail-oldpricesnum {
		display: inline-block;
		margin-left: 5px;
		color: #999;
		font-size: 12px;
		text-decoration: line-through;
	}
	.detail-num {
		position: absolute;
		bottom: 15px;
		right: 10px;
	}
</style>
