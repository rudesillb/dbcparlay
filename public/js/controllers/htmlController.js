app.controller('HtmlController', ['$scope', '$http', '$location', 'errorService', function($scope, $http, $location, errorService){

  $scope.declareW = function(){
    if($scope.options){
      delete $scope.options
    }else{
      $scope.options = true;
    }

  } // end of declare winner....


  // this doesnt work as inteded cannot get ng-repeat to show all...
  $scope.mobileTab = function(){

    if($scope.tabOptions){
      delete $scope.tabOptions
    }else{
      $scope.tabOptions = ["New Bet","History", "Active", "Outstanding", "inactive"]
    }
  }

   // mobile menu, hide after click...
  $scope.hideMenu = function($event){
    delete $scope.tabOptions
  }

   //Jquery to hide show tabs...
   $scope.changeTabColor = function(){
    $(function(){
        $('#desktopMenu li').click(function(){
          $(this).css("border-bottom", "none")
          $(this).addClass('active');
          $(this).siblings().removeClass('active');
      });
    })
   }
   $scope.changeTabColor();

   $scope.hover = function(){

   }
}])
