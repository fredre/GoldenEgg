(function () {

    var app = angular.module('potConf', ["firebase", "ngRoute",'ui.bootstrap']);


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

//general app config
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

//Factory to determine authentication app config
    app.factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
            var ref = new Firebase("https://shining-fire-7469.firebaseio.com/");
            return $firebaseAuth(ref);
        }
    ]);

//Controller for the  login page
    app.controller('loginCtrl', ["$scope","Auth",
        function ($scope,Auth) {


            $scope.auth = Auth;

            $scope.login_anon = function() {
                $scope.authData = null;
                $scope.error = null;

                $scope.auth.$authAnonymously().then(function(authData) {
                    $scope.authData = authData;
                }).catch(function(error) {
                    $scope.error = error;
                });
            };


            $scope.login_normal = function() {


                $scope.auth.$authWithPassword({email: $scope.email, password: $scope.password}).then(function (authData) {
                    console.log("Logged in as:", authData.uid);
                    $scope.authData = authData;
                }).catch(function (error) {
                    console.error("Authentication failed:", error);
                    $scope.error = error;
                });

            };



        }
    ]);


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

//Controller for header
    app.controller('HeaderInfoContr',["$scope","Auth",
        function ($scope,Auth) {

            $scope.auth = Auth;

            // any time auth status updates, add the user data to scope
            $scope.auth.$onAuth(function(authData) {
                $scope.authData = authData;
            });

    }
    ]);

//Controller for footer
    app.controller('FooterInfoContr', function ($scope) {
        $scope.footinfo = appInfo;

    });


})();

//Reynier Landman
