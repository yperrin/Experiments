(function (angular) {
    angular.module('mediakit')
        .component('page', {
            bindings: {
                url: '@',
            },
            templateUrl: '/App/mediaKit/partials/page.html',
            controller: 'MediaKitPageController',
        })
        .controller('MediaKitPageController', ['MediaKitService', function (mediaKitService) {
            var self = this;
            self.$onInit = function () {
                var url = self.url;
                self.content = mediaKitService.getPage(url);
            };
        }])
})(window.angular);

