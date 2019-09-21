const banHash = new hash();
const bannerSolt= {
	props:['bansrc'],
	template:
	banHash.hashHtml(
		`<div class="bannerSolt relative">
			<img :src="bansrc" class="block width" />
			<div class="slotwrap absolute top left width height">
				<slot></slot>
			</div>
		</div>`
	)	
};
