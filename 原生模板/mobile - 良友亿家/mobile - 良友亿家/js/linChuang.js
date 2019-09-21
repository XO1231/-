
new Vue({
	el: '#App',
	data:{
		bannerSrc: 'syv10 (13).png',
	},
	extends:configMixins,
	components:{
		'banner-slot': bannerSolt,
		'public-bta': publicBtA,
	}
});

$(function(){
	$('#syCA').on('touchstart',".node-li .node-h2",function(e){
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

