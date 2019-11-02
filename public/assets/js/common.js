$( document ).ready(function() {

  $( ".search-btn" ).click(function() {
    event.preventDefault();
    console.log("inside search button click");
    var searchValue = $("#search-value").val().trim().toLowerCase();
    window.location.href = "/search/" + searchValue;
  $('#search-value').val('');
  })

  $('.carousel').carousel({
    interval: 3000
  })

  var d = new Date();
  var year = d.getFullYear();
  var copyWright = 'Copywright &copy; ' +  year + ' HikeKC.com' 
  $('.copywright').append(copyWright);

  // $(window).resize(function(){
  //   screenSize();
  // });

  // function screenSize() {
  //   var screenWidth = screen.width

  //   if (screenWidth < 768) {
  //     $(".sm-screen").removeClass("hidden");
  //     $(".lg-screen").addClass("hidden");
  //     $(".mapDiv2").attr('id', 'map');
  //   } else {
  //     $(".lg-screen").removeClass("hidden");
  //     $(".sm-screen").addClass("hidden");
  //     $(".mapDiv1").attr('id', 'map');
  //   }
  // }
  // screenSize();

});

// document.onreadystatechange = function () {
//   var state = document.readyState
//   if (state == 'complete') {
//           // document.getElementById('interactive');
//          document.getElementById('loading').style.visibility="hidden";
//   }
// }