//include mdl library

// <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
// <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
// <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>

function addCssFile(url){
    var link = document.createElement( "link" );
    link.href = url;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName( "head" )[0].appendChild( link );
}
function addJsFile(url){
    var script = document.createElement( "script" );
    script.src = url;
    document.getElementsByTagName( "head" )[0].appendChild( script );
}
addCssFile("https://fonts.googleapis.com/icon?family=Material+Icons");
addCssFile("https://code.getmdl.io/1.3.0/material.indigo-pink.min.css");
addJsFile("https://code.getmdl.io/1.3.0/material.min.js");


var uiElementsApp = angular.module('rsat.ui.elements', []);
//raised
uiElementsApp.directive('rsatButtonRaised',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-button--raised');
                element[0].classList.add('mdl-js-ripple-effect');
        }
    }
})
//raisedPrimary
uiElementsApp.directive('rsatButtonRaisedPrimary',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-button--raised');
                element[0].classList.add('mdl-js-ripple-effect');
                element[0].classList.add('mdl-button--colored');
        }
    }
})
//raisedAccent
uiElementsApp.directive('rsatButtonRaisedAccent',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-button--raised');
                element[0].classList.add('mdl-js-ripple-effect');
                element[0].classList.add('mdl-button--accent');
        }
    }
})
//Flat
uiElementsApp.directive('rsatButtonFlat',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-js-ripple-effect');
        }
    }
})
//FlatAccent
uiElementsApp.directive('rsatButtonFlatPrimary',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-js-ripple-effect');
                element[0].classList.add('mdl-button--primary');
        }
    }
})
//FlatAccent
uiElementsApp.directive('rsatButtonFlatAccent',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-js-ripple-effect');
                element[0].classList.add('mdl-button--accent');
        }
    }
})
//FAB
uiElementsApp.directive('rsatFab',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-button--fab');
                element[0].classList.add('mdl-js-ripple-effect');
                element[0].classList.add('mdl-button--colored');
        }
    }
})
//icon button
uiElementsApp.directive('rsatButtonIcon',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-button--icon');
                element[0].classList.add('mdl-js-ripple-effect');
        }
    }
})
//icon button Primary
uiElementsApp.directive('rsatButtonIconPrimary',function(){
    return{
        restrict: 'A',
        link:function(scope,element,attr){
                element[0].classList.add('mdl-button');
                element[0].classList.add('mdl-js-button');
                element[0].classList.add('mdl-button--icon');
                element[0].classList.add('mdl-js-ripple-effect');
                element[0].classList.add('mdl-button--colored');
        }
    }
})