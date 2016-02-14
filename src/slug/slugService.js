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