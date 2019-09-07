var bannerHash = new hash();
var bannerModule = {
	props: ['src'],
	template: bannerHash.hashHtml(
		`<div  class='relative cr-f'>
					<div class="banBox clear">
						<img :src="src" class="block width" />
					</div>
					<div class="absBox absolute width top left">
						<div class='wrap'>
							<slot></slot>
						</div>
					</div>
				</div>`
	),

};