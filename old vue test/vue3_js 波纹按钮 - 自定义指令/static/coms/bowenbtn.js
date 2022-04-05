var bowenbtns = {
	template:'#bowenbtn_com',
	data(){
		return{
			bowenshow:0,
			scale:1,
			opacity:1,
			times:'',
			id:'',
			left:'',
			top:''
		}
	},
	methods:{
		bowenbtnclick:function($event){
			//设置id
			var d = new Date()
			this.id = 'btn_'+d.getFullYear() +( d.getMonth() + 1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds()+d.getMilliseconds()
			//设置位置
			this.bowenshow = 0
			setTimeout(()=>{
				this.top = $event.pageY - document.getElementById(this.id).offsetTop + 'px'
				this.left = $event.pageX - document.getElementById(this.id).offsetLeft + 'px'
				//设置放大
				this.bowenshow = 1
				this.scale = 1
				this.opacity = 1
				setTimeout(()=>{
					this.scale = 500
					this.opacity = 0
				},60)
			})
			//清除并倒计时消失
			clearTimeout(this.times)
			this.times = setTimeout(()=>{
				this.bowenshow = 0
			},2000)
			this.$emit('btnclick')
		}
	}
}