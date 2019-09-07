

function url(init){
	if( init ){
		var arr ;
		var ass =  'string' == typeof init ? (arr = init.split("?"), {
				url: arr[0],
				options: arr[1]
			}) : init;
		var op = Object.assign({
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
						opStr = opType.replace(/\s+/gm,'');
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
		var result;
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








