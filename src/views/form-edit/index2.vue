<template>
	<div :id="'layui-'+$root.store.bgcolor" class="main">
		<h3 style="padding: 20px;">新建项目</h3>
		<div class="form-tables">
			<div class="formwrap">
				<div class="layui-form-item">
					<label class="layui-form-label">输入框</label>
					<div class="layui-input-block">
						<input type="text" name="" placeholder="请输入" autocomplete="off" class="layui-input">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.main {
		padding: 20px 0 0;
	}

	.form-tables {
		padding: 20px;
		margin: 0 20px 20px;
		background-color: white;
	}

	.formwrap {
		margin: 0 auto;
		max-width: 1000px;
	}
</style>
