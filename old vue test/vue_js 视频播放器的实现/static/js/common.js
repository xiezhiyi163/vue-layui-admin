function formatSeconds(value) {
	var theTime = parseInt(value);// 秒
	var middle= 0;// 分
	var hour= 0;// 小时

	if(theTime > 60) {
		middle= parseInt(theTime/60);
		theTime = parseInt(theTime%60);
		if(middle> 60) {
			hour= parseInt(middle/60);
			middle= parseInt(middle%60);
		}
	}
	// var result = ":"+parseInt(theTime);
	// if(middle > 0) {
	// 	result = ":"+parseInt(middle)+result;
	// }
	// if(hour> 0) {
	// 	result = ""+parseInt(hour)+result;
	// }
	// return result;
	return (hour?hour + ':' : '' )+ (middle?middle + ':' : '0:' )+ theTime
}