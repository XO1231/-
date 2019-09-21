var navArrData = [{
					text: '首页',
					url: 'index',
				},{
					text: '关于临床试验',
					url: 'linChuang',
				},{
					text: '健康志愿者',
					url: 'zhiYuan',
				},{
					text: '患者',
					url: 'huanZhe',
				},{
					text: '我要报名',
					url: 'baoMing',
				},{
					text: '发布临床项目',
					url: 'faBuXiangMu',
				},{
					text: '关于我们',
					url: 'about',
				}];
var mainHash = new hash();
var mainHeaderTop = {
	props: ['headerTop'],
	data: function () {
	    return {
	      loginSilde: false
	    }
	 },
	template: mainHash.hashHtml(
		`<div class="br-m1 mainHeaderTop">
			<div class="wrap clear cr-f">
				<div class="leftWrap fl flex-box ">欢迎访问中国临床志愿者招募服务平台</div>
				<div class="rightWrap fr flex-box">
					<label class="searchWrap ">
						<img class='icon' src="images/icon-search.png" />
						<input class='' type="text" placeholder="输入关键词" 
							:value="headerTop.searchValues" 
							@input="$emit('input',$event.target.value)"
  						/>
					</label>
					<div class="loginHandle point" v-if=" !headerTop.loginAuto ">
						<span class="hanleNode" @click='$emit("url","login.html?type=0")'>登录</span>
						<span class="hanleIcon">|</span>
						<span class="hanleNode" @click='$emit("url","login.html?type=1")'>注册</span>
					</div>
					<div class="loginPerson point relative height " v-if=" headerTop.loginAuto">
						<div class="perInfo flex flex-middle height">
							<span class="name mr10 text-cut">{{ headerTop.userName }}</span>
							<img src="images/icon-sel-03.png" @click="showSilde" />
						</div>
						<div class="slideNav absolute cr-666 border-box text-center br-f" v-show='loginSilde'>
							<p class="node-nav mb20" @click='$emit("url",{
								url:"personInfo",
								options: headerTop
							})'>个人主页</p>
							<p class="node-nav" @click='$emit("url","login.html?type=exit")'>退出登录</p>
						</div>
					</div>
				</div>
			</div>
		</div>`
		),
	methods:{
		showSilde: function(){
			this.loginSilde = !this.loginSilde;
		}
	}
};
var mainHeaderBottom = {
	props: ['navIndex'],
	data: function(){
		return {
			navArr: navArrData
		}
	},
	template:mainHash.hashHtml(
		`<div class='mainHeaderBottom clear'>
			<div class='wrap'>
				<div class="flex-box logo fl">
					<img src="images/logo.png" />
				</div>
				<div class="flex-box navBar fl">
					<ul class="node-ul clear " >
						<li class='node-li fl point'
							v-for='(va , ka) in navArr'
							:class="{ cur: ka == navIndex }" 
							@click='$emit("url",va.url)'
						>{{ va.text }}</li>
					</ul>
				</div>
				<div class="flex-box fr phone">400-0000-0000</div>
			</div>
		</div>`),
};

var mainBottomTop = {
	data: function(){
		return {
			navArr: navArrData
		}
	},
	template:mainHash.hashHtml(
		`<div class='mainBottomTop' >
			<div class="wrapC clear">
				<div class="logo flex-box fl">
					<img src="images/logo-max.png" />
				</div>
				<div class="rightSlide fl">
					<div class="sildeTop">
						<ul class="node-ul clear">
							<li class="node-li point fl"
								v-for='(va , ka) in navArr'
								:key='"mb7895"+ka'
								@click='$emit("url",va.url)'
							>{{ va.text }}</li>
						</ul>
					</div>
					<div class="sildeBtm clear cr-666">
						<div class="node-c c-a fl">
							<div class="node-g g-a">地址：江苏省苏州市高新区滨河路300号1301室 </div>
							<div class="node-g g-b">邮箱：lyyjyy@163.com </div>
						</div>
						<div class="node-c c-b fr">
							<div class="node-g g-a">网址：www.xxxx.com</div>
							<div class="node-g g-b">电话：400-0000-0000</div>
						</div>
					</div>
				</div>
			</div>
		</div>`),
};

var mainSildeBar = {
	template:mainHash.hashHtml(
		`<div class='mainSildeBar' >
			<ul class="node-ul cr-f text-center point">
				<li class="node-li">
					<img src="images/slidebar-00.png" />
					<p class="ft12 ">电话咨询</p>
				</li>
				<li class="node-li">
					<img src="images/slidebar-01.png" />
					<p class="ft12 ">在线咨询</p>
				</li>
				<li class="node-li">
					<img src="images/slidebar-02.png" />
					<p class="ft12 ">我要报名</p>
				</li>
				<li class="node-li">
					<img src="images/slidebar-03.png" />
					<p class="ft12 ">扫码关注</p>
				</li>
			</ul>
		</div>`)
};


mainHash.insertCss(
`.mainHeaderTop .flex-box {
	display: flex;
	align-items: center;
	height:50px;
}
.mainHeaderTop .rightWrap {
	justify-content: space-between;
	min-width: 500px;
}
.mainHeaderTop .rightWrap .searchWrap{
	box-sizing: border-box;
	display: flex;
	align-items: center;
	width:300px;
	height:36px;
	padding: 0 6px;
	background:rgba(255,255,255,0.3);
	border-radius:5px;
	border:1px solid rgba(255,255,255,0.5);
}
.mainHeaderTop .rightWrap .searchWrap .icon{
	width: 16px;
}
.mainHeaderTop .rightWrap .searchWrap input{
	padding-left: 6px;
}
.mainHeaderTop .rightWrap .searchWrap input::-webkit-input-placeholder{
	color: #fff;
}
.mainHeaderTop .rightWrap .loginHandle .hanleIcon{
	margin: 0 15px;
}
.mainHeaderTop .rightWrap .loginPerson .perInfo .name{
	max-width: 50px;
}
.mainHeaderTop .rightWrap .loginPerson .slideNav{
	top: 100%;
	left: -28px;
	z-index: 350;
	width:100px;
	padding: 20px 0;
	border-radius: 5px;
	box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
}
.mainHeaderTop .rightWrap .loginPerson .slideNav::before{
	display: block;
	content: "";
	width: 0;
	height: 0;
	border: 7px solid transparent;
	border-bottom-color: #FFFFFF;
	position: absolute;
	top: -14px;
	left: 50%;
	margin-left: -3.5px;
}
.mainHeaderBottom{
	background:#fff;
}
.mainHeaderBottom .flex-box{
	display: flex;
	align-items: center;
	height:80px;
}
.mainHeaderBottom .logo{
	width: 68px;
}
.mainHeaderBottom .navBar{
	margin-left: 50px;
}
.mainHeaderBottom .navBar .node-li{
	line-height: 40px;
}
.mainHeaderBottom .navBar .node-li:nth-of-type(n+2){
	margin-left: 40px;
}
.mainHeaderBottom .navBar .node-li.cur{
	color:rgba(0,103,58,1);
	position: relative;
}
.mainHeaderBottom .navBar .node-li.cur::after{
	display: block;
	content: "";
	width: 20px;
	height:2px;
	background:rgba(0,103,58,1);
	border-radius:1px;
	position: absolute;
	left: 50%;
	bottom: 0;
	margin-left: -10px;
}
.mainHeaderBottom .phone{
	font-size:20px;
	font-family:MicrosoftYaHei;
	color:rgba(51,51,51,1);
}
.mainBottomTop{
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	
}
.mainBottomTop .logo{
	display: flex;
	align-items: center;
	height: 160px;
	margin-right: 30px;
}
.mainBottomTop .logo img{
	width: 100px;
}
.mainBottomTop .rightSlide{
	margin-top: 11px;
}

.mainBottomTop .rightSlide .sildeTop{
	border-bottom: 1px solid rgba(238,238,238,1);
}
.mainBottomTop .rightSlide .sildeTop,
.mainBottomTop .rightSlide .sildeBtm{
	padding: 0 20px;
}

.mainBottomTop .rightSlide .sildeTop li{
	height: 66px;
	line-height: 66px;
}
.mainBottomTop .rightSlide .sildeTop li:nth-of-type(n+2){
	margin-left: 40px;
}
.mainBottomTop .rightSlide .sildeBtm{
	margin-top: 7px;
}
.mainBottomTop .rightSlide .sildeBtm .node-c .node-g:first-of-type{
	margin-bottom: 10px;
}
.mainSildeBar{
	width: 70px;
	height: auto;
	background:rgba(0,103,58,1);
	position: fixed;
	right: 40px;
	top: 520px;
	z-index: 999;
}
.mainSildeBar .node-li{
	padding: 10px 0;
}
.mainSildeBar .node-li img{
	width: 24px;
	margin-bottom: 8px;
}
`);