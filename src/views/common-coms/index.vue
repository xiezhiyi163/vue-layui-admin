<template>
	<div class="main">
		<div class="wrap">
		  <div class="home">
			<div class="nav">
				<div class="nav navfix">
					可响应式的业务组件			
				</div>
			</div>
			<!-- == -->
			<div class="smalltitle">搜索组件（搜索专页使用）</div>
			<div class="pad">
				<!-- 
					@mode:'local',本地数据，'line',线上获取
					@requestlist:请求到的数据(line，必选)
					@requestSearchValue:回调 -> 返回关键词获取接口数组写入到requestlist属性(line，必选)
					@searchlist:本地数据数组(local，必选)
					@keys:当数组的每一个为对象时，该属性必须(local，必选)
					@subkey:单个数组对象的子集属性(local，可选)
					//
					@search:回调 -> 获得返回的关键词
				 -->
				<searchwithlist mode="line" :requestlist="linelist" @requestSearchValue="" :searchlist="locallist" keys="title" subkey="children" @search=""/>		
			</div>
			<!-- == -->
			<div class="smalltitle">视频截图</div>
			<div class="pad">
				<videopiccut />		
			</div>
			<!-- == -->
			<div class="smalltitle">图标在中间的内容展示模板，多用于天气展示</div>
			<div class="pad">
				<iconincenter />		
			</div>
			<!-- == -->
			<div class="smalltitle">商品详情，订单，横向模板</div>
			<div class="pad">
				<detail />		
			</div>
			<!-- == -->
			<div class="smalltitle2">商品详情，竖向模板</div>
			<div class="pad2wrap">
				<div class="pad2">
					<detailimgtop/>
				</div>
				<div class="pad2">
					<detailimgtop/>
				</div>
				<div style="clear: both;"></div>		
			</div>
			<!-- == -->
			<div class="smalltitle2">错位模板</div>
			<div class="pad">
				<sign></sign>
				<signcss></signcss>
			</div>
			<!-- == -->
			<div class="smalltitle2">上传和断点上传以及表格处理不做封装，太多的不确定性因素，表格的需求问题可能导致是否可直接使用UI框架或插件来开发表格，表格应该正常的处理方式是，循环tr，然后根据数据处理表头大的分类</div>
			<div class="smalltitle2">表格可拖拽去模板里面找</div>
		  </div>
		</div>
	</div>
</template>

<script>
import {_rec_routes} from '../../router/recurrence-router.js'
// @ is an alias to /src
import videopiccut from "@/components/subcoms/videopiccut.vue";
import detail from "@/components/subcoms/detail.vue";
import detailimgtop from "@/components/subcoms/detailimg-top.vue";
import iconincenter from "@/components/subcoms/icon_in_center.vue";
import sign from "@/components/subcoms/sign.vue";
import signcss from "@/components/subcoms/sign-css.vue";
import searchwithlist from "@/components/subcoms/searchboxWithList.vue";

export default {
  name: "Home",
  components: {
	videopiccut,
    detail,
	detailimgtop,
	iconincenter,
	sign,
	signcss,
	searchwithlist
  },
  data() {
	  return {
		  linelist:['line数据演示1','line数据演示2','line数据演示3'],
		  locallist:_rec_routes//模拟数据
	  }
  }
};
</script>

<style scoped>
	.main {
		padding-top: 20px;
	}
	.wrap {
		margin: 0 20px 20px;
		padding: 20px;
		background-color: white;
	}
	.home {
		max-width: 1200px;
		margin: 0 auto;
		padding-bottom: 20px;
	}
	.nav {
		/* padding: 20px 0; */
		height: 20px;
		/* box-shadow: 0 0 10px 0 #ccc; */
		text-align: center;
		background-color: white;
	}
	.navfix {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: white;
		z-index: 1;
	}
	.smalltitle {
		padding: 20px;
	}
	.smalltitle2 {
		padding: 20px 20px 0;
	}
	.pad {
		padding: 0 20px;
	}
	.pad2wrap {
		padding: 0 10px;
	}
	.pad2 {
		width: 20%;
		float: left;
	}
	
	@media (max-width:1200px) and (min-width:1000px){
		.pad2 {
			width: 25%;
		}
	}
	
	@media (max-width:1000px) and (min-width:720px){
		.pad2 {
			width: 33.333%;
		}
	}
	@media (max-width:720px) and (min-width:480px){
		.pad2 {
			width: 50%;
		}
	}
	@media (max-width:480px){
		.pad2 {
			width: 100%;
		}
	}
</style>
