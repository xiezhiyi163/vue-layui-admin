var _rec_routes = [
	{
		path: "index",
		name: "index",
		id: 'index', //和name一样，设置权限要用到
		title: '首页',
		root: [],
		navicon:{
			type:'font',
			icon:'fa fa-home'
		},
		component: () => import( /* webpackChunkName: "about" */ "../views/index/index.vue"),
	},
	{
		path: "recurrence",
		name: "recurrence",
		id: 'recurrence', //和name一样，设置权限要用到
		title: '权限',
		root: [],
		navicon:{
			type:'img',
			icon:require('../assets/about.png')
		},
		component: () => import( /* webpackChunkName: "about" */ "../views/recurrence/index.vue"),
	},
	{
		path: "coms",
		name: "coms",
		id: 'coms', //和name一样，设置权限要用到
		title: '组件',
		root: [],
		ifsub:1,//该参数是用来判断搜索的时候如果搜索到用于点击展开的导航，就跳过，不展示出来
		navicon:{
			type:'img',
			icon:require('../assets/about.png')
		},
		component: () => import( /* webpackChunkName: "about" */ "../views/_.vue"),
		children: [
			{
				path: "common-coms",
				name: "common-coms",
				id: 'common-coms', //和name一样，设置权限要用到
				title: 'pc常用组件',
				root: [],
				navicon:{
					type:'img',
					icon:require('../assets/about.png')
				},
				component: () => import( /* webpackChunkName: "about" */
					"../views/common-coms/index.vue"),
			},
			{
				path: "swipertest",
				name: "swipertest",
				id: 'swipertest', //和name一样，设置权限要用到
				title: '轮播',
				root: [],
				navicon:{
					type:'img',
					icon:require('../assets/about.png')
				},
				component: () => import( /* webpackChunkName: "about" */
					"../views/slider_swiper_test/index.vue"),
			},
			{
				path: "table_drag_test",
				name: "table_drag_test",
				id: 'table_drag_test', //和name一样，设置权限要用到
				title: '表格',
				root: [],
				navicon:{
					type:'img',
					icon:require('../assets/about.png')
				},
				component: () => import( /* webpackChunkName: "about" */
					"../views/table_drag_test/index.vue"),
			},
			{
				path: "jsmindtest",
				name: "jsmindtest",
				id: 'jsmindtest', //和name一样，设置权限要用到
				title: 'jsmind',
				root: [],
				navicon:{
					type:'img',
					icon:require('../assets/about.png')
				},
				component: () => import( /* webpackChunkName: "about" */
					"../views/jsmindtest/index.vue"),
			},
			{
				path: "mxgraphtest",
				name: "mxgraphtest",
				id: 'mxgraphtest', //和name一样，设置权限要用到
				title: 'mxgraph',
				root: [],
				navicon:{
					type:'img',
					icon:require('../assets/about.png')
				},
				component: () => import( /* webpackChunkName: "about" */
					"../views/mxgraphtest/index.vue"),
			},
		]
	},
]

export {
	_rec_routes
}
