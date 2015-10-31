$(function() {

    // Slider on login page...
    $( "#slider" ).slider({
      range: "max",
      min: 1,
      max: 5,
      value: 1,
      slide: function( event, ui ) {
        $( "#homeBetAmount" ).val( ui.value );
      }
    });


    // Date Picker
     $( "#datepicker" ).datepicker({
      minDate: 0
     });








  }); // end of document on ready
