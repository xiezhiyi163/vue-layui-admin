<template>
	<div class="home">
		<div class="top" style="min-width: 355px;">
			<div class="topin" :style="{marginLeft:showleft?'':(subshowleft?'':'0px'),boxShadow:(!showleft?'0 0 10px 0 #333':'')}">
				<div class="menuicon" v-show="showleft" @click="ifshownavs()">&equiv;</div>
				<div class="menuicon2" v-show="showleft">&equiv;</div>
				<div class="menuicon2" v-show="subshowleft">&equiv;</div>
				<div class="title" :style="{marginLeft:showleft?'':'20px'}"><span class="titlein" @click="$router.replace({name:'index'})">组件管理系统 </span><a>>>></a> {{activetitle}}</div>
				<div class="rightbtns">
					<!-- 顶部的附加按钮 -->
					<searchbar @additems="additem" v-if="showleft?true:(subshowleft?true:false)"></searchbar>
					<div class="head">
						<div class="headimg"></div>
						<div class="headbtnwrap">
							<div class="headbtnwrapin">
								<div class="headbtnitem" @click="opendoc()">admindoc</div>
								<div class="headbtnitem" @click="loginout()">退出</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="left" :style="{left:ifshownav?'0px':'',display:showleft?'':(subshowleft?'':'none')}">
			<div class="lefttop"></div>
			
			<leftnav v-for="(v,i) in navlist" :item="v" :index="0" :tabsactive="activeid" :parentidlist="idlist" firstnav="Home" @additems="additem"></leftnav>
			
		</div>
		<div class="leftshade" @click="ifshownavs()" v-if="ifshownav"></div>
		<div class="tabs" style="min-width: 355px;">
			<div class="tabsin" v-show="showleft">
				
				<tabs :list="tablist" iftocenter="1" :activeid="activeid" @delitem="deltablistitem"
					@itemactive="changeactive"></tabs>
				
			</div>
		</div>
		<!-- 视图区 -->
		<div class="view" style="min-width: 355px;" :style="{marginLeft:showleft?'':(subshowleft?'':'0px'),marginTop:showleft?'':'60px'}">
			
			<div v-if="showleft">
				<router-view v-slot="{ Component }">
				  <transition mode='out-in' name="fade-transform">
					<component :is="Component" />
				  </transition>
				</router-view>
			</div>
			<div v-else>
				<router-view></router-view>
			</div>
			
			<div class="footer">@power - vue layui</div>
			<chatview></chatview>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import {_routes} from '../router/routerMap.js'
	import {_rec_routes} from '../router/recurrence-router.js'
	import {
		recurrence,
		getthisandparent,
		userroot,
		ifleftclick,
		leftclick
	} from '../assets/js/common.js'
	import searchbar from '../components/searchbar.vue'
	import chatview from '../components/chatview.vue'
	
	
	import leftnav from '../components/leftnav.vue'
	
	
	import tabs from '../components/tabs.vue'
	export default {
		name: "Home",
		components: {
			searchbar,
			chatview,
			
			leftnav,
			
			
			//选项卡相关
			tabs
		},
		data() {
			return {
				root:[],//获取到的权限类型或者名称
				ifshownav:0,//是否显示左侧导航
				showleft:1,
				subshowleft:0,
				//路由配置（核心部分）
				navlist: [/* 路由的name属性 直接配置到 tablist的id和name那里 路由动态配置的show就是路由是否显示(或者可以用其他方式) */],
				//点击子集之后的父级idlist
				idlist:[],
				//权限处理完毕
				load:0,
				
				
				//选项卡相关
				tablist: [
					{
						id:'index',
						name:'首页',
						notclose:1
					}
				],
				activeid: 'index',
				activetitle:'首页'
			}
		},
		methods: {
			//操作左侧显示
			ifshownavs:function(){
				this.ifshownav = !this.ifshownav
			},
			//权限处理
			rootset: function(list) {
				this.navlist = recurrence(this.navlist, [this.root])//this.root是用户登陆后返回的权限角色
			},
			//请求处理路由权限配置
			routereset: function(res,fn){
				//模拟通过后台获取路由权限
				var arr = []
				function fns(list){
					list.map(item=>{arr.push(item.name);if(item.children){fns(item.children)}})
				}
				fns(_rec_routes)
				var res = res.constructor.toString().indexOf('Array')==-1?arr:res
				this.root = userroot||'admin'//这个是登录后后台返回的，只需要返回一个
				//递归处理root
				var templist = this.navlist
				var setroot = (list) => {
					for(var i in list){
						if(list[i].root != -1){
							if(list[i].root.indexOf(this.root)==-1){
								if(res.indexOf(list[i].name)!=-1){
									list[i].root = [this.root]
								}
							}
							if(list[i].children){
								setroot(list[i].children)
							}
						}
					}
					return list
				}
				this.navlist = setroot(templist)
				//回调
				fn()
			},
			
			
			//选项卡处理
			toadditem: function(obj,nav,ifgetquery){
				var hadtab = 0
				var id = 0
				var title = ''
				for (var i = 0; i < this.tablist.length; i++) {
					if (obj.name == this.tablist[i].id) {
						hadtab = 1;
						id = this.tablist[i].id
						title = this.tablist[i].name
					}
				}
				
				//获取当前和父级相同属性，写到一个数组用于子层级的父级匹配
				
				this.idlist = getthisandparent()(_routes[1].children,obj.name,'name')
				
				//追加item
				if(nav){
					this.ifshownav = !this.ifshownav
				}
				var query = {}
				if(this.$route.query){
					query = this.$route.query
				}
				if (hadtab == 1) {
					this.activeid = id
					this.activetitle = title
					//跳转
					if(ifgetquery){
						this.$router.replace({'name':obj.name,query,})
					}else{
						this.$router.replace({'name':obj.name})
					}
					return;
				}
				this.tablist.push({
					id: obj.name,
					name: obj.title,
				})
				this.activeid = obj.name
				this.activetitle = obj.title
				//跳转
				if(ifgetquery){
					this.$router.replace({'name':obj.name,query,})
				}else{
					this.$router.replace({'name':obj.name})
				}
			},
			additem: function(obj,nav) {
				if(obj.name == '_') return;
				//
				setTimeout(()=>{
					this.toadditem(obj,nav)
				})
			},
			deltablistitem: function(data) {
				//判断激活哪个
				var flag = 0
				sessionStorage.setItem('nodel',2)
				if (this.tablist[data.ind].id == this.activeid) {
					flag = 1
				}
				//操作删除
				this.tablist.splice(data.ind, 1)
				//重新激活
				if (flag == 1) {
					if (this.tablist[data.ind]) {
						this.activeid = this.tablist[data.ind].id
						this.activetitle = this.tablist[data.ind].name
						this.idlist = getthisandparent()(_routes[1].children,this.tablist[data.ind].name,'name')
					} else {
						this.activeid = this.tablist[data.ind - 1].id
						this.activetitle = this.tablist[data.ind - 1].name
						this.idlist = getthisandparent()(_routes[1].children,this.tablist[data.ind - 1].name,'name')
					}
				}
				//跳转
				var query = {}
				if(this.$route.query){
					query = this.$route.query
				}
				if(flag){
					this.$router.replace({'name':this.activeid})
				}else{
					this.$router.replace({'name':this.activeid,query,})
				}
			},
			changeactive: function(data) {
				setTimeout(()=>{
					var ifgetquery = 0
					if(this.activeid == this.tablist[data.ind].id){
						ifgetquery = 1
					}
					this.activeid = this.tablist[data.ind].id
					this.activetitle = data.title
					
					//获取当前和父级相同属性，写到一个数组用于子层级的父级匹配
					
					this.idlist = getthisandparent()(_routes[1].children,this.tablist[data.ind].id,'name')
					//跳转
					var query = {}
					if(this.$route.query){
						query = this.$route.query
					}
					if(ifgetquery){
						this.$router.replace({'name':this.activeid,query,})
					}else{
						this.$router.replace({'name':this.activeid})
					}
				})
			},
			//自动匹配处理
			tothispath:function(path){
				if(this.$route.path != '/home/index'&&this.$route.path != '/home'&&this.$route.path != '/home/'&&path != '_'){
					var arr = []
					function fn(list){
						list.map(item=>{arr.push({name:item.name,title:item.title,id:item.id});if(item.children){fn(item.children)}})
					}
					fn(_rec_routes)
					if(arr.find(item=>item.name == path)){
						var temp = arr.find(item=>item.name == path)
						this.activeid = temp.id
						this.activetitle = temp.title
						if(this.load == 0){
							this.load = 1
							this.toadditem(arr.find(item=>item.name == path),null,1)
						}
					}
				}else{
					this.activeid = 'index'
					this.activetitle = '首页'
					this.idlist = []
					var query = {}
					if(this.$route.query){
						query = this.$route.query
					}
					if(location.hash != '/home/index'){
						this.$router.replace({name:'index',query,})
					}
				}
			},
			ifthisroute:function(){
				var arr = []
				function fn(list){
					list.map(item=>{arr.push({name:item.name,title:item.title,id:item.id});if(item.children){fn(item.children)}})
				}
				fn(_rec_routes)
				var thispath = this.$route.path.split('/')[this.$route.path.split('/').length-1]
				if(arr.find(item=>item.name == thispath)){
					var temp = arr.find(item=>item.name == thispath)
					this.activeid = temp.id
					this.activetitle = temp.title
					this.toadditem(arr.find(item=>item.name == thispath),null,1)
				}
				//------------------------------------
				if(arr.find(item=>item.name == thispath)){
					this.showleft = 1//包含在导航里面的，左侧导航和标签打开
				}else{
					this.showleft = 0//不包含的，关闭
				}
				//非导航页面的是否显示左侧导航的判断
				if(this.$route.meta.subpageshowleft == 1){
					this.subshowleft = 1//左侧导航打开
					if(this.$route.meta.hasOwnProperty('isform')){
						if(this.$route.meta.isform != 1){
							this.subshowleft = 0//左侧导航关闭
						}
					}else{
						this.subshowleft = 0//左侧导航关闭
					}
				}else{
					this.subshowleft = 0//左侧导航关闭
				}
			},
			//layui弹框处理
			opendoc:function(){
				layui.use(['layer'],()=>{
					layui.layer.open({
						title:'项目使用提示',
						type:2,
						content:'#/admindoc',
						move:false
					})
				})
			},
			//退出
			tologinout:function(){
				layui.use(['layer'],()=>{
					layui.layer.msg('成功登出');
					sessionStorage.removeItem('userroot')
					setTimeout(()=>{
						this.$router.replace({'name':'login'})
					},2000)
				})
			},
			loginout:function(){
				if(this.$route.meta.hasOwnProperty('isform')){
					if(this.$route.meta.isform == 1){
						var l = confirm('表单未提交，确定退出吗？')
						if(l){
							leftclick(1)//表单页的时候，退出也调用这个就行
							this.tologinout()
						}
					}
				}
				else{
					this.tologinout()
				}
			}
		},
		watch:{
			$route(news,old){
				var thispath = this.$route.path.split('/')[this.$route.path.split('/').length-1]
				this.tothispath(thispath);
				this.ifthisroute()
			}
		},
		mounted() {
			leftclick(0)
			this.navlist = _rec_routes
			//重新配置root
			this.routereset(
				['index','recurrence','coms','common-coms','swipertest','table_drag_test','jsmindtest','mxgraphtest'],//后台返回的该用户选中的页面
				()=>{
					this.rootset(this.navlist)
					//进来之后如果不是首页就打开对应的
					var thispath = this.$route.path.split('/')[this.$route.path.split('/').length-1]
					this.tothispath(thispath)
					this.ifthisroute()
				}
			)
		}
	};
</script>

<style>
	.layui-layer-iframe {
		width: 70%;
		height: 70%;
	}
	.layui-layer-iframe iframe {
		width: 100%;
		height: 100% !important;
	}
	.layui-layer-iframe .layui-layer-content {
		position: relative;
		top: -51px;
		padding-top:51px;
		height: 100%;
		box-sizing: border-box;
	}
	.layui-btn,
	.layui-form-checked[lay-skin="primary"] i {
		background-color: #7db0ef;
	}
	.layui-layer-shade {
		opacity: .8 !important;
	}
	
	.fade-transform-enter-active{
		position: relative;
		animation: scale 500ms;
	}
	.fade-transform-leave-active{
		position: relative;
		animation: scale2 500ms;
	}
	@keyframes scale {
	    0%{
			opacity: 0;
			left: -100px;
	    }
	    100%{
	        opacity: 1;
			left: 0px;
	    }
	}
	@keyframes scale2 {
	    0%{
			opacity: 1;
			left: 0px;
	    }
	    100%{
	        opacity: 0;
			left: -100px;
	    }
	}
</style>
<style scoped="scoped">
	.top {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: #6194df;
		z-index: 8;
	}
	
	.topin {
		margin-left: 210px;
		height: 60px;
	}
	
	.menuicon,
	.menuicon2 {
		display: none;
		padding: 0 15px;
		line-height: 60px;
		font-size: 40px;
		color: white;
		cursor: pointer;
	}
	
	.title {
		display: inline-block;
		vertical-align: top;
		margin-left: 20px;
		height: 60px;
		line-height: 60px;
		font-weight: 800;
		color: white;
	}
	
	.titlein {
		position: relative;
		vertical-align: middle;
		top: -2px;
		cursor: pointer;
		font-size: 22px;
	}
	
	.rightbtns {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
	}
	
	.head {
		position: relative;
		display: inline-block;
		vertical-align: top;
		margin-top: 12.5px;
		margin-right: 12.5px;
		width: 35px;
		height: 35px;
		background-color: #fff;
		border-radius: 50%;
	}
	
	.headimg {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
	}
	
	.head:hover .headbtnwrap {
		display: block;
	}
	
	.headbtnwrap {
		display: none;
		position: absolute;
		padding: 10px 0 0 0;
		top: 30px;
		right: 0;
		width: 210px;
	}
	
	.headbtnwrapin {
		padding-bottom: 20px;
		height: 100%;
		box-shadow: 0 0 10px 0 #ccc;
		background-color: #fff;
	}
	
	.headbtnitem {
		padding: 20px 0;
		margin: 0 20px;
		border-bottom: 1px solid #ccc;
		word-break: break-all;
		cursor: pointer;
	}
	.headbtnitem:hover {
		color: #71bdeb;
	}

	.left {
		position: fixed;
		top: 0;
		left: 0;
		width: 210px;
		height: 100%;
		background-color: #897da1;
		z-index: 9;
		transition: 300ms;
		overflow: hidden auto;
		box-shadow: 0 0 10px 0 #333;
	}
	
	.left::-webkit-scrollbar {
	  /*滚动条整体样式*/
	  width : 7px;  /*高宽分别对应横竖滚动条的尺寸*/
	  height: 1px;
	}
	.left::-webkit-scrollbar-thumb {
	  /*滚动条里面小方块*/
	  border-radius: 10px;
	  background   : #a299c5;
	}
	.left::-webkit-scrollbar-track {
	  /*滚动条里面轨道*/
	  border-radius: 10px;
	  background   : #857da2;
	}
	
	.lefttop {
		padding-top: 10px;
	}
	
	.leftshade {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		z-index: 6;
	}
	
	.tabs {
		position: fixed;
		top: 60px;
		left: 0px;
		width: 100%;
		background-color: #687cac;
		z-index: 5;
		box-shadow: 0 0 10px 0 #666;
	}
	
	.tabsin {
		margin-left: 210px;
	}

	.view {
		margin-top: 100px;
		margin-left: 210px;
	}
	
	
	.footer {
		padding: 20px;
		word-break: break-all;
		text-align: center;color: #aaa;
	}
	
	@media (max-width:760px) {
		.topin {
			margin-left: 0;
		}
		.menuicon {
			display: inline-block;
		}
		.title {
			margin-left: 0;
		}
		.left {
			left: -210px;
		}
		.leftshade {
			display: block;
		}
		.tabsin,
		.view {
			margin-left: 0px;
		}
	}
	@media (min-width:761px) {
		.menuicon2 {
			position: relative;
			display: inline-block;
			padding-left: 0;
			padding-right: 0;
			padding-top: 20px;
			top: -11px;
			color: #ddd;
			transform: rotate(-90deg);
			cursor: default;
		}
	}
</style>
