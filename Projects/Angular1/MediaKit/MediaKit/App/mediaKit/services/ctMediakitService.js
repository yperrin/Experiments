(function (angular) {
    angular.module('mediakit')
        .service('MediaKitService', ['$http', function MediaKitService($http) {
            var self = this;
            self.getNavigation = function () {
                return [
                    {
                        type: 'menu', name: 'Print', id: 'print', items: [
                            { type: 'menu', name: 'Magazines', id: 'Magazines' },
                            { type: 'page', name: 'Counselor', url: 'print/magazines/counselor' },
                            { type: 'page', name: 'Advantages', url: 'print/magazines/counselor1' },
                            { type: 'page', name: 'Wearables', url: 'print/magazines/counselor2' },
                            { type: 'menu', name: 'Catalogs', id: 'Catalogs' },
                            { type: 'page', name: 'Idea Showcase Fall', url: 'print/magazines/counselor3' },
                            { type: 'page', name: 'Top Sellers', url: 'print/magazines/counselor4' },
                        ]
                    },
                    {
                        type: 'menu', name: 'ESP Advertising', id: 'ESPAdvertising', items: [
                            { type: 'menu', name: 'ESP', id: 'ESP' },
                            { type: 'page', name: 'Pay for Placement', url: 'print/magazines/counselor6' },
                            { type: 'page', name: 'Home Page Expandable Banner', url: 'print/magazines/counselor6' },
                            { type: 'page', name: 'Product of the Day', url: 'print/magazines/counselor' },
                            { type: 'page', name: 'Home Page Pay for Placement', url: 'print/magazines/counselor' },
                        ]
                    },
                    {
                        type: 'menu', name: 'Digital Advertising', id: 'DigitalAdvertising', items: [
                            { type: 'page', name: 'EmailExpress/Email', url: 'print/magazines/counselor' },
                            { type: 'menu', name: 'Web', id: 'Web' },
                            { type: 'page', name: 'ASI Central', url: 'print/magazines/counselor' },
                            { type: 'page', name: 'DigitalExpress', url: 'print/magazines/counselor' },
                            { type: 'page', name: 'Websites for Suppliers', url: 'print/magazines/counselor' },
                            { type: 'menu', name: 'Video', id: 'Video' },
                            { type: 'page', name: 'Idea Showcase Fall', url: 'print/magazines/counselor' },
                        ]
                    },
                    { type: 'page', name: 'Content Marketing', url: 'content-marketing' },
                ];
            };
            self.getPage = function (name) {
                return "<div>This is the content from the '" + name + "' page</div>";
            };
            self.getProduct = function (url) {
                return { content: "<div>This is the content from the '" + url + "' product</div>" };
            };
        }])
})(window.angular);