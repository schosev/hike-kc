
var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.0997, lng: -94.5786},
          zoom: 10
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     var pos = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };

        //     infoWindow.setPosition(pos);
        //     infoWindow.setContent('You');
        //     infoWindow.open(map);
        //     map.setCenter(pos);
        //   }, function() {
        //     handleLocationError(true, infoWindow, map.getCenter());
        //   });
        // } else {
        //   // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }

        //Get all the parks and place on the map
        function parkMarkers() {
          $.get("/api/parks", function(dbPark, err) {
          console.log('Park ', dbPark);
          console.log("err", err);

          dbPark.forEach(function(markerElem) {
            console.log("markElem " ,markerElem);
            var parkId = markerElem.park_id.toString();
            var name = markerElem.park_name;
            var address = markerElem.park_address;
            console.log("address ", address);
            var totalTrailsMeterNbr = parseFloat(markerElem.total_trail_lngth_meters)
            var totalTrailMiles = Math.round((totalTrailsMeterNbr * 0.000621371) * 100) / 100
            var rating = markerElem.park_rating;
            var elev = markerElem.park_elev;

            // joe test add logicjs - start
            var parkText = '<div class="park-list-text">' +
                          '<div class="park-click" id="' + markerElem.park_id + '">' +
                          '<div>' + '<span class="bold-font">Marker:</span> ' + markerElem.park_id + '</div>' +
                          '<div class="bold-font">' + markerElem.park_name + '</div>' +
                          '</div>' +
                          '<div>' + markerElem.park_address + '</div>' + 
                          '<div><span class="bold-font">Total Trails:</span> ' + totalTrailMiles + ' Miles</div>' +
                          '<div>' +  '<span class="bold-font">Park Description:</span> ' + markerElem.park_desc_short + '</div>' + 
                          '<div>' + '<span class="bold-font">Rating:</span> ' + markerElem.park_rating + '</div>' + 
                          '</div>' +
                          '</div>'
                          // '<hr class="hr-separator">';
            $('.park-list').append(parkText);
            // joe test add logicjs - end


            var point = new google.maps.LatLng(
                parseFloat(markerElem.park_lat),
                parseFloat(markerElem.park_lon));

            var marker = new google.maps.Marker({
              animation: google.maps.Animation.DROP,
              map: map,
              position: point,
              label: parkId
            });
            marker.addListener('click', function() {
              infoWindow.setContent('<div class="park-click" id="' + parkId + '">' + '<span class="bold-font">' + name + '</span><br>' +
                address + '<br> Total Trails: ' + totalTrailMiles + ' miles <br> Rating: ' + rating + '</div>'
              );
              infoWindow.open(map, marker);
            });
          })
        })
      }
      parkMarkers(); 
      
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      $(document).on("click", ".park-click", function() {
        event.preventDefault();
        var clickedId = $(this).attr("id");
        window.location.href = "/park/" + clickedId;
      })