app.controller('HomeController', ['$scope', '$http','$location', '$rootScope', function($scope, $http, $location, $rootScope){
  $http.get("../home").then(function(response){
    $scope.articles = response.data;
    console.log($scope.articles);
    });
  $scope.newArticle = function(){
    $http.post("../new", {user: $scope.inputform}).then(function(response){
      $location.path("/");
    }, function(){
      console.log("error");
    });
  }
}])
app.controller('ViewController', ['$scope', '$http','$location', '$rootScope', function($scope, $http, $location, $rootScope){
  $scope.articles;
  $scope.opinions;
  $scope.showView;
  $scope.showOpinions = [];
  $scope.viewURL;
  $scope.analytics = [];
  $scope.analasis;
  $scope.finalAnalasis = [];
  $http.get("../views").then(function(response){
    $scope.articles = response.data[0];
    $scope.opinions = response.data[1];
    $scope.currentURL = window.location.pathname;
    $scope.viewURL = $scope.currentURL.split('/');
    if($scope.viewURL[1] === "article"){
      for(var i = 0; i < $scope.articles.length; i++){
        if($scope.articles[i].id == $scope.viewURL[2]){
          $scope.showView = $scope.articles[i];
        }
      }
    }
    for(var i = 0; i < $scope.opinions.length; i++){
      if($scope.opinions[i].articles_id == $scope.showView.id){
        $scope.showOpinions.push($scope.opinions[i]);
      }
    }
    for(var i = 0; i < $scope.showOpinions.length; i++) {
        $scope.showOpinions[i].opinion.replace(/[^\w\s]/gi, '').split(' ').forEach(function(word) {
          if(word != 'they' && word != 'are' && word != 'I' && word != 'no' && word != 'very' && word != 'not') {
            $scope.analytics.push(word.toLowerCase());
          }
        })
      }
      $scope.analasis = $scope.analytics.reduce(function(obj, val) {
        obj[val] = obj[val] + 1 || 1;
        return obj;
      },{});
      for(var instance in $scope.analasis) {
        $scope.finalAnalasis.push({word: instance, times: $scope.analasis[instance]});
      }
    });
  $scope.add = function(){
    $http.post("../add", {user:$scope.opinionform}).then(function(response){
      $location.path("/");
    }, function(){
      console.log("error")
    });
  }
}])