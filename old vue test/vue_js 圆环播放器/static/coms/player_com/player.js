var player_com = {
	template:'#player_com',
	props:{
		id:{
			type:null,
			default:'default_id',
		},
		src:{
			type:null,
			default:'',
		}
	},
	data(){
		return {
			//进度条部分
			$bar:'',
			$bar2:'',
			$circle:'',
			$container:'',
			isDrag:false,
			mouse_offset:{x:0,y:0},
			circle_r:0,
			bar_r:0,
			therange:0,
			circlealllength:0,
			circleuselength:0,
			//按钮部分
			ifshowplay:1,
			//是否已加载
			ifdataload:0,
			//全部时间
			alltime:0,
			balltime:'0:0',
			//当前时间
			currentTime:0,
			bcurrentTime:'0:0',
			//音量滑块
			voice:''
		}
	},
	methods:{
		//圆环进度条
		initprogress:function(){
			this.$bar = document.querySelector('.player-circle-bar')
			this.$bar2 = document.querySelector('.player-circle-bar2')
			this.$circle = document.querySelector('.player-circle')
			this.$container = document.querySelector('.player-circle-container')
			
			this.$circle.style.width = 200 + 'px'
			this.$circle.style.height = 200 + 'px'
			
			this.$container.style.width = 200 + 'px'
			this.$container.style.height = 200 + 'px'
			
			this.circle_r = this.$container.offsetWidth / 2  // 圆形半径
			
			this.$bar2.style.top =  -this.circle_r-(this.$bar2.offsetWidth/2) + 'px'
			// const circle_b = 3       // 圆形边距(border-width)
			this.bar_r = this.$bar.offsetWidth / 2          // 小球半径
			
			setTimeout(()=>{
				this.circlealllength = 2 * Math.PI * 99
			})
			
			//回显
			// this.$circle.textContent = 0
			this.therange = 0
			document.getElementById('player-hiddencirclebase').style.transform = 'rotateZ('+this.therange+'deg)'
			document.getElementById('player-circle-bar2').style.transform = 'rotateZ(-'+this.therange+'deg)'
			this.$bar.style.left = document.getElementById('player-circle-bar2').getBoundingClientRect().left - this.$container.offsetLeft + 'px'
			this.$bar.style.top = document.getElementById('player-circle-bar2').getBoundingClientRect().top - this.$container.offsetTop + 'px'
			//
			this.circleuselength = 0
		},
		barmovestart:function(e){
			var ev = event || window.event || e
			this.topause()
			this.isDrag = true
			this.mouse_offset = this.getMouseOffset(ev)
		},
		barmoveing:function(e){
			var ev = event || window.event || e
			if (this.isDrag == false) return
			const event_offset_x = (ev.clientX
			                          - this.mouse_offset.x
			                          - this.$container.offsetLeft
			                          - this.circle_r)
			const event_offset_y = -(ev.clientY
			                          - this.mouse_offset.y
			                          - this.$container.offsetTop
			                          - this.circle_r)
			
			const radian = Math.atan2(event_offset_y, event_offset_x)
			// const x = Math.cos(radian) * (circle_r - circle_b / 2)
			// const y = Math.sin(radian) * (circle_r - circle_b / 2)
			const x = Math.cos(radian) * (this.circle_r)
			const y = Math.sin(radian) * (this.circle_r)
			
			this.$bar.style.left = x - this.bar_r + this.circle_r + 'px'
			this.$bar.style.top = this.circle_r - (y + this.bar_r) + 'px'
			
			this.updateContent(radian)
		},
		barmoveend:function(e){
			var ev = event || window.event || e
			this.toplay()
			this.isDrag = false
		},
		updateContent:function(radian){
			let angle = radian * (180 / Math.PI)  // -180 ~ 180
			if (angle >= -180 && angle <= 90) {
			  angle = 90 - angle
			} else {
			  angle = 360 - (angle - 90)
			}
			// 0 ~ 360
			
			// $circle.textContent = Math.floor(angle)
			this.therange = Math.floor(angle)
			document.getElementById('player-hiddencirclebase').style.transform = 'rotateZ('+angle+'deg)'
			document.getElementById('player-circle-bar2').style.transform = 'rotateZ(-'+angle+'deg)'
			
			//设置时间
			this.currentTime = Math.floor(this.therange / 359 * this.alltime)
			this.bcurrentTime = formatSeconds(this.currentTime)
			document.getElementById(this.id+'_player').currentTime = this.currentTime
			//
			this.circleuselength = this.therange / 359 * this.circlealllength
		},
		getMouseOffset:function(e){
			const mouse_offset_x = (e.clientX
			                          - this.$container.offsetLeft 
			                          - e.currentTarget.offsetLeft 
			                          - this.bar_r)
			const mouse_offset_y = -(e.clientY
			                          - this.$container.offsetTop
			                          -e.currentTarget.offsetTop
			                          - this.bar_r)
			return {
			  x: mouse_offset_x,
			  y: mouse_offset_y
			}
		},
		//实时监听时间
		timeupdate:function() {
			this.currentTime = document.getElementById(this.id+'_player').currentTime
			this.bcurrentTime = formatSeconds(this.currentTime)
			var range = Math.floor(this.currentTime / this.alltime * 359)
			this.therange = range
			document.getElementById('player-hiddencirclebase').style.transform = 'rotateZ('+this.therange+'deg)'
			document.getElementById('player-circle-bar2').style.transform = 'rotateZ(-'+this.therange+'deg)'
			this.$bar.style.left = document.getElementById('player-circle-bar2').getBoundingClientRect().left - this.$container.offsetLeft + 'px'
			this.$bar.style.top = document.getElementById('player-circle-bar2').getBoundingClientRect().top - this.$container.offsetTop + 'px'
			//
			this.circleuselength = this.currentTime / this.alltime * this.circlealllength
		},
		//是否可以播放
		canplay:function(){
			if(this.ifdataload == 0){
				this.ifdataload = 1
				this.currentTime = 0
				this.alltime = Math.floor(document.getElementById(this.id+'_player').duration)
				this.balltime = formatSeconds(this.alltime) 
			}
		},
		//播放
		toplay:function(){
			this.ifshowplay = 0;
			document.getElementById(this.id+'_player').play()
		},
		//暂停
		topause:function(){
			this.ifshowplay = 1;
			document.getElementById(this.id+'_player').pause()
		},
		//结束
		toend:function(){
			this.ifshowplay = 1;
		},
		//init音量滑块
		initvoiceset:function(){
			var _this = this;
			this.voice = layui.slider.render({
			  elem: '#player-voiceset'
			  ,change: function(value){
			    //do something
				document.getElementById(_this.id+'_player').volume = value / 100
			  }
			});
			// document.getElementById(_this.id+'_player').volume = 1
			this.voice.setValue(document.getElementById(_this.id+'_player').volume * 100)
		}
	},
	mounted(){
		this.initprogress()
		this.initvoiceset()
	}
}