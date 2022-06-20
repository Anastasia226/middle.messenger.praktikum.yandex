"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const event_bus_1 = require("../event-bus/event-bus");
const uuid_1 = require("uuid");
const isEqual_1 = tslib_1.__importDefault(require("../mydash/isEqual"));
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };
    _id = (0, uuid_1.v4)();
    _element = null;
    _meta;
    props;
    children;
    eventBus = new event_bus_1.EventBus();
    constructor(propsAndChildren) {
        const { props, children } = this._getChildren(propsAndChildren);
        this.children = children;
        this.initChildren();
        this._meta = {
            props
        };
        this.props = this._makePropsProxy(props);
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    }
    init() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidMount() {
    }
    dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
    componentDidUpdate(oldProps, newProps) {
        return (!(0, isEqual_1.default)(oldProps, newProps));
    }
    setProps = (nextProps) => {
        if (!nextProps) {
            return;
        }
        if (!(0, isEqual_1.default)(nextProps, this.props)) {
            Object.assign(this.props, nextProps);
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
    };
    render() {
        return new DocumentFragment();
    }
    getContent() {
        return this.element;
    }
    compile(template, props) {
        Object.entries(this.children).forEach(([key, child]) => {
            props[key] = `<div data-id="id-${child._id}"></div>`;
        });
        const fragment = this._createDocumentElement('template');
        const htmlStr = template(props);
        fragment.innerHTML = htmlStr;
        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="id-${child._id}"]`);
            if (!stub) {
                return;
            }
            stub.replaceWith(child.getContent());
        });
        return fragment.content;
    }
    show = () => {
        if (this._element) {
            this._element.style.display = 'block';
        }
    };
    hide = () => {
        if (this._element) {
            this._element.style.display = 'none';
        }
    };
    initChildren() {
    }
    _getChildren(propsAndChildren) {
        const children = {};
        const props = {};
        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            }
            else {
                props[key] = value;
            }
        });
        return { children, props };
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    get element() {
        return this._element;
    }
    _addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            if (this._element)
                this._element.addEventListener(eventName, events[eventName]);
        });
    }
    _removeEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            if (this._element)
                this._element.removeEventListener(eventName, events[eventName]);
        });
    }
    _render() {
        const fragment = this.render();
        const newElement = fragment.firstElementChild;
        if (this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }
    _makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus.emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }
    _createDocumentElement(tagName) {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', this._id);
        return element;
    }
}
exports.default = Block;
//# sourceMappingURL=block.js.map