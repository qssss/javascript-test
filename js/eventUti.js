var eventUti = {
	addHandler: function(elem,type,hander) {
		if (elem.addEventListener) {
			elem.addEventListener(type,hander,false);
		} else if(elem.attachEvent) {
			elem.attachEvent('on' + type,hander,false);
		} else {
			elem[on + type] = hander;
		}
	},
	removeHander: function(elem,type,hander) {
		if(elem.removeEventListener) {
			elem.removeEventListener(type,hander,false);
		} else if(elem.detachEvent) {
			elem.detachEvent('on' + type,hander,false);
		} else {
			elem[on + type] = null;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target ? event.target : event.srcElement;
	},
	preventDefault: function(event) {
		if(event.perventDefault) {
			event.preventDefault();
		} else {
			window.event.returnValue = false;
		}
	},
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	getRelatedTarget: function(event) {
		if(event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.fromElement) {
			return event.fromElement;
		} else if (event.toElement) {
			return event.toElement;
		} else {
			return null;
		}
	},
	getButton: function(event) {
		if(document.implementation.hasFeature('MouseEvents','2.0')) {
			return event.button;
		} else {
			switch(event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
					// break; //没有break
				case 2:
				case 6:
					return 2;
					// break;
				case 4:
				 	return 1;
				 	// break;
			}
		}
	},
	getWheelDelta: function(event) {
		if(event.wheelDelta) {
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
		} else {
			return -event.detail * 40; //firefox中 支持的是‘DOMMouseScroll’时间,滚轮的信息保存在detail属性中 向前滚动的时候是-3(注意跟一般浏览器相反) 向后滚动的时候是-3 
		}
	},
	getCharCode: function(event) {
		event = eventUti.getEvent(event);
		if(typeof event.charCode == 'number') { //其它浏览器中的编码 此处在不支持的浏览器(ie8及以前)中返回的是undefined
			return event.charCode;
		} else {
			return event.keyCode; //ie8及以前是在keycode中存的ASCII编码
		}
	},
	getClipboardText: function(event) {
		var clipboardData = event.clipboardData || window.clipboardData;
		return clipboardData.getData('text');
	},
	setClipboardText: function(event,value) {
		if(event.clipboardData) {
			return event.clipboardData.setData('text/plain',value);
		} else if (window.clipboardData) {
			return window.clipboardData.setData('text',value);
		}
	}
}


function serialize(form) {
	var parts = [],
		field = null,
		optValue = null,
		option = null;
		debugger;
	for(var i = 0;i < form.elements.length;i++) {
		field = form.elements[i];
		switch(field.type) {
			case 'select-one':
			case 'select-multiple':
				if(field.name.length) {
					for(var j = 0;j < field.options.length;j++) {
						option = field.options[j];
						if(option.selected) {
							if(option.hasAttribute) {
								optValue = option.hasAttribute('value') ? option.value : option.text;//其他
							} else {
								optValue = option.attributes['value'].specified ? option.value : option.text;//ie
							}
							parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.text))
						}
					}
				}
				break;
			case undefined: //字段集
			case 'file': 
			case 'button':
			case 'reset':
			case 'submit':
				break;
			case 'radio':
			case 'checkbox':
				if(!field.checked) {
					break;
				}
			default:
				//不包含没有名字的表单字段
				if(field.name.length) {
					parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.text));
				}
		}
	}
	// return parts.join('&');
	console.log(parts.join('&'));
}