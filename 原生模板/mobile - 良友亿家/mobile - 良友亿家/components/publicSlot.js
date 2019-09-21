const btBHash = new hash();
const publicBtA = {
	data:function(){
		return {
			address: '江苏省苏州市高新区滨河路300号1301室',
			email:'lyyjyy@163.com',
			phone:'400-0000-0000'
		}
	},
	template: 
	btBHash.hashHtml(
		`<div class="publicBta">
			<div class="wrap30 cr-fff">
				<div class="ca flex flex-between ft28 mb30">
					<button type="button" class="btn flex flex-middle flex-center border-box" @click="url('baoMing')">
						<img :src="baseSrc+'public (6).png'" />
						<span>我要报名</span>
					</button>
					<a href="tel:400-0000-688" class="btn flex flex-middle flex-center border-box" >
						<img :src="baseSrc+'public (7).png'" />
						<span>电话咨询</span>
					</a>
				</div>
				<div class="cb clear">
					<img :src="baseSrc+'public (8).png'" class="qr block fl" />
					<div class="node-p height flex flex-middle fr">
						<p class="ft22">地址：{{ address }}
							邮箱：{{ email }}
							电话：{{ phone }}
						</p>
					</div>
				</div>
			</div>
		</div>`
	)	
};
btBHash.insertCss(
`
.publicBta{
	padding: 0.3rem 0;
	background-color:rgba(60,67,64,1);
}
.publicBta .ca{
	margin-bottom:0.3rem;
}
.publicBta .ca .btn{
	width:3.34rem;
	height:0.8rem;
	border-radius:0.04rem;
	border:2px solid rgba(0,103,58,1);
}
.publicBta .ca .btn img{
	width: 0.4rem;
	margin-right: .08rem;
}
.publicBta .cb{
	height: 1.6rem;
}
.publicBta .cb .qr{
	width: 1.6rem;
}
.publicBta .cb .node-p{
	width: calc(100% - 1.6rem - .2rem);
	white-space: pre-line;
	line-height:0.44rem;
}
`);