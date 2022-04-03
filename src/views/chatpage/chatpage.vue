<template>
	<div :id="'layui-'+store.bgcolor" style="min-width: 355px;">
		<!-- 分类 -->
		<div class="type">
			<div class="typeitem" :class="{typeitemactive:typechange == 2}" @click="typechange = 2">
				<i class="fa fa-comments" aria-hidden="true"></i>
			</div>
			<div class="typeitem" :class="{typeitemactive:typechange == 1}" @click="typechange = 1">
				<i class="fa fa-users" aria-hidden="true"></i>
			</div>
		</div>
		<!-- 聊天窗口 -->
		<div class="chatview">
			<div class="title">标题</div>
			<div id="chatwrap" style="position: relative;overflow: hidden auto;" :style="{height:winheight - 60 - 180 +'px'}">
				<div style="padding: 20px 0;" v-for="(v,i) in list">
					<!-- 左边部分 -->
					<div class="chatcenteritem clearb" v-if="v.from != 'me'" :id="v.id">
						<!-- 左边内容 -->
						<div class="chatcenterleft">
							<!-- 头像 -->
							<div class="chatcenterleft-head"></div>
							<!-- 昵称 -->
							<div class="chatcenterleft-nick">
								<div class="chatcenterleft-nickbox">这里是昵称</div>
								<!-- sign -->
								<div class="chatcenterleft-usersign">::sign::</div>
							</div>
							<!-- 内容 -->
							<div class="chatcenterleft-cont">{{v.cont}}</div>
						</div>
					</div>
					<!-- 右边部分 -->
					<div class="chatcenteritem clearb" v-if="v.from == 'me'" :id="v.id">
						<!-- 右边内容 -->
						<div class="chatcenterright">
							<!-- 头像 -->
							<div class="chatcenterright-head"></div>
							<!-- 昵称 -->
							<div class="chatcenterright-nick">
								<div class="chatcenterright-nickbox">这里是昵称</div>
								<!-- sign -->
								<div class="chatcenterright-usersign">::sign::</div>
							</div>
							<!-- 内容 -->
							<div class="chatcenterright-cont">{{v.cont}}</div>
						</div>
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div class="msgsendwrap">
				<div class="textwrap">
					<textarea rows="" cols="" id="valuemsg"></textarea>
				</div>
				<div class="btnwrap">
					<div class="lefticon"></div>
					<div class="lefticon"></div>
					<div class="lefticon"></div>
					<div class="sendbtn" @click="sendmsg">发送</div>
				</div>
			</div>
		</div>
		<!-- 人物列表 -->
		<div class="peoplelist" v-show="typechange == 1" :style="{width:winw - 60 + 'px'}" style="min-width: 295px;">
			<div class="title">联系人列表</div>
			<div class="peoplelistitem" v-for="(item,index) in 9" @click="sel_else_init">
				<div class="table">
					<div class="cell">
						<div class="peoplehead"></div>
					</div>
					<div class="cell cell100">
						<div class="peopleinfo">
							<div class="peoplenick">昵称</div>
							<div class="peopledesc">xxx</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {setchatdatas} from './getdata.js'
	/* 
		当前chat聊天项目使用的mscroll没有用到里面的内置设置page的方法，请酌情调整
	 */
	export default {
		data(){
			return {
				typechange:2,//1为people列表，2为聊天窗口
				winheight:'',//窗口高度
				winw:'',//窗口宽度
				mscrollinit:'',
				page:0,
				canload:1,
				list:[],
			}
		},
		methods:{
			//发送数据
			sendmsg:function(){
				var ids = 'chat_me'+new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() + '-' + new Date().getHours() + '-' + new Date().getMinutes() + '-' + new Date().getSeconds() + '-' + new Date().getMilliseconds()
				this.list.push({
					id:ids,
					nick:'xxx',
					from:'me',
					cont:document.getElementById('valuemsg').value || '-'
				})
				setTimeout(()=>{
					document.getElementById(ids).scrollIntoView(true)
				})
			},
			//获取数据
			ajaxgetchatres:function(fn){
				//模拟拿到数据
				if(this.list.length == 0){
					setTimeout(()=>{
						this.list = setchatdatas(new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() + '-' + new Date().getHours() + '-' + new Date().getMinutes() + '-' + new Date().getSeconds() + '-' + new Date().getMilliseconds())
						setTimeout(()=>{
							document.getElementById(this.list[this.list.length-1].id).scrollIntoView(true)
						})
						this.canload = 1
						fn()
					},1000)
				}else{
					var tempid = this.list[0].id
					setTimeout(()=>{
						this.list = setchatdatas(new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() + '-' + new Date().getHours() + '-' + new Date().getMinutes() + '-' + new Date().getSeconds() + '-' + new Date().getMilliseconds()).concat(this.list)
						setTimeout(()=>{
							document.getElementById(tempid).scrollIntoView(true)
							document.getElementById('chatwrap').scrollTop = document.getElementById('chatwrap').scrollTop - 30
						})
						this.canload = 1
						fn()
					},1000)
				}
			},
			//选择人物然后重新初始化窗口
			sel_else_init:function(){
				this.typechange = 2
				this.page = 0
				this.list = []
				this.mscrollinit.triggerDownScroll()
			},
			//初始化窗口
			initmscroll:function(){
				var _this = this;
				this.mscrollinit = new MeScroll("chatwrap", { 
					//第一个参数"mescroll"对应上面布局结构div的id (1.3.5版本支持传入dom对象)
					//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
					//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
					
					down: {
						callback: function(){
							if(_this.canload == 0) return;
							_this.canload = 0
							//_this.mescroll.setPageNum(1)//商品模式时重置成第一页
							_this.page++;
							_this.mscrollinit.setPageNum(_this.page)
							_this.ajaxgetchatres(function(){
								_this.mscrollinit.endSuccess()
							})
							// _this.mscrollinit.endSuccess()//商品模式下这个才需要,下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
						}
					},
					
					/* up: {
						offset:0,
						callback: (page) => {
							//this.mescroll.endSuccess()//这里代表加成功一页，但是商品模式才这样
						}, //上拉加载的回调
						//以下是一些常用的配置,当然不写也可以的.
						page: {
							num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
							size: 10 //每页数据条数,默认10
						},
						htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
						noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
								//避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
								//这就是为什么无更多数据有时候不显示的原因.
						toTop: {
							//回到顶部按钮
							src: "../img/mescroll-totop.png", //图片路径,默认null,支持网络图
							offset: 1000 //列表滚动1000px才显示回到顶部按钮	
						},
						empty: {
							//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
							warpId:	"xxid", //父布局的id (1.3.5版本支持传入dom元素)
							icon: "../img/mescroll-empty.png", //图标,默认null,支持网络图
							tip: "暂无相关数据~" //提示
						},
						lazyLoad: {
								use: true ,// 是否开启懒加载,默认false
								attr: 'imgurl' // 标签中网络图的属性名 : <img imgurl='网络图  src='占位图''/>
							}
					} */
				});	
			},
			//------------------------------------------
			listens:function(){
				this.winheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
				this.winw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
				window.addEventListener('resize',()=>{
					this.winheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
					this.winw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
				})
				window.addEventListener('storage',(e)=>{
					if(e.key == 'localbgcolor'){
						this.$root.store.bgcolor = e.newValue
					}
				})
			}
		},
		computed:{
			store(){
				return this.$root.store
			}
		},
		mounted(){
			this.listens()
			this.initmscroll()
		}
	}
</script>

<style scoped="scoped">
	.table {
		display: table;
		width: 100%;
	}
	.cell {
		display: table-cell;
		vertical-align: top;
	}
	.cell100 {
		width: 100%;
	}
	
	.type {
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 60px;
		background-color: #fff;
		z-index: 3;
	}
	.typeitem {
		width: 100%;
		height: 59px;
		line-height: 59px;
		text-align: center;
		border-bottom: 1px solid #B084EB;
		cursor: pointer;
		
	}
	.typeitemactive {
		background-color: #B084EB;
		color: white;
	}
	.typeitemactive i {
		text-decoration: underline;
	}
	.chatview {
		margin-left: 60px;
	}
	.title {
		position: relative;
		padding: 0 20px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		background-color: #bbb;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	#chatwrap::-webkit-scrollbar,
	.peoplelist::-webkit-scrollbar {
	  /*滚动条整体样式*/
	  width : 7px;  /*高宽分别对应横竖滚动条的尺寸*/
	  height: 1px;
	}
	#chatwrap::-webkit-scrollbar-thumb,
	.peoplelist::-webkit-scrollbar-thumb {
	  /*滚动条里面小方块*/
	  border-radius: 10px;
	  background   : #a299c5;
	}
	#chatwrap::-webkit-scrollbar-track,
	.peoplelist::-webkit-scrollbar-track{
	  /*滚动条里面轨道*/
	  border-radius: 10px;
	  background   : #857da2;
	}
	
	
	.chatcenteritem {
		/* 左边和右边内容public */
		padding-bottom: 30px
	}
	
	.chatcenterleft {
		/* 左边内容 */
		position: relative;
		float: left;
	}
	
	.chatcenterleft-head,
	.chatcenterright-head,
	.chatcenterleft-nick,
	.chatcenterright-nick {
		/* 左右边内容：头像和昵称public */
		position: absolute;
		top: 0;
	}
	.chatcenterleft-nick,
	.chatcenterright-nick {
		/* 左右边内容：头像和昵称public */
		position: absolute;
		top: 0;
		max-width: 50%;
	}
	
	.chatcenterleft-nickbox,
	.chatcenterright-nickbox {
		/* 左右边内容：昵称public */
		max-width: 100%;
	}
	
	.chatcenterleft-usersign,
	.chatcenterright-usersign {
		/* 左右边内容：sign public */
		position: absolute;
		top: 0;
		padding: 0 10px;
	}
	
	.chatcenterleft-cont,
	.chatcenterright-cont {
		/* 左右边内容：内容public */
		padding: 10px;
		min-height: 20px;
		min-width: 120px;
		max-width: 50%;
		word-break: break-all;
		background-color: #F0AD4E;
	}
	
	.chatcenterleft-head {
		/* 左边内容：头像 */
		left: 20px;
		width: 60px;
		height: 60px;
		background-color: #F0AD4E;
		border-radius: 50%;
	}
	
	.chatcenterleft-nick {
		/* 左边内容：昵称 */
		left: 100px;
		height: 20px;
	}
	
	.chatcenterleft-nickbox {
		/* 左边内容：昵称 */
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.chatcenterleft-usersign {
		/* 左边内容：sign */
		left: 100%;
	}
	
	.chatcenterleft-cont {
		/* 左边内容：内容 */
		margin: 30px 0 0 100px;
	}
	
	.chatcenterright {
		/* 右边内容 */
		position: relative;
		float: right;
	}
	
	
	.chatcenterright-head {
		/* 左边内容：头像 */
		right: 20px;
		width: 60px;
		height: 60px;
		background-color: #F0AD4E;
		border-radius: 50%;
	}
	
	.chatcenterright-nick {
		/* 左边内容：昵称 */
		right: 100px;
		height: 20px;
	}
	
	.chatcenterright-usersign {
		/* 左边内容：sign */
		right: 100%;
	}
	
	.chatcenterright-nickbox {
		/* 左边内容：昵称 */
		text-align: right;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.chatcenterright-cont {
		/* 左边内容：内容 */
		margin: 30px 100px 0 0;
	}
	
	
	.msgsendwrap {
		padding-top: 20px;
		height: 160px;
		background-color: #bbb;
	}
	.textwrap {
		margin: 0 20px 20px;
		padding: 10px;
		background-color: #fff;
	}
	.textwrap textarea {
		width: 100%;
		height: 60px;
		resize: none;
	}
	.btnwrap {
		margin: 0 20px;
	}
	.btnwrap:after {
		content: '';
		display: block;
		clear: both;
	}
	.lefticon {
		float: left;
		margin-right: 10px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #eee;
		cursor: pointer;
	}
	.sendbtn {
		float: right;
		width: 120px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: #eee;
		cursor: pointer;
	}
	.peoplelist {
		position: fixed;
		top: 0;
		left: 60px;
		height: 100%;
		background-color: #eee;
		overflow: hidden auto;
	}
	.peoplelistitem {
		margin: 0 20px;
		min-height: 80px;
		border-bottom: 1px solid #ccc;
	}
	.peoplehead {
		margin: 20px 0 0 20px;
		width: 40px;
		height: 40px;
		background-color: #fff;
		border-radius: 50%;
	}
	.peopleinfo {
		margin:0 10px;
	}
	.peoplenick {
		position: relative;
		padding-top: 15px;
		font-size: 20px;
		font-weight: 800;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.peopledesc {
		position: relative;
		font-size: 14px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #999;
	}
</style>
