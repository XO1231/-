new Vue({
	el: '#App',
	data:{
		bannerSrc: 'syv10 (13).png',
		navType: 0,
		name: '',
		age: '',
		sex:'',
		phone: ''
	},
	extends:configMixins,
	components:{
		'banner-slot': bannerSolt,
		'public-bta': publicBtA,
	},
	methods:{
		selType(e){
			if( this.navType != e){
				this.navType = e;
			}
		},
		submit(){
			var v = this;
			var nic = '';
			if( !v.name ){
				nic = '请填写姓名';
			}else if( !v.age ){
				nic = '请填写年龄';
			}else if( !v.sex ){
				nic = '请选择性别';
			}else if( !v.phone ){
				nic = '请填写手机号码';
			}else if( v.phone.test(/^1[3456789]\d{9}$/) ){
				nic = '手机号码格式错误';
			}else{
				
			}
			if( nic ){
				layer.open({
					skin: 'msg',
					content: nic,
					time: 1.5
				});
			}
		}
	}
});
