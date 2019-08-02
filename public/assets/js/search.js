$( document ).ready(function() {

  function mainLogic(){

    var url = window.location.pathname;
    var searchValue = url.substring(url.lastIndexOf('/') + 1);
    console.log("searchValue ", searchValue);
    var noSearchResult = true;
    
  
    $.get("/api/allParks/" + searchValue, function(dbPark, err) {
    // window.location.href = "/";
    console.log('Park ', dbPark);
    console.log("err", err);

    if (dbPark.length > 0) {
      noSearchResult = false;
      var parkHeader = '<h3>Park Results</h3>';
      $('.park-results-head').append(parkHeader);
      $('.park-results-head').css({"border-bottom": "solid #000 2px"});
    }

      dbPark.forEach(function(parkInfo) {
        var parkId = parkInfo.park_id;
        var parkName = parkInfo.park_name;
        var parkRating = parkInfo.park_rating;

        var parkSearchText = '<div class="park-search-text" id="' + parkId + '">' +
                              '<p class="bold-font">' + parkName +
                              '<br /> Park Rating: ' + parkRating + '</p>' +
                              '</div>';
                              $('.park-results-list').append(parkSearchText);
      })
    })
    $.get("/api/allTrails/" + searchValue, function(dbTrail, err) {
      // window.location.href = "/";
      console.log('Trail ', dbTrail);
      console.log("err", err);

      if (dbTrail.length > 0) {
        noSearchResult = false;
        var trailHeader = '<h3>Trail Results</h3>';
        $('.trail-results-head').append(trailHeader);
        $('.trail-results-head').css({"border-bottom": "solid #000 2px"});
      }

      dbTrail.forEach(function(trailInfo) {
        var trailId = trailInfo.trail_id;
        var trailName = trailInfo.trail_name;
        var trailRating = trailInfo.trail_rating;

        var trailSearchText = '<div class="trail-search-text" id="' + trailId + '">' +
                              '<p class="bold-font">' + trailName +
                              '<br /> Trail Rating: ' + trailRating + '</p>' +
                              '</div>';
                              $('.trail-results-list').append(trailSearchText);
      })
      searchResult(noSearchResult);
    })
  }

  function searchResult(noResults){
    if (noResults) {
      $(".search-results-wrapper").html("<p class='bold-font'>No Search Results</p>");
    };
  };

  mainLogic();

  $(document).on("click", ".park-search-text", function() {
    event.preventDefault();
    var clickedId = $(this).attr("id");
    window.location.href = "/park/" + clickedId;
  });

  $(document).on("click", ".trail-search-text", function() {
    event.preventDefault();
    var clickedId = $(this).attr("id");
    window.location.href = "/trail/" + clickedId;
  });
});
