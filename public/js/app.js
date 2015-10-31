var app = angular.module('Parlay', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('new bet', {
      url: '/',
      controller: 'MainController',
      templateUrl: 'views/NewBet.html'
    })

    // Nessted routes for the profile page...
    .state('history', {
      url: '/profile/history',
      controller: 'MainController',
      views: {
        '': { templateUrl: 'views/profile.html' },

        'template@history': { templateUrl: 'views/profile-templates/_history.html'}
      }
    })

    .state('active', {
      url: '/profile/active',
      controller: 'MainController',
      views: {
        '': { templateUrl: 'views/profile.html' },

        'template@active': { templateUrl: 'views/profile-templates/_active.html'}
      }
    })

}); // END OF CONFIG

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

