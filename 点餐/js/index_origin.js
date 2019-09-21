$(function() {
	var $ = $ || jQuery;
	var copy = Object.assign;
	// slide handle
	// 优惠下拉框
	var slideHan = $('#slideHan');
	var noticSlide = $('#noticSlide');
	slideHan.on('touchend', function(e) {
		e.stopPropagation(), e.preventDefault();
		slideHan.toggleClass('cur');
		noticSlide.slideToggle(300);
	});
	// scroll init
	// 商家推荐
	var scrollA = $('#scrollA');
	initScroll(scrollA[0]);
	// 餐饮分类导航
	var navScrollEle = $('#navScroll');
	var navScroll = initScroll(navScrollEle[0]);
	var dnLa = $('#dnLa');
	navScrollEle.on('touchend', '.table-cell', function() {
		e.stopPropagation();
		var t = $(this);
		if(!t.hasClass('cur')) {
			var ti = t.index();
			t.addClass('cur').siblings('.cur').removeClass('cur');
			navScroll.scrollToElement('.cur', 500, true, false);
			dnLa.children('.node-li').eq(ti).show().siblings()[ti ? 'hide' : 'show']();

		}
	});

	// goods handle
	// 购物车显示隐藏
	var goodsFixed = $('#goodsFixed');
	var closeGoods = $('#closeGoods');
	var maskGoods = $('#maskGoods');
	var goodsHan = function(e) {
		e.stopPropagation(), e.preventDefault();
		goodsFixed.fadeOut();
	};
	closeGoods.on("click", goodsHan);
	maskGoods.on("click", goodsHan);

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
	var cartCount = 0; // 购物车数量
	var cartCountEle = cartLog.children('.cartNumber'); // 购物车数量 -- $
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
	
	var gfTitleEle = goodsFixedEle.find('.goodsText');
	var gfBanner = gfTitleEle.siblings('img');
	console.log( gfTitleEle,gfBanner )
	var gfIterResult = function(pro) {
		var price = 0;
		var iterText = [];
		var iterLeve = [];
		pro.forEach(function(n) {
			iterText.push(n.iterText);
			price += n.iterPrice;
			iterLeve.push(n.iterLeve);
		});
		//		console.log( iterText );
		return {
			iterText,
			iterPrice: price,
			iterLeve
		}
	};

	var cartGoodsNew = function(pro) {
		var goodsIterSku = pro.goodsIterSku || '';
		return `<li class="node-li" data-leve="${ pro.goodsLeve }">
					<div class="node-c c-a flex flex-between">
						<span class="ft28">${ pro.goodsName }</span>
						<div class="arNode">
							<div class="priceNode">
								<span><em class="icon">¥</em><i class="goodsPrice">${ pro.resultPrice }</i></span>
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
	var skuViewDemo = `<li class="node-ai">
					<h4 class="node-h4">规格</h4>
					<ul class="node-ul flex flex-between">
						<li class="node-bi cur" data-iterprice = "">小份</li>
						<li class="node-bi" data-iterprice = "10">中份</li>
						<li class="node-bi" data-iterprice = "30">大份</li>
					</ul>
				</li>`;
	var skuView = function(arr){
		
	};
	skuView.prototype = {
		liView : function(view){
			return `<li class="node-ai">${ view }</li>`;
		},
		h4View : function(view){
			return `<h4 class="node-h4">${ view }</h4>`;
		},
		ulView : function(view){
			return `<ul class="node-ul flex flex-between">${ view }</ul>`;
		},
		cellView : function(view,cur){
			return `<li class="node-bi ${ cur ? 'cur':'' }" data-iterprice = "">${ view }</li>`;
		},
	};

	// 商品加事件函数
	//dnLa bind comment event
	scrollA.on('touchstart', '.handleNode .addNode', function(e) {
		e.stopPropagation(), e.preventDefault();
		goodsFixedEle.fadeIn();
		//ajax

		//ajax demo
		var t = $(this);
		var li = t.closest('.node-goodCell');
		var normalPrice = +li.find('.goodsPrice').text();
		//		console.log( li,normalPrice )
		var goodsBanner= li.find('.goodsBanner').attr('src');
		var goodsTitle = li.find('.goodsTitle').text();
		copy(gfSess = {}, {
			normalPrice,
			goodsId: li.data('gid'),
			goodsTitle,
			goodsBanner,
			goodsCountEle: t.siblings('.number'),
			goodsRemoveEle: t.siblings('.removeNode'),
			goodsCount: 1,
			iterSkuAuto: true,
			iterSku: [{
					iterText: '小份',
					iterPrice: 0,
					iterLeve: 0
				},
				{
					iterText: '微辣',
					iterPrice: 0,
					iterLeve: 0
				},
			],
		});
		//		console.log( gfIterText )
		// dom demo  init
		skuA.find('.node-ai').each(function() {
			var li = $(this).find('.node-ul .node-bi');
			li.eq(0).addClass('cur').siblings('.cur').removeClass('cur');
		});
		// goodsfixed init
		gfBanner.attr('src',goodsBanner); // 改变banner
		gfTitleEle.text( goodsTitle );  // 标题
		gfPriceEle.text(normalPrice); // 常规价格
		gfIterCount.text(1);  //  数量
		gfIterText.text(gfIterResult(gfSess.iterSku).iterText.join(' | '));  // 规格
	});

	// 商品弹框加减事件

	gfIterWrap.on('touchend', 'img', function(e) {
		e.stopPropagation();
		var hanType = $(this).hasClass('addNode');
		var resultCount;
		if(hanType) {
			gfSess.goodsCount++;
		} else {
			if(gfSess.goodsCount != 1) {
				gfSess.goodsCount--;
			}
		}
		gfIterCount.text(gfSess.goodsCount);
	});

	// sku handle
	var skuA = $('#skuA');
	skuA.on("touchend", '.node-ul .node-bi', function(e) {
		e.stopPropagation();
		var t = $(this);
		var pi = t.closest('.node-ai').index();
		if(!t.hasClass('cur')) {
			t.addClass('cur').siblings('.cur').removeClass('cur');
			var iterText = t.text();
			copy(gfSess.iterSku[pi], {
				iterText,
				iterPrice: t.data('iterprice') || 0,
				iterLeve: +t.index()
			});
			var resultPro = gfIterResult(gfSess.iterSku);
			gfIterText.text(resultPro.iterText.join(' | '));
			gfPriceEle.text(gfSess.normalPrice + +resultPro.iterPrice);
			//			console.log( gfSess )
		}
	});
	var goodsSub = $('#goodsSub');
	goodsSub.on('touchend', function(e) {
		//		cartSess
		var iterResult = gfIterResult(gfSess.iterSku);
		var goodsLeve = gfSess.goodsId + '_' + iterResult.iterLeve.join('');
		var resultPrice = gfSess.normalPrice + iterResult.iterPrice;
		var goodsCount = +gfSess.goodsCount;
		var iterPrice = +resultPrice * goodsCount;
		

		var goodsInfo = copy({}, gfSess, {
			goodsName: 'demo',
			goodsIterPrice: iterPrice,
			goodsCount: gfSess.goodsCount,
			goodsIterSku: iterResult.iterText.join(' | '),
			goodsLeve,
			resultPrice
		});
		//		console.log( cartSess,goodsLeve )
		cartPrice += iterPrice;
		cartCount += goodsCount;
		//		cartSess[goodsLeve] = gfSess;
		//		copy()
		var originCount = +gfSess.goodsCountEle.text();
		if(goodsLeve in cartSess) {
			var cartGoodsSess = cartSess[goodsLeve];
			var cartGoodsEle = cartGoodsSess.cartGoodsCell;
			//			console.log( originCount,goodsCount )
//			console.log( cartGoodsSess )
			cartGoodsSess.goodsCount += goodsCount;
			cartGoodsSess.goodsIterPrice += iterPrice;
//			cartGoodsEle.find('.goodsPrice').text(resultPrice);
			cartGoodsEle.find('.number').text(goodsCount + originCount);

		} else {
			var goodsNew = $(cartGoodsNew(goodsInfo));
			copy(cartSess[goodsLeve] = {}, goodsInfo, {
				cartGoodsCell: goodsNew,
			});
			cartUl.append(goodsNew);
		}
		//		originCount = cartGoodsSess.goodsCount;
		gfSess.goodsCountEle.text(goodsCount + originCount).show();
		cartPriceEle.text(cartPrice);
		if(cartCount) {
			cartCountEle.text(cartCount).show();
		}
		gfSess.goodsRemoveEle.show();
		goodsFixed.fadeOut();

	});

	//显示隐藏购物车
	var cartHan = function(init) {
		if(cartCount || init === true) {
			cartFixed.slideToggle();
			maskCart.fadeToggle();
		}
		event && event.stopPropagation(), event.preventDefault();
		//		console.log( $(this) )
	};
	cartLog.on('touchend', cartHan);
	slideGood.on('touchend', cartHan);
	maskCart.on('touchend', cartHan);
	scrollA.on('touchend', '.removeNode', cartHan); // 商品减事件函数

	// 购物车商品加减事件

	cartUl.on('touchend', '.handleNode img', function(e) {
		e.stopPropagation(), e.preventDefault();
		var t = $(this);
		var p = t.closest('.node-li');
		var goodsLeve = p.data('leve');
		var goodsSess = cartSess[goodsLeve];
		var hanType = $(this).hasClass('addNode');
		var resultCount = goodsSess.goodsCount;
		var cartGoodsPriceEle = p.find('.goodsPrice');
		var diffPrice;
		//		console.log( goodsSess )
		var resultPrice = diffPrice = goodsSess.resultPrice;
		var goodsCount = +goodsSess.goodsCount;
		console.log( goodsSess )
		if(hanType) {
			goodsSess.goodsCount++;
			cartCount++;
			goodsCount++;
			cartPrice = +cartPrice + resultPrice;

		} else {
			if(goodsSess.goodsCount == 1) {
				p.animate({
					height: 0
				}, function() {
					p.remove();
				});
				delete cartSess[goodsLeve];
			}
			goodsSess.goodsCount--;
			cartCount--;
			goodsCount--;
			//			console.log( cartPrice,goodsSess)
			cartPrice = +cartPrice - resultPrice;
			diffPrice = -diffPrice;

		}

		cartGoodsPriceEle.text(goodsSess.goodsIterPrice += diffPrice);
		goodsSess.goodsCountEle.text(goodsCount);
//		t.siblings('.number').text(goodsSess.goodsCount);
		cartCountEle.text(cartCount);
		cartPriceEle.text(cartPrice.toFixed(1));
		//		console.log( cartPrice )
		if(cartCount == 0) {
			cartHan(true);
			cartCountEle.hide();
		}
		if(goodsCount == 0) {
			goodsSess.goodsCountEle.hide();
			goodsSess.goodsRemoveEle.hide();
		}
	});

	var clearCart = $('#clearCart');
	clearCart.on('touchend', function(e) {
		e.stopPropagation(), e.preventDefault();

		layer.open({
			content: '确定要清空购物车吗！',
			btn: ['确定', '取消'],
			yes: function(li) {
				cartUl.animate({
					height: 0
				}, function() {
					cartUl.empty();
				});
				cartCountEle.text(cartCount = 0).hide();
				cartPriceEle.text((cartPrice = 0).toFixed(1));
				Object.values(cartSess).forEach(function(n) {
					n.goodsCountEle.text(0).hide();
					n.goodsRemoveEle.hide();
				});
				cartSess = {};
				cartHan(true);

				layer.close(li);
				msg('购物车清空成功！');
			}
		});

	});

	function msg(text) {
		layer.open({
			skin: 'msg',
			content: text,
			time: 1.5
		})
	}
});