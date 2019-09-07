
var loginHash = new hash();
var LoginHeader = {
	template: loginHash.hashHtml(
				`<div class="br-f LoginHeader">
					<div class="wrap">
						<img class="logo" src="images/logo.png" />
					</div>
				</div>`),
};

var BackIndex = {
	template: loginHash.hashHtml(
		`<div class='BackIndex'  @click="$emit('url','index')">
			<div class='flex-box point'>
				<img class="backIcon" src="images/icon-back.png" />
				<span class="backText">返回首页</span>
			</div>
		</div>`
	),
};

var LoginBottom = {
	template: loginHash.hashHtml(
		`<div class='LoginBottom br-m1'>
			<div class="wrap cr-f ">Copyright; 2019 江苏良友亿家 www.xxxx.com  版权所有  京ICP备12345678号-2</div>
		</div>`
	),
};

						
						
loginHash.insertCss( 
`.LoginHeader{
	display: flex;
	align-items: center;
	height: 80px;	
}
.LoginHeader .logo{
	width: 68px;
}
.BackIndex .flex-box {
	display: inline-flex;
	align-items: center;
	height: 40px;
}
.BackIndex .flex-box .backIcon{
	width: 16px;
}
.LoginBottom .wrap{
	font-size: 12px;
	height: 40px;
	line-height: 40px;
	text-align: center;
}
` 
);