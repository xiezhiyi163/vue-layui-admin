Vue.createApp({
	data(){
		return{
			getvideo:[
				{
					isplaying:'',
					isplaytitle:'',
					isplayid:'',
					isplayingind:0,
					ifshowNext:'0',
					videolist:[
						{
							id:'111',
							title:'测试1',
							link:'./0001.哔哩哔哩-怎样把「新闻联播片尾曲」弹成二次元日系曲风？%5B1080P%5D_x264.mp4',
							choose:false,
						},
						{
							id:'222',
							title:'测试2',
							link:'./0001.哔哩哔哩-怎样把「新闻联播片尾曲」弹成二次元日系曲风？%5B1080P%5D_x264.mp4',
							choose:false,
						},
						{
							id:'333',
							title:'测试3',
							link:'./0001.哔哩哔哩-怎样把「新闻联播片尾曲」弹成二次元日系曲风？%5B1080P%5D_x264.mp4',
							choose:false,
						},
					]
				}
			]
		}
	},
	components:{
		//变量即引入
		video_com,
		head_com,
	},
	methods:{
		nowisplay: function(i,ind) {
			this.getvideo[i].isplaying = ''
			setTimeout(()=>{
				this.getvideo[i].isplayid = this.getvideo[i].videolist[ind].id
				this.getvideo[i].isplaytitle = this.getvideo[i].videolist[ind].title
				this.getvideo[i].isplayingind = ind
				this.getvideo[i].isplaying = this.getvideo[i].videolist[ind].link
				//判断是否最后一个
				if(this.getvideo[i].isplayingind == this.getvideo[i].videolist.length - 1){
					this.getvideo[i].ifshowNext = 0
				}else{
					this.getvideo[i].ifshowNext = 1
				}
				//。。。啪啪啪其他逻辑
			},0)
		},
		tovideofornext: function(videoind) {
			this.getvideo[videoind].videolist[this.getvideo[videoind].isplayingind].choose = false // 取消上一个选中的
			this.getvideo[videoind].isplayingind++
			this.getvideo[videoind].videolist[this.getvideo[videoind].isplayingind].choose = true // 选中加上去之后的索引
			this.nowisplay(videoind,this.getvideo[videoind].isplayingind)
		},
		tonowisplay: function(i,ind) {
			this.getvideo[i].videolist[this.getvideo[i].isplayingind].choose = false // 取消上一个选中的
			this.getvideo[i].videolist[ind].choose = true // 取消上一个选中的
			this.nowisplay(i,ind)
		},
		videolistinit: function() {
			//模拟拿到数据写入第一个
			this.getvideo[0].videolist[0].choose = true // 取消上一个选中的
			this.nowisplay(0,0)
		}
	},
	mounted() {
		this.videolistinit()
	}
}).mount('#app')
