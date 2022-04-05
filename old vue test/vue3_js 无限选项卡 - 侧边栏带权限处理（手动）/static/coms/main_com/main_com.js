var main_com = {
	template:'#main_com',
	components:{
		tabs_com,
		//页面组件（可以看成脚手架的vue页面）
		pagehome_com,
		page1_com,
		page2_com,
		page3_com,
		page4_com,
	},
	data(){
		return {
			//侧边栏相关
			navlist:[
				{
					id:0,
					title:'首页',
					root:['admin']
				},
				{
					id:1,
					title:'测试1',
					root:['admin','test1'],
					children:[
						{
							id:'10',
							title:'测试10',
							root:['admin','test1'],
							children:[
								{
									id:'110',
									title:'测试110',
									root:['admin','test1'],
									children:[
										{
											id:'1110',
											title:'测试1110',
											root:['admin','test1']
										},
									]
								},
							]
						},
					]
				},
				{
					id:2,
					title:'测试2',
					root:['admin','test2']
				},
				{
					id:3,
					title:'测试3',
					root:['admin','test3']
				},
				{
					id:4,
					title:'测试4',
					root:['admin','test4']
				}
			],
			//tabs相关
			list:[
				{
					id:'0',
					name:'首页',
					notclose:1
				},
			],
			activeid:0
		}
	},
	methods:{
		//权限处理
		rootset:function(list){
			this.navlist = recurrence(list,store.state.root)
		},
		//选项卡处理
		additem:function(ind){
			//追加item
			var hadtab = 0
			var id = 0
			for(var i=0;i<this.list.length;i++){
				if(this.navlist[ind].id == this.list[i].id){
					hadtab = 1;
					id = this.list[i].id
				}
			}
			if(hadtab == 1){
				this.activeid = id
				return;
			}
			this.list.push({
				id:this.navlist[ind].id,
				name:this.navlist[ind].title,
			})
			this.activeid = this.navlist[ind].id
		},
		deltablistitem:function(data){
			//判断激活哪个
			var flag = 0
			if(this.list[data.ind].id == this.activeid){
				flag = 1
			}
			//操作删除
			this.list.splice(data.ind,1)
			//重新激活
			if(flag == 1){
				if(this.list[data.ind]){
					this.activeid = this.list[data.ind].id
				}else{
					this.activeid = this.list[data.ind-1].id
				}
			}
		},
		changeactive:function(data){
			this.activeid = this.list[data.ind].id
		}
	},
	mounted(){
		//一开始第一个打开
		this.navlist[0].show = 1
		//处理显示对应权限的导航
		this.rootset(this.navlist)
	}
}