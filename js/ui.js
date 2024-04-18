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
})
