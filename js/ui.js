$(function(){
  //풀페이지
  var myFullpage = new fullpage('#fullpage', {
    afterLoad: function(origin, destination){
      var sectionId = destination.item.getAttribute('id'); // 현재 섹션의 ID 가져오기
      shuffle(sectionId); // 해당 섹션의 타이틀만 셔플
    },
    onLeave: function(origin, destination, direction){
      resetShuffle(); 
    }
  });

  function shuffle(sectionId){
    var tit = $("#" + sectionId + " .page_tit").text(); // 해당 섹션의 타이틀 가져오기
    $('#' + sectionId + ' .page_tit span').shuffleText(tit);
  }

  function resetShuffle(sectionId){
    $(".page_tit span").html('');
  }


  // var duration = 15 * 1000;
  // var animationEnd = Date.now() + duration;
  // var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  // function randomInRange(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  // var interval = setInterval(function() {
  //   var timeLeft = animationEnd - Date.now();

  //   if (timeLeft <= 0) {
  //     return clearInterval(interval);
  //   }

  //   var particleCount = 50 * (timeLeft / duration);
  //   // since particles fall down, start a bit higher than random
  //   confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  //   confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  // }, 250);
})

