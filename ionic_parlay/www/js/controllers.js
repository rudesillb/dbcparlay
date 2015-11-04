angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Suck It Drew', id: 1 },
    { title: 'And Again!', id: 2 },
    { title: 'Love to hate on Drew!', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MainController', ['$scope', '$http', '$location', '$ionicActionSheet', function($scope, $http, $location, $ionicActionSheet) {
  $scope.bets={'active' : [], 'inverse_active' : [], 'inactive':[], 'inverse_inactive' : [], 'outstanding': [], 'inverse_outstanding': []}
  $scope.getallbets = function(){ $http.get('http://localhost:3000/bets').success(function(response){

      //collect active bets that user created
      for(var i = 0; i < response.bets[0].length; i++){
        if (response.bets[0][i].status === 'active'){
          $scope.bets.active.push(response.bets[0][i])
        }
      }

      //collect active bets where user is friend
      for(var i = 0; i < response.bets[1].length; i++){
        if (response.bets[1][i].status === 'active'){
          $scope.bets.inverse_active.push(response.bets[1][i])
        }
      }

      //collect inactive bets where user created
      for(var i = 0; i < response.bets[0].length; i++){
        if (response.bets[0][i].status === 'inactive'){
          $scope.bets.inactive.push(response.bets[0][i])
        }
      }

      //collect inactive bets where user is friend
      for(var i = 0; i < response.bets[1].length; i++){
        if (response.bets[1][i].status === 'inactive'){
          $scope.bets.inverse_inactive.push(response.bets[1][i])
        }
      }

      //collect outstanding bets where user created
      for(var i = 0; i < response.bets[0].length; i++){
        if (response.bets[0][i].status === 'outstanding'){
          $scope.bets.outstanding.push(response.bets[0][i])
        }
      }

      //collect outstanding bets where user is friend
      for(var i = 0; i < response.bets[1].length; i++){
        if (response.bets[1][i].status === 'outstanding'){
          $scope.bets.inverse_outstanding.push(response.bets[1][i])
        }
      }

  //collection of all bets
      $scope.bets.all = response;
  })};

  $scope.getallbets();

  //post route to create new bet
  $scope.newBet = {}
  $scope.post = function(){
    // console.log($scope.newBet)
    var newbetcopy = angular.copy($scope.newBet)
    $http.post('http://localhost:3000/bets', newbetcopy).success(function(response){
      console.log(response)})
  };
  $scope.date = new Date();

  // bet creator votes, buttons hide
  $scope.declareWinnerUser = function(id, winner) {
    var voteField = $(event.target).closest('div');
    voteField.hide();
    $http.put('/bets/' + id, {user_vote: winner})
  }

  // bet friend votes, buttons hide
  $scope.declareWinnerFriend = function(id, winner, $event) {
      var voteField = $(event.target).closest('div');
      voteField.hide();
      $http.put('/bets/' + id, {friend_vote: winner}).success(function(response){
    })
  }

// goes to accept bet route on server and hides buttons
  $scope.accept_bet = function(bet_id){
    $http.put('http://localhost:3000/bets/' + bet_id + '/accept');
    // $(event.target).parent().parent().parent().hide();
  }

  // goes to decline bet route on server and hides buttons
  $scope.decline_bet = function(bet_id){
    $http.put('http://localhost:3000/bets/' + bet_id + '/decline');
    // $(event.target).parent().parent().parent().hide();
  }

  //win checker
  $scope.winchecker = function(bet) {
    if(bet.winner == $scope.bets.all.bets[2]){
      return true
    }
    else {
      return false
    }
  }

  // send payment after clicking "pay"
  $scope.youpaynowcreator = function(bet){
    var pay = confirm('Pay: $'+ bet.bet_amount + ' to '+ bet.creator +'?')
    if (pay === true){
      $http.put('/bets/' + bet.id + '/pay');
      $(event.target).parent().parent().parent().hide();
    }
  }

  $scope.youpaynowreciever = function(bet){
    var pay = confirm('Pay: $'+ bet.bet_amount + ' to '+ bet.reciever +'?')
    if (pay === true){
      $http.put('/bets/' + bet.id + '/pay');
      $(event.target).parent().parent().parent().hide();
    }
  }

  $scope.selectFriend = function() {
    $scope.newBet.reciever = $(event.target).val();
    $('#fuzzy-list').hide();
  }

  $scope.getFriends = function() {
    $http.get('bets/new').success(function(response) {
      $scope.friends = response.bets
      })
  }

  $scope.declareW = function(){
    if($scope.options){
      delete $scope.options
    }else{
      $scope.options = true;
    }
  }

  $scope.showUser = function(id) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Me</b>' },
       { text: '<b>Not Me</b>' },
       { text: '<b>Draw</b>' }
     ],
     titleText: 'Declare the Winner!',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       if (index === 0){
         $http.put('http://localhost:3000/bets/' + id, {user_vote: 'user'})
       console.log(id)
       }
      else if (index === 1){
         $http.put('http://localhost:3000/bets/' + id, {user_vote: 'friend'})
     console.log('hey sweet')
      }
      else if (index === 2) {
        $http.put('http://localhost:3000/bets/' + id, {user_vote: 'draw'})
     console.log('hey sweet')
      }
     }
   });

  };

  $scope.showFriend = function(id) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Me</b>' },
       { text: '<b>Not Me</b>' },
       { text: '<b>Draw</b>' }
     ],
     titleText: 'Declare the Winner!',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       if (index === 0){
         $http.put('http://localhost:3000/bets/' + id, {user_vote: 'friend'})
       console.log(id)
       }
      else if (index === 1){
         $http.put('http://localhost:3000/bets/' + id, {user_vote: 'user'})
     console.log('hey sweet')
      }
      else if (index === 2) {
        $http.put('http://localhost:3000/bets/' + id, {user_vote: 'draw'})
     console.log('hey sweet')
      }
     }
   });

  };





}])

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
