
$(function(){
	var $ = $ || jQuery;
	var navFilter = $('#navFilter');//选择框
	var filterBox = navFilter.find('#filterBox');//筛选框
	var slideHandle = navFilter.find("#slideHandle");//上下按钮
	var resetHandel = navFilter.find("#resetHandel");//重置按钮
	var slideEle = slideHandle.prev(); //区域
	console.log('slideEle',slideEle);
	var filterChild = navFilter.find('#filterBox .node-i');//显示框下的li
	var filterArr = [];
	var perType = NAVINDEX; //3
	navFilter.find(".node-sku").each(function(i,n){
		var ul = $(this);
		var ui = ul.data('index')-0;//将字符串转化为数字
		var fl = filterChild.eq( ui );//显示框下的li
		var fm = fl.children("img");//显示框下的li的img
		filterArr.push({
			index: i,
			init: false,
		});
		console.log(filterArr);
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
