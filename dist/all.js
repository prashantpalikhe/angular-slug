(function () {
    'use strict';

    angular
        .module('slug', []);
})();
(function () {
    'use strict';

    angular
        .module('slug')
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

        // TODO: Debounce input handler
        $element.on('input', function () {
            $scope.$apply(function () {
                setModelValue($element.val());
            });
        });

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
})();
(function () {
    'use strict';

    angular
        .module('slug')
        .factory('slugService', slugService);

    function slugService() {
        return {
            generateSlug: generateSlug
        };

        function generateSlug(inputString) {
            return inputString.toString().toLowerCase().trim()
                .replace(/&/g, '-and-')         // Replace & with 'and'
                .replace(/[\s\W-]+/g, '-')      // Replace spaces, non-word characters and dashes with a single dash (-)
                .replace(/-$/, '');
        }
    }
})();