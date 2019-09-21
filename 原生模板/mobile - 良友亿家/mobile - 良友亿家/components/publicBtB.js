const btHash = new hash();
const publicBtB= {
	template:
	btHash.hashHtml(
		`<p class="publicBtb flex flex-center flex-middle br-m1 cr-fff ft24">Copyright 2019 江苏良友亿家</p>`
	)	
};

btHash.insertCss(
`
.publicBtb{
	height: 0.8rem;
}
`);
