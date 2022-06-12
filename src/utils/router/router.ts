import Block from "../block/block";
import isEqual from "../mydash/isEqual";
import { render } from "../render/render";

class Route {
    private _pathname: string;
    private _blockClass: Block;
    private _block: Block | null;
    private _props;

    constructor(pathname: string, view: Block, props: any = {}) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
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

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = this._blockClass;
        }
        render(this._block, this._props.rootQuery);
    }
}

export class Router {
    public routes: Route[] = [];
    history: History = window.history;
    private _rootQuery;
    private static __instance: Router;

    constructor(rootQuery?: string) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.history = window.history;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: Event) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}