app.controller('MainController', ['$scope', '$http', '$location', 'errorService', function($scope, $http, $location, errorService){

    $scope.checker = function() {
      $http.get('/users/check').success(function(response){
        console.log('hey we are checking')
        console.log(response)
        console.log('hey response should be above')
        if (!response){
          $location.path('/landing');
          $('#indexHeader').hide();
        }
      });
    };

    $scope.checker();

// landing page....

// @@@@@@@@@@@@@@@@@@
// Errors
// @@@@@@@@@@@@@@@@@@
  //
  $scope.displayError = errorService.callError

// watch for the error property to get set then run this...
  $scope.$watch('displayError.friendError', function(newValue, oldValue){

    if(newValue){
      $('#ErrorHandle').delay(2000).fadeTo('slow', 0)

      setTimeout(function(){
        $('#ErrorHandle').remove()
        $scope.displayError.friendError = undefined
        $scope.displayError.friendErrorBox = undefined
      },2400);
    }
  })
  // $scope.pay.id = $routeParams.bet_object.id
  // get route for bets collections
  // explicitly showing all info in bets expression
  $scope.bets={'active' : [], 'inverse_active' : [], 'inactive':[], 'inverse_inactive' : [], 'outstanding': [], 'inverse_outstanding': []}
  $scope.getallbets = function(){ $http.get('/bets').success(function(response){

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
    // Need a success and fail callback
    $http.post('/bets', newbetcopy).then(function successCallback(response){
      $location.path('/#/profile/inactive')
    }, function errorCallback(response){

      // call service and save var inside it....
      errorService.setError("Friend Not Found")
      //redirect to home page if error....

      $location.path('/#/')


    });
  };

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
    $http.put('/bets/' + bet_id + '/accept');
    $(event.target).parent().parent().parent().hide();
  }

  // goes to decline bet route on server and hides buttons
  $scope.decline_bet = function(bet_id){
    $http.put('/bets/' + bet_id + '/decline');
    $(event.target).parent().parent().parent().hide();
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


  // $scope.win_percentage = $scope.bets.all.bets[3]

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
    $scope.newBet.reciever = $(event.target).text();
    delete $scope.friends
  }

  $scope.getFriends = function() {
    $http.get('bets/new').success(function(response) {

      if($scope.friends){
        delete $scope.friends
      }else{
      $scope.friends = response.bets
      }

      })
  }

  $scope.logout = function(){
    $http.get('users/logout').success(function(){
      $location.path('/landing')
    })
  }

  // PUT JQUERY INSIDE CONTROLLER CALL IN IMMEDIATLLY...
  // JQUERY UI--SLIDER
    $scope.initJqueryUi = function(){
    // Slider on login page...
        $( "#slider" ).slider({
          range: "max",
          min: 0,
          max: 5,
          step: 0.25,
          slide: function( event, ui ) {
            $( "#homeBetAmount" ).text( "$" + ui.value);
            $scope.newBet.bet_amount = String(ui.value)
          }
        }); //end of slider

      // JQUERY UI--DATEPICKER
         $( "#datepicker" ).datepicker({
            minDate: 0,
            dateFormat: 'dd/mm/yy'
          }) //end of dp
    } // END OF initJquery

    // call ui function
    $scope.initJqueryUi();


    // $scope.landing = (function(){

// hide show tabs based on url...
// run regardless..

   // });


}]) // end of controller...
