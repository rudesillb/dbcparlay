app.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.cats='meiow'
  $scope.bets={}
  $scope.getallbets = function(){ $http.get('/bets').success(function(response){
    $scope.bets = response;
    console.log($scope.bets)
  })};


  //Post route to make a new bet. You're welcome drew
  $scope.newBet = {}
  $scope.post = function(){
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

         $scope.getallbets()
      }) // end of ready function
    } // END OF initJquery

    // call ui function
    $scope.initJqueryUi();








}]) // end of controller...
