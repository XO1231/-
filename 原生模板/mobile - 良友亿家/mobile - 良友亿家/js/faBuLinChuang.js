new Vue({
	el: '#App',
	data:{
		bannerSrc: 'syv10 (13).png',
		projectName: '',
		company:'',
		personType:'',
		zySel: '',
		zySelB:'',
		ywType:'',
		yuName:'',
		zlLeve:'',
		sex:'',
		marrAuto:'',
		zmNum:'',
		bcMoney:'',
		projectDes:'',
		rxBz:'',
		pcBz:''
		
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
			if( !v.projectName ){
				nic = '请填写项目名称';
			}else if( !v.company ){
				nic = '请填写所属公司';
			}else if( !v.personType ){
				nic = '请选择受试者类型';
			}else if( !(v.zySel && v.zySelB) ){
				nic = '请选择适应专业';
			}else if( !v.ywType ){
				nic = '请填写药物适应症';
			}else if( !v.yuName ){
				nic = '请填写药物名称';
			}else if( !v.zlLeve ){
				nic = '请选择治疗阶段';
			}else if( !v.sex ){
				nic = '请选择性别要求';
			}else if( !v.marrAuto ){
				nic = '请选择婚姻状况';
			}else if( !v.zmNum ){
				nic = '请填写招募人数';
			}else if( !v.bcMoney ){
				nic = '请填写补偿金';
			}else if( !v.projectDes ){
				nic = '请填写项目描述';
			}else if( !v.rxBz ){
				nic = '入选标准';
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
