var main_com = {
	template:'#main_com',
	components:{
		tabs_com
	},
	data(){
		return {
			//tabs相关
			list:[
				{
					id:'0',
					name:'home',
					notclose:1
				},
				{
					id:'1',
					name:'test'
				},
			],
			activeid:0
		}
	},
	methods:{
		additem:function(){
			//追加item
			var ids = new Date().getFullYear()+'_'+new Date().getMonth()+'_'+new Date().getDate()+'_'+new Date().getHours()+'_'+new Date().getMinutes()+'_'+new Date().getSeconds()+'_'+new Date().getMilliseconds()
			this.list.push({
				id:ids,
				name:'测试',
			})
			this.activeid = ids
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
	}
}