app.controller('MainController', ['$scope', '$http', function($scope, $http){

  $scope.hey = 'hey'
  // get route for active bets
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
      // console.log($scope.bets)
    // var activebets = response
  $scope.bets.all = response;
  })};

  //post route to create new bet
  $scope.newBet = {}
  $scope.post = function(){
    // console.log($scope.newBet)
    var newbetcopy = angular.copy($scope.newBet)
    $http.post('/bets', newbetcopy).success(function(response){
      console.log(response)})
  };

  //drews 'I fergot how to use ng-show' code
  $scope.mobileMenu = function(){
    $scope.listDate = true;
  }

  //declare self a winner, may need to change bet.creator to user_id on server
  $scope.declareWinnerMe = function(id, winnerId) {
    $http.put('/bets/' + id, winnerId)
  }
  //declare friend the winner
  $scope.declareWinnerFriend = function(id, winnerId) {
    $http.put('/bets/' + id, winnerId)
  }
  //declare a draw
  $scope.declareWinnerDraw = function(id) {
    $http.put('/bets/' + id, 'draw')
  }

  // PUT JQUERY INSIDE CONTROLLER CALL IN IMMEDIATLLY...
  // JQUERY UI--SLIDER
    $scope.initJqueryUi = function(){
      $(function() {
        $scope.getallbets();
        $scope.getuserinfo();
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

      }) // end of ready function
    } // END OF initJquery

    // call ui function
    $scope.initJqueryUi();

}]) // end of controller...
