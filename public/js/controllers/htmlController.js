app.controller('HtmlController', ['$scope', function($scope){



  // show declare winner menu...
  // would be better on state data...
  $scope.declareW = function(){
    if($scope.options){
      delete $scope.options
    }else{
      $scope.options = true;
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

   // mobile menu, hide after click...
   $scope.hideMenu = function($event){

    delete $scope.tabOptions
    debugger
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
   $scope.changeTabColor()

}])
