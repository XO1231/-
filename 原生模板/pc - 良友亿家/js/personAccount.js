!function(Vue,$){
	var App = new Vue({
		el: '#psRight',
		data:{
			navIndex: 0,
			editType: 0,
			navTit: '',
			editEmail: {
				userPass:'',
				newEmail: '',
				emailYzm:''
			},
			editPass:{
			 	originPass:'',
			 	newPass:'',
			 	newPassAga:''
			},
			sendYzm: {
				auto: false,
				once: false,
				content: '获取验证码',
				timer: 10,
				ajaxCode: '1234'
			}
		},
		methods:{
			routerSel: function(p,c){
				Object.assign(this,{
					navIndex: p,
					editType: c,
				})	
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
			editSubmit: function() {
				var v = this;
				var nc = '';
				if( v.editType == 0 ){
					var m = v.editEmail;
					if( !m.userPass ){
						nc = '请输入密码';
					}else if( !m.newEmail ){
						nc = '请输入新邮箱';
					}else if( !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test( m.newEmail ) ){
						nc = '邮箱格式错误';
					}else if( !m.emailYzm ){
						nc = '请输入邮箱验证码';
					}else if( m.emailYzm != sendYzm.ajaxCode ){
						nc = '验证码错误';
					}else{
						//ajax
					}
				}else{
					var p = v.editPass;
					if( !p.originPass ){
						nc = '请输入原密码';
					}else if( !m.newPass ){
						nc = '请输新密码';
					}else if( !p.newPassAga ){
						nc = '请再次输入新密码';
					}else if( m.newPass != p.newPassAga ){
						nc = '两次密码不一致';
					}else{
						//ajax
					}
				}
				nc && layer.msg(nc,{
					time: 1500
				});
			}
		},
		computed:{
			editTit: function(){
				return this.editType ?   '修改密码' : '修改邮箱';
			},
			yzmContent: function() {
				var m = this.sendYzm,
					c = m.content;
				return m.auto ? '剩余' + c + 's' : c;
			}
		}
	});
}(Vue,$);
