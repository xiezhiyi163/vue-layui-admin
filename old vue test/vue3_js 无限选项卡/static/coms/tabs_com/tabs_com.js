var tabs_com = {
	template:'#tabs_com',
	//如果不是setup语法糖，这个要打开来接收
	props:{
		list:{
			type: null,
			default:[
				{
					id:0,
					name:'home',
					notclose:1
				}
			]
		},
		activeid:{
			type: null,
			default:''
		},
		iftocenter:{
			type: null,
			default:0
		}
	},
	data(){
		return {
			lengths:0,
			showlr:0,
		}
	},
	methods:{
		listenwidth:function(){
			//监听宽度
			const tabs_subwrap = document.querySelectorAll('.tabs_subwrap')[0]
			const tabs_sliderwrap = document.querySelectorAll('.tabs_sliderwrap')[0]
			const tabs_wrap = document.querySelectorAll('.tabs_wrap')[0]
			const tabs_item = document.querySelectorAll('.tabs_item')
			const tabs_leftbutton = document.querySelectorAll('.tabs_leftbutton')[0]
			//适配右边调节
			var temp = tabs_wrap.getBoundingClientRect().left + tabs_leftbutton.offsetWidth
			if(tabs_sliderwrap.getBoundingClientRect().left - temp < -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth) && tabs_sliderwrap.offsetWidth>tabs_subwrap.offsetWidth){
				tabs_sliderwrap.style.left = -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)+'px'
			}else if(tabs_sliderwrap.offsetWidth<tabs_subwrap.offsetWidth){
				tabs_sliderwrap.style.left = 0+'px'
			}
			//是否打开左右按钮
			var widths = 0
			for(var i=0;i<tabs_item.length;i++){
				widths+=tabs_item[i].offsetWidth
			}
			if(tabs_subwrap.offsetWidth<widths){
				this.showlr = 1
			}else{
				this.showlr = 0
			}
			//监听数据长度
			if(this.lengths < this.list.length){
				this.lengths = this.list.length
				if(tabs_sliderwrap.offsetWidth>tabs_subwrap.offsetWidth){
					tabs_sliderwrap.style.left = -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)+'px'
				}
			}
		},
		toleft:function(){
			const tabs_sliderwrap = document.querySelectorAll('.tabs_sliderwrap')[0]
			const tabs_wrap = document.querySelectorAll('.tabs_wrap')[0]
			const tabs_leftbutton = document.querySelectorAll('.tabs_leftbutton')[0]
			var temp = tabs_wrap.getBoundingClientRect().left + tabs_leftbutton.offsetWidth//用来排除可视区以外的位置
			var distence = 200//移动的距离========================
			if(tabs_sliderwrap.getBoundingClientRect().left - temp < 0) {
				tabs_sliderwrap.style.left = tabs_sliderwrap.getBoundingClientRect().left - temp + distence + 'px'
				if(tabs_sliderwrap.getBoundingClientRect().left - temp > 0){
					tabs_sliderwrap.style.left = 0+'px'
				}
			}
		},
		toright:function(){
			const tabs_subwrap = document.querySelectorAll('.tabs_subwrap')[0]
			const tabs_sliderwrap = document.querySelectorAll('.tabs_sliderwrap')[0]
			const tabs_wrap = document.querySelectorAll('.tabs_wrap')[0]
			const tabs_leftbutton = document.querySelectorAll('.tabs_leftbutton')[0]
			var temp = tabs_wrap.getBoundingClientRect().left + tabs_leftbutton.offsetWidth
			var distence = 200//移动的距离========================
			if(tabs_sliderwrap.getBoundingClientRect().left - temp > -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)) {
				tabs_sliderwrap.style.left = tabs_sliderwrap.getBoundingClientRect().left - temp - distence + 'px'
				if(tabs_sliderwrap.getBoundingClientRect().left - temp < -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)){
					tabs_sliderwrap.style.left = -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)+'px'
				}
			}
		},
		delitem:function(i){
			//触发删除事件
			this.$emit('delitem',{ind:i})
			this.lengths = this.list.length
			//是否居中
			if(this.iftocenter){
				setTimeout(()=>{
					for(var k=0;k<this.list.length;k++){
						if(this.list[k].id == this.activeid){
							this.tocenter(k)
						}
					}
				},10)
			}
		},
		itemactive:function(i){
			this.$emit('itemactive',{ind:i})
			if(this.iftocenter){
				this.tocenter(i)
			}
		},
		tocenter:function(i){
			const tabs_item = document.querySelectorAll('.tabs_item')
			const tabs_subwrap = document.querySelectorAll('.tabs_subwrap')[0]
			const tabs_sliderwrap = document.querySelectorAll('.tabs_sliderwrap')[0]
			const tabs_wrap = document.querySelectorAll('.tabs_wrap')[0]
			const tabs_leftbutton = document.querySelectorAll('.tabs_leftbutton')[0]
			var temp = tabs_wrap.getBoundingClientRect().left + tabs_leftbutton.offsetWidth
			//
			if(tabs_sliderwrap.offsetWidth>tabs_subwrap.offsetWidth){
				var tempdistence = ((tabs_subwrap.offsetWidth - tabs_item[i].offsetWidth) / 2) - (tabs_item[i].getBoundingClientRect().left - temp)
				tabs_sliderwrap.style.left = tabs_sliderwrap.getBoundingClientRect().left - temp + tempdistence + 'px'
			}
			//
			if(tabs_sliderwrap.getBoundingClientRect().left - temp > 0){
				tabs_sliderwrap.style.left = 0+'px'
			}else if(tabs_sliderwrap.getBoundingClientRect().left - temp < -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)){
				tabs_sliderwrap.style.left = -(tabs_sliderwrap.offsetWidth - tabs_subwrap.offsetWidth)+'px'
				if(tabs_sliderwrap.offsetWidth<tabs_subwrap.offsetWidth){
					tabs_sliderwrap.style.left = 0+'px'
				}
			}
		}
	},
	mounted(){
		this.listenwidth()
		window.addEventListener('resize',()=>{
			if(this.listenwidth){
				this.listenwidth()
			}
		})
	}
}