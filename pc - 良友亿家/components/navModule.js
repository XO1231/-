var navModuleHash = new hash();
var navModule = {
	props:['navTitle'], 
	template: navModuleHash.hashHtml(
			`<h1 class="ft14 navModule"  :style="{color:navTitle.color}" >
				<span @click="$emit('url','index')" class="point">首页</span>><span @click="$emit('url',navTitle.url)" class="point">{{ navTitle.text }}</span>>
			  </h1>`),
};
navModuleHash.insertCss(
`
.navModule{
	padding: 20px 0;
}
.navModule span{
	cursor: pointer;
}`
);