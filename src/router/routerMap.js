import {_rec_routes} from './recurrence-router.js'
import {_sub_routes} from './sub-router.js'
import {_frames_page_router} from './frames-page-router.js'
import login from "../views/login.vue";
import Home from "../views/Home.vue";

var _routes = [
	//##root一开始先默认置空，且root参数必须
	//##name要确保唯一且path属性和name要一样
	//##要跳进去root为-1的页面建议使用push跳转(root为-1见下方配置示例)
	//##左侧导航路由配置位置见下方
	//##页面引入的组件尽量都放在subcoms里面去，这样好区分
	
	//请保证每一部分的必要参数必须存在，并且准确赋值，如果因为不准确赋值，指不定会出现什么奇怪的情况
	
	{
		path: '/',
		name: "login",
		component: login,
		root: [],
	},
	{
		path: "/home",
		name: "Home",
		component: Home,
		root: [],
		children: [
			/* 
			
			
				//第一部分
				//##左侧导航从这里开始处理渲染，如果这里添加左侧导航，root得是空数组，
				//##如果导航需要跳二级的，可以把root为-1的路由配置放在/home的children里面的第二部分（建议root为-1）
				//##本项目第二部分的路由是跳进去之后没有左侧导航和标签栏的，如果需要导航栏，可以给第二部分的路由单独配置个相同的唯一标识，但不能给视图层配置，就像下面第二部分的例子（没配置打开标签栏的参数，且不建议把标签栏也打开，可能会有副作用）
				//navicon.type，img和font两种类型
				//navicon.icon，使用的路径或者icon
				
				"../views/_.vue"是多级导航要用到的视口文件组件，每一个父级导航都要使用
				 
			*/
			..._rec_routes,
			/* 
			
			
				第二部分
				
				放标签页的二级页面的位置
				
				//不要试图给第二部分页面配置面包屑，追踪不了的，就算要加，也是bug，如果说用query追踪，一去掉，就没了，更不可能用storage去追踪
				
				//如果在离开表单的时候，想要提示离开表单，不是点击浏览器的返回按钮，而是点击左侧导航栏跳的，看下面的例子
				
					subpageshowleft:是否打开开关也显示左侧边栏，1是打开，0关闭
					isform:点击左侧导航的时候，监测这个统一的标识，如果是1，则询问是否要跳转，不是1则不需要(表单页里面的拦截可以通过这个标识为1的时候让它忽略即可,跟subpageshowleft要配套使用，同为1或为0)
						如果是表单页，想要提示离开，要在表单页里面加如下内容
						import {ifleftclick} from '../../assets/js/common.js'使用这个暴露出来的ifleftclick数据
						然后：
						beforeRouteLeave(to,from,next) {//表单页的这个钩子里面写入如下逻辑
							if(from.meta.hasOwnProperty('isform')){
								if(from.meta.isform == 1&&ifleftclick){
									next()
								}else{
									var l = confirm('确定离开页面？')
									if(l){
										next()
									}
								}
							}
						}
				
				//subpageshowleft没有特殊情况建议不要打开
				
				其他vue3 admin事先配置好的模板就不用担心这样的问题，因为是全部都会把路由渲染到左边，不会考虑上面这样的问题的
			
			
			*/
			//path命名规范："一级路径_sub",然后children里面就是要进来的页面
			..._sub_routes
		]
	},
	//这里的页面是iframe打开的页面
	..._frames_page_router
]

export {
	_routes
}
