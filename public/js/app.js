var app = angular.module('Parlay', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/')

  $stateProvider

    .state('new bet', {
      url: '/',
      controller: 'MainController',
      templateUrl: 'views/NewBet.html'
    })

    .state('profile', {
      url: '/profile',
      controller: 'MainController',
      templateUrl: 'views/profile.html'
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
