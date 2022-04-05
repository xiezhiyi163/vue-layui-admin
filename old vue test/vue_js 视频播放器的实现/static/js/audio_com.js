var audio_com = {
	template: '#audioplayer',//框架是直接.vue,不需要这个
	props:{
		'audioInd':{
			type:null,
			default:'0'
		},
		'playerid':{
			type:null,
			default:'default'
		},
		//audio传进来的地址，先置空才能检测到变化
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
			ifenteraudio: 0,
			enteraudiotimer: {}, //存放定时器的对象
			//选择的视频容器
			selectaudioitem: '',
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
			ifaudioload: 0, //视频是否加载完成
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
			//currentTime获取audio/audio已播放的进度
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
		audiomovestart: function(e) {
			//clientY + (document.body.scrollTop || document.documentElement.scrollTop)
			var ev = event || window.event || e
			this.dragflag = 1
			this.prostarget = (ev.target || ev.srcElement).id.indexOf('_handle') != -1 ? (ev.target || ev.srcElement).id : ''
			this.selectaudioitem = this.prostarget ? (ev.target || ev.srcElement).dataset.id : '',
				this.audioforpause(this.selectaudioitem) //操作先暂停，再拖动
			this.wrapleft = document.getElementById(this.prostarget).getBoundingClientRect().left
			this.mx = (ev.targetTouches ? ev.targetTouches[0].pageX : '' || ev.pageX) || (ev.targetTouches ? ev.targetTouches[
				0].clientX : '' || ev.clientX) //底部滚动条肯定会屏蔽掉的，所以也可以拿这个clientX
			//domset
			this.playbtnshow = 1
		},
		audiomoveing: function() {
			var ev = event || window.event || e
			if (this.dragflag == 1) {
				if (this.prostarget) {
					this.basewidth = document.getElementById(this.selectaudioitem + '_wrapin').offsetWidth
					var endx = ((ev.targetTouches ? ev.targetTouches[0].pageX : '' || ev.pageX) || (ev.targetTouches ? ev.targetTouches[
						0].clientX : '' || ev.clientX)) - this.mx //拿到最后的移动坐标
					var lastendx = (this.wrapleft - (document.getElementById(this.selectaudioitem + '_wrapin').getBoundingClientRect()
						.left)) + endx // 保存最后拖动的宽度
					if (lastendx < 0) {
						lastendx = 0
					} else if (lastendx > this.basewidth) {
						lastendx = this.basewidth
					}
					document.getElementById(this.selectaudioitem + '_theaudio').currentTime = Math.floor(lastendx / (this.basewidth /
						this.alltime))
					this.setprogress(this.selectaudioitem, Math.floor(lastendx / (this.basewidth / this.alltime)))
				}
			}
		},
		audiomoveend: function() {
			this.dragflag = 0
			this.audioforplay(this.selectaudioitem)
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
			document.getElementById(useid + '_theaudio').volume = nowvoice / 100
			this.nowvolumehandleleft = nowvoice + '%'
		},
		audio_columnemovestart: function(e) {
			//clientY + (document.body.scrollTop || document.documentElement.scrollTop)
			var ev = event || window.event || e
			this.dragflag2 = 1
			this.prostarget = (ev.target || ev.srcElement).id.indexOf('_handle') != -1 ? (ev.target || ev.srcElement).id : ''
			this.selectaudioitem = this.prostarget ? (ev.target || ev.srcElement).dataset.id : '',
				this.columnewrapleft = document.getElementById(this.prostarget).getBoundingClientRect().left
			this.columnemx = (ev.targetTouches ? ev.targetTouches[0].pageX : '' || ev.pageX) || (ev.targetTouches ? ev.targetTouches[
				0].clientX : '' || ev.clientX) //底部滚动条肯定会屏蔽掉的，所以也可以拿这个clientX
		},
		audio_columnemoveing: function() {
			var ev = event || window.event || e
			if (this.prostarget && this.dragflag2 == 1) {
				this.columnebasewidth = document.getElementById(this.selectaudioitem + '_columne_wrapin').offsetWidth
				var endx = ((ev.targetTouches ? ev.targetTouches[0].pageX : '' || ev.pageX) || (ev.targetTouches ? ev.targetTouches[
					0].clientX : '' || ev.clientX)) - this.mx //拿到最后的移动坐标
				var lastendx = (this.wrapleft - (document.getElementById(this.selectaudioitem + '_columne_wrapin').getBoundingClientRect()
					.left)) + endx // 保存最后拖动的宽度
				if (lastendx < 0) {
					lastendx = 0
				} else if (lastendx > this.columnebasewidth) {
					lastendx = this.columnebasewidth
				}
				//转化persent百分比this.columnebasewidth/100=lastendx/?
				var persent = lastendx / (this.columnebasewidth / 100);
				this.setvoice(this.selectaudioitem, persent)
			}
		},
		audio_columnemoveend: function() {
			this.dragflag2 = 0
		},
		//在audio容器移动
		enteraudiomove: function(useid) {
			if (this.enteraudiotimer[useid]) {
				clearTimeout(this.enteraudiotimer[useid])
			}
			//domset
			this.controlboxshow = 1
			this.enteraudiotimer[useid] = setTimeout(() => {
				this.controlboxshow = 0
			}, 2000)
		},
		//实时更新进度
		updateprogres: function(useid) {
			if(document.getElementById(useid + '_theaudio'))
			this.setprogress(useid, document.getElementById(useid + '_theaudio').currentTime)
		},
		//监听结束
		playend: function(useid) {
			this.playbtnshow = 1
		},
		//获取信息
		canplay: function(useid) {
			var alltimes = Math.floor(document.getElementById(useid + '_theaudio').duration)
			this.alltime = alltimes
			var nowvoice = document.getElementById(useid + '_theaudio').volume
			if (this.ifaudioload == 0) {
				this.ifaudioload = 1
				this.showplaytime(useid, formatSeconds(0), formatSeconds(alltimes))
			}
			this.setvoice(useid, nowvoice * 100)
		},
		initgetaudioinfo: function(useid) {
			this.enteraudiotimer[useid] = null;
			this.ifaudioload = 0
		},
		//视频播放
		audioforplay: function(useid) {
			document.getElementById(useid + '_theaudio').play()
			this.playbtnshow = 0
		},
		//视频暂停
		audioforpause: function(useid) {
			document.getElementById(useid + '_theaudio').pause()
			this.playbtnshow = 1
		},
		//下一首
		audionext: function() {
			if(this.ifshownext == 1) {
				this.$emit('audiofornext',this.audioInd)
			}
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
		this.initgetaudioinfo(this.playerid || 'audio_h5_default')
	}
}
