var nav_com = {
	template:'#nav_com',
	data(){
		return{
			$layui:'',
			//tabs高亮
			ind:0,
			//列表数组
			list:{
				list0:[],
				list1:[],
				list2:[2],
				list3:[],
				list4:[],
				list5:[],
			}
		}
	},
	methods:{
		//初始化tabs切换
		settabschange:function(){
			new Swiper('#tabswrap',{
				slidesPerView: 5,
			})
		},
		//tabchangecb，跑完这步之后，该怎么触底就怎么触底去搞，这个不管
		tabchangecb:function(ind,params){
			if(this.ind!=ind){
				this.ind = ind
				if(this.list['list'+ind].length == 0){
					//加载该下标下的接口获取数据
					this.$layui.layer.msg('重新加载数据中。。。')
				}
			}
		}
	},
	mounted() {
		layui.use(['layer'],()=>{
			this.$layui = layui
			this.settabschange()
		})
	}
}