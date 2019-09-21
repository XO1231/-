		
! function() {
	var App = new Vue({
		el: '#App',
		data: {
			bannerSrc: 'about_banner.png',
		},
		extends: configMixins,
		components: {
			'banner-slot': bannerSolt,
			'public-bta': publicBtA,
		},
	});


}();