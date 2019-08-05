$( document ).ready(function() {

  $( ".search-btn" ).click(function() {
    event.preventDefault();
    console.log("inside search button click");
    var searchValue = $("#search-value").val().trim().toLowerCase();
    window.location.href = "/search/" + searchValue;
  $('#search-value').val('');
  })
});