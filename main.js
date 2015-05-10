angular.module('root', [])
.directive('ngEnter', function() {
  return function (scope, element, attrs) {
    element.bind("keyup", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.ngEnter);
        });
      }
    });
  }
})
.controller('game', ['$scope', function ($scope) {
  $scope.games = JSON.parse(localStorage.getItem('games')) || [];
  $scope.tempShots = 1;
  $scope.pushGame = function () {
    $scope.games.push({
      shots: $scope.tempShots,
      count: 0,
      name: $scope.tempGame
    });
    $scope.tempGame = '';
  }
  $scope.$watch('games', function () {
    console.log("Changed! Saving to local storage.");
    localStorage.setItem('games', JSON.stringify($scope.games));
  }, true);
  $scope.incGame = function (index) {
    $scope.games[index].count++;
  };
  $scope.decGame = function (index) {
    ($scope.games[index].count - 1) > -1 ? $scope.games[index].count-- : $scope.games[index].count = 0;
  };
  $scope.deleteGame = function (index) {
    $scope.games.splice(index, 1);
  }
  $scope.getTotalShots = function () {
    var totShots = 0;
    $scope.games.forEach(function(val) {
      totShots += val.count * val.shots;
    });
    return totShots;
  }
  $scope.getTotalActions = function () {
    var totActs = 0;
    $scope.games.forEach(function (val) {
      totActs += val.count;
    });
    return totActs;
  }
  $scope.numShots = function (index) {
    return (($scope.games[index].shots === 1) ? $scope.games[index].shots + ' shot' : $scope.games[index].shots + ' shots');
  }
  $scope.loadDefaults = function () {
    var defaults = [{"shots":1,"count":0,"name":"Every time Strembot times somebody out","$$hashKey":"object:6"},
    {"shots":1,"count":0,"name":"Every time Force mispronounces a word"},
    {"shots":1,"count":0,"name":"Every time something gets fucked up on OBS"},
    {"shots":1,"count":0,"name":"Every time TheRedCoyote professes his love for Hunter"},
    {"shots":1,"count":0,"name":"Every time Force is disrespectful on stream"},
    {"shots":2,"count":0,"name":"Every time someone comes in just to troll"},
    {"shots":2,"count":0,"name":"Every time Force says strem"},
    {"shots":2,"count":0,"name":"Every time someone follows"},
    {"shots":3,"count":0,"name":"Every time someone donates"},
    {"shots":4,"count":0,"name":"Every time 2tacopoops comes back"},
    {"shots":5,"count":0,"name":"If the donation is greater than $10"},
    {"shots":10,"count":0,"name":"If the donation is greater than $50"}];
    defaults.forEach(function (val) {
      $scope.games.push(val);
    });
  }
}]);
