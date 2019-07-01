$( document ).ready(function() {

  var url = window.location.pathname;
          var id = url.substring(url.lastIndexOf('/') + 1);
          var idNbr = parseInt(id);
          console.log("url id ", id);

          $.get("/api/onePark/" + idNbr, function(dbPark, err) {
          console.log('Park ', dbPark);
          console.log("err", err);

            dbPark.Trails.forEach(function(trailInfo) {
              var trailType = "";
              if (trailInfo.gravel) { trailType = 'Gravel'}
              else if (trailInfo.paved) {trailType = "Paved"}
              else if (trailInfo.single_track) {trailType = "Single Track"}
              else if (trailInfo.mulch) {trailType = "Mulch"}
              else {trailType = "Not Provided"};

              var trailAct = [];
              if (trailInfo.hiking) { trailAct.push("Hiking")};
              if (trailInfo.mtb) { trailAct.push("Mountain Biking")};
              if (trailInfo.walking) { trailAct.push("Walking")};
              var trailActList = trailAct.toString();

              var trailText = '<div class="trail-click" id="' + trailInfo.trail_id + '">' +
                            '<div>' + '<span class="bold-font">Marker:</span> ' + trailInfo.trail_id + '</div>' +
                            '<div class="bold-font">' + trailInfo.trail_name + '</div>' +
                            '</div>' +
                            '<div>' +  '<span class="bold-font">Trail Description:</span> ' + trailInfo.trail_desc + '</div>' + 
                            '<div>' + '<span class="bold-font">Rating:</span> ' + trailInfo.trail_rating + '</div>' + 
                            '<div>' + '<span class="bold-font">Trail Type:</span> ' + trailType + '</div>' +
                            '<div>' + '<span class="bold-font">Activities:</span> ' + trailActList + '</div>' +
                            // '</div>' +
                            '<hr class="hr-separator">';
              $('.trail-aside').append(trailText);
            })
  })

});