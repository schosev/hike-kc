
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
          
          
          dbPark.Trails.forEach(function(trail) {
            
            trail.Tracks.forEach(function(track) {
              var cordArray = [];
              track.Cords.forEach(function(cords) {
                cordArray.push({lat: parseFloat(cords.lat), lng: parseFloat(cords.lon)});
              })
              console.log("cordArray lat: " + cordArray[0].lat);
              console.log("cordArray lng: " + cordArray[0].lng);
              
              var trailPath = new google.maps.Polyline({
                path: cordArray,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
              });
              trailPath.setMap(map);
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