app.controller('HomeController', ['$scope', '$http','$location', '$rootScope', function($scope, $http, $location, $rootScope){
  $http.get("../home").then(function(response){
    $scope.articles = response.data;
    console.log($scope.articles);
    });
  $scope.$watch(function(){
   return $location.path();
  }, function(value){
   console.log(value);
  })

  $scope.newArticle = function(){
    console.log('hi');
    $http.post("../new", {user: $scope.inputform}).then(function(response){
      $location.path("/");
    }, function(){
      console.log("error");
    });
  }
}])
