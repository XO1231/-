

!function(golbal){
	var sess = sessionStorage;
	var htp = { loginAuto: false };
	if( sess.loginAuto ){ Object.assign( htp, sess ) }
	
	var AppTop = new Vue({
		el: '#publicTop',
		data: {
			headerTop: htp,
			navIndex: golbal.NAVINDEX || 0
		},
		components:{
			'header-top': mainHeaderTop,
			'header-bottom': mainHeaderBottom
		},
		methods: {
			url
		},
	});
	var AppBtm = new Vue({
		el: '#publicBtm',
		data: {
			headerTop:{
				loginAuto: false,
				loginUserInfo:{},
				searchValues: ''
			},
			navIndex: 0
		},
		components:{
			'bottom-top': mainBottomTop,
			'login-bottom': LoginBottom,
			'slide-bar': mainSildeBar
		},
		methods: {
			url
		},
	});
	
	
}(window);
