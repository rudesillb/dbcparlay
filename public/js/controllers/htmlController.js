app.controller('HtmlController', ['$scope', function($scope){

  // show declare winner menu...
  $scope.declareW = function(){

    if($scope.options){
      delete $scope.options
    }else{
    $scope.options = ["Me", "Other", "Draw"]
    }

  } // end of declare winner....

// this doesnt work as inteded cannot get ng-repeate to show all...
$scope.mobileTab = function(){
     if($scope.tabOptions){
        delete $scope.tabOptions
      }else{
        $scope.tabOptions = ["History", "Active", "Outstanding", "inactive"]
      }
   }

   $scope.changeTabColor = function(){
    $(function(){
       $('#desktopMenu li').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
      });
    })
   }
   $scope.changeTabColor()

}])
