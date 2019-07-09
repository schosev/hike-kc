$( document ).ready(function() {

  var url = window.location.pathname;
          var id = url.substring(url.lastIndexOf('/') + 1);
          var idNbr = parseInt(id);
          // console.log("url id ", id);

  $.get("/api/trail/" + idNbr, function(dbTrail, err) {
    console.log('Trail.js ', dbTrail);
    console.log("err", err);

    var parkIdNbr = dbTrail.fk_park_id;
    $.get("/api/parkName/" + parkIdNbr, function(dbPark, err) {
      console.log('Park ', dbPark);
      console.log("err", err);
      // var parkId = markerElem.park_id.toString();
      var parkName = '<h1 class="park-name-header" id="' + parkIdNbr + '">' + dbPark.park_name + '</h1>';
      $('.park-header').append(parkName);
    });

    var trailName = '<h3 class="trail-name-header">' + dbTrail.trail_name + '</h3>';
    $('.trail-header').append(trailName);

    var lengthMeters = dbTrail.Tracks[0].Cords.slice(-1)[0];
    var lengthMetersNbr = parseFloat(lengthMeters.distance);
    var lengthMiles = Math.round((lengthMetersNbr * 0.000621371) * 100) / 100
    // var lengthKilometers = Math.round((lengthMetersNbr * 0.001) * 100) / 100

    var trailType = "";
    if (dbTrail.gravel) { trailType = 'Gravel'}
    else if (dbTrail.paved) {trailType = "Paved"}
    else if (dbTrail.single_track) {trailType = "Single Track"}
    else if (dbTrail.mulch) {trailType = "Mulch"}
    else {trailType = "Not Provided"};

    var trailAct = [];
    if (dbTrail.hiking) { trailAct.push("Hiking")};
    if (dbTrail.mtb) { trailAct.push("Mountain Biking")};
    if (dbTrail.walking) { trailAct.push("Walking")};
    var trailActList = trailAct.toString();

    var trailText = '<div class="bold-font">' + dbTrail.trail_name + '</div>' +
                  '</div>' +
                  '<div>' +  '<span class="bold-font">Trail Description:</span> ' + dbTrail.trail_desc + '</div>' + 
                  '<div>' + '<span class="bold-font">Length:</span> ' + lengthMiles + ' miles</div>' + 
                  '<div>' + '<span class="bold-font">Rating:</span> ' + dbTrail.trail_rating + '</div>' + 
                  '<div>' + '<span class="bold-font">Trail Type:</span> ' + trailType + '</div>' +
                  '<div>' + '<span class="bold-font">Activities:</span> ' + trailActList + '</div>' +
                  // '</div>' +
                  '<hr class="hr-separator">';
    $('.single-trail-text').append(trailText);
  })

  $(document).on("click", ".park-name-header", function() {
    event.preventDefault();
    var clickedId = $(this).attr("id");
    // var clickedIdNbr = parseInt(clickedId);
    // console.log("clickedId ", clickedId);
    // console.log("clickedIdNbr ", clickedIdNbr);
    window.location.href = "/park/" + clickedId;
  })

});