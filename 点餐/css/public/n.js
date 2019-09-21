$(function () {
	var $ = $ || jQuery;
	var copy = Object.assign;
	// slide handle
	// 优惠下拉框
	var slideHan = $('#slideHan');
	var noticSlide = $('#noticSlide');
	slideHan.on('click',function  (e) {
		e.stopPropagation();
		slideHan.toggleClass('cur');
		noticSlide.slideToggle(300);
	});
	// scroll init
	// 商家推荐
	var scrollA = $('#scrollA');
	initScroll(scrollA[0]);
	// 餐饮分类导航
	var navScrollEle = $('#navScroll');
	var navScroll =  initScroll(navScrollEle[0]);
	var dnLa = $('#dnLa');
	navScrollEle.on('click','.table-cell',function(){
		var t = $(this);
		if( !t.hasClass('cur') ){
			var ti =  t.index();
			t.addClass('cur').siblings('.cur').removeClass('cur');
			navScroll.scrollToElement('.cur',500,true,false);
			dnLa.children('.node-li').eq( ti ).show().siblings()[ ti ? 'hide':'show' ]();
			
		}
	});
	
	// goods handle
	// 购物车显示隐藏
	var goodsFixed = $('#goodsFixed');
	var closeGoods = $('#closeGoods');
	var maskGoods = $('#maskGoods');
	var goodsHan = function(e){
		e.stopPropagation();
		goodsFixed.fadeOut();
	};
	closeGoods.on("click",goodsHan);
	maskGoods.on("click",goodsHan);
	
	// cart handle
	// 购物车商品规格计算
	// cart handle
	// 购物车下拉框
	var cartLog = $('#cartLog');
	var cartFixed = $('#cartFixed');
	var slideGood = $('#slideGood');
	var maskCart = $('#maskCart');
	
	var cartPrice = 0; // 购物车金钱
	var cartPriceEle = $('#cartPriceEle'); // 购物车金钱 -- $
	var cartCount = 0;  // 购物车数量
	var cartCountEle = cartLog.children('.cartNumber');// 购物车数量 -- $
	var cartSess = {}; // 购物车商品记录对象
	var cartUl = $('#cartUl'); // 购物车商品包裹 -- $
	var goodsFixedEle = $('#goodsFixed'); // 商品弹框
	var gfSess = {};
	var gfPriceEle = goodsFixedEle.find('.goodsPrice');
	var gfIterWrap = goodsFixedEle.find('.handleNode');
	var gfIterAdd = gfIterWrap.find('.addNode');
	var gfIterRemove = gfIterWrap.find('.removeNode');
	var gfIterCount = gfIterWrap.find('.number');
	var gfIterText = goodsFixedEle.find('.iterText');
	var gfIterResult = function(pro){
		var price = 0;
		var iterText = [];
		var iterLeve = [];
		pro.forEach(function(n){
			iterText.push( n.iterText );
			price += n.iterPrice;
			iterLeve.push( n.iterLeve );
		});
//		console.log( iterText );
		return {
			iterText,
			iterPrice: price.toFixed(1),
			iterLeve
		}
	};
	
	var cartGoodsNew = function(pro){
		var goodsIterSku = pro.goodsIterSku || '';
		return `<li class="node-li" data-leve="${ pro.goodsLeve }">
					<div class="node-c c-a flex flex-between">
						<span class="ft28">${ pro.goodsName }</span>
						<div class="arNode">
							<div class="priceNode">
								<span><em class="icon">¥</em><i class="goodsPrice">${ pro.goodsIterPrice }</i></span>
							</div>
							<div class="handleNode">
								<img class="removeNode" src="images/dn (2).png" />
								<i class="number">${ pro.goodsCount }</i>
								<img class="addNode" src="images/dn (1).png" />
							</div>
						</div>
					</div>
					<p class="skuText node-c c-b ft22 cr-999 ${ goodsIterSku || 'hide' }">${ goodsIterSku  }</p>
				</li>`
	};
	
	// 商品加事件函数
	scrollA.on('click','.handleNode .addNode',function(e){
		e.stopPropagation();
		goodsFixedEle.fadeIn();
		//ajax
		
		//ajax demo
		var t = $(this);
		var li = t.closest('.node-goodCell');
		var normalPrice = li.find('.goodsPrice').text();
//		console.log( li,normalPrice )
		copy(gfSess = {},{
			normalPrice,
			goodsId: li.data('gid'),
			goodsCount: 1,
			iterSku:[
				{
					iterText:'小份',
					iterPrice: 0,
					iterLeve: 0
				},
				{
					iterText:'微辣',
					iterPrice: 0,
					iterLeve: 0
				},
			],
		});
//		console.log( gfIterText )
		// dom demo  init
		gfPriceEle.text( normalPrice );
		gfIterCount.text( 1 );
		gfIterText.text( gfIterResult( gfSess.iterSku ).iterText.join(' | '));
	});
	
	// 商品弹框加减事件
	
	gfIterWrap.on('click','img',function(e){
		e.stopPropagation();
		var hanType = $(this).hasClass('addNode');
		var resultCount;
		if( hanType ){
			gfSess.goodsCount++;
		}else{
			if( gfSess.goodsCount != 1 ){
				gfSess.goodsCount--;
			}
		}
		gfIterCount.text( gfSess.goodsCount );
	});
	
	// sku handle
	var skuA = $('#skuA');
	skuA.on("click",'.node-bi',function(e){
		var t = $(this);
		var pi = t.closest('.node-ai').index();
		if( !t.hasClass('cur') ){
			t.addClass('cur').siblings('.cur').removeClass('cur');
			copy(gfSess.iterSku[pi],{
				iterText:t.text(),
				iterPrice: +t.data('iterprice'),
				iterLeve: pi
			});
		}
	});
	var goodsSub = $('#goodsSub');
	goodsSub.on('click',function(){
//		cartSess
		var iterResult = 
		var goodsLeve = 
	});
	
	
	//显示隐藏购物车
	var cartHan = function(){
		if( cartCount ){
			cartFixed.slideToggle();
			maskCart.fadeToggle();
		}
		event && event.stopPropagation();
	};
	cartLog.on('click',cartHan);
	slideGood.on('click',cartHan);
	maskCart.on('click',cartHan);
	scrollA.on('click','.handleNode .removeNode',cartHan); // 商品减事件函数

	
});
