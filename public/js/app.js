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
      templateUrl: 'views/profile-templates/_history.html'
    })

    .state('active', {
      url: '/profile/active',
      controller: 'MainController',
      templateUrl: 'views/profile-templates/_active.html'

    })
    .state('inactive', {
      url: '/profile/inactive',
      controller: 'MainController',
      templateUrl: 'views/profile-templates/_inactive.html'

    })
    .state('outstanding', {
      url: '/profile/outstanding',
      controller: 'MainController',
      templateUrl: 'views/profile-templates/_outstanding.html'
    })




}); // END OF CONFIG



