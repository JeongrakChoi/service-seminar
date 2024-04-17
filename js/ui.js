$(function(){
  //풀페이지
  var myFullpage = new fullpage('#fullpage', {
    afterLoad: function(){
      shuffle(); // 첫 번째 로딩 시에는 실행
    },
    onLeave: function(){
      resetShuffle()
    }
  });


  function shuffle(){
    var isVisible1 = false;
    var tit1 = $(".page_tit").text();

    if (!isVisible1){
      $('.active .page_tit span').shuffleText(tit1);
      isVisible1=true;
    }
  }

  function resetShuffle(){
    $(".page_tit span").html('');
  }


})

