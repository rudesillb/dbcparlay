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
}])
