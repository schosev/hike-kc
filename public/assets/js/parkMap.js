
var map, infoWindow;
      function initParkMap() {
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

          $.get("/api/onePark/" + idNbr, function(dbPark, err) {
          console.log('Park ', dbPark);
          console.log("err", err);

          var pos = {
            lat: parseFloat(dbPark.park_lat),
            lng: parseFloat(dbPark.park_lon)
          };
          map.setCenter(pos);
          map.setZoom(15);
          map.setMapTypeId(google.maps.MapTypeId.HYBRID);

          var pathColor = ["#ff3300", "#ffff00", "#00ffff", "#6600cc", "#660066", "#2e5cb8", "#ff6600"];
          var x = 0;
          
          dbPark.Trails.forEach(function(trail) {
            trail.Tracks.forEach(function(track) {
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
                // strokeColor: '#FF0000',
                strokeColor: pathColor[x],
                strokeOpacity: 1.0,
                strokeWeight: 2,                
              });
              x++;
              trailPath.setMap(map);

              map.fitBounds(latLngBounds);

              track.Images.forEach(function(images) {
                var imageId = images.image_id.toString();
                var smImage = "https://hikekc.s3.us-east-2.amazonaws.com/" + images.aws_image_key;

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

                markerImage.addListener('click', function() {
                  infoWindow.setContent('<div class="image-click" id="' + imageId + '">' + '<img src="' + smImage + '" class="info-window-image" alt="Trail Image" />' + 
                  '</div>');
                  infoWindow.open(map, markerImage);
                });

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
              

              marker.addListener('click', function() {
                infoWindow.setContent('<div class="trail-click" id="' + trailId + '">' + '<span class="bold-font">' + name + '</span>' + '<br>' + 
                'Rating: ' + rating + '<br>' + 'Length: ' + lengthMiles + ' miles</div>');
                infoWindow.open(map, marker);
              });
            })
          })
          
      }
      trailMarkers(); 

      }

      $(document).on("click", ".trail-click", function() {
        event.preventDefault();
        var clickedId = $(this).attr("id");
        window.location.href = "/trail/" + clickedId;
      })

      $(document).on("click", ".image-click", function() {
        event.preventDefault();
        var imageClickedId = $(this).attr("id");
        var imageClickedSrc = $(this).find('img').attr('src');
        console.log("imageClickedId ", imageClickedId);
        console.log("imageClickedSrc ", imageClickedSrc);

        var modalImageSrc = '<img src="' + imageClickedSrc + '" id="rotate-test" class="modal-image" alt="Trail Image" />';
          $('.modal-body').append(modalImageSrc);

        $('#imageModal').modal('show')
      })