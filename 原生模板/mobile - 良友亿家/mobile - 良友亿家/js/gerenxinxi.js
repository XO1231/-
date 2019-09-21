		
! function() {
	var reg = /^1[3456789]\d{9}$/;
	var App = new Vue({
		
		el: '#App',
		data: {
			bannerSrc: 'about_banner.png',
			peopleType: 0,
			zhiyuan:{
				height: '',
				weight: '',
				name:'',
				old:'',
				sex:'',
				marr:'',
				smoke:'',
				phone:'',
				qq:''
			},
			huanzhe:{
				
				name:'',
				old:'',
				sex:'',
				marr:'',
				phone:'',
				jbnane:'',
				hospital:''
			}
			
		},
		extends: configMixins,
		components: {
			'banner-slot': bannerSolt
			'public-bta': publicBtA,
		},
		methods:{
			selPeoType: function(i){
				if( this.peopleType != i ){
					this.peopleType = i;
				}
			},
			submit: function(){
				var s = this;
				var name = s.zhiyuan.name;
				var old = s.zhiyuan.old;
				var sex = s.zhiyuan.sex;
				var marr = s.zhiyuan.marr;
				var height = s.zhiyuan.height;
				var weight = s.zhiyuan.wight;
				var smoke = s.zhiyuan.name;
				var data = s.zhiyuan.data;
				var phone = s.zhiyuan.phone;
				var qq = s.zhiyuan.qq;
				var c;
				if(!name){
					c="请输入姓名"
				}else if(!old){
					c="请输入年龄"
				}else if(!sex){
					c="请选择性别"
				}else if(!marr){
					c="请选择婚姻状态"
				}else if(!height){
					c="请输入身高"
				}else if(!weight){
					c="请输入体重"
				}else if(!smoke){
					c="请选择是否吸烟"
				}else if(!data){
					c="请选择最后受试时间"
				}else if(!( phone = l.reg )){
					c="请输入手机号"
				}else if(!qq){
					c="请输入微信/QQ号"
				}else{
					
				}
				c && notic( c );
			},
			submit2:function(){
				
			},
		},
		computed:{
			bmiFun:function(){
				var v = this.zhiyuan;
				var h = +v.height;
				var w = +v.weight;
				var r = {
					auto: false
				};
				if( h && w &&  w > 10 && h > 10){
					var b = ( w / ( h/100 )**2 ).toFixed(1)-0;
					var y;
					if( b <= 18.4 ){
						y = '偏瘦';
					}else if( b >= 18.5 && b <= 23.9  ){
						y = '正常';
					}else if( b >= 24.0 && b <= 27.9 ){
						y = '过重';
					}else{
						y = '肥胖';
					}
					Object.assign(r,{
						bmi: b,
						type: y,
						auto: true
					});
				}
				return r;
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