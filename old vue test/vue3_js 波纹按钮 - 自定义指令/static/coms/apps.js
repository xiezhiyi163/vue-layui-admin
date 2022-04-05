var apps = {
	template:'#apps',
	components:{
		inputs,
		bowenbtns,
		checks,
		radios,
	},
	data(){
		return{
			inputtext:'111',
			inputtext2:'2222',
			list:[
				false,
				false,
			],
			inputtext3b:false,
			inputtext4:'1',
			inputtext4b:'1'
		}
	},
	methods:{
		btnclick:function(){
			console.log(1111)
		},
		checkedall:function(data){
			this.inputtext3b = data
			if(this.inputtext3b){
				for(var i=0;i<this.list.length;i++){
					this.list[i] = true
				}
			}else{
				for(var i=0;i<this.list.length;i++){
					this.list[i] = false
				}
			}
		},
		checkedget:function(data){
			this.list[data.key] = data.value
			//检测是否全选
			var flag = 1
			for(var i=0;i<this.list.length;i++){
				if(this.list[i] == false){
					flag = 0
					break;
				}
			}
			if(flag){
				this.inputtext3b = true
			}else{
				this.inputtext3b = false
			}
		}
	}
}