(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.module": [
		"./src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.module.ts",
		"src-app-dashboard-lazy-dashboard-tile-lazy-dashboard-tile-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".loading-indicator {\n  position: fixed;\n  left: 0px;\n  top: 0px;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  opacity: 0.3;\n}\n\n.spinner {\n  width: 40px;\n  height: 40px;\n\n  position: relative;\n  margin: 100px auto;\n}\n\n.double-bounce1, .double-bounce2 {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background-color: #FFF;\n  opacity: 0.6;\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n  animation: sk-bounce 2.0s infinite ease-in-out;\n}\n\n.double-bounce2 {\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s;\n}\n\n@-webkit-keyframes sk-bounce {\n  0%, 100% {\n    -webkit-transform: scale(0.0)\n  }\n  50% {\n    -webkit-transform: scale(1.0)\n  }\n}\n\n@keyframes sk-bounce {\n  0%, 100% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  }\n  50% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtFQUNiLHdCQUF3QjtFQUN4QixhQUFhO0NBQ2Q7O0FBRUQ7RUFDRSxZQUFZO0VBQ1osYUFBYTs7RUFFYixtQkFBbUI7RUFDbkIsbUJBQW1CO0NBQ3BCOztBQUVEO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsT0FBTztFQUNQLFFBQVE7O0VBRVIsdURBQXVEO0VBQ3ZELCtDQUErQztDQUNoRDs7QUFFRDtFQUNFLCtCQUErQjtFQUMvQix1QkFBdUI7Q0FDeEI7O0FBRUQ7RUFDRTtJQUNFLDZCQUE2QjtHQUM5QjtFQUNEO0lBQ0UsNkJBQTZCO0dBQzlCO0NBQ0Y7O0FBRUQ7RUFDRTtJQUNFLHNCQUFzQjtJQUN0Qiw4QkFBOEI7R0FDL0I7RUFDRDtJQUNFLHNCQUFzQjtJQUN0Qiw4QkFBOEI7R0FDL0I7Q0FDRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvYWRpbmctaW5kaWNhdG9yIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiAwcHg7XG4gIHRvcDogMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgb3BhY2l0eTogMC4zO1xufVxuXG4uc3Bpbm5lciB7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG5cbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW46IDEwMHB4IGF1dG87XG59XG5cbi5kb3VibGUtYm91bmNlMSwgLmRvdWJsZS1ib3VuY2UyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xuICBvcGFjaXR5OiAwLjY7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbn1cblxuLmRvdWJsZS1ib3VuY2UyIHtcbiAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjBzO1xuICBhbmltYXRpb24tZGVsYXk6IC0xLjBzO1xufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2stYm91bmNlIHtcbiAgMCUsIDEwMCUge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjApXG4gIH1cbiAgNTAlIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKVxuICB9XG59XG5cbkBrZXlmcmFtZXMgc2stYm91bmNlIHtcbiAgMCUsIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC4wKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n    <sidebar-cmp></sidebar-cmp>\n  </div>\n  <div class=\"main-panel\">\n    <navbar-cmp></navbar-cmp>\n    <div class=\"content\">\n\n      <router-outlet></router-outlet>\n\n      <router-outlet name=\"aux\"></router-outlet>\n\n    </div>\n\n\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'flight-app',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _dashboard_dashboard_page_dashboard_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard/dashboard-page/dashboard-page.component */ "./src/app/dashboard/dashboard-page/dashboard-page.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sidebar/sidebar.component */ "./src/app/sidebar/sidebar.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _dashboard_dashboard_tile_dashboard_tile_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dashboard/dashboard-tile/dashboard-tile.module */ "./src/app/dashboard/dashboard-tile/dashboard-tile.module.ts");
/* harmony import */ var _tab_example_tabs_page_tabs_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tab-example/tabs-page/tabs-page.component */ "./src/app/tab-example/tabs-page/tabs-page.component.ts");
/* harmony import */ var _tab_example_tabs_tabs_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tab-example/tabs/tabs.module */ "./src/app/tab-example/tabs/tabs.module.ts");
/* harmony import */ var _native_elements_custom_checkbox_custom_checkbox_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./native-elements/custom-checkbox/custom-checkbox.module */ "./src/app/native-elements/custom-checkbox/custom-checkbox.module.ts");

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_7__["APP_ROUTES"]),
                _dashboard_dashboard_tile_dashboard_tile_module__WEBPACK_IMPORTED_MODULE_13__["DashboardTileModule"],
                _tab_example_tabs_tabs_module__WEBPACK_IMPORTED_MODULE_15__["TabsModule"],
                _native_elements_custom_checkbox_custom_checkbox_module__WEBPACK_IMPORTED_MODULE_16__["CustomCheckboxModule"],
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_11__["SidebarComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_9__["NavbarComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"],
                _dashboard_dashboard_page_dashboard_page_component__WEBPACK_IMPORTED_MODULE_1__["DashboardPageComponent"],
                _tab_example_tabs_page_tabs_page_component__WEBPACK_IMPORTED_MODULE_14__["TabsPageComponent"]
            ],
            providers: [],
            schemas: [
                _angular_core__WEBPACK_IMPORTED_MODULE_3__["CUSTOM_ELEMENTS_SCHEMA"]
            ],
            bootstrap: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: APP_ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_ROUTES", function() { return APP_ROUTES; });
/* harmony import */ var _tab_example_tabs_page_tabs_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab-example/tabs-page/tabs-page.component */ "./src/app/tab-example/tabs-page/tabs-page.component.ts");
/* harmony import */ var _dashboard_dashboard_page_dashboard_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard/dashboard-page/dashboard-page.component */ "./src/app/dashboard/dashboard-page/dashboard-page.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");



var APP_ROUTES = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]
    },
    {
        path: 'dashboard',
        component: _dashboard_dashboard_page_dashboard_page_component__WEBPACK_IMPORTED_MODULE_1__["DashboardPageComponent"]
    },
    {
        path: 'tabs',
        component: _tab_example_tabs_page_tabs_page_component__WEBPACK_IMPORTED_MODULE_0__["TabsPageComponent"]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];


/***/ }),

/***/ "./src/app/dashboard/dashboard-page/dashboard-page.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/dashboard/dashboard-page/dashboard-page.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n#actions {\n    margin-top: 20px;\n    margin-bottom: 20px;\n}\n\n#actions button {\n    margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC1wYWdlL2Rhc2hib2FyZC1wYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksaUJBQWlCO0lBQ2pCLG9CQUFvQjtDQUN2Qjs7QUFFRDtJQUNJLG1CQUFtQjtDQUN0QiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQtcGFnZS9kYXNoYm9hcmQtcGFnZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4jYWN0aW9ucyB7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4jYWN0aW9ucyBidXR0b24ge1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/dashboard/dashboard-page/dashboard-page.component.html":
/*!************************************************************************!*\
  !*** ./src/app/dashboard/dashboard-page/dashboard-page.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n\n  <div id=\"actions\">\n    <button class=\"btn btn-click\" (click)=\"addTile()\">Add Default</button>\n    <!-- <button class=\"btn btn-click\" (click)=\"addLazy()\">Add Lazy</button> -->\n    <button class=\"btn btn-click\" (click)=\"addExternal()\">Add External</button>\n  </div>\n\n  <div class=\"row\" id=\"content\">\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard-page/dashboard-page.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/dashboard/dashboard-page/dashboard-page.component.ts ***!
  \**********************************************************************/
/*! exports provided: DashboardPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageComponent", function() { return DashboardPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _external_dashboard_tile_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./external-dashboard-tile.service */ "./src/app/dashboard/dashboard-page/external-dashboard-tile.service.ts");
/* harmony import */ var _lazy_dashboard_tile_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-dashboard-tile.service */ "./src/app/dashboard/dashboard-page/lazy-dashboard-tile.service.ts");




var DashboardPageComponent = /** @class */ (function () {
    function DashboardPageComponent(lazyService, externalService) {
        this.lazyService = lazyService;
        this.externalService = externalService;
    }
    DashboardPageComponent.prototype.addTile = function () {
        this._add('dashboard-tile');
    };
    DashboardPageComponent.prototype._add = function (tileKind) {
        var data = [
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100)
        ];
        // TODO: Add custom element to page
    };
    DashboardPageComponent.prototype.addLazy = function () {
        var _this = this;
        // tslint:disable-next-line:no-console
        console.debug("This exercise does not run in StackBlitz, hence it is part of the director's cut.");
        this.lazyService.load().then(function (_) {
            _this._add('lazy-dashboard-tile');
        });
    };
    DashboardPageComponent.prototype.addExternal = function () {
        this.externalService.load();
        this._add('external-dashboard-tile');
    };
    DashboardPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! ./dashboard-page.component.html */ "./src/app/dashboard/dashboard-page/dashboard-page.component.html"),
            styles: [__webpack_require__(/*! ./dashboard-page.component.css */ "./src/app/dashboard/dashboard-page/dashboard-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_lazy_dashboard_tile_service__WEBPACK_IMPORTED_MODULE_3__["LazyDashboardTileService"],
            _external_dashboard_tile_service__WEBPACK_IMPORTED_MODULE_2__["ExternalDashboardTileService"]])
    ], DashboardPageComponent);
    return DashboardPageComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard-page/external-dashboard-tile.service.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/dashboard/dashboard-page/external-dashboard-tile.service.ts ***!
  \*****************************************************************************/
/*! exports provided: ExternalDashboardTileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalDashboardTileService", function() { return ExternalDashboardTileService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ExternalDashboardTileService = /** @class */ (function () {
    function ExternalDashboardTileService() {
        this.loaded = false;
    }
    ExternalDashboardTileService.prototype.load = function () {
        if (this.loaded)
            return;
        // TODO: Load script
    };
    ExternalDashboardTileService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ExternalDashboardTileService);
    return ExternalDashboardTileService;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard-page/lazy-dashboard-tile.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/dashboard/dashboard-page/lazy-dashboard-tile.service.ts ***!
  \*************************************************************************/
/*! exports provided: LazyDashboardTileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyDashboardTileService", function() { return LazyDashboardTileService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var LazyDashboardTileService = /** @class */ (function () {
    function LazyDashboardTileService(loader, injector) {
        this.loader = loader;
        this.injector = injector;
    }
    LazyDashboardTileService.prototype.load = function () {
        var _this = this;
        if (this.moduleRef) {
            return Promise.resolve();
        }
        var path = 'src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.module#LazyDashboardTileModule';
        return this
            .loader
            .load(path)
            .then(function (moduleFactory) {
            _this.moduleRef = moduleFactory.create(_this.injector).instance;
            console.debug('moduleRef', _this.moduleRef);
        })
            .catch(function (err) {
            console.error('error loading module', err);
        });
    };
    LazyDashboardTileService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModuleFactoryLoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], LazyDashboardTileService);
    return LazyDashboardTileService;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard-tile/dashboard-tile.component.html":
/*!************************************************************************!*\
  !*** ./src/app/dashboard/dashboard-tile/dashboard-tile.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"header\">\n    <h1 class=\"title\">Build-in</h1>\n  </div>\n  <div class=\"content\">\n\n    <div style=\"height:200px\">\n      <ngx-charts-pie-chart [labels]=\"true\" [results]=\"data\">\n      </ngx-charts-pie-chart>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard-tile/dashboard-tile.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/dashboard/dashboard-tile/dashboard-tile.component.ts ***!
  \**********************************************************************/
/*! exports provided: DashboardTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardTileComponent", function() { return DashboardTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DashboardTileComponent = /** @class */ (function () {
    function DashboardTileComponent() {
        // data for chart
        this.data = {};
    }
    DashboardTileComponent.prototype.ngOnInit = function () {
        this.data = [
            {
                name: 'a',
                value: this.a
            },
            {
                name: 'b',
                value: this.b
            },
            {
                name: 'c',
                value: this.c
            }
        ];
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], DashboardTileComponent.prototype, "a", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], DashboardTileComponent.prototype, "b", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], DashboardTileComponent.prototype, "c", void 0);
    DashboardTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard-tile',
            template: __webpack_require__(/*! ./dashboard-tile.component.html */ "./src/app/dashboard/dashboard-tile/dashboard-tile.component.html")
        })
    ], DashboardTileComponent);
    return DashboardTileComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard-tile/dashboard-tile.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/dashboard/dashboard-tile/dashboard-tile.module.ts ***!
  \*******************************************************************/
/*! exports provided: DashboardTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardTileModule", function() { return DashboardTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/elements */ "./node_modules/@angular/elements/fesm5/elements.js");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/esm.js");
/* harmony import */ var _dashboard_tile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard-tile.component */ "./src/app/dashboard/dashboard-tile/dashboard-tile.component.ts");






var DashboardTileModule = /** @class */ (function () {
    function DashboardTileModule(injector) {
        this.injector = injector;
        var tileElm = Object(_angular_elements__WEBPACK_IMPORTED_MODULE_3__["createCustomElement"])(_dashboard_tile_component__WEBPACK_IMPORTED_MODULE_5__["DashboardTileComponent"], { injector: this.injector });
        customElements.define('dashboard-tile', tileElm);
    }
    DashboardTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_4__["NgxChartsModule"]
            ],
            declarations: [
                _dashboard_tile_component__WEBPACK_IMPORTED_MODULE_5__["DashboardTileComponent"]
            ],
            exports: [
                _dashboard_tile_component__WEBPACK_IMPORTED_MODULE_5__["DashboardTileComponent"]
            ],
            entryComponents: [
                _dashboard_tile_component__WEBPACK_IMPORTED_MODULE_5__["DashboardTileComponent"]
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], DashboardTileModule);
    return DashboardTileModule;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"header\">\n    <h1 class=\"title\">Welcome!</h1>\n  </div>\n</div>\n\n<dashboard-tile a=\"3\" b=\"4\" c=\"5\"></dashboard-tile>\n\n\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.expertMode = true;
    }
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None
        })
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/native-elements/custom-checkbox/custom-checkbox.directive.ts":
/*!******************************************************************************!*\
  !*** ./src/app/native-elements/custom-checkbox/custom-checkbox.directive.ts ***!
  \******************************************************************************/
/*! exports provided: CustomCheckboxDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomCheckboxDirective", function() { return CustomCheckboxDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CustomCheckboxDirective = /** @class */ (function () {
    function CustomCheckboxDirective() {
    }
    CustomCheckboxDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: 'custom-checkbox'
        })
    ], CustomCheckboxDirective);
    return CustomCheckboxDirective;
}());



/***/ }),

/***/ "./src/app/native-elements/custom-checkbox/custom-checkbox.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/native-elements/custom-checkbox/custom-checkbox.module.ts ***!
  \***************************************************************************/
/*! exports provided: CustomCheckboxModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomCheckboxModule", function() { return CustomCheckboxModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _custom_checkbox_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-checkbox.directive */ "./src/app/native-elements/custom-checkbox/custom-checkbox.directive.ts");



var CustomCheckboxModule = /** @class */ (function () {
    function CustomCheckboxModule() {
        // TODO: Wrap and register element
        // customElements.define('custom-checkbox', CustomCheckboxElement);
    }
    CustomCheckboxModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [],
            declarations: [_custom_checkbox_directive__WEBPACK_IMPORTED_MODULE_2__["CustomCheckboxDirective"]],
            exports: [_custom_checkbox_directive__WEBPACK_IMPORTED_MODULE_2__["CustomCheckboxDirective"]],
            providers: [],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CustomCheckboxModule);
    return CustomCheckboxModule;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" (click)=\"sidebarToggle()\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar bar1\"></span>\n        <span class=\"icon-bar bar2\"></span>\n        <span class=\"icon-bar bar3\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">Flight42</a>\n    </div>\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li>\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            <i class=\"ti-panel\"></i>\n            <p>Stats</p>\n          </a>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            <i class=\"ti-bell\"></i>\n            <p class=\"notification\">5</p>\n            <p>Notifications</p>\n            <b class=\"caret\"></b>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">Notification 1</a></li>\n            <li><a href=\"#\">Notification 2</a></li>\n            <li><a href=\"#\">Notification 3</a></li>\n            <li><a href=\"#\">Notification 4</a></li>\n            <li><a href=\"#\">Another notification</a></li>\n          </ul>\n        </li>\n        <li>\n          <a href=\"#\">\n            <i class=\"ti-settings\"></i>\n            <p>Settings</p>\n          </a>\n        </li>\n      </ul>\n\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
        this.sidebarVisible = false;
    }
    NavbarComponent.prototype.sidebarToggle = function () {
        var body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible == false) {
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        }
        else {
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    };
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'navbar-cmp',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/shared/pipes/city.pipe.ts":
/*!*******************************************!*\
  !*** ./src/app/shared/pipes/city.pipe.ts ***!
  \*******************************************/
/*! exports provided: CityPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CityPipe", function() { return CityPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CityPipe = /** @class */ (function () {
    function CityPipe() {
    }
    CityPipe.prototype.transform = function (value, fmt) {
        var short, long;
        switch (value) {
            case 'Hamburg':
                short = 'HAM';
                long = 'Airport Hamburg Fulsbüttel Helmut Schmidt';
                break;
            case 'Graz':
                short = 'GRZ';
                long = 'Flughafen Graz Thalerhof';
                break;
            default:
                short = long = value; //'ROM';
        }
        if (fmt == 'short')
            return short;
        return long;
    };
    CityPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'city',
            pure: true
        })
    ], CityPipe);
    return CityPipe;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pipes_city_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pipes/city.pipe */ "./src/app/shared/pipes/city.pipe.ts");




var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: []
        };
    };
    SharedModule.forChild = function () {
        return {
            ngModule: SharedModule_1,
            providers: []
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: [
                _pipes_city_pipe__WEBPACK_IMPORTED_MODULE_3__["CityPipe"],
            ],
            exports: [
                _pipes_city_pipe__WEBPACK_IMPORTED_MODULE_3__["CityPipe"],
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/sidebar/sidebar.component.html":
/*!************************************************!*\
  !*** ./src/app/sidebar/sidebar.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-wrapper\">\n  <div class=\"logo\">\n    <a class=\"simple-text\">\n      <div class=\"logo-img\">\n        <img src=\"../../assets/img/angular2-logo.png\" alt=\"\">\n      </div>\n      Flight42\n    </a>\n  </div>\n  <ul class=\"nav\">\n    <li>\n      <a routerLink=\"home\">\n        <i class=\"ti-home\"></i>\n        <p>Home</p>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"dashboard\">\n        <i class=\"ti-arrow-top-right\"></i>\n        <p>Dashboard</p>\n      </a>\n    </li>\n\n    <li>\n      <a routerLink=\"tabs\">\n        <i class=\"ti-arrow-top-right\"></i>\n        <p>Tabs</p>\n      </a>\n    </li>\n\n  </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.ts":
/*!**********************************************!*\
  !*** ./src/app/sidebar/sidebar.component.ts ***!
  \**********************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'sidebar-cmp',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/sidebar/sidebar.component.html"),
        })
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/tab-example/tabs-page/tabs-page.component.css":
/*!***************************************************************!*\
  !*** ./src/app/tab-example/tabs-page/tabs-page.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RhYi1leGFtcGxlL3RhYnMtcGFnZS90YWJzLXBhZ2UuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/tab-example/tabs-page/tabs-page.component.html":
/*!****************************************************************!*\
  !*** ./src/app/tab-example/tabs-page/tabs-page.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- TODO: Add an my-tab element and (in a later exercise) some my-tabs elements -->\n"

/***/ }),

/***/ "./src/app/tab-example/tabs-page/tabs-page.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/tab-example/tabs-page/tabs-page.component.ts ***!
  \**************************************************************/
/*! exports provided: TabsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageComponent", function() { return TabsPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TabsPageComponent = /** @class */ (function () {
    function TabsPageComponent() {
    }
    TabsPageComponent.prototype.ngOnInit = function () {
    };
    TabsPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tabs-page',
            template: __webpack_require__(/*! ./tabs-page.component.html */ "./src/app/tab-example/tabs-page/tabs-page.component.html"),
            styles: [__webpack_require__(/*! ./tabs-page.component.css */ "./src/app/tab-example/tabs-page/tabs-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TabsPageComponent);
    return TabsPageComponent;
}());



/***/ }),

/***/ "./src/app/tab-example/tabs/tab.component.ts":
/*!***************************************************!*\
  !*** ./src/app/tab-example/tabs/tab.component.ts ***!
  \***************************************************/
/*! exports provided: TabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabComponent", function() { return TabComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TabComponent = /** @class */ (function () {
    function TabComponent() {
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TabComponent.prototype, "title", void 0);
    TabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // selector: 'app-tab',
            template: "\n    <div id=\"tab\">\n\n      <h2>{{title}}</h2>\n\n      <div id=\"content\">\n        <!-- TODO: Add slot here -->\n        <div class=\"small\">\n          <!-- TODO: Add slot[name=footer] here -->\n        </div>\n      </div>\n\n    </div>\n  ",
            styles: ["\n    #tab {\n      padding: 20px;\n      border-top: 2px black solid;\n      border-bottom: 2px black solid;\n      border-radius: 5px;\n      margin-bottom:20px;\n    }\n\n    #tab h2 {\n      margin-top:0px;\n    }\n\n    .small {\n      font-size:8px;\n      margin-top:20px;\n    }\n  "],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].ShadowDom
        })
    ], TabComponent);
    return TabComponent;
}());



/***/ }),

/***/ "./src/app/tab-example/tabs/tabs.component.ts":
/*!****************************************************!*\
  !*** ./src/app/tab-example/tabs/tabs.component.ts ***!
  \****************************************************/
/*! exports provided: TabsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return TabsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
        this.tabs = [];
    }
    TabsComponent.prototype.slotChange = function ($event) {
        // TODO: Get projected tabs from $event.target.assignedNodes();
        //   and store them in this.tabs
    };
    TabsComponent.prototype.activate = function (tab) {
        // TODO: Hide all tabs but the passed one
    };
    TabsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: "\n  <div id=\"tabs\">\n\n    <div>\n      <div class=\"tab-key\" *ngFor=\"let tab of tabs\">\n        <a (click)=\"activate(tab)\">{{tab.title}}</a>\n      </div>\n    </div>\n\n    <div  style=\"clear:both;\">\n      <slot></slot>\n      <!-- ^^ TODO: Register for slotchange event here -->\n    </div>\n\n  </div>\n  ",
            styles: ["\n    .tab-key {\n      padding:20px;\n      text-decoration: underline;\n      cursor: pointer;\n      float:left;\n    }\n  "],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].ShadowDom
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TabsComponent);
    return TabsComponent;
}());



/***/ }),

/***/ "./src/app/tab-example/tabs/tabs.module.ts":
/*!*************************************************!*\
  !*** ./src/app/tab-example/tabs/tabs.module.ts ***!
  \*************************************************/
/*! exports provided: TabsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsModule", function() { return TabsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _tabs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs.component */ "./src/app/tab-example/tabs/tabs.component.ts");
/* harmony import */ var _tab_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tab.component */ "./src/app/tab-example/tabs/tab.component.ts");





var TabsModule = /** @class */ (function () {
    function TabsModule(injector) {
        // TODO: Wrap and register elements
        // const tabsElm = createCustomElement(TabsComponent, { injector });
        // customElements.define('my-tabs', tabsElm);
        // const tabElm = createCustomElement(TabComponent, { injector });
        // customElements.define('my-tab', tabElm);
    }
    TabsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            declarations: [_tabs_component__WEBPACK_IMPORTED_MODULE_3__["TabsComponent"], _tab_component__WEBPACK_IMPORTED_MODULE_4__["TabComponent"]],
            exports: [_tabs_component__WEBPACK_IMPORTED_MODULE_3__["TabsComponent"], _tab_component__WEBPACK_IMPORTED_MODULE_4__["TabComponent"]],
            entryComponents: [_tabs_component__WEBPACK_IMPORTED_MODULE_3__["TabsComponent"], _tab_component__WEBPACK_IMPORTED_MODULE_4__["TabComponent"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], TabsModule);
    return TabsModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




// import './app/native-elements/hello-world/hello-world';
if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Projects\Experiments\Projects\angularElements\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map