var list1 = ''
var listb = ''
function setrecurrence(list1,getparent){
	for(var i=0;i<list1.length;i++){
		if(list1[i].root != -1){
			var temp = list1[i].root.join(',')
			if(list1[i].root.length!=0){
				for(var k=0;k<listb.length;k++){
					if(temp.indexOf(listb[k])!=-1){
						list1[i].show = 1
					}
				}
			}else{
				list1[i].show = 0
			}
			if(getparent!=-1) {
				list1[i].pname = getparent
			}
			if(list1[i].children){
				setrecurrence(list1[i].children,getparent == -1?list1[i].name:list1[i].pname)
			}
		}
	}
}
function recurrence(list,list2) {
	list1 = list
	listb = list2
	setrecurrence(list1,-1)
	return list1
}

//===============

var getthisandparent = function () {
  var map = null;
  var findMap = (data,searchkey, ids, map = {}) => {
	data.forEach(item => {
	  map[ item[searchkey] ] = map[ item[searchkey] ] || [];
	  if (ids) {
		map[ item[searchkey] ] = ids.concat( item[searchkey] );
	  } else {
		map[ item[searchkey] ].push( item[searchkey] );
	  }
	  if (item.children) {
		return findMap(item.children,searchkey, map[ item[searchkey] ], map);
	  }
	});
	return map;
  }
  return function (list,value,searchkey) {
	if (!map) {
	  map = findMap(list,searchkey);
	}
	return map[value];
  }
};

//================================================

var ifleftclick = 0
function leftclick(flag){
	ifleftclick = flag
	return ifleftclick
}

//===============================================

var userroot = sessionStorage.getItem('userroot')?sessionStorage.getItem('userroot'):'admin'

//===============================================

export { 
	recurrence , 
	getthisandparent , 
	userroot , 
	//
	ifleftclick , 
	leftclick 
}