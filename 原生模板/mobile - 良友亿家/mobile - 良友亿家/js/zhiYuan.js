
new Vue({
	el: '#App',
	data:{
		bannerSrc: 'zy (1).png',
	},
	extends:configMixins,
	components:{
		'banner-slot': bannerSolt,
		'public-bta': publicBtA,
	},

});

$(function(){
	var navUl = $('#navUl');
	navUl.on('click','.node-li .stC',function(e){
		e.stopPropagation();
		var li = $(this).parent();
		if( li.hasClass("cur") ){
			li.removeClass("cur");
		}else{
			li.addClass("cur").siblings(".cur").removeClass("cur");
		}
	});
	navUl.on('click','.skuCtn .node-sku',function(e){
		e.stopPropagation();
		var t = $(this);
		if( !t.hasClass("cur") ){
			t.addClass("cur").siblings('.cur').removeClass("cur");
			//ajax
		}
	});
});
