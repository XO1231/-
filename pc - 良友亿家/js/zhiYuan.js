
$(function(){
	var $ = $ || jQuery;
	var navFilter = $('#navFilter');
	var filterBox = navFilter.find('#filterBox');
	var slideHandle = navFilter.find("#slideHandle");
	var resetHandel = navFilter.find("#resetHandel");
	var slideEle = slideHandle.prev(); 
	var filterChild = navFilter.find('#filterBox .node-i');
	var filterArr = [];
	var perType = NAVINDEX;
	navFilter.find(".node-sku").each(function(i,n){
		var ul = $(this);
		var ui = ul.data('index')-0;
		var fl = filterChild.eq( ui );
		var fm = fl.children("img");
		filterArr.push({
			index: i,
			init: false,
		});
		// filter handle
		ul.on('click','.node-u',function(e){
			e.stopPropagation();
			var t = $(this);
			if( !t.hasClass("cur") ){
				t.addClass("cur").siblings(".cur").removeClass("cur");
				var fi = filterArr[ ui ];
				if( !fi.init ){
					Object.assign(fi,{
						init: true,
						ele: fl,
						reset: function(){
							fm[0].click()
						}
					});
				}
				fi.ele[ t.index() ? 'show' : 'hide' ]().children(".node-text").text( t.text() );
				
				//ajax
			}
		});
		
		// close handle
		fm.click(function(){
			ul.find(".node-u:first")[0].click();
		});
	});
	// slide handel
	slideHandle.click(function(e){
		e.stopPropagation();
		var t = $(this);
		var mt = $.fn[( t.hasClass("cur") ? 'remove':'add' )+'Class'];
		mt.call( t,'cur' );
		mt.call( slideEle ,'cur');
	});
	// reset handle
	resetHandel.click(function(e){
		e.stopPropagation();
		filterArr.forEach(function(n){
			if( n.init ){
				n.reset();
			}
		});
	});

});
