$(function(){
	// init scroll
	initScroll('.scrollNode');
	// dom event
	var dnB = $('#dnB');
	var switchNode = $('#switchNode');
	var switchWrap = $('#switchWrap');
	dnB.on("click",'.table .table-cell',function(e){
		e.stopPropagation();
		var t  = $(this);
		if( !t.hasClass("cur") ){
			t.addClass("cur").siblings('.cur').removeClass("cur");
		}
	});
	switchNode.on('click',function(e){
		e.stopPropagation();
		switchWrap[ (switchWrap.hasClass('cur') ? 'remove':'add')  +'Class']('cur');
	});
	
});
