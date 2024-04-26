/*
 *  @ Project: Store Javascript
 *  @ Description: Store Javascript
 *  @ Author: Thomas
 *  @ Version: 1.00 (28-APR-2017)
 *  @ requires jQuery v1.8.0 or later  
 */

	
var consumer_seq = 1245;
var livere_seq = 34641;
var smartlogin_seq = 11179;
    
var name = "";
var cellPhone1 = "";
var cellPhone2 = "";
var cellPhone3 = "";
var locationId = "";
var storeId = "";
var storeName = "";

(function($) {
	
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
	
	//신규 샘플 등록 매장 불러오기
	$.view.drawStoreList = function(locationId, storeId) {
		$.ib.json($.context + '/api/store/list/' + locationId, {}, 'GET').done(function(data) {
			var $formName = $('#storeTesterForm', $(document));
			//remove selected
			$('#storeId', $formName).val("");
			var $storeIdList = $('#storeIdList', $formName);
			$storeIdList.empty();
			if (data && data.status == '200') {
				$.each(data.list, function() {
					/*$storeIdList.append($("<li></li>").addClass("select-option").attr("role", "option").attr("aria-selected","false").attr("data-value",this.storeId).text(this.storeName));*/
					$storeIdList.append("<option value="+this.storeId+">"+this.storeName+"</option>");
				});
			} else {
				alert( "데이터 수신중 오류가 발생하였습니다.\n잠시후 다시 실행하여주십시요." );
			}
		}).fail(function() {
			alert( "데이터 수신중 오류가 발생하였습니다.\n잠시후 다시 실행하여주십시요." );
		});
	};
	
	//수정 샘플 등록 매장 불러오기
	$.view.modifydrawStoreList = function(locationId, storeId) {
		$("#modifyLocationId").val(locationId);
		$.ib.json($.context + '/api/store/list/' + locationId, {}, 'GET').done(function(data) {
			var $formName = $('#storeTesterForm', $(document));
			//remove selected
			var $storeIdList = $('#modifyStoreIdList', $formName);
			$storeIdList.empty();
			if (data && data.status == '200') {
				$.each(data.list, function() {
					/*$storeIdList.append($("<li></li>").addClass("select-option").attr("role", "option").attr("aria-selected","false").attr("data-value",this.storeId).text(this.storeName));*/
					$storeIdList.append("<option value="+this.storeId+">"+this.storeName+"</option>");
				});
				if(storeId != null && storeId != ""){
					$("#modifyStoreIdList").val(storeId);
				}
			} else {
				alert( "데이터 수신중 오류가 발생하였습니다.\n잠시후 다시 실행하여주십시요." );
			}
		})
		.fail(function() {
			alert( "데이터 수신중 오류가 발생하였습니다.\n잠시후 다시 실행하여주십시요." );
		});
	};
	//신규 샘플신청 유효성 검사
	$.view.storeValid = function() {
		var $formName = $('#storeTesterForm', $(document));
		var $testerName = $('#testerName', $formName);
		var $cellPhone1 = $('#cellPhone1', $formName);
		var $cellPhone2 = $('#cellPhone2', $formName);
		var $cellPhone3 = $('#cellPhone3', $formName);
		var $locationId = $('#locationId', $formName);
		var $storeIdList = $('#storeIdList', $formName);
		var $sampReqApr1 = $('#sampReqApr1', $formName);

		if ($sampReqApr1[0].checked == false) {
			$sampReqApr1.focus();
			alert("개인정보 수집 동의하여 주십시오.");
		} else if ($testerName.val().trim().length < 2 || $testerName.val().trim().length > 10) {
			$testerName.focus();
			alert("이름은 2자이상 10자 이하로 입력하여 주십시오.");
			return;
		} else if (!$.ib.checkCellPhone($cellPhone1.val()+$cellPhone2.val()+$cellPhone3.val())) {
			$cellPhone2.focus();
			alert("휴대폰 번호를 확인하여 주십시오.");
			return;
		} else if ($locationId.val() == '' || $locationId.val().trim().length < 1) {
			$('#locationName', $formName).focus();
			alert("지역을 선택하여 주십시오.");
			return;
		} else if (!$storeIdList.val() || $storeIdList.val() == '' || $storeIdList.val().trim().length < 1) {
			$('#storeName', $formName).focus();
			alert("매장을 선택하여 주십시오.");
			return;
		} else {
			if (confirm("신청 하시겠습니까?")) {
				
				$("#viewName").html($testerName.val());
				$("#viewPhone").html($('#cellPhone1 option:selected', $formName).val()+"-"+$cellPhone2.val()+"-"+$cellPhone3.val());
				$("#viewStore").html($('#storeIdList option:selected', $formName).text());
				
				name = $testerName.val();
				cellPhone1 = $('#cellPhone1 option:selected', $formName).val();
				cellPhone2 = $cellPhone2.val();
				cellPhone3 = $cellPhone3.val();
				locationId = $('#locationId option:selected', $formName).val();
				storeId = $('#storeIdList option:selected', $formName).val();
				storeName = $('#storeIdList option:selected', $formName).text();
				
				$(".user-scene").hide();
				$(".user-scene.output").show();
				$(".check_txt_box").show();
				
				gtag('event', 'step5', {'event_category' : 'sampling_event', 'event_label' : '클린잇제로_샘플링'});
			}
		}
	};
	//수정 샘플신청 유효성 검사
	$.view.modifyStoreValid = function() {
		var $formName = $('#storeTesterForm', $(document));
		var $testerName = $('#modifyName', $formName);
		var $cellPhone1 = $('#modifyCellPhone1', $formName);
		var $cellPhone2 = $('#modifyCellPhone2', $formName);
		var $cellPhone3 = $('#modifyCellPhone3', $formName);
		var $locationId = $('#modifyLocationId', $formName);
		var $storeIdList = $('#modifyStoreIdList', $formName);

		if ($testerName.val().trim().length < 2 || $testerName.val().trim().length > 10) {
			$testerName.focus();
			alert("이름은 2자이상 10자 이하로 입력하여 주십시오.");
			return;
		} else if (!$.ib.checkCellPhone($cellPhone1.val()+$cellPhone2.val()+$cellPhone3.val())) {
			$cellPhone2.focus();
			alert("휴대폰 번호를 확인하여 주십시오.");
			return;
		} else if (!$locationId.val() || $locationId.val() == '' || $locationId.val().trim().length < 1) {
			$('#locationName', $formName).focus();
			alert("지역을 선택하여 주십시오.");
			return;
		} else if (!$storeIdList.val() || $storeIdList.val() == '' || $storeIdList.val().trim().length < 1) {
			$('#storeName', $formName).focus();
			alert("매장을 선택하여 주십시오.");
			return;
		} else {
				
				$("#viewName").html($testerName.val());
				$("#viewPhone").html($cellPhone1.val()+"-"+$cellPhone2.val()+"-"+$cellPhone3.val());
				$("#viewStore").html($('#modifyStoreIdList option:selected', $formName).text());
				
				name = $testerName.val();
				cellPhone1 = $cellPhone1.val();
				cellPhone2 = $cellPhone2.val();
				cellPhone3 = $cellPhone3.val();
				locationId = $('#modifyLocationId option:selected', $formName).val();
				storeId = $('#modifyStoreIdList option:selected', $formName).val();
				storeName = $('#storeIdList option:selected', $formName).text();
				
				$(".user-scene").hide();
				$(".user-scene.output").show();
				$(".check_txt_box").show();
		}
	};
	//샘플신청 등록
	$.view.storeSubmit = function() {
		var params = {
			"testerName" : name,
			"cellPhone" : cellPhone1+cellPhone2+cellPhone3,
			"storeId" : storeId,
			"locationId" : locationId,
			"storeName" : storeName
		};
		$.ib.json('/api/store/join', JSON.stringify(params), 'POST').done(function(data) {
			if (data && data.status == '200') {
				$("#report").animate({'opacity':'0'},500).attr("src",'');
				$("#report02").animate({'opacity':'0'},500).attr("src",'');
				setTimeout(function(){
					$("#report02").remove();
				},500);
				
				$("#end").attr("src","./assets/video/end.mp4").animate({'opacity':'1'},500).get(0).play();
				$(".user-scene").hide();
				$(".check_txt_box").hide();
				$(".user-scenes").removeClass("back_bg");
				
				$("#end").bind("ended", function() {
					$(".user-scene.end").fadeIn();
				});
			} else if (data && data.error && data.error.localizedMessage) {
				alert(data.error.localizedMessage);
			} else {
				alert( "데이터 수신중 오류가 발생하였습니다.\n잠시후 다시 실행하여주십시요." );	
			}
		}).fail(function() {
			alert( "데이터 수신중 오류가 발생하였습니다.\n잠시후 다시 실행하여주십시요." );
		});
	};
	

	$(window).load(function(){
        	
        /* 설정 부분 */ 
        var title = "바닐라코 cleanitzero";
       	var refer = 'www.cleanitzero.co.kr/main.html'; /*http:// or https://를 제회한 Full URL*/

        /* 라이브리 객체 생성 */
        livereReply = new Livere(livere_seq , refer , title);

        //livereReply.description = '페이스북, 네이버 디스크립션, 줄바꿈X ';   
        //livereReply.site = 'www.cleanitzero.co.kr';
        
        /* 고객사 회원 연동 : 고객사 아이디 */
        var livere = {
            name: "livere",     // 고정
            title: "livere",    // 변경가능
            loginGate: function() {},
            openUserPage: function() {}
        };

        var banilaco = {
            name: "banilaco",     // 고정
            title: "바닐라코",    // 변경가능
            loginGate: function() {},
            openUserPage: function() {}
        };

        /** 모듈 시작 (필수) **/
        livereLib.start();

        /* 라이브리 이벤트 */
        jQuery(livereLib).bind('livereEvent', function(event, param) {

            if (livereReply == null) return;

            var key = param['key'];
            var value = param['value'];
            var requestData = param['requestData'];

            switch (key) {
                case "livereCreationComplete":
                    break;
                case "getArticleHandlerComplete":
                    break;
                case "getArticleComplete":
                    break;
                case "livereDataInitComplete":
                    break;
                case "actionComplete":
                    break;
                case "renewMemberData":
                    break;
                case "writeDone":
                    //글작성 완료 후 실행됩니다. 개인정보 입력창을 띄우는 함수를 호출해 주세요.
                    break;
                case "livereLogout":
                    break;
                case "replyDeleteEvent":
                    break;
            }
        });
		
	});
	
	$(document).ready(function() {
		
		//휴대폰 번호 가운데 자리 숫자만 입력 제한
		$('#storeTesterForm', $(document)).on('keyup keypress blur', '#cellPhone2', function() {
			var currentId = $(this).attr('id');
			if (currentId == 'cellPhone2') {
				$(this).val($(this).val().trim().substring(0, 11));
				$(this).val($(this).val().replace(/(^\s+|[^0-9 ]+|\s+$)/g, ""));
			}
		});
		
		//휴대폰 번호 끝 자리 숫자만 입력 제한
		$('#storeTesterForm', $(document)).on('keyup keypress blur', '#cellPhone3', function() {
			var currentId = $(this).attr('id');
			if (currentId == 'cellPhone3') {
				$(this).val($(this).val().trim().substring(0, 11));
				$(this).val($(this).val().replace(/(^\s+|[^0-9 ]+|\s+$)/g, ""));
			}
		});

		//신규 샘플 신청 시 매장 검색
		$('#storeTesterForm', $(document)).on('change', '#locationId', function(e) {
			var locationId = $(this).val();
			if (locationId && locationId.length != "") {
				$.view.drawStoreList(locationId);
			}
		});
		
		//수정 샘플 신청 시 매장 검색
		$('#storeTesterForm', $(document)).on('change', '#modifyLocationId', function(e) {
			var locationId = $(this).val();
			if (locationId && locationId.length != "") {
				$.view.modifydrawStoreList(locationId);
			}
		});

		$('#storeTesterForm', $(document)).on('click', '.report #checkMyStore', function(e) {
			var $formName = $('#storeTesterForm', $(document));
			/*var locationId = $("#locationId", $formName).val();
			var storeId = $("#storeId", $formName).val();
			var storeName = $("#storeName", $formName).text();*/
			var locationId = $("#locationId option:selected", $formName).val();
			var storeId = $("#storeIdList option:selected", $formName).val();
			var storeName = $("#storeIdList option:selected", $formName).text();
			
			if(!locationId || locationId == "" || !storeName || storeId == "") {
				alert("매장을 선택하여 주십시오.");
				return;
			}
			var searchUrl = "http://www.banilaco.com/customer/customerStore.do?area_code="+locationId+"&searchText="+encodeURIComponent(storeName);
			$.view.popup(searchUrl, "viewMyStore", 1280, 1024);	
		});
		
		$('#storeTesterForm', $(document)).on('click', '.modify #checkMyStore', function(e) {
			var $formName = $('#storeTesterForm', $(document));
			/*var locationId = $("#locationId", $formName).val();
			var storeId = $("#storeId", $formName).val();
			var storeName = $("#storeName", $formName).text();*/
			var locationId = $("#modifyLocationId option:selected", $formName).val();
			var storeId = $("#modifyStoreIdList option:selected", $formName).val();
			var storeName = $("#modifyStoreIdList option:selected", $formName).text();
			
			if(!locationId || locationId == "" || !storeName || storeId == "") {
				alert("매장을 선택하여 주십시오.");
				return;
			}
			var searchUrl = "http://www.banilaco.com/customer/customerStore.do?area_code="+locationId+"&searchText="+encodeURIComponent(storeName);
			$.view.popup(searchUrl, "viewMyStore", 1280, 1024);	
		});

	});
})(jQuery);