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

    .state('profile', {
      url: '/profile',
      controller: 'MainController',
      views: {
        '': { templateUrl: 'views/profile.html' },

        'template@history': { templateUrl: 'views/profile-templates/_history.html'}
      }
    })
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

    .state('inactive', {
    url: '/profile/inactive',
    controller: 'MainController',
    views: {
      '': { templateUrl: 'views/profile.html' },

      'template@inactive': { templateUrl: 'views/profile-templates/_inactive.html'}
    }
  })


}); // END OF CONFIG



