$( document ).ready(function() {

  var url = window.location.pathname;
          var id = url.substring(url.lastIndexOf('/') + 1);
          var idNbr = parseInt(id);
          // console.log("url id ", id);

  // var pointsArray = [['Distance', 'Elevation']];
  var pointsArray = [];

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

    var trailType = [];
    if (dbTrail.gravel) { trailType.push('Gravel')};
    if (dbTrail.paved) {trailType.push("Paved")};
    if (dbTrail.single_track) {trailType.push("Single Track")};
    if (dbTrail.mulch) {trailType.push("Mulch")};
    if (dbTrail.sidewalk) {trailType.push("Sidewalk")};
    if (dbTrail.dirt) {trailType.push("Dirt")};
    if (dbTrail.grass) {trailType.push("Grass")};
    if (!trailType) {trailType.push("Not Provided")};

    var trailAct = [];
    if (dbTrail.hiking) { trailAct.push("Hiking")};
    if (dbTrail.mtb) { trailAct.push("Mountain Biking")};
    if (dbTrail.walking) { trailAct.push("Walking")};
    if (dbTrail.jogging) { trailAct.push("Jogging")};
    if (dbTrail.trail_running) { trailAct.push("Trail Running")};
    if (dbTrail.biking) { trailAct.push("Biking")};
    var trailActList = trailAct.toString();

    var trailDiff;
    var trailDiffImg;
    if (dbTrail.trail_diff == 1) {
      trailDiff = "Easy";
      trailDiffImg = '<img src="/assets/images/green_circle.png" alt="Green Circle" class="diff-img">';
    } else if (dbTrail.trail_diff == 2) {
      trailDiff = "Moderate";
      trailDiffImg = '<img src="/assets/images/blue_square.png" alt="Blue Square" class="diff-img">';
    } else if (dbTrail.trail_diff == 3) {
      trailDiff = "Difficult";
      trailDiffImg = '<img src="/assets/images/black_diamond.png" alt="Black Diamond" class="diff-img">';
    } else if (dbTrail.trail_diff == 4) {
      trailDiff = "Most Difficult";
      trailDiffImg = '<img src="/assets/images/double_black_diamond.png" alt="Double Black Diamond" class="diff-img">'
    };

    var trailText = '<div>' +  '<span class="bold-font">Trail Description:</span> ' + dbTrail.trail_desc_long + '</div>' + 
                  '<div>' + '<span class="bold-font">Length:</span> ' + lengthMiles + ' miles</div>' + 
                  '<div>' + '<span class="bold-font">Rating:</span> ' + dbTrail.trail_rating + '</div>' + 
                  '<div>' + '<span class="bold-font">Difficulty:</span> ' + trailDiffImg + ' ' + trailDiff + '</div>' + 
                  '<div>' + '<span class="bold-font">Trail Type:</span> ' + trailType .join(", ") + '</div>' +
                  '<div>' + '<span class="bold-font">Activities:</span> ' + trailAct.join(", ") + '</div>';
    $('.single-trail-text').append(trailText);

    var modalImageName = '<h5 class="modal-title" id="imageModalLabel">' + dbTrail.trail_name + '</h5>';
                $('.modal-title-wrapper').append(modalImageName);

    // dbTrail.Tracks[0].Cords.forEach(function(chartPoints) {
    // // var cordArray = [];
    //   pointsArray.push([chartPoints.distance, chartPoints.elev]);
    // });

    for (var i = 0; i < dbTrail.Tracks[0].Cords.length;) {
      // pointsArray.push([parseFloat(dbTrail.Tracks[0].Cords[i].distance), parseFloat(dbTrail.Tracks[0].Cords[i].elev)]);
      var distanceMiles = Math.round(parseFloat(dbTrail.Tracks[0].Cords[i].distance * 0.000621371) * 100) / 100;
      var elevFeet = Math.round(parseFloat(dbTrail.Tracks[0].Cords[i].elev * 3.28084) * 100) / 100;
      var toolTip = '<p class="chart-tooltip"> <b>' + distanceMiles + ' </b>miles' + '<br /><b>' + elevFeet + ' </b>feet' + '</p>';
      // pointsArray.push([Math.round(parseFloat(dbTrail.Tracks[0].Cords[i].distance * 0.000621371) * 100) / 100, Math.round(parseFloat(dbTrail.Tracks[0].Cords[i].elev * 3.28084) * 100) / 100]);
      pointsArray.push([distanceMiles, elevFeet, toolTip]);
      i = i + 4;
      // i++;
    };

    console.log('pointsArray ', pointsArray);

    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {          
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Distance');
        data.addColumn('number', 'Elevation');
        data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
        data.addRows(pointsArray);

        var options = {
          // theme: "maximized",
          hAxis: {title: 'Miles',  titleTextStyle: {color: '#333'}},
          vAxis: {title: 'Feet',  titleTextStyle: {color: '#333'}},
          tooltip: { isHtml: true },
          legend: 'none'
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        console.log('data ', data);
        chart.draw(data, options);
      }
    
  })

  $(document).on("click", ".park-name-header", function() {
    event.preventDefault();
    var clickedId = $(this).attr("id");
    // var clickedIdNbr = parseInt(clickedId);
    // console.log("clickedId ", clickedId);
    // console.log("clickedIdNbr ", clickedIdNbr);
    window.location.href = "/park/" + clickedId;
  })

  $('#imageModal').on('hidden.bs.modal', function (e) {
    // $('.modal-body').text("");
    $('#container').text("");
  })

});