
! function() {
	var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var yzmInter = null;
	var App = new Vue({
		el: '#App',
		data: {
			wrapState: 0,
			navIndex: 0,
			loginForm: {
				userName: '',
				userPass: ''
			},
			registerForm: {
				userName: '',
				userEmail: '',
				userPass: '',
				userPassAga: ''
			},
			forgetForm: {
				userEmail: '',
				emailYzm: '',
				userPass: '',
				userPassAga: ''
			},
			sendYzm: {
				auto: false,
				once: false,
				content: '获取验证码',
				timer: 10,
				ajaxCode: '1234'
			}
		},
		extends: configMixins,
		components: {
//			'login-header': LoginHeader,
//			'back-index': BackIndex,
//			'login-bottom': LoginBottom,
		},
		methods: {
			switchTab: function(index) {
				if(this.navIndex != index) {
					this.navIndex = index;
				}
			},
			switchState: function() {
				this.wrapState = 1;
			},
			loginSubmit: function() {
				var l = this.loginForm,
					n = l.userName,
					p,
					c;
				if(!n) {
					c = '请输入用户名';
				} else if(!(p = l.userPass)) {
					c = '请输入密码';
				} else {
					// axios
				}
				c && notic(c);
				console.log(c)
			},
			registerSubmit: function() {
				var l = this.registerForm,
					n = l.userName,
					e,
					p,
					pa,
					c;
				if(!n) {
					c = '请输入用户名';
				} else if(!(e = l.userEmail)) {
					c = '请输入邮箱';
				} else if(!emailReg.test(e)) {
					c = '邮箱格式错误';
				} else if(!(p = l.userPass)) {
					c = '请输入用户密码';
				} else if(!(pa = l.userPassAga)) {
					c = '请再次输入用户密码';
				} else if(pa != p) {
					c = '两次输入的密码不一致';
				} else {
					// axios
				}
				c && notic(c);
			},
			sendYzmFun: function() {
				var m = this.sendYzm;
				var cy = Object.assign;
				if(!m.auto) {
					//axios then
					m.once || ( m.once = true );
					cy(m,{
						auto: true,
						content: m.timer,
					//	ajaxCode: json.yzmCode  
					});
					//  
					yzmInter = setInterval(function() {
						m.content--;
						if(m.content == -1) {
							cy(m,{
								auto: false,
								content: '获取验证码'
							});
							clearInterval(yzmInter);
						}
					}, 1000);
				}

			},
			forgetSubmit: function() {
				var l = this.forgetForm,
					e = l.userEmail,
					y,
					p,
					pa,
					c;
				if(!(e = l.userEmail)) {
					c = '请输入邮箱';
				} else if(!emailReg.test( e )) {
					c = '邮箱格式错误';
				} else if(!( y = l.emailYzm )) {
					c = '请输入邮箱验证码';
				} else if(!(p = l.userPass)) {
					c = '请输入用户密码';
				} else if(!( pa = l.userPassAga )) {
					c = '请再次输入用户密码';
				} else if(pa != p) {
					c = '两次输入的密码不一致';
				}else if( y != this.sendYzm.ajaxCode ) {
					c = '验证码不正确';
				} else {
					// axios
				}
				c && notic( c );
				console.log(c)
			}
		},
		computed: {
			yzmContent: function() {
				var m = this.sendYzm,
					c = m.content;
				return m.auto ? '剩余' + c + 's' : c;
			}
		}
	});

	function notic(c) {
		layer.open({
			content:c,
			time: 1500
		});
	}

}();