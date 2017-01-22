
angular.module('musicImprovApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html'//,
                        //controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
        
            .state('app.admin', {
                url:'admin',
                views: {
                    'header@': {
                        templateUrl : 'views/admin/header.html',
                        controller  : 'HeaderController'
                    },
                    'content@': {
                        templateUrl : 'views/admin/main.html'//,
                        //controller  : 'IndexController'
                    }
                }
            })
            .state('app.adminLessonList', {
                url: 'adminLessonList',
                views: {
                    'header@': {
                        templateUrl : 'views/admin/header.html',
                        controller  : 'HeaderController'
                    },
                    'content@' : {
                        templateUrl: 'views/admin/lessonList.html',
                        controller: 'LessonListController'
                    }
                }
            })
            .state('app.adminLessonAdd', {
                url: 'adminLessonAdd',
                views: {
                    'header@': {
                        templateUrl : 'views/admin/header.html',
                        controller  : 'HeaderController'
                    },
                    'content@' : {
                        templateUrl: 'views/admin/lessonAdd.html',
                        controller: 'LessonAddController'
                    }
                }
            })
            .state('app.adminLessonEdit', {
                url: 'adminLessonEdit/:id',
                views: {
                    'header@': {
                        templateUrl : 'views/admin/header.html',
                        controller  : 'HeaderController'
                    },
                    'content@' : {
                        templateUrl: 'views/admin/lessonEdit.html',
                        controller: 'LessonEditController'
                    }
                }
            })
            .state('app.adminUserList', {
                url: 'adminUserList',
                views: {
                    'header@': {
                        templateUrl : 'views/admin/header.html',
                        controller  : 'HeaderController'
                    },
                    'content@' : {
                        templateUrl: 'views/admin/UserList.html',
                        controller: 'UserListController'
                    }
                }
            })


////////////////
            .state('app.adminCourseList', {
                url: 'adminCourseList',
                views: {
                    'header@': {
                        templateUrl : 'views/admin/header.html',
                        controller  : 'HeaderController'
                    },
                    'content@' : {
                        templateUrl: 'views/admin/courseList.html',
                        controller: 'CourseListController'
                    }
                }
            })
            .state('app.adminCourseAdd', {
                url: 'adminCourseAdd',
                views: {
                    'header@': {
                        templateUrl : 'views/admin/header.html',
                        controller  : 'HeaderController'
                    },
                    'content@' : {
                        templateUrl: 'views/admin/courseAdd.html',
                        controller: 'CourseAddController'
                    }
                }
            })
            .state('app.adminCourseEdit', {
                url: 'adminCourseEdit/:id',
                views: {
                    'header@': {
                        templateUrl : 'views/admin/header.html',
                        controller  : 'HeaderController'
                    },
                    'content@' : {
                        templateUrl: 'views/admin/courseEdit.html',
                        controller: 'CourseEditController'
                    }
                }
            })

////////////////        
            .state('app.courseList', {
                url: 'courseList',
                views: {
                    'content@' : {
                        templateUrl: 'views/courses/courseList.html',
                        controller: 'CourseListController'
                    }
                }
            })
            .state('app.courseDetails', {
                url: 'courseDetails/:id',
                views: {
                    'content@' : {
                        templateUrl: 'views/courses/courseDetails.html',
                        controller: 'CourseDetailsController'
                    }
                }
            })
            
            // .state('app.admin', {
            //     url: 'admin',
            //     views: {
            //         'content@' : {
            //             templateUrl: 'views/admin.html'//,
            //             //controller  : 'AdminController'
            //         }
            //     }
            // })
            .state('app.profile', {
                url: 'profile',
                views: {
                    'content@' : {
                        templateUrl: 'views/profile.html'//,
                        //controller  : 'AdminController'
                    }
                }
            })
            .state('app.lessonList', {
                url: 'lessonList',
                views: {
                    'content@' : {
                        templateUrl: 'views/lessons/lessonList.html',
                        controller: 'LessonListController'
                    }
                }
            })
            .state('app.lessonDetails', {
                url: 'lessonDetails/:id',
                views: {
                    'content@' : {
                        templateUrl: 'views/lessons/lessonDetails.html',
                        controller: 'LessonDetailsController'
                    }
                }
            })
            .state('app.join', {
                url: 'join',
                views: {
                    'content@' : {
                        templateUrl: 'views/join.html'//,
                        //controller  : 'AdminController'
                    }
                }
            })
            .state('app.social', {
                url: 'social',
                views: {
                    'content@' : {
                        templateUrl: 'views/social.html'//,
                        //controller  : 'AdminController'
                    }
                }
            })
            
        ;    
    })
    // .config(["ngDialogProvider", function (ngDialogProvider) {
    //     ngDialogProvider.setDefaults({
    //         className: "ngdialog-theme-default",
    //         plain: false,
    //         showClose: true,
    //         closeByDocument: true,
    //         closeByEscape: true,
    //         appendTo: false,
    //         preCloseCallback: function () {
    //             console.log("default pre-close callback");
    //         }
    //     });
    // }]) 

;
