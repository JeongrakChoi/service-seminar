$(function(){
  $("h1 img").click(function(){
    $(".intro").addClass("active")

    setTimeout(function(){
      $(".intro").addClass("end")
    },4200)

    setTimeout(function(){
      $(".intro").removeClass("active end")
    },5500)
  })
})

