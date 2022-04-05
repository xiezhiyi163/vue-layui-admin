var list1 = ''
var listb = ''
var parentid = []
function setrecurrence(list1,getparent){
	for(var i=0;i<list1.length;i++){
		var temp = list1[i].root.join(',')
		for(var k=0;k<listb.length;k++){
			if(temp.indexOf(listb[k])!=-1){
				list1[i].show = 1
			}
		}
		if(getparent!=-1) {
			list1[i].pid = getparent
		}
		if(list1[i].children){
			setrecurrence(list1[i].children,getparent == -1?list1[i].id:list1[i].pid)
		}
	}
}
function recurrence(list,list2) {
	list1 = list
	listb = list2
	setrecurrence(list1,-1)
	return list1
}