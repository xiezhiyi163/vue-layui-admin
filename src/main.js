import { createApp } from "vue";

import ElementUI from 'element-plus';
import 'element-plus/dist/index.css';

import App from "./App.vue";
import router from "./router";

import {userroot} from './assets/js/common.js'

var app = createApp(App)

app.config.globalProperties.$getroot = function(arr){
	if(arr.constructor.toString().indexOf('Array')!=-1){
		var flag = 0
		for(var i=0;i<arr.length;i++){
			if([userroot].join(',').indexOf(arr[i])!=-1){
				flag = 1
			}
		}
		if(flag == 1){
			return true
		}else{
			return false
		}
	}else if(typeof arr == 'string'){
		if([userroot].join(',').indexOf(arr)!=-1){
			return true
		}else{
			return false
		}
	}
};

app.use(router).use(ElementUI).mount("#app");
