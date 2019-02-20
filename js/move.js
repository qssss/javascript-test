function move(elem,attrObj,duration,fx,cbFn) {
	var bobj = {};
	var cobj = {};
	for(var attr in attrObj) {
		if(attr === 'opacity') {
			var temp = parseInt(getStyle(elem,attr)) || 1;
		} else {
			var temp = parseInt(getStyle(elem,attr)) || 0;
		}
		bobj[attr] = temp;
		cobj[attr] = attrObj[attr] - temp;
	}
	var d = duration;
	var starttime = now();
	var timer = setInterval(()=> {
		var changetime = now();
		var t = Math.min(changetime - starttime,d);
		if(t === d) {
			if(cbFn) {
				cbFn();
			}
			clearInterval(timer);
		}
		for(var attr in attrObj) {
			if(attr === 'opacity'){
				elem.style[attr] = Tween[fx](t,bobj[attr],cobj[attr],d);
			} else {
				elem.style[attr] = Tween[fx](t,bobj[attr],cobj[attr],d) + 'px';
			}
		}
	},16);
}
function now() {
	//得到时间戳：到1970年1月1日的毫秒数
	return (new Date()).getTime();
}
function getStyle(elem,attr) {
	return window.getComputedStyle(elem)[attr];
}