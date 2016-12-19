(function (angular) {
    angular.module('mediakit', ['ui.router'])
        .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
            $stateProvider.state('home', {
                url: '/',
                templateProvider: function () {
                    return `<page url="home"> </page>`;
                }
            });
            $stateProvider.state('faq', {
                url: '/faq',
                templateProvider: function () {
                    return `<page url="faq"> </page>`;
                }
            });
            $stateProvider.state('products', {
                url: '/products/:path',
                templateProvider: ['$stateParams', function ($stateParams) {
                    const path = $stateParams.path;
                    return `<product url="${path}"> </product>`;
                }]
            });
            $locationProvider.html5Mode(true);
        }])
})(window.angular);