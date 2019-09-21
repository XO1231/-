/*
 * anthor wanghuan
 * date 2019/7/31
 * */
!function($){
	$.fn.citySelect = function(options){
		if( this.length ){
			var cy = Object.assign || $.extend;
			var op = cy({
				nodata: true,
				cityTitle: '请选择',
				cityKey: null,
			},options);
			var t = this;
			var sn ;
			var nd = op.nodata;
			var k = op.cityKey;
			var ck = k && 'object' == typeof k; 
			var p = t.find(".prov");
			var c = t.find(".city");
			var d = t.find(".dist");
			var m = function(v){
				return "<option value='"+ v +"' > "+ v +" </option>";
			};
			if( !p.length ){
				throw new console.error('Lack of must elements');
			}else{
				sn = jqueryCityselectDataArr.citylist;
				var pm =  "<option value='' style='display:none;'>"+ op.cityTitle +"</option>";
				sn.forEach(function(n,i){
					var v = n.p;
					pm += m(v);
					p.html( pm );
				});
				var pn = 0;
				var cn = 0;
				var dn = 0;
				var ch = c.length;
				var dh = d.length;
				var cg = function(ci){
					if( dh  ){
						var dm = '';
						var fo = sn[pn].c[ci].a;
						if( fo ){
							fo.forEach(function(d){
								dm += m(d.s);
							});
							d.html( dm );
							k.dist = d.val();
						}else{
							nd && ( d.hide() );
						}
						
					}
				};
				p.change(function(){
					var pe = this;
					ck && ( k.prov = pe.value );
					if( ch ){
						var pi = pn = pe.selectedIndex - 1;
						var cm = '';
						sn[pi].c.forEach(function(c,j){
							cm += m(c.n);
						});
						c.html( cm );
						k.city = c.val();
						cg( 0 );
					}
				});
				ch && c.change(function(){
					var c = this;
					var ci = cn = c.selectedIndex;
					cg( ci );
					k.city = c.value;
				});
				
				dh && d.change(function(){
					k.dist = this.value;
					dn = this.selectedIndex;
				});
			}	
		}else{
			console.warn('the $ele is undefined');	
		}
		
	};
}(jQuery)
