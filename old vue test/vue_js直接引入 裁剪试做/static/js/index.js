//methods
var showpage = function($vue){
	document.getElementById('app').style.display = 'block'
}

//监听
var listens = function($vue){
	window.addEventListener('resize',function(){
		
	})
}

//图片裁剪V1_0

var clipforCanvas = function($vue){
	var id1a = document.getElementById('photowrap'),
		id1 = document.getElementById('clipbox')
		id2 = document.getElementById('photobase'),
		id2a = document.getElementById('photobase2'),
		idview = document.getElementById('photoView'),
		cvsDom = document.getElementById('lastphotoview'),
		cvs = cvsDom.getContext('2d'),
		left = (id1.offsetLeft-id2a.offsetLeft)/id2a.offsetWidth*idview.offsetWidth,
		tops = (id1.offsetTop-id2a.offsetTop)/id2a.offsetHeight*idview.offsetHeight,
		widths = (id1.offsetWidth/id2.offsetWidth)*idview.offsetWidth,
	cvs.drawImage(idview,left,tops,widths,widths*(12.82/16),0,0,cvsDom.offsetWidth*2,cvsDom.offsetHeight*2)
	console.log(cvsDom.toDataURL("image/png"))
}

var clipboxmove = function($vue){//这里是真正获取图片的
	var id1a = document.getElementById('photowrap'),
		id1 = document.getElementById('clipbox')
		id2 = document.getElementById('photobase'),
		id2a = document.getElementById('photobase2');
	id1.onmousedown = function(event){
		event.stopPropagation()
		event.preventDefault()
		var oft0 = id1a.offsetTop,
			ofl0 = id1a.offsetLeft,
			ofw0 = id1a.offsetWidth-2,
			ofh0 = id1a.offsetHeight-2,
			oft = id1.offsetTop,//clipbox
			ofl = id1.offsetLeft,//clipbox
			ofw1 = id1.offsetWidth,//clipbox
			ofh1 = id1.offsetHeight,//clipbox
			oft1 = id2.offsetTop,//图片
			ofl1 = id2.offsetLeft,//图片
			ofw = id2.offsetWidth,//图片
			ofh = id2.offsetHeight;//图片
		$vue.moveflag = 1//		
		ev = event||window.event,
		scrollX0 = document.body.scrollLeft || document.documentElement.scrollLeft, //---
		scrollY0 = document.body.scrollTop || document.documentElement.scrollTop, //---
		stx = ev.pageX || (ev.clientX + scrollX0),
		sty = ev.pageY || (ev.clientY + scrollY0);
		id1a.onmousemove = function(event){
			//裁剪框操作
			var evs = event||window.event,
				stxlast = evs.pageX || (evs.clientX + scrollX0),
				stylast = evs.pageY || (evs.clientY + scrollY0);		
			if($vue.moveflag == 0){
				return;
			}
			id1.style.top = oft + (stylast-sty) + 'px'
			id1.style.left = ofl + (stxlast-stx) + 'px'
			if((oft + (stylast-sty))<oft1){
				id1.style.top = oft1 + 'px'
			}else if((oft + (stylast-sty))>oft1+ofh-ofh1){
				id1.style.top = (oft1+ofh-ofh1) + 'px'
			}
			if((ofl + (stxlast-stx))<ofl1){
				id1.style.left = ofl1 + 'px'
			}else if((ofl + (stxlast-stx))>ofl1+ofw-ofw1){
				id1.style.left = (ofl1+ofw-ofw1) + 'px'
			}
			//裁剪区域操作
			id2a.style.clip = 'rect('+(id1.offsetTop-oft1)+'px,'+(id1.offsetWidth+(id1.offsetLeft-ofl1))+'px,'+
			(id1.offsetHeight+(id1.offsetTop-oft1))+'px,'+(id1.offsetLeft-ofl1)+'px)'
			//最终生成图片
			clipforCanvas($vue)
		}
	}
	////改变裁剪大小（右下角）
	var resizebtnRb = document.getElementById('r_rb');
	resizebtnRb.onmousedown = function(event){
		event.stopPropagation()
		event.preventDefault()
		$vue.moveflag2 = 1
		var oft = id1.offsetTop,//clipbox
			ofl = id1.offsetLeft,//clipbox
			ofw1 = id1.offsetWidth,//clipbox
			ofh1 = id1.offsetHeight,//clipbox
			oft1 = id2.offsetTop,//图片
			ofl1 = id2.offsetLeft,//图片
			ofw = id2.offsetWidth,//图片
			ofh = id2.offsetHeight;//图片
		var evb = event||window.event,
		scrollX1 = document.body.scrollLeft || document.documentElement.scrollLeft, //---
		scrollY1 = document.body.scrollTop || document.documentElement.scrollTop, //---
		stx2 = evb.pageX || (evb.clientX + scrollX1),
		sty2 = evb.pageY || (evb.clientY + scrollY1);
		id1a.onmousemove = function(event){
			//裁剪框操作
			if($vue.moveflag2 == 0){return}
			var evbm = event||window.event,
				stxlast2 = evbm.pageX || (evbm.clientX + scrollX1),
				stylast2 = evbm.pageY || (evbm.clientY + scrollY1);
			id1.style.width = ofw1 + (stxlast2-stx2) + 'px'
			id1.style.height = id1.offsetWidth / 1.6 + 'px'
			if(ofw/ofh>16/10){
				if(ofw+ofl1<id1.offsetWidth+ofl){
					id1.style.width = ofw+ofl1-ofl-2 + 'px'
					id1.style.height = id1.offsetWidth / 16 * 10 + 'px'
				}
				if(ofh+oft1<id1.offsetHeight+oft){
					id1.style.height = ofh+oft1-oft-2 + 'px'
					id1.style.width = id1.offsetHeight * 1.6 + 'px'
				}
				if(ofw1 + (stxlast2-stx2)<150){
					id1.style.width = 150 + 'px'
					id1.style.height = 150/1.6 + 'px'
				}else if(id1.offsetHeight >ofh){
					id1.style.height = ofh + 'px'
					id1.style.width = id1.offsetHeight * 1.6 + 'px'
				}				
			}else{
				if(ofh+oft1<id1.offsetHeight+oft){
					id1.style.height = ofh+oft1-oft-2 + 'px'
					id1.style.width = id1.offsetHeight * 1.6 + 'px'
				}
				if(ofw+ofl1<id1.offsetWidth+ofl){
					id1.style.width = ofw+ofl1-ofl-2 + 'px'
					id1.style.height = id1.offsetWidth / 16 * 10 + 'px'
				}
				if(ofw1 + (stxlast2-stx2)<150){
					id1.style.width = 150 + 'px'
					id1.style.height = 150/1.6 + 'px'
				}else if(id1.offsetWidth >ofw){
					id1.style.width = ofw + 'px'
					id1.style.height = id1.offsetWidth / 1.6 + 'px'
				}
			}
			//裁剪区域操作
			id2a.style.clip = 'rect('+(id1.offsetTop-oft1)+'px,'+(id1.offsetWidth+(id1.offsetLeft-ofl1))+'px,'+
			(id1.offsetHeight+(id1.offsetTop-oft1))+'px,'+(id1.offsetLeft-ofl1)+'px)'
			//最终生成图片
			clipforCanvas($vue)
		}
	}
	id1a.onmouseup = function(event){
		$vue.moveflag2 = 0
		$vue.moveflag = 0
	}
	//最终生成图片
	clipforCanvas($vue)
}

var getphoto = function($vue){
	var id1 = document.getElementById('clipbox'),
		id1a = document.getElementById('photowrap'),
		id2 = document.getElementById('photobase'),
		id2a = document.getElementById('photobase2'),
		idview = document.getElementById('photoView'),
		cvsDom = document.getElementById('lastphotoview');
	if(!cvsDom.getContext){
		alert('当前浏览器不支持裁剪操作')
		return;
	}
	idview.src = $vue.imgsrc
	idview.onload = function(){
		//这里只是举例，正常来讲应该不能少于600或以下
		if(idview.offsetWidth<150||idview.offsetHeight<150/16*10){
			alert('图片尺寸过小');
			return;
		}
		//
		document.getElementById('showclip').style.display = 'block'
		id2.src = $vue.imgsrc
		id2.onload = function(){
			if(id2.offsetWidth>=id1a.offsetWidth-2){
				id2.style.width = '100%'
				id2.style.height = 'auto'
				id2.style.marginTop = (id1a.offsetHeight-2-id2.offsetHeight) / 2 + 'px'
			}
			if(id2.offsetHeight>=id1a.offsetHeight-2){
				id2.style.height = '100%'
				id2.style.width = 'auto'
				id2.style.marginTop = 'auto'
			}
			id2a.src = $vue.imgsrc
			id2a.onload = function(){
				if(id2a.offsetWidth>=id1a.offsetWidth-2){
					id2a.style.width = id2.offsetWidth + 'px'
					id2a.style.height = 'auto'
					id2a.style.top = id2.offsetTop + 'px'
				}
				if(id2a.offsetHeight>=id1a.offsetHeight-2){
					id2a.style.height = '100%'
					id2a.style.width = 'auto'
				}					
				id2a.style.left = id2.offsetLeft + 'px';
				//裁剪大小和位置初始化
				$vue.widths_height = id2a.offsetWidth-(id2a.offsetWidth*0.2)
				$vue.lastlong = $vue.widths_height>800?800:$vue.widths_height//w
				$vue.lastshort = ($vue.lastlong/1.6)//h
					//
				$vue.tops = (id2a.offsetHeight - $vue.lastshort) / 2
				$vue.topsa = (id2a.offsetHeight - $vue.lastshort) / 2
					//
				$vue.lefts = (id2a.offsetWidth - $vue.lastlong) / 2
				$vue.leftsa = (id2a.offsetWidth - $vue.lastlong) / 2
					//
				id2a.style.clip = 
				'rect('+$vue.tops+'px,'+
				($vue.lastlong+$vue.leftsa+2)+
				'px,'+
				($vue.lastshort+$vue.topsa+1)+
				'px,'+$vue.lefts+'px)';			
				//裁剪容器大小位置初始化
				setTimeout(function(){
					id1.style.width = $vue.lastlong + 'px'
					id1.style.height = $vue.lastshort + 'px'
					id1.style.top = ($vue.tops+id2.offsetTop)+'px'
					id1.style.left = ($vue.lefts+id2.offsetLeft)+'px'			
					clipboxmove($vue)//裁剪逻辑
				},0)
			}
		}
	}
}

window.vue = new Vue({
	el:'#app',
	data:{
		//图片裁剪V1_0
		moveflag:0,
		moveflag2:0,
		//
		/* imgsrc:'static/img/57bd4126660e7.jpg', */
		imgsrc:'static/img/Eb6G_qCUMAAAYN3.jpg',
		widths_height:'',
		lastlong:'',
		lastshort:'',
		//
		tops:'',
		topsa:'',
		//
		lefts:'',
		leftsa:'',
	},
	mounted:function(){
		showpage(this)
		//图片裁剪V1_0
		getphoto(this)		
		//监听
		listens(this)
	}
})