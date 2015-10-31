app.controller('MainController', ['$scope', '$http', function($scope, $http){

  $scope.bets={}
  $scope.getallbets = function(){ $http.get('/bets').success(function(response){
    $scope.bets = response;
  })};

  $scope.newBet = {}
  $scope.post = function(){
    var newbetcopy = angular.copy($scope.newBet)
    $http.post('/bets', newbetcopy).success(function(response){console.log(response)})
  };
  //drews 'I fergot how to use ng-show' code
  $scope.mobileMenu = function(){
    $scope.listDate = true;
  }
}])
