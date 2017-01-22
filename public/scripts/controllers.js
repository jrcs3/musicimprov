'use strict';

angular.module('musicImprovApp')
.controller('IndexController', ['$scope', function ($scope) {
}])
.controller('AdminController', ['$scope', function ($scope) {
}])
.controller('CourseListController', ['$scope', 'CourseListFactory', function ($scope, CourseListFactory) {
    $scope.showMenu = true;

    CourseListFactory.getCourses().query(
        function (response) {
            $scope.courses = response;
            $scope.showMenu = true;
        },
        function (response) {
            console.log('CourseListController Failure: ');
            console.log("Error: " + response.status + " " + response.statusText);
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    
}])
.controller('UserListController', ['$scope', 'UserListFactory', function ($scope, UserListFactory) {
    $scope.showMenu = true;
    console.log('UserListController');
    UserListFactory.getUsers().query(
        function (response) {
            $scope.users = response;
            $scope.showMenu = true;
        },
        function (response) {
            console.log('UserListController Failure: ');
            console.log("Error: " + response.status + " " + response.statusText);
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    
}])
.controller('LessonListController', ['$scope', 'LessonListFactory', 'CourseListFactory', function ($scope, LessonListFactory, CourseListFactory) {
    $scope.showMenu = true;

    $scope.CourseFilter = '';

    CourseListFactory.getCourses().query(
        function (courseResponse) {
            $scope.courseList = courseResponse;
            LessonListFactory.getLessons().query(
                function (response) {
                    $scope.lessons = response;
                    $scope.showMenu = true;
                },
                function (response) {
                    console.log('LessonListController Failure: ');
                    console.log("Error: " + response.status + " " + response.statusText);
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
        },
        function (courseResponse) {
            console.log('LessonDetailsController.CourseList Failure: ');
            console.log("Error: " + courseResponse.status + " " + courseResponse.statusText);
            $scope.message = "Error: " + courseResponse.status + " " + courseResponse.statusText;
        });
    
}])
.controller('LessonDetailsController', ['$scope', '$stateParams', 'LessonFactory', function ($scope, $stateParams, LessonFactory) {
    $scope.showLesson = false;

    LessonFactory.getLessons().get( 
        { id: $stateParams.id }
        ).$promise.then(
        function (response) {
            $scope.lesson = response;
            $scope.showLesson = true;
            //$scope.contentText = 
        },
        function (response) {
            console.log('LessonDetailsController Failure: ');
            console.log("Error: " + response.status + " " + response.statusText);
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    
}])
.controller('CourseDetailsController', ['$scope', '$stateParams', 'CourseListFactory', function ($scope, $stateParams, CourseListFactory) {
    $scope.showCourse = false;

    CourseListFactory.getCourses().get( 
        { id: $stateParams.id }
        ).$promise.then(
        function (response) {
            $scope.course = response;
            $scope.showCourse = true;
            //$scope.contentText = 
        },
        function (response) {
            console.log('CourseDetailsController Failure: ');
            console.log("Error: " + response.status + " " + response.statusText);
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    
}])
.controller('LessonEditController', ['$scope', '$stateParams', 'LessonFactory', 'CourseListFactory', function ($scope, $stateParams, LessonFactory, CourseListFactory) {
    $scope.showLesson = false;
    $scope.message = 'Loading ...';

    LessonFactory.getLessons().get( 
        { id: $stateParams.id } )
        .$promise.then(
        function (response) {
            console.log(response);
            $scope.lesson = response;
            $scope.message = "";
            $scope.showLesson = true;
            CourseListFactory.getCourses().query(
                function (courseResponse) {
                    $scope.courseList = courseResponse;
                },
                function (courseResponse) {
                    console.log('LessonDetailsController.CourseList Failure: ');
                    console.log("Error: " + courseResponse.status + " " + courseResponse.statusText);
                    $scope.message = "Error: " + courseResponse.status + " " + courseResponse.statusText;
                });
        },
        function (response) {
            console.log('LessonDetailsController Failure: ');
            console.log("Error: " + response.status + " " + response.statusText);
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    $scope.sendEdit = function () {
        LessonFactory.getLessons().update( { id: $scope.lesson._id }, $scope.lesson )
            .$promise.then(
                function (response) {
                    console.log('ok' + response);
                    $scope.message = 'Record Saved';
                },
                function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };
}])
.controller('LessonAddController', ['$scope', '$stateParams', 'LessonFactory', 'CourseListFactory', function ($scope, $stateParams, LessonFactory, CourseListFactory) {
    $scope.showLesson = false;
    $scope.message = '';

    CourseListFactory.getCourses().query(
        function (courseResponse) {
            $scope.courseList = courseResponse;
        },
        function (courseResponse) {
            console.log('LessonDetailsController.CourseList Failure: ');
            console.log("Error: " + courseResponse.status + " " + courseResponse.statusText);
            $scope.message = "Error: " + courseResponse.status + " " + courseResponse.statusText;
        });
    

    $scope.sendAdd = function () {
        LessonFactory.getLessons().add( { id: $scope.lesson._id }, $scope.lesson )
            .$promise.then(
                function (response) {
                    console.log('ok' + response);
                    $scope.message = 'Record Added';
                },
                function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };
}])

.controller('UserListController', ['$scope', 'UserListFactory', function ($scope, UserListFactory) {
    $scope.showMenu = true;
    console.log('UserListController');
    UserListFactory.getUsers().query(
        function (response) {
            $scope.users = response;
            $scope.showMenu = true;
        },
        function (response) {
            console.log('UserListController Failure: ');
            console.log("Error: " + response.status + " " + response.statusText);
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    
}])
.controller('CourseEditController', ['$scope', '$stateParams', 'CourseListFactory', function ($scope, $stateParams, CourseListFactory) {
    $scope.showCourse = false;
    $scope.message = 'Loading ...';

    CourseListFactory.getCourses().get( 
        { id: $stateParams.id } )
        .$promise.then(
        function (response) {
            $scope.course = response;
            $scope.message = "";
            $scope.showCourse = true;
        },
        function (response) {
            console.log('CourseDetailsController Failure: ');
            console.log("Error: " + response.status + " " + response.statusText);
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    $scope.sendEdit = function () {
        CourseListFactory.getCourses().update( { id: $scope.course._id }, $scope.course )
            .$promise.then(
                function (response) {
                    console.log('ok' + response);
                    $scope.message = 'Record Saved';
                },
                function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };
}])

.controller('CourseAddController', ['$scope', '$stateParams', 'CourseListFactory', function ($scope, $stateParams, CourseListFactory) {
    $scope.showCourse = false;
    $scope.message = '';

    $scope.sendAdd = function () {
        CourseListFactory.getCourses().add( { id: $scope.course._id }, $scope.course )
            .$promise.then(
                function (response) {
                    $scope.message = 'Record Added';
                },
                function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    $scope.isAdmin = false;
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
        $scope.isAdmin = AuthFactory.getIsAdmin();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.isAdmin = false;
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $scope.isAdmin = AuthFactory.getIsAdmin();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $scope.isAdmin = AuthFactory.getIsAdmin();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$window', 'AuthFactory', function ($scope, ngDialog, $window, AuthFactory) {
    
    $scope.loginData = $window.localStorage.getItem('userinfo','{}');
    //$scope.loginData = {};
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $window.localStorage.setItem('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])
.controller('RegisterController', ['$scope', 'ngDialog', '$window', 'AuthFactory', function ($scope, ngDialog, $window, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])

;
