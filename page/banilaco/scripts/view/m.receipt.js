(function($) {
	
	$.context = location.protocol + '//' + location.host;
	
	var actionApplyCoupon = function(){
		if (confirm("쿠폰을 사용하시겠습니까?")) {
			var $el = $('#use_fl');
			var params = {};
			
			$('#use_fl').unbind('click.use_fl');
			params['storeTesterKey'] = $('#use_fl').data('storeTesterKey');
			
			$.ib.json($.context + '/api/apply', JSON.stringify(params), 'POST').done(function(data) {
				if (data && data.status == '200' && data.result == 'ok' ) {
					alert('쿠폰 사용이 완료 되었습니다.');
					$('#use_fl').text('쿠폰 사용 완료');
				}else{
					alert(data.error.localizedMessage);
					$('#use_fl').on('click.use_fl',actionApplyCoupon);
				}
			});
		}
	}
	
	var getUrlVars = function() {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}
	
	var telphone = function(){
		window.location.href = 'tel:07071131329';
	}

	$.view = {};
	$.view.popup = function(url, title, w, h) {
	    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
	
	    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	
	    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	    var top = ((height / 2) - (h / 2)) + dualScreenTop;
	    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	
	    if (window.focus) {
	        newWindow.focus();
	    }
	}
	
	//수령자 정보를 가져온다.
	$(document).ready(function() {
		var params = getUrlVars();
		var tokenValue = params['tokenValue'];
		if( !tokenValue || tokenValue == '' || tokenValue.length == 0){
			alert('수령자 정보를 확인할수 없습니다.');
			location.href = '/m/index.html';
		}else{
			$.ib.json($.context + '/api/receipt/' + tokenValue, {}, 'GET').done(function(data) {
				if (data && data.status == '200') {
					if(data.model && data.model.storeTesterKey > 0){
						$('#testerName').text(data.model.testerName);
						$('#cellPhone').text(data.model.cellPhone);
						$('#storeName').text(data.model.storeName);
						
						var searchUrl = 'http://www.banilaco.com/m/customer/customerStore.do?area_code='+data.model.locationId+'&searchText='+encodeURIComponent(data.model.storeName);
						$('#storeId').attr('href',searchUrl);

						if(data.model.use_fl == 'N'){
							$('#use_fl').data('storeTesterKey',data.model.storeTesterKey);
							$('#use_fl').on('click.use_fl',actionApplyCoupon);
						}else{
							$('#use_fl').text('쿠폰 사용 완료');
						}	
					}else{
						alert('유효한 토큰값이 아닙니다.');
						location.href = '/m/index.html';
					}			
				}else{
					alert( "데이터 수신중 오류가 발생하였습니다.\n잠시후 다시 실행하여주십시요." );
				}				
			})
			.fail(function() {
				alert( "데이터 수신중 오류가 발생하였습니다.\n잠시후 다시 실행하여주십시요." );
			});	
		}
		
		$('#tel').on('click',telphone);
	});
	
})(jQuery);