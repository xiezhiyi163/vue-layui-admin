var danmuboxVue_created = function(){
		
},
danmuboxVue_props = {
    'danmudatas':{
        type:null
    }
},
danmuboxVue_data = {
    bshowdanmubox:0,
    num:0,
    slidenum:0
},
danmuboxVue_methods = {
    removeElement:function (_element){
        var _parentElement = _element.parentNode;
        if(_parentElement){
            _parentElement.removeChild(_element);
        }
    },
    // @danmu
    /*{
        弹幕系统进行了两个字的时候的弹幕压力测试，足够满足弹幕非常多但不像下面那种的弹幕情况的使用
        拓展：可使用animation-play-state进行动画控制暂停，我这个没有做动画，只做了transition
    }*/
    setdanmu:function(text,ids,type){//弹幕发射的逻辑
        this.num = 0;//防止出现后面没有弹幕但却在中间发送的情况
        var danmuwrap_ = document.getElementById('app').children[0].children[0].children[1].children[0].children[0].children[0]//依次找到id：danmuwrap
        //以25高的距离为基准
        if(type=='left')
        {
            (function(_this){
                var dom = document.createElement('span');
                dom.innerText = text;
                function fn(idsv,num){//公共方法
                    if(document.getElementById(idsv)){
                        return;
                    }
                    dom.id = idsv;
                    dom.style.transition = 0+'ms linear'
                    dom.className = 'dans dan'+_this.num;
                    dom.style.top = (num)*30+'px'
                    danmuwrap_.appendChild(dom)
                    dom.style.left = document.getElementById('danmuwrap').offsetWidth+'px'
                    var speed = ''//算出移动速度
                    if((text.length-text.length%6)/6<=0){
                        speed = 1000
                    }else{
                        speed = (text.length-text.length%6)/6*1000
                    }
                    dom.style.transition = ((95500-speed)<60000?60000:(95500-speed))+'ms linear'
                    _this.num = 0
                    window['danmumove'+idsv] = function(){
                        _this.danmumoving_(idsv,text.length)
                    }
                    window['danmumove'+idsv]()		
                }
                if(document.querySelectorAll('.dans').length!=0){
                    //设置要添加的class索引
                    var h = (document.getElementById('danmuwrap').offsetHeight-document.getElementById('danmuwrap').offsetHeight%30)/30
                    var nums = 0
                    for(var i = 0;i<h;i++){
                        _this.num = i+1
                        var lengths = document.querySelectorAll('.dan'+_this.num)
                        if(lengths.length == 0){
                            break;
                        }
                        if(lengths[lengths.length-1]){
                            if(lengths[lengths.length-1].offsetLeft < danmuwrap_.offsetWidth-lengths[lengths.length-1].offsetWidth){
                                nums = _this.num-1
                                break;
                            }
                            nums = _this.num						
                        }
                    }//在判断有没有空位，紧接着判断有没有空的行，直到塞不下，依次判断追加
                    var thenum = 0
                    for(var i = 0;i<h;i++){
                        thenum = i+1
                        var lengths2 = document.querySelectorAll('.dan'+thenum)
                        if(lengths2[lengths2.length-1]){
                            if(lengths2[lengths2.length-1].offsetLeft < danmuwrap_.offsetWidth-lengths2[lengths2.length-1].offsetWidth){
                                fn(ids,nums)		
                                break;
                            }					
                        }else{
                            fn(ids,nums)						
                            break;
                        }
                    }
                }else{
                    _this.num++;
                    fn(ids,_this.num-1)						
                }
            })(this)
        }
        else
        {
            (function(_this){
                var dom1 = document.createElement('p');
                dom1.innerText = text;
                if(document.querySelectorAll(type=='top'?'.tdans':'.bdans').length!=0){
                    var h = ((document.getElementById('danmuwrap').offsetHeight-document.getElementById('danmuwrap').offsetHeight%30)/30)/2
                    var nums = 0
                    for(var i = 0;i<h;i++){
                        _this.num = i+1
                        var lengths = document.querySelectorAll((type=='top'?'.tdan':'.bdan')+_this.num)
                        if(lengths.length == 0){
                            nums = _this.num;
                            break;
                        }
                    }
                    var thenum1 = 0
                    for(var i = 0;i<h;i++){
                        thenum1++;
                        var lengths1 = document.querySelectorAll((type=='top'?'.tdan':'.bdan')+thenum1);
                        if(lengths1.length==0){
                            dom1.id = ids;
                            dom1.className = (type=='top'?'tdans tdan':'bdans bdan')+nums;
                            if(type=='top'){
                                dom1.style.top = (nums-1)*30+'px'								
                            }else{
                                dom1.style.bottom = (nums-1)*30+'px'
                            }
                            dom1.style.textAlign = 'center'
                            danmuwrap_.appendChild(dom1);
                            _this.num = 0;
                            window['tbdanmu'+ids] = function(){
                                _this.danmutophidden_(ids)
                            }
                            window['tbdanmu'+ids]()
                            break;
                        }
                    }
                }else{
                    _this.num++;
                    dom1.id = ids;
                    dom1.className = (type=='top'?'tdans tdan':'bdans bdan')+_this.num;
                    if(type=='top'){
                        dom1.style.top = (_this.num-1)*30+'px'								
                    }else{
                        dom1.style.bottom = (_this.num-1)*30+'px'
                    }
                    dom1.style.textAlign = 'center'
                    danmuwrap_.appendChild(dom1);
                    _this.num = 0;
                    window['tbdanmu'+ids] = function(){
                        _this.danmutophidden_(ids)
                    }
                    window['tbdanmu'+ids]()
                }
            })(this)
        }
    },
    danmutophidden_:function(ids){
        document.getElementById(ids).style.animation = 'centerdanmudisplaynone 5s forwards'
    },
    danmumoving_:function(ids,textl){
        var _this = this;
        if(Number(document.getElementById(ids).style.left.split('px')[0]) < -document.getElementById(ids).offsetWidth){}
        document.getElementById(ids).style.left = -8600 + 'px'
    },
    cleardanmuinterval:function(){
        var _this = this;
        var lengths2 = document.querySelectorAll('.dans')
        if(lengths2.length!=0){
            for(var i = 0;i<lengths2.length;i++){
                if(lengths2[i].offsetLeft<-lengths2[i].offsetWidth){
                    this.removeElement(lengths2[i])
                }
            }				
        }//
        function getStyle(obj,styleName){
            if(obj.currentStyle){
                return obj.currentStyle[styleName];
            }else{
                return getComputedStyle(obj,null)[styleName];
            }
        }
        var lengths3 = document.querySelectorAll('.tdans')
        if(lengths3.length!=0){
            for(var i = 0;i<lengths3.length;i++){
                if(getStyle(lengths3[i],'opacity') == 0){
                    this.removeElement(lengths3[i])
                }
            }				
        }
        var lengths4 = document.querySelectorAll('.bdans')
        if(lengths4.length!=0){
            for(var i = 0;i<lengths4.length;i++){
                if(getStyle(lengths4[i],'opacity') == 0){
                    this.removeElement(lengths4[i])
                }
            }				
        }
        setTimeout(function(){
            _this.cleardanmuinterval()
        },300)
    },
    getdanmudata:function(){
        var nums = 0,_this = this;
        for(var i = 0;i<1000;i++){
            nums++;
            if((i+1)%2==0){
                this.danmudatas.push({text:'技术日常',id:('did'+new Date().getTime()+nums),type:'left',time:nums})					
            }else{
                this.danmudatas.push({text:'搬砖',id:('did'+new Date().getTime()+nums),type:'left',time:nums})					
            }
        };
        setTimeout(function() {
            _this.danmuload()
            _this.cleardanmuinterval()			
        }, 10);
    },
    danmuload:function(){//遍历数据并进行弹幕加载，模拟哪一时刻出现的弹幕，真正使用的时候得要修改这里的逻辑，把time作为视频的哪一个时间位置进行发射弹幕
        var _this = this,arrlength = this.danmudatas.length;
        if(this.bshowdanmubox){
            if(this.slidenum<arrlength){
                this.slidenum++
                setTimeout(function(){
                    _this.setdanmu(_this.danmudatas[_this.slidenum-1].text,_this.danmudatas[_this.slidenum-1].id,_this.danmudatas[_this.slidenum-1].type)//发送弹幕和弹幕加载
                    _this.danmuload()
                },20)
            }else{
                this.slidenum = 1
                setTimeout(function(){
                    _this.setdanmu(_this.danmudatas[_this.slidenum-1].text,_this.danmudatas[_this.slidenum-1].id,_this.danmudatas[_this.slidenum-1].type)//发送弹幕和弹幕加载
                    _this.danmuload()
                },20)
            }
        }else{
            setTimeout(function(){
                _this.danmuload()
            },20)
        }        
    },
    //发送弹幕
    senddanmu:function(){
        this.setdanmu('测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕','ids2'+new Date().getTime(),'left')
    },
    closedanmu:function(){
        this.bshowdanmubox = 0
    },
    opendanmu:function(){
        this.bshowdanmubox = 1
    },
},
danmuboxVue_mounted = function(){
    this.getdanmudata()
},
danmuboxVue = {
    template:"#danmubox",
    props:danmuboxVue_props,
    created:danmuboxVue_created,
    // data:function(){
    //     return danmuboxVue_data
    // },
    data:()=>(
        Object.assign({

        },
        Object.assign({

        },
        danmuboxVue_data))
    ),
    methods:danmuboxVue_methods,
    mounted:danmuboxVue_mounted
};
/* 
    -------------
 */
var danmuboxb_created = function(){
    
},
danmuboxb_props = {
    danmudatas:{
        type:null,
    }
},
danmuboxb_data = {
    winwidth:'',
    domwidth:'',
},
danmuboxb_methods = {
    getwidthandheight:function(type){
        if(type == 'w'){
            var ww = window.innerWidth,
                ddw = document.documentElement.clientWidth,
                dbw = document.body.clientWidth,
                tw = ww?ww:ddw?ddw:dbw;
            return tw							
        }else{
            var wh = window.innerHeight,
                ddc = document.documentElement.clientHeight,
                dbc = document.body.clientHeight,
                th = wh?wh:ddc?ddc:dbc;
            return th							
        }
    },
    //danmu移动
    getdanmu:function(num){
        var _this = this;
        var danmuwrap_ = document.getElementById('app').children[0].children[0].children[2].children[0].children[0].children[1]//依次找到id：danmuwrapb
        if(num == 3){//3为即将追加的索引
            danmuwrap_.children[0].appendChild((function(){
                var dom = document.createElement('span');
                dom.className = 'danmuitem1';
                dom.innerHTML = _this.danmudatas[0].text
                return dom;
            })())
            danmuwrap_.children[1].appendChild((function(){
                var dom = document.createElement('span');
                dom.className = 'danmuitem2';
                dom.innerHTML = _this.danmudatas[1].text
                return dom;
            })())
            danmuwrap_.children[2].appendChild((function(){
                var dom = document.createElement('span');
                dom.className = 'danmuitem3';
                dom.innerHTML = _this.danmudatas[2].text
                return dom;
            })())	
            var n = num+1
            this.getdanmu(n)
        }else{
            var doms1wrap = danmuwrap_.children[0]//依次找到id：danmuwrapb1
            var doms2wrap = danmuwrap_.children[1]//依次找到id：danmuwrapb2
            var doms3wrap = danmuwrap_.children[2]//依次找到id：danmuwrapb3
            var doms1 = danmuwrap_.children[0].children//依次找到id：danmuwrapb1所有子元素
            var doms2 = danmuwrap_.children[1].children//依次找到id：danmuwrapb2所有子元素
            var doms3 = danmuwrap_.children[2].children//依次找到id：danmuwrapb3所有子元素
            var doms1l = 0
            var doms2l = 0
            var doms3l = 0
            for(var i = 0;i<doms1.length;i++){
                doms1l+=doms1[i].offsetWidth+18
            }
            for(var i = 0;i<doms2.length;i++){
                doms2l+=doms2[i].offsetWidth+18
            }
            for(var i = 0;i<doms3.length;i++){
                doms3l+=doms3[i].offsetWidth+18
            }
            var a=[{type:'1',num:doms1l},{type:'2',num:doms2l},{type:'3',num:doms3l}],t='';
            for(var i=0;i<a.length;i++){
              for(var j=0;j<a.length-1;j++){//-1
                 if(a[j].num>a[j+1].num){//这个成立的时候，保存前面的为临时值，然后互换，前面的等于+1的，然后+1的那个等于临时的
                    t=a[j];
                    a[j]=a[j+1];
                    a[j+1]=t; 
                 }
               }
            }
            var whichfirst = 0
            if(a[0].type=='1'){
                whichfirst = doms1wrap
            }else if(a[0].type=='2'){
                whichfirst = doms2wrap
            }else{
                whichfirst = doms3wrap
            }
            whichfirst.appendChild((function(){
                var dom = document.createElement('span');
                dom.className = 'danmuitem'+a[0].type;
                dom.innerHTML = _this.danmudatas[num].text
                return dom;
            })())
            if(num<_this.danmudatas.length-1){
                var n = num+1
                this.getdanmu(n)
            }else{
                this.danmumoveing()
            }
        }
    },
    danmumoveing:function(){
        var danmuwrap_box = document.getElementById('app').children[0].children[0].children[2].children[0].children[0]//依次找到id：danmuboxb2
        var danmuwrap_ = document.getElementById('app').children[0].children[0].children[2].children[0].children[0].children[1]//依次找到id：danmuwrapb
        var n = danmuwrap_.offsetLeft<0?-danmuwrap_.offsetLeft:danmuwrap_.offsetLeft
        if(n>danmuwrap_.offsetWidth&&danmuwrap_.offsetLeft<0){
            danmuwrap_.style.left = danmuwrap_box.offsetWidth + 'px'
            setTimeout(this.danmumoveing,10)
            return;
        }
        danmuwrap_.style.left = danmuwrap_.offsetLeft - 1 + 'px'
        setTimeout(this.danmumoveing,10)
    }
},
danmuboxb_mounted = function(){
    this.winwidth = this.getwidthandheight('w')
    this.domwidth = document.getElementById('danmuboxb2').offsetWidth
    this.getdanmu(3)
},
danmuboxbVue = {
    template:'#danmuboxB',
    created:danmuboxb_created,
    props:danmuboxb_props,
    // data:function(){
    //     return danmuboxb_data
    // },
    data:()=>(
        Object.assign({

        },
        Object.assign({

        },
        danmuboxb_data))
    ),
    methods:danmuboxb_methods,
    mounted:danmuboxb_mounted
};
/* 
    -------------app
 */
var created_ = function(){
    
},
components_ = {
    danmubox:danmuboxVue,
    danmuboxb:danmuboxbVue,
},
datas = {
    danmutype:'bilibili',
    bilibilidanmudatas:[
        //time是模拟弹幕出现时间
        {text:'测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕',id:'did1',type:'left',time:10},
        {text:'3355226测试弹幕测试弹幕测试弹幕',id:'did2',type:'left',time:20},
        {text:'3355226',id:'did3',type:'left',time:30},
        {text:'3355226',id:'did4',type:'left',time:40},
        {text:'3355226',id:'did5',type:'left',time:50},
        {text:'3355226',id:'did6',type:'left',time:60},
        {text:'3355226',id:'did7',type:'left',time:70},//
        {text:'3355226',id:'did2a',type:'left',time:520},
        {text:'3355226',id:'did3a',type:'left',time:530},
        {text:'3355226',id:'did4a',type:'left',time:540},
        {text:'3355226',id:'did5a',type:'left',time:550},
        {text:'3355226',id:'did6a',type:'left',time:560},
        {text:'3355226',id:'did7a',type:'left',time:570},//
        {text:'3355226',id:'did2b',type:'left',time:920},
        {text:'3355226',id:'did3b',type:'left',time:930},
        {text:'3355226',id:'did4b',type:'left',time:940},
        {text:'3355226',id:'did5b',type:'left',time:950},
        {text:'3355226',id:'did6b',type:'left',time:960},
        {text:'3355226',id:'did7b',type:'left',time:970},
        {text:'3355226',id:'tdid1',type:'top',time:10},
        {text:'测试弹幕',id:'tdid2',type:'top',time:20},
        {text:'3355226',id:'tdid3',type:'top',time:30},
        {text:'3355226',id:'tdid4',type:'top',time:40},
        {text:'3355226',id:'tdid5',type:'top',time:50},
        {text:'3355226',id:'tdid6',type:'top',time:60},
        {text:'3355226',id:'tdid7',type:'top',time:70},//
        {text:'3355226',id:'tdid2a',type:'top',time:520},
        {text:'3355226',id:'tdid3a',type:'top',time:530},
        {text:'3355226',id:'tdid4a',type:'top',time:540},
        {text:'3355226',id:'tdid5a',type:'top',time:550},
        {text:'3355226',id:'tdid6a',type:'top',time:560},
        {text:'3355226',id:'tdid7a',type:'top',time:570},//
        {text:'3355226',id:'tdid2b',type:'top',time:920},
        {text:'3355226',id:'tdid3b',type:'top',time:930},
        {text:'3355226',id:'tdid4b',type:'top',time:940},
        {text:'3355226',id:'tdid5b',type:'top',time:950},
        {text:'3355226',id:'tdid6b',type:'top',time:960},
        {text:'3355226',id:'tdid7b',type:'top',time:970},
        {text:'3355226',id:'bdid1',type:'bottom',time:10},
        {text:'3355226',id:'bdid2',type:'bottom',time:20},
        {text:'3355226',id:'bdid3',type:'bottom',time:30},
        {text:'3355226',id:'bdid4',type:'bottom',time:40},
        {text:'3355226',id:'bdid5',type:'bottom',time:50},
        {text:'3355226',id:'bdid6',type:'bottom',time:60},
        {text:'3355226',id:'bdid7',type:'bottom',time:70},//
        {text:'3355226',id:'bdid2a',type:'bottom',time:520},
        {text:'3355226',id:'bdid3a',type:'bottom',time:530},
        {text:'3355226',id:'bdid4a',type:'bottom',time:540},
        {text:'3355226',id:'bdid5a',type:'bottom',time:550},
        {text:'3355226',id:'bdid6a',type:'bottom',time:560},
        {text:'3355226',id:'bdid7a',type:'bottom',time:570},//
        {text:'3355226',id:'bdid2b',type:'bottom',time:920},
        {text:'3355226',id:'bdid3b',type:'bottom',time:930},
        {text:'3355226',id:'bdid4b',type:'bottom',time:940},
        {text:'3355226',id:'bdid5b',type:'bottom',time:950},
        {text:'3355226',id:'bdid6b',type:'bottom',time:960},
        {text:'3355226',id:'bdid7b',type:'bottom',time:970},
    ],
    normaldanmudata:[
        //time是模拟弹幕出现时间
        {text:'测试弹幕测试弹幕测试弹幕',id:'did1',type:'left'},
        {text:'3355226asdads',id:'did2',type:'left'},
        {text:'3355226sada',id:'did3',type:'left'},
        {text:'3355226asdsadsa',id:'did4',type:'left'},
        {text:'3355226sadsad',id:'did5',type:'left'},
        {text:'3355226asdsa',id:'did6',type:'left'},
        {text:'3355226asdsaadssad',id:'did7',type:'left'},//
        {text:'3355226asdsadsad',id:'did2a',type:'left'},
        {text:'3355226sadasdas',id:'did3a',type:'left'},
        {text:'3355226asdsad',id:'did4a',type:'left'},
        {text:'3355226adsasdad',id:'did5a',type:'left'},
        {text:'3355226asdasdadasdsa',id:'did6a',type:'left'},
        {text:'3355226asdsadasd',id:'did7a',type:'left'},//
        {text:'3355226sadassadasdasd',id:'did2b',type:'left'},
        {text:'3355226asdsadsad',id:'did3b',type:'left'},
        {text:'3355226asdasd',id:'did4b',type:'left'},
        {text:'3355226asdasdasdsa',id:'did5b',type:'left'},
        {text:'3355226sadsadsadsadasda',id:'did6b',type:'left'},
        {text:'3355226asdasdsadasda',id:'did7b',type:'left'},
    ]
},
methods_ = {
    //监听
    listens:function(){
        document.getElementById('app').style.visibility = 'visible'
        window.addEventListener('resize',function(){
            
        })
    },
},
mounted_ = function(){
    this.listens()
},
vue = new Vue({
    el:'#app',
    created:created_,
    components:components_,
    data:datas,
    methods:methods_,
    mounted:mounted_
})
