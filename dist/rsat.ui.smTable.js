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
        template:'<style>\n    .mdl-data-table {\n        position: relative;\n        border: 1px solid rgba(0, 0, 0, .12);\n        border-collapse: collapse;\n        white-space: nowrap;\n        font-size: 13px;\n        background-color: #fff\n    }\n\n    .mdl-data-table thead {\n        padding-bottom: 3px\n    }\n\n    .mdl-data-table thead .mdl-data-table__select {\n        margin-top: 0\n    }\n\n    .mdl-data-table tbody tr {\n        position: relative;\n        height: 48px;\n        transition-duration: .28s;\n        transition-timing-function: cubic-bezier(.4, 0, .2, 1);\n        transition-property: background-color\n    }\n\n    .mdl-data-table tbody tr.is-selected {\n        background-color: #e0e0e0\n    }\n\n    .mdl-data-table tbody tr:hover {\n        background-color: #eee\n    }\n\n    .mdl-data-table td {\n        text-align: right\n    }\n\n    .mdl-data-table th {\n        padding: 0 18px 12px 18px;\n        text-align: right\n    }\n\n    .mdl-data-table td:first-of-type,\n    .mdl-data-table th:first-of-type {\n        padding-left: 24px\n    }\n\n    .mdl-data-table td:last-of-type,\n    .mdl-data-table th:last-of-type {\n        padding-right: 24px\n    }\n\n    .mdl-data-table td {\n        position: relative;\n        height: 48px;\n        border-top: 1px solid rgba(0, 0, 0, .12);\n        border-bottom: 1px solid rgba(0, 0, 0, .12);\n        padding: 12px 18px;\n        box-sizing: border-box\n    }\n\n    .mdl-data-table td,\n    .mdl-data-table td .mdl-data-table__select {\n        vertical-align: middle\n    }\n\n    .mdl-data-table th {\n        position: relative;\n        vertical-align: bottom;\n        text-overflow: ellipsis;\n        font-weight: 700;\n        line-height: 24px;\n        letter-spacing: 0;\n        height: 48px;\n        font-size: 12px;\n        color: rgba(0, 0, 0, .54);\n        padding-bottom: 8px;\n        box-sizing: border-box\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending,\n    .mdl-data-table th.mdl-data-table__header--sorted-descending {\n        color: rgba(0, 0, 0, .87)\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending:before,\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:before {\n        font-family: \'Material Icons\';\n        font-weight: 400;\n        font-style: normal;\n        line-height: 1;\n        letter-spacing: normal;\n        text-transform: none;\n        display: inline-block;\n        word-wrap: normal;\n        -moz-font-feature-settings: \'liga\';\n        font-feature-settings: \'liga\';\n        -webkit-font-feature-settings: \'liga\';\n        -webkit-font-smoothing: antialiased;\n        font-size: 16px;\n        content: \'\\e5d8\';\n        margin-right: 5px;\n        vertical-align: sub\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending:hover,\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:hover {\n        cursor: pointer\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending:hover:before,\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:hover:before {\n        color: rgba(0, 0, 0, .26)\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:before {\n        content: \'\\e5db\'\n    }\n\n    .mdl-data-table__select {\n        width: 16px\n    }\n\n    .mdl-data-table__cell--non-numeric.mdl-data-table__cell--non-numeric {\n        text-align: left\n    }\n\n    .mdl-shadow--2dp {\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)\n    }\n</style><table class="mdl-data-table mdl-shadow--2dp" style="width:100%"><thead><tr><th ng-click="orderbyCol(key)" ng-repeat="(key,value) in data[0]">{{key}} <span ng-show="canShowThisColSortIcon(key)"><span ng-show="!reverseSort"><icon-arrow-upward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-upward></span> <span ng-show="reverseSort"><icon-arrow-downward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-downward></span></span></th></tr></thead><tfoot><tr><th colspan="100%"><div style="float:left">Page :<select ng-options="page for page in pageNumbers" ng-model="currentPage" ng-change="pageChange()"></select></div>{{skip +1}}-{{skip+tableData.length}} of {{data.length}} <button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoPrevious()" ng-disabled="currentPage <= 1"><icon-arrow-left></icon-arrow-left></button> <button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoNext()" ng-disabled="currentPage >= totalPages"><icon-arrow-right></icon-arrow-right></button></th></tr></tfoot><tbody><tr ng-repeat="row in tableData | orderBy:orderbyField : reverseSort track by $index"><td ng-repeat="(key,value) in row">{{value}}</td></tr></tbody></table>',
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
        template:'<style>\n    .mdl-data-table {\n        position: relative;\n        border: 1px solid rgba(0, 0, 0, .12);\n        border-collapse: collapse;\n        white-space: nowrap;\n        font-size: 13px;\n        background-color: #fff\n    }\n\n    .mdl-data-table thead {\n        padding-bottom: 3px\n    }\n\n    .mdl-data-table thead .mdl-data-table__select {\n        margin-top: 0\n    }\n\n    .mdl-data-table tbody tr {\n        position: relative;\n        height: 48px;\n        transition-duration: .28s;\n        transition-timing-function: cubic-bezier(.4, 0, .2, 1);\n        transition-property: background-color\n    }\n\n    .mdl-data-table tbody tr.is-selected {\n        background-color: #e0e0e0\n    }\n\n    .mdl-data-table tbody tr:hover {\n        background-color: #eee\n    }\n\n    .mdl-data-table td {\n        text-align: right\n    }\n\n    .mdl-data-table th {\n        padding: 0 18px 12px 18px;\n        text-align: right\n    }\n\n    .mdl-data-table td:first-of-type,\n    .mdl-data-table th:first-of-type {\n        padding-left: 24px\n    }\n\n    .mdl-data-table td:last-of-type,\n    .mdl-data-table th:last-of-type {\n        padding-right: 24px\n    }\n\n    .mdl-data-table td {\n        position: relative;\n        height: 48px;\n        border-top: 1px solid rgba(0, 0, 0, .12);\n        border-bottom: 1px solid rgba(0, 0, 0, .12);\n        padding: 12px 18px;\n        box-sizing: border-box\n    }\n\n    .mdl-data-table td,\n    .mdl-data-table td .mdl-data-table__select {\n        vertical-align: middle\n    }\n\n    .mdl-data-table th {\n        position: relative;\n        vertical-align: bottom;\n        text-overflow: ellipsis;\n        font-weight: 700;\n        line-height: 24px;\n        letter-spacing: 0;\n        height: 48px;\n        font-size: 12px;\n        color: rgba(0, 0, 0, .54);\n        padding-bottom: 8px;\n        box-sizing: border-box\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending,\n    .mdl-data-table th.mdl-data-table__header--sorted-descending {\n        color: rgba(0, 0, 0, .87)\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending:before,\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:before {\n        font-family: \'Material Icons\';\n        font-weight: 400;\n        font-style: normal;\n        line-height: 1;\n        letter-spacing: normal;\n        text-transform: none;\n        display: inline-block;\n        word-wrap: normal;\n        -moz-font-feature-settings: \'liga\';\n        font-feature-settings: \'liga\';\n        -webkit-font-feature-settings: \'liga\';\n        -webkit-font-smoothing: antialiased;\n        font-size: 16px;\n        content: \'\\e5d8\';\n        margin-right: 5px;\n        vertical-align: sub\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending:hover,\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:hover {\n        cursor: pointer\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending:hover:before,\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:hover:before {\n        color: rgba(0, 0, 0, .26)\n    }\n\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:before {\n        content: \'\\e5db\'\n    }\n\n    .mdl-data-table__select {\n        width: 16px\n    }\n\n    .mdl-data-table__cell--non-numeric.mdl-data-table__cell--non-numeric {\n        text-align: left\n    }\n\n    .mdl-shadow--2dp {\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)\n    }\n</style><table class="mdl-data-table mdl-shadow--2dp" style="width:100%"><thead><tr><th ng-click="orderbyCol(key)" ng-repeat="(key,value) in data[0]">{{key}} <span ng-show="canShowThisColSortIcon(key)"><span ng-show="!reverseSort"><icon-arrow-upward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-upward></span> <span ng-show="reverseSort"><icon-arrow-downward size="12px" color="rgba(0,0,0,0.54)"></icon-arrow-downward></span></span></th></tr></thead><tfoot><tr><th colspan="100%"><div style="float:left">Page :<select ng-options="page for page in pageNumbers" ng-model="currentPage" ng-change="pageChange()"></select></div>{{skip +1}}-{{skip+data.length}} of {{total}} <button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoPrevious()" ng-disabled="skip <= 0"><icon-arrow-left></icon-arrow-left></button> <button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoNext()" ng-disabled="(skip+data.length) > total"><icon-arrow-right></icon-arrow-right></button></th></tr></tfoot><tbody><tr ng-repeat="row in data | orderBy:orderbyField : reverseSort track by $index"><td ng-repeat="(key,value) in row">{{value}}</td></tr></tbody></table>'
    }

});
