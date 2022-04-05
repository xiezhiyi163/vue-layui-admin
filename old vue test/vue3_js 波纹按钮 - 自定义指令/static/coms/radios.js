var radios = {
	template: '#radios_com',
	data(){
		return {
			checked:false
		}
	},
	props:{
		name:{
			type:null,
			default:''
		},
		value:{
			type:null,
			default:''
		},
		modelValue:{
			type:null,
			default:''
		}
	},
	methods: {
		changeValue(title) {
			var radios_ = title.srcElement.defaultValue||title.target.defaultValue
			this.$emit('update:modelValue', radios_)//vue2的时候默认是value,在旧版2，如果只是作为自定义事件，@格式可以改成:value.sync，不过不能写表达式
			setTimeout(()=>{
				console.log(this.modelValue)
			})
		}
	},
	mounted(){
		setTimeout(()=>{
			this.checked = this.modelValue
		})
	}
}