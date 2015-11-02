app.controller('MainController', ['$scope', '$http', '$location', function($scope, $http, $location){
  //test for the angles
  // $scope.pay.id = $routeParams.bet_object.id
  // get route for bets collections
  // explicitly showing all info in bets expression
  $scope.bets={'active' : [], 'inverse_active' : [], 'inactive':[], 'inverse_inactive' : [], 'outstanding': [], 'inverse_outstanding': []}
  $scope.getallbets = function(){ $http.get('/bets').success(function(response){
      console.log('this is the response')
      console.log(response)

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
    $http.post('/bets', newbetcopy).success(function(response){
      console.log(response)})
  };

  //declare self a winner, may need to change bet.creator to user_id on server

  // Drew P hide the declarewinner button on success..
  $scope.declareWinnerUser = function(id, winner, $event) {
    $http.put('/bets/' + id, {user_vote: winner}).success()
  }

  $scope.declareWinnerFriend = function(id, winner) {
    $http.put('/bets/' + id, {friend_vote: winner})
  }

  $scope.pay = function(bet) {
    $http.get('bets' + bet.id)
  }

  // PUT JQUERY INSIDE CONTROLLER CALL IN IMMEDIATLLY...
  // JQUERY UI--SLIDER
    $scope.initJqueryUi = function(){
    // Slider on login page...
        $( "#slider" ).slider({
          range: "max",
          min: 1,
          max: 5,
          value: 1,
          slide: function( event, ui ) {
            $( "#homeBetAmount" ).val( ui.value );
          },
          stop: function(event, ui){
            console.log(ui.value)}
        }) //end of slider

      // JQUERY UI--DATEPICKER
         $( "#datepicker" ).datepicker({
            minDate: 0
          }) //end of dp
    } // END OF initJquery

    // call ui function
    $scope.initJqueryUi();

}]) // end of controller...
