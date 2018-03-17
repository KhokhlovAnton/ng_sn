'use strict'

var app = angular.module('myApp', []);

var ctrl = app.controller('myCtrl', function($scope, $http, $filter, $window) {
    $scope.isLoginDone = false;

});

var loginDir = ctrl.directive('loginDir', function(){
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../loginTemplate.html',
        controller: function( $scope ) {
        }
    }
});
var dashDir = ctrl.directive('DashboardDir', function(){
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../dashboardTemplate.html',
        controller: function( $scope ) {
        }
    }
});
var popUp = ctrl.directive('popupDetails', function(){
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../detailsTemplate.html',
        controller: function( $scope ) {
        }
    }
});