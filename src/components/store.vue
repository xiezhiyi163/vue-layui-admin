<script>
import store2 from './storeMixin.js'
export default {
	mixins:[store2],
    data() {
        return {
			bgcolor:'',
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
