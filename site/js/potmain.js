(function () {

    var app = angular.module('potConf', ["firebase", "ngRoute",'ui.bootstrap',"ngMaterial",'ngMessages'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('light-blue')
                .accentPalette('orange');
        });

//General Info for the APP
    var appInfo = {
        name: "The app name",
        contact: "hattingh.fredre@gmail.com",
        year: "2014",
        version: "0.0"
    };

    var templatesInfo = [
        {
            name: "The test template",
            desc: "A template used for testing purposes",
            show: true,
            id: 1,
            usedcounter: 4,
            thumbnail: "balbal.jpg",
            preview:"preview.png"
        },
        {
            name: "Template 2",
            desc: "Good looking template for nice people",
            show: true,
            id: 2,
            usedcounter: 4,
            thumbnail: "balbal.jpg",
            preview:"preview.png"
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

// a factory to create a re-usable sites object
// we pass in a username and get back their synchronized data
    app.factory("Profile", ["$firebaseObject",
        function($firebaseObject) {
            return function(userid) {

                // create a reference to the Firebase where we will store our data
                var ref = new Firebase("https://shining-fire-7469.firebaseio.com/sites/");
                var profileRef = ref.child(userid);

                // return it as a synchronized object
                return $firebaseObject(profileRef);
            }
        }
    ]);


//Controller for the  login page
    //TODO: Activate FB login
    app.controller('loginCtrl', ["$scope","Auth","Profile","$filter","$mdToast",
        function ($scope,Auth,Profile,$filter,$mdToast) {


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

                //Start the login animation
                $scope.loadingLogin=true;

                $scope.auth.$authWithPassword({email: $scope.email, password: $scope.password}).then(function (authData) {
                    console.log("Logged in as:", authData.uid);
                    $scope.authData = authData;

                    //After login make sure to update last login time. This will also serve as an entry
                    //point to make sure the use has something in the database

                    //Get profile and save basic info on login
                    $scope.profile = Profile(authData.uid);
                    $scope.profile.email = authData.password.email;
                    $scope.profile.lastSeen = $filter('date')(new Date(),'medium');
                    $scope.profile.$save();

                    //TODO: Redirect to correct page when login is scsessful
                    $scope.loadingLogin=false;

                }).catch(function (error) {
                    //TODO Add nice error message for login failures
                    console.error("Authentication failed:", error);
                    $scope.error = error;

                    $mdToast.show($mdToast.simple().content('Hello!'));

                    $scope.loadingLogin=false;
                });

            };



        }
    ]);


//Controller for the  appBuilder.html page
    app.controller('appBuilderCtrl',["$scope","Profile","Auth","$mdSidenav","$mdMedia",
        function ($scope,Profile,Auth,$mdSidenav,$mdMedia) {

        //Load info from the array
        $scope.tempInfo = templatesInfo;

        //First templete to load
        $scope.selectedTemplID = 1;
        $scope.selected = 1;

        //Get the users Profile data and Authentication status!
        //The authenticaqtion ID is needed to get the correct object and is binded to the $scope.profile

            $scope.authData = Auth.$getAuth();

            if ($scope.authData) {
                console.log("Logged in as:", $scope.authData.uid);
            } else {
                console.log("Logged out");
                //TODO: Throw back to login page since the user needs to be logged in to complete this action
                console.error("User should not be able to be here without loggin in.!");
            }


            Profile($scope.authData.uid).$bindTo($scope, "profile").then(function() {
                console.log($scope.profile);
            });



            //Handles template selection changes
        $scope.selectTempl = function (theTemp) {
            console.log(theTemp);
            $scope.selectedTemplID = theTemp.id;

            $scope.selected = theTemp;

        };

        //Handles changes to any content data that needs to be passed over to the iframe
        $scope.updateIframe = function () {
            document.getElementById('myResponsiveWindow').contentWindow.updatedata($scope.profile);
        };

        //Handles changes to any content data that needs to be passed over to the iframe
        $scope.openTemplateSelector = function () {
            $mdSidenav('right').toggle();
        };

    }
    ]);

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


