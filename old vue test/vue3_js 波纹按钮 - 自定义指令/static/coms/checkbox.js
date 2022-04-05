var checks = {
	template: '#checks_com',
	props:{
		iffull:{
			type:null,
			default:''
		},
		check:{
			type:null,
			default:''
		},
		keys:{
			type:null,
			default:''
		}
	},
	methods: {
		changeValue(title) {
			var checks_ = title.srcElement.checked||title.target.checked
			if(this.iffull == 'true'){
				this.$emit('allchange',checks_)
			}else{
				this.$emit('valuechange',{value:checks_,key:this.keys})
			}
		}
	},
	mounted(){
		
	}
}
