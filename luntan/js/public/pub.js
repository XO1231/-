
function url(init,opt){
	if( init ){
		var arr ;
		var copy = Object.assign;
		var ass =  'string' == typeof init ? (arr = init.split("?"), {
				url: arr[0],
				options: arr[1]
			}) : init;
		if( opt && !ass.options ){
			ass.options = opt ;
		}
		var op = copy({
			url: '',
			options: '',
			replace: false,
			html: true
		},ass);
		var opUrl = op.url.trim();
		if( opUrl ){
			var trimUrl = opUrl += op.html ? (opUrl.search('.html') == -1 ? '.html' : '') : '';
			var urlOptions = op.options;
			var trimOpions = '';
			
			if( urlOptions ){
				var opType = Object.prototype.toString.call(urlOptions);
				
				if(!/^\[object\s(String|Object)\]$/.test(opType)) {
					throw new TypeError('the options argument must be String or Object');
				} else {
					var opStr = '';
					if( opType == '[object String]' ){
						opStr = urlOptions.replace(/\s+/gm,'');
					}else{
						var opKeys = Object.keys( urlOptions );
						var opkeysLen = opKeys.length - 1;
						opKeys.forEach(function(n,i){
							var filte;
							if( i == opkeysLen ){
								filte = '';
							}else{
								filte = '&';
							}
							opStr += (n +'='+ (urlOptions[n] || '') + filte);
						});
						
					}
					if( opStr ){  trimOpions += ('?'+ opStr) }
				}
			}
			location[op.replace ? 'replace' : 'assign'](trimUrl + trimOpions);
		}else{
			throw new ReferenceError('the url is undefined');
		}
	}else{
		location.reload();
	}
	if( event ){
		event.stopPropagation(), event.preventDefault();
	}
}

function back(leve){
	var leveDefault = -1; 
	if( leve ){
		if( 'number' == typeof leve && !isNaN( leve ) ){ 
			leveDefault = leve;
		}else{
			throw new TypeError('the params must be Number');
		}
	}
	history.go( leveDefault );
	if( event ){
		event.stopPropagation(), event.preventDefault();
	}
}


function options(init){
	var href;
	var search;
	var key;
	if( init ){
		var initType = Object.prototype.toString.call(init);
		if(!/^\[object\s(String|Object)\]$/.test(initType)){
			throw new TypeError('the options argument must be String or Object');
		}else{
			if( initType == '[object String]' ){
				href = location.href;
				key = init;
			}else{
				href = init.url;
				key = init.key;
			}
		}
	}else{
		href = location.href;
	}
	search = href.split('?')[1];
	
	if( search ){
		var result = {};
		search.split('&').forEach(function(n){
			if( n ){
				var ent = n.split('=');
				result[ent[0]] = ent[1];
			}
		});
		return key ?  result[key] : result;
	}else{
		console.warn('the url search in not definded or null');
		return null;
	}
}
function setCookie(key, val, exp) {
	if(key && typeof key == 'string' && (exp ? !isNaN(exp) : true)) {
		var da = null;
		document.cookie = key + '=' + val + ';' + (exp ? 'expires=' + (
			da = new Date(), da.setTime(+exp * 24 * 3600 * 1000 + da.getTime()), da.toUTCString()
		) : '');
		return true;
	} else {
		throw new Error('the arguments has ReferenceError or TypeError');
	}
}

function getCookie(key, bo) {
	if(key && typeof key == 'string') {
		var ck = document.cookie,
			val,
			cp;
		if(ck && key) {
			var sp;
			if(val = ck.match(new RegExp('\\b\\s?' + key + '=?[^;]*;?'))) {
				sp = (cp = val[0].split('=')[1]) ? cp.replace(";", '') : cp;
			}
			return bo ? unescape(sp) : sp;
		}

	} else {
		throw new Error('the arguments has ReferenceError or TypeError');
	}
}

function removeCookie(key) {
	if(key && typeof key == 'string') {
		if(document.cookie.search(new RegExp('\\b\\s?' + key + '=?[^;]*;?')) == -1) {
			return 'the key is null'
		};
		setCookie(key, '', -1);
	} else {
		throw new Error('the arguments has ReferenceError or TypeError');
	}
}

function clearCookie() {
	var ck = document.cookie,
		tm = 0;
	if(ck) {
		ck.split(";").forEach(function(n) {
			setTimeout(function() {
				setCookie(n.split('=')[0], '', -1)
			}, tm++)
		})
	}
}

function hash() {
	this.hashCode = (Math.random() + '').slice(2, 8);
}

hash.prototype.hashHtml = function(str) {
	var hashTem = ` data-m-${ this.hashCode } `;
	var template = str.replace(/<\w+\s*/gm, function(match) {
		return match + hashTem;
	});
	return template
}
hash.prototype.hashCss = function(str) {
	var hashCss = `[data-m-${ this.hashCode }]`;
	var cssTemplate = str.replace(/(:[^{]+[;}])|(\s*[{,])|(:{1,2}[^{]+\s*[{,])/gm, function(match,p1,p2,p3) {
		if( p1 ){
			return p1;
		}
		if( p2 ){
			return hashCss + p2;
		}
		if( p3 ){
			return hashCss + match;
		}
	});
	return cssTemplate;
}
hash.prototype.insertCss = function(str) {
	var e = document;
	var s = e.createElement('style');
	var t = e.createTextNode(this.hashCss(str));
	var h = e.head;
	s.appendChild(t).type = 'text/css';
	h.appendChild(s);
}

function initScroll(sel, ass , axl) {
	if('function' == typeof IScroll) {
		var scrollEle = 'object' == typeof sel ? sel : document.querySelectorAll(sel);
		if( scrollEle || scrollEle.length ) {
			var defaultOp = {
					scrollX: !axl,
					scrollY: axl,
					disablePointer: false,
					click: true,
					tap: true
			};
			var assOp = ass ? Object.assign(defaultOp, ass) : defaultOp;
			var scrollClass = null; 
			if( scrollEle.length ){
				scrollClass = Array.prototype.map.call(scrollEle,function(n){
						return new IScroll(n, assOp);
				});
			}else{
				scrollClass = new IScroll(scrollEle, assOp);
			}
			return scrollClass;
		} else {
			return null;
		}
	} else {
		throw new ReferenceError('the IScroll is undefined');
	}
}

function initSwiper(sel, ass, axl) {
	if('function' == typeof Swiper) {
		var swiperEle = 'object' == typeof sel ? sel : document.querySelectorAll(sel);
		if( swiperEle || swiperEle.length ) {
			var assOp = ass ? Object.assign({ direction : axl ? 'vertical' : 'horizontal' }, ass) : defaultOp;
			var swiperClass = null; 
			if( swiperEle.length ){
				swiperClass = Array.prototype.map.call(swiperEle,function(n){
					return new Swiper(n, assOp);
				});
			}else{
				swiperClass = new Swiper(swiperEle, assOp);
			}
			return swiperClass;
		} else {
			return null;
		}
	} else {
		throw new ReferenceError('the Swiper is undefined');
	}
}

try {
	if((jQuery && jQuery == $ && 'function' == typeof jQuery)) {
		$(function() {
			var body = $('body');
			body.on('click', '[data-url]', function(e) {
				e.stopPropagation(), e.preventDefault();
				url($(this).data());
			});
			body.on("click", '[data-back]', function(e) {
				e.stopPropagation(), e.preventDefault();
				back();
			});
		});
	}
} catch(error) {
	console.warn(error);
}

