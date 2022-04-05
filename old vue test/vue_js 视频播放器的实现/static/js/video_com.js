var video_com = {
	template: '#videoplayer',//框架是直接.vue,不需要这个
	props:{
		'playerid':{
			type:null,
			default:'default'
		},
		'videoInd':{
			type:null,
			default:'0'
		},
		//video传进来的地址，先置空才能检测到变化
		'src':{
			type:null,
			default:''
		},
		'ifshownext':{
			type:null,
			default:'0'
		}
	},
	data() {
		return {
			//鼠标是否在移动flag
			ifentervideo: 0,
			entervideotimer: {}, //存放定时器的对象
			//选择的视频容器
			selectvideoitem: '',
			//进度条相关
			dragflag: 0,
			basewidth: 0,
			wrapleft: 0, //保存初始left
			alltimes: 0, //s
			nowplaypers: 0, //已播放的百分比
			prostarget: '',
			//
			mx: 0,
			//音量调节相关
			dragflag2: 0,
			columnebasewidth: 0,
			columnewrapleft: '',
			fullvoice: 100,
			//
			columnemx: 0,

			//相关的一些dom绑定
			controlboxshow: 0, //操作工具条是否显示
			ifvideoload: 0, //视频是否加载完成
			ifshowcolumnewrap: 0, //操作音量条显示
			justminute: 0, //是否只有分钟
			timesinfo: '-/-', //时间显示
			alltime: '', //所有时间
			hadplay: '', //已播放的长度
			playbtnshow: 1, //播放按钮是否显示
			nowvolumehandleleft: 0, //音量滑块的距离
			iffullscreen: 0, //是否全屏
		}
	},
	methods: {

		//设置播放时间显示
		showplaytime: function(useid, now, all) {
			//clickbtnfortime-justminute
			if (all.split(':').length == 2) {
				if (this.justminute == 0) {
					this.justminute = 1
				}
			} else {
				if (this.justminute == 1) {
					this.justminute = 0
				}
			}
			this.timesinfo = now + '/' + all
		},
		//进度条相关核心部分：绑定获取进度的api，一开始先调用，然后绑定播放和暂停
		nowplay: function(useid, currentTime) {
			this.basewidth = document.getElementById(useid + '_wrapin').offsetWidth
			//求得已播放的百分比
			//currentTime获取video/audio已播放的进度
			return {
				pers: (currentTime / this.alltime * 100).toFixed(2) + '%',
				points: Number((currentTime / this.alltime).toFixed(2))
			}
		},
		setprogress: function(useid, currentTime) {
			var _nowplay = this.nowplay(useid, currentTime)
			this.nowplaypers = _nowplay.pers
			//domset
			this.showplaytime(useid, formatSeconds(currentTime), formatSeconds(this.alltime))
			this.hadplay = this.nowplaypers
		},

		//进度条相关核心部分：鼠标或手势操作进度api
		videomovestart: function(e) {
			//clientY + (document.body.scrollTop || document.documentElement.scrollTop)
			var ev = event || window.event || e
			this.dragflag = 1
			this.prostarget = (ev.target || ev.srcElement).id.indexOf('_handle') != -1 ? (ev.target || ev.srcElement).id : ''
			this.selectvideoitem = this.prostarget ? (ev.target || ev.srcElement).dataset.id : '',
				this.videoforpause(this.selectvideoitem) //操作先暂停，再拖动
			this.wrapleft = document.getElementById(this.prostarget).getBoundingClientRect().left
			this.mx = (ev.targetTouches ? ev.targetTouches[0].pageX : '' || ev.pageX) || (ev.targetTouches ? ev.targetTouches[
				0].clientX : '' || ev.clientX) //底部滚动条肯定会屏蔽掉的，所以也可以拿这个clientX
			//domset
			this.playbtnshow = 1
		},
		videomoveing: function() {
			var ev = event || window.event || e
			if (this.dragflag == 1) {
				if (this.prostarget) {
					this.basewidth = document.getElementById(this.selectvideoitem + '_wrapin').offsetWidth
					var endx = ((ev.targetTouches ? ev.targetTouches[0].pageX : '' || ev.pageX) || (ev.targetTouches ? ev.targetTouches[
						0].clientX : '' || ev.clientX)) - this.mx //拿到最后的移动坐标
					var lastendx = (this.wrapleft - (document.getElementById(this.selectvideoitem + '_wrapin').getBoundingClientRect()
						.left)) + endx // 保存最后拖动的宽度
					if (lastendx < 0) {
						lastendx = 0
					} else if (lastendx > this.basewidth) {
						lastendx = this.basewidth
					}
					document.getElementById(this.selectvideoitem + '_thevideo').currentTime = Math.floor(lastendx / (this.basewidth /
						this.alltime))
					this.setprogress(this.selectvideoitem, Math.floor(lastendx / (this.basewidth / this.alltime)))
				}
			}
		},
		videomoveend: function() {
			this.dragflag = 0
			this.videoforplay(this.selectvideoitem)
		},
		//音量调节相关
		ifshowcolumnebox: function(useid) {
			if (this.ifshowcolumnewrap == 0) {
				this.ifshowcolumnewrap = 1
			} else {
				this.ifshowcolumnewrap = 0
			}
		},
		setvoice: function(useid, nowvoice) {
			//domset
			document.getElementById(useid + '_thevideo').volume = nowvoice / 100
			this.nowvolumehandleleft = nowvoice + '%'
		},
		video_columnemovestart: function(e) {
			//clientY + (document.body.scrollTop || document.documentElement.scrollTop)
			var ev = event || window.event || e
			this.dragflag2 = 1
			this.prostarget = (ev.target || ev.srcElement).id.indexOf('_handle') != -1 ? (ev.target || ev.srcElement).id : ''
			this.selectvideoitem = this.prostarget ? (ev.target || ev.srcElement).dataset.id : '',
				this.columnewrapleft = document.getElementById(this.prostarget).getBoundingClientRect().left
			this.columnemx = (ev.targetTouches ? ev.targetTouches[0].pageX : '' || ev.pageX) || (ev.targetTouches ? ev.targetTouches[
				0].clientX : '' || ev.clientX) //底部滚动条肯定会屏蔽掉的，所以也可以拿这个clientX
		},
		video_columnemoveing: function() {
			var ev = event || window.event || e
			if (this.prostarget && this.dragflag2 == 1) {
				this.columnebasewidth = document.getElementById(this.selectvideoitem + '_columne_wrapin').offsetWidth
				var endx = ((ev.targetTouches ? ev.targetTouches[0].pageX : '' || ev.pageX) || (ev.targetTouches ? ev.targetTouches[
					0].clientX : '' || ev.clientX)) - this.mx //拿到最后的移动坐标
				var lastendx = (this.wrapleft - (document.getElementById(this.selectvideoitem + '_columne_wrapin').getBoundingClientRect()
					.left)) + endx // 保存最后拖动的宽度
				if (lastendx < 0) {
					lastendx = 0
				} else if (lastendx > this.columnebasewidth) {
					lastendx = this.columnebasewidth
				}
				//转化persent百分比this.columnebasewidth/100=lastendx/?
				var persent = lastendx / (this.columnebasewidth / 100);
				this.setvoice(this.selectvideoitem, persent)
			}
		},
		video_columnemoveend: function() {
			this.dragflag2 = 0
		},
		//在video容器移动
		entervideomove: function(useid) {
			if (this.entervideotimer[useid]) {
				clearTimeout(this.entervideotimer[useid])
			}
			//domset
			this.controlboxshow = 1
			this.entervideotimer[useid] = setTimeout(() => {
				this.controlboxshow = 0
			}, 2000)
		},
		//实时更新进度
		updateprogres: function(useid) {
			if(document.getElementById(useid + '_thevideo'))
			this.setprogress(useid, document.getElementById(useid + '_thevideo').currentTime)
		},
		//监听结束
		playend: function(useid) {
			this.playbtnshow = 1
		},
		//获取信息
		canplay: function(useid) {
			var alltimes = Math.floor(document.getElementById(useid + '_thevideo').duration)
			this.alltime = alltimes
			var nowvoice = document.getElementById(useid + '_thevideo').volume
			if (this.ifvideoload == 0) {
				this.ifvideoload = 1
				this.showplaytime(useid, formatSeconds(0), formatSeconds(alltimes))
			}
			this.setvoice(useid, nowvoice * 100)
		},
		initgetvideoinfo: function(useid) {
			this.entervideotimer[useid] = null;
			this.ifvideoload = 0
		},
		//视频播放
		videoforplay: function(useid) {
			document.getElementById(useid + '_thevideo').play()
			this.playbtnshow = 0
		},
		//视频暂停
		videoforpause: function(useid) {
			document.getElementById(useid + '_thevideo').pause()
			this.playbtnshow = 1
		},
		//下一首
		videonext: function() {
			if(this.ifshownext == 1) {
				this.$emit('videofornext',this.videoInd)
			}
		},
		//是否全屏操作
		tofullscreen: function(useid) {
			this.iffullscreen = 1
		},
		fullscreen: function(useid) {
			screenfull.request(document.getElementById(useid + '_h5video'))
			this.tofullscreen(useid)
		},
		toexitfullscreen: function(useid) {
			this.iffullscreen = 0
		},
		exitfullscreen: function(useid) {
			screenfull.exit()
			this.toexitfullscreen(useid)
		},

		listens: function() {
			window.addEventListener('mouseup', () => {
				this.dragflag = 0
				this.dragflag2 = 0
			})
		}
	},
	mounted() {
		this.listens()
		this.initgetvideoinfo(this.playerid || 'video_h5_default')
	}
}
