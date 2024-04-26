$(document).ready(function() {
	$('.main').fullpage({
		sectionsColor: ['#f0f0f0', '#fff', '#fff'],
		scrollOverflow: true,
		css3:true,
		easingcss3: 'cubic-bezier(1,0,0,1)',
		scrollingSpeed: 1000,
		resize:true,
		responsive: true,
		afterLoad: function(anchorLink, index) {
			if (index === 2) {
				alert('* 아이폰 사용자의 경우, iOS 정책으로 인하여 일부 앱(네이트온 APP, 카카오스토리 APP)내에서 캠페인 사이트 연결시 샘플신청이 제한될 수 있습니다.');
			}
			if ( index === 4) {
				$.fn.fullpage.reBuild();
			}
		}
	});
	
	//slider
	$('.pro_slide').bxSlider({
		pager: true
	});
	
	$(".menu_list li a").click(function(){
		menuClose();
	});
	
	$(".user-scene.end a").click(function(){
		alert('캠페인 기간 (3.26~4.22) 내 신청을 완료하신 분들에게는 샘플 수령 안내 문자(LMS)가 신청 다음날 일괄 발송됩니다.');
	});
	
	$(".muted_btn").click(function(){
	  $(this).toggleClass("off");
	  
	  if ( $(this).hasClass("off") == 1 ){
		   $(".fixed-video video").prop('muted',true)
	  } else{
			$(".fixed-video video").prop('muted',false)  
	  }
   });
});


$(window).resize(function(){
	 $.fn.fullpage.reBuild();
});


$("document").ready(function() {
	jQuery(window).trigger("orientationchange"); // 최초 페이지 로딩 시 가로, 세로를 모르기 때문에 trigger로 처리
});

$(window).bind("orientationchange", function(e) { // 가로세로 전환 처리
	var orientation = window.orientation;
	if (orientation == 90 || orientation == -90) {
		 $("#warning-message").css("display","block");
	} else {
		$("#warning-message").css("display","none");
	}
});



//메뉴
function menuOpen(){
	$(".menu").addClass("on");
	$(".menu_bg").fadeIn();
}

function menuClose(){
	$(".menu").removeClass("on");
	$(".menu_bg").fadeOut();
}


//영역 anchor
function slide01(){
	$.fn.fullpage.moveTo(1);
}

function slide02(){
	$.fn.fullpage.moveTo(2);
}

function slide03(){
	$.fn.fullpage.moveTo(3);
}

function slide04(){
	$.fn.fullpage.moveTo(4);
}

function slide05(){
	$.fn.fullpage.moveTo(5,2);
}


/**
 * Youtube API 로드
 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/**
 * onYouTubeIframeAPIReady 함수는 필수로 구현해야 한다.
 * 플레이어 API에 대한 JavaScript 다운로드 완료 시 API가 이 함수 호출한다.
 * 페이지 로드 시 표시할 플레이어 개체를 만들어야 한다.
 */
var player1;

function onYouTubeIframeAPIReady() {
	player1 = new YT.Player('videoOne', {
             height: '720',
			 width: '1028',
			 videoId: 'GbnPUiO3f34',
			 playerVars: {
				 'autoplay':0,
				 'controls': '1',
				 'wmode': 'transparent',
				 'autohide' : 0,
				 'rel' : 0
			},
		events: {
			'onReady': onPlayerReady
		}
	});
}

function playYoutube1() {
	player1.playVideo();
	$("#videoOne").show();
}

function pauseYoutube() {
	player1.pauseVideo();
}

function stopYoutube() {
	player1.seekTo(0, true);
	player1.stopVideo();
}

function onPlayerReady() {
    player1.setPlaybackQuality('hd720');
}