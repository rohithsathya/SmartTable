 var smTableApp = angular.module('rsat.ui',[]);
        smTableApp.directive('smTableCp',function(){

            return {
                restrict:'E',
                scope:{
                    data:'=',
                    limit:'=',
                    sortable:'='
                },
                controller:function($scope,$element,$attrs){
                    $scope.pageNumbers =[];
                    $scope.currentPage = 1;
                    $scope.orderbyField = '';
                    $scope.reverseSort = false;
                    $scope.gotoPage =function(pageNumber){
                        $scope.skip = (pageNumber - 1)*$scope.limit;
                        $scope.tableData = $scope.data.slice($scope.skip,($scope.skip + $scope.limit));
                    }
                    $scope.initTable = function(){
                        $scope.gotoPage($scope.currentPage);
                        $scope.totalPages = Math.ceil($scope.data.length/$scope.limit);
                        for(var i=1;i<=$scope.totalPages;i++){
                            $scope.pageNumbers.push(i);
                        }
                        if($scope.sortable){
                            $scope.orderbyField = Object.keys($scope.data[0])[0];
                        }
                    }
                    $scope.pageChange = function(){
                        $scope.gotoPage($scope.currentPage);
                    }
                    $scope.gotoNext =function(){
                        console.log("PHmG123DG1233..!!!");
                        $scope.currentPage += 1;
                        $scope.gotoPage($scope.currentPage);
                    }
                    $scope.gotoPrevious = function(){
                        $scope.currentPage -= 1;
                        $scope.gotoPage($scope.currentPage);
                    }
                    $scope.orderbyCol = function(colName){
                        if($scope.sortable){
                            $scope.orderbyField = colName;
                            $scope.reverseSort = !$scope.reverseSort;
                        }
                    }
                    $scope.canShowThisColSortIcon = function(colName){
                        if($scope.sortable){
                            return $scope.orderbyField == colName;
                        }else{
                            return false;
                        }
                    }
                    $scope.initTable();

                },
                template:[
                    ' <table class="mdl-data-table mdl-shadow--2dp" style="width:100%">',
            '<thead>',
                '<tr>',
                    '<th ng-click="orderbyCol(key)" ng-repeat="(key,value) in data[0]">',
                        '{{key}}',
                       ' <span ng-show="canShowThisColSortIcon(key)">',
                                '<span ng-show="!reverseSort">',
                                    '<i class="material-icons" style="font-size:12px">arrow_upward</i>',
                                '</span>',
                                 '<span ng-show="reverseSort">',
                                    '<i class="material-icons" style="font-size:12px">arrow_downward</i>',
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
                           ' <i class="material-icons">keyboard_arrow_left</i>',
                       ' </button>',
                      '  <button class="mdl-button mdl-js-button mdl-button--icon" ng-click="gotoNext()" ng-disabled="currentPage >= totalPages">',
                          '  <i class="material-icons">keyboard_arrow_right</i>',
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
