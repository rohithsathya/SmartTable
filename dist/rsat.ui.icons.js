var uiApp = angular.module('rsat.icons', []);
uiApp.directive('iconArrowLeft', function () {
            return {
                restrict: 'E',
                scope: {
                    size: '@',
                    color: '@'
                },
                template: ['<div ng-style="{\'height\':size || \'24px\',\'width\':size || \'24px\',\'display\':\'inline-block\'}"> <svg fill="{{color}}" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">',
                    '<path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>',
                    '<path d="M0-.5h24v24H0z" fill="none"/>',
                    '</svg></div>'].join('')

            }

        })
uiApp.directive('iconArrowRight', function () {
            return {
                restrict: 'E',
                scope: {
                    size: '@',
                    color: '@'
                },
                template: ['<div ng-style="{\'height\':size || \'24px\',\'width\':size || \'24px\',\'display\':\'inline-block\'}"> <svg fill="{{color}}" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">',
                    '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"  />',
                    '<path d="M0 0h24v24H0z" fill="none" />',
                    '</svg></div>'].join('')

            }

        })
uiApp.directive('iconArrowUpward', function () {
            return {
                restrict: 'E',
                scope: {
                    size: '@',
                    color: '@'
                },
                template: ['<div ng-style="{\'height\':size || \'24px\',\'width\':size || \'24px\',\'display\':\'inline-block\'}"> <svg fill="{{color}}" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">',
                    '<path d="M0 0h24v24H0V0z" fill="none"/>',
                    '<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>',
                    '</svg></div>'].join('')

            }

        })
uiApp.directive('iconArrowDownward', function () {
            return {
                restrict: 'E',
                scope: {
                    size: '@',
                    color: '@'
                },
                template: ['<div ng-style="{\'height\':size || \'24px\',\'width\':size || \'24px\',\'display\':\'inline-block\'}"> <svg fill="{{color}}" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">',
                    '<path d="M0 0h24v24H0V0z" fill="none"/>',
                    '<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>',
                    '</svg></div>'].join('')

            }

        })