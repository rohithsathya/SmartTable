var smTableApp = angular.module('rsat.ui', ['rsat.icons']);
smTableApp.directive('smTableCp', function () {

    return {
        restrict: 'E',
        scope: {
            data: '=',
            limit: '=',
            sortable: '='
        },
        controller: function ($scope, $element, $attrs) {
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

        },
        template: [
            '<table class="mdl-data-table mdl-shadow--2dp" style="width:100%">',
            '<thead>',
            '<tr>',
            '<th ng-click="orderbyCol(key)" ng-repeat="(key,value) in data[0]">',
            '{{key}}',
            ' <span ng-show="canShowThisColSortIcon(key)">',
            '<span ng-show="!reverseSort">',
            '<icon-arrow-upward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-upward>',
            '</span>',
            '<span ng-show="reverseSort">',
            '<icon-arrow-downward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-downward>',
            ' </span>',
            ' </span>',
            '</th>',
            '</tr>',
            ' </thead>',
            '<tfoot>',
            '<tr>',
            '<th colspan="100%">',
            '<div style="float:left">',
            'Page : ',
            '<select ng-options="page for page in pageNumbers" ng-model="currentPage" ng-change="pageChange()" ></select>',
            ' </div>',
            '  {{skip +1}}-{{skip+tableData.length}} of {{data.length}}',
            '<button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoPrevious()" ng-disabled="currentPage <= 1">',
            '<icon-arrow-left></icon-arrow-left>',
            ' </button>',
            '  <button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoNext()" ng-disabled="currentPage >= totalPages">',
            '<icon-arrow-right></icon-arrow-right>',
            ' </button>',

            '</th>',
            '  </tr>',

            '</tfoot>',
            ' <tbody>',
            '<tr ng-repeat="row in tableData | orderBy:orderbyField : reverseSort track by $index">',
            '<td ng-repeat="(key,value) in row">{{value}}</td>',
            '  </tr>',

            '  </tbody>',
            '  </table>'
        ].join('')
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
        controller: function ($scope, $element, $attrs) {
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

        },
        template: [
            ' <table class="mdl-data-table mdl-shadow--2dp" style="width:100%">',
            '<thead>',
            '<tr>',
            '<th ng-click="orderbyCol(key)" ng-repeat="(key,value) in data[0]">',
            '{{key}}',
            ' <span ng-show="canShowThisColSortIcon(key)">',
            '<span ng-show="!reverseSort">',
            '<icon-arrow-upward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-upward>',
            '</span>',
            '<span ng-show="reverseSort">',
            '<icon-arrow-downward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-downward>',
            ' </span>',
            ' </span>',
            '</th>',
            '</tr>',
            ' </thead>',
            '<tfoot>',
            '<tr>',
            '<th colspan="100%">',
            '<div style="float:left">',
            'Page : ',
            '<select ng-options="page for page in pageNumbers" ng-model="currentPage" ng-change="pageChange()" ></select>',
            ' </div>',
            '  {{skip +1}}-{{skip+data.length}} of {{total}}',
            '<button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoPrevious()" ng-disabled="skip <= 0">',
            '<icon-arrow-left></icon-arrow-left>',
            ' </button>',
            '  <button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoNext()" ng-disabled="(skip+data.length) > total">',
            '<icon-arrow-right></icon-arrow-right>',
            ' </button>',

            '</th>',
            '  </tr>',

            '</tfoot>',
            ' <tbody>',
            '<tr ng-repeat="row in data | orderBy:orderbyField : reverseSort track by $index">',
            '<td ng-repeat="(key,value) in row">{{value}}</td>',
            '  </tr>',

            '  </tbody>',
            '  </table>'
        ].join('')
    }

});

smTableApp.directive('smIconUp', function () {
    return {
        restrict: 'E',
        scope: {
            size: '@',
            color: '@'
        },
        link: function ($scope, $element, $attrs) {
        },
        controller: function ($scope, $element, $attrs) {
        },
        template: ['<svg fill="{{color}}" transform="scale({{size/24}})"  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">',
            '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"  />',
            '<path d="M0 0h24v24H0z" fill="none" />',
            '</svg>'].join('')

    }

});
smTableApp.directive('smIconDown', function () {
    return {
        restrict: 'E',
        scope: {
            size: '@',
            color: '@'
        },
        link: function ($scope, $element, $attrs) {
        },
        controller: function ($scope, $element, $attrs) {
        },
        template: ['<svg fill="{{color}}" transform="scale({{size/24}}) rotate(180deg)"  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">',
            '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"  />',
            '<path d="M0 0h24v24H0z" fill="none" />',
            '</svg>'].join('')

    }

});
