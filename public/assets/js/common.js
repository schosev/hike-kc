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
  var copyWright = '&copy; ' +  year + ' HikeKC.com' 
  $('.copywright').append(copyWright);

});

// document.onreadystatechange = function () {
//   var state = document.readyState
//   if (state == 'complete') {
//           // document.getElementById('interactive');
//          document.getElementById('loading').style.visibility="hidden";
//   }
// }