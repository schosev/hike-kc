$( document ).ready(function() {
  $.get("/api/parks", function(dbPark, err) {
    console.log('Park ', dbPark);
    console.log("err", err);

    dbPark.forEach(function(parkInfo) {
      var parkText = '<div class="park-click" id="' + parkInfo.park_id + '">' +
                    '<div>' + '<span class="bold-font">Marker:</span> ' + parkInfo.park_id + '</div>' +
                    '<div class="bold-font">' + parkInfo.park_name + '</div>' +
                    '</div>' +
                    '<div>' + parkInfo.park_address + '</div>' + 
                    '<div>' +  '<span class="bold-font">Park Description:</span> ' + parkInfo.park_desc + '</div>' + 
                    '<div>' + '<span class="bold-font">Rating:</span> ' + parkInfo.park_rating + '</div>' + 
                    '</div>' +
                    '<hr class="hr-separator">';
      $('.park-aside').append(parkText);
    })
  })
  // $( "#test-btn-id" ).click(function() {
  //   console.log("inside button click");
  //   $.get("/api/trails", function(dbPark, err) {
  //       // window.location.href = "/";
  //       console.log('Park ', dbPark);
  //       console.log("err", err);
  //   })
  // })

  // $(".park-aside").on("click", ".park-click", function() {
  //   var clickedId = $(this).attr("id");
  //   console.log("clickedId ", clickedId);
  //   // $.get("/park",)
  // })
});