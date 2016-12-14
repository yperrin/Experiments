(function (angular) {
    angular.module('mediakit', [])
        .component('navigation', {
            bindings: {
                menu: '<',
            },
            templateUrl: '/App/mediaKit/partials/navigation.html',
        })
        .component('page', {
            bindings: {
                page: '<',
            },
            templateUrl: '/App/mediaKit/partials/page.html',
        })
})(window.angular);