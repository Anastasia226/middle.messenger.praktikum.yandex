import Block from "../block/block";

export function render(component: Block, query?: string) {
    if (query) {
        const root = document.querySelector(query);
        if (root) {
            root.innerHTML = '';
            root.appendChild(component.getContent()!);
        }
        component.dispatchComponentDidMount();
    }
}