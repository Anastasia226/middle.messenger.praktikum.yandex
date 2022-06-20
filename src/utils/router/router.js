"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const tslib_1 = require("tslib");
const isEqual_1 = tslib_1.__importDefault(require("../mydash/isEqual"));
const render_1 = require("../render/render");
const store_1 = tslib_1.__importDefault(require("../store/store"));
class Route {
    _pathname;
    _blockClass;
    _block;
    _props;
    constructor(pathname, view, props = {}) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }
    match(pathname) {
        return (0, isEqual_1.default)(pathname, this._pathname);
    }
    render() {
        if (!this._block) {
            this._block = this._blockClass;
        }
        (0, render_1.render)(this._block, this._props.rootQuery);
    }
}
class Router {
    routes = [];
    history = window.history;
    _rootQuery;
    static __instance;
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.history = window.history;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
    _onRoute(pathname) {
        const state = store_1.default.getState();
        if (state?.user && (pathname === '/registration' || pathname === '/authorization' || pathname === '/')) {
            this.go('/messenger');
            return;
        }
        if (!state?.user && !(pathname === '/registration' || pathname === '/authorization' || pathname === '/')) {
            this.go('/');
            return;
        }
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        route.render();
        return;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map