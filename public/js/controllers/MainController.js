app.controller('MainController', ['$scope', '$http', function($scope, $http){
  // $http.get('/users').success(function(data){
  //   console.log(data);
  // });
  $scope.newBet = {}


  $scope.post = function(){
    var newbetcopy = angular.copy($scope.newBet)
    $http.post('/users', newbetcopy).success(function(response){console.log(response)})
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
