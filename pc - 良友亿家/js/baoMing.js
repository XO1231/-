
!function(){
	var fromApp = new Vue({
		el: '#bmRight',
		data:{
			peopleType: 0,
			name: '',
			age: '',
			sex: '',
			marr: '',
			phone: '',
			illness: '',
			cityKey:{
				prov:'',
				city: ''
			},
			project: '',
			info: ''
			
		},
		mounted: function () {
			var v = this;
			  v.$nextTick(function () {
			    $('#citySle').citySelect({
			    	cityKey: v.cityKey
			    });
			  })
		},
		methods:{
			selPeoType: function(i){
				if( this.peopleType != i ){
					this.peopleType = i;
				}
			},
			submit: function(k){
				var t = this;
				var c;
				var a;
				if( !t.name ){
					c = '请您填写受试者姓名';
				}else if( !t.age ){
					c = '请您填写年龄';
				}else if( !t.sex ){
					c = '请您选择性别';
				}else if( !t.marr ){
					c = '请您选择婚姻';
				}else if( !( a = t.phone ) ){
					c = '请您填写手机号';
				}else if( !a.test(/^1[34578]\d{9}$/) ){
					c = '号码格式不正确';
				}else{
					//ajax 
				}
				c && layer.msg(c,{time: 1500});
			}
		}
	});
	
}();



