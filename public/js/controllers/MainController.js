app.controller('MainController', ['$scope', '$http', function($scope, $http){

  // get route for active bets
  $scope.bets={'active' : []}
  $scope.getallbets = function(){ $http.get('/bets').success(function(response){
      for(var i = 0; i < response.bets.length; i++){
        if (response.bets[i].status === 'active'){
          $scope.bets.active.push(response.bets[i])
        }
      }
      console.log($scope.bets)
    // var activebets = response
    $scope.bets.all = response;
  })};
  // post route
  $scope.newBet = {}
  $scope.post = function(){
    console.log($scope.newBet)
    var newbetcopy = angular.copy($scope.newBet)
    $http.post('/bets', newbetcopy).success(function(response){console.log(response)})
  };
  //drews 'I fergot how to use ng-show' code
  $scope.mobileMenu = function(){
    $scope.listDate = true;
  }

  // PUT JQUERY INSIDE CONTROLLER CALL IN IMMEDIATLLY...


  // JQUERY UI--SLIDER
    $scope.initJqueryUi = function(){
      $(function() {
        $scope.getallbets();
    // Slider on login page...
        $( "#slider" ).slider({
          range: "max",
          min: 1,
          max: 5,
          value: 1,
          slide: function( event, ui ) {
            $( "#homeBetAmount" ).val( ui.value );
          }
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
