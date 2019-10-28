
var map, infoWindow;
var runFunction = false;
      function initTrailMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          // center: {lat: 39.0997, lng: -94.5786},
          // zoom: 10
        });
        infoWindow = new google.maps.InfoWindow;

        //Get all the parks and place on the map
        // function trailMarker(callback) {
        function trailMarker() {
          var url = window.location.pathname;
          var id = url.substring(url.lastIndexOf('/') + 1);
          var idNbr = parseInt(id);
          console.log("url id ", id);
          var pointsArray = [];

          $.get("/api/trail/" + idNbr, function(dbTrail, err) {
          console.log('Trail ', dbTrail);
          console.log("err", err);

          // Joe test adding trailId.js logic - start
          var parkIdNbr = dbTrail.fk_park_id;
    $.get("/api/parkName/" + parkIdNbr, function(dbPark, err) {
      console.log('Park ', dbPark);
      console.log("err", err);
      // var parkId = markerElem.park_id.toString();
      var parkName = '<h1 class="park-name-header" id="' + parkIdNbr + '">' + dbPark.park_name + '</h1>';
      $('.park-header').append(parkName);
      // runFunction = true;
      // console.log("runFunction ", runFunction);
      pageLoading();
    });

    var trailName = '<h3 class="trail-name-header">' + dbTrail.trail_name + '</h3>';
    $('.trail-header').append(trailName);

    var lengthMeters = dbTrail.Tracks[0].Cords.slice(-1)[0];
    var lengthMetersNbr = parseFloat(lengthMeters.distance);
    var lengthMiles = Math.round((lengthMetersNbr * 0.000621371) * 100) / 100
    // var lengthKilometers = Math.round((lengthMetersNbr * 0.001) * 100) / 100
    var ascentMetersNbr = parseFloat(lengthMeters.ascent);
    var ascentFt = Math.round((ascentMetersNbr * 3.28084) * 1) / 1

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
                  '<div>' + '<span class="bold-font">Total Ascent:</span> ' + ascentFt + ' feet</div>' + 
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

      $(window).resize(function(){
        drawChart();
      });
      // Joe test adding trailId.js logic - start


          var getFirstCordsArray = dbTrail.Tracks[0].Cords.slice(0)[0];
          var getFirtsCordsLat = parseFloat(getFirstCordsArray.lat);
          var getFirtsCordsLon = parseFloat(getFirstCordsArray.lon);
          console.log('getFirtsCordsLat ' + getFirtsCordsLat)

          var pos = {
            lat: parseFloat(getFirtsCordsLat),
            lng: parseFloat(getFirtsCordsLon)
          };
          map.setCenter(pos);
          map.setZoom(14);
          map.setMapTypeId(google.maps.MapTypeId.HYBRID);
          
            
            dbTrail.Tracks.forEach(function(track) {
              var cordArray = [];
              track.Cords.forEach(function(cords) {
                cordArray.push({lat: parseFloat(cords.lat), lng: parseFloat(cords.lon)});
              })
              console.log("cordArray lat: " + cordArray[0].lat);
              console.log("cordArray lng: " + cordArray[0].lng);

              var latLngBounds = new google.maps.LatLngBounds();
                for(var i = 0; i < cordArray.length; i++) {
                  latLngBounds.extend(cordArray[i]);
                };
              
              var trailPath = new google.maps.Polyline({
                path: cordArray,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
              });
              trailPath.setMap(map);
              map.fitBounds(latLngBounds);

              track.Images.forEach(function(images) {
                var imageId = images.image_id.toString();
                var smImage = "http://hikekc.s3.us-east-2.amazonaws.com/" + images.aws_image_key;

                var pointImage = new google.maps.LatLng(
                  parseFloat(images.lat),
                  parseFloat(images.lon));
                var markerImage = new google.maps.Marker({
                  map: map,
                  position: pointImage,
                  icon: "/assets/images/camera-icon-25.png",
                });

                markerImage.addListener('click', function() {
                  // infoWindow.setContent('<div class="image-click" id="' + imageId + '">' + '<img src="' + smImage + '" class="info-window-image" alt="Trail Image" />' + 
                  // '</div>');
                  // infoWindow.setContent('<div class="image-click" id="' + imageId + '">' + '</div>');
                  // infoWindow.open(map, markerImage);

                  window.loadImage(smImage, function (img) {
                    console.log("loadImage");
                    if (img.type === "error") {
                        console.log("couldn't load image:", img);
                    } else {
                      // window.EXIF.getData(img, function () {
                      EXIF.getData(img, function () {
                        console.log("done!");
                        var orientation = window.EXIF.getTag(this, "Orientation");
                        var canvas = window.loadImage.scale(img, {orientation: orientation || 0, canvas: true});
                        console.log("canvas ", canvas);
                        console.log("orientation ", orientation);
                        document.getElementById("container").appendChild(canvas);
                        // or using jquery $("#container").append(canvas);

                        if (orientation === 1) {
                          $(".modal").addClass("horizontal");
                          $(".modal").removeClass("vertical");
                        } else {
                          $(".modal").addClass("vertical");
                          $(".modal").removeClass("horizontal");
                        }

                        $('#imageModal').modal('show')
                      });
                    }
                  });
                });

              })
            })
              var trailId = dbTrail.trail_id.toString();
              var name = dbTrail.trail_name;
              var rating = dbTrail.trail_rating;
              var lengthMeters = dbTrail.Tracks[0].Cords.slice(-1)[0];
              var lengthMetersNbr = parseFloat(lengthMeters.distance);
              var lengthMiles = Math.round((lengthMetersNbr * 0.000621371) * 100) / 100
              // var lengthKilometers = Math.round((lengthMetersNbr * 0.001) * 100) / 100

              var point = new google.maps.LatLng(
                parseFloat(dbTrail.Tracks[0].Cords[0].lat),
                parseFloat(dbTrail.Tracks[0].Cords[0].lon));
              var marker = new google.maps.Marker({
                map: map,
                position: point,
                // label: trailId,
                icon: "/assets/images/th-icon2-25.png",
              });
              // marker.addListener('click', function() {
              //   infoWindow.setContent('<div class="trail-click" id="' + trailId + '">' + '<span class="bold-font">' + name + '</span>' + '<br>' + 
              //   'Rating: ' + rating + '<br>' + 'Length: ' + lengthMiles + ' miles</div>');
              //   infoWindow.open(map, marker);
              // });
            })
        // callback ();
      }
      trailMarker()    
      // trailMarker( function(){
      //   runFunction = true;
      //   console.log('runFunction');
      // }); 

      }

      // $(document).on("click", ".trail-click", function() {
      //   event.preventDefault();
      //   var clickedId = $(this).attr("id");
      //   window.location.href = "/trail/" + clickedId;
      // })

      // $(document).on("click", ".image-click", function() {
      //   event.preventDefault();
      //   var imageClickedId = $(this).attr("id");
      //   var imageClickedSrc = $(this).find('canvas').attr('id');
      //   console.log("imageClickedId ", imageClickedId);
      //   console.log("imageClickedSrc ", imageClickedSrc);

      //   var modalImageSrc = '<img src="' + imageClickedSrc + '" alt="Trail Image" />';
      //   //   $('.modal-body').append(modalImageSrc);

      //   // $('#imageModal').modal('show')

      //   window.loadImage(imageClickedSrc, function (img) {
      //     console.log("loadImage");
      //       if (img.type === "error") {
      //           console.log("couldn't load image:", img);
      //       } else {
      //           // window.EXIF.getData(img, function () {
      //           EXIF.getData(img, function () {
      //               console.log("done!");
      //               var orientation = window.EXIF.getTag(this, "Orientation");
      //               var canvas = window.loadImage.scale(img, {orientation: orientation || 0, canvas: true});
      //               console.log("canvas ", canvas);
      //               console.log("orientation ", orientation);
      //               document.getElementById("container").appendChild(canvas);
      //               // or using jquery $("#container").append(canvas);
      //               $('#imageModal').modal('show')
      //           });
      //       }
      //   });
      // })

$( document ).ready(function() {
  $(document).on("click", ".park-name-header", function() {
    event.preventDefault();
    var clickedId = $(this).attr("id");
    window.location.href = "/park/" + clickedId;
    // var clickedIdNbr = parseInt(clickedId);
    // console.log("clickedId ", clickedId);
    // console.log("clickedIdNbr ", clickedIdNbr);
    // window.history.back();
  })

  $('#imageModal').on('hidden.bs.modal', function (e) {
    // $('.modal-body').text("");
    $('#container').text("");
  })
});

// document.onreadystatechange = function () {
//   var state = document.readyState
//   console.log("runFunction 2 ", runFunction);
//   if (state == 'complete' && runFunction == true) {
//           // document.getElementById('interactive');
//          document.getElementById('loading').style.visibility="hidden";
//          console.log("runFunction 3 ", runFunction);
//   }
// }

// do {
//   console.log("runFunction 2 ", runFunction);
//   if ( runFunction == true) {
//           // document.getElementById('interactive');
//          document.getElementById('loading').style.visibility="hidden";
//          console.log("runFunction 3 ", runFunction);
//   }
// } while (runFunction == false);

function pageLoading() {
  document.getElementById('loading').style.visibility="hidden";
  console.log('pageLoading');
};
