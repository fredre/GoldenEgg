(function () {

    var app = angular.module('potConf', ["firebase", 'ngRoute']);


//General Info for the APP
    var appInfo = {
        name: "The app name",
        contact: "hattingh.fredre@gmail.com",
        year: "2014",
        version: "0.0"
    };

    var templatesInfo = [
        {
            name: "Template 1",
            desc: "Custom template",
            show: true,
            id: 0,
            usedcounter: 4,
            thumbnail: "balbal.jpg"


        },
        {
            name: "Template 2",
            desc: "Good looking template for nice people",
            show: true,
            id: 1,
            usedcounter: 4,
            thumbnail: "balbal.jpg"
        }
    ];

//general app confir
    app.config(function ($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'pages/home.html'
            })

            // route for the about page
            .when('/login', {
                templateUrl: 'pages/login.html',
                controller: 'loginCtrl'
            })

            // route for the contact page
            .when('/builder', {
                templateUrl: 'pages/appBuilder.html',
                controller: 'appBuilderCtrl'
            });
    });

//Controller for the  ? page
    app.controller('loginCtrl', function ($scope) {
        $scope.footinfo = appInfo;

    });


//Controller for the  appBuilder.html page
    app.controller('appBuilderCtrl', function ($scope) {

        //Load ingo from the array
        $scope.tempInfo = templatesInfo;

        //First templete to load
        $scope.selectedTemplID = 0;
        $scope.selected = 0;

        //Handles template selection changes
        $scope.selectTempl = function (theTemp) {
            console.log(theTemp);
            $scope.selectedTemplID = theTemp.id;

            $scope.selected = theTemp;

        };

        //Handles changes to any content data that needs to be passed over to the iframe
        $scope.updateIframe = function () {
            document.getElementById('myResponsiveWindow').contentWindow.updatedata($scope.data);
        };

    });

//Controller for the  ? page
    app.controller('FooterInfoContr', function ($scope) {
        $scope.footinfo = appInfo;

    });


})();


