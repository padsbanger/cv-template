cvApp.controller('cvCtrl', function($scope, $http, $routeParams, $translate) {

  $scope.data = {}

  function getData(lang) {
    var lang = lang.lang || 'en';
    $translate.use(lang);

    $http.get('/data/cv_'+ lang +'.json').then(function(data) {
      $scope.data = data.data;

    })

  }

  getData($routeParams)


})