<template>
  <div class="detail">
	  <div class="table">
		<div class="cell info-desc" style="width: 60%;">
			<div class="info-desc-box">
				<div class="imginfo">
					<div class="img"></div>
					<div class="info">
						<div class="title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
						<div class="subtitle">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</div>
					</div>
				</div>
				<div class="img-desc">
					<div class="img"></div>
					<div class="img"></div>
					<div class="img"></div>
					<div style="clear: both;"></div>
				</div>		
				<div class="img-desc-wrap">
					一些补充说明之类的
				</div>
			</div>
		</div>
		<div class="cell">
			<div class="btnwrap">
				按钮集
			</div>
		</div>		  
	  </div>
  </div>
</template>

<script>
export default {
	
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.detail {
		position: relative;
		min-height: 120px;
		padding: 10px;
		border: 1px solid #ccc;
		overflow: hidden;
	}
	.detail .table {
		display: table;
		width: 100%;
	}
	.detail .cell {
		display: table-cell;
		height: .1px;
		vertical-align: top;
	}
	.detail .info-desc-box {
		position: relative;
		padding-right: 180px;
	}
	.detail .imginfo {
		position: relative;
		min-height: 100px;
		padding-left: 100px;
	}
	.detail .imginfo .img {
		position: absolute;
		top: 0px;
		left: 0px;
		margin: 0px 0 10px 0px;
		width: 100px;
		height: 100px;
		background-color: #eee;
	}
	.detail .imginfo .title,
	.detail .imginfo .subtitle {
		margin:0 10px 10px;		
	}
	.detail .imginfo .title {
		display: -webkit-box;
		position: relative;
		max-height: 40px;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;		
	}
	.detail .imginfo .subtitle {
		position: relative;
		display: -webkit-box;
		max-height: 20px;
		font-size: 12px;
		color: #bbb;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;		
	}
	.detail .img-desc {
		margin: 10px 10px 0 0;
		border-top: 1px solid #ccc;
	}
	.detail .img-desc .img {
		float: left;
		width: 100px;
		height: 100px;
		margin: 10px 10px 0 0;
		background-color: #eee;
	}
	.detail .img-desc-wrap {
		position: absolute;
		top: 0;
		right: 0;
		padding-left: 10px;
		padding-right: 10px;
		height: 100%;
		width: 160px;
		border-left: 1px solid #ccc;
	}
	.detail .btnwrap {
		min-width: 300px;
		padding-left: 10px;
		height: 100%;
		border-left: 1px solid #ccc;
	}
	
	@media (max-width:1000px) {
		.detail .info-desc-box {
			padding-right: 0;
		}
		.detail .img-desc-wrap {
			position: relative;
			margin-top: 10px;
			margin-right: 10px;
			padding-top: 10px;
			width: auto;
			border-top: 1px solid #ccc;
			border-left: 0;
		}
	}
	@media (max-width:750px) {
		.detail .table,
		.detail .cell{
			display: block;
		}
		.detail .cell {
			width: 100% !important;
			height: auto;
		}
		.detail .imginfo .title,
		.detail .imginfo .subtitle {
			margin-right:0px;		
		}
		.detail .img-desc {
			margin-right: 0;
		}
		.detail .img-desc-wrap {
			margin-right: 0px;
		}
		.detail .btnwrap {
			padding-top: 10px;
			margin-top: 10px;
			border-top: 1px solid #ccc;
			border-left: 0;
		}
	}
</style>
