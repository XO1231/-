
$(function(){
	var syCA = $('#syCA');
	syCA.on('click',".node-li .node-h2",function(e){
		e.stopPropagation();
		var t = $(this),
			p = t.parent(),
			c = t.next();  
		if( p.hasClass("cur") ){
			p.removeClass('cur'),c.slideUp();
		}else{
			p.addClass('cur'),c.slideDown();
		}
	});
});
