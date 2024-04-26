//브라우저 체크
var agt = navigator.userAgent.toLowerCase();    
if(agt.indexOf("msie 8") != -1 && agt.indexOf("trident/4.0") == -1 && agt.indexOf("trident/5.0") == -1 && agt.indexOf("trident/6.0") == -1){
	alert ("본 사이트는 익스플로러10 이상에 최적화되어 있습니다.");
}

//url 복사
function copyToClipboard(val) {
  var t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
}

function copyToUrl(){
 copyToClipboard('http://cleanitzero.co.kr');
  alert('URL이 클립보드에 복사되었습니다.');
}

function copyToYoutube(){
 copyToClipboard('https://youtu.be/GbnPUiO3f34');
  alert('영상 URL이 클립보드에 복사되었습니다.');
}


$(document).ready(function() {
	//fullpage
	$('.main').fullpage({
		sectionsColor: ['#f0f0f0', '#fff', '#fff'],
		scrollOverflow: true,
		css3:true,
		easingcss3: 'cubic-bezier(1,0,0,1)',
		scrollingSpeed: 1000,
		afterLoad: function(anchorLink, index) {
			pauseYoutube()
			
			if (index ===4) {
				playYoutube1();
			}
		}
		

		
	});
	
	//slider
	 $('.product_slider').bxSlider({
		mode: 'fade',
		pager: true
	});
	
	$(".pro_slider").bxSlider({
		mode: 'fade',
		pager : true
	});
	
	$(".product_slider .visual a").mouseover(function(){
		$(this).children(".bg").fadeIn();
	});
	
	$(".product_slider .visual a").mouseleave(function(){
		$(this).children(".bg").fadeOut();
	});
	
	//영상 컨텐츠
	/*
	$(".video_tab li a").click(function(){
		$(".video_tab li").removeClass("on");
		$(".video iframe").hide();
		$(this).parent("li").addClass("on");
		stopYoutube();
	});
	
	$(".video_box .video a").click(function(){
		$(".video iframe").hide();
		$(this).children("iframe").show();
	});
	*/

	$(".menu_list li a").click(function(){
		menuClose();
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

//풀페이지 리빌드 라이브리 높이값 찾기위함
/*
window.onload = function(){
	//fullpage
	setTimeout(function(){
		$.fn.fullpage.reBuild();
	},2000);
}*/

//메뉴
function menuOpen(){
	$(".menu").addClass("on");
	$(".menu_bg").fadeIn();
	$.fn.fullpage.setMouseWheelScrolling(false);
}

function menuClose(){
	$(".menu").removeClass("on");
	$(".menu_bg").fadeOut();
	$.fn.fullpage.setMouseWheelScrolling(true);
}

//영상 컨텐츠
function oneVideo(){
	$(".video_box .video").hide();
	$(".video_box .video.one").show();
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
	$.fn.fullpage.moveTo(5);
}

function slide06(){
	$.fn.fullpage.moveTo(6);
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
	$(".video_box .video iframe").show();
	$(".video_box .point").css("z-index","9");
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
