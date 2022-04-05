/* 权限处理测试 */

var routerobj = [
	{rule:['admin']},{rule:['admin'],children:[
		{rule:['admin']},
		{rule:['admin']},
		{rule:['admin']},
	]},{rule:['admin','business']},{rule:['admin','viewer']},
]

var quanxian = ['admin','business','viewer','mtains'];//权限类型列表(后台直接这样返回的)

var user1 = ['viewer','business']//用户拥有的权限，用这个查找上面quanxian返回的存不存在
var quanxiancanuse = []//user1如果是按钮，这个数组不为空，为true
for(var i=0;i<quanxian.length;i++) {
	var k = 0;
	while(quanxian[i]!=user1[k]&&k<user1.length){k++}
	if(k<user1.length){quanxiancanuse.push(quanxian[i])}
}
//拿到能用的权限数组