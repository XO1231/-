var personSlideHash = new hash();
var personSlide = {
	props: ['slideIndex'],
	data: function () {
	    return {
	      slideArr: [
	      	{
	      		text: '个人信息',
	      		url: 'personInfo'
	      	},
	      	{
	      		text: '报名项目',
	      		url: 'personProject'
	      	},
	      	{
	      		text: '帐号信息',
	      		url: 'personAccount'
	      	},
	      ]
	    }
	 },
	template: personSlideHash.hashHtml(
		`<div class="personSlide border-box text-center br-f" >
					<h2 class="node-h2 ft20 cr-m2 weight">个人主页</h2>
					<img class="block width" src="images/icon-navban.png" />
					<ul class="node-ul mt20 ft16 cr-999 point">
						<li class="node-li" 
							v-for='(va,ia) in slideArr' 
							:class="{ cur: slideIndex == ia  }" 
							@click="url( va.url )"
						>{{ va.text }}</li>
					</ul>
				</div>`),
	methods:{
		url
	}
};

personSlideHash.insertCss(
`
.personSlide{
	width:240px;
	min-height:400px;
	padding: 0 20px;
}
.personSlide .node-h2{
	padding: 17px 0;
}
.personSlide .node-li{
	width:200px;
	height:50px;
	line-height: 50px;
}
.personSlide .node-li.cur{
	background:rgba(138,189,68,1);
	color: #fff;
}
`);