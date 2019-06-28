
var map, infoWindow;
      function initParkMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.0997, lng: -94.5786},
          zoom: 10
        });
        infoWindow = new google.maps.InfoWindow;

        //Get all the parks and place on the map
        function trailMarkers() {
          var url = window.location.pathname;
          var id = url.substring(url.lastIndexOf('/') + 1);
          console.log("url id ", id);

          // $.get("/api/onePark", function(dbPark, err) {
          // console.log('Park ', dbPark);
          // console.log("err", err);

          // dbPark.forEach(function(markerElem) {
          //   console.log("markElem " ,markerElem);
          //   var parkId = markerElem.park_id.toString();
          //   var name = markerElem.park_name;
          //   var address = markerElem.park_address;
          //   console.log("address ", address);
          //   var rating = markerElem.park_rating;
          //   var elev = markerElem.park_elev;
          //   var point = new google.maps.LatLng(
          //       parseFloat(markerElem.park_lat),
          //       parseFloat(markerElem.park_lon));

          //   var marker = new google.maps.Marker({
          //     map: map,
          //     position: point,
          //     label: parkId
          //   });
          //   marker.addListener('click', function() {
          //     infoWindow.setContent('<div><strong>' + name + '</strong><br>' +
          //       address + '<br>' + 'Rating: ' + rating + '</div>');
          //     infoWindow.open(map, marker);
          //   });
          // })
        // })
      }
      trailMarkers(); 

      }