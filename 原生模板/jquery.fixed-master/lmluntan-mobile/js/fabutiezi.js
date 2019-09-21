$(function(){
	var $ = $ || jQuery;
	var fileNodeImg = $('#fileNodeImg,#fileNodeImgB');
	var fileNodeVideo = $('#fileNodeVideo');
	var fileUrl = $('#fileUrl');
	var filePacket = $('#filePacket');
	var fileImgHanA = $('#fileImgHanA');
	var fileImgCount = 0;
	var fileVideoCOunt = 0;
	var fileUrlAuto = false;
	var fileParketAuto = false;
	var fileImgView = function (params) {
		return `<li class="node-li li-img">
					<img src="${ params }" />
					<div class="removeFileNode">
						<img src="images/tiz (1).png"/>
					</div>
				</li>`
	};
	var fileVideoView = function (params) {
		return `<li class="node-li">
					<div class="vLeft flex-node">
						<img src="images/tiz (6).png" />
					</div>
					<div class="vRight flex-node">
						<div class="flex-box">
							<p class="node-p p-a fs28">上传视频成功</p>
							<p class="node-p p-b cr-9">暂不支持预览</p>
						</div>
					</div>
					<div class="removeFileNode">
						<img src="images/tiz (1).png"/>
					</div>
				</li>`
	};
	var filePacketView = function(params){
		return `<span>${ params.type }：<span class="cr-m2">¥${ params.average  }/${ params.count }个</span></span>`;
	};
	var msg = function(txt){
		layer.open({
			skin:'msg',
			content: txt,
			time: 1.5
		});
	};
	// 图片上传
	var imgFileInsert = $('#imgFileInsert');
	fileNodeImg.on('change',function  () {
		var t = this;
		var files = t.files;
		if( files || files.length ){
			Object.values( files ).forEach(function(n){
				var ready = new FileReader();
				ready.readAsDataURL( n );
				ready.onloadend = function(res){
					var imgEle = $(fileImgView( res.target.result ));
					fileImgHanA.before( imgEle );
					if( fileImgCount == 0 ){
						imgFileInsert.addClass('has');
					}
					fileImgCount ++;
					// ajax
				}
			});
		}
	});
	// 删除图片
	imgFileInsert.on('click','.removeFileNode',function(e){
		e.stopPropagation();
		$(this).parent().remove();
		fileImgCount --;
		if( fileImgCount == 0 ){
			imgFileInsert.removeClass('has');
		}
	});
	// 上传视频
	var videoFileInsert = $('#videoFileInsert');
	fileNodeVideo.on('change',function(){
		var t = this;
		var fileNode = t.files[0];
		if( fileNode || fileNode.length ){
			var form = new FormData();
			form.append( fileNode.name,fileNode );
			//ajax suc
			var videoView = $( fileVideoView() );
			if( fileVideoCOunt == 0 ){
				videoFileInsert.addClass('has');
			}
			videoFileInsert.append( videoView );
		}
	});
	// 删除视频
	videoFileInsert.on('click','.removeFileNode',function(e){
		e.stopPropagation();
		$(this).parent().remove();
		fileVideoCOunt --;
		if( fileVideoCOunt == 0 ){
			videoFileInsert.removeClass('has');
		}
	});
	// 上传链接
	var urlLay = $('#urlLay');
	var urlInput = $('#urlInput');
	var tzInA = $('#tzInA');
	var linkArea = $('#linkArea');
	
	fileUrl.on('click',function  (e) {
		e.stopPropagation();
		urlLay.fadeIn();
	});
	urlLay.on('click','.layConfim',function  (e) {
		e.stopPropagation();
		var urlVal = urlInput.val();
		if( urlVal.trim() == '' ){
			msg('请输入网址链接！')
		}else{
			var urlCon;
			try{
				urlCon = new URL( urlVal );
				if( !(fileUrlAuto && fileParketAuto) ){
					tzInA.addClass('has');
				}
				fileUrlAuto = true;
				linkArea.text( urlVal );
				urlLay.fadeOut();
				msg('添加网址链接成功！');
			}catch(error){
				msg('请输入合法的网址链接！');
			}
		}
		
	});
	
	// 上传红包
	var filePacket = $('#filePacket');
	var packetLay = $('#packetLay');
	var packetArea = $('#packetArea');
	var packetMoney = $('#packetMoney');
	var packetCount = $('#packetCount');
	var checkNode = packetLay.find('.checkNode');
	
	
	filePacket.on('click',function  (e) {
		e.stopPropagation();
		packetLay.fadeIn();
	});
	
	checkNode.on('click',function(e){
		e.stopPropagation();
		checkNode.toggleClass('cur');
		
	});
	
	packetLay.on('click','.layConfim',function  (e) {
		e.stopPropagation();
		var packetMoneyVal = packetMoney.val().trim();
		var packetCountVal;
		var average;
		var nic;
		
		if( packetMoneyVal == '' ){
			nic = '请输入红包金额！';
		}else if( isNaN( +packetMoneyVal ) ){
			nic = '请输入合法红包金额！';
		}else if(  +packetMoneyVal < 1 ||  +packetMoneyVal > 1000 ){
			nic = '红包金额超过范围！';
		}else if(  (packetCountVal = packetCount.val().trim()) == '' ){
			nic = '请输入红包数量！';
		}else if( isNaN( +packetCountVal ) || !Number.isInteger( +packetCountVal ) || +packetCountVal == 0 ){
			nic = '请输入合法红包数量！';
		}else if( average = packetMoneyVal / packetCountVal, average < 0.2 || average >100 ){
			nic = '红包金额超范围！';
		}else{
			var packeType = checkNode.hasClass('cur') ? {
				text: '随机红包',
				type: 1
			} : {
				text: '普通红包',
				type: 0
			};
			var packeTypeView = $( filePacketView({
				type: packeType.text,
				count:packetCountVal,
				average
				
			}) );
			packetArea.html( packeTypeView );
			if( !(fileUrlAuto && fileParketAuto) ){
				tzInA.addClass('has');
			}
			fileParketAuto = true;
			packetLay.fadeOut();
			msg('添加红包成功！');
			
		}
		if( nic ){
			msg(nic);
		}
	});
	// 组件弹框 取消事件
	var layNode = $('.layNode');
	var hideLayFun = function(e){
		e.stopPropagation();
		$(this).closest('.layNode').fadeOut();
	};
	layNode.on('click','.layCancel,.layMask',hideLayFun);
	
	// 置顶  选择分类
	var topBar = $('#topBar');
	var srotNavA = $('#srotNavA');
	var moreSort = $('#moreSort');
	var labelMonEle = $('#labelMon');
	var sTopMonEle = $('#sTopMon');
	var allMonEle = $('#allMon');
	
	var topBarAuto = false;
	var topBarMon = topBar.data('money');
//	var labelMon = 0;
	var allMon = 0;
	
	topBar.on('click',function(e){
		e.stopPropagation();
		var top = 0;
		topBarAuto = !topBarAuto;
		if( topBarAuto ){
			topBar.addClass('cur');
			allMon += topBarMon;
			top = topBarMon;
		}else{
			topBar.removeClass('cur');
			allMon -= topBarMon;
		}
		sTopMonEle.text( top );
		allMonEle.text( allMon );
	});
	
	srotNavA.on('click','.li-cell',function  (e) {
		e.stopPropagation();
		var t = $(this);
		if( !t.hasClass('cur') ){
			var curMon = t.data('money') || 0;
			var sibEle = t.siblings('.cur');
			var preMon = sibEle.data('money') || 0;
			allMon += curMon - preMon;
			labelMonEle.text( curMon  );
			allMonEle.text( allMon );
			t.addClass('cur');
			sibEle.removeClass('cur');
		}
	});
	
	moreSort.on('click',function(e){
		e.stopPropagation();
		var txtEle = $(this).children('.icon-text');
		if(  srotNavA.hasClass('cur')){
			srotNavA.removeClass('cur');
			txtEle.text('更多');
		}else{
			srotNavA.addClass('cur');
			txtEle.text('收起');
		}
	});
	
	
});