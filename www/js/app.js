// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.quizQuestion', {
    url: '/quizzes/:quizId',
    views: {
      'menuContent': {
        templateUrl: 'templates/quiz.html',
        controller: 'QuizController'
      }
    }
  }).state('app.redirectToQuiz', {
    url: '/redirect/:quizId',
    views: {
      'menuContent': {
        templateUrl: 'templates/quiz.html',
        controller: 'RedirectController'
      }
    }
  })
  .state('app.quizzes', {
    url: '/quizzes',
    views: {
      'menuContent': {
        templateUrl: 'templates/quizzes.html',
        controller: 'QuizzesController'
      }
    }
  }).state('app.statistic', {
    url: '/statistic',
    views: {
      'menuContent': {
        templateUrl: 'templates/statistic.html',
        controller: 'StatisticController'
      }
    }
  }).state('app.references', {
    url: '/references',
    views: {
      'menuContent': {
        templateUrl: 'templates/references.html',
        controller: 'ReferencesController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/quizzes');
});
