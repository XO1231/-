
! function() {
	//var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var yzmInter = null;
	var App = new Vue({
		el: '#App',
		data: {
			
			forgetForm: {
				
				oldPass: '',
				newPass: '',
				newPassAga: ''
			}
		},
		extends: configMixins,
		components:{
		//'public-bta': publicBtA,
	},
		methods: {
			
			forgetSubmit: function() {
				var l = this.forgetForm,
					e = l.oldPass,
					y,
					p,
					pa,
					c;
				if(!e){
					c="请输入旧密码"
				}else if(!(p = l.newPass)) {
					c = '请输入新密码';
				} else if(!( pa = l.newPassAga )) {
					c = '请再次输入新密码';
				} else if(pa != p) {
					c = '两次输入的密码不一致';
				} else {
					// axios
				}
				c && notic( c );
				console.log(c)
			}
		},
		computed: {
			
		}
	});

	function notic(c) {
		layer.open({
			content:c,
			time: 1500
		});
	}

}();