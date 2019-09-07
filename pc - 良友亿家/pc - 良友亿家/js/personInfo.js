!function(Vue,$){
	var App = new Vue({
		el: '#psRight',
		data:{
			
			peopleType: 0,
			name: '',
			age: '',
			sex: '',
			marr:'',
			height: '',
			weight: '',
			smoke:'',
			endDate: '',
			phone: '',
			wxqq:'',
			
			hzPhone:'',
			hzDisName:'',
			hzHispital:'',
			hzEcog:'',
			
			city:{
				prov: '',
				city: '',
			}
		},
		components:{
			'person-slide': personSlide
		},
		mounted:function(){
			var t = this;
			t.$nextTick(function() {
				// cityselect init
				$('#citySle').citySelect({
					cityKey: t.city
				});
				//dateinput init
				laydate.render({
					elem: '#finishDate',
					done: function(value) {
						t.endDate = value;
					}
				});

			});
		},
		methods:{
			selPeoType: function(i){
				if( this.peopleType != i ){
					this.peopleType = i;
				}
			},
			submit: function(){
				
			}
		},
		computed:{
			bmiFun:function(){
				var v = this;
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
	
}(Vue,$);
