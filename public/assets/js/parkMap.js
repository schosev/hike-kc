
var map, infoWindow;
function initParkMap() {
  console.log("iniTrailMap");
  map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: 39.0997, lng: -94.5786},
    // zoom: 10
  });
  infoWindow = new google.maps.InfoWindow;

  //Get all the parks and place on the map
  function trailMarkers() {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    var idNbr = parseInt(id);
    console.log("url id ", id);

    $.get("/api/onePark/" + idNbr, function (dbPark, err) {
      console.log('Park ', dbPark);
      console.log("err", err);

      pageLoading();
      // joe test - logic from parkCordArray.js start
      var parkName = '<h1 class="park-name-header">' + dbPark.park_name + '</h1>';
          $('.park-header').append(parkName);

          var parkDetails = dbPark.park_desc_long;
          $('.park-details').append(parkDetails);

            dbPark.Trails.forEach(function(trailInfo) {
              var lengthMeters = trailInfo.Tracks[0].Cords.slice(-1)[0];
              var lengthMetersNbr = parseFloat(lengthMeters.distance);
              var lengthMiles = Math.round((lengthMetersNbr * 0.000621371) * 100) / 100
              // var lengthKilometers = Math.round((lengthMetersNbr * 0.001) * 100) / 100

              var trailType = [];
              if (trailInfo.gravel) { trailType.push('Gravel')};
              if (trailInfo.paved) {trailType.push("Paved")};
              if (trailInfo.single_track) {trailType.push("Single Track")};
              if (trailInfo.mulch) {trailType.push("Mulch")};
              if (trailInfo.sidewalk) {trailType.push("Sidewalk")};
              if (trailInfo.dirt) {trailType.push("Dirt")};
              if (trailInfo.grass) {trailType.push("Grass")};
              if (!trailType) {trailType.push("Not Provided")};

              // hiking, mtb, walking, jogging, trail_running, biking
              var trailAct = [];
              if (trailInfo.hiking) { trailAct.push("Hiking")};
              if (trailInfo.mtb) { trailAct.push("Mountain Biking")};
              if (trailInfo.walking) { trailAct.push("Walking")};
              if (trailInfo.jogging) { trailAct.push("Jogging")};
              if (trailInfo.trail_running) { trailAct.push("Trail Running")};
              if (trailInfo.biking) { trailAct.push("Biking")};

              var trailText = '<div class="trail-aside-wrapper">' +
                            '<div class="trail-click" id="' + trailInfo.trail_id + '">' +
                            '<div>' + '<span class="bold-font">Marker:</span> ' + trailInfo.trail_id + '</div>' +
                            '<div class="bold-font">' + trailInfo.trail_name + '</div>' +
                            '</div>' +
                            '<div>' +  '<span class="bold-font">Trail Description:</span> ' + trailInfo.trail_desc_short + '</div>' + 
                            '<div>' + '<span class="bold-font">Length:</span> ' + lengthMiles + ' miles</div>' + 
                            '<div>' + '<span class="bold-font">Rating:</span> ' + trailInfo.trail_rating + '</div>' + 
                            '<div>' + '<span class="bold-font">Trail Type:</span> ' + trailType.join(", ") + '</div>' +
                            '<div>' + '<span class="bold-font">Activities:</span> ' + trailAct.join(", ") + '</div>' +
                            '</div>';
                            // '<hr class="hr-separator">';
              $('.trail-aside').append(trailText);

            })
              // joe test - logic from parkCordArray.js end


      var pos = {
        lat: parseFloat(dbPark.park_lat),
        lng: parseFloat(dbPark.park_lon)
      };
      map.setCenter(pos);
      map.setZoom(15);
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);

      var pathColorArray = ["#ff3300", "#00ffff", "#6600cc", "#660066", "#2e5cb8", "#ff6600"];
      var connectorTrailColor = "#ffff00";
      var pathColor = '#000';
      var x = 0;

      var parkCordArray = [];
      dbPark.Trails.forEach(function (trail) {
        var connectorTrail = trail.connector_trail;
        if (connectorTrail) {
          pathColor = connectorTrailColor
        } else {
          pathColor = pathColorArray[x]
        };

        trail.Tracks.forEach(function (track) {
          var cordArray = [];
          track.Cords.forEach(function (cords) {
            cordArray.push({ lat: parseFloat(cords.lat), lng: parseFloat(cords.lon) });
            parkCordArray.push({ lat: parseFloat(cords.lat), lng: parseFloat(cords.lon) });
          })
          console.log("cordArray lat: " + cordArray[0].lat);
          console.log("cordArray lng: " + cordArray[0].lng);

          // var latLngBounds = new google.maps.LatLngBounds();
          //   for(var i = 0; i < cordArray.length; i++) {
          //     latLngBounds.extend(cordArray[i]);
          //   };

          var trailPath = new google.maps.Polyline({
            path: cordArray,
            geodesic: true,
            // strokeColor: '#FF0000',
            strokeColor: pathColor,
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          x++;
          trailPath.setMap(map);

          // map.fitBounds(latLngBounds);
          // console.log('map.fitbounds');

          track.Images.forEach(function (images) {
            var imageId = images.image_id.toString();
            var smImage = "http://hikekc.s3.us-east-2.amazonaws.com/" + images.aws_image_key;

            // $.get("/api/parkImages/" + idNbr, function(parkImages, err) {
            //   console.log('Park ', parkImages);
            //   console.log("err", err);
            // })

            var pointImage = new google.maps.LatLng(
              parseFloat(images.lat),
              parseFloat(images.lon));
            var markerImage = new google.maps.Marker({
              map: map,
              position: pointImage,
              icon: "/assets/images/camera-icon-25.png",
            });

            markerImage.addListener('click', function () {
              // infoWindow.setContent('<div class="image-click" id="' + imageId + '">' + '<img src="' + smImage + '" class="info-window-image" alt="Trail Image" />' + 
              // '</div>');

              // Testing, uncomment below
              // infoWindow.setContent('<div class="image-click" id="' + imageId + '">' + '</div>');

              // infoWindow.open(map, markerImage);

              // window.loadImage(smImage, function (img) {
              //   console.log("loadImage");
              //     if (img.type === "error") {
              //         console.log("couldn't load image:", img);
              //     } else {
              //         // window.EXIF.getData(img, function () {
              //         EXIF.getData(img, function () {
              //             console.log("done!");
              //             var orientation = window.EXIF.getTag(this, "Orientation");
              //             var canvas = window.loadImage.scale(img, {orientation: orientation || 0, canvas: true});
              //             console.log("canvas ", canvas);
              //             console.log("orientation ", orientation);
              //             document.getElementById(imageId).appendChild(canvas);
              //             canvas.setAttribute("id", smImage);
              //             // infoWindow.open(map, markerImage);
              //         });
              //     }

              //   });

              // Joe Testing
              //   var imageClickedId = $(this).attr("id");
              // // var imageClickedSrc = $(this).find('img').attr('src');
              // var imageClickedSrc = $(this).find('canvas').attr('id');
              // console.log("imageClickedId ", imageClickedId);
              // console.log("imageClickedSrc ", imageClickedSrc);

              // var modalImageSrc = '<img src="' + imageClickedSrc + '" id="rotate-test" class="modal-image" alt="Trail Image" />';
              //   $('.modal-body').append(modalImageSrc);

              // $('#imageModal').modal('show')

              // testing exif
              // var src = document.getElementById("rotate-test").getAttribute("src");
              window.loadImage(smImage, function (img) {
                console.log("loadImage");
                if (img.type === "error") {
                  console.log("couldn't load image:", img);
                } else {
                  // window.EXIF.getData(img, function () {
                  EXIF.getData(img, function () {
                    console.log("done!");
                    var orientation = window.EXIF.getTag(this, "Orientation");
                    // var canvas = window.loadImage.scale(img, { orientation: orientation || 0, canvas: true });
                    var canvas = window.loadImage.scale(img, { maxWidth: '100%', maxHeight: '100%', orientation: orientation || 0, canvas: true });
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
            })
          })
        }) 

        var trailId = trail.trail_id.toString();
        var name = trail.trail_name;
        var rating = trail.trail_rating;
        var lengthMeters = trail.Tracks[0].Cords.slice(-1)[0];
        var lengthMetersNbr = parseFloat(lengthMeters.distance);
        var lengthMiles = Math.round((lengthMetersNbr * 0.000621371) * 100) / 100
        // var lengthKilometers = Math.round((lengthMetersNbr * 0.001) * 100) / 100

        var point = new google.maps.LatLng(
          parseFloat(trail.Tracks[0].Cords[0].lat),
          parseFloat(trail.Tracks[0].Cords[0].lon));
        var marker = new google.maps.Marker({
          map: map,
          position: point,
          label: trailId
        });

        // track.Images.forEach(function(images) {
        //   var pointImage = new google.maps.LatLng(
        //     parseFloat(images.lat),
        //     parseFloat(images.lon));
        //   var markerImage = new google.maps.Marker({
        //     map: map,
        //     position: pointImage,
        //     icon: "../images/camera-icon.png",
        //   });
        // })
        // var point = [
        //   { 
        //     position: new google.maps.LatLng(
        //       parseFloat(trail.Tracks[0].Cords[0].lat),
        //       parseFloat(trail.Tracks[0].Cords[0].lon)),
        //     type: 'trail'

        //   }
        // ];

        // var marker = new google.maps.Marker({
        //     map: map,
        //     position: point[i].point,
        //     icon: icons[features[i].type].icon,
        //     label: trailId
        //   });


        marker.addListener('click', function () {
          infoWindow.setContent('<div class="trail-click" id="' + trailId + '">' + '<span class="bold-font">' + name + '</span>' + '<br>' +
            'Rating: ' + rating + '<br>' + 'Length: ' + lengthMiles + ' miles</div>');
          infoWindow.open(map, marker);
        });
      })
      var latLngBounds = new google.maps.LatLngBounds();
      for (var i = 0; i < parkCordArray.length; i++) {
        latLngBounds.extend(parkCordArray[i]);
      };

      map.fitBounds(latLngBounds);
    })

  }
  trailMarkers();

}

// joe testing logic from park.js start
$( document ).ready(function() {
  $('#imageModal').on('hidden.bs.modal', function (e) {
    // $('.modal-body').text("");
    $('#container').text("");
  })
});
// joe testing logic from park.js end

$(document).on("click", ".trail-click", function () {
  event.preventDefault();
  var clickedId = $(this).attr("id");
  window.location.href = "/trail/" + clickedId;
})

function pageLoading() {
  document.getElementById('loading').style.visibility="hidden";
  console.log('pageLoading');
};

// $(window).resize(function(){
//   screenSize();
// });

// function screenSize() {
//   var screenWidth = screen.width

//   if (screenWidth < 768) {
//     $(".sm-screen").removeClass("hidden");
//     $(".lg-screen").addClass("hidden");
//     $(".mapDiv2").attr('id', 'map');
//     initParkMap();
//   } else {
//     $(".lg-screen").removeClass("hidden");
//     $(".sm-screen").addClass("hidden");
//     $(".mapDiv1").attr('id', 'map');
//     initParkMap();
//   }
// }
// screenSize();

      // Joe Testing, uncomment below
      // $(document).on("click", ".image-click", function() {
      //   event.preventDefault();
      //   var imageClickedId = $(this).attr("id");
      //   // var imageClickedSrc = $(this).find('img').attr('src');
      //   var imageClickedSrc = $(this).find('canvas').attr('id');
      //   console.log("imageClickedId ", imageClickedId);
      //   console.log("imageClickedSrc ", imageClickedSrc);

      //   var modalImageSrc = '<img src="' + imageClickedSrc + '" id="rotate-test" class="modal-image" alt="Trail Image" />';
      //   //   $('.modal-body').append(modalImageSrc);

      //   // $('#imageModal').modal('show')

      //   // testing exif
      //   // var src = document.getElementById("rotate-test").getAttribute("src");
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
      //   Joe Testing end 

        // testing part 2
        // window.onload=getExif(imageClickedSrc);

        // function getExif(imageClickedSrc) {
        //   console.log("in getExif");
        //   window.EXIF.getData(imageClickedSrc, function () {
        //     console.log("done!");
        //     var orientation = window.EXIF.getTag(this, "Orientation");
        //     var canvas = window.loadImage.scale(img, {orientation: orientation || 0, canvas: true});
        //     console.log("canvas ", canvas);
        //     console.log("orientation ", orientation);
        //     document.getElementById("container").appendChild(canvas);
        //     // or using jquery $("#container").append(canvas);
        //     $('#imageModal').modal('show')
        //   });
        // }
        //   getExif(imageClickedSrc);
        //end testing exif

      // })