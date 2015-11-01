app.controller('MainController', ['$scope', '$http', function($scope, $http){

  $scope.hey = 'hey'
  // get route for active bets
  // explicitly showing all info in bets expression
  $scope.bets={'active' : [], 'inactive':[]}
  $scope.getallbets = function(){ $http.get('/bets').success(function(response){
    console.log('this is the response')
    console.log(response)
      for(var i = 0; i < response.bets.length; i++){
        if (response.bets[i].status === 'active'){
          $scope.bets.active.push(response.bets[i])
        }
      }
      // loop to query inactive bets
      for(var i = 0; i < response.bets.length; i++){
        if (response.bets[i].status === 'inactive'){
          $scope.bets.inactive.push(response.bets[i])
        }
      }
      // console.log($scope.bets)
    // var activebets = response
  $scope.bets.all = response;
  })};
  // post route

  $scope.newBet = {}
  $scope.post = function(){
    console.log($scope.newBet)
    var newbetcopy = angular.copy($scope.newBet)
    $http.post('/bets', newbetcopy).success(function(response){
      console.log(response)})
  };

  //

  //drews 'I fergot how to use ng-show' code
  $scope.mobileMenu = function(){
    $scope.listDate = true;
  }

  //get user info
  $scope.getuserinfo = function() {

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
