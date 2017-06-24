(function(orig) {
    if(!angular.modules){
        console.log(angular.modules);
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

var smTableApp = angular.module('rsat.ui', ['rsat.icons']);
smTableApp.directive('smTableCp', function () {
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
        templateUrl:'templateCP.html',
    }

});
smTableApp.directive('smTableSp', function () {

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
        templateUrl: 'templateSP.html'
    }

});

//adding css
var sheet = (function() {
    var styles = document.getElementsByTagName("style");
    var style;
    if(styles == undefined || styles.length <1){
         style = document.createElement("style");
    }else{
        style = styles[0];
    }
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	return style.sheet;
})();
sheet.insertRule(".rsat-data-table {position: relative;border: 1px solid rgba(0, 0, 0, .12);border-collapse: collapse;white-space: nowrap;font-size: 13px;background-color: #fff;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)}", 1);
sheet.insertRule(".rsat-data-table thead { padding-bottom: 3px}", 1);
sheet.insertRule(".rsat-data-table tbody tr {position: relative; height: 48px;transition-duration: .28s;transition-timing-function: cubic-bezier(.4, 0, .2, 1);transition-property: background-color}", 1);
sheet.insertRule(".rsat-data-table tbody tr:hover { background-color: #eee}", 1);
sheet.insertRule(".rsat-data-table td:first-of-type,.rsat-data-table th:first-of-type {padding-left: 24px}", 1);
sheet.insertRule(".rsat-data-table td:last-of-type,.rsat-data-table th:last-of-type {padding-right: 24px}", 1);
sheet.insertRule(".rsat-data-table td {position: relative;height: 48px;border-top: 1px solid rgba(0, 0, 0, .12);border-bottom: 1px solid rgba(0, 0, 0, .12);padding: 12px 18px;box-sizing: border-box}", 1);
sheet.insertRule(".rsat-data-table th {position: relative;vertical-align: bottom;text-overflow: ellipsis;font-weight: 700;line-height: 24px;letter-spacing: 0;height: 48px;font-size: 12px;color: rgba(0, 0, 0, .54);padding: 0 18px 12px 18px;padding-bottom: 8px;box-sizing: border-box}", 1);

