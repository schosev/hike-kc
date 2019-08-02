$( document ).ready(function() {
  $.get("/api/parks", function(dbPark, err) {
    console.log('Park ', dbPark);
    console.log("err", err);

    dbPark.forEach(function(parkInfo) {
      var totalTrailMeterNbr = parseFloat(parkInfo.total_trail_lngth_meters)
      var totalMiles = Math.round((totalTrailMeterNbr * 0.000621371) * 100) / 100
      var parkText = '<div class="park-list-text">' +
                    '<div class="park-click" id="' + parkInfo.park_id + '">' +
                    '<div>' + '<span class="bold-font">Marker:</span> ' + parkInfo.park_id + '</div>' +
                    '<div class="bold-font">' + parkInfo.park_name + '</div>' +
                    '</div>' +
                    '<div>' + parkInfo.park_address + '</div>' + 
                    '<div><span class="bold-font">Total Trails:</span> ' + totalMiles + ' Miles</div>' +
                    '<div>' +  '<span class="bold-font">Park Description:</span> ' + parkInfo.park_desc_short + '</div>' + 
                    '<div>' + '<span class="bold-font">Rating:</span> ' + parkInfo.park_rating + '</div>' + 
                    '</div>' +
                    '</div>'
                    // '<hr class="hr-separator">';
      $('.park-list').append(parkText);
    })
  })

  $( ".search-btn" ).click(function() {
    event.preventDefault();
    console.log("inside search button click");
    var searchValue = $("#search-value").val().trim().toLowerCase();
    window.location.href = "/search/" + searchValue;
  $('#search-value').val('');
  })
});