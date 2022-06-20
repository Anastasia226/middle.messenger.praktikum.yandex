"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
function render(component, query) {
    if (query) {
        const root = document.querySelector(query);
        if (root) {
            root.innerHTML = '';
            root.appendChild(component.getContent());
        }
        component.dispatchComponentDidMount();
    }
}
exports.render = render;
//# sourceMappingURL=render.js.map