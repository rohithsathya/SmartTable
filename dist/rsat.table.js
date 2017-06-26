(function(orig) {
    if(!angular.modules){
        angular.modules = [];
    }
    
    angular.module = function() {
        if (arguments.length > 1) {
            angular.modules.push(arguments[0]);
        }
        return orig.apply(null, arguments);
    }
})(angular.module);
//check if the required module is available or not
//this module has dependency on icons so check if the icons module is laoded if not throw error
if(angular.modules.indexOf('rsat.icons') < 0){
    console.warn("smTable Module dependent on rsat.icons module, please load rsat.ui.icons.js file before loading smTable");
}
if(angular.modules.indexOf('rsat.ui.elements') < 0){
    console.warn("smTable Module dependent on rsat.ui.elements module, please load rsat.ui.icons.js file before loading smTable");
}
var smTableApp = angular.module('rsat.table', ['rsat.icons','rsat.ui.elements']);
smTableApp.directive('rsatTableCp', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            limit: '=',
            sortable: '='
        },
        controller: ['$scope', '$element', '$attrs',function($scope,$element,$attrs) {
            $scope.pageNumbers = [];
            $scope.currentPage = 1;
            $scope.orderbyField = '';
            $scope.reverseSort = false;
            $scope.gotoPage = function (pageNumber) {
                $scope.skip = (pageNumber - 1) * $scope.limit;
                $scope.tableData = $scope.data.slice($scope.skip, ($scope.skip + $scope.limit));
            }
            $scope.initTable = function () {
                $scope.gotoPage($scope.currentPage);
                $scope.totalPages = Math.ceil($scope.data.length / $scope.limit);
                for (var i = 1; i <= $scope.totalPages; i++) {
                    $scope.pageNumbers.push(i);
                }
                if ($scope.sortable) {
                    $scope.orderbyField = Object.keys($scope.data[0])[0];
                }
            }
            $scope.pageChange = function () {
                $scope.gotoPage($scope.currentPage);
            }
            $scope.gotoNext = function () {
                $scope.currentPage += 1;
                $scope.gotoPage($scope.currentPage);
            }
            $scope.gotoPrevious = function () {
                $scope.currentPage -= 1;
                $scope.gotoPage($scope.currentPage);
            }
            $scope.orderbyCol = function (colName) {
                if ($scope.sortable) {
                    $scope.orderbyField = colName;
                    $scope.reverseSort = !$scope.reverseSort;
                }
            }
            $scope.canShowThisColSortIcon = function (colName) {
                if ($scope.sortable) {
                    return $scope.orderbyField == colName;
                } else {
                    return false;
                }
            }
            $scope.initTable();

        }],
        template:'<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="width:100%"><thead><tr><th ng-click="orderbyCol(key)" ng-repeat="(key,value) in data[0]">{{key}} <span ng-show="canShowThisColSortIcon(key)"><span ng-show="!reverseSort"><icon-arrow-upward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-upward></span> <span ng-show="reverseSort"><icon-arrow-downward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-downward></span></span></th></tr></thead><tfoot><tr><th colspan="100%" style="text-align:right"><div style="float:left">Page :<select ng-options="page for page in pageNumbers" ng-model="currentPage" ng-change="pageChange()"></select></div>{{skip +1}}-{{skip+tableData.length}} of {{data.length}} <button rsat-Button-icon ng-click="gotoPrevious()" ng-disabled="currentPage <= 1"><icon-arrow-left></icon-arrow-left></button> <button rsat-Button-icon ng-click="gotoNext()" ng-disabled="currentPage >= totalPages"><icon-arrow-right></icon-arrow-right></button></th></tr></tfoot><tbody><tr ng-repeat="row in tableData | orderBy:orderbyField : reverseSort track by $index"><td ng-repeat="(key,value) in row">{{value}}</td></tr></tbody></table>',
    }

});
smTableApp.directive('rsatTableSp', function () {

    return {
        restrict: 'E',
        scope: {
            data: '=',
            limit: '=',
            skip:'=',
            total:'=',
            onnext:'&',
            onprev:'&',
            onpagechange:'&',
            sortable: '='
        },
        controller:['$scope', '$element', '$attrs',function ($scope, $element, $attrs) {
            $scope.pageNumbers = [];
            $scope.orderbyField = '';
            $scope.reverseSort = false;
            $scope.initTable = function () {
                $scope.currentPage = Math.ceil($scope.skip/$scope.limit) +1;
                $scope.totalPages = Math.ceil($scope.total / $scope.limit);
                for (var i = 1; i <= $scope.totalPages; i++) {
                    $scope.pageNumbers.push(i);
                }
                if ($scope.sortable) {
                    $scope.orderbyField = Object.keys($scope.data[0])[0];
                }
            }
            $scope.pageChange = function () {
                $scope.onpagechange({'pageNo':$scope.currentPage});
            }
            $scope.gotoNext = function () {
                $scope.onnext();
            }
            $scope.gotoPrevious = function () {
                $scope.onprev();
            }
            $scope.orderbyCol = function (colName) {
                if ($scope.sortable) {
                    $scope.orderbyField = colName;
                    $scope.reverseSort = !$scope.reverseSort;
                }
            }
            $scope.canShowThisColSortIcon = function (colName) {
                if ($scope.sortable) {
                    return $scope.orderbyField == colName;
                } else {
                    return false;
                }
            }
            $scope.initTable();

        }],
        template:'<table class="mdl-data-table mdl-shadow--2dp" style="width:100%"><thead><tr><th ng-click="orderbyCol(key)" ng-repeat="(key,value) in data[0]">{{key}} <span ng-show="canShowThisColSortIcon(key)"><span ng-show="!reverseSort"><icon-arrow-upward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-upward></span> <span ng-show="reverseSort"><icon-arrow-downward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-downward></span></span></th></tr></thead><tfoot><tr><th colspan="100%" style="text-align:right"><div style="float:left">Page :<select ng-options="page for page in pageNumbers" ng-model="currentPage" ng-change="pageChange()"></select></div>{{skip +1}}-{{skip+data.length}} of {{total}} <button rsat-Button-icon ng-click="gotoPrevious()" ng-disabled="skip <= 0"><icon-arrow-left></icon-arrow-left></button> <button rsat-Button-icon ng-click="gotoNext()" ng-disabled="(skip+data.length) > total"><icon-arrow-right></icon-arrow-right></button></th></tr></tfoot><tbody><tr ng-repeat="row in data | orderBy:orderbyField : reverseSort track by $index"><td ng-repeat="(key,value) in row">{{value}}</td></tr></tbody></table>'
    }

});
