(function (angular) {
    angular.module('mediakit')
        .factory('mediakitService', ['$http', function ($http) {
            return {
                getNavigation: function () {
                    return [
                        {
                            type: 'menu', name: 'Print', id: 'print', items: [
                                { type: 'menu', name: 'Magazines', id: 'Magazines' },
                                { type: 'page', name: 'Counselor', url: '/mediakit/products/print/magazines/counselor' },
                                { type: 'page', name: 'Advantages', url: '/mediakit/products/print/magazines/counselor' },
                                { type: 'page', name: 'Wearables', url: '/mediakit/products/print/magazines/counselor' },
                                { type: 'menu', name: 'Catalogs', id: 'Catalogs' },
                                { type: 'page', name: 'Idea Showcase Fall', url: '/mediakit/products/print/magazines/counselor' },
                                { type: 'page', name: 'Top Sellers', url: '/mediakit/products/print/magazines/counselor' },
                            ]
                        },
                        {
                            type: 'menu', name: 'Digital Advertising', id: 'DigitalAdvertising', items: [
                                {
                                    type: 'page', name: 'EmailExpress/Email', url: '/mediakit/products/print/magazines/counselor'
                                },
                                { type: 'menu', name: 'Web', id: 'Web' }, 
                                { type: 'page', name: 'ASI Central', url: '/mediakit/products/print/magazines/counselor' },
                                { type: 'page', name: 'DigitalExpress', url: '/mediakit/products/print/magazines/counselor' },
                                { type: 'page', name: 'Websites for Suppliers', url: '/mediakit/products/print/magazines/counselor' },
                                { type: 'menu', name: 'Video', id: 'Video' },
                                { type: 'page', name: 'Idea Showcase Fall', url: '/mediakit/products/print/magazines/counselor' },
                            ]
                        },
                        { type: 'page', name: 'Content Marketing', url: '/mediakit/products/content-marketing' },
                    ];
                },
                getPage: function (name) {
                    return { name: name, url: '/products/' + name, content: '<h1>' + name + ' content</h1>' };
                }
            };
        }])
})(window.angular);