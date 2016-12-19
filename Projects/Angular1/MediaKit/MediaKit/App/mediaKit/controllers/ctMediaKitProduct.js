(function (angular) {
    angular.module('mediakit')
        .component('product', {
            bindings: {
                url: '@',
            },
            templateUrl: '/App/mediaKit/partials/product.html',
            controller: 'MediaKitProductController',
        })
        .controller('MediaKitProductController', ['MediaKitService', function MediaKitProductController(mediaKitService) {
            var self = this;
            self.$onInit = function () {
                var url = self.url;
                self.product = mediaKitService.getProduct(url);
            };
        }])
})(window.angular);

