!function(Vue){
	var slideBar = new Vue({
		el: '#slideModule',
		data:{
			slideIndex: SLIDEINDEX,
		},
		components:{
			'person-slide': personSlide
		}
	});
}(Vue)
