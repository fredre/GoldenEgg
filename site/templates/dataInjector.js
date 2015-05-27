(function () {

    var app = angular.module('potInject', []);


    app.controller('IframeCtrl', function ($scope) {
        $scope.value = "Test";

        window.updatedata = function (data) {
            $scope.$apply(function () {
                $scope.value = data;

            });
        };

    });


})();
