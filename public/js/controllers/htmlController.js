app.controller('HtmlController', ['$scope', function($scope){

  // show declare winner menu...
  $scope.declareW = function(){

    if($scope.options){
      delete $scope.options
    }else{
    $scope.options = ["Me", "Other", "Draw"]
    }

  } // end of declare winner....


$scope.mobileTab = function(){
   if($scope.tabOptions){
      delete $scope.tabOptions
    }else{
    $scope.tabOptions = ["History", "Active", "Outstanding", "inactive"]
    }
  }

}])
