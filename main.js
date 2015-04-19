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
    $scope.games = JSON.parse('[{"shots":1,"count":0,"name":"Every time Nightbot times somebody out","$$hashKey":"object:6"},{"shots":1,"count":0,"name":"Every time Force mispronounces a word","$$hashKey":"object:8"},{"shots":1,"count":0,"name":"Every time something gets fucked up on OBS","$$hashKey":"object:10"},{"shots":1,"count":0,"name":"Every time TheRedCoyote professes his love for Hunter","$$hashKey":"object:12"},{"shots":2,"count":0,"name":"Every time someone comes in just to troll","$$hashKey":"object:14"},{"shots":2,"count":0,"name":"Every time Force says strem","$$hashKey":"object:16"},{"shots":2,"count":0,"name":"Every time someone follows","$$hashKey":"object:18"},{"shots":3,"count":0,"name":"Every time someone donates","$$hashKey":"object:20"},{"shots":4,"count":0,"name":"Every time 2tacopoops comes back","$$hashKey":"object:22"},{"shots":5,"count":0,"name":"If the donation is greater than $10","$$hashKey":"object:24"},{"shots":10,"count":0,"name":"If the donation is greater than $50","$$hashKey":"object:26"}]')
  }
}]);
