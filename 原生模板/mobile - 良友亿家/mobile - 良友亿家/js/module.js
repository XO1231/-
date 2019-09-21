const configMixins = {
	data() {
		return {
			userInfo:{
				loginAuto: false,
				userId:'',
				userName:'小爱***'
			},
		}
	},
	components:{
		'public-header': publicHeader,
		'public-btb': publicBtB,
	},
};

Vue.mixin({
	data() {
		return {
			baseSrc: './images/',
		}
	},
	methods:{
		url
	}
});