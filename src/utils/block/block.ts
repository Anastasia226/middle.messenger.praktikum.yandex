import { v4 as makeUUID } from 'uuid';
import { EventBus } from '../event-bus/event-bus';
import isEqual from '../mydash/isEqual';

export default class Block<T = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public _id = makeUUID();

  private _element: HTMLElement | null = null;

  _meta: { props: Record<string, any> };

  protected props: Record<string, any>;

  protected children: Record<string, Block>;

  private eventBus: EventBus = new EventBus();

  constructor(propsAndChildren: T) {
    const { props, children } = this._getChildren(propsAndChildren);
    this.children = children;
    this.initChildren();
    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  init(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {
  }

  dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return (!isEqual(oldProps, newProps));
  }

  setProps = (nextProps: any): void => {
    if (!nextProps) {
      return;
    }
    if (!isEqual(nextProps, this.props)) {
      Object.assign(this.props, nextProps);
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    this.eventBus.emit(Block.EVENTS.FLOW_CDU);
  };

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  compile(template: (context: any) => string, props?: any) {
    Object.entries(this.children).forEach(([key, child]) => {
      props[key] = `<div data-id="id-${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const htmlStr = template(props);
    fragment.innerHTML = htmlStr;
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child._id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  show = (): void => {
    if (this._element) {
      this._element.style.display = 'block';
    }
  };

  hide = (): void => {
    if (this._element) {
      this._element.style.display = 'none';
    }
  };

  protected initChildren() {
  }

  private _getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  private _render(): void {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  private _makePropsProxy(props: any) {
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
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }
}
