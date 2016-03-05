var app = angular.module('starter.controllers', ['ionic', 'ionic.utils']);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('QuizzesController', function($scope, $stateParams) {
    $scope.quizzes = [
      { title: 'Javascript', id: 1},
      { title: 'CSS', id: 2 }
    ];
})

.controller('QuizController', function($scope, $stateParams, $state, $http, $localstorage) {
    if($stateParams.quizId == 1){
      $scope.title = 'Js Quiz';
      var quizFile = "resources/js-quiz.json";
    }else if($stateParams.quizId == 2){
      $scope.title = 'CSS Quiz';
      var quizFile = "resources/css-quiz.json";
    }else if($stateParams.quizId == 3){
      $scope.title = 'HTML Quiz';
      var quizFile = "resources/html-quiz.json";
    }
    var maxQuestions = 10;
    $scope.currentPage = 1;
    $scope.firstPage = true;
    $scope.questions = [];
    $http.get(quizFile)
      .then(function(response){
        var data = response.data;//console.log(response);
        $scope.title = data['quizName'];
        $scope.questions = _.shuffle(data.questions);
        $scope.question = $scope.questions[0];
        $scope.maxQuestions = maxQuestions<$scope.questions.length?maxQuestions:$scope.questions.length;
        $scope.questions.length = $scope.maxQuestions;
      });
    $scope.next = function(){
      var nextPage = 1 + $scope.currentPage;
      $scope.currentPage = nextPage;
      buttonsControl();
    };
    $scope.finish = function(){
      var rightAnswers = 0,
        wrongAnswers = [];
      $scope.showResults = true;
      _.each($scope.questions,function(question){
        if(question.rightAnswer === question.answer){
          rightAnswers++;
        }else{
          wrongAnswers.push(question);
        }
      });
      $scope.score = rightAnswers/$scope.questions.length*100;
      $scope.wrongAnswers = wrongAnswers;
      console.log($scope.wrongAnswers);
      var statistic = $localstorage.getObject('statistic');
      if(_.isEmpty(statistic)){
        $localstorage.setObject('statistic', {
          quizzes: [
            {
              title: $scope.title,
              score: $scope.score,
              dateTime: new Date()
            }
          ]
        });
      }else{
        statistic.quizzes.push({
          title: $scope.title,
          score: $scope.score,
          dateTime: new Date()
        });
        $localstorage.setObject('statistic',statistic);
      }
    };
    $scope.new = function(){
      $state.go('app.quizQuestion',{quizId:$stateParams.quizId},{reload:true});
      //$location.path('/quizzes');
      //$state.reload('app.quizzes');
    };
    function buttonsControl(){
      if($scope.currentPage < $scope.maxQuestions){
        $scope.lastPage = false;
      }else{
        $scope.lastPage = true;
      }
      if($scope.currentPage > 1){
        $scope.firstPage = false;
      }else{
        $scope.firstPage = true;
      }
    }
})
.controller('StatisticController', function($scope, $stateParams,$localstorage) {
    var statistic = $localstorage.getObject('statistic');
    $scope.statistic = statistic.quizzes.reverse();
})
.controller('ReferencesController', function($scope, $stateParams) {
  $scope.references = {
    "javascript": [
      {title: 'David Shariff', url: 'http://davidshariff.com/js-quiz/'},
      {title: 'JavatPoint', url: 'http://www.javatpoint.com/javascript-quiz'},
      {title: 'NcZonline', url: 'https://www.nczonline.net/blog/2010/02/16/my-javascript-quiz/'}],
    "css": [
      {title: 'CssPortal', url: 'http://www.cssportal.com/css-quiz/'}],
    "exercises":[
      {title: 'Js w3resource', url: 'http://www.w3resource.com/javascript-exercises/'}
    ],
    "documentation":[
      {title: 'Javascript MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
      {title: 'Javascript MSDN', url: 'https://msdn.microsoft.com/en-us/library/yek4tbz0(v=vs.94).aspx'},
      {title: 'JavaScriptKit', url: 'http://www.javascriptkit.com/javatutors/'}
    ]
  };
})
.controller('RedirectController', function($scope, $stateParams, $state) {
    $state.go('app.quizQuestion',{quizId:1});
});

app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
/*.controller('QuizController', ['$scope', '$http', '$routeParams', '$q', '$location',
  function($scope, $http, $routeParams, $q, $location) {
    var maxQuestions = 5;
    $scope.currentPage = 1;
    $scope.firstPage = true;
    $scope.questions = [];
    $.ajax({
      url: '/resources/js-quiz.json',
      dataType: 'json',
      success: function(data){
        $scope.questions = _.shuffle(data.questions);
        $scope.question = $scope.questions[0];
        $scope.maxQuestions = maxQuestions<$scope.questions.length?maxQuestions:$scope.questions.length;
        $scope.questions.length = $scope.maxQuestions;
        $scope.$apply();
      },
      error: function(data){
        console.log('Error loading JSON data');
      }
    });
    function buttonsControl(){
      if($scope.currentPage < $scope.maxQuestions){
        $scope.lastPage = false;
      }else{
        $scope.lastPage = true;
      }
      if($scope.currentPage > 1){
        $scope.firstPage = false;
      }else{
        $scope.firstPage = true;
      }
    }
    $scope.next = function(){
      var nextPage = 1 + parseInt($routeParams.page?$routeParams.page:1);
      $location.path('/js-quiz').search({page: nextPage});
      $scope.currentPage = nextPage;
      $scope.question = $scope.questions[nextPage-1];
      buttonsControl();
    };
    $scope.prev = function(){
      var prevPage = parseInt($routeParams.page?$routeParams.page:1) - 1;
      $location.path('/js-quiz').search({page: prevPage});
      $scope.currentPage = prevPage;
      $scope.question = $scope.questions[prevPage-1];
      buttonsControl();
    };
    $scope.finish = function(){
      var rightAnswers = 0,
        wrongAnswers = [];
      $scope.showResults = true;
      console.log($scope.questions);
      _.each($scope.questions,function(question){
        if(question.rightAnswer === question.answer){
          rightAnswers++;
        }else{
          wrongAnswers.push(question);
        }
      });
      $scope.score = rightAnswers/$scope.questions.length*100;
      $scope.wrongAnswers = wrongAnswers;

      //$location.path('/js-quiz').search({});
    };
    $scope.new = function(){
      $location.url('/new-js-quiz').search();
    };
  }]);*/


//https://www.nczonline.net/blog/2010/02/16/my-javascript-quiz/
//https://github.com/nathansmith/javascript-quiz
//http://tutorialzine.com/2014/08/what-does-this-function-do/

//http://www.w3resource.com/javascript-exercises/
//http://www.w3resource.com/javascript-exercises/javascript-string-exercises.php
//http://www.w3resource.com/jquery-exercises/
//http://www.w3resource.com/php-exercises/
//http://learn.javascript.ru/
//http://www.sitepoint.com/5-typical-javascript-interview-exercises/
//http://ynonperek.com/javascript-exer.html
//http://www.ling.gu.se/~lager/kurser/webtechnology/lab4.html
