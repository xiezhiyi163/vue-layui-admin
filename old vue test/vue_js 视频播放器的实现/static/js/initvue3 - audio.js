Vue.createApp({
	data(){
		return{
			getaudio:[
				{
					isplaying:'',
					isplaytitle:'',
					isplayid:'',
					isplayingind:0,
					ifshowNext:'0',
					audiolist:[
						{
							id:'111',
							title:'测试1',
							link:'./Each and All.wav',
							choose:false,
						},
						{
							id:'222',
							title:'测试2',
							link:'./Each and All.wav',
							choose:false,
						},
						{
							id:'333',
							title:'测试3',
							link:'./Each and All.wav',
							choose:false,
						},
						{
							id:'444',
							title:'测试4',
							link:'./Each and All.wav',
							choose:false,
						},
						{
							id:'555',
							title:'测试5',
							link:'./Each and All.wav',
							choose:false,
						},
						{
							id:'666',
							title:'测试6',
							link:'./Each and All.wav',
							choose:false,
						},
					]
				}
			]
		}
	},
	components:{
		//变量即引入
		audio_com,
		head_com,
	},
	methods:{
		nowisplay: function(i,ind) {
			this.getaudio[i].isplaying = ''
			setTimeout(()=>{
				this.getaudio[i].isplayid = this.getaudio[i].audiolist[ind].id
				this.getaudio[i].isplaytitle = this.getaudio[i].audiolist[ind].title
				this.getaudio[i].isplayingind = ind
				this.getaudio[i].isplaying = this.getaudio[i].audiolist[ind].link
				//判断是否最后一个
				if(this.getaudio[i].isplayingind == this.getaudio[i].audiolist.length - 1){
					this.getaudio[i].ifshowNext = 0
				}else{
					this.getaudio[i].ifshowNext = 1
				}
				//。。。啪啪啪其他逻辑
			},0)
		},
		toaudiofornext: function(audioind) {
			this.getaudio[audioind].audiolist[this.getaudio[audioind].isplayingind].choose = false // 取消上一个选中的
			this.getaudio[audioind].isplayingind++
			this.getaudio[audioind].audiolist[this.getaudio[audioind].isplayingind].choose = true // 选中加上去之后的索引
			this.nowisplay(audioind,this.getaudio[audioind].isplayingind)
		},
		tonowisplay: function(i,ind) {
			if(this.getaudio[i].audiolist[ind]) {
				this.getaudio[i].audiolist[this.getaudio[i].isplayingind].choose = false // 取消上一个选中的
				this.getaudio[i].audiolist[ind].choose = true
				this.nowisplay(i,ind)
			}
		},
		todel: function(i,ind) {
			this.getaudio[i].audiolist[this.getaudio[i].isplayingind].choose = false // 取消上一个选中的
			this.getaudio[i].audiolist.splice(ind,1)
			if(this.getaudio[i].audiolist == 1){
				this.getaudio[i].ifshowNext = 0
			}
			if(this.getaudio[i].audiolist[this.getaudio[i].isplayingind]){
				if(ind < this.getaudio[i].isplayingind) {
					this.getaudio[i].audiolist[this.getaudio[i].isplayingind-1].choose = true
					this.getaudio[i].isplayingind = this.getaudio[i].isplayingind - 1
					return
				}else if(ind == this.getaudio[i].isplayingind){
					this.nowisplay(i,this.getaudio[i].isplayingind)
				}
				this.getaudio[i].audiolist[this.getaudio[i].isplayingind].choose = true
			}else{
				if(this.getaudio[i].audiolist[this.getaudio[i].isplayingind - 1]){
					this.getaudio[i].audiolist[this.getaudio[i].isplayingind - 1].choose = true
					this.getaudio[i].isplayingind = this.getaudio[i].isplayingind - 1
					return;
				}
				this.getaudio[i].isplaying = ''
				setTimeout(()=>{
					this.getaudio[i].isplaying = 'none'
				})
			}
		},
		audiolistinit: function() {
			//模拟拿到数据写入第一个
			this.getaudio[0].audiolist[0].choose = true // 默认选中第一个
			this.nowisplay(0,0)
		}
	},
	mounted() {
		this.audiolistinit()
	}
}).mount('#app')
