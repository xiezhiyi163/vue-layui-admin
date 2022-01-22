import { createRouter, createWebHashHistory } from "vue-router";
import {_routes} from './routerMap.js'

const routes = _routes;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to,from,next)=>{
	//一个模拟的令牌token，实际情况请自行处理
	if(sessionStorage.getItem('userroot')){
		if (to.path == '/') {
		      next({path:'/home/index'});
		} else {
		  next()
		}
	}else{
		if (to.path == '/') {
		      next();
		} else {
		  next({path: '/'})
		}
	}
})

export default router;
