'use strict';

angular.module('musicImprovApp')
//.constant("baseURL", "http://localhost:3000/")
.constant("baseURL", "/")
.service('LessonFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    console.log('LessonFactory');
    this.getLessons = function () {
    return $resource(baseURL + "lessons/:id", null, {
            'update': {method:'PUT'},
            'add': {method:'POST'},
            'query':  {method:'GET', isArray: true},
            'get': {method:'GET'}
        });
    }
}])
.service('LessonListFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    console.log('LessonListFactory');
    this.getLessons = function () {
    return $resource(baseURL + "lessonlist", null, {
            'query':  {method:'GET', isArray: true},
        });
    }
}])
.service('CourseListFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    console.log('CourseListFactory');
    this.getCourses = function () {
    return $resource(baseURL + "courses/:id", null, {
            'update': {method:'PUT'},
            'add': {method:'POST'},
            'query':  {method:'GET', isArray: true},
            'get': {method:'GET'}
        });
    }
}])
.service('UserListFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    console.log('UserListFactory');
    this.getUsers = function () {
    return $resource(baseURL + "users/:id", null, {
            'update': {method:'PUT'},
            'query':  {method:'GET', isArray: true},
            'get': {method:'GET'}
        });
    }
}])
.factory('AuthFactory', ['$resource', '$http', '$window', '$rootScope', 'baseURL', 'ngDialog', function($resource, $http, $window, $rootScope, baseURL, ngDialog){
    
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var isAdmin = false;
    var authToken = undefined;
    

  function loadUserCredentials() {
    var credentials = $window.localStorage.getItem(TOKEN_KEY,'{}');
    if (credentials != null && credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $window.localStorage.setItem(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    isAdmin = credentials.isAdmin;
    authToken = credentials.token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAdmin = false;
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $window.localStorage.removeItem(TOKEN_KEY);
  }
     
    authFac.login = function(loginData) {
        
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
              storeUserCredentials({
                  username: loginData.username, 
                  isAdmin: response.admin,
                  token: response.token});
              $rootScope.$broadcast('login:Successful');
           },
           function(response){
              isAuthenticated = false;
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

    };
    
    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };
    
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $window.localStorage.setItem('userinfo',
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };

    authFac.getIsAdmin = function() {
        return isAdmin;  
    };

    loadUserCredentials();
    
    return authFac;
    
}])

;
