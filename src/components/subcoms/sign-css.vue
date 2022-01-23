<template>
	<div style="padding: 10px 0;">
		<div class="signwrap-css">
			<div class="signitem-css" v-for="v in 13">css</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.signwrap-css {
		width: 550px;
	}
	.signitem-css {
		display: inline-block;
		margin: 0 5px;
		width: 100px;
		height: 66px;
		background-color: #ccc;
	}
	@media (min-width:1200px) {
		.signitem-css:nth-of-type(9n-8) {
			margin-left: 57.5px;
		}
	}
	@media (max-width:1200px) {
		.signitem-css:nth-of-type(11),
		.signitem-css:nth-of-type(12),
		.signitem-css:nth-of-type(13) {
			display: none;
		}
	}
	@media (max-width:1200px) and (min-width:540px) {
		.signwrap-css {
			width: 450px;
		}
		.signitem-css:nth-of-type(7n-6) {
			margin-left: 57.5px;
		}
	}
	@media (max-width:539px) and (min-width:430px) {
		.signwrap-css {
			width: 350px;
		}
		.signitem-css:nth-of-type(5n-4) {
			margin-left: 57.5px;
		}
	}
	@media (max-width:429px) {
		.signwrap-css {
			width: 180px;
		}
		.signitem-css {
			width: 50px;
			height: 36px;
		}
		.signitem-css:nth-of-type(5n-4) {
			margin-left: 35.5px;
		}
	}
</style>
