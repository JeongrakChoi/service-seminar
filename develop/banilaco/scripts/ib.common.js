/*
 *  @ Project: Ibank Javascript Common Plugin
 *  @ Description: Ibank Javascript Common Plugin
 *  @ Author: Thomas
 *  @ Version: 1.00 (28-APR-2017)
 *  @ requires jQuery v1.8.0 or later  
 */
(function($) {

	// Context
	$.context = '/';

	// Global
	$.ib = {};

	// log
	$.ib.log = function(jsonData, descStr) {
		if (descStr && descStr != undefined) {
			alert("[" + descStr + "] : " + JSON.stringify(jsonData));
		} else {
			alert(JSON.stringify(jsonData));
		}
	};

	// Common Json Function
	$.ib.json = function(url, params, type) {
		var requestType = 'GET';
		if (typeof type != 'undefined')
			requestType = type;
		var dfd = $.Deferred();
		$.ajax({
			type : requestType,
			url : url,
			data : params,
			dataType : 'json',
			contentType : "application/json; charset=utf-8"
		}).done(function(data) {
			dfd.resolve(data);
		}).fail(function(request, status, error) {
			dfd.fail(false);
		});
		return dfd.promise();
	};

	// Common Json Function
	$.ib.jsonSync = function(url, params, type) {
		var requestType = 'GET';
		if (typeof type != 'undefined')
			requestType = type;
		var dfd = $.Deferred();
		$.ajax({
			type : requestType,
			url : url,
			data : params,
			async : false,
			dataType : 'json',
			contentType : "application/json; charset=utf-8"
		}).done(function(data) {
			dfd.resolve(data);
		}).fail(function(request, status, error) {
			dfd.fail(false);
		});
		return dfd.promise();
	};

	// cut String
	$.ib.substring = function(src, cutLength, replaceStr) {
		if (!src || src == undefined || src == "null")
			return "";
		var cur = 0;
		for (var i = 0; i < src.length; i++) {
			cur += (src.charCodeAt(i) > 128) ? 2 : 1;
			if (cur > cutLength)
				return src.substring(0, i) + replaceStr;
		}
		return src;
	};

	// \n --> <BR/>
	$.ib.carriageReturnHtml = function(src) {
		if (src && src != undefined && src != null) {
			var replaceStr = src.replace(/\n/g, "<br />");
			// find url
			replaceStr = replaceStr.replace(
					/((http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?)/g,
					"<a href='$1' target='_blank'>$1</a>");
			return replaceStr;
		}
		return '';
	};

	$.ib.getInteger = function(str) {
		if (str != null && str != '') {
			return parseInt(str);
		} else {
			return 0;
		}
	};

	$.ib.addComma = function(src) {
		if (src) {
			return src.toLocaleString();
		}
		return '';
	};

	$.ib.checkCellPhone = function(src) {
		if (!src || !(src.length == 10 || src.length == 11)) {
			return false;
		}
		var cellPhoneRegExp = /^01([0|1|6|7|8|9]?)(\d{3,4})(\d{4})$/;
		if (!cellPhoneRegExp.test(src)) {
			return false;
		}
		return true;
	}
	
	//카카오 공유
	$.ib.share = function(type, title, url) {
        var curUrl
        if (url && url.length > 0) {
            curUrl = url;
        } else {
            curUrl = window.location.href;
        }

        // remove hashtag
        if (curUrl && curUrl.indexOf('#') > -1) {
            curUrl = curUrl.substring(0, curUrl.indexOf('#'));
        }
        curUrl = encodeURIComponent(curUrl);

        // kakao
        if (type == 'kakao') {
            var href = 'https://story.kakao.com/share?url=' + curUrl;
            $.ib.popup(href, 'kakao', 600, 600, 'yes','no');
            // facebook
        } else {
            var href = 'https://www.facebook.com/sharer/sharer.php?u=' + curUrl;
            $.ib.popup(href, 'facebook', 600, 600, 'yes','no');
        }
    };
    
    /**
     * 화면 중앙에 팝업 생성
     * 
     * @param url 팝업 URL
     * @param name 팝업명
     * @param width 가로크기
     * @param height 세로크기
     * @param scroll yes/no
     * @param resizable yes/no
     */    
    $.ib.popup = function(url, name, width, height, scrollbars, resizable) {
        if(!scrollbars) scrollbars = "no";
        if(!resizable) resizable = "no";
        
        var openParamStr = "";
        if(width && height) {
        	openParamStr = "width=" + width + ", height=" + height; 
        }
        openParamStr += ", left=" + (screen.width/2-parseInt(width)/2) + ", top=" + (screen.height/2-parseInt(height)/2) + ", scrollbars=" + scrollbars + ", resizable=" + resizable + ", toolbar=no, directories=no, status=no, menubar=no";
        window.open(url, name, openParamStr);
    };

})(jQuery);