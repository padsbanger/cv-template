var cvApp = angular.module('cvApp', ['ngRoute', 'pascalprecht.translate'])


cvApp.config(function($routeProvider, $locationProvider, $translateProvider) {
  $routeProvider
    .when('/:lang', {
      templateUrl: 'views/cv.html',
      controller: 'cvCtrl'
    }).when('/', {
      templateUrl: 'views/cv.html',
      controller: 'cvCtrl'
    });

  $translateProvider.translations('en', {
    PersonalData: 'Personal data',
    PersonalProfile: 'Personal Profile',
    Experiance: 'Experiance',
    Education: 'Education',
    AdditionalInformation: 'Additional information'
  });

  $translateProvider.translations('pl', {
    PersonalData: 'Dane personalne',
    PersonalProfile: 'Profil zawodowy',
    Experiance: 'Doświadczenie',
    Education: 'Edukacja',
    AdditionalInformation: 'Informacje dodatkowe'
  });


  $translateProvider.useSanitizeValueStrategy(null);

  $locationProvider.html5Mode({
    enabled: true
  });
});


