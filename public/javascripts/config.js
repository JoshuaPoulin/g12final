app.config(function($locationProvider, $routeProvider){
  $locationProvider.html5Mode(true)
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'HomeController'
    })
    .when('/view', {
      templateUrl: '/partials/view.html',
      controller: "ViewController"
    })
});