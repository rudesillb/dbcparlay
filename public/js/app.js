var app = angular.module('Parlay', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    .when('/bet/new', {
      controller: 'MainController',
      templateUrl: 'views/NewBet'
    })
    .when('/profile', {
      controller: 'MainController',
      templateUrl: 'views/profile'
    })
    .otherwise({
      redirectTo: '/'
    })




});


$(function() {
    console.log('hey drew')
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


  });
