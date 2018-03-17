'use strict'

var app = angular.module('myApp', ['base64', 'chart.js']);

var ctrl = app.controller('myCtrl', function($scope, $http, $filter, $window, $base64) {
    $scope.isLoginDone = false;
    $scope.instance = 'https://dev49321.service-now.com/';
    $scope.umane = 'guest';
    $scope.pass = 'temp1234';

    // sort order
    $scope.orderByMe = function(x) {
        $scope.myOrderBy = x;
    };

    $scope.formatDate = function(date){
        var dateOut = new Date(date);
        return dateOut;
    };
});

var loginDir = ctrl.directive('loginDir', function(){
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../loginTemplate.html',
        controller: function( $scope ) {
            $scope.isLoginDone = false;
            $scope.logon = function() {
                $scope.isLoginDone = true;
            }
        }
    }
});

var dashDir = ctrl.directive('dashboardDir', function(){
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../dashboardTemplate.html',
        controller: function( $scope, $http, $filter, $base64 ) {
            $scope.$watch('isLoginDone', function() {
                if($scope.isLoginDone) {

                    $scope.option = {"headers":{"authorization":"Basic "+$base64.encode($scope.umane+':'+$scope.pass)}};

                    $http.get($scope.instance + "/api/now/table/incident", $scope.option)
                        .then(function (response) {
                            $scope.result = response.data.result;

                            $scope.chartLabels = ['New', 'In Progress', 'On Hold', 'Resolved', 'Closed', 'Canceled'];
                            $scope.chartData = [
                                $filter('filter')($scope.result, {state: '1'}).length,
                                $filter('filter')($scope.result, {state: '2'}).length,
                                $filter('filter')($scope.result, {state: '3'}).length,
                                $filter('filter')($scope.result, {state: '6'}).length,
                                $filter('filter')($scope.result, {state: '7'}).length,
                                $filter('filter')($scope.result, {state: '8'}).length,
                            ];
                        });

                    $http.get($scope.instance + "/api/now/table/sys_choice?element=incident_state", $scope.option)
                        .then(function (response) {
                            $scope.state = response.data.result;
                        });

                    $http.get($scope.instance + "/api/now/table/sys_choice?element=urgency", $scope.option)
                        .then(function (response) {
                            $scope.urgency = response.data.result;
                        });

                    $http.get($scope.instance + "/api/now/table/sys_user", $scope.option)
                        .then(function (response) {
                            $scope.users = response.data.result;

                            // add new property user name to $scope.result
                            $scope.result.forEach(function (obj) {
                                obj.uName = $filter('filter')($scope.users, {sys_id:
                                            $filter('filter')($scope.result, {sys_id: obj.sys_id}, true)[0].caller_id.value
                                            }, true)[0].name;
                                obj.iState = $filter('filter')($scope.state, {value:
                                             $filter('filter')($scope.result, {sys_id: obj.sys_id}, true)[0].state
                                            }, true)[0].label;
                                obj.iUrgency = $filter('filter')($scope.urgency, {value:
                                               $filter('filter')($scope.result, {sys_id: obj.sys_id}, true)[0].urgency
                                              }, true)[0].label;
                            });
                        });
                    $scope.puDlg = function(x) {
                        $scope.shortDescription = $filter('filter')($scope.result, { sys_id: x  }, true)[0].short_description;
                        $scope.iNumber = $filter('filter')($scope.result, { sys_id: x  }, true)[0].number;
                        $scope.description = $filter('filter')($scope.result, { sys_id: x  }, true)[0].description;
                        $scope.opened = $filter('filter')($scope.result, { sys_id: x  }, true)[0].opened_at;
                        $scope.caller = $filter('filter')($scope.result, { sys_id: x  }, true)[0].uName;
                        $scope.iState = $filter('filter')($scope.result, { sys_id: x  }, true)[0].iState;
                        $scope.iUrgency = $filter('filter')($scope.result, { sys_id: x  }, true)[0].urgency;;
                        $scope.priority = $filter('filter')($scope.result, { sys_id: x  }, true)[0].priority;
                        $scope.close_code = $filter('filter')($scope.result, { sys_id: x  }, true)[0].close_code;

                        $scope.showPopUpDialog = true;
                        $scope.popUpDialogCallback = 'closePopUpDialog';
                    }
                }
            });
        }
    }
});

var popUp = ctrl.directive('popupDetails', function(){
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../detailsTemplate.html',
        controller: function( $scope ) {
                $scope.showPopUpDialog = false;
                $scope.closePopUpDialog = function () {
                    $scope.showPopUpDialog = false;
                }
        }
    }
});