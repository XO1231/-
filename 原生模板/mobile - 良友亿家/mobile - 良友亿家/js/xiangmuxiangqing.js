! function() {

	var App = new Vue({
		el: '#App',
		data: {

			navIndex: 0,

		},
		extends: configMixins,
		components:{
		'public-bta': publicBtA,
	},
		methods: {
			switchTab: function(index) {
				if(this.navIndex != index) {
					this.navIndex = index;
				}
			},

		},

	});

}();