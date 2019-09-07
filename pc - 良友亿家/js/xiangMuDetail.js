
! function(Vue, $) {
	var bannerApp = new Vue({
		el: '#banModule',
		data: {
			navTitle: NAVTITLE_PRO,
			bannerSrc: 'images/syv10 (21).png',

		},
		components: {
			'nav-title': navModule,
			'banner-top': bannerModule
		},
		methods: {
			
		}
	});
	$(function() {
		var xmCbL = $('#xmCbL');
		if( xmCbL.length ){
			var xmCbLC = xmCbL.children('.ctnBox');
			xmCbL.children('.navBox ').on('click','.node-li',function(e){
				e.stopPropagation();
				var t = $(this);
				if(!t.hasClass('cur')) {
					var ni = $(this).index();
					t.addClass('cur').siblings().removeClass('cur');
					xmCbLC.children('.node-c').eq(ni).show().siblings().hide();
				}
			});	
		}
	
	});
	NAVTITLE_PRO = null;

}(Vue, jQuery);
