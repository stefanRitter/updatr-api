webpackJsonp([1,4],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__updatr_link__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__updatr_link_group__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__updatr_store_updatr_store__ = __webpack_require__(116);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatrLinkService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UpdatrLinkService = (function () {
    function UpdatrLinkService(applicationRef, http, store) {
        this.firstSort = true;
        this.applicationRef = applicationRef;
        this.http = http;
        this.STORE = store;
    }
    UpdatrLinkService.prototype.addUrl = function (url) {
        var links = this.getData();
        // don't allow dups
        var index = this.findUrl(url, links);
        if (index > -1)
            return alert('This link is already in your list...');
        // add & persist
        var newLink = new __WEBPACK_IMPORTED_MODULE_3__updatr_link__["a" /* UpdatrLink */](url);
        links.unshift(newLink);
        this.persistLinks(links, -1, newLink);
    };
    UpdatrLinkService.prototype.removeUrl = function (url) {
        var links = this.getData();
        // find url
        var index = this.findUrl(url, links);
        if (index === -1)
            return;
        // remove & persist
        var removed = links.splice(index, 1)[0];
        this.persistLinks(links, -1, removed);
    };
    UpdatrLinkService.prototype.toggleReadUrl = function (url) {
        var links = this.getData();
        // find url
        var index = this.findUrl(url, links);
        if (index === -1)
            return;
        // udpate & persist
        links[index].visited = true;
        this.persistLinks(links, index, null);
    };
    UpdatrLinkService.prototype.toggleStarUrl = function (url) {
        var links = this.getData();
        // find url
        var index = this.findUrl(url, links);
        if (index === -1)
            return;
        // udpate & persist
        var stars = links[index].stars + 1;
        if (stars > 2)
            stars = 0;
        links[index].stars = stars;
        this.persistLinks(links, index, null);
    };
    UpdatrLinkService.prototype.getUnreadReadGroups = function () {
        var links = this.getData();
        if (this.firstSort) {
            links = links.sort(function (linkA, linkB) {
                return linkB.stars - linkA.stars;
            });
            this.firstSort = false;
        }
        var unread = new __WEBPACK_IMPORTED_MODULE_4__updatr_link_group__["a" /* UpdatrLinkGroup */]();
        var read = new __WEBPACK_IMPORTED_MODULE_4__updatr_link_group__["a" /* UpdatrLinkGroup */]();
        unread.links = links.filter(function (link) {
            return !link.visited;
        });
        read.links = links.filter(function (link) {
            return link.visited;
        });
        return [unread, read];
    };
    UpdatrLinkService.prototype.updateAllLinks = function () {
        var _this = this;
        var visitedLinks = this.getData().filter(function (link) { return link.visited; });
        this.STORE.setUpdating(true);
        this.STORE.setLinksToCheck(visitedLinks.length);
        this.http.get(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].server + 'update', { withCredentials: true }).subscribe(function (response) { _this.STORE.setUpdating(false); _this.applicationRef.tick(); }, function (error) {
            _this.STORE.setUpdating(false);
            _this.applicationRef.tick();
            _this.handleError.call(_this, error);
        });
    };
    UpdatrLinkService.prototype.handleError = function (err) {
        console.error('HTTP ERROR', err);
    };
    UpdatrLinkService.prototype.getData = function () {
        return this.STORE.getLinks();
    };
    UpdatrLinkService.prototype.persistLinks = function (links, index, link) {
        this.STORE.persistLinks(links, index, link);
        this.applicationRef.tick();
    };
    UpdatrLinkService.prototype.findUrl = function (url, links) {
        var index = -1;
        links.forEach(function (link, i) { if (link.url === url)
            index = i; });
        return index;
    };
    UpdatrLinkService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* ApplicationRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* ApplicationRef */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__updatr_store_updatr_store__["a" /* STORE */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__updatr_store_updatr_store__["a" /* STORE */]) === 'function' && _c) || Object])
    ], UpdatrLinkService);
    return UpdatrLinkService;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/updatr-link.service.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(176);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STORE; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// app store
var _updating = false;
var _links = [];
var _linksToCheck = 0;
var _getting = true;
// prepare data
if (!localStorage['updatr_links_store']) {
    localStorage['updatr_links_store'] = JSON.stringify([]);
}
_links = JSON.parse(localStorage['updatr_links_store']);
_links.forEach(function (link) {
    link.stars = parseInt(link.stars, 10);
});
// handle http response
function handleResponse(response) {
    _links = JSON.parse(response._body);
    localStorage['updatr_links_store'] = response._body;
}
function handleError(err) {
    console.error('HTTP ERROR', err);
}
// expose data access
var STORE = (function () {
    function STORE(http) {
        this.http = http;
        // get links
        var url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].server + 'links';
        this.http.get(url, { withCredentials: true })
            .subscribe(function (response) { return handleResponse(response); }, function (error) { return handleError(error); });
    }
    STORE.prototype.setUpdating = function (updating) {
        _updating = updating;
    };
    STORE.prototype.getUpdating = function () {
        return _updating;
    };
    STORE.prototype.setLinksToCheck = function (linksToCheck) {
        _linksToCheck = linksToCheck;
    };
    STORE.prototype.getLinksToCheck = function () {
        return _linksToCheck;
    };
    STORE.prototype.persistLinks = function (links, index, link) {
        _links = links;
        var stringified = JSON.stringify(links);
        localStorage['updatr_links_store'] = stringified;
        // persist changes
        var url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].server + 'links';
        if (index > -1) {
            link = JSON.stringify(links[index]);
            this.http.patch(url, link, { withCredentials: true })
                .subscribe(function (response) { }, function (error) { return handleError(error); });
        }
        else {
            link = JSON.stringify(link);
            this.http.put(url, link, { withCredentials: true })
                .subscribe(function (response) { }, function (error) { return handleError(error); });
        }
    };
    STORE.prototype.getLinks = function () {
        return _links;
    };
    STORE = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], STORE);
    return STORE;
    var _a;
}());
;
//# sourceMappingURL=/Users/d064714/updatr/web/src/updatr-store.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    server: 'https://www.getupdatr.com/'
};
//# sourceMappingURL=/Users/d064714/updatr/web/src/environment.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatrLink; });
var UpdatrLink = (function () {
    function UpdatrLink(url) {
        this.html = '';
        this.visited = false;
        this.loading = true;
        this.stars = 0;
        this.url = url;
    }
    return UpdatrLink;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/updatr-link.js.map

/***/ }),

/***/ 293:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 293;


/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(403);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/d064714/updatr/web/src/main.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__updatr_store_updatr_store__ = __webpack_require__(116);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppHeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppHeaderComponent = (function () {
    function AppHeaderComponent(updatrLinkService, store) {
        this.showAdder = false;
        this.updating = false;
        this.updatrLinkService = updatrLinkService;
        this.STORE = store;
    }
    AppHeaderComponent.prototype.ngOnInit = function () { };
    AppHeaderComponent.prototype.ngDoCheck = function () {
        this.updating = this.STORE.getUpdating();
    };
    AppHeaderComponent.prototype.onUpdate = function () {
        if (this.STORE.getUpdating())
            return;
        this.updatrLinkService.updateAllLinks();
    };
    AppHeaderComponent.prototype.onAdd = function () {
        this.showAdder = !this.showAdder;
    };
    AppHeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-header',
            providers: [__WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */]],
            template: __webpack_require__(468),
            styles: [__webpack_require__(463)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__updatr_store_updatr_store__["a" /* STORE */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__updatr_store_updatr_store__["a" /* STORE */]) === 'function' && _b) || Object])
    ], AppHeaderComponent);
    return AppHeaderComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/app-header.component.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(469),
            styles: [__webpack_require__(464)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/app.component.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_header_app_header_component__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__link_adder_link_adder_component__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__links_renderer_links_renderer_component__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__link_renderer_link_renderer_component__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__updatr_store_updatr_store__ = __webpack_require__(116);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__app_header_app_header_component__["a" /* AppHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_6__link_adder_link_adder_component__["a" /* LinkAdderComponent */],
                __WEBPACK_IMPORTED_MODULE_7__links_renderer_links_renderer_component__["a" /* LinksRendererComponent */],
                __WEBPACK_IMPORTED_MODULE_8__link_renderer_link_renderer_component__["a" /* LinkRendererComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_9__updatr_store_updatr_store__["a" /* STORE */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/app.module.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__ = __webpack_require__(115);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkAdderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LinkAdderComponent = (function () {
    function LinkAdderComponent(updatrLinkService) {
        this.newLink = 'http://';
        this.firstTime = false;
        this.updatrLinkService = updatrLinkService;
    }
    LinkAdderComponent.prototype.ngOnInit = function () { };
    LinkAdderComponent.prototype.ngDoCheck = function () {
        if (this.show && this.firstTime) {
            this.vc.nativeElement.focus();
            this.firstTime = false;
        }
        if (!this.show)
            this.firstTime = true;
    };
    LinkAdderComponent.prototype.checkHttp = function () {
        if (this.newLink[0] !== 'h') {
            this.newLink = ''.concat('http://', this.newLink);
        }
    };
    LinkAdderComponent.prototype.onSubmit = function () {
        this.updatrLinkService.addUrl(this.newLink);
        this.newLink = 'http://';
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(), 
        __metadata('design:type', Boolean)
    ], LinkAdderComponent.prototype, "show", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewChild */])('urlInput'), 
        __metadata('design:type', Object)
    ], LinkAdderComponent.prototype, "vc", void 0);
    LinkAdderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'link-adder',
            providers: [__WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */]],
            template: __webpack_require__(470),
            styles: [__webpack_require__(465)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */]) === 'function' && _a) || Object])
    ], LinkAdderComponent);
    return LinkAdderComponent;
    var _a;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/link-adder.component.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__updatr_link_updatr_link__ = __webpack_require__(276);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkRendererComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LinkRendererComponent = (function () {
    function LinkRendererComponent(updatrLinkService) {
        this.updatrLinkService = updatrLinkService;
    }
    LinkRendererComponent.prototype.ngOnInit = function () { };
    LinkRendererComponent.prototype.onDelete = function () {
        if (confirm("Are you sure you want to delete " + this.link.url + " ?")) {
            this.updatrLinkService.removeUrl(this.link.url);
        }
    };
    LinkRendererComponent.prototype.onToggleRead = function () {
        this.updatrLinkService.toggleReadUrl(this.link.url);
    };
    LinkRendererComponent.prototype.onToggleStar = function () {
        this.updatrLinkService.toggleStarUrl(this.link.url);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__updatr_link_updatr_link__["a" /* UpdatrLink */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__updatr_link_updatr_link__["a" /* UpdatrLink */]) === 'function' && _a) || Object)
    ], LinkRendererComponent.prototype, "link", void 0);
    LinkRendererComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'link-renderer',
            providers: [__WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */]],
            template: __webpack_require__(471),
            styles: [__webpack_require__(466)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */]) === 'function' && _b) || Object])
    ], LinkRendererComponent);
    return LinkRendererComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/link-renderer.component.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__updatr_store_updatr_store__ = __webpack_require__(116);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinksRendererComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LinksRendererComponent = (function () {
    function LinksRendererComponent(updatrLinkService, store) {
        this.showEmpty = false;
        this.updating = false;
        this.linksToCheck = 0;
        this.updatrLinkService = updatrLinkService;
        this.STORE = store;
    }
    LinksRendererComponent.prototype.ngOnInit = function () { };
    LinksRendererComponent.prototype.ngDoCheck = function () {
        this.linkGroups = this.updatrLinkService.getUnreadReadGroups();
        this.showEmpty = (this.linkGroups[0].links.length === 0) && (this.linkGroups[1].links.length === 0);
        this.updating = this.STORE.getUpdating();
        this.linksToCheck = this.STORE.getLinksToCheck();
    };
    LinksRendererComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'links-renderer',
            providers: [__WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */]],
            template: __webpack_require__(472),
            styles: [__webpack_require__(467)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__updatr_link_updatr_link_service__["a" /* UpdatrLinkService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__updatr_store_updatr_store__["a" /* STORE */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__updatr_store_updatr_store__["a" /* STORE */]) === 'function' && _b) || Object])
    ], LinksRendererComponent);
    return LinksRendererComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/links-renderer.component.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatrLinkGroup; });
var UpdatrLinkGroup = (function () {
    function UpdatrLinkGroup() {
    }
    return UpdatrLinkGroup;
}());
//# sourceMappingURL=/Users/d064714/updatr/web/src/updatr-link-group.js.map

/***/ }),

/***/ 463:
/***/ (function(module, exports) {

module.exports = ".app-header {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    z-index: 1000;\n    color: white;\n}\n\n.app-header-title {\n    padding: 11px 0;\n    margin: 0;\n    font-size: 20px;\n    letter-spacing: -1px;\n    text-align: center;\n    background: #f36c3d;\n    position: relative;\n    z-index: 10;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n@media (max-width:549px) {\n    .app-header-title {\n        text-align: left;\n    }\n}\n\n.app-header-logo {\n    padding-left: 10px;\n    margin-top: -2px;\n    height: 30px;\n    display: inline-block;\n    vertical-align: bottom;\n}\n\n.app-header-add, .app-header-update, .app-header-linebreak {\n    cursor: pointer;\n    font-size: 50px;\n    vertical-align: middle;\n    position: absolute;\n    top: 0;\n}\n.app-header-add {\n    right: 57px;\n    padding: 0 6px;\n    -webkit-transition: -webkit-transform 0.1s ease-in-out;\n    transition: -webkit-transform 0.1s ease-in-out;\n    transition: transform 0.1s ease-in-out;\n    transition: transform 0.1s ease-in-out, -webkit-transform 0.1s ease-in-out;\n    -webkit-transform: rotateZ(0);\n            transform: rotateZ(0);\n}\n.app-header-add.show {\n    -webkit-transform: rotateZ(45deg);\n            transform: rotateZ(45deg);\n}\n.app-header-update {\n    font-size: 40px;\n    vertical-align: middle;\n    padding: 5px 8px;\n    right: 0;\n    -webkit-animation: rotating 1s linear infinite;\n            animation: rotating 1s linear infinite;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-play-state: paused;\n            animation-play-state: paused;\n}\n.app-header-linebreak {\n    height: 100%;\n    width: 1px;\n    display: block;\n    right: 56px;\n    background: white;\n}\n@-webkit-keyframes rotating {\n    from {-webkit-transform: rotate(0deg);transform: rotate(0deg);}\n    to {-webkit-transform: rotate(360deg);transform: rotate(360deg);}\n}\n@keyframes rotating {\n    from {-webkit-transform: rotate(0deg);transform: rotate(0deg);}\n    to {-webkit-transform: rotate(360deg);transform: rotate(360deg);}\n}\n.app-header-update.rotate {\n    -webkit-animation-play-state: running;\n            animation-play-state: running;\n}\n"

/***/ }),

/***/ 464:
/***/ (function(module, exports) {

module.exports = ".app-main {\n    max-width: 800px;\n    margin: auto;\n    padding: 0;\n}\n"

/***/ }),

/***/ 465:
/***/ (function(module, exports) {

module.exports = ".link-adder {\n    box-shadow: 0 0 0 -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.14), 0 0 3px 0 rgba(0,0,0,.12);\n    padding: 6px 15px 6px 22px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0;\n    border-bottom-right-radius: 8px;\n    border-bottom-left-radius: 8px;\n    border: 2px solid #f36c3d;\n    overflow: hidden;\n    margin: auto;\n    max-width: 800px;\n    -webkit-transform: translateY(-65px);\n            transform: translateY(-65px);\n    -webkit-transition: -webkit-transform 0.1s ease-in-out;\n    transition: -webkit-transform 0.1s ease-in-out;\n    transition: transform 0.1s ease-in-out;\n    transition: transform 0.1s ease-in-out, -webkit-transform 0.1s ease-in-out;\n    will-change: transform;\n}\n.link-adder.show {\n    -webkit-transform: translateY(-2px);\n            transform: translateY(-2px);\n}\n\n.link-adder-container {\n    width: calc(100% - 45px);\n    border: 0;\n    margin: 0;\n    padding: 0;\n    position: relative;\n    float:left;\n}\n.link-adder-container input {\n    border: 0;\n    border-bottom: 1px solid darkgray;\n    outline: 0;\n    display: block;\n    width: 100%;\n    position: absolute;\n    top: 12px;\n    font-size: 18px;\n}\n.link-adder-container label {\n    font-size: 10px;\n    font-weight: 300;\n    position: absolute;\n    top: 0;\n    left: 0;\n    color: darkgray;\n}\n\n.link-adder-button {\n    float:right;\n    cursor: pointer;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    outline: 0;\n    border: 0;\n    background: transparent;\n    display: inline-block;\n    white-space: nowrap;\n    text-decoration: none;\n    vertical-align: middle;\n    font-family: Roboto,\"Helvetica Neue\",sans-serif;\n    font-weight: 500;\n    color: currentColor;\n    text-align: center;\n    margin: 0;\n    padding: 2px 0 0;\n    border-radius: 2px;\n    margin-left: 6px;\n}\n.link-adder-button i {\n    font-size: 35px;\n    color: darkgray;\n}\n"

/***/ }),

/***/ 466:
/***/ (function(module, exports) {

module.exports = ".link-renderer {\n    padding: 5px 15px 10px 15px;\n    border-top: 1px solid rgb(239, 234, 232);\n    overflow: hidden;\n    width: calc(100% - 30px);\n}\n.link-renderer.updated {\n}\n\n.link-renderer a {\n    color: Black;\n    font-weight: 500;\n    cursor: pointer;\n    font-size: 20px;\n    text-decoration: none;\n    vertical-align: middle;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n    width: calc(100% - 70px);\n    overflow: hidden;\n    float: left;\n    margin: 10px 0;\n}\n@media (max-width: 549px) {\n    .link-renderer a {\n        font-size: 16px;\n    }\n}\n\n.loading-icon, .update-icon {\n    display: none;\n    position: relative;\n    top: 5px;\n    color: #f36c3d;\n}\nem, .loading-icon {\n    display: inline-block;\n    color: lightgray;\n    font-weight: 300;\n}\n.link-renderer.updated .update-icon {\n    display: inline-block;\n}\n\n.link-renderer-buttons {\n    float: right;\n    vertical-align: middle;\n    width: 60px;\n    cursor: pointer;\n    color: darkgray;\n    font-size: 40px;\n}\n"

/***/ }),

/***/ 467:
/***/ (function(module, exports) {

module.exports = ".updating {\n    margin-top: 70px;\n}\n.updating .spinner {\n    margin: auto;\n}\n.updating p {\n    font-size: 12px;\n    font-style: italic;\n    text-align: center;\n    margin-bottom: 20px;\n}\n\n.link-group h4 {\n    text-align: left;\n    padding: 5px 10px;\n    font-size: 18.4px;\n    font-weight: 300;\n    margin: 0;\n    background: #EFEAE8;\n}\n.link-group-empty {\n    text-align: center;\n    font-size: 16px;\n    font-style: italic;\n    font-weight: 200;\n}\n.link-group-empty span {\n    font-style: normal;\n}\n\n.nolinks {\n    text-align: center;\n    padding-top: 50px;\n}\n.nolinks h2 {\n    font-size: 26px;\n}\n.nolinks span {\n    letter-spacing: -2px;\n}\n.nolinks p {\n    font-size: 20px;\n    margin: 15px auto;\n    max-width: 400px;\n}\n.nolinks i {\n    font-size: 35px;\n    vertical-align: middle;\n}\n.nolinks strong {\n    display: inline-block;\n}\n"

/***/ }),

/***/ 468:
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header\">\n\n    <h1 class=\"app-header-title\">\n        <svg class=\"app-header-logo\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 1000 1000\" enable-background=\"new 0 0 1000 1000\" xml:space=\"preserve\">\n            <g><path fill=\"white\" d=\"M954.9,316.4H45c-19.3,0-35,13.7-35,30.6v275.6c0,16.9,15.6,30.6,35,30.6h35v306.2c0,16.9,15.7,30.6,35,30.6h770c19.3,0,35-13.7,35-30.6V653.2h35c19.3,0,35-13.7,35-30.6V347.1C989.9,330.1,974.2,316.4,954.9,316.4L954.9,316.4L954.9,316.4z M430,898.1c0,16.9-15.6,30.6-35,30.6H185c-19.4,0-35-13.8-35-30.6v-245c0-16.9,15.6-30.6,35-30.6h210c19.3,0,35,13.8,35,30.6L430,898.1L430,898.1L430,898.1z M430,530.7c0,16.9-15.6,30.6-35,30.6H115c-19.3,0-35-13.7-35-30.6V408.3c0-16.9,15.7-30.6,35-30.6h280c19.3,0,35,13.7,35,30.6V530.7L430,530.7L430,530.7z M850,898.1c0,16.9-15.6,30.6-35,30.6H605c-19.3,0-35-13.8-35-30.6v-245c0-16.9,15.6-30.6,35-30.6h210c19.3,0,35,13.8,35,30.6V898.1L850,898.1L850,898.1z M919.9,530.7c0,16.9-15.7,30.6-35,30.6H605c-19.3,0-35-13.7-35-30.6V408.3c0-16.9,15.6-30.6,35-30.6h280c19.3,0,35,13.7,35,30.6L919.9,530.7L919.9,530.7L919.9,530.7z M344.6,316.1h322c55.2-34.7,107.3-79.7,113.5-128.8c3.1-24-2.8-59.1-48.1-90.4c-25.1-17.4-50.6-26.1-75.6-26.1c-79.8,0-125,85.7-149.4,162.2c-29.1-97.6-85.5-223-182.3-223c-28.2,0-56.4,10.6-83.6,31.8c-53.9,41.7-59.3,85.1-54.1,114.1C198,220.7,272.6,276.5,344.6,316.1L344.6,316.1L344.6,316.1z M656.3,144.3c7.7,0,17.8,4,28.9,11.7c18,12.5,17,20.2,16.7,22.7c-3.3,26.8-60.8,68.9-127.7,103.6C593.8,208.3,626,144.3,656.3,144.3L656.3,144.3L656.3,144.3z M291.1,98.3c8.9-6.8,21.8-14.9,33.5-14.9c43.4,0,87.9,99.5,113.9,196.3C356.6,241.6,272,187.4,264.5,144C263.4,138,260.7,122,291.1,98.3L291.1,98.3L291.1,98.3z\"/></g>\n        </svg>\n        <span>Updatr</span>\n        <i class=\"icons app-header-update\" [ngClass]=\"{'rotate': updating}\" (click)=\"onUpdate()\">autorenew</i>\n        <span class=\"app-header-linebreak\"></span>\n        <i class=\"icons app-header-add\" [ngClass]=\"{'show': showAdder}\" (click)=\"onAdd()\">add</i>\n    </h1>\n\n    <link-adder [show]=\"showAdder\"></link-adder>\n</header>\n"

/***/ }),

/***/ 469:
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<main class=\"app-main\">\n    <links-renderer></links-renderer>\n</main>\n"

/***/ }),

/***/ 470:
/***/ (function(module, exports) {

module.exports = "<div class=\"card link-adder\" [ngClass]=\"{'show': show}\">\n    <form (ngSubmit)=\"onSubmit()\">\n\n        <fieldset class=\"link-adder-container\">\n            <label for=\"newUrl\">Add a new link</label>\n            <input [(ngModel)]='newLink' name=\"newURL\" type=\"url\" #urlInput>\n        </fieldset>\n\n        <button type=\"submit\" class=\"link-adder-button\" (click)=\"checkHttp()\">\n            <i class=\"icons\">add_box</i>\n        </button>\n    </form>\n</div>\n"

/***/ }),

/***/ 471:
/***/ (function(module, exports) {

module.exports = "<div class=\"link-renderer\" [ngClass]=\"{'updated': !link.visited }\">\n    <a href=\"{{link.url}}\" (click)=\"onToggleRead()\" target=\"_blank\">\n        <i class=\"icons update-icon\">new_releases</i>\n        <span class=\"link-text\">{{link.url}}</span>\n    </a>\n    <div class=\"link-renderer-buttons\">\n        <i class=\"icons\" (click)=\"onToggleStar()\" *ngIf=\"link.stars==0\">star_border</i>\n        <i class=\"icons\" (click)=\"onToggleStar()\" *ngIf=\"link.stars==1\">star_half</i>\n        <i class=\"icons\" (click)=\"onToggleStar()\" *ngIf=\"link.stars==2\">star</i>\n        <i class=\"icons\" (click)=\"onDelete()\" style=\"color:lightgray\">delete</i>\n    </div>\n</div>\n"

/***/ }),

/***/ 472:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"showEmpty\" class=\"nolinks\">\n    <h2>Welcome to <span>Updatr</span> 🤗!</h2>\n    <p>To get started add some links you'd like to follow using the big <strong><i class=\"icons\">add</i> button</strong> on the top.</p>\n    <p>🚀</p>\n    <p>Need inspiration? Try adding: https://medium.com/product-hunt</p>\n</div>\n\n<div *ngIf=\"!showEmpty\">\n    <div class=\"updating\" *ngIf=\"updating\">\n        <p>Checking {{linksToCheck}} links...</p>\n    </div>\n    \n    <div class=\"card link-group\">\n        <h4>Unread updates</h4>\n\n        <link-renderer *ngFor=\"let link of linkGroups[0].links\" [link]=\"link\"></link-renderer>\n\n        <p *ngIf=\"!linkGroups[0].links.length\" class=\"link-group-empty\">\n            <span>🎉</span> Congratulations! You've seen all updates...\n        </p>\n    </div>\n\n    <div class=\"card link-group\" *ngIf=\"linkGroups[1].links.length\">\n        <h4>Visited</h4>\n        <link-renderer *ngFor=\"let link of linkGroups[1].links\" [link]=\"link\"></link-renderer>\n    </div>\n</div>\n"

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(294);


/***/ })

},[486]);
//# sourceMappingURL=main.bundle.map