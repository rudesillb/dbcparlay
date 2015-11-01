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
      views: {
        '': { templateUrl: 'views/profile.html' },

        'template@history': { templateUrl: 'views/profile-templates/_history.html',
                              controller: 'MainController'}
      }
    })

    .state('active', {
      url: '/profile/active',

      views: {
        '': { templateUrl: 'views/profile.html' },

        'template@active': { templateUrl: 'views/profile-templates/_active.html',
                              controller: 'MainController'}
      }
    })
    .state('inactive', {
      url: '/profile/inactive',

      views: {
        '': { templateUrl: 'views/profile.html' },

        'template@inactive': { templateUrl: 'views/profile-templates/_inactive.html',
                              controller: 'MainController'}
      }
    })
    .state('outstanding', {
      url: '/profile/outstanding',

      views: {
        '': { templateUrl: 'views/profile.html' },

        'template@outstanding': { templateUrl: 'views/profile-templates/_outstanding.html',
                              controller: 'MainController'}
      }
    })




}); // END OF CONFIG



