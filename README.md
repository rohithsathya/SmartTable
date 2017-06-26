# rsat.table
rsat.table is a smart material design table component for Angular js applications, with automatic pagination and column sorting. It is very simple and minimalistic in design, all you have to do is just give the data and html table with material design theme will magically appear in your application.
It has support for both client side and server side pagination.

Live Demo. [here](https://rohithsathya.github.io/rsatTable/example/)

Example : Complete example App is located at example folder
## Dependencies
* Angular Js
* [rsat Icons](https://github.com/rohithsathya/icons)
* [rsat ui](https://rohithsathya.github.io/rsat.ui/)

## Installation
Installation of rsat table is very easy as it does not depends on lots of modules, it is simple and stright forward.Please follow the steps below to get started
1. Add rsat.ui elements library(included in "dist" folder) into your application
     ```html
       <link rel="styleSheet" href="dist/rsat.ui.elements.min.css"/>
       <script src="dist/rsat.ui.elements.min.js"></script>
    ```
2. Add refrence to rsat.ui.icons.js and rsat.ui.smTable.js files present in the "dist" folder
    ```html
        <script src="dist/rsat.ui.icons.js"></script>
        <script src="dist/rsat.table.js"></script>
    ```
    Note: please make sure to include rsat.ui.elments and rsat.ui.icons before loading rsat.table.
3. Add Module depedency of "rsat.table" to your angularjs application
    ```javascript
    var app = angular.module('myApp', ['rsat.table']);
    ```

    Thats it..:), you have successfully added rsat.table into your angularjs project.


## Using rsat.table  
rsat.table has two bulit in components
* rsat.table with client side pagination (rsat-table-cp)
* rsat.table with server side pagination (rsat-table-sp)
        

### rsat.table with client side pagination (rsat-table-cp)
This component is used when you have all the table data in advance, pagination and navigation between the pages is automatically handled by the component. It has following options

#### options
| Options       | Explanation  | Example  |
| ------------- | ------------- |------------- |
| Data          |This is the table Data, in JSON Array format  |[{"name":"Roh"},{"name":"Ram"},{"name":"Rahul"}]|
| Limit         | This defines how many records are shown per page  | 10,20...|
|Sortable|This flag when set to true,will make the columns of the table sortable| true/false|

#### Complete Example
```html
<!doctype html>
<html>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <link rel="styleSheet" href="https://rohithsathya.github.io/rsatTable/dist/rsat.ui.elements.min.css"/>
    <script src="https://rohithsathya.github.io/rsatTable/dist/rsat.ui.elements.min.js"></script>
    <script src="https://rohithsathya.github.io/rsatTable/dist/rsat.ui.icons.js"></script>
    <script src="https://rohithsathya.github.io/rsatTable/dist/rsat.table.min.js"></script>
    
    <script>
        var app = angular.module('myApp', ['rsat.table']);
        app.controller('myController', function ($scope) {
            $scope.allData = [
                { name: 'Person1', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person2', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person3', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person4', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person5', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person6', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person7', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person8', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person9', company: 'Edgeverve', role: 'MTS' }
            ]

        });
    </script>
</head>

<body>

    <div class="container" ng-app="myApp" ng-controller="myController">
        <rsat-table-cp data="allData" limit="3" sortable="true"></rsat-table-cp>
    </div>

</body>

</html>
```

### rsat.table with server side pagination (rsat-table-sp)
This component is used when the pagination is done at the server and at any given point in time you will have access to only the current page's data. It has following options

#### options
| Options       | Explanation  | Example  |
| ------------- | ------------- |------------- |
| Data          |This is the current page's Data, in JSON Array format  |[{"name":"Roh"},{"name":"Ram"},{"name":"Rahul"}]|
| Limit         | This defines how many records are shown per page  | 10,20...|
|skip|This defines how many records have been skipped, this helps in identifying previous pages|0,10,20...|
|total|This defines how many records are present in total in the table|100,150,300...|
|Sortable|This flag when set to true,will make the columns of the table sortable| true/false|
|onNext|This is a callback method which will be called when next page is requested on the table|onNext="gotoNext()"|
|onPrev|This is a callback method which will be called when previous page is requested on the table|onPrev="gotoPrev()"|
|onPageChange|This is a callback method which will be called when a specific page is requested on the table|onPageChange="gotoSpecificPage(pageNo)"|


#### Complete Example
```html
<!doctype html>
<html>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <link rel="styleSheet" href="https://rohithsathya.github.io/rsatTable/dist/rsat.ui.elements.min.css"/>
    <script src="https://rohithsathya.github.io/rsatTable/dist/rsat.ui.elements.min.js"></script>
    <script src="https://rohithsathya.github.io/rsatTable/dist/rsat.ui.icons.js"></script>
    <script src="https://rohithsathya.github.io/rsatTable/dist/rsat.table.min.js"></script>
    
    <script>
        var app = angular.module('myApp', ['rsat.table']);
        app.controller('myController', function ($scope) {
            $scope.serverData = [
                { name: 'Person1', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person2', company: 'Edgeverve', role: 'MTS' },
                { name: 'Person3', company: 'Edgeverve', role: 'MTS' }
            ];
            $scope.gotoNext = function () {
                console.log("Get Next page's data and assign it to serverData");
                $scope.serverData = [
                    { name: 'Person1_Next', company: 'Edgeverve', role: 'MTS' },
                    { name: 'Person2_Next', company: 'Edgeverve', role: 'MTS' },
                    { name: 'Person3_Next', company: 'Edgeverve', role: 'MTS' }
                ];
            }
            $scope.gotoPrev = function () {
                console.log("Get previous page's data and assign it to serverData");
                $scope.serverData = [
                    { name: 'Person1_prev', company: 'Edgeverve', role: 'MTS' },
                    { name: 'Person2_prev', company: 'Edgeverve', role: 'MTS' },
                    { name: 'Person3_prev', company: 'Edgeverve', role: 'MTS' }
                ];
            }
            $scope.gotoSpecificPage = function (pageNo) {
                console.log("Get" + pageNo + " page's data and assign it to serverData");
                $scope.serverData = [
                    { name: 'Person1_' + pageNo, company: 'Edgeverve', role: 'MTS' },
                    { name: 'Person2_' + pageNo, company: 'Edgeverve', role: 'MTS' },
                    { name: 'Person3_' + pageNo, company: 'Edgeverve', role: 'MTS' }
                ];
            }
        });
    </script>
</head>

<body>
    <div class="container" ng-app="myApp" ng-controller="myController">
        <rsat-table-sp data="serverData" limit="3" skip="0" total="9" sortable="true" onNext="gotoNext()" onprev="gotoPrev()" onPageChange="gotoSpecificPage(pageNo)">
        </rsat-table-sp>
    </div>

</body>

</html>
```

