$( document ).ready(function() {

  var url = window.location.pathname;
          var id = url.substring(url.lastIndexOf('/') + 1);
          var idNbr = parseInt(id);
          console.log("url id ", id);

          $.get("/api/onePark/" + idNbr, function(dbPark, err) {
          console.log('Park ', dbPark);
          console.log("err", err);

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

              // var modalImageName = '<h5 class="modal-title" id="imageModalLabel">' + trailInfo.trail_name + '</h5>';
              //   $('.modal-title-wrapper').append(modalImageName);
            })
  })

  $('#imageModal').on('hidden.bs.modal', function (e) {
    $('.modal-body').text("");
  })

});

