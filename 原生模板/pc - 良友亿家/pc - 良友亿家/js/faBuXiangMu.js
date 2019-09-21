
! function(Vue, $) {
	var formApp = new Vue({
		el: '#mainBody',
		data: {
			navTitle: {
				color: '#333',
				text: '发布临床项目',
				url: 'faBuXiangMu.html'
			},
			proName: '',
			company: '',
			perType: '',
			perZy: '',
			perZy_child: '',
			medType: '',
			medName: '',
			medStage: '',
			sex: '',
			marrAuto: '',
			recNum: '',
			bcMoney: '',
			proDes: '',
			selBz: '',
			excBz: '',
			proDate: '',
			proStartDate: '',
			proEndDate: '',
			signEndDate: '',
			phoneName: '',
			phone: '',
			telephone: '',

			projectName: [{
				id: 'pro4510',
				name: '',
				prov: '',
				city: '',

			}],

		},
		components: {
			'nav-title': navModule
		},
		mounted: function() {
			var t = this;
			t.$nextTick(function() {
				// cityselect init
				var po = t.projectName[0];
				citySel(po.id,po);
				//dateinput init
				laydate.render({
					elem: '#rangeDate',
					range: true,
					done: function(value) {
						var vs = value.split(' - ');
						t.proDate = value;
						t.proStartDate = vs[0];
						t.proEndDate = vs[1];
					}
				});
				laydate.render({
					elem: '#finishDate',
					done: function(value) {
						t.signEndDate = value;
					}
				});

			});
		},
		methods: {
			addPro: function() {

				var id = 'pro' + (Math.floor(Math.random() * 10000));
				var o = {
					id: id,
					name: '',
					prov: '',
					city: ''
				};
				this.projectName.push( o );
				Vue.nextTick(function() {
					citySel(id, o );
				});
			},
			submit: function(){
				
			}
		}
	});
	function citySel(id,key) {
		$('#' + id).citySelect({
			cityTitle: '所在地区',
			cityKey: key
		});
	}
}(Vue, $);