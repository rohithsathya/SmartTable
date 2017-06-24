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
