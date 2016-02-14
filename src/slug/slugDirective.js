(function () {
    'use strict';

    angular
        .module('slug', [])
        .directive('slug', slugDirective);

    function slugDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {},
            bindToController: {
                slugSrc: '@'
            },
            controllerAs: "$ctrl",
            controller: sluggerController
        };
    }

    function sluggerController($scope, $element, $attrs, slugService) {
        var update = true;
        var ngModelCtrl = $element.controller('ngModel');

        this.preferOwn = $attrs.preferOwn !== 'false';

        if (this.preferOwn) {
            $element.on('input', function () {
                update = !$element.val();
            });
        }

        $element.on('input', debounce(function () {
            $scope.$apply(function () {
                setModelValue($element.val());
            });
        }, 250));

        $scope.$on('$destroy', function () {
            $element.off('input');
        });

        $attrs.$observe('slugSrc', function (newSlug) {
            if (update) {
                setModelValue(newSlug);
            }
        });

        function setModelValue(value) {
            ngModelCtrl.$setViewValue(slugService.generateSlug(value));
            ngModelCtrl.$render();
        }
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

})();