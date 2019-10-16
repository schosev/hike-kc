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
        var parkTrailLengthNbr = parseFloat(parkInfo.total_trail_lngth_meters);
        var parkLengthMiles = Math.round((parkTrailLengthNbr * 0.000621371) * 100) / 100

        var parkSearchText = '<div class="park-search-text" id="' + parkId + '">' +
                              '<p class="bold-font">' + parkName +
                              '<br /> Park Rating: ' + parkRating + 
                              '<br /> Total of all Trails: ' + parkLengthMiles + ' Miles</p>' +
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

        // var trailLengthMeters = trailInfo.Tracks[0].Cords.slice(-1)[0];
        var trailLengthMetersNbr = parseFloat(trailInfo.trail_length_meters);
        var trailLengthMiles = Math.round((trailLengthMetersNbr * 0.000621371) * 100) / 100
        // var TrailLengthKilometers = Math.round((lengthMetersNbr * 0.001) * 100) / 100

        var trailType = [];
        if (trailInfo.gravel) { trailType.push('Gravel')};
        if (trailInfo.paved) {trailType.push("Paved")};
        if (trailInfo.single_track) {trailType.push("Single Track")};
        if (trailInfo.mulch) {trailType.push("Mulch")};
        if (trailInfo.sidewalk) {trailType.push("Sidewalk")};
        if (trailInfo.dirt) {trailType.push("Dirt")};
        if (trailInfo.grass) {trailType.push("Grass")};
        if (!trailType) {trailType.push("Not Provided")};
    
        var trailAct = [];
        if (trailInfo.hiking) { trailAct.push("Hiking")};
        if (trailInfo.mtb) { trailAct.push("Mountain Biking")};
        if (trailInfo.walking) { trailAct.push("Walking")};
        if (trailInfo.jogging) { trailAct.push("Jogging")};
        if (trailInfo.trail_running) { trailAct.push("Trail Running")};
        if (trailInfo.biking) { trailAct.push("Biking")};

        var trailDiff;
        var trailDiffImg;
        if (trailInfo.trail_diff == 1) {
          trailDiff = "Easy";
          trailDiffImg = '<img src="/assets/images/green_circle.png" alt="Green Circle" class="diff-img">';
        } else if (trailInfo.trail_diff == 2) {
          trailDiff = "Moderate";
          trailDiffImg = '<img src="/assets/images/blue_square.png" alt="Blue Square" class="diff-img">';
        } else if (trailInfo.trail_diff == 3) {
          trailDiff = "Difficult";
          trailDiffImg = '<img src="/assets/images/black_diamond.png" alt="Black Diamond" class="diff-img">';
        } else if (trailInfo.trail_diff == 4) {
          trailDiff = "Most Difficult";
          trailDiffImg = '<img src="/assets/images/double_black_diamond.png" alt="Double Black Diamond" class="diff-img">'
        };

            var trailSearchText = '<div class="trail-search-text" id="' + trailId + '">' +
                              '<p class="bold-font">' + trailName +
                              '<br /> Trail Rating: ' + trailRating + 
                              '<br /> Trail Length: ' + trailLengthMiles + ' Miles' + 
                              '<br /> Difficulty: ' + trailDiffImg + ' ' + trailDiff +
                              '<br /> Trail Type: ' + trailType.join(", ") +
                              '<br /> Activities: ' + trailAct.join(", ") +
                              '</p>' +
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
