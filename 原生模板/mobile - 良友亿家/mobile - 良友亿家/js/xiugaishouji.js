
! function() {
	var Reg = /^1[3456789]\d{9}$/;
	var yzmInter = null;
	var App = new Vue({
		el: '#App',
		data: {
			
			forgetForm: {
				
				newPass: '',
				userEmail: '',
				emailYzm: ''
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
		components:{
		//'public-bta': publicBtA,
	},
		methods: {
			
			forgetSubmit: function() {
				var l = this.forgetForm,
					e,
					y,
					p,
					pa,
					c;
				if(!(p = l.newPass)) {
					c = '请输入用户密码';
				}else if(!(e = l.userEmail)) {
					c = '请输入新手机号';
				} else if(!Reg.test( e )) {
					c = '手机格式错误';
				} else if(!( y = l.emailYzm )) {
					c = '请输入手机验证码';
				}else if( y != this.sendYzm.ajaxCode ) {
					c = '验证码不正确';
				} else {
					// axios
				}
				c && notic( c );
				console.log(c)
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