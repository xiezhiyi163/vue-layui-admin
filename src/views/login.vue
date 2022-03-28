<template>
	<div>
		<div class="main">
			<div class="loginwrap layui-form">
				<div class="logotitle">
					VUE ADMIN COMS
				</div>
				<!--  -->
				<div class="formx-input-wrap">
					<div class="formx-input-table">
						<div class="formx-input-cell">
							<div class="formx-input-label none"><div class="required none">*</div>账号：</div>
						</div>
						<div class="formx-input-cell cell100">
							<div class="formx-input-textbox">
								<div class="formx-input-table">
									<div class="formx-input-cell">
										<div class="formx-input-sublabel">
											<div class="formx-input-sublabel small"><div class="required none">*</div>账号：</div>
										</div>
									</div>
									<div class="formx-input-cell cell100">
										<input placeholder="请输入账号" type="text" oninput="" onfocus="" onblur="" onpropertychange="">
									</div>
									<div class="formx-input-cell">
										<!-- <button>获取验证码</button> -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--  -->
				<div class="formx-input-wrap">
					<div class="formx-input-table">
						<div class="formx-input-cell">
							<div class="formx-input-label none"><div class="required">*</div>密码：</div>
						</div>
						<div class="formx-input-cell cell100">
							<div class="formx-input-textbox">
								<div class="formx-input-table">
									<div class="formx-input-cell">
										<div class="formx-input-sublabel">
											<div class="formx-input-sublabel small"><div class="required none">*</div>密码：</div>
										</div>
									</div>
									<div class="formx-input-cell cell100">
										<input placeholder="请输入密码" type="password" oninput="" onfocus="" onblur="" onpropertychange="">
									</div>
									<div class="formx-input-cell">
										<!-- <button>获取验证码</button> -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--  -->
				<div class="btnwrap">
					<div type="button" class="layui-btn" @click="toindex()">登录</div>
				</div>
				<!--  -->
				<div class="btnwrap layui-form-item" style="text-align: left;">
					<input type="checkbox" title=" "/> 我已阅读并同意相关协议
				</div>
			</div>
		</div>
		<!--  -->
		<div class="bg"></div>
		<div class="bg2"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				$layui:''
			}
		},
		methods:{
			toindex:function(){
				//模拟登录拿到root
				sessionStorage.setItem('userroot','admin')
				this.$layui.layer.msg('登陆成功');
				setTimeout(()=>{
					this.$router.replace({'name':'Home'})
				},2000)
			}
		},
		mounted(){
			layui.use(['form','layer'],()=>{
				this.$layui = layui
				var form = this.$layui.form
				form.render()
			})
		}
	}
</script>

<style>
	.layui-form-checkbox i {
		border-left: 1px solid #d2d2d2;
	}
	.btnwrap .layui-form-checkbox {
		top: -3px;
		transform: scale(.7);
	}
	.layui-btn {
		background-color: #7db0ef;
	}
</style>
<style scoped="scoped">
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background-color: #7db0ef;
	}
	.bg2 {
		position: fixed;
		top: 50%;
		left: 0;
		width: 100%;
		height: 50%;
		background-color: #c0b1ef;
	}
	.main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		text-align: center;
		z-index: 1;
	}
	.loginwrap {
		display: inline-block;
		position: relative;
		top: 50%;
		left: 0;
		width: 500px;
		height: 400px;
		transform: translateY(-50%);
		box-shadow: 0 5px 10px 0 #777;
		background-color: #fff;
		text-align: left;
	}
	.logotitle {
		padding: 40px 20px 20px;
		font-size: 30px;
		font-weight: 800;
		text-align: center;
	}
	.formx-input-wrap {
		margin: 20px 20px 0;
	}
	.formx-input-table {
		display: table;
		width: 100%;
	}
	.formx-input-cell {
		display: table-cell;
		vertical-align: top;
	}
	.formx-input-table .cell100 {
		width: 100%;
	}
	.formx-input-cell input {
		display: inline-block;
		line-height: 16px;
		width: 100%;
	}
	.formx-input-cell .tips {
		margin: 10px 0;
		width: 100%;
		min-height: 100px;
		line-height: normal;
	}
	.formx-input-cell button {
		display: block;
		margin-top: 5px;
		padding: 0 10px;
		height: 30px;
		white-space: nowrap;
		line-height: 30px;
		background-color: transparent;
		color: red;
	}
	.formx-input-cell .none{
		display: none !important;
	}
	.formx-input-cell .required {
		display: inline-block;
		color: red;
	}
	.formx-input-label,
	.formx-input-sublabel {
		margin-right: 10px;
		width: 120px;
		height: 40px;
		line-height: 40px;
		text-align: right;
	}
	.formx-input-sublabel {
		text-align: left;
	}
	.formx-input-sublabel .small {
		position: absolute;
		display: inline-block;
		top: 8px;
		left: 10px;
		padding-bottom: 3px;
		vertical-align: middle;
		height: 24px;
		line-height: 24px;
		width: auto !important;
	}
	.formx-input-textbox {
		position: relative;
		padding: 0 10px;
		min-height: 40px;
		line-height: 40px;
		border: 1px solid #0098F7;
		border-radius: 5px;
	}
	.btnwrap {
		padding: 30px 30px 0;
		text-align: center;
	}
</style>
