cvApp.controller('cvCtrl', function($scope, $http, $routeParams, $translate) {

  $scope.data = {};

  function getData(lang) {
    var lang = lang.lang || 'en';
    $translate.use(lang);

    $http.get('/data/cv_'+ lang +'.json').then(function(data) {
      $scope.data = data.data;

    });

  };

  getData($routeParams);


})

cvApp.filter('monthFilter', function() {
  return function(input) {

    var from = moment(input.from, 'D-M-YYYY'),
        duration,
        to;

    if(input.to === 'present') {
      to = moment()
    } else {
      to = moment(input.to, 'D-M-YYYY')
    }

    duration = to.diff(from, 'months')

    return duration + ' months';
  }
})
