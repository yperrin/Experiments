(function (angular) {
    angular.module('mediakit')
        .controller('mediakitController', ['$scope', 'mediakitService', function ($scope, mediakitService) {
            this.menu = { title: 'Media Kit', menuItems: mediakitService.getNavigation() };
            this.page = mediakitService.getPage('default');
            this.load = function (menu) {
                alert('menu ' + menu.name + ' is clicked');
            };
        }])
})(window.angular);

