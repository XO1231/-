$(function() {
	var $ = $ || jQuery;
	var copy = Object.assign;
	var msg = function(text) {
		layer.open({
			skin: 'msg',
			content: text,
			time: 1.5
		})
	};
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
	navScrollEle.on('touchend', '.table-cell', function(e) {
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
	//	console.log( gfTitleEle,gfBanner )
	var gfIterResult = function(pro) {
		var price = 0;
		var iterText = [];
		var iterLeve = [];
		pro.forEach(function(n) {
			iterText.push(n.iterText);
			price += n.iterPrice;
			iterLeve.push(n.iterLeve);
		});
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
						<span class="ft28">${ pro.goodsTitle }</span>
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
	var skuView = function(arr) {

	};
	skuView.prototype = {
		liView: function(view) {
			return `<li class="node-ai">${ view }</li>`;
		},
		h4View: function(view) {
			return `<h4 class="node-h4">${ view }</h4>`;
		},
		ulView: function(view) {
			return `<ul class="node-ul flex flex-between">${ view }</ul>`;
		},
		cellView: function(view, cur) {
			return `<li class="node-bi ${ cur ? 'cur':'' }" data-iterprice = "">${ view }</li>`;
		},
	};

	// 商品加事件函数
	//dnLa bind comment event
	scrollA.on('click', '.handleNode .addNode', function(e) {
		e.stopPropagation(), e.preventDefault();
		goodsFixedEle.fadeIn();
		//ajax

		//ajax demo
		var t = $(this);
		var li = t.closest('.node-goodCell');
		var resultPrice;
		var normalPrice = resultPrice = +li.find('.goodsPrice').text();
		var goodsBanner = li.find('.goodsBanner').attr('src');
		var goodsTitle = li.find('.goodsTitle').text();
		var goodsCountEle = t.siblings('.number');
		copy(gfSess = {}, {
			normalPrice,
			resultPrice,
			goodsId: li.data('gid'),
			goodsTitle,
			goodsBanner,
			goodsCountEle: goodsCountEle,
			goodsRemoveEle: t.siblings('.removeNode'),
			goodsCount: 1,
			iterAllCount: +goodsCountEle.text()

		});
//		console.log( gfSess )
		// dom demo  init
		skuA.find('.node-ai').each(function() {
			var li = $(this).find('.node-ul .node-bi');
			li.eq(0).addClass('cur').siblings('.cur').removeClass('cur');
		});
		// goodsfixed init
		gfBanner.attr('src', goodsBanner); // 改变banner
		gfTitleEle.text(goodsTitle); // 标题
		gfPriceEle.text(normalPrice); // 常规价格
		gfIterCount.text(1); //  数量
		// 有sku的时候
		var iterSkuAuto = true;
		if(iterSkuAuto) {
			copy(gfSess, {
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
				iterSKuText: ['小份', '微辣'],
			})

		}
		//		gfIterText.text(gfIterResult(gfSess.iterSku).iterText.join(' | ')); // 规格

		gfIterText.text(gfSess.iterSKuText.join(' | ')); // 规格
	});

	// 商品弹框加减事件

	gfIterWrap.on('click', 'img', function(e) {
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
	// 规格点击事件
	// sku handle 
	var skuA = $('#skuA');
	skuA.on("touchend", '.node-ul .node-bi', function(e) {
		e.stopPropagation();
		var t = $(this);
		var td = t.data();
		if(!t.hasClass('cur')) {
			var pi = t.closest('.node-ai').index();
			var iterText = t.text();
			var iterprice = td.iterprice || 0;
			var sib = t.siblings('.cur');
			var diffPrice = iterprice - sib.data('iterprice');
			t.addClass('cur');
			sib.removeClass('cur');
			copy(gfSess.iterSku[pi], {
				iterText,
				iterprice,
				iterLeve: t.index()
			});
			gfSess.resultPrice += diffPrice;
			gfSess.iterSKuText[pi] = iterText;
			gfIterText.text(gfSess.iterSKuText.join(' | '));
			gfPriceEle.text(gfSess.resultPrice);
		}
	});
	// 商品添加购物车事件
	var goodsSub = $('#goodsSub');
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
	//  清空购物车
	var clearCart = $('#clearCart');
	
	//-----------------------------------------------------------------------------------------------
	//  edit handle

	// 商品添加购物车事件
	goodsSub.on('touchend', function(e) {
		var goodsLeve;
		var iterPrice;
		var goodsInfo = {};
		var goodsCount = gfSess.goodsCount;
		var resultPrice = gfSess.resultPrice;
		var iterAllCount =  gfSess.iterAllCount;
		if(gfSess.iterSkuAuto) {
			var iterResult = gfIterResult(gfSess.iterSku);
			goodsLeve = gfSess.goodsId + '_' + iterResult.iterLeve.join('');
			goodsInfo.goodsIterSku = iterResult.iterText.join(' | ');
		} else {
			goodsLeve = gfSess.goodsId;
		}
		iterPrice = resultPrice * goodsCount;
		cartPrice += iterPrice;
		cartCount += goodsCount;
		iterAllCount += goodsCount;
		gfSess.iterAllCount = iterAllCount;
		copy(goodsInfo, gfSess, {
			goodsLeve,
			iterPrice,
			iterAllCount,
			
		});	
		// 相同规格商品已存在
		if(goodsLeve in cartSess) {
			var cartGoodsSess = cartSess[goodsLeve];
			
			cartGoodsSess.iterAllCount = iterAllCount;
			cartGoodsSess.goodsCount += goodsCount;
			cartGoodsSess.iterPrice += iterPrice;
			cartGoodsSess.cartGoodsNumEle.text( cartGoodsSess.goodsCount );
		} else {
			var goodsNew = $(cartGoodsNew(goodsInfo));
			copy(cartSess[goodsLeve] = {}, goodsInfo, {
				cartGoodsCell: goodsNew,
				cartGoodsPriceEle: goodsNew.find('.goodsPrice'),
				cartGoodsNumEle: goodsNew.find('.number')
			});
			cartUl.append(goodsNew);
		}

		gfSess.goodsCountEle.text(iterAllCount).show();
		cartPriceEle.text(cartPrice.toFixed(1));
		if(cartCount) {
			cartCountEle.text(cartCount).show();
		}
		gfSess.goodsRemoveEle.show();
		goodsFixed.fadeOut();
	});

	// 购物车商品加减事件
	cartUl.on('click', '.handleNode img', function(e) {
		e.stopPropagation(), e.preventDefault();
		var t = $(this);
		var hanType = t.hasClass('addNode');
		var p = t.closest('.node-li');
		var pd = p.data();
		var goodsLeve = pd.leve;
		var goodsSess = cartSess[goodsLeve];
		var cartGoodsPriceEle = goodsSess.cartGoodsPriceEle;
		var diffPrice;
		var resultPrice = diffPrice = goodsSess.resultPrice;
		var goodsCountEle = goodsSess.goodsCountEle;
		var goodsCount = goodsSess.goodsCount;
		var iterAllCount = goodsSess.iterAllCount;
		if(hanType) {
			iterAllCount++;
			goodsCount++;
			cartCount++;
			cartPrice += resultPrice;
		} else {
			iterAllCount--;
			goodsCount--;
			cartCount--;
			cartPrice = cartPrice - resultPrice;
			diffPrice = -diffPrice;
			if(goodsCount == 0) {
				p.animate({
					height: 0
				}, function() {
					p.remove();
				});
				delete cartSess[goodsLeve];
			}
		}
		copy(goodsSess, {
			goodsCount,
			iterAllCount,
			iterPrice: goodsSess.iterPrice + diffPrice,

		});
		goodsCountEle.text(iterAllCount);
		goodsSess.cartGoodsNumEle.text(goodsCount);
		cartCountEle.text(cartCount);
		cartPriceEle.text(cartPrice.toFixed(1));
		if(cartCount == 0) {
			cartHan(true);
			cartCountEle.hide();
		}
		if(iterAllCount == 0) {
			goodsCountEle.hide();
			goodsSess.goodsRemoveEle.hide();
		}
	});
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


});