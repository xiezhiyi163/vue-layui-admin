var inputs = {
	template: '#inputs_com',
	props:{
		modelValue:{
			type:null,
			default:''
		}
	},
	methods: {
		changeValue(title) {
			this.$emit('update:modelValue', title.target.value)//vue2的时候默认是value,在旧版2，如果只是作为自定义事件，@格式可以改成:value.sync，不过不能写表达式
			this.$emit('input', title.target.value)//旧版2的写法，安全起见都用上面的写法
		}
	}
}
