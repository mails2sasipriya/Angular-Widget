angular.module('myApp.widget', []).directive('widget', function ($interval) {
    return {
        restrict: 'AEC',
        templateUrl: 'component/widget/_widget.html',
        scope: {
            paused: '@',
            positive: '@',
            delete: '=',
            id: '@'
        },
        link: function (scope) {

            var interval_promise;
            if (scope.positive === 'true') {
                scope.random = function () {
                    scope.number =  ~~(Math.random() * 98) + 1;
                }
            } else {
                scope.random = function () {
                    scope.number =  -1 * (~~(Math.random() * 98) + 1);
                }
            }
            scope.random();

            scope.play = function () {
                if (typeof interval_promise === 'undefined' || interval_promise.$$state.status === 2) {
                    // scope.random();
                    scope.random();
                    interval_promise = $interval(scope.random, 1000);
                }
            };

            scope.pause = function () {
                $interval.cancel(interval_promise);
            };

            if (scope.paused === 'false') {
                scope.play();
            }

        }

    };
});