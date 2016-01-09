cvApp.controller('cvCtrl', function($http) {

  $http.get('/data/cv_pl.json').then(function(data) {

    console.log(data.data)

  })

})