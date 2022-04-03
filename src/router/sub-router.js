var _sub_routes = [{
    path: 'table_sub',
    name: 'table_sub',
    root: -1,
    meta:{
        title:'表格'//跟第一部分的导航的标题匹配，方便对应页面
    },
    component: () => import( /* webpackChunkName: "about" */ "../views/_.vue"),
    children: [{
            path: "form_:type",
            name: "form-edit",
            root: -1,
            meta:{
                subpageshowleft:1,
                isform:1,
            },
            component: () => import( /* webpackChunkName: "about" */
                "../views/form-edit/index.vue"),
        },
        {
            path: "form2_:type",
            name: "form-edit2",
            root: -1,
            meta:{
                subpageshowleft:0,
                isform:0,
            },
            component: () => import( /* webpackChunkName: "about" */
                "../views/form-edit/index2.vue"),
        },
    ]
}]

export {_sub_routes}