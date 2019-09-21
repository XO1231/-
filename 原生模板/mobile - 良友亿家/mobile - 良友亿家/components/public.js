const publicHash = new hash();
const publicHeader = {
	props:['user'],
	data:function(){
		return {
			navArr:[
				{
					text:'首页',
					url: 'index'
				},
				{
					text:'关于临床试验',
					url: 'linChuang'
				},
				{
					text:'健康志愿者',
					url: 'zhiYuan'
				},
				{
					text:'患者',
					url: 'huanZhe'
				},
				{
					text:'我要报名',
					url: 'baoMing'
				},
				{
					text:'发布临床项目',
					url: 'faBuLinChuang'
				},
				{
					text:'关于我们',
					url: 'aboutUs'
				},
			],
			slideAuto: false,
		}
	},
	methods:{
		switchSlide: function(a){
			this.slideAuto = a;
		}
	},
	template:
	publicHash.hashHtml(
		`<div class="publicHeader">	
			<div class=" br-fff">
				<div class="wrap30 headerTop flex flex-middle flex-between">
					<img class="logo" :src="baseSrc+'public (5).png'" />
					<button type="button" class="handle" @click='switchSlide(true)'>
						<img :src="baseSrc+'public (2).png'" class="block" />
					</button>
				</div>
			</div>
			<div class="headerSlide fixed br-fff" :class="{cur:slideAuto}" >
				<ul class="nav-ul">
					<li class="nav-li text-center ft32 cr-666 border-box" v-for="(va,ia) in navArr" @click="url(va.url)">{{ va.text }}</li>
				</ul>
				<button type="button" class="exitNav flex flex-middle absolute top right" @click='switchSlide(false)'>
					<img :src="baseSrc+'public (1).png'" />
				</button>
				<div class="loginWrap border-box flex flex-between absolute absBox" v-if="!user.loginAuto" v-once>
					<button type="button" class="border-box cr-m1 ft30" @click="url('login?type=0')">登录</button>
					<button type="button" class="border-box cr-m1 ft30" @click="url('login?type=1')">注册</button>
				</div>
				<div class="userWrap flex flex-middle flex-center absolute absBox"  v-if="user.loginAuto" v-once>
					<img :src="baseSrc+'public (3).png'" class='iconUser' />
					<span class="user ft30 cr-m1">{{ user.userName }}</span>
					<img :src="baseSrc+'public (4).png'" class='iconNext' />
				</div>
			</div>
			<transition  name='fade'>
				<div class="slideMask width fixed top left" v-show="slideAuto" @click='switchSlide(false)'></div>
			</transition >
			
		</div>`
		)
	,
};
const publicBtB= {
	template:
	publicHash.hashHtml(
		`<p class="publicBtb flex flex-center flex-middle br-m1 cr-fff ft24">Copyright 2019 江苏良友亿家</p>`
	)	
};

publicHash.insertCss(
`
.publicHeader .headerTop{
	height: .88rem;
}
.publicHeader .headerTop .logo{
	width: 2.85rem;
}
.publicHeader .headerTop .handle img{
	width: .48rem;
}
.publicHeader .headerSlide{
	width: 6.30rem;
	top: 0;
	right: -6.3rem;
	transition: right .3s; 
	z-index: 750;
}
.publicHeader .headerSlide.cur{
	right: 0;
}
.publicHeader .headerSlide,
.publicHeader .slideMask {
	min-height: 100vh;
}
.publicHeader .headerSlide .nav-ul .nav-li,
.publicHeader .exitNav{
	height: 1rem;
}
.publicHeader .headerSlide .nav-ul .nav-li{
	line-height: 1rem;
	border-bottom: 1px solid #EEEEEE;
}
.publicHeader .headerSlide .absBox{
	box-sizing: border-box;
	width: 100%;
	height: .8rem;
	bottom: 0.4rem;
}
.publicHeader .headerSlide .absBox.loginWrap{
	padding: 0 0.3rem;
}
.publicHeader .headerSlide .absBox.loginWrap button{
	box-sizing: border-box;
	width: 2.7rem;
	height: 100%;
	line-height: 1;
	text-align: center;
	border: 2px solid rgba(0,103,58,1);
}
.publicHeader .slideMask{
	background-color: rgba(0,0,0,.35);
	z-index: 550;
}
.publicHeader .exitNav img{
	width: 0.48rem;
	padding-right: 0.3rem;
}
.publicHeader .userWrap .user{
	margin: 0 .07rem;
} 
.publicHeader .userWrap .iconUser{
	width: 0.4rem;
}
.publicHeader .userWrap .iconNext{
	width: 0.32rem;
}
.publicBtb{
	height: 0.8rem;
}

`
);


