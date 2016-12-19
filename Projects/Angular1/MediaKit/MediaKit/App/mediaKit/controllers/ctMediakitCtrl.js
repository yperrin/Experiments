function MediaKitController(mediakitService) {
    var self = this;
    self.menu = { title: 'Media Kit', menuItems: mediakitService.getNavigation() };
}

(function (angular) {
    angular.module('mediakit')
        .component('navigation', {
            bindings: {
                menu: '<',
            },
            templateUrl: '/App/mediaKit/partials/navigation.html',
            controller: ['$state', function ($state) {
                this.isCurrentProduct = function (url) {
                    return $state.includes('products', { path: url });
                };
            }],
        })
        .controller('MediaKitController', ['MediaKitService', MediaKitController])
})(window.angular);

