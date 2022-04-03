<script>
/*


	store

	page use -> 

		options api :

			use at computed to read

			change by this.$root.store.xxx = xxx

		composition api :

			use by this :
			
			var {proxy} = reactive(getCurrentInstance())
			var {store} = reactive(proxy.$root)

			you can change or use with store.xxx


*/
import store2 from './storeMixin.js'
export default {
	mixins:[store2],
    data() {
        return {
			bgcolor:window.localStorage.getItem('localbgcolor')||'',
            test:1
        }
    },
	computed:{
		changetest:function(){
			return this.test + '_computed'
		}
	},
	methods:{
		storetest:function(){
			this.test = 8
		},
		changeGlobalColor:function(color,bgcolor) {
			this.bgcolor = bgcolor
			window.localStorage.setItem('localbgcolor',bgcolor)
		}
	},
    mounted() {
        this.$root.store = this
    }
}
</script>

<style>
	*{margin:0;padding:0;text-decoration: none;border: none;outline: none;}
	a{text-decoration: none !important;color: #d6d6d6 !important;}
	html,body {
		height: auto;
		min-height: 100%;
		background-color: #F0F0f0;
		overflow: hidden auto;
	}
	/* 
	   ========
	 - 主题匹配 -  
	   ========
	*/
	/* 默认 */
	.layui-btn,
	.layui-form-checked[lay-skin="primary"] i {
		background-color: #7db0ef;
	}
	/* 优先级提高匹配 */
	#layui-7db0ef .layui-btn,
	#layui-7db0ef .layui-form-checked[lay-skin="primary"] i {
		background-color: #7db0ef !important;
	}
	#layui-4bdda4 .layui-btn,
	#layui-4bdda4 .layui-form-checked[lay-skin="primary"] i {
		background-color: #4bdda4 !important;
	}
</style>
